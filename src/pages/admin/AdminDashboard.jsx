import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Award,
  BarChart3,
  Settings,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/admin.css';

export const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('overview');

  return (
    <div className="admin-wrapper">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <ShieldCheck size={24} color="var(--accent-cyan)" />
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>FitSphere Admin</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>PART 1 PLACEHOLDER</div>
          </div>
        </div>

        <ul className="admin-sidebar-menu">
          <li
            className={`admin-nav-item ${activeMenu === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveMenu('overview')}
          >
            <LayoutDashboard size={18} />
            <span>Platform Overview</span>
          </li>
          <li
            className={`admin-nav-item ${activeMenu === 'products' ? 'active' : ''}`}
            onClick={() => setActiveMenu('products')}
          >
            <Package size={18} />
            <span>Product Catalog</span>
          </li>
          <li
            className={`admin-nav-item ${activeMenu === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveMenu('orders')}
          >
            <ShoppingCart size={18} />
            <span>Orders & Logistics</span>
          </li>
          <li
            className={`admin-nav-item ${activeMenu === 'coaches' ? 'active' : ''}`}
            onClick={() => setActiveMenu('coaches')}
          >
            <Award size={18} />
            <span>Coach Verification Queue</span>
          </li>
          <li
            className={`admin-nav-item ${activeMenu === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveMenu('analytics')}
          >
            <BarChart3 size={18} />
            <span>Analytics & GMV</span>
          </li>
          <li
            className={`admin-nav-item ${activeMenu === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveMenu('settings')}
          >
            <Settings size={18} />
            <span>System Settings</span>
          </li>
        </ul>

        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
            <span>Exit to Storefront</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="admin-content">
        {/* Placeholder Status Banner */}
        <div style={{ background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.25)', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <AlertCircle size={22} color="var(--accent-cyan)" />
          <div>
            <strong style={{ color: 'var(--accent-cyan)' }}>Admin Module Scaffold (Part 1 Architecture)</strong>
            <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)' }}>
              This route and navigation layout are wired into FitSphere's modular routing foundation. Real-time DB mutations, inventory stock sync, and credential approvals will be hooked up in subsequent backend stages.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Executive Platform Metrics
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Real-time platform overview across Marketplace sales and Fitness Journey athlete engagement.
            </p>
          </div>
          <span className="badge badge-mint">System Status: Nominal</span>
        </div>

        {/* KPI Grid */}
        <div className="admin-kpi-grid">
          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Gross Merchandise Value (GMV)
            </span>
            <h3 style={{ color: 'var(--accent-primary)' }}>$142,840</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-primary)' }}>+18.4% this month</span>
          </div>

          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Athletes
            </span>
            <h3>52,190</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>+1,420 new registrations</span>
          </div>

          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Pending Coach Reviews
            </span>
            <h3 style={{ color: 'var(--accent-secondary)' }}>14 Applications</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-secondary)' }}>Action required</span>
          </div>

          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Journey Engagement Rate
            </span>
            <h3 style={{ color: 'var(--accent-amber)' }}>76.8%</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Daily macro adherence</span>
          </div>
        </div>

        {/* Pending Coach Verifications Table */}
        <div className="admin-table-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Coach Verification Queue (Recent Submissions)</h3>
            <span className="badge badge-coral">14 Pending</span>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Credential</th>
                <th>Experience</th>
                <th>Specialization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#fff' }}>Sarah Jenkins</td>
                <td>NSCA - CSCS</td>
                <td>4 Years</td>
                <td>Olympic Weightlifting</td>
                <td><span className="badge badge-coral">Under Review</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-mint" onClick={() => alert('Applicant review modal will be wired in Part 2.')}>
                    Audit Credentials
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#fff' }}>Dr. Brandon Cole, RD</td>
                <td>CSSD / RD</td>
                <td>8 Years</td>
                <td>Metabolic Optimization</td>
                <td><span className="badge badge-coral">Under Review</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-mint" onClick={() => alert('Applicant review modal will be wired in Part 2.')}>
                    Audit Credentials
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#fff' }}>Kavita Patel</td>
                <td>NASM-PES</td>
                <td>5 Years</td>
                <td>Hyrox & Tri-Endurance</td>
                <td><span className="badge badge-mint">Approved</span></td>
                <td>
                  <button className="btn btn-sm btn-secondary" disabled>
                    Verified
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
