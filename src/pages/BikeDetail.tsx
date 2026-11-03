import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { bikeImage, getBike } from '../data';
import { useStore } from '../store';
import NotFound from './NotFound';

export default function BikeDetail() {
  const { id } = useParams();
  const bike = getBike(id);
  const navigate = useNavigate();
  const { startDraft } = useStore();
  const [size, setSize] = useState(bike && bike.sizes.length === 1 ? bike.sizes[0] : '');
  const [error, setError] = useState('');

  if (!bike) return <NotFound />;

  const rent = () => {
    if (!size) {
      setError('Please choose a frame size.');
      return;
    }
    startDraft(bike.id, size);
    navigate('/book/dates');
  };

  return (
    <article className="detail">
      <Link to="/" className="back-link">
        ← All bikes
      </Link>
      <div className="detail-grid">
        <img
          className="detail-img"
          src={bikeImage(bike.color)}
          alt={`Illustration of the ${bike.name}`}
        />
        <div>
          <span className="tag">{bike.type}</span>
          <h1>{bike.name}</h1>
          <p className="card-rating">
            ★ {bike.rating} <span>({bike.reviews} reviews)</span>
          </p>
          <p className="detail-price">
            <strong>${bike.hourly}</strong> per hour · <strong>${bike.daily}</strong> per day
          </p>
          <p className="badge-ok" data-testid="free-cancel-badge">
            ✓ Free cancellation
          </p>
          <p>{bike.description}</p>

          <h2 className="h3">Frame size</h2>
          <div className="chips" data-testid="size-options">
            {bike.sizes.map((s) => (
              <div
                key={s}
                className={'chip' + (size === s ? ' chip-selected' : '')}
                onClick={() => {
                  setSize(s);
                  setError('');
                }}
                data-testid={`size-option-${s}`}
              >
                {s}
              </div>
            ))}
          </div>
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn-primary btn-lg" onClick={rent} data-testid="rent-button">
            Rent this bike
          </button>

          <h2 className="h3">Specifications</h2>
          <dl className="specs">
            {bike.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
