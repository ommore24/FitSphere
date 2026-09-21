import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Users,
  LayoutDashboard,
  Percent,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { COACH_BENEFITS, COACH_REQUIREMENTS } from '../data/mockCoaches';
import { CoachApplyModal } from '../components/common/CoachApplyModal';
import '../styles/joinCoach.css';

export const JoinCoach = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="container">
        {/* Hero Section for Coaches */}
        <section className="coach-hero">
          <span className="badge badge-coral" style={{ marginBottom: '1rem' }}>
            <Award size={14} /> Coach Network Onboarding
          </span>
          <h1 className="coach-hero-title">
            Become a Verified <br />
            <span style={{ color: 'var(--accent-primary)' }}>FitSphere Coach</span>
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto 2.5rem', fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Elevate your coaching business. Deliver periodized training programs, assign verified supplements, and earn recurring revenue on client nutrition orders.
          </p>

          <button className="btn btn-primary btn-lg" onClick={() => setModalOpen(true)}>
            <Sparkles size={18} />
            <span>Apply as a Fitness Coach</span>
          </button>
        </section>

        {/* Benefits Grid */}
        <section>
          <div className="section-header">
            <span className="badge badge-mint">Why Partner With Us</span>
            <h2 className="section-title">Coach Benefits & Earning Potential</h2>
            <p className="section-subtitle">
              We provide the digital infrastructure, client management tools, and marketplace catalog so you can focus on athlete results.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-wrap">
                <Percent size={24} />
              </div>
              <h3>18% Supplement Commission</h3>
              <p>
                When your athletes order their protein, creatine, and pre-workouts via your personalized recommendation link, you earn ongoing commissions on every transaction.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrap" style={{ background: 'rgba(255, 107, 53, 0.12)', color: 'var(--accent-secondary)' }}>
                <LayoutDashboard size={24} />
              </div>
              <h3>Coaching Command Console</h3>
              <p>
                Assign workout splits directly into your client's FitSphere Fitness Journey view. Monitor their daily calorie compliance and PR progression in real time.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrap" style={{ background: 'rgba(0, 229, 255, 0.12)', color: 'var(--accent-cyan)' }}>
                <ShieldCheck size={24} />
              </div>
              <h3>Verified Coach Badge</h3>
              <p>
                Gain immediate trust with our official verified badge displayed on your coach profile, consultation booking page, and marketplace suggestions.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrap" style={{ background: 'rgba(251, 191, 36, 0.12)', color: 'var(--accent-amber)' }}>
                <DollarSign size={24} />
              </div>
              <h3>Automated Weekly Payouts</h3>
              <p>
                Guaranteed direct bank deposits every Friday with transparent analytics dashboards, student retention reports, and 1099 tax statements.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Requirements */}
        <section>
          <div className="requirements-container">
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
                Strict Standards
              </span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                Coach Verification Requirements
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                To maintain athlete trust and clinical safety across the FitSphere ecosystem, all coach applicants undergo a comprehensive credentials audit.
              </p>

              <ul className="req-checklist">
                {COACH_REQUIREMENTS.map((req, i) => (
                  <li key={i}>
                    <div className="req-badge-circle">
                      <CheckCircle2 size={14} />
                    </div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Application Card */}
            <div className="coach-cta-box">
              <Award size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Ready to Apply?</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: '1.5' }}>
                Applications take approximately 5 minutes. Our board reviews credentials within 48 business hours.
              </p>
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => setModalOpen(true)}
              >
                <span>Submit Coach Application</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Coach Application Modal */}
      <CoachApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
