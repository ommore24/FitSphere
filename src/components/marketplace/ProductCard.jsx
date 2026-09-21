import React from 'react';
import { Star, ShoppingBag, Heart, Eye, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      {/* Product Image Card Visual */}
      <div className="product-media" style={{ background: product.imageBg }}>
        {/* Floating Tag */}
        {product.tag && (
          <span className={`badge badge-${product.tagColor} product-tag`}>
            {product.tag}
          </span>
        )}

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
          <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Dynamic Graphic Icon Container */}
        <div className="product-icon-center">
          <Zap size={48} color={product.iconColor} />
        </div>

        {/* Quick View Overlay Button on Hover */}
        <div className="product-media-overlay">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => onQuickView(product)}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content Info */}
      <div className="product-body">
        <div className="product-brand-row">
          <span className="product-brand">{product.brand}</span>
          <span className="product-category">{product.category}</span>
        </div>

        <h3 className="product-title" title={product.name} onClick={() => onQuickView(product)}>
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
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <div className="product-actions-btn-group">
            <button
              className="btn btn-sm btn-primary add-to-cart-btn"
              onClick={() => addToCart(product)}
              title="Add item to cart"
            >
              <ShoppingBag size={15} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
