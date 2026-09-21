import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    goal: 'Lean Muscle & Hypertrophy'
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/profile');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrap" style={{ background: 'rgba(255, 107, 53, 0.12)', color: 'var(--accent-secondary)' }}>
            <UserPlus size={26} />
          </div>
          <h1 className="auth-title">Create FitSphere Account</h1>
          <p className="auth-subtitle">Begin your unified fitness & nutrition journey</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Alex Rivera"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="alex@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="Create strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Primary Fitness Goal</label>
            <select
              className="form-control"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            >
              <option value="Lean Muscle & Hypertrophy">Lean Muscle & Hypertrophy</option>
              <option value="Fat Loss & Definition">Fat Loss & Definition</option>
              <option value="Athletic Conditioning">Athletic Conditioning</option>
              <option value="Mobility & Longevity">Mobility & Longevity</option>
            </select>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
            By registering, you agree to FitSphere's <Link to="/legal?tab=terms" style={{ color: 'var(--accent-primary)' }}>Terms</Link> and <Link to="/legal?tab=privacy" style={{ color: 'var(--accent-primary)' }}>Privacy Policy</Link>.
          </div>

          <button type="submit" className="btn btn-coral" style={{ width: '100%' }}>
            <span>Join FitSphere</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-switch-prompt">
          Already have an account?{' '}
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};
