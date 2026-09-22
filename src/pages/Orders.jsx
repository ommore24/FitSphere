import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Package, Truck, Clock, CheckCircle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

export const Orders = () => {
  const { currentUser } = useAuth();
  const { showToast } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchUserOrders() {
      let localOrders = [];
      try {
        localOrders = JSON.parse(localStorage.getItem('fitsphere_orders') || '[]');
      } catch (e) {}

      if (!isSupabaseConfigured || !currentUser?.id) {
        // Fallback demo order + local orders
        if (isMounted) {
          const defaultSample = {
            id: 'FIT-849201',
            order_number: 'FIT-849201',
            subtotal_inr: 2999,
            total_amount_inr: 2999,
            payment_status: 'PAID',
            order_status: 'PROCESSING',
            tracking_number: 'TRK-7489201',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            items: [
              { product_name: 'Optimum Nutrition Gold Standard 100% Whey (1 kg)', quantity: 1, unit_price_inr: 2999 }
            ]
          };
          setOrders(localOrders.length > 0 ? localOrders : [defaultSample]);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items(*)
          `)
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });

        if (isMounted) {
          if (!error && data && data.length > 0) {
            const existingIds = new Set(data.map(o => o.order_number || o.id));
            const uniqueLocal = localOrders.filter(o => !existingIds.has(o.order_number) && !existingIds.has(o.id));
            setOrders([...uniqueLocal, ...data]);
          } else {
            setOrders(localOrders);
          }
        }
      } catch (err) {
        console.warn('Orders fetch fallback:', err);
        if (isMounted) setOrders(localOrders);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchUserOrders();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);

  const handleReturnRequest = async (orderId) => {
    try {
      if (isSupabaseConfigured && currentUser?.id) {
        await supabase
          .from('orders')
          .update({ order_status: 'RETURN REQUESTED' })
          .eq('id', orderId);
      }

      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, order_status: 'RETURN REQUESTED' } : o)
      );

      showToast('Return request submitted. Our logistics partner will schedule pickup.', 'info');
    } catch (err) {
      console.error('Return request error:', err);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} />
            <span>Back to Marketplace</span>
          </Link>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.35rem' }}>
            My Orders & Tracking
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Track order status, view invoices, and manage returns for your FitSphere purchases.
          </p>
        </div>

        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem', width: '32px', height: '32px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-mint)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Package size={50} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h2>No Orders Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>You haven't placed any orders yet.</p>
            <Link to="/marketplace" className="btn btn-primary">
              <span>Explore Marketplace</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => {
              const dateStr = new Date(order.created_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });

              return (
                <div key={order.id} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order ID</div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>{order.order_number}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date</div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{dateStr}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</div>
                      <div style={{ fontWeight: 800, color: 'var(--accent-mint)', fontSize: '1.1rem' }}>₹{Number(order.total_amount_inr).toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <span className={`badge ${order.order_status === 'DELIVERED' ? 'badge-mint' : order.order_status === 'RETURN REQUESTED' ? 'badge-coral' : 'badge-cyan'}`}>
                        {order.order_status}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Bar */}
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <Truck size={16} color="var(--accent-cyan)" />
                      <span style={{ color: 'var(--text-secondary)' }}>Tracking No:</span>
                      <strong style={{ color: '#fff' }}>{order.tracking_number || 'TRK-PENDING'}</strong>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Status: <span style={{ color: 'var(--accent-mint)', fontWeight: 600 }}>{order.order_status}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  {order.items && order.items.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#fff' }}>
                          <span>{item.product_name} × {item.quantity}</span>
                          <span style={{ fontWeight: 700 }}>₹{Number(item.unit_price_inr * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    {order.order_status !== 'RETURN REQUESTED' && order.order_status !== 'REFUNDED' && (
                      <button
                        onClick={() => handleReturnRequest(order.id)}
                        className="btn btn-sm btn-outline-coral"
                      >
                        <RotateCcw size={14} />
                        <span>Request Return</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
