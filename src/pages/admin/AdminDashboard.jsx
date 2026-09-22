import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Award,
  BarChart3,
  Settings,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Store
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import '../../styles/admin.css';

export const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const { showToast } = useCart();

  // Dynamic state lists
  const [coachQueue, setCoachQueue] = useState([
    { id: '1', full_name: 'Sarah Jenkins', certification_name: 'NSCA-CSCS', experience_years: 4, specialization: 'Olympic Weightlifting', status: 'PENDING' },
    { id: '2', full_name: 'Dr. Brandon Cole, RD', certification_name: 'CSSD / RD', experience_years: 8, specialization: 'Metabolic Optimization', status: 'PENDING' },
    { id: '3', full_name: 'Kavita Patel', certification_name: 'NASM-PES', experience_years: 5, specialization: 'Hyrox & Endurance', status: 'VERIFIED' }
  ]);

  const [sellerQueue, setSellerQueue] = useState([
    { id: 's1', business_name: 'Apex Nutrition India', contact_email: 'apex@nutrition.in', verification_status: 'PENDING' },
    { id: 's2', business_name: 'FitBio Labs', contact_email: 'contact@fitbio.com', verification_status: 'VERIFIED' }
  ]);

  const [productQueue, setProductQueue] = useState([
    { id: 'p1', product_name: 'FitSphere Clean Whey Isolate (Vanilla)', brand: 'FitSphere Native', price_inr: 3499, publication_status: 'PENDING' },
    { id: 'p2', product_name: 'Plant Protein Organic Mix', brand: 'Raw Greens', price_inr: 2199, publication_status: 'LIVE' }
  ]);

  useEffect(() => {
    async function loadAdminData() {
      if (!isSupabaseConfigured) return;
      try {
        const { data: coaches } = await supabase.from('coach_applications').select('*');
        if (coaches && coaches.length > 0) setCoachQueue(coaches);

        const { data: sellers } = await supabase.from('sellers').select('*');
        if (sellers && sellers.length > 0) setSellerQueue(sellers);
      } catch (err) {
        console.warn('Admin load fallback:', err);
      }
    }
    loadAdminData();
  }, []);

  const handleUpdateCoachStatus = async (coachId, newStatus) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('coach_applications').update({ status: newStatus }).eq('id', coachId);
      } catch (e) {
        console.warn('Coach status update fallback:', e);
      }
    }
    setCoachQueue(prev => prev.map(c => c.id === coachId ? { ...c, status: newStatus } : c));
    showToast(`Coach status updated to ${newStatus}`, 'info');
  };

  const handleUpdateSellerStatus = async (sellerId, newStatus) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('sellers').update({ verification_status: newStatus }).eq('id', sellerId);
      } catch (e) {
        console.warn('Seller status update fallback:', e);
      }
    }
    setSellerQueue(prev => prev.map(s => s.id === sellerId ? { ...s, verification_status: newStatus } : s));
    showToast(`Seller status updated to ${newStatus}`, 'info');
  };

  const handleUpdateProductStatus = async (prodId, newStatus) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').update({ publication_status: newStatus }).eq('id', prodId);
      } catch (e) {
        console.warn('Product status update fallback:', e);
      }
    }
    setProductQueue(prev => prev.map(p => p.id === prodId ? { ...p, publication_status: newStatus } : p));
    showToast(`Product publication status set to ${newStatus}`, 'info');
  };

  return (
    <div className="admin-wrapper">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <ShieldCheck size={24} color="var(--accent-cyan)" />
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>FitSphere Admin</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-mint)', fontWeight: 600 }}>OPERATIONS CONSOLE</div>
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
            className={`admin-nav-item ${activeMenu === 'sellers' ? 'active' : ''}`}
            onClick={() => setActiveMenu('sellers')}
          >
            <Store size={18} />
            <span>Seller Approvals</span>
          </li>
          <li
            className={`admin-nav-item ${activeMenu === 'coaches' ? 'active' : ''}`}
            onClick={() => setActiveMenu('coaches')}
          >
            <Award size={18} />
            <span>Coach Verification Queue</span>
          </li>
          <li
            className={`admin-nav-item ${activeMenu === 'products' ? 'active' : ''}`}
            onClick={() => setActiveMenu('products')}
          >
            <Package size={18} />
            <span>Product Moderation</span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              FitSphere Administration Console
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Audit coach credentials, verify sellers, approve products, and monitor sales.
            </p>
          </div>
          <span className="badge badge-mint">Admin Access Granted</span>
        </div>

        {/* KPI Grid */}
        <div className="admin-kpi-grid">
          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Gross Merchandise Value (GMV)
            </span>
            <h3 style={{ color: 'var(--accent-primary)' }}>₹14,28,400</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-primary)' }}>+18.4% this month</span>
          </div>

          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Sellers
            </span>
            <h3>{sellerQueue.filter(s => s.verification_status === 'VERIFIED').length + 1}</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>Verified Partners</span>
          </div>

          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Pending Coach Reviews
            </span>
            <h3 style={{ color: 'var(--accent-secondary)' }}>
              {coachQueue.filter(c => c.status === 'PENDING').length} Applications
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-secondary)' }}>Requires Audit</span>
          </div>

          <div className="admin-kpi-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Product Moderation Queue
            </span>
            <h3 style={{ color: 'var(--accent-amber)' }}>
              {productQueue.filter(p => p.publication_status === 'PENDING').length} Pending
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Awaiting Live Status</span>
          </div>
        </div>

        {/* TAB: COACHES */}
        {(activeMenu === 'overview' || activeMenu === 'coaches') && (
          <div className="admin-table-card" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Coach Verification Queue</h3>
              <span className="badge badge-coral">{coachQueue.filter(c => c.status === 'PENDING').length} Pending</span>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Certification</th>
                  <th>Experience</th>
                  <th>Specialization</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coachQueue.map((coach) => (
                  <tr key={coach.id}>
                    <td style={{ fontWeight: 700, color: '#fff' }}>{coach.full_name}</td>
                    <td>{coach.certification_name}</td>
                    <td>{coach.experience_years} Years</td>
                    <td>{coach.specialization}</td>
                    <td>
                      <span className={`badge ${coach.status === 'VERIFIED' ? 'badge-mint' : coach.status === 'REJECTED' ? 'badge-neutral' : 'badge-coral'}`}>
                        {coach.status}
                      </span>
                    </td>
                    <td>
                      {coach.status !== 'VERIFIED' ? (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button className="btn btn-sm btn-outline-mint" onClick={() => handleUpdateCoachStatus(coach.id, 'VERIFIED')}>
                            Verify
                          </button>
                          <button className="btn btn-sm btn-outline-coral" onClick={() => handleUpdateCoachStatus(coach.id, 'REJECTED')}>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-sm btn-outline-coral" onClick={() => handleUpdateCoachStatus(coach.id, 'SUSPENDED')}>
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB: SELLERS */}
        {(activeMenu === 'overview' || activeMenu === 'sellers') && (
          <div className="admin-table-card" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Seller Verification Portal</h3>
              <span className="badge badge-cyan">{sellerQueue.length} Registrations</span>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Business / Brand</th>
                  <th>Contact Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellerQueue.map((seller) => (
                  <tr key={seller.id}>
                    <td style={{ fontWeight: 700, color: '#fff' }}>{seller.business_name}</td>
                    <td>{seller.contact_email}</td>
                    <td>
                      <span className={`badge ${seller.verification_status === 'VERIFIED' ? 'badge-mint' : 'badge-coral'}`}>
                        {seller.verification_status}
                      </span>
                    </td>
                    <td>
                      {seller.verification_status !== 'VERIFIED' ? (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button className="btn btn-sm btn-outline-mint" onClick={() => handleUpdateSellerStatus(seller.id, 'VERIFIED')}>
                            Approve Seller
                          </button>
                          <button className="btn btn-sm btn-outline-coral" onClick={() => handleUpdateSellerStatus(seller.id, 'REJECTED')}>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: 700 }}>Verified Partner</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB: PRODUCTS MODERATION */}
        {(activeMenu === 'overview' || activeMenu === 'products') && (
          <div className="admin-table-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Product Publication Approvals</h3>
              <span className="badge badge-amber">{productQueue.length} Products</span>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Publication Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productQueue.map((prod) => (
                  <tr key={prod.id}>
                    <td style={{ fontWeight: 700, color: '#fff' }}>{prod.product_name}</td>
                    <td>{prod.brand}</td>
                    <td>₹{Number(prod.price_inr).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`badge ${prod.publication_status === 'LIVE' ? 'badge-mint' : 'badge-coral'}`}>
                        {prod.publication_status}
                      </span>
                    </td>
                    <td>
                      {prod.publication_status !== 'LIVE' ? (
                        <button className="btn btn-sm btn-outline-mint" onClick={() => handleUpdateProductStatus(prod.id, 'LIVE')}>
                          Publish Live
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-outline-coral" onClick={() => handleUpdateProductStatus(prod.id, 'REJECTED')}>
                          Unpublish
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

