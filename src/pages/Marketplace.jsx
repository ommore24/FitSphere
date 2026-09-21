import React, { useState } from 'react';
import { CATEGORIES, BRANDS, MOCK_PRODUCTS } from '../data/mockProducts';
import { ProductCard } from '../components/marketplace/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Search, Filter, SlidersHorizontal, Sparkles, ShieldCheck } from 'lucide-react';
import '../styles/marketplace.css';

export const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products logic
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesBrand =
      selectedBrand === 'All Brands' || product.brand === selectedBrand;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Marketplace Header Banner */}
        <div className="marketplace-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span className="badge badge-mint">
              <Sparkles size={13} /> Verified Multi-Brand Catalog
            </span>
            <span className="badge badge-neutral">
              <ShieldCheck size={13} /> 100% Authentic Tested
            </span>
          </div>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            FitSphere Marketplace
          </h1>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            Curated sports nutrition, clinically tested isolates, performance supplements, and elite gym gear.
          </p>
        </div>

        {/* Category Pills Scroller */}
        <div className="category-pills-scroll" style={{ marginBottom: '1.5rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls & Filter Bar */}
        <div className="marketplace-controls-bar">
          {/* Search in catalog */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: '0.45rem 0.85rem', flex: 1, maxWidth: '380px' }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Filter by name, brand, or formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.88rem' }}
            />
          </div>

          {/* Brand Filter & Sort Dropdowns */}
          <div className="marketplace-filters">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={15} color="var(--text-muted)" />
              <select
                className="filter-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {BRANDS.map((brand) => (
                  <option key={brand} value={brand} style={{ background: '#111827' }}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SlidersHorizontal size={15} color="var(--text-muted)" />
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured" style={{ background: '#111827' }}>Sort: Featured</option>
                <option value="price-low" style={{ background: '#111827' }}>Price: Low to High</option>
                <option value="price-high" style={{ background: '#111827' }}>Price: High to Low</option>
                <option value="rating" style={{ background: '#111827' }}>Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredProducts.length}</strong> verified products</span>
          {(selectedCategory !== 'All Products' || selectedBrand !== 'All Brands' || searchQuery) && (
            <button
              style={{ color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'underline' }}
              onClick={() => {
                setSelectedCategory('All Products');
                setSelectedBrand('All Brands');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No matching products found</h3>
            <p style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              We couldn't find items matching your filter criteria. Try resetting filters or searching for another term.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('All Products');
                setSelectedBrand('All Brands');
                setSearchQuery('');
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
