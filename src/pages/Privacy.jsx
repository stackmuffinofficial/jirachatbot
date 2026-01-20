import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
  const sections = [
    {
      title: '1. Introduction',
      content: `JiraChatbot ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our WhatsApp-based Jira integration service.`,
    },
    {
      title: '2. Information We Collect',
      intro: 'We collect the following types of information:',
      items: [
        { label: 'Account Information', desc: 'Email address and phone number for authentication.' },
        { label: 'Jira Access Tokens', desc: 'OAuth 2.0 tokens to access your Jira workspace.' },
        { label: 'Usage Data', desc: 'Information about how you interact with our service.' },
        { label: 'Payment Information', desc: 'Processed securely through Stripe.' },
      ],
    },
    {
      title: '3. How We Use Your Information',
      intro: 'We use the collected information to:',
      items: [
        { desc: 'Provide and maintain our service' },
        { desc: 'Process your Jira requests via WhatsApp' },
        { desc: 'Send you service-related notifications' },
        { desc: 'Process payments and improve our service' },
      ],
    },
    {
      title: '4. Data Security',
      content: `We implement industry-standard security measures to protect your data. All data transmission is encrypted using TLS/SSL. We use OAuth 2.0 for Jira authentication, meaning we never see or store your Jira password.`,
    },
    {
      title: '5. Third-Party Services',
      intro: 'We use the following third-party services:',
      items: [
        { label: 'Atlassian Jira', desc: 'To connect with your workspace' },
        { label: 'WhatsApp Business API', desc: 'To send and receive messages' },
        { label: 'Stripe', desc: 'To process payments securely' },
      ],
    },
    {
      title: '6. Data Retention',
      content: `We retain your data only as long as necessary to provide our services. Message history is retained for 30 days. Upon account deletion, all data is removed within 30 days.`,
    },
    {
      title: '7. Your Rights',
      intro: 'You have the right to:',
      items: [
        { desc: 'Access the personal data we hold about you' },
        { desc: 'Request correction or deletion of your data' },
        { desc: 'Revoke Jira access at any time' },
        { desc: 'Export your data in a portable format' },
      ],
    },
    {
      title: '8. Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us at',
      email: 'privacy@jirachatbot.com',
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
              Home
            </Link>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="JiraChatbot" />
              <span className="logo-text">JiraChatbot</span>
            </Link>
            <div style={{ width: '80px' }} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="section" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card-static">
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div className="icon-box icon-box-warm">
                  <Shield />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Privacy Policy</h1>
                  <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(45, 48, 71, 0.08)', marginBottom: '2rem' }} />

              {/* Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {sections.map((section, index) => (
                  <section key={index}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-navy)' }}>{section.title}</h2>
                    {section.content && (
                      <p className="text-muted" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>
                        {section.content}
                        {section.email && (
                          <a href={`mailto:${section.email}`} className="footer-link" style={{ marginLeft: '0.25rem' }}>
                            {section.email}
                          </a>
                        )}
                      </p>
                    )}
                    {section.intro && (
                      <>
                        <p className="text-muted" style={{ fontSize: '0.9375rem', marginBottom: '1rem' }}>{section.intro}</p>
                        <ul style={{ listStyle: 'none' }}>
                          {section.items.map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                              <span style={{ width: '6px', height: '6px', background: 'var(--color-brand-500)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0 }} />
                              <span className="text-muted">
                                {item.label && <strong style={{ color: 'var(--color-navy)' }}>{item.label}:</strong>}
                                {item.label ? ' ' : ''}{item.desc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <Link to="/" className="logo" style={{ gap: '0.5rem' }}>
              <img src="/logo.png" alt="JiraChatbot" style={{ width: '24px', height: '24px' }} />
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
    </>
  );
}
