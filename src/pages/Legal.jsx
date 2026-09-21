import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, FileText, AlertTriangle, Mail, CheckCircle2 } from 'lucide-react';

export const Legal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'terms';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '2.5rem', overflowX: 'auto' }}>
          <button
            className={`btn btn-sm ${activeTab === 'terms' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTabChange('terms')}
          >
            <FileText size={15} />
            <span>Terms of Service</span>
          </button>

          <button
            className={`btn btn-sm ${activeTab === 'privacy' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTabChange('privacy')}
          >
            <ShieldCheck size={15} />
            <span>Privacy Policy</span>
          </button>

          <button
            className={`btn btn-sm ${activeTab === 'disclaimer' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTabChange('disclaimer')}
          >
            <AlertTriangle size={15} />
            <span>Medical Disclaimer</span>
          </button>

          <button
            className={`btn btn-sm ${activeTab === 'contact' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTabChange('contact')}
          >
            <Mail size={15} />
            <span>Contact & Support</span>
          </button>
        </div>

        {/* Tab 1: Terms */}
        {activeTab === 'terms' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Terms of Service</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Effective Date: September 2026 • FitSphere Unified Platform
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              <div>
                <h3 style={{ color: '#fff', marginBottom: '0.4rem' }}>1. Acceptance of Terms</h3>
                <p>
                  By accessing and utilizing FitSphere (including the FitSphere Marketplace and the FitSphere Fitness Journey portal), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access the platform.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#fff', marginBottom: '0.4rem' }}>2. Multi-Brand Marketplace Purchases</h3>
                <p>
                  FitSphere facilitates verified purchases from accredited sports nutrition and equipment manufacturers. All product guarantees, returns, and third-party batch analyses are fulfilled in partnership with certified brand distributors.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#fff', marginBottom: '0.4rem' }}>3. Fitness Coaching and Consultations</h3>
                <p>
                  FitSphere provides an onboarding and scheduling network for independent verified fitness trainers and sports dietitians. FitSphere does not employ coaches directly and disclaims liability for independent training guidance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Privacy */}
        {activeTab === 'privacy' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Privacy & Data Policy</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Your biometric and health tracking data is encrypted and private.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              <div>
                <h3 style={{ color: '#fff', marginBottom: '0.4rem' }}>1. Data We Collect</h3>
                <p>
                  We collect information necessary to tailor your training split and dietary macros (e.g. bodyweight, caloric targets, logged meals, and transaction details). We never sell your personal metrics to third-party ad brokers.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#fff', marginBottom: '0.4rem' }}>2. Data Encryption</h3>
                <p>
                  All fitness journey entries, PR records, and order payment details are encrypted using industry-standard TLS protocols with restricted access tokens.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Disclaimer */}
        {activeTab === 'disclaimer' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <AlertTriangle size={28} color="var(--accent-secondary)" />
              <h1 style={{ fontSize: '2rem', margin: 0 }}>Health & Medical Disclaimer</h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Important safety disclosure for all athletes and users.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              <p>
                <strong>Not Medical Advice:</strong> Content, workout splits, macro breakdowns, and supplement suggestions provided on FitSphere are for educational and performance optimization purposes only. They do not constitute formal medical diagnosis or treatment.
              </p>
              <p>
                <strong>Physician Clearance:</strong> High-intensity resistance training, cardiovascular intervals, and dietary surplus/deficit protocols place substantial demands on the cardiovascular and musculoskeletal systems. Always obtain medical clearance from a qualified physician prior to commencing any physical fitness regimen.
              </p>
              <p>
                <strong>FDA Supplement Notice:</strong> Dietary supplements displayed on the FitSphere Marketplace have not been evaluated by the FDA to diagnose, treat, cure, or prevent any illness.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Contact */}
        {activeTab === 'contact' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Contact & Athlete Support</h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Need assistance with an order, coach inquiry, or feedback on FitSphere? Reach our team directly.
            </p>

            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle2 size={44} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Message Received!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Our athlete support desk responds within 24 hours.
                </p>
                <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => setContactSubmitted(false)}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Athlete Name</label>
                    <input type="text" required className="form-control" placeholder="Alex Rivera" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" required className="form-control" placeholder="alex@domain.com" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-control">
                    <option>Marketplace Order Inquiry</option>
                    <option>Fitness Journey Tracking Question</option>
                    <option>Coach Partnership Support</option>
                    <option>General Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea rows={4} required className="form-control" placeholder="Describe your question or issue in detail..." />
                </div>

                <button type="submit" className="btn btn-primary">
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
