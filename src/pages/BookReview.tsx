import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Steps from '../components/Steps';
import Summary, { NoDraft } from '../components/Summary';
import { getBike, money } from '../data';
import { priceOf, useStore } from '../store';

interface Card {
  holder: string;
  number: string;
  expiry: string;
  cvc: string;
}

type CardErrors = Partial<Record<keyof Card | 'terms', string>>;

function validate(card: Card, terms: boolean): CardErrors {
  const e: CardErrors = {};
  if (card.holder.trim().length < 2) e.holder = 'Enter the name shown on the card.';
  const digits = card.number.replace(/[\s-]/g, '');
  if (!/^\d{13,19}$/.test(digits)) e.number = 'Card number should be 13–19 digits.';
  const m = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!m) e.expiry = 'Use the format MM/YY.';
  else {
    const month = Number(m[1]);
    const year = 2000 + Number(m[2]);
    const now = new Date();
    if (month < 1 || month > 12) e.expiry = 'Month must be between 01 and 12.';
    else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1))
      e.expiry = 'This card has expired.';
  }
  if (!/^\d{3,4}$/.test(card.cvc.trim())) e.cvc = 'CVC is the 3 or 4 digits on the back.';
  if (!terms) e.terms = 'Accept the rental terms to continue.';
  return e;
}

export default function BookReview() {
  const { draft, placeBooking } = useStore();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card>({ holder: '', number: '', expiry: '', cvc: '' });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<CardErrors>({});

  if (!draft) return <NoDraft />;

  const bike = getBike(draft.bikeId)!;
  const price = priceOf(draft);

  const pay = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(card, terms);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // Simulated payment processor round-trip
    setTimeout(() => {
      const booking = placeBooking();
      if (booking) navigate(`/confirmation/${booking.id}`);
    }, 1800);
  };

  const field = (k: keyof Card, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="field">
      <label htmlFor={`card-${k}`}>{label}</label>
      <input
        id={`card-${k}`}
        className={'input' + (errors[k] ? ' input-error' : '')}
        value={card[k]}
        onChange={(e) => setCard({ ...card, [k]: e.target.value })}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `card-${k}-err` : undefined}
        data-testid={`card-${k}`}
        {...props}
      />
      {errors[k] && (
        <p id={`card-${k}-err`} className="error-text">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <Steps current={2} />
      <div className="checkout">
        <form className="panel form review-form" onSubmit={pay} noValidate data-testid="pay-form">
          <h1>Review and pay</h1>
          <section className="review-block">
            <h2 className="h3">Rider</h2>
            <p>
              {draft.rider.name} · {draft.rider.email}
              {draft.rider.phone && ` · ${draft.rider.phone}`} · {draft.rider.height} cm
            </p>
            <Link to="/book/rider">Edit rider details</Link>
          </section>
          <section className="review-block">
            <h2 className="h3">Bike</h2>
            <p>
              {bike.name}, size {draft.size} — {price.days} {price.days === 1 ? 'day' : 'days'}
            </p>
            <Link to="/book/dates">Edit dates</Link>
          </section>

          <h2 className="h3">Payment</h2>
          {field('holder', 'Name on card', { autoComplete: 'cc-name' })}
          {field('number', 'Card number', { autoComplete: 'cc-number', inputMode: 'numeric' })}
          <div className="row">
            {field('expiry', 'Expiry (MM/YY)', { autoComplete: 'cc-exp', placeholder: 'MM/YY' })}
            {field('cvc', 'CVC', { autoComplete: 'cc-csc', inputMode: 'numeric' })}
          </div>
          <p className="hint">This is a demo — no card is charged.</p>

          <label className="check terms" data-testid="terms-label">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              data-testid="terms-checkbox"
            />
            I agree to the rental terms and confirm the rider is responsible for the bike while it is
            rented.
          </label>

          <div className="paybar" data-testid="paybar">
            <div>
              <span className="muted">Total</span> <strong>{money(price.total)}</strong>
              {errors.terms && (
                <p className="error-text" role="alert">
                  {errors.terms}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary" data-testid="pay-button">
              Pay {money(price.total)}
            </button>
          </div>
        </form>
        <Summary draft={draft} />
      </div>
    </>
  );
}
