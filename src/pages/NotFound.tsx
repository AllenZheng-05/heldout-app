import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="panel center">
      <h1>Page not found</h1>
      <p>That page doesn’t exist or has moved.</p>
      <Link to="/" className="btn btn-primary">
        Browse bikes
      </Link>
    </section>
  );
}
