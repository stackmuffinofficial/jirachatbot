import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using JiraChatbot, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.`,
    },
    {
      title: '2. Description of Service',
      content: `JiraChatbot provides a WhatsApp-based interface to interact with Atlassian Jira. Our service allows you to create, update, and manage Jira issues through WhatsApp messages. The service is provided "as is" and we reserve the right to modify or discontinue features at any time.`,
    },
    {
      title: '3. User Accounts',
      intro: 'To use JiraChatbot, you must:',
      items: [
        'Provide accurate and complete registration information',
        'Be authorized to connect the Jira workspace you\'re linking',
        'Maintain the security of your account credentials',
        'Notify us immediately of any unauthorized account access',
      ],
    },
    {
      title: '4. Acceptable Use',
      intro: 'You agree not to:',
      items: [
        'Use the service for any illegal or unauthorized purpose',
        'Attempt to gain unauthorized access to our systems',
        'Interfere with or disrupt the service or servers',
        'Reverse engineer or attempt to extract source code',
        'Use automated systems to access the service without permission',
        'Resell or redistribute the service without authorization',
      ],
    },
    {
      title: '5. Payment Terms',
      content: `Paid subscriptions are billed in advance on a monthly or annual basis. All payments are non-refundable except as required by law. We reserve the right to change pricing with 30 days notice. You can cancel your subscription at any time; access continues until the end of the current billing period.`,
    },
    {
      title: '6. Intellectual Property',
      content: `JiraChatbot and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws. Jira is a trademark of Atlassian. WhatsApp is a trademark of Meta Platforms, Inc.`,
    },
    {
      title: '7. Limitation of Liability',
      content: `To the maximum extent permitted by law, JiraChatbot shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.`,
    },
    {
      title: '8. Termination',
      content: `We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion. Upon termination, your right to use the service will immediately cease.`,
    },
    {
      title: '9. Changes to Terms',
      content: `We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Your continued use of the service after changes constitutes acceptance of the modified terms.`,
    },
    {
      title: '10. Contact Us',
      content: 'If you have any questions about these Terms, please contact us at',
      email: 'legal@jirachatbot.com',
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
            </Link>
            <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={18} />
              Home
            </Link>
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
                <div className="icon-box">
                  <FileText />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Terms of Service</h1>
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
                              <span className="text-muted">{item}</span>
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
            <span className="footer-brand">JiraChatbot</span>
            <div className="footer-links-minimal">
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
