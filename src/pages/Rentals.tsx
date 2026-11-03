import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, locationName } from '../components/Summary';
import { BIKES, getBike, money } from '../data';
import { useStore, type Booking } from '../store';

function CancelDialog({ booking, onClose, onConfirm }: { booking: Booking; onClose: () => void; onConfirm: () => void }) {
  const firstBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    firstBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="overlay">
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="cancel-title" data-testid="cancel-dialog">
        <h2 id="cancel-title">Cancel rental {booking.id}?</h2>
        <p>
          A cancellation fee of 50% of the rental total ({money(booking.total / 2)}) will be charged to
          your card.
        </p>
        <div className="actions">
          <button ref={firstBtn} className="btn btn-secondary" onClick={onClose} data-testid="dialog-cancel">
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} data-testid="dialog-ok">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Rentals() {
  const { bookings, cancelBooking, favorites } = useStore();
  const [pending, setPending] = useState<Booking | null>(null);
  const [notice, setNotice] = useState('');
  const saved = BIKES.filter((b) => favorites.includes(b.id));

  return (
    <>
      <h1>My rentals</h1>
      <p role="status" className={notice ? 'notice' : 'sr-only'}>
        {notice}
      </p>
      {bookings.length === 0 ? (
        <div className="panel center">
          <p>You don’t have any rentals yet.</p>
          <Link to="/" className="btn btn-primary">
            Find a bike
          </Link>
        </div>
      ) : (
        <ul className="rental-list" data-testid="rental-list">
          {bookings.map((b) => {
            const bike = getBike(b.bikeId)!;
            return (
              <li key={b.id} className="panel rental" data-testid={`rental-${b.id}`}>
                <div>
                  <h2 className="h3">
                    {bike.name} <span className="muted">· {b.id}</span>
                  </h2>
                  <p>
                    {formatDate(b.pickupDate)} {b.pickupTime} → {formatDate(b.returnDate)} {b.returnTime}
                  </p>
                  <p className="muted">
                    {locationName(b.location)} · {money(b.total)}
                  </p>
                </div>
                <div className="rental-side">
                  <span className={'status status-' + b.status}>
                    {b.status === 'upcoming' ? 'Upcoming' : 'Cancelled'}
                  </span>
                  {b.status === 'upcoming' && (
                    <button
                      className="btn btn-secondary"
                      onClick={() => setPending(b)}
                      data-testid={`cancel-${b.id}`}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <h2>Saved bikes</h2>
      {saved.length === 0 ? (
        <p className="muted">Tap the heart on any bike to save it here.</p>
      ) : (
        <ul className="saved-list">
          {saved.map((b) => (
            <li key={b.id}>
              <Link to={`/bikes/${b.id}`}>{b.name}</Link> <span className="muted">from ${b.hourly}/hour</span>
            </li>
          ))}
        </ul>
      )}

      {pending && (
        <CancelDialog
          booking={pending}
          onClose={() => setPending(null)}
          onConfirm={() => {
            cancelBooking(pending.id);
            setNotice(`Rental ${pending.id} was cancelled.`);
            setPending(null);
          }}
        />
      )}
    </>
  );
}
