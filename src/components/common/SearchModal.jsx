import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { useNavigate } from 'react-router-dom';

export const SearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const quickSearches = [
    'Whey Isolate',
    'Creapure®',
    'Pre-Workout',
    'Gymshark Straps',
    'High Protein Bars',
    'Multivitamin'
  ];

  const filtered = query.trim() === ''
    ? []
    : MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectQuickTag = (tag) => {
    setQuery(tag);
  };

  const handleProductClick = (product) => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      navigate('/marketplace');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close search">
          <X size={18} />
        </button>

        <div className="search-modal-header">
          <Search size={22} color="var(--accent-primary)" />
          <input
            type="text"
            className="search-modal-input"
            placeholder="Search supplements, gear, workout plans..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="search-modal-body">
          {query.trim() === '' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sparkles size={16} color="var(--accent-amber)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Popular Searches
                </span>
              </div>
              <div className="search-quick-tags">
                {quickSearches.map((tag) => (
                  <button
                    key={tag}
                    className="search-tag-pill"
                    onClick={() => handleSelectQuickTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Found {filtered.length} matching results
              </p>
              {filtered.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', padding: '1rem 0' }}>
                  No items found for "{query}". Try checking categories in the Marketplace.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filtered.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        border: '1px solid var(--border-subtle)',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.background = 'rgba(0, 245, 155, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                          {prod.brand} • {prod.category}
                        </div>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{prod.name}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: 800, color: '#fff' }}>₹{prod.price.toLocaleString('en-IN')}</span>
                        <ArrowRight size={16} color="var(--text-muted)" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
