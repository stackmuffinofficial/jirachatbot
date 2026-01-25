import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="JiraChatbot" />
            </Link>
            <div />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="page-center">
        <div className="page-card text-center">
          <div className="card-static">
            {/* 404 Visual */}
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-brand-500)', lineHeight: 1, opacity: 0.2 }}>
                404
              </h1>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={64} style={{ color: 'var(--color-navy-muted)', opacity: 0.5 }} />
              </div>
            </div>

            {/* Message */}
            <h2 className="page-title mb-2">Page not found</h2>
            <p className="text-muted mb-6" style={{ fontSize: '0.9375rem' }}>
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '280px', margin: '0 auto' }}>
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
              <Link to="/">
                <button className="btn btn-primary w-full">
                  <Home size={18} />
                  Go Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-brand">JiraChatbot</span>
            <div className="footer-links-minimal">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
