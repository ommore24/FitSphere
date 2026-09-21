import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Zap,
  Flame,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { DualSwitcher } from './DualSwitcher';
import { SearchModal } from '../common/SearchModal';
import { QuickViewModal } from '../common/QuickViewModal';
import '../../styles/navbar.css';

export const Navbar = () => {
  const { cartCount, wishlist } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleOpenSearch = () => setSearchModalOpen(true);
  const handleCloseSearch = () => setSearchModalOpen(false);

  const handleProductSelectFromSearch = (product) => {
    setSelectedProduct(product);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            <div className="brand-icon">
              <Zap size={20} />
            </div>
            <span className="brand-name">
              Fit<span className="brand-sphere">Sphere</span>
            </span>
          </Link>

          {/* Dual Experience Switcher (Marketplace vs Fitness Journey) */}
          <DualSwitcher />

          {/* Main Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/marketplace"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Marketplace
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/fitness-journey"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Fitness Journey
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recommendations"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Goal Recommendations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/join-coach"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Join Us
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart, Profile */}
          <div className="nav-actions">
            {/* Search Trigger */}
            <button
              className="icon-btn"
              onClick={handleOpenSearch}
              title="Search products and workout plans"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="icon-btn"
              title="Saved items in Wishlist"
              aria-label="Wishlist"
              onClick={closeMobileMenu}
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="badge-counter badge-coral-counter">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="icon-btn"
              title="Shopping Cart"
              aria-label="Cart"
              onClick={closeMobileMenu}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="badge-counter">{cartCount}</span>
              )}
            </Link>

            {/* Login or Profile Pill */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="nav-profile-btn"
                title="View Profile and Dashboard"
                onClick={closeMobileMenu}
              >
                <div className="nav-avatar-circle">
                  {currentUser.name
                    ? currentUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    : 'U'}
                </div>
                <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="btn btn-sm btn-secondary" onClick={closeMobileMenu}>
                <User size={15} />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              className="icon-btn mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-switcher-container">
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 600 }}>
            SWITCH CORE EXPERIENCE
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <Link
              to="/marketplace"
              className="btn btn-sm btn-outline-mint"
              onClick={closeMobileMenu}
            >
              <ShoppingBag size={14} />
              <span>Marketplace</span>
            </Link>
            <Link
              to="/fitness-journey"
              className="btn btn-sm btn-coral"
              onClick={closeMobileMenu}
            >
              <Flame size={14} />
              <span>Journey</span>
            </Link>
          </div>
        </div>

        <ul className="mobile-links">
          <li>
            <NavLink to="/" className="mobile-link" onClick={closeMobileMenu}>
              <span>Home</span>
              <ChevronRight size={18} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/marketplace" className="mobile-link" onClick={closeMobileMenu}>
              <span>Marketplace Catalog</span>
              <ChevronRight size={18} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitness-journey" className="mobile-link" onClick={closeMobileMenu}>
              <span>Fitness Journey</span>
              <ChevronRight size={18} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/recommendations" className="mobile-link" onClick={closeMobileMenu}>
              <span>Goal Recommendations</span>
              <ChevronRight size={18} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/join-coach" className="mobile-link" onClick={closeMobileMenu}>
              <span>Join Us (Become a Coach)</span>
              <ChevronRight size={18} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="mobile-link" onClick={closeMobileMenu}>
              <span>My Athlete Profile</span>
              <ChevronRight size={18} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className="mobile-link" onClick={closeMobileMenu}>
              <span style={{ color: 'var(--accent-cyan)' }}>Admin Console (Placeholder)</span>
              <ChevronRight size={18} />
            </NavLink>
          </li>
        </ul>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Link
            to="/cart"
            className="btn btn-secondary"
            style={{ flex: 1 }}
            onClick={closeMobileMenu}
          >
            <ShoppingBag size={16} />
            <span>Cart ({cartCount})</span>
          </Link>
          <Link
            to="/wishlist"
            className="btn btn-secondary"
            style={{ flex: 1 }}
            onClick={closeMobileMenu}
          >
            <Heart size={16} />
            <span>Saved ({wishlist.length})</span>
          </Link>
        </div>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={handleCloseSearch}
        onSelectProduct={handleProductSelectFromSearch}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
