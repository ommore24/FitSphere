import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import '../../styles/footer.css';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <div className="brand-icon">
                <Zap size={20} />
              </div>
              <span className="brand-name">
                Fit<span className="brand-sphere">Sphere</span>
              </span>
            </Link>
            <p>
              The premier unified multi-brand fitness marketplace and adaptive health journey.
              Curating clinically-backed nutrition, high-durability gear, and personalized athletic programming.
            </p>
            <div className="footer-socials">
              <a href="#instagram" className="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#youtube" className="social-link" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9"/>
                </svg>
              </a>
              <a href="#twitter" className="social-link" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div className="footer-col">
            <h4>Marketplace</h4>
            <ul className="footer-links">
              <li>
                <Link to="/marketplace">All Supplements</Link>
              </li>
              <li>
                <Link to="/marketplace">Proteins & Isolates</Link>
              </li>
              <li>
                <Link to="/marketplace">Creatine & Aminos</Link>
              </li>
              <li>
                <Link to="/marketplace">Performance Gear</Link>
              </li>
              <li>
                <Link to="/marketplace">Healthy High-Protein Snacks</Link>
              </li>
            </ul>
          </div>

          {/* Fitness Journey Navigation */}
          <div className="footer-col">
            <h4>Fitness Journey</h4>
            <ul className="footer-links">
              <li>
                <Link to="/fitness-journey">Personal Dashboard</Link>
              </li>
              <li>
                <Link to="/fitness-journey">Goal Tracking & Rings</Link>
              </li>
              <li>
                <Link to="/fitness-journey">Daily Macro Logging</Link>
              </li>
              <li>
                <Link to="/fitness-journey">Exercise & Workout Splits</Link>
              </li>
              <li>
                <Link to="/recommendations">Goal Recommendations</Link>
              </li>
            </ul>
          </div>

          {/* FitSphere Community & Coach */}
          <div className="footer-col">
            <h4>Community</h4>
            <ul className="footer-links">
              <li>
                <Link to="/join-coach">Become a Coach</Link>
              </li>
              <li>
                <Link to="/join-coach">Coach Verification</Link>
              </li>
              <li>
                <Link to="/profile">Athlete Profile</Link>
              </li>
              <li>
                <Link to="/admin">
                  <span style={{ color: 'var(--accent-cyan)' }}>Admin Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/legal?tab=contact">Contact & Support</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="newsletter-box">
            <h4>Join the Sphere</h4>
            <p>
              Receive exclusive research-backed training protocols, early access drop alerts, and partner discounts.
            </p>
            {isSubscribed ? (
              <div className="newsletter-feedback">
                <CheckCircle2 size={16} />
                <span>You're in! Welcome to the FitSphere inner circle.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Lock size={12} />
              <span>Zero spam. Unsubscribe at any instant.</span>
            </div>
          </div>
        </div>

        {/* Health Disclaimer */}
        <div className="footer-disclaimer">
          <strong>Health & FDA Disclaimer:</strong> Statements made on FitSphere regarding dietary supplements have not been evaluated by the Food and Drug Administration. These products and digital workout plans are not intended to diagnose, treat, cure, or prevent any disease. Always consult your physician before beginning any new training regimen, supplementation, or dietary alteration.
        </div>

        {/* Bottom Bar with Legal Links */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} FitSphere Inc. All rights reserved. Built for high-performance athletes.
          </div>
          <div className="footer-legal-links">
            <Link to="/legal?tab=terms">Terms of Service</Link>
            <Link to="/legal?tab=privacy">Privacy Policy</Link>
            <Link to="/legal?tab=disclaimer">Medical Disclaimer</Link>
            <Link to="/legal?tab=contact">Help & Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
