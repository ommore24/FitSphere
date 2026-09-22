import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CATEGORIES,
  BRANDS,
  FITNESS_GOALS,
  DIETARY_PREFERENCES
} from '../data/mockProducts';
import { productsService } from '../services/productsService';
import { ProductCard } from '../components/marketplace/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { ComparisonDock } from '../components/marketplace/ComparisonDock';
import { ProductComparisonModal } from '../components/marketplace/ProductComparisonModal';
import { useCart } from '../context/CartContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  X,
  RotateCcw,
  Clock,
  ArrowRight
} from 'lucide-react';
import '../styles/marketplace.css';

export const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All Products';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedGoal, setSelectedGoal] = useState('All Goals');
  const [selectedDietaryTag, setSelectedDietaryTag] = useState('All Diets');
  const [selectedRating, setSelectedRating] = useState('0');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Quick view state
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { recentlyViewed } = useCart();

  // Load products based on filters
  useEffect(() => {
    let isMounted = true;

    async function fetchCatalog() {
      setLoading(true);
      try {
        const { data } = await productsService.getProducts({
          category: selectedCategory,
          brand: selectedBrand,
          goal: selectedGoal,
          dietaryTag: selectedDietaryTag,
          ratingMin: selectedRating !== '0' ? Number(selectedRating) : undefined,
          priceMin: priceRange.min !== '' ? Number(priceRange.min) : undefined,
          priceMax: priceRange.max !== '' ? Number(priceRange.max) : undefined,
          inStockOnly,
          sortBy,
          search: searchQuery
        });

        if (isMounted) {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Error fetching marketplace products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCatalog();

    return () => {
      isMounted = false;
    };
  }, [
    selectedCategory,
    selectedBrand,
    selectedGoal,
    selectedDietaryTag,
    selectedRating,
    priceRange.min,
    priceRange.max,
    inStockOnly,
    sortBy,
    searchQuery
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All Products');
    setSelectedBrand('All Brands');
    setSelectedGoal('All Goals');
    setSelectedDietaryTag('All Diets');
    setSelectedRating('0');
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Check how many non-default filters are active
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All Products') count++;
    if (selectedBrand !== 'All Brands') count++;
    if (selectedGoal !== 'All Goals') count++;
    if (selectedDietaryTag !== 'All Diets') count++;
    if (selectedRating !== '0') count++;
    if (priceRange.min !== '' || priceRange.max !== '') count++;
    if (inStockOnly) count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedGoal, selectedDietaryTag, selectedRating, priceRange, inStockOnly, searchQuery]);

  return (
    <div className="section" style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Marketplace Header Banner */}
        <div className="marketplace-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span className="badge badge-mint">
              <Sparkles size={13} /> Verified Multi-Brand Catalog
            </span>
            <span className="badge badge-neutral">
              <ShieldCheck size={13} /> 100% Authentic Indian Stock
            </span>
          </div>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            FitSphere Marketplace
          </h1>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            Clinically tested whey isolates, Creapure® creatine, clean whole food bars, ayurvedic vitality herbs, and premium recovery equipment.
          </p>
        </div>

        {/* Category Pills Scroller */}
        <div className="category-pills-scroll" style={{ marginBottom: '1.5rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === 'All Products') {
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                } else {
                  setSearchParams({ category: cat });
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls & Filter Bar */}
        <div className="marketplace-controls-bar">
          {/* Search in catalog */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: '0.45rem 0.85rem', flex: 1, minWidth: '260px', maxWidth: '380px' }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search product, brand, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.88rem' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={14} />
              </button>
            )}
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

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SlidersHorizontal size={15} color="var(--text-muted)" />
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured" style={{ background: '#111827' }}>Relevance / Featured</option>
                <option value="popular" style={{ background: '#111827' }}>Most Popular</option>
                <option value="price-low" style={{ background: '#111827' }}>Price: Low to High</option>
                <option value="price-high" style={{ background: '#111827' }}>Price: High to Low</option>
                <option value="rating" style={{ background: '#111827' }}>Highest Rated</option>
                <option value="newest" style={{ background: '#111827' }}>Newest</option>
              </select>
            </div>

            {/* Advanced Filters Button */}
            <button
              className={`btn btn-sm ${showAdvancedFilters ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <SlidersHorizontal size={14} />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Faceted Filters Panel */}
        {showAdvancedFilters && (
          <div className="faceted-filter-panel">
            {/* Goal Filter */}
            <div>
              <div className="filter-group-label">Fitness Goal</div>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
              >
                {FITNESS_GOALS.map((goal) => (
                  <option key={goal} value={goal} style={{ background: '#111827' }}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            {/* Dietary Preference Filter */}
            <div>
              <div className="filter-group-label">Dietary Preference</div>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={selectedDietaryTag}
                onChange={(e) => setSelectedDietaryTag(e.target.value)}
              >
                {DIETARY_PREFERENCES.map((diet) => (
                  <option key={diet} value={diet} style={{ background: '#111827' }}>
                    {diet}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <div className="filter-group-label">Minimum Rating</div>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <option value="0" style={{ background: '#111827' }}>All Ratings</option>
                <option value="4" style={{ background: '#111827' }}>4.0★ & above</option>
                <option value="4.5" style={{ background: '#111827' }}>4.5★ & above</option>
                <option value="4.8" style={{ background: '#111827' }}>4.8★ & above</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <div className="filter-group-label">Price Range (₹ INR)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.4rem 0.6rem',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
                <span style={{ color: 'var(--text-muted)' }}>-</span>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.4rem 0.6rem',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="filter-group-label">Availability</div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.88rem', color: '#fff' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: 'var(--accent-mint)', width: '16px', height: '16px' }}
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>
        )}

        {/* Active Filter Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="active-filter-chips">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Filters:</span>

            {selectedCategory !== 'All Products' && (
              <span className="filter-chip">
                Category: {selectedCategory}
                <button className="filter-chip-remove" onClick={() => setSelectedCategory('All Products')}>
                  <X size={13} />
                </button>
              </span>
            )}

            {selectedBrand !== 'All Brands' && (
              <span className="filter-chip">
                Brand: {selectedBrand}
                <button className="filter-chip-remove" onClick={() => setSelectedBrand('All Brands')}>
                  <X size={13} />
                </button>
              </span>
            )}

            {selectedGoal !== 'All Goals' && (
              <span className="filter-chip">
                Goal: {selectedGoal}
                <button className="filter-chip-remove" onClick={() => setSelectedGoal('All Goals')}>
                  <X size={13} />
                </button>
              </span>
            )}

            {selectedDietaryTag !== 'All Diets' && (
              <span className="filter-chip">
                Diet: {selectedDietaryTag}
                <button className="filter-chip-remove" onClick={() => setSelectedDietaryTag('All Diets')}>
                  <X size={13} />
                </button>
              </span>
            )}

            {selectedRating !== '0' && (
              <span className="filter-chip">
                Rating: {selectedRating}★+
                <button className="filter-chip-remove" onClick={() => setSelectedRating('0')}>
                  <X size={13} />
                </button>
              </span>
            )}

            {(priceRange.min !== '' || priceRange.max !== '') && (
              <span className="filter-chip">
                Price: ₹{priceRange.min || '0'} - ₹{priceRange.max || 'Any'}
                <button className="filter-chip-remove" onClick={() => setPriceRange({ min: '', max: '' })}>
                  <X size={13} />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="filter-chip">
                In Stock Only
                <button className="filter-chip-remove" onClick={() => setInStockOnly(false)}>
                  <X size={13} />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="filter-chip">
                Query: "{searchQuery}"
                <button className="filter-chip-remove" onClick={() => setSearchQuery('')}>
                  <X size={13} />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-coral)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginLeft: '0.5rem'
              }}
            >
              <RotateCcw size={13} />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Results Count */}
        <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{products.length}</strong> {products.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        {/* Product Grid / Loading / Empty */}
        {loading ? (
          <div style={{ padding: '5rem 0', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem', width: '36px', height: '36px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-mint)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Filtering genuine fitness catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No Products Match Your Criteria</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Try broadening your category, clearing active dietary preferences, or resetting price thresholds.
            </p>
            <button className="btn btn-primary" onClick={resetFilters}>
              <RotateCcw size={16} />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Recently Viewed Products Section */}
        {recentlyViewed && recentlyViewed.length > 0 && (
          <div className="recently-viewed-section">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-mint)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  <Clock size={15} />
                  <span>Browsing History</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                  Recently Viewed Products
                </h2>
              </div>
            </div>

            <div className="product-grid">
              {recentlyViewed.slice(0, 4).map((p) => (
                <ProductCard key={`recent-${p.id}`} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Comparison Dock & Modal */}
      <ComparisonDock />
      <ProductComparisonModal />

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Marketplace;
