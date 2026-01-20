import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Zap, ArrowRight, Check, Loader2, X, Sparkles, Coffee, Rocket, Heart, MessageSquare, Timer, Smartphone } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
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

  const steps = [
    {
      number: '01',
      title: 'Sign Up in Seconds',
      desc: 'Quick registration with just your email. No credit card, no long forms, no approval needed. You\'ll be done before your coffee gets cold.',
      image: '/images/step1-signup.png',
      emoji: '⚡'
    },
    {
      number: '02',
      title: 'Connect Your Jira',
      desc: 'One-click OAuth connection to your Jira workspace. We never store your password - just secure, revocable access tokens. Your IT team will love it.',
      image: '/images/step2-jira.png',
      emoji: '🔗'
    },
    {
      number: '03',
      title: 'Chat with Jira on WhatsApp',
      desc: 'Send a message, create a ticket. Ask a question, get sprint updates. It\'s like having a Jira expert in your pocket who never sleeps.',
      image: '/images/step3-whatsapp.png',
      emoji: '🚀'
    },
  ];

  return (
    <>
      {/* Minimal Header */}
      <header className="header-minimal">
        <div className="container">
          <div className="header-inner">
            <div></div>
            <nav className="nav">
              <Link to="/pricing" className="nav-link">Pricing</Link>
              <button onClick={openModal} className="btn btn-primary btn-sm">
                I Need This Now
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Fun & Bold */}
      <section className="hero-fun">
        <div className="container">
          <div className="hero-emoji-row">
            <span>💬</span>
            <span>+</span>
            <span>📋</span>
            <span>=</span>
            <span>🎉</span>
          </div>

          <h1 className="hero-title-fun">
            Jira in WhatsApp.<br />
            <span className="text-gradient">Yes, really.</span>
          </h1>

          <p className="hero-subtitle-fun">
            Create tickets while pooping. Update status from bed.<br />
            Check sprint progress without opening that cursed Jira tab.<br />
            <span className="text-highlight">Your PM will think you're a wizard.</span>
          </p>

          <div className="hero-buttons-fun">
            <button onClick={openModal} className="btn btn-cta btn-lg">
              <Sparkles size={20} />
              I Need This Now
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-proof">
            <div className="proof-item">
              <Check size={16} />
              <span>Free forever tier</span>
            </div>
            <div className="proof-item">
              <Coffee size={16} />
              <span>Setup faster than making coffee</span>
            </div>
            <div className="proof-item">
              <Heart size={16} />
              <span>No Jira admin approval needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* What is JiraChatbot Section */}
      <section className="section-fun" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="what-is-section">
            <div className="what-is-content">
              <span className="section-eyebrow">The missing piece</span>
              <h2 className="what-is-title">Jira is powerful. Using it shouldn't feel like work.</h2>
              <p className="what-is-text">
                Every developer knows the drill: you're in the zone, code flowing, then you need to update a ticket.
                Tab switch. Load Jira. Find the project. Find the issue. Update the status. Lose your flow. Repeat 20 times a day.
              </p>
              <p className="what-is-text">
                <strong>JiraChatbot bridges that gap.</strong> It brings Jira to where you already are - WhatsApp.
                Create tickets with a text. Update statuses with a message. Check sprint progress while waiting for your build.
                No more context switching. No more Jira tabs.
              </p>
              <div className="what-is-features">
                <div className="what-is-feature">
                  <MessageSquare size={20} />
                  <span>Natural language commands</span>
                </div>
                <div className="what-is-feature">
                  <Timer size={20} />
                  <span>Saves 30+ minutes daily</span>
                </div>
                <div className="what-is-feature">
                  <Smartphone size={20} />
                  <span>Works on any device</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Tabbed Interface */}
      <section className="section-fun">
        <div className="container">
          <div className="section-header-fun">
            <span className="section-eyebrow">Dead simple</span>
            <h2 className="section-title-fun">3 steps. 2 minutes. Zero meetings.</h2>
          </div>

          <div className="steps-tabbed">
            {/* Tab Buttons */}
            <div className="steps-tabs">
              {steps.map((item, index) => (
                <button
                  key={item.number}
                  className={`step-tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <span className="step-tab-emoji">{item.emoji}</span>
                  <span className="step-tab-number">{item.number}</span>
                  <span className="step-tab-title">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="steps-content">
              <div className="steps-content-inner">
                <div className="steps-text">
                  <div className="steps-text-header">
                    <span className="steps-text-emoji">{steps[activeTab].emoji}</span>
                    <h3 className="steps-text-title">{steps[activeTab].title}</h3>
                  </div>
                  <p className="steps-text-desc">{steps[activeTab].desc}</p>
                  <div className="steps-text-number">Step {steps[activeTab].number}</div>
                </div>
                <div className="steps-image">
                  <img
                    src={steps[activeTab].image}
                    alt={steps[activeTab].title}
                    className="steps-image-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section - Conversational */}
      <section className="section-fun">
        <div className="container">
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🛋️</div>
              <h3>Work from anywhere</h3>
              <p>Couch, toilet, beach, whatever. If you have WhatsApp, you have Jira.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🧠</div>
              <h3>Zero context switching</h3>
              <p>Stay in your flow. No more "let me just check Jira real quick" (5 hours later...)</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🔒</div>
              <h3>Secure AF</h3>
              <p>OAuth 2.0, we never see your password. Revoke anytime. Your IT team will approve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Teaser */}
      <section className="section-fun" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="testimonial-teaser">
            <p className="quote">"I updated 3 tickets while waiting for my coffee. My standup took 30 seconds. My manager thinks I'm a productivity god."</p>
            <p className="author">— Every developer after trying this</p>
          </div>
        </div>
      </section>

      {/* CTA Section - Urgent */}
      <section className="section-fun">
        <div className="container">
          <div className="cta-fun">
            <div className="cta-emoji">🚀</div>
            <h2>Stop torturing yourself.</h2>
            <p>Life's too short for Jira tabs. Join the waitlist.</p>
            <button onClick={openModal} className="btn btn-cta btn-lg">
              <Rocket size={20} />
              I Need This Now
            </button>
            <p className="cta-note">We're onboarding teams weekly. Don't be last.</p>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="footer-minimal">
        <div className="container">
          <div className="footer-inner-minimal">
            <span className="footer-brand">JiraChatbot</span>
            <div className="footer-links-minimal">
              <Link to="/pricing">Pricing</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
            <a
              href="https://autommate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-powered"
            >
              Powered by Autom Mate
            </a>
          </div>
        </div>
      </footer>

      {/* Early Access Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-fun" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            {submitStatus === 'success' ? (
              <div className="modal-success-fun">
                <div className="success-emoji">🎉</div>
                <h2>You're in!</h2>
                <p>We'll hit you up soon. Get ready to never open Jira again.</p>
                <button onClick={closeModal} className="btn btn-primary">
                  Nice!
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header-fun">
                  <span className="modal-emoji">✨</span>
                  <h2>Join the Cool Kids</h2>
                  <p>Early access = bragging rights + first dibs</p>
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
                      placeholder="What should we call you?"
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
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="occupation">What do you do?</label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="Developer, PM, Professional Tab Closer..."
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
                      placeholder="Where the magic happens"
                      required
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="form-error">
                      Oops, something broke. Try again?
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-cta btn-lg"
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinning" />
                        Hold tight...
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        Count Me In
                      </>
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
