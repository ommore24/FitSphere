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
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import '../styles/joinCoach.css';

export const JoinCoach = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [onPageSubmitted, setOnPageSubmitted] = useState(false);
  const [onPageData, setOnPageData] = useState({
    fullName: '',
    email: '',
    phone: '',
    certification: 'NSCA-CSCS',
    experienceYears: '3-5 years',
    specialization: 'Hypertrophy & Strength',
    portfolioUrl: '',
    credentialsFile: '',
    statement: ''
  });

  const handleOnPageSubmit = async (e) => {
    e.preventDefault();

    if (isSupabaseConfigured) {
      try {
        await supabase.from('coach_applications').insert({
          full_name: onPageData.fullName,
          email: onPageData.email,
          phone: onPageData.phone,
          specialization: onPageData.specialization,
          experience_years: parseInt(onPageData.experienceYears) || 3,
          qualifications: onPageData.certification,
          certification_name: onPageData.certification,
          certification_number: 'CERT-' + Math.floor(100000 + Math.random() * 900000),
          issuing_organization: 'NSCA / NASM',
          bio: onPageData.statement,
          status: 'PENDING'
        });
      } catch (err) {
        console.warn('Coach application submission fallback:', err);
      }
    }

    setOnPageSubmitted(true);
  };

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

        {/* On-Page Coach Application Section */}
        <section id="coach-application-section" className="coach-form-section">
          <div className="coach-application-card">
            <div className="coach-form-header">
              <span className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>
                <Award size={14} /> Official Onboarding
              </span>
              <h2>Coach Accreditation & Application Form</h2>
              <p>
                Submit your credentials and coaching portfolio directly to our Athletic Review Board for certified accreditation.
              </p>
            </div>

            {onPageSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(0, 245, 155, 0.15)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 24px rgba(0, 245, 155, 0.3)'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Application Submitted!</h3>
                <p style={{ maxWidth: '500px', margin: '0 auto 2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Thank you for applying, <strong>{onPageData.fullName || 'Coach'}</strong>. Our board will verify your credentials and respond to <strong>{onPageData.email}</strong> within 48 business hours.
                </p>
                <button className="btn btn-secondary" onClick={() => setOnPageSubmitted(false)}>
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleOnPageSubmit}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Coach Sarah Jenkins"
                      value={onPageData.fullName}
                      onChange={(e) => setOnPageData({ ...onPageData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Professional Email *</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="sarah@athleteprep.com"
                      value={onPageData.email}
                      onChange={(e) => setOnPageData({ ...onPageData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={onPageData.phone}
                      onChange={(e) => setOnPageData({ ...onPageData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Years of Coaching Experience *</label>
                    <select
                      className="form-control"
                      value={onPageData.experienceYears}
                      onChange={(e) => setOnPageData({ ...onPageData, experienceYears: e.target.value })}
                    >
                      <option value="2-3 years">2 - 3 Years</option>
                      <option value="3-5 years">3 - 5 Years</option>
                      <option value="5-10 years">5 - 10 Years</option>
                      <option value="10+ years">10+ Years Master Coach</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Primary Credential / Certification *</label>
                    <select
                      className="form-control"
                      value={onPageData.certification}
                      onChange={(e) => setOnPageData({ ...onPageData, certification: e.target.value })}
                    >
                      <option value="NSCA-CSCS">NSCA - CSCS (Strength & Conditioning)</option>
                      <option value="NASM-CPT/PES">NASM - CPT / PES Performance</option>
                      <option value="RD">Registered Dietitian (RD / CSSD)</option>
                      <option value="ACSM-EP">ACSM - Certified Exercise Physiologist</option>
                      <option value="USAW">USA Weightlifting (USAW L1/L2)</option>
                      <option value="Other">Other Nationally Accredited</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Portfolio / Social / Coaching Website</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://instagram.com/coach or https://yourcoaching.com"
                      value={onPageData.portfolioUrl}
                      onChange={(e) => setOnPageData({ ...onPageData, portfolioUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Certification / Credential Document (PDF or Image)</label>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="form-control"
                    onChange={(e) => setOnPageData({ ...onPageData, credentialsFile: e.target.files?.[0]?.name || '' })}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                    Attach your certification certificate or audit document (PDF, PNG, JPG - Max 10MB).
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Coaching Philosophy & Specialization Summary</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Briefly describe your programming methodology, athlete periodization, nutrition compliance approach, and past client achievements..."
                    value={onPageData.statement}
                    onChange={(e) => setOnPageData({ ...onPageData, statement: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setOnPageData({
                      fullName: '',
                      email: '',
                      phone: '',
                      certification: 'NSCA-CSCS',
                      experienceYears: '3-5 years',
                      specialization: 'Hypertrophy & Strength',
                      portfolioUrl: '',
                      credentialsFile: '',
                      statement: ''
                    })}
                  >
                    Clear Form
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <Sparkles size={18} />
                    <span>Submit Coach Application</span>
                  </button>
                </div>
              </form>
            )}
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
