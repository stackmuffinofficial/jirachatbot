import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles, CheckCircle, Mail } from 'lucide-react';

export default function ThankYou() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
      {/* Minimal Header */}
      <header className="header-minimal">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="JiraChatbot" />
            </Link>
            <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Home size={18} />
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Thank You Content */}
      <main className="page-center">
        <div className="container">
          <div className="thank-you-container">
            {/* Success Animation */}
            <div className="thank-you-icon">
              <div className="success-circle">
                <CheckCircle size={64} />
              </div>
              <div className="sparkle sparkle-1">✨</div>
              <div className="sparkle sparkle-2">⭐</div>
              <div className="sparkle sparkle-3">💫</div>
            </div>

            {/* Main Message */}
            <div className="thank-you-content">
              <h1 className="thank-you-title">
                You're all set! 🚀
              </h1>

              <p className="thank-you-subtitle">
                Check your inbox — we've sent you all the details to get started with your Jira-free journey.
              </p>

              {/* What's Next */}
              <div className="thank-you-steps">
                <div className="thank-you-step">
                  <div className="step-icon">
                    <Mail size={20} />
                  </div>
                  <div className="step-text">
                    <h3>Check Your Email</h3>
                    <p>Look for an email from us with your next steps</p>
                  </div>
                </div>

                <div className="thank-you-step">
                  <div className="step-icon">
                    <Sparkles size={20} />
                  </div>
                  <div className="step-text">
                    <h3>Quick Setup</h3>
                    <p>Follow the simple instructions to connect WhatsApp + Jira</p>
                  </div>
                </div>

                <div className="thank-you-step">
                  <div className="step-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="step-text">
                    <h3>Start Managing</h3>
                    <p>Create tickets, update status, and check sprints from WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Redirect Notice */}
              <div className="thank-you-redirect">
                <p>Redirecting to home in <strong>{countdown}</strong> seconds...</p>
              </div>

              {/* Action Buttons */}
              <div className="thank-you-actions">
                <Link to="/" className="btn btn-primary btn-lg">
                  <Home size={20} />
                  Back to Home
                </Link>
                <Link to="/pricing" className="btn btn-outline btn-lg">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-minimal">
        <div className="container">
          <div className="footer-inner-minimal">
            <span className="footer-brand">JiraChatbot</span>
            <div className="footer-links-minimal">
              <Link to="/pricing">Pricing</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
