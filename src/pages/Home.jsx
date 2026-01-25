import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Zap, ArrowRight, Check, Loader2, X, Sparkles, Coffee, Rocket, Heart, MessageSquare, Timer, Smartphone } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activePainTab, setActivePainTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
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
            email: formData.email,
          }),
        }
      );

      if (response.ok) {
        setFormData({ email: '' });
        setIsModalOpen(false);
        navigate('/thank-you');
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

  const painPoints = [
    {
      number: '01',
      title: 'Slow & Laggy',
      problem: 'Jira Cloud is painfully slow. Page loads take forever, the UI freezes, and larger projects feel like wading through molasses.',
      solution: 'JiraChatbot runs on WhatsApp — instant responses, zero loading screens. Create tickets, check status, update issues in seconds. No more watching that blue spinner.',
      emoji: '🐌'
    },
    {
      number: '02',
      title: 'Too Complicated',
      problem: 'Too many menus. Too many options. Finding a simple issue means clicking through boards, backlogs, filters, and sprints. New team members are lost for weeks.',
      solution: 'Just text what you need. "Show my open tickets" or "Create a bug for login page". Natural language, zero learning curve. Your intern can use it on day one.',
      emoji: '🤯'
    },
    {
      number: '03',
      title: 'Workflow Chaos',
      problem: 'Custom fields everywhere. 47 status options. Workflows that look like spaghetti. Nobody knows what "In Review (Legacy)" means anymore.',
      solution: 'JiraChatbot cuts through the chaos. It shows you what matters — your tasks, your sprint, your deadlines. Clean and simple, no matter how messy your Jira setup is.',
      emoji: '🍝'
    },
    {
      number: '04',
      title: 'Always Out of Reach',
      problem: 'Need to update a ticket but you\'re on mobile? Good luck with that tiny UI. On a call? Can\'t open Jira. Away from your desk? Forget about it. Jira demands your full attention and a proper screen.',
      solution: 'WhatsApp is already on your phone, always open, always accessible. Update tickets while commuting, check sprint status during lunch, create bugs the moment you spot them. Jira finally goes where you go.',
      emoji: '📱'
    },
  ];

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
            <Link to="/" className="logo">
              <img src="/logo.png" alt="JiraChatbot" />
            </Link>
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

      {/* Trusted By - Logo Carousel */}
      <section className="section-fun logo-section logo-section-top">
        <div className="container">
          <div className="section-header-fun" style={{ marginBottom: '1.5rem' }}>
            <span className="section-eyebrow">Trusted by teams at</span>
          </div>
        </div>
        <div className="logo-carousel">
          <div className="logo-track">
            {/* First set of logos */}
            <div className="logo-slide"><img src="/logos/logo1.png" alt="Company 1" /></div>
            <div className="logo-slide"><img src="/logos/logo2.png" alt="Company 2" /></div>
            <div className="logo-slide"><img src="/logos/logo3.png" alt="Company 3" /></div>
            <div className="logo-slide"><img src="/logos/logo4.png" alt="Company 4" /></div>
            <div className="logo-slide"><img src="/logos/logo5.png" alt="Company 5" /></div>
            <div className="logo-slide"><img src="/logos/logo6.png" alt="Company 6" /></div>
            <div className="logo-slide"><img src="/logos/logo7.png" alt="Company 7" /></div>
            <div className="logo-slide"><img src="/logos/logo8.png" alt="Company 8" /></div>
            <div className="logo-slide"><img src="/logos/logo9.png" alt="Company 9" /></div>
            <div className="logo-slide"><img src="/logos/logo10.png" alt="Company 10" /></div>
            <div className="logo-slide"><img src="/logos/logo11.png" alt="Company 11" /></div>
            <div className="logo-slide"><img src="/logos/logo12.png" alt="Company 12" /></div>
            {/* Duplicate for seamless loop */}
            <div className="logo-slide"><img src="/logos/logo1.png" alt="Company 1" /></div>
            <div className="logo-slide"><img src="/logos/logo2.png" alt="Company 2" /></div>
            <div className="logo-slide"><img src="/logos/logo3.png" alt="Company 3" /></div>
            <div className="logo-slide"><img src="/logos/logo4.png" alt="Company 4" /></div>
            <div className="logo-slide"><img src="/logos/logo5.png" alt="Company 5" /></div>
            <div className="logo-slide"><img src="/logos/logo6.png" alt="Company 6" /></div>
            <div className="logo-slide"><img src="/logos/logo7.png" alt="Company 7" /></div>
            <div className="logo-slide"><img src="/logos/logo8.png" alt="Company 8" /></div>
            <div className="logo-slide"><img src="/logos/logo9.png" alt="Company 9" /></div>
            <div className="logo-slide"><img src="/logos/logo10.png" alt="Company 10" /></div>
            <div className="logo-slide"><img src="/logos/logo11.png" alt="Company 11" /></div>
            <div className="logo-slide"><img src="/logos/logo12.png" alt="Company 12" /></div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Tabbed */}
      <section className="section-fun" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header-fun">
            <span className="section-eyebrow">Sound familiar?</span>
            <h2 className="section-title-fun">Jira's biggest headaches. We fix all of them.</h2>
          </div>

          <div className="steps-tabbed">
            {/* Tab Buttons */}
            <div className="steps-tabs">
              {painPoints.map((item, index) => (
                <button
                  key={item.number}
                  className={`step-tab ${activePainTab === index ? 'active' : ''}`}
                  onClick={() => setActivePainTab(index)}
                >
                  <span className="step-tab-emoji">{item.emoji}</span>
                  <span className="step-tab-number">{item.number}</span>
                  <span className="step-tab-title">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="steps-content">
              <div className="steps-content-inner pain-content">
                <div className="pain-point-content">
                  <div className="steps-text-header">
                    <span className="steps-text-emoji">{painPoints[activePainTab].emoji}</span>
                    <h3 className="steps-text-title">{painPoints[activePainTab].title}</h3>
                  </div>
                  <div className="pain-problem">
                    <span className="pain-label">😤 The Problem</span>
                    <p>{painPoints[activePainTab].problem}</p>
                  </div>
                  <div className="pain-solution">
                    <span className="pain-label">✨ How We Fix It</span>
                    <p>{painPoints[activePainTab].solution}</p>
                  </div>
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
      <section className="section-fun">
        <div className="container">
          <div className="testimonial-teaser">
            <p className="quote">"I updated 3 tickets while waiting for my coffee. My standup took 30 seconds. My manager thinks I'm a productivity god."</p>
            <p className="author">— Every developer after trying this</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-fun">
        <div className="container">
          <div className="cta-fun">
            <div className="cta-emoji">🚀</div>
            <h2>Stop torturing yourself.</h2>
            <p>Life's too short for Jira tabs.</p>
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

            <div className="modal-header-fun">
              <span className="modal-emoji">💬</span>
              <h2>Say Goodbye to Jira Tabs</h2>
              <p>Drop your email and we'll get you set up with WhatsApp + Jira magic</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
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
                    Setting things up...
                  </>
                ) : (
                  <>
                    <Rocket size={20} />
                    Start My Jira-Free Life
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
