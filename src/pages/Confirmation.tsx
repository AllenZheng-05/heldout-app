import { useParams } from 'react-router-dom';
import { formatDate, locationName } from '../components/Summary';
import { getBike, money } from '../data';
import { useStore } from '../store';
import NotFound from './NotFound';

export default function Confirmation() {
  const { id } = useParams();
  const { bookings } = useStore();
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return <NotFound />;
  const bike = getBike(booking.bikeId)!;

  return (
    <section className="panel confirm" data-testid="confirmation">
      <div className="confirm-icon" aria-hidden="true">
        ✓
      </div>
      <h1>You’re booked!</h1>
      <p>
        Booking reference <strong data-testid="booking-ref">{booking.id}</strong>. We’ve emailed your
        receipt and pickup code to <strong>{booking.rider.email}</strong>.
      </p>
      <dl className="summary-list confirm-list">
        <div>
          <dt>Bike</dt>
          <dd>
            {bike.name}, size {booking.size}
          </dd>
        </div>
        <div>
          <dt>Pickup</dt>
          <dd>
            {formatDate(booking.pickupDate)} at {booking.pickupTime}
          </dd>
        </div>
        <div>
          <dt>Return</dt>
          <dd>
            {formatDate(booking.returnDate)} by {booking.returnTime}
          </dd>
        </div>
        <div>
          <dt>Station</dt>
          <dd>{locationName(booking.location)}</dd>
        </div>
        <div>
          <dt>Paid</dt>
          <dd>{money(booking.total)}</dd>
        </div>
      </dl>
      <p className="muted">Show your pickup code at the station counter. Bring a photo ID.</p>
    </section>
  );
}
