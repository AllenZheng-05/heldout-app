import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BIKES, bikeImage, type BikeType } from '../data';
import { useStore } from '../store';

const TYPES: (BikeType | 'All')[] = ['All', 'City', 'Road', 'Mountain', 'Electric', 'Cargo', 'Kids'];

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7.1 4.5c2 0 3.4 1.1 4.9 2.9 1.5-1.8 2.9-2.9 4.9-2.9 3.5 0 5.6 3.5 4.4 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"
        fill={filled ? '#c0392b' : 'none'}
        stroke={filled ? '#c0392b' : '#3d4a47'}
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Browse() {
  const { favorites, toggleFavorite } = useStore();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<(typeof TYPES)[number]>('All');
  const [sort, setSort] = useState('popular');
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPromo(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const bikes = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = BIKES.filter(
      (b) =>
        (type === 'All' || b.type === type) &&
        (!q || b.name.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q)),
    );
    if (sort === 'price') list.sort((a, b) => a.daily - b.daily);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [query, type, sort]);

  return (
    <>
      <section className="hero">
        <h1>Rent a bike by the hour or by the day</h1>
        <p>Pick up at any of our three stations. Helmets, locks and child seats available.</p>
      </section>

      <div className="filters" role="search">
        <input
          type="search"
          className="input search"
          placeholder="Search bikes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="search-input"
        />
        <div className="field-inline">
          <label htmlFor="type-filter">Type</label>
          <select
            id="type-filter"
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value as BikeType | 'All')}
            data-testid="type-filter"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field-inline">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            className="input"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort-select"
          >
            <option value="popular">Most popular</option>
            <option value="price">Lowest daily price</option>
            <option value="rating">Highest rated</option>
          </select>
        </div>
      </div>

      {showPromo && (
        <div className="promo" data-testid="promo-banner">
          <strong>Autumn weekdays:</strong> 20% off all e-bikes Monday to Thursday. Discount applied at
          the station.
        </div>
      )}

      <p className="result-count" aria-live="polite">
        {bikes.length} {bikes.length === 1 ? 'bike' : 'bikes'} available
      </p>

      {bikes.length === 0 ? (
        <div className="empty">
          <p>No bikes match “{query}”.</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setQuery('');
              setType('All');
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="grid" data-testid="bike-grid">
          {bikes.map((b) => {
            const fav = favorites.includes(b.id);
            return (
              <li key={b.id} className="card" data-testid={`bike-card-${b.id}`}>
                <img className="card-img" src={bikeImage(b.color)} alt="" />
                <button
                  type="button"
                  className="fav-btn"
                  aria-pressed={fav}
                  onClick={() => toggleFavorite(b.id)}
                  data-testid={`fav-${b.id}`}
                >
                  <HeartIcon filled={fav} />
                </button>
                <div className="card-body">
                  <span className="tag">{b.type}</span>
                  <h2 className="card-title">
                    <Link to={`/bikes/${b.id}`}>{b.name}</Link>
                  </h2>
                  <p className="card-summary">{b.summary}</p>
                  <p className="card-price">
                    <strong>${b.hourly}</strong>/hour · <strong>${b.daily}</strong>/day
                  </p>
                  <p className="card-rating">
                    ★ {b.rating} <span>({b.reviews} reviews)</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
