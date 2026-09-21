import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Eye, Zap, Scale, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleComparison,
    isComparing
  } = useCart();

  const inWishlist = isInWishlist(product.id);
  const comparing = isComparing(product.id);
  const isOutOfStock = product.inStock === false || (product.stock !== undefined && product.stock <= 0);

  const handleCardClick = () => {
    navigate(`/marketplace/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* Product Image Card Visual */}
      <div className="product-media" style={{ background: product.imageBg }}>
        {/* Floating Tag */}
        {product.tag && (
          <span className={`badge badge-${product.tagColor || 'mint'} product-tag`}>
            {product.tag}
          </span>
        )}

        {/* Action Buttons Top Right (Wishlist + Compare) */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', zIndex: 5 }}>
          {/* Wishlist Button */}
          <button
            className={`product-wish-btn ${inWishlist ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>

          {/* Compare Button */}
          <button
            className="product-wish-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleComparison(product);
            }}
            style={{
              background: comparing ? 'var(--accent-mint)' : 'rgba(17, 24, 39, 0.75)',
              color: comparing ? '#000' : 'rgba(255, 255, 255, 0.8)'
            }}
            aria-label={comparing ? 'Remove from comparison' : 'Add to comparison'}
            title={comparing ? 'Comparing item' : 'Add to comparison'}
          >
            <Scale size={15} />
          </button>
        </div>

        {/* Dynamic Graphic Icon Container */}
        <div className="product-icon-center">
          <Zap size={48} color={product.iconColor || '#00F59B'} />
        </div>

        {/* Quick View Overlay Button on Hover */}
        <div className="product-media-overlay">
          {onQuickView && (
            <button
              className="btn btn-sm btn-secondary"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <Eye size={15} />
              <span>Quick View</span>
            </button>
          )}
        </div>

        {/* Out of Stock Ribbon */}
        {isOutOfStock && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(239, 68, 68, 0.9)',
              color: '#fff',
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.3rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Out of Stock
          </div>
        )}
      </div>

      {/* Card Content Info */}
      <div className="product-body">
        <div className="product-brand-row">
          <span className="product-brand">{product.brand}</span>
          <span className="product-category">{product.category}</span>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating Row */}
        <div className="product-rating-row">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="currentColor" />
            ))}
          </div>
          <span className="rating-score">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        {/* Price & Action Row */}
        <div className="product-footer">
          <div className="price-box">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <div className="product-actions-btn-group">
            <button
              className="btn btn-sm btn-primary add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              disabled={isOutOfStock}
              title={isOutOfStock ? 'Currently out of stock' : 'Add item to cart'}
            >
              <ShoppingBag size={15} />
              <span>{isOutOfStock ? 'Sold' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
