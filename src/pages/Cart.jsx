import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    cartOriginalSubtotal,
    cartSavings,
    clearCart
  } = useCart();

  const shipping = cartSubtotal > 1000 || cart.length === 0 ? 0 : 99;
  const grandTotal = cartSubtotal + shipping;

  return (
    <div className="section" style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
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
            Your Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            All supplements and accessories dispatched with brand authenticity guarantees and batch verification.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4.5rem 2rem' }}>
            <ShoppingBag size={56} color="var(--text-muted)" style={{ margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
            <p style={{ maxWidth: '420px', margin: '0 auto 1.75rem' }}>
              Explore our curated selection of proteins, Creapure® creatine, vitamins, healthy foods, and recovery gear.
            </p>
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              <span>Browse Marketplace</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
            {/* Cart Items Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(({ product, quantity }) => {
                const maxStock = product.stock ?? product.stock_quantity ?? 99;
                const isMaxReached = quantity >= maxStock;

                return (
                  <div
                    key={product.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem'
                    }}
                  >
                    <Link
                      to={`/marketplace/${product.id}`}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: 'var(--radius-sm)',
                        background: product.imageBg || 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden'
                      }}
                    >
                      {(product.images?.[0]?.url || product.image) ? (
                        <img
                          src={product.images?.[0]?.url || product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <Zap size={32} color={product.iconColor || '#00F59B'} />
                      )}
                    </Link>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-mint)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {product.brand}
                      </div>
                      <Link
                        to={`/marketplace/${product.id}`}
                        style={{ textDecoration: 'none', color: '#fff' }}
                      >
                        <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: '0.2rem 0' }}>{product.name}</h3>
                      </Link>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        ₹{product.price.toLocaleString('en-IN')} each
                        {maxStock < 10 && (
                          <span style={{ marginLeft: '0.5rem', color: 'var(--accent-coral)', fontSize: '0.78rem' }}>
                            (Only {maxStock} left)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.5rem' }}>
                      <button
                        className="icon-btn"
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => updateQuantity(product.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontWeight: 700, padding: '0 0.5rem', fontSize: '0.95rem' }}>{quantity}</span>
                      <button
                        className="icon-btn"
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => updateQuantity(product.id, 1)}
                        disabled={isMaxReached}
                        title={isMaxReached ? 'Max stock reached' : 'Increase quantity'}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Subtotal for this item */}
                    <div style={{ textAlign: 'right', minWidth: '95px' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        style={{ color: '#EF4444', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <Trash2 size={12} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={clearCart}
                  style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Empty Entire Cart
                </button>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
                {cartOriginalSubtotal > cartSubtotal && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Original Price</span>
                    <span style={{ textDecoration: 'line-through' }}>₹{cartOriginalSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {cartSavings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-mint)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Tag size={13} />
                      <span>Instant Discount Savings</span>
                    </span>
                    <span>-₹{cartSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Item Subtotal</span>
                  <span style={{ fontWeight: 700 }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Delivery</span>
                  <span>{shipping === 0 ? <strong style={{ color: 'var(--accent-mint)' }}>FREE</strong> : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-coral)' }}>
                    Add ₹{(1000 - cartSubtotal).toLocaleString('en-IN')} more to unlock free delivery!
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Authenticity Verification</span>
                  <span style={{ color: 'var(--accent-mint)', fontWeight: 600 }}>Included (Free)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '1.25rem 0 1.75rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total (INR)</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-heading)' }}>
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                to="/checkout"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--accent-mint)" />
                <span>256-Bit Encrypted Secure Indian Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
