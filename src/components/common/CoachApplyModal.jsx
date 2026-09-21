import React, { useState } from 'react';
import { X, Award, CheckCircle2, Send } from 'lucide-react';

export const CoachApplyModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    certification: 'NSCA-CSCS',
    experienceYears: '3-5 years',
    specialization: 'Hypertrophy & Strength',
    portfolioUrl: '',
    statement: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container coach-apply-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
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
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Application Submitted!</h3>
            <p style={{ maxWidth: '440px', margin: '0 auto 1.75rem', lineHeight: '1.6' }}>
              Thank you for applying, <strong>{formData.fullName || 'Coach'}</strong>. Our Athletic Review Board
              will verify your credentials and respond within 48 business hours.
            </p>
            <button className="btn btn-primary" onClick={handleReset}>
              Close & Return to FitSphere
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <Award size={24} color="var(--accent-primary)" />
              <span className="badge badge-mint">Coach Certification Portal</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>
              Apply as a Verified FitSphere Coach
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Join our elite roster of certified personal trainers, sports dietitians, and performance coaches.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Coach Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Email *</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="sarah@athleteprep.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Primary Credential / Certification *</label>
                  <select
                    className="form-control"
                    value={formData.certification}
                    onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
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
                  <label className="form-label">Coaching Experience *</label>
                  <select
                    className="form-control"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  >
                    <option value="2-3 years">2 - 3 Years</option>
                    <option value="3-5 years">3 - 5 Years</option>
                    <option value="5-10 years">5 - 10 Years</option>
                    <option value="10+ years">10+ Years Master Coach</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Portfolio / Social / Coaching Website URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://instagram.com/coach or https://yourcoaching.com"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Coaching Philosophy & Specialization Summary</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Briefly describe your approach to client progressive overload, nutrition compliance, and client retention..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
