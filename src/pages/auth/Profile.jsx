import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Flame,
  ShoppingBag,
  Heart,
  Crown,
  MapPin,
  Package,
  Calendar,
  Settings,
  LogOut,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import '../../styles/auth.css';

export const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { wishlist, cartCount } = useCart();

  return (
    <div className="profile-container">
      <div className="container">
        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-user-info">
            <div className="profile-avatar-large">
              {currentUser.name
                ? currentUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                : 'U'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{currentUser.name}</h1>
                <span className="badge badge-mint">{currentUser.tier}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {currentUser.email} • Member since {currentUser.joinedDate}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/fitness-journey" className="btn btn-coral">
              <Flame size={16} />
              <span>My Journey</span>
            </Link>
            <button className="btn btn-secondary" onClick={logout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Athlete Stats */}
        <div className="profile-meta-grid">
          <div className="profile-stat-box">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Active Objective
            </div>
            <h4 style={{ color: 'var(--accent-primary)' }}>{currentUser.goal}</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Phase 2: Progressive Overload</span>
          </div>

          <div className="profile-stat-box">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Consistency Streak
            </div>
            <h4 style={{ color: 'var(--accent-secondary)' }}>{currentUser.streak} Consecutive Days</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Top 5% of active community</span>
          </div>

          <div className="profile-stat-box">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Completed Sessions
            </div>
            <h4>{currentUser.completedWorkouts} Workouts Logged</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>4.2 sessions / week avg</span>
          </div>
        </div>

        {/* Two-Column Section: Orders & Settings */}
        <div className="profile-sections-grid">
          {/* Recent Orders Placeholder */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={18} color="var(--accent-primary)" />
                <span>Recent Marketplace Orders</span>
              </h3>
              <Link to="/marketplace" style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                Shop Again
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <span>Order #FS-92841</span>
                  <span className="badge badge-mint" style={{ fontSize: '0.7rem' }}>Delivered</span>
                </div>
                <p style={{ fontSize: '0.8rem', margin: 0 }}>
                  Optimum Nutrition Gold Standard Whey (5 lbs) + Creapure® Monohydrate
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Delivered on Sep 14, 2026</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>$102.99</span>
                </div>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <span>Order #FS-89104</span>
                  <span className="badge badge-mint" style={{ fontSize: '0.7rem' }}>Delivered</span>
                </div>
                <p style={{ fontSize: '0.8rem', margin: 0 }}>
                  Gymshark Apex Lifting Straps & Grips
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Delivered on Aug 28, 2026</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>$24.50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts & Saved Links */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={18} color="var(--accent-cyan)" />
              <span>Athlete Shortcuts</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to="/cart"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <ShoppingBag size={18} color="var(--accent-primary)" />
                  <span style={{ fontWeight: 600 }}>Active Shopping Cart</span>
                </div>
                <span className="badge badge-mint">{cartCount} Items</span>
              </Link>

              <Link
                to="/wishlist"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Heart size={18} color="var(--accent-secondary)" />
                  <span style={{ fontWeight: 600 }}>Saved Wishlist</span>
                </div>
                <span className="badge badge-coral">{wishlist.length} Items</span>
              </Link>

              <Link
                to="/admin"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(0,229,255,0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,229,255,0.2)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <ShieldCheck size={18} color="var(--accent-cyan)" />
                  <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>Admin Console (Placeholder)</span>
                </div>
                <span className="badge badge-cyan">Admin Route</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
