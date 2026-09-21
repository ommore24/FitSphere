import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { ProductCard } from '../components/marketplace/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

export const Wishlist = () => {
  const { wishlist } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const wishlistProducts = MOCK_PRODUCTS.filter((prod) => wishlist.includes(prod.id));

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link
            to="/marketplace"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.75rem' }}
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.35rem' }}>
            Saved Items ({wishlist.length})
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Products you are tracking for your upcoming training phases.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4.5rem 2rem' }}>
            <Heart size={56} color="var(--text-muted)" style={{ margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>No Saved Items Yet</h2>
            <p style={{ maxWidth: '420px', margin: '0 auto 1.75rem' }}>
              Click the heart icon on any supplement or lifting accessory to track it here.
            </p>
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              <span>Explore Marketplace</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlistProducts.map((product) => (
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
    </div>
  );
};
