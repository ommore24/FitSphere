import React from 'react';
import { ArrowRight, Trash2, Scale, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import '../../styles/comparison.css';

export const ComparisonDock = () => {
  const {
    comparisonList,
    removeFromComparison,
    clearComparison,
    setIsComparisonModalOpen
  } = useCart();

  if (!comparisonList || comparisonList.length === 0) return null;

  return (
    <div className="comparison-dock">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Scale size={18} color="var(--accent-mint)" />
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
          Compare ({comparisonList.length}/4)
        </span>
      </div>

      {/* Thumbnails */}
      <div className="comparison-dock-thumbs">
        {[0, 1, 2, 3].map((index) => {
          const item = comparisonList[index];
          return (
            <div
              key={index}
              className={`comparison-thumb-slot ${item ? 'filled' : ''}`}
              title={item ? item.name : 'Empty slot'}
            >
              {item ? (
                <>
                  <span style={{ fontSize: '1rem' }}>⚡</span>
                  <button
                    className="comparison-thumb-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromComparison(item.id);
                    }}
                    title="Remove item"
                  >
                    ×
                  </button>
                </>
              ) : (
                <span>+</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setIsComparisonModalOpen(true)}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          <span>Compare Now</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={clearComparison}
          className="btn-icon"
          title="Clear comparison list"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default ComparisonDock;
