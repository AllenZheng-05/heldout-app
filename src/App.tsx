import { useEffect } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Browse from './pages/Browse';
import BikeDetail from './pages/BikeDetail';
import BookDates from './pages/BookDates';
import BookRider from './pages/BookRider';
import BookReview from './pages/BookReview';
import Confirmation from './pages/Confirmation';
import Rentals from './pages/Rentals';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function Logo() {
  return (
    <>
      <img src="/favicon.svg" alt="" width={28} height={28} />
      <span>Loopline Bikes</span>
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const inCheckout = pathname.startsWith('/book') || pathname.startsWith('/confirmation');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main" data-testid="skip-link">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          {inCheckout ? (
            <span className="brand" data-testid="brand">
              <Logo />
            </span>
          ) : (
            <Link to="/" className="brand" data-testid="brand">
              <Logo />
            </Link>
          )}
          {!inCheckout && (
            <nav aria-label="Main" className="main-nav">
              <NavLink to="/" end>
                Bikes
              </NavLink>
              <NavLink to="/rentals">My rentals</NavLink>
              <NavLink to="/settings">Settings</NavLink>
            </nav>
          )}
          {inCheckout && <span className="secure-note">Secure checkout</span>}
        </div>
      </header>
      <main id="main" tabIndex={-1} className="container">
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/bikes/:id" element={<BikeDetail />} />
          <Route path="/book/dates" element={<BookDates />} />
          <Route path="/book/rider" element={<BookRider />} />
          <Route path="/book/review" element={<BookReview />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!inCheckout && (
        <footer className="site-footer">
          <div className="container">
            © 2026 Loopline Bikes · Open daily 09:00–18:00 · Harbor Station, Central Square & Pine Hollow
          </div>
        </footer>
      )}
    </>
  );
}
