import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, ArrowLeft, LogIn, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productsService } from '../services/productsService';
import { ProductCard } from '../components/marketplace/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { ComparisonDock } from '../components/marketplace/ComparisonDock';
import { ProductComparisonModal } from '../components/marketplace/ProductComparisonModal';

export const Wishlist = () => {
  const { wishlist, wishlistItems } = useCart();
  const { user } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadAll() {
      try {
        const { data } = await productsService.getProducts();
        if (isMounted) {
          setAllProducts(data || []);
        }
      } catch (e) {
        console.warn('Error loading products for wishlist:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAll();
    return () => {
      isMounted = false;
    };
  }, []);

  // Match wishlist IDs against products catalog or joined wishlistItems
  const displayProducts = React.useMemo(() => {
    if (wishlistItems && wishlistItems.length > 0) {
      return wishlistItems;
    }
    return allProducts.filter((prod) => wishlist.includes(prod.id));
  }, [allProducts, wishlist, wishlistItems]);

  return (
    <div className="section" style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            to="/marketplace"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.75rem' }}
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.35rem' }}>
            Saved Items ({displayProducts.length})
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Products you are tracking for your upcoming training phases and nutrition cycles.
          </p>
        </div>

        {/* Logged-out Sync Prompt Banner */}
        {!user && (
          <div
            style={{
              background: 'linear-gradient(90deg, rgba(0, 245, 155, 0.08), rgba(0, 229, 255, 0.08))',
              border: '1px solid rgba(0, 245, 155, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Sparkles size={20} color="var(--accent-mint)" />
              <div>
                <strong style={{ color: '#fff', fontSize: '0.92rem' }}>Sync your saved supplements across devices</strong>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Log in to your FitSphere profile so your wishlist is permanently saved to your account in Supabase.
                </p>
              </div>
            </div>
            <Link to="/login" className="btn btn-sm btn-primary">
              <LogIn size={15} />
              <span>Log In to Sync</span>
            </Link>
          </div>
        )}

        {/* Wishlist Items Grid */}
        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem', width: '36px', height: '36px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-mint)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Loading your saved training stack...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4.5rem 2rem' }}>
            <Heart size={56} color="var(--text-muted)" style={{ margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>No Saved Items Yet</h2>
            <p style={{ maxWidth: '420px', margin: '0 auto 1.75rem' }}>
              Click the heart icon on any supplement or lifting accessory in our marketplace to track it here.
            </p>
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              <span>Explore Marketplace</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

      <ComparisonDock />
      <ProductComparisonModal />
    </div>
  );
};

export default Wishlist;
