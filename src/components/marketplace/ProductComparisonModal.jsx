import React from 'react';
import { X, Trash2, ShoppingBag, Star, ShieldCheck, Check, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import '../../styles/comparison.css';

export const ProductComparisonModal = () => {
  const {
    comparisonList,
    removeFromComparison,
    clearComparison,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    addToCart
  } = useCart();

  if (!isComparisonModalOpen || comparisonList.length === 0) return null;

  return (
    <div className="comparison-modal-backdrop" onClick={() => setIsComparisonModalOpen(false)}>
      <div className="comparison-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="comparison-modal-header">
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
              Compare Fitness & Nutrition Products
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Comparing {comparisonList.length} of 4 items side-by-side
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={clearComparison}
              className="btn btn-sm btn-outline"
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
            >
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="btn-icon"
              style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Content Table */}
        <div className="comparison-modal-body">
          <table className="comparison-table">
            <tbody>
              {/* Product Overview Row */}
              <tr>
                <td className="comparison-row-header">Product</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    <button
                      onClick={() => removeFromComparison(item.id)}
                      title="Remove from comparison"
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: 'none',
                        color: '#ef4444',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <X size={13} />
                    </button>
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: 'var(--radius-sm)',
                        background: item.imageBg || 'var(--bg-surface)',
                        margin: '0 auto 0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span style={{ fontSize: '1.75rem' }}>⚡</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.brand}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', marginTop: '0.2rem', lineHeight: 1.3 }}>
                      {item.name}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Price Row */}
              <tr>
                <td className="comparison-row-header">Price (INR)</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-mint)' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹{item.originalPrice.toLocaleString('en-IN')} ({item.discount || Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off)
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr>
                <td className="comparison-row-header">Rating</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                      <Star size={14} fill="#FBBF24" color="#FBBF24" />
                      <span style={{ fontWeight: 600 }}>{item.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({item.reviewsCount})</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Category & Verified Status */}
              <tr>
                <td className="comparison-row-header">Category & Seller</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    <span className="badge badge-neutral" style={{ marginBottom: '0.35rem', display: 'inline-block' }}>
                      {item.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--accent-mint)' }}>
                      <ShieldCheck size={14} />
                      <span>{item.sellerName || 'Verified FitSphere Partner'}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Stock Status */}
              <tr>
                <td className="comparison-row-header">Availability</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    {item.inStock !== false && item.stock > 0 ? (
                      <span style={{ color: 'var(--accent-mint)', fontWeight: 600, fontSize: '0.85rem' }}>
                        ✓ In Stock ({item.stock} left)
                      </span>
                    ) : (
                      <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.85rem' }}>
                        Out of Stock
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Package & Serving */}
              <tr>
                <td className="comparison-row-header">Size & Serving</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col" style={{ fontSize: '0.85rem' }}>
                    <div><strong>Net Weight:</strong> {item.weight || 'Standard'}</div>
                    {item.flavor && <div style={{ color: 'var(--text-secondary)' }}><strong>Flavor:</strong> {item.flavor}</div>}
                    {item.servingInfo && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                        {item.servingInfo}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Nutrition Profile */}
              <tr>
                <td className="comparison-row-header">Nutrition Profile</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    {item.nutrition ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.35rem' }}>
                        {item.nutrition.protein_g !== undefined && (
                          <span className="comparison-nutrition-badge">
                            Protein: <strong>{item.nutrition.protein_g}g</strong>
                          </span>
                        )}
                        {item.nutrition.calories !== undefined && (
                          <span className="comparison-nutrition-badge">
                            Calories: <strong>{item.nutrition.calories} kcal</strong>
                          </span>
                        )}
                        {item.nutrition.carbs_g !== undefined && (
                          <span className="comparison-nutrition-badge">
                            Carbs: <strong>{item.nutrition.carbs_g}g</strong>
                          </span>
                        )}
                        {item.nutrition.bcaa_g !== undefined && item.nutrition.bcaa_g > 0 && (
                          <span className="comparison-nutrition-badge">
                            BCAAs: <strong>{item.nutrition.bcaa_g}g</strong>
                          </span>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Not applicable</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Suitable Fitness Goals */}
              <tr>
                <td className="comparison-row-header">Suitable Goals</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    {item.goals && item.goals.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.3rem' }}>
                        {item.goals.map((g) => (
                          <span key={g} className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                            {g}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>All fitness levels</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Dietary Tags */}
              <tr>
                <td className="comparison-row-header">Dietary Tags</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    {item.dietaryTags && item.dietaryTags.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.3rem' }}>
                        {item.dietaryTags.map((d) => (
                          <span key={d} className="badge badge-mint" style={{ fontSize: '0.72rem' }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None specified</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Allergen Information */}
              <tr>
                <td className="comparison-row-header">Allergens & Notes</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {item.allergenInfo || 'No common allergens declared.'}
                  </td>
                ))}
              </tr>

              {/* Action Button */}
              <tr>
                <td className="comparison-row-header">Action</td>
                {comparisonList.map((item) => (
                  <td key={item.id} className="comparison-item-col">
                    <button
                      className="btn btn-sm btn-primary"
                      style={{ width: '100%' }}
                      onClick={() => addToCart(item)}
                      disabled={item.inStock === false || item.stock <= 0}
                    >
                      <ShoppingBag size={14} />
                      <span>{item.inStock === false || item.stock <= 0 ? 'Sold Out' : 'Add to Cart'}</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductComparisonModal;
