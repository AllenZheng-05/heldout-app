import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Steps from '../components/Steps';
import Summary, { NoDraft } from '../components/Summary';
import { LOCATIONS, TIMES } from '../data';
import { useStore } from '../store';

function todayIso() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

type Errors = Partial<Record<'pickupDate' | 'returnDate', string>>;

export default function BookDates() {
  const { draft, updateDraft } = useStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});

  if (!draft) return <NoDraft />;

  const today = todayIso();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!draft.pickupDate) next.pickupDate = 'Choose a pickup date.';
    else if (draft.pickupDate < today) next.pickupDate = 'Pickup date can’t be in the past.';
    if (!draft.returnDate) next.returnDate = 'Choose a return date.';
    else if (draft.pickupDate && draft.returnDate <= draft.pickupDate)
      next.returnDate = 'Return date must be after the pickup date.';
    setErrors(next);
    if (Object.keys(next).length === 0) navigate('/book/rider');
  };

  return (
    <>
      <Steps current={0} />
      <div className="checkout">
        <form className="panel form" onSubmit={submit} noValidate data-testid="dates-form">
          <h1>When and where?</h1>

          <div className="field">
            <label htmlFor="location">Pickup station</label>
            <select
              id="location"
              className="input"
              value={draft.location}
              onChange={(e) => updateDraft({ location: e.target.value })}
            >
              {LOCATIONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <p className="hint">Return the bike to the same station.</p>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="pickupDate">Pickup date</label>
              <input
                id="pickupDate"
                type="date"
                className={'input' + (errors.pickupDate ? ' input-error' : '')}
                min={today}
                value={draft.pickupDate}
                onChange={(e) => updateDraft({ pickupDate: e.target.value })}
                aria-invalid={!!errors.pickupDate}
                aria-describedby={errors.pickupDate ? 'pickupDate-err' : undefined}
                data-testid="pickup-date"
              />
              {errors.pickupDate && (
                <p id="pickupDate-err" className="error-text">
                  {errors.pickupDate}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="pickupTime">Pickup time</label>
              <select
                id="pickupTime"
                className="input"
                value={draft.pickupTime}
                onChange={(e) => updateDraft({ pickupTime: e.target.value })}
                data-testid="pickup-time"
              >
                {TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="returnDate">Return date</label>
              <input
                id="returnDate"
                type="date"
                className={'input' + (errors.returnDate ? ' input-error' : '')}
                min={draft.pickupDate || today}
                value={draft.returnDate}
                onChange={(e) => updateDraft({ returnDate: e.target.value })}
                aria-invalid={!!errors.returnDate}
                aria-describedby={errors.returnDate ? 'returnDate-err' : undefined}
                data-testid="return-date"
              />
              {errors.returnDate && (
                <p id="returnDate-err" className="error-text" data-testid="return-date-error">
                  {errors.returnDate}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="returnTime">Return time</label>
              <select
                id="returnTime"
                className="input"
                value={draft.returnTime}
                onChange={(e) => updateDraft({ returnTime: e.target.value })}
                data-testid="return-time"
              >
                {TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="hint">Stations are open 09:00–18:00 every day.</p>

          <div className="actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" data-testid="dates-continue">
              Continue
            </button>
          </div>
        </form>
        <Summary draft={draft} />
      </div>
    </>
  );
}
