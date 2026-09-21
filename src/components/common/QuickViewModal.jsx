import React from 'react';
import { X, Star, ShoppingBag, Heart, Check, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close product view">
          <X size={18} />
        </button>

        <div className="quick-view-grid">
          {/* Visual Column */}
          <div className="quick-view-visual" style={{ background: product.imageBg }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }}
            >
              <Zap size={56} color={product.iconColor} />
            </div>

            <span className={`badge badge-${product.tagColor}`} style={{ marginBottom: '0.5rem' }}>
              {product.tag}
            </span>

            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              {product.flavor}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              {product.weight}
            </span>
          </div>

          {/* Details Column */}
          <div className="quick-view-info">
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              {product.brand} • {product.category}
            </div>

            <h3>{product.name}</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: '0.4rem 0' }}>
              <div style={{ display: 'flex', color: 'var(--accent-amber)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{product.rating}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                ({product.reviewsCount} verified reviews)
              </span>
            </div>

            <div className="quick-view-price-row">
              <span className="quick-view-current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="quick-view-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span className="badge badge-mint">In Stock & Verified</span>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              {product.description}
            </p>

            <ul className="quick-view-features">
              {product.features?.map((feat, idx) => (
                <li key={idx}>
                  <Check size={16} color="var(--accent-primary)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>

              <button
                className={`icon-btn ${inWishlist ? 'active-wish' : ''}`}
                style={{
                  width: '46px',
                  height: '46px',
                  color: inWishlist ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                  borderColor: inWishlist ? 'var(--accent-secondary)' : 'var(--border-subtle)'
                }}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div style={{ marginTop: '0.85rem', textAlign: 'center' }}>
              <a
                href={`/marketplace/${product.id}`}
                onClick={onClose}
                style={{ fontSize: '0.84rem', color: 'var(--accent-mint)', textDecoration: 'none', fontWeight: 600 }}
              >
                View Full Nutrition Facts & Clinical Details →
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--accent-primary)" />
              <span>Authentic Brand Guarantee • 30-Day Pure Performance Return Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
