import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

export const Login = () => {
  const [email, setEmail] = useState('alex.rivera@fitsphere.com');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/profile');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrap">
            <LogIn size={26} />
          </div>
          <h1 className="auth-title">Athlete Login</h1>
          <p className="auth-subtitle">Welcome back to your FitSphere command center</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="athlete@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-links-row">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <span>Sign In to FitSphere</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-divider">Or continue with</div>

        <div className="social-auth-grid">
          <button
            type="button"
            className="social-auth-btn"
            onClick={() => {
              login('google.athlete@fitsphere.com');
              navigate('/profile');
            }}
          >
            Google
          </button>
          <button
            type="button"
            className="social-auth-btn"
            onClick={() => {
              login('apple.athlete@fitsphere.com');
              navigate('/profile');
            }}
          >
            Apple
          </button>
        </div>

        <div className="auth-switch-prompt">
          Don't have an athlete account?{' '}
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};
