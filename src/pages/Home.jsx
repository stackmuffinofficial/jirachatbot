import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MessageCircle, Zap, Shield, ArrowRight, Check, Sparkles, Bot, Clock, Loader2, X, Play } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeGif, setActiveGif] = useState(null);
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
      title: 'Talk, Don\'t Click',
      description: 'Just type what you need. "Create a bug for login page" - done. No more navigating through menus.',
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Get notified the moment something changes. Comments, status updates, assignments - all in WhatsApp.',
    },
    {
      icon: Shield,
      title: 'Your Data, Your Control',
      description: 'OAuth 2.0 means we never see your password. Revoke access anytime with one click.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      desc: '30 seconds, no credit card',
      icon: Sparkles,
      gif: '/gifs/register.gif',
      placeholder: 'Registration flow preview'
    },
    {
      number: '02',
      title: 'Connect Jira',
      desc: 'One OAuth click',
      icon: Bot,
      gif: '/gifs/jira.gif',
      placeholder: 'Jira connection preview'
    },
    {
      number: '03',
      title: 'Start Shipping',
      desc: 'Message your Jira',
      icon: Clock,
      gif: '/gifs/whatsapp.gif',
      placeholder: 'WhatsApp chat preview'
    },
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
                Get Early Access
                <ArrowRight size={16} />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-compact">
        <div className="container">
          <div className="hero-badge">
            <span className="badge">
              <Zap size={14} />
              Your Jira, now on WhatsApp
            </span>
          </div>

          <h1 className="hero-title-compact">
            Stop context switching.<br />
            <span className="text-brand">Ship faster.</span>
          </h1>

          <p className="hero-subtitle-compact">
            Create tickets, update status, check sprint progress - all from WhatsApp.<br />
            Because alt-tabbing to Jira 50 times a day is not a workflow.
          </p>

          <div className="hero-buttons-compact">
            <button
              onClick={openModal}
              className="btn btn-primary btn-lg"
            >
              Get Early Access
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-features-compact">
            <span className="hero-feature">
              <Check size={16} />
              Free tier forever
            </span>
            <span className="hero-feature">
              <Check size={16} />
              Setup in 2 min
            </span>
            <span className="hero-feature">
              <Check size={16} />
              No Jira admin needed
            </span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section-compact" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header-compact">
            <h2 className="section-title-compact">Three steps. That's it.</h2>
            <p className="section-subtitle-compact">
              We made it stupid simple because you have actual work to do.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((item) => (
              <div key={item.number} className="step-card" onClick={() => setActiveGif(item)}>
                <div className="step-gif-container">
                  <div className="step-gif-placeholder">
                    <Play size={32} />
                    <span>{item.placeholder}</span>
                  </div>
                </div>
                <div className="step-content">
                  <span className="step-number-badge">{item.number}</span>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-compact">
        <div className="container">
          <div className="section-header-compact">
            <h2 className="section-title-compact">Why devs love it</h2>
          </div>

          <div className="features-row">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={20} />
                </div>
                <div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-compact">
        <div className="container">
          <div className="cta-compact">
            <h2 className="cta-title-compact">Ready to ditch the Jira tab?</h2>
            <p className="cta-subtitle-compact">
              Join the waitlist. We're onboarding teams weekly.
            </p>
            <button
              onClick={openModal}
              className="btn btn-primary btn-lg"
            >
              Get Early Access
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-compact">
        <div className="container">
          <div className="footer-inner-compact">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="JiraChatbot" style={{ width: '28px', height: '28px' }} />
              <span className="logo-text" style={{ fontSize: '1rem' }}>JiraChatbot</span>
            </Link>

            <div className="footer-links-compact">
              <Link to="/pricing" className="footer-link">Pricing</Link>
              <Link to="/privacy" className="footer-link">Privacy</Link>
              <Link to="/terms" className="footer-link">Terms</Link>
            </div>

            <a
              href="https://autommate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ fontSize: '0.8125rem' }}
            >
              Powered by Autom Mate
            </a>
          </div>
        </div>
      </footer>

      {/* GIF Modal */}
      {activeGif && (
        <div className="modal-overlay" onClick={() => setActiveGif(null)}>
          <div className="gif-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveGif(null)}>
              <X size={24} />
            </button>
            <div className="gif-modal-content">
              <div className="gif-placeholder-large">
                <Play size={48} />
                <h3>{activeGif.title}</h3>
                <p>GIF preview coming soon</p>
                <p className="gif-path">Place your GIF at: <code>{activeGif.gif}</code></p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <h2 style={{ marginBottom: '0.5rem' }}>You're in!</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                  We'll hit you up when it's your turn.
                </p>
                <button onClick={closeModal} className="btn btn-primary">
                  Nice
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Get Early Access</h2>
                  <p>Be first in line when we launch</p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
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
                      placeholder="jane@company.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="occupation">Role</label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="Senior Dev, PM, etc."
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
                      Something went wrong. Try again?
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
                      'Join Waitlist'
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
