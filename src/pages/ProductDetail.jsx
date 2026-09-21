import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Heart,
  Scale,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ArrowLeft,
  Zap,
  Info
} from 'lucide-react';
import { productsService } from '../services/productsService';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/marketplace/ProductCard';
import { ComparisonDock } from '../components/marketplace/ComparisonDock';
import { ProductComparisonModal } from '../components/marketplace/ProductComparisonModal';
import '../styles/productDetail.css';

export const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleComparison,
    isComparing,
    recordViewedProduct
  } = useCart();

  useEffect(() => {
    let isMounted = true;

    async function loadProductData() {
      setLoading(true);
      try {
        const { data, error } = await productsService.getProductById(productId);
        if (isMounted) {
          if (data) {
            setProduct(data);
            setSelectedQty(1);
            recordViewedProduct(data);

            // Load related products
            const related = await productsService.getRelatedProducts(data, 4);
            if (isMounted) {
              setRelatedProducts(related.data || []);
            }
          } else {
            setProduct(null);
          }
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-mint)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading verified product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', maxWidth: '500px' }}>
          <AlertTriangle size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Product Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            The requested supplement or gear item may have been moved or is currently unavailable.
          </p>
          <Link to="/marketplace" className="btn btn-primary">
            <span>Return to Marketplace</span>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const comparing = isComparing(product.id);
  const maxStock = product.stock ?? 10;
  const isOutOfStock = !product.inStock || maxStock <= 0;

  return (
    <div className="section product-detail-container">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/marketplace">Marketplace</Link>
          <ChevronRight size={14} />
          <Link to={`/marketplace?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
            {product.name}
          </span>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="product-detail-grid">
          {/* Left Column: Media Gallery */}
          <div className="product-detail-gallery">
            <div className="gallery-main-viewport" style={{ background: product.imageBg || 'var(--bg-surface)' }}>
              {/* Product floating tag */}
              {product.tag && (
                <span
                  className={`badge badge-${product.tagColor || 'mint'}`}
                  style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 3 }}
                >
                  {product.tag}
                </span>
              )}

              {/* Wishlist quick action */}
              <button
                className={`product-wish-btn ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 3 }}
                title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>

              <div className="gallery-icon-massive">
                <Zap size={110} color={product.iconColor || '#00F59B'} />
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="gallery-thumbnails-strip">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  className={`gallery-thumb-btn ${activeThumb === idx ? 'active' : ''}`}
                  onClick={() => setActiveThumb(idx)}
                >
                  <Zap size={24} color={idx === 0 ? (product.iconColor || '#00F59B') : 'var(--text-muted)'} />
                </button>
              ))}
            </div>

            {/* Trust Assurance Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}
            >
              <div>
                <ShieldCheck size={20} color="var(--accent-mint)" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>100% Genuine</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Direct Brand Seal</div>
              </div>
              <div>
                <Truck size={20} color="var(--accent-mint)" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Fast Shipping</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Free above ₹1,000</div>
              </div>
              <div>
                <RotateCcw size={20} color="var(--accent-mint)" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Easy Returns</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>7-Day Guarantee</div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Actions */}
          <div className="product-detail-info">
            <div className="product-meta-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-mint)' }}>
                  {product.brand}
                </span>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <span className="badge badge-neutral">{product.category}</span>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <ShieldCheck size={14} color="var(--accent-mint)" />
                  <span>{product.sellerName || 'Verified Partner'}</span>
                </div>
              </div>

              <h1 className="product-detail-title">{product.name}</h1>

              {/* Rating & Review Count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#FBBF24' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{product.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>

              {/* Price in INR */}
              <div className="product-price-section">
                <span className="product-detail-price">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="product-detail-original-price">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="product-detail-savings-badge">
                      Save {product.discount || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Inclusive of all taxes. Free shipping applies on orders over ₹1,000.
              </div>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              {product.description}
            </p>

            {/* Weight, Flavor, and Stock Specs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Package Net Weight</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem' }}>{product.weight || 'Standard Pack'}</div>
              </div>

              {product.flavor && (
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Flavor / Edition</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem' }}>{product.flavor}</div>
                </div>
              )}

              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Stock Status</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem', color: isOutOfStock ? '#ef4444' : 'var(--accent-mint)' }}>
                  {isOutOfStock ? 'Sold Out' : `In Stock (${maxStock} left)`}
                </div>
              </div>
            </div>

            {/* Nutrition Facts Panel (if available) */}
            {product.nutrition && (
              <div className="nutrition-panel-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Nutrition Breakdown</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Serving: {product.nutrition.serving_size || '1 Scoop'}
                  </span>
                </div>

                <div className="nutrition-grid">
                  {product.nutrition.protein_g !== undefined && (
                    <div className="nutrition-metric-box">
                      <div className="nutrition-metric-value" style={{ color: 'var(--accent-mint)' }}>
                        {product.nutrition.protein_g}g
                      </div>
                      <div className="nutrition-metric-label">Protein</div>
                    </div>
                  )}
                  {product.nutrition.calories !== undefined && (
                    <div className="nutrition-metric-box">
                      <div className="nutrition-metric-value">{product.nutrition.calories}</div>
                      <div className="nutrition-metric-label">Calories</div>
                    </div>
                  )}
                  {product.nutrition.carbs_g !== undefined && (
                    <div className="nutrition-metric-box">
                      <div className="nutrition-metric-value">{product.nutrition.carbs_g}g</div>
                      <div className="nutrition-metric-label">Carbs</div>
                    </div>
                  )}
                  {product.nutrition.fat_g !== undefined && (
                    <div className="nutrition-metric-box">
                      <div className="nutrition-metric-value">{product.nutrition.fat_g}g</div>
                      <div className="nutrition-metric-label">Total Fat</div>
                    </div>
                  )}
                  {product.nutrition.bcaa_g !== undefined && product.nutrition.bcaa_g > 0 && (
                    <div className="nutrition-metric-box">
                      <div className="nutrition-metric-value" style={{ color: 'var(--accent-cyan)' }}>
                        {product.nutrition.bcaa_g}g
                      </div>
                      <div className="nutrition-metric-label">BCAAs</div>
                    </div>
                  )}
                </div>

                {product.servingInfo && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.4 }}>
                    <strong>Recommended Usage:</strong> {product.servingInfo}
                  </div>
                )}
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: '#fff' }}>Ingredients:</strong> {product.ingredients}
              </div>
            )}

            {/* Allergen & Health Disclaimer Warning */}
            <div className="disclaimer-box">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Allergen Notice & Disclaimer:</strong> {product.allergenInfo || 'Manufactured in a certified GMP facility.'}
                  <br />
                  <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                    *This product is a dietary supplement and not intended to diagnose, treat, cure, or prevent any disease. Please read physical packaging before consumption and consult a qualified physician if pregnant, nursing, or undergoing medication.
                  </span>
                </div>
              </div>
            </div>

            {/* Suitable Goals & Dietary Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {product.goals && product.goals.map((g) => (
                <span key={g} className="badge badge-neutral">
                  Goal: {g}
                </span>
              ))}
              {product.dietaryTags && product.dietaryTags.map((d) => (
                <span key={d} className="badge badge-mint">
                  ✓ {d}
                </span>
              ))}
            </div>

            {/* Action Bar: Quantity, Add to Cart, Wishlist, Compare */}
            <div className="detail-action-group">
              {/* Quantity Picker */}
              <div className="quantity-picker">
                <button
                  className="quantity-btn"
                  onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                  disabled={selectedQty <= 1 || isOutOfStock}
                >
                  -
                </button>
                <div className="quantity-value">{selectedQty}</div>
                <button
                  className="quantity-btn"
                  onClick={() => setSelectedQty((q) => Math.min(Math.min(maxStock, 10), q + 1))}
                  disabled={selectedQty >= Math.min(maxStock, 10) || isOutOfStock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className="btn btn-primary btn-lg"
                style={{ flex: 1, minWidth: '180px' }}
                onClick={() => addToCart(product, selectedQty)}
                disabled={isOutOfStock}
              >
                <ShoppingBag size={18} />
                <span>
                  {isOutOfStock ? 'Sold Out' : `Add to Cart • ₹${(product.price * selectedQty).toLocaleString('en-IN')}`}
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                className={`btn btn-lg btn-outline ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                style={{ borderColor: inWishlist ? 'var(--accent-coral)' : 'var(--border-medium)', color: inWishlist ? 'var(--accent-coral)' : '#fff' }}
                title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>

              {/* Compare Button */}
              <button
                className={`btn btn-lg btn-outline ${comparing ? 'active' : ''}`}
                onClick={() => toggleComparison(product)}
                style={{ borderColor: comparing ? 'var(--accent-mint)' : 'var(--border-medium)', color: comparing ? 'var(--accent-mint)' : '#fff' }}
                title={comparing ? 'Remove from comparison' : 'Add to side-by-side comparison'}
              >
                <Scale size={18} />
                <span>{comparing ? 'Comparing' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>
                Curated Synergies
              </span>
              <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>
                Related & Recommended Supplements
              </h2>
              <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Products commonly stacked with {product.name} for maximum athletic results.
              </p>
            </div>

            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Dock and Modal */}
      <ComparisonDock />
      <ProductComparisonModal />
    </div>
  );
};

export default ProductDetail;
