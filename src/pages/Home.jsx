import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MessageCircle, Zap, Shield, ArrowRight, Check, Sparkles, Bot, Clock, Loader2, X } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    company: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        'https://presales.autommate.app:443/api/v1/automs/run/1f1195bd-c5b7-408a-9dfe-49281cba6774?apiKey=PDV905A-YBNMBCS-HA2QMRT-W4X26ZV',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            occupation: formData.occupation,
            company: formData.company,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', occupation: '', company: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed to submit early access request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSubmitStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus(null);
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'Natural Language',
      description: 'Chat naturally with AI that understands your intent and executes the right Jira actions.',
    },
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Create issues, update statuses, and get instant notifications on WhatsApp.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'OAuth 2.0 authentication ensures your credentials are never stored.',
    },
  ];

  const steps = [
    { number: '01', title: 'Register', desc: 'Sign up with your email', icon: Sparkles },
    { number: '02', title: 'Connect to Jira', desc: 'Authorize your workspace', icon: Bot },
    { number: '03', title: 'Start Chatting', desc: 'Manage Jira instantly', icon: Clock },
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="JiraChatbot" />
              <span className="logo-text">JiraChatbot</span>
            </Link>
            <nav className="nav">
              <Link to="/pricing" className="nav-link">Pricing</Link>
              <button
                onClick={openModal}
                className="btn btn-primary btn-sm"
              >
                Request Early Access
                <ArrowRight size={16} />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="badge">
              <MessageCircle size={14} />
              WhatsApp + Jira Integration
            </span>
          </div>

          <h1 className="hero-title">
            Manage Jira from <span className="text-brand">WhatsApp</span>
          </h1>

          <p className="hero-subtitle">
            Create issues, update statuses, and track projects directly from WhatsApp.
            No more switching between apps.
          </p>

          <div className="hero-buttons">
            <button
              onClick={openModal}
              className="btn btn-primary btn-lg"
            >
              Request Early Access
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-features">
            <span className="hero-feature">
              <Check size={18} />
              No credit card required
            </span>
            <span className="hero-feature">
              <Check size={18} />
              10 free messages/day
            </span>
            <span className="hero-feature">
              <Check size={18} />
              2 minute setup
            </span>
          </div>

          <div className="hero-image">
            <img src="/logo.png" alt="JiraChatbot" className="hero-logo" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge badge-warm">Features</span>
            </div>
            <h2 className="section-title">Why teams choose JiraChatbot</h2>
            <p className="section-subtitle">
              The fastest way to manage Jira without leaving your favorite messaging app
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <div className="icon-box mb-4">
                  <feature.icon />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge">How it Works</span>
            </div>
            <h2 className="section-title">Get started in 3 simple steps</h2>
            <p className="section-subtitle">
              Connect your Jira workspace to WhatsApp in minutes
            </p>
          </div>

          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {steps.map((item) => (
              <div key={item.number} className="text-center">
                <div className="icon-box mb-4" style={{ margin: '0 auto' }}>
                  <item.icon />
                </div>
                <span className="badge mb-3" style={{ fontSize: '0.75rem' }}>{item.number}</span>
                <h3 className="mb-1" style={{ fontSize: '1.25rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9375rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={openModal}
              className="btn btn-primary btn-lg"
            >
              Request Early Access
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="cta-section">
            <h2 className="cta-title">Ready to take your jira to next level?</h2>
            <p className="cta-subtitle">
              Join JiraChatbot to manage projects faster.
            </p>
            <div className="cta-buttons">
              <button
                onClick={openModal}
                className="btn btn-primary btn-lg"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner" style={{ flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
              <Link to="/" className="logo">
                <img src="/logo.png" alt="JiraChatbot" style={{ width: '36px', height: '36px' }} />
                <span className="logo-text">JiraChatbot</span>
              </Link>
              <p className="footer-text" style={{ maxWidth: '300px' }}>
                The easiest way to manage Jira through WhatsApp.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/pricing" className="footer-link">Pricing</Link>
              <button onClick={openModal} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Request Access</button>
              <Link to="/privacy" className="footer-link">Privacy</Link>
              <Link to="/terms" className="footer-link">Terms</Link>
            </div>

            <div style={{ borderTop: '1px solid rgba(45, 48, 71, 0.08)', paddingTop: '1.5rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <p className="footer-text">
                &copy; {new Date().getFullYear()} JiraChatbot. All rights reserved.
              </p>
              <a
                href="https://autommate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Powered by Autom Mate
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Early Access Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            {submitStatus === 'success' ? (
              <div className="modal-success">
                <div className="icon-box mb-4" style={{ margin: '0 auto', background: 'var(--color-success)', color: 'white' }}>
                  <Check size={24} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>You're on the list!</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                  We'll reach out soon with early access details.
                </p>
                <button onClick={closeModal} className="btn btn-primary">
                  Got it
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Request Early Access</h2>
                  <p>Be among the first to experience JiraChatbot</p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="occupation">Occupation</label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="Product Manager"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Acme Inc."
                      required
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="form-error">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinning" />
                        Submitting...
                      </>
                    ) : (
                      'Request Access'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
