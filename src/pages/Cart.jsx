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
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartCount, cartSubtotal, clearCart } = useCart();

  const shipping = cartSubtotal > 999 || cart.length === 0 ? 0 : 99;
  const grandTotal = cartSubtotal + shipping;

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
            Your Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            All items dispatched directly from certified brand warehouses with third-party testing seal.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4.5rem 2rem' }}>
            <ShoppingBag size={56} color="var(--text-muted)" style={{ margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
            <p style={{ maxWidth: '420px', margin: '0 auto 1.75rem' }}>
              Explore our curated selection of proteins, Creapure® creatine, vitamins, and lifting accessories.
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
              {cart.map(({ product, quantity }) => (
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
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-sm)',
                      background: product.imageBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Zap size={32} color={product.iconColor} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {product.brand}
                    </div>
                    <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: '0.2rem 0' }}>{product.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      ₹{product.price.toLocaleString('en-IN')} each
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
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Subtotal for this item */}
                  <div style={{ textAlign: 'right', minWidth: '85px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      style={{ color: '#EF4444', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.25rem' }}
                    >
                      <Trash2 size={12} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={clearCart}
                  style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'underline' }}
                >
                  Empty Entire Cart
                </button>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Item Subtotal</span>
                  <span style={{ fontWeight: 700 }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Delivery</span>
                  <span>{shipping === 0 ? <strong style={{ color: 'var(--accent-primary)' }}>FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Authenticity Verification</span>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Included (Free)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '1.25rem 0 1.75rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total (INR)</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={() => alert('Checkout payment gateway will be integrated in subsequent parts.')}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--accent-primary)" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
