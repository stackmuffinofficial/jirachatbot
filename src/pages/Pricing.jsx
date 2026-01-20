import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, Zap, Star, Crown, Loader2, X } from 'lucide-react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
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
            selectedPlan: selectedPlan?.name || '',
            billingPeriod: isYearly ? 'yearly' : 'monthly',
            price: selectedPlan ? (isYearly ? selectedPlan.price.yearly : selectedPlan.price.monthly) : 0,
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

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setSubmitStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus(null);
  };

  const plans = [
    {
      name: 'Free Forever',
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out JiraChatbot',
      features: [
        '25 messages per day',
        'Standard AI responses',
        'Single User',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Personal Unlimited',
      icon: Star,
      price: { monthly: 30, yearly: 300 },
      description: 'For power users who need more',
      features: [
        'Unlimited messages',
        'Enhanced AI responses',
        'Single User',
      ],
      cta: 'Go Personal',
      popular: true,
    },
    {
      name: 'Team Unlimited',
      icon: Crown,
      price: { monthly: 120, yearly: 400 },
      description: 'For teams who want full control',
      features: [
        'Unlimited Everything',
        'Enhanced AI responses',
        'Unlimited Users',
      ],
      cta: 'Go Unlimited',
      popular: false,
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={18} />
              Back
            </Link>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="JiraChatbot" />
              <span className="logo-text">JiraChatbot</span>
            </Link>
            <div style={{ width: '80px' }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section" style={{ paddingTop: '140px' }}>
        <div className="container">
          {/* Pricing Cards */}
          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto 4rem' }}>
            {plans.map((plan) => (
              <div key={plan.name} className={plan.popular ? 'card card-highlight' : 'card'} style={{ position: 'relative', minWidth: '280px' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                    <span className="badge">
                      <Crown size={16} />
                      Most Popular
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Icon */}
                  <div className="icon-box mb-4">
                    <plan.icon />
                  </div>

                  {/* Plan Name */}
                  <h2 className="mb-1" style={{ fontSize: '1.5rem' }}>{plan.name}</h2>
                  <p className="text-muted mb-4" style={{ fontSize: '0.9375rem' }}>{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-navy)' }}>
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-muted">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    {isYearly && plan.price.monthly > 0 && (
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-success)', marginTop: '0.5rem' }}>
                        Save ${plan.price.monthly * 12 - plan.price.yearly} annually
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1 }}>
                    {plan.features.map((feature) => (
                      <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(13, 148, 136, 0.1)', flexShrink: 0 }}>
                          <Check size={12} style={{ color: 'var(--color-brand-600)' }} />
                        </div>
                        <span style={{ fontSize: '0.9375rem', color: 'var(--color-navy-muted)' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => openModal(plan)}
                    className={`btn btn-lg w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="hero-features">
            <span className="hero-feature">
              <Check size={18} />
              No credit card required
            </span>
            <span className="hero-feature">
              <Check size={18} />
              Cancel anytime
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <Link to="/" className="logo" style={{ gap: '0.5rem' }}>
              <img src="/logo.png" alt="JiraChatbot" style={{ width: '28px', height: '28px' }} />
              <span className="footer-text">JiraChatbot</span>
            </Link>
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
                  We'll reach out soon with early access details for {selectedPlan?.name}.
                </p>
                <button onClick={closeModal} className="btn btn-primary">
                  Got it
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Request Early Access</h2>
                  <p>Get early access to <strong>{selectedPlan?.name}</strong></p>
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
