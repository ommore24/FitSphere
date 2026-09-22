import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DummyPaymentModal } from '../components/common/DummyPaymentModal';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  ArrowLeft,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cart, cartSubtotal, shippingFee, cartTotal, clearCart, showToast } = useCart();

  const [address, setAddress] = useState({
    fullName: currentUser?.name || currentUser?.user_metadata?.full_name || 'Aryan Mehra',
    phone: '9876543210',
    street: 'Flat 402, Green Glen Heights, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleStartPayment = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!address.fullName.trim() || !address.phone.trim() || !address.street.trim() || !address.pincode.trim()) {
      showToast('Please fill in all required shipping address fields.', 'warning');
      return;
    }

    setIsPaymentModalOpen(true);
  };

  // Alias so both form onSubmit and direct calls work seamlessly
  const handlePlaceOrder = handleStartPayment;

  const executeOrderPlacement = async (paymentDetails) => {
    setIsPaymentModalOpen(false);
    setIsProcessing(true);

    const orderNumber = 'FIT-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = 'TRK-' + Math.floor(10000000 + Math.random() * 90000000);
    const selectedPayMethod = paymentDetails?.method ? paymentDetails.method.toUpperCase() : paymentMethod;

    try {
      let savedOrder = null;

      if (isSupabaseConfigured && currentUser?.id) {
        try {
          const { data: orderData, error: orderErr } = await supabase
            .from('orders')
            .insert({
              user_id: currentUser.id,
              order_number: orderNumber,
              subtotal_inr: cartSubtotal,
              shipping_charge_inr: shippingFee,
              tax_inr: 0,
              discount_inr: 0,
              total_amount_inr: cartTotal,
              payment_method: selectedPayMethod,
              payment_status: 'PAID',
              order_status: 'ORDER PLACED',
              shipping_address: address,
              tracking_number: trackingNumber
            })
            .select()
            .single();

          if (!orderErr && orderData) {
            savedOrder = orderData;
            // Insert order items
            const itemsToInsert = cart.map(item => ({
              order_id: orderData.id,
              product_id: item.product.id,
              product_name: item.product.name,
              unit_price_inr: item.product.price,
              quantity: item.quantity,
              total_price_inr: item.product.price * item.quantity
            }));

            await supabase.from('order_items').insert(itemsToInsert);

            // Update stock quantities
            for (const item of cart) {
              const currentStock = item.product.stock ?? item.product.stock_quantity ?? 10;
              const newStock = Math.max(0, currentStock - item.quantity);
              await supabase.from('products').update({ stock_quantity: newStock }).eq('id', item.product.id);
            }
          }
        } catch (dbErr) {
          console.warn('Supabase order insert error, using local order:', dbErr);
        }
      }

      const finalOrder = savedOrder || {
        id: orderNumber,
        order_number: orderNumber,
        subtotal_inr: cartSubtotal,
        shipping_charge_inr: shippingFee,
        total_amount_inr: cartTotal,
        payment_method: selectedPayMethod,
        order_status: 'ORDER PLACED',
        tracking_number: trackingNumber,
        shipping_address: address,
        created_at: new Date().toISOString(),
        items: cart.map(item => ({
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price_inr: item.product.price,
          total_price_inr: item.product.price * item.quantity
        }))
      };

      // Store in localStorage for demo persistence
      try {
        const stored = JSON.parse(localStorage.getItem('fitsphere_orders') || '[]');
        localStorage.setItem('fitsphere_orders', JSON.stringify([finalOrder, ...stored]));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }

      await clearCart();
      setOrderPlaced(finalOrder);
      showToast(`Order ${orderNumber} successfully placed!`, 'success');
    } catch (err) {
      console.error('Order error:', err);
      const fallbackOrder = {
        id: orderNumber,
        order_number: orderNumber,
        subtotal_inr: cartSubtotal,
        shipping_charge_inr: shippingFee,
        total_amount_inr: cartTotal,
        payment_method: selectedPayMethod,
        order_status: 'ORDER PLACED',
        tracking_number: trackingNumber,
        shipping_address: address,
        created_at: new Date().toISOString(),
        items: cart.map(item => ({
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price_inr: item.product.price,
          total_price_inr: item.product.price * item.quantity
        }))
      };

      try {
        const stored = JSON.parse(localStorage.getItem('fitsphere_orders') || '[]');
        localStorage.setItem('fitsphere_orders', JSON.stringify([fallbackOrder, ...stored]));
      } catch (e) {}

      await clearCart();
      setOrderPlaced(fallbackOrder);
      showToast(`Order ${orderNumber} placed successfully!`, 'success');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="section" style={{ paddingTop: '3rem', minHeight: '75vh' }}>
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '3.5rem 2rem' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0, 245, 155, 0.15)', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={44} />
            </div>
            <span className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>Order Confirmed</span>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Thank You for Your Order!</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Your order number is <strong style={{ color: '#fff' }}>{orderPlaced.order_number}</strong>. We've sent an electronic invoice and tracking link to your email.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <span style={{ fontWeight: 600 }}>{orderPlaced.payment_method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount Paid:</span>
                <span style={{ fontWeight: 800, color: 'var(--accent-mint)' }}>₹{Number(orderPlaced.total_amount_inr).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Logistics Tracking ID:</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{orderPlaced.tracking_number}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/orders" className="btn btn-primary">
                <span>View My Orders</span>
              </Link>
              <Link to="/marketplace" className="btn btn-outline">
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="section" style={{ paddingTop: '3rem', minHeight: '75vh', textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '4rem 2rem', maxWidth: '500px', margin: '0 auto' }}>
            <ShoppingBag size={50} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h2>Your Cart is Empty</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Add items to your cart before proceeding to checkout.</p>
            <Link to="/marketplace" className="btn btn-primary">
              <span>Go to Marketplace</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} />
            <span>Return to Cart</span>
          </Link>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.35rem' }}>
            Checkout & Shipping
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Complete your purchase with guaranteed authentic Indian stock and fast nationwide delivery.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Shipping & Payment Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Address Form */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} color="var(--accent-mint)" />
                <span>Shipping Address</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Street Address / Flat No. *</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                    placeholder="123 Fitness Ave, Block C"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="var(--accent-cyan)" />
                <span>Select Payment Method</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['UPI / QR Code (Google Pay, PhonePe, Paytm)', 'Credit / Debit Card (Visa, Mastercard, RuPay)', 'Net Banking', 'Cash on Delivery (COD)'].map((method) => (
                  <label
                    key={method}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      background: paymentMethod === method ? 'rgba(0, 245, 155, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${paymentMethod === method ? 'var(--accent-mint)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: '#fff'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      style={{ accentColor: 'var(--accent-mint)' }}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Submit */}
          <div className="glass-card" style={{ padding: '1.75rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Summary ({cart.length} items)</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '220px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.25rem' }}>
              {cart.map(({ product, quantity }) => (
                <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ color: '#fff' }}>{product.name}</span>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Qty: {quantity}</div>
                  </div>
                  <span style={{ fontWeight: 700, color: '#fff' }}>₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Delivery</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--accent-mint)' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--accent-mint)' }}>
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              {isProcessing ? 'Processing Order...' : `Pay ₹${cartTotal.toLocaleString('en-IN')} & Place Order`}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={15} color="var(--accent-mint)" />
              <span>100% Genuine Products • Secure Payment</span>
            </div>
          </div>
        </form>

        <DummyPaymentModal
          isOpen={isPaymentModalOpen}
          amount={cartTotal}
          title="FitSphere Marketplace Checkout"
          onPaymentSuccess={executeOrderPlacement}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Checkout;
