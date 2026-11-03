import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Steps from '../components/Steps';
import Summary, { NoDraft } from '../components/Summary';
import { EXTRAS, money } from '../data';
import { useStore, type Rider } from '../store';

type Bad = Partial<Record<keyof Rider, boolean>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookRider() {
  const { draft, updateDraft } = useStore();
  const navigate = useNavigate();
  const [bad, setBad] = useState<Bad>({});
  const [showBanner, setShowBanner] = useState(false);

  if (!draft) return <NoDraft />;

  const rider = draft.rider;
  const setRider = (patch: Partial<Rider>) => updateDraft({ rider: { ...rider, ...patch } });

  const setExtra = (id: keyof typeof draft.extras, delta: number) => {
    const n = Math.min(4, Math.max(0, (draft.extras[id] || 0) + delta));
    updateDraft({ extras: { ...draft.extras, [id]: n } });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const h = Number(rider.height);
    const next: Bad = {
      name: rider.name.trim().length < 2,
      email: !EMAIL_RE.test(rider.email.trim()),
      phone: rider.phone.trim() !== '' && rider.phone.replace(/[^\d]/g, '').length < 7,
      height: !rider.height || Number.isNaN(h) || h < 150 || h > 210,
    };
    setBad(next);
    const ok = !Object.values(next).some(Boolean);
    setShowBanner(!ok);
    if (ok) navigate('/book/review');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cls = (k: keyof Rider) => 'input' + (bad[k] ? ' input-error' : '');

  return (
    <>
      <Steps current={1} />
      <div className="checkout">
        <form className="panel form" onSubmit={submit} noValidate data-testid="rider-form">
          <h1>Who’s riding?</h1>
          {showBanner && (
            <div className="banner-error" data-testid="rider-error-banner">
              Please fix the errors in the form.
            </div>
          )}

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              className={cls('name')}
              autoComplete="name"
              value={rider.name}
              onChange={(e) => setRider({ name: e.target.value })}
              data-testid="rider-name"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={cls('email')}
              autoComplete="email"
              value={rider.email}
              onChange={(e) => setRider({ email: e.target.value })}
              data-testid="rider-email"
            />
            <p className="hint">We’ll send your receipt and pickup code here.</p>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                className={cls('phone')}
                autoComplete="tel"
                value={rider.phone}
                onChange={(e) => setRider({ phone: e.target.value })}
                data-testid="rider-phone"
              />
            </div>
            <div className="field">
              <label htmlFor="height">Rider height (cm)</label>
              <input
                id="height"
                type="number"
                inputMode="numeric"
                min={150}
                max={210}
                className={cls('height')}
                value={rider.height}
                onChange={(e) => setRider({ height: e.target.value })}
                data-testid="rider-height"
              />
              <p className="hint">We use this to set the saddle before you arrive.</p>
            </div>
          </div>

          <fieldset className="extras">
            <legend>Extras</legend>
            {EXTRAS.map((x) => (
              <div className="extra-row" key={x.id}>
                <span>
                  {x.name} <span className="muted">{money(x.perDay)}/day each</span>
                </span>
                <span className="stepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    aria-label={`Remove one ${x.name.toLowerCase()}`}
                    onClick={() => setExtra(x.id, -1)}
                    data-testid={`extra-${x.id}-minus`}
                  >
                    −
                  </button>
                  <output aria-live="polite" data-testid={`extra-${x.id}-count`}>
                    {draft.extras[x.id]}
                  </output>
                  <button
                    type="button"
                    className="stepper-btn"
                    aria-label={`Add one ${x.name.toLowerCase()}`}
                    onClick={() => setExtra(x.id, 1)}
                    data-testid={`extra-${x.id}-plus`}
                  >
                    +
                  </button>
                </span>
              </div>
            ))}
          </fieldset>

          <div className="actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/book/dates')}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" data-testid="rider-continue">
              Continue
            </button>
          </div>
        </form>
        <Summary draft={draft} />
      </div>
    </>
  );
}
