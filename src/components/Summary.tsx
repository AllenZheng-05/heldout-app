import { Link } from 'react-router-dom';
import { EXTRAS, getBike, LOCATIONS, money } from '../data';
import { priceOf, type Draft } from '../store';

export function formatDate(iso: string) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function locationName(id: string) {
  return LOCATIONS.find((l) => l.id === id)?.name ?? id;
}

export default function Summary({ draft }: { draft: Draft }) {
  const bike = getBike(draft.bikeId)!;
  const p = priceOf(draft);
  return (
    <aside className="summary panel" aria-label="Rental summary">
      <h2 className="h3">Your rental</h2>
      <p className="summary-bike">
        <strong>{bike.name}</strong> · size {draft.size}
      </p>
      <dl className="summary-list">
        <div>
          <dt>Pickup</dt>
          <dd>
            {formatDate(draft.pickupDate)} {draft.pickupDate && draft.pickupTime}
          </dd>
        </div>
        <div>
          <dt>Return</dt>
          <dd>
            {formatDate(draft.returnDate)} {draft.returnDate && draft.returnTime}
          </dd>
        </div>
        <div>
          <dt>Station</dt>
          <dd>{locationName(draft.location)}</dd>
        </div>
        {p.days > 0 && (
          <div>
            <dt>
              Bike × {p.days} {p.days === 1 ? 'day' : 'days'}
            </dt>
            <dd>{money(p.base)}</dd>
          </div>
        )}
        {p.days > 0 &&
          EXTRAS.filter((e) => draft.extras[e.id] > 0).map((e) => (
            <div key={e.id}>
              <dt>
                {e.name} × {draft.extras[e.id]}
              </dt>
              <dd>{money(e.perDay * draft.extras[e.id] * p.days)}</dd>
            </div>
          ))}
      </dl>
      <p className="summary-total">
        <span>Total</span> <strong>{p.days > 0 ? money(p.total) : '—'}</strong>
      </p>
      <p className="badge-ok">✓ Free cancellation</p>
    </aside>
  );
}

export function NoDraft() {
  return (
    <section className="panel center">
      <h1>No rental in progress</h1>
      <p>Choose a bike first, then pick your dates.</p>
      <Link to="/" className="btn btn-primary">
        Browse bikes
      </Link>
    </section>
  );
}
