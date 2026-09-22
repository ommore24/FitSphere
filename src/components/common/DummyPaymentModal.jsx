import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, QrCode, CreditCard, Building, Truck, ArrowRight, X, Smartphone, RefreshCw } from 'lucide-react';

export const DummyPaymentModal = ({
  isOpen,
  amount = 0,
  title = 'FitSphere Secure Payment',
  onPaymentSuccess,
  onClose
}) => {
  const [method, setMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'cod'
  const [upiId, setUpiId] = useState('athlete@upi');
  const [cardInfo, setCardInfo] = useState({ number: '4111 2222 3333 4444', expiry: '12/28', cvv: '888', name: 'Athlete User' });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  
  // Payment states: 'input' -> 'processing' -> 'confirmed'
  const [payState, setPayState] = useState('input');
  const [countdown, setCountdown] = useState(10);

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      setPayState('input');
      setCountdown(10);
    }
  }, [isOpen]);

  // Handle 10-second countdown during 'processing' state
  useEffect(() => {
    let timer = null;
    if (payState === 'processing') {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        setPayState('confirmed');
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [payState, countdown]);

  // Transition to onPaymentSuccess when state enters 'confirmed'
  useEffect(() => {
    let successTimer = null;
    if (payState === 'confirmed') {
      successTimer = setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess({ method, upiId, amount });
        }
      }, 1500);
    }
    return () => {
      if (successTimer) clearTimeout(successTimer);
    };
  }, [payState, onPaymentSuccess, method, upiId, amount]);

  if (!isOpen) return null;

  const handleStartPayment = (e) => {
    e.preventDefault();
    setPayState('processing');
    setCountdown(10);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 15, 0.88)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div className="glass-card" style={{
        maxWidth: '520px',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        border: '1px solid var(--accent-mint)',
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 245, 155, 0.15), rgba(0, 229, 255, 0.15))',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0, 245, 155, 0.2)', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-mint)', fontWeight: 700, textTransform: 'uppercase' }}>FitSphere Payment Gateway</div>
              <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#fff' }}>{title}</h3>
            </div>
          </div>

          {payState === 'input' && (
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Amount Display */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Total Payable Amount:</span>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-heading)' }}>
            ₹{Number(amount).toLocaleString('en-IN')}
          </span>
        </div>

        {/* BODY STATE 1: INPUT PAYMENT METHOD */}
        {payState === 'input' && (
          <form onSubmit={handleStartPayment} style={{ padding: '1.5rem' }}>
            {/* Method Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                className={`btn btn-sm ${method === 'upi' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMethod('upi')}
                style={{ fontSize: '0.78rem', padding: '0.5rem 0.25rem', flexDirection: 'column', gap: '0.2rem' }}
              >
                <Smartphone size={16} />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                className={`btn btn-sm ${method === 'card' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMethod('card')}
                style={{ fontSize: '0.78rem', padding: '0.5rem 0.25rem', flexDirection: 'column', gap: '0.2rem' }}
              >
                <CreditCard size={16} />
                <span>Card</span>
              </button>

              <button
                type="button"
                className={`btn btn-sm ${method === 'netbanking' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMethod('netbanking')}
                style={{ fontSize: '0.78rem', padding: '0.5rem 0.25rem', flexDirection: 'column', gap: '0.2rem' }}
              >
                <Building size={16} />
                <span>NetBanking</span>
              </button>

              <button
                type="button"
                className={`btn btn-sm ${method === 'cod' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMethod('cod')}
                style={{ fontSize: '0.78rem', padding: '0.5rem 0.25rem', flexDirection: 'column', gap: '0.2rem' }}
              >
                <Truck size={16} />
                <span>COD</span>
              </button>
            </div>

            {/* UPI FIELDS */}
            {method === 'upi' && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Enter VPA / UPI ID *</label>
                <input
                  type="text"
                  required
                  placeholder="mobilenumber@upi or name@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.9rem' }}
                />

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  {['athlete@gpay', '9876543210@paytm', 'user@ybl', 'fitsphere@okaxis'].map((quickUpi) => (
                    <button
                      key={quickUpi}
                      type="button"
                      onClick={() => setUpiId(quickUpi)}
                      style={{ fontSize: '0.72rem', background: 'rgba(0, 245, 155, 0.08)', border: '1px solid rgba(0, 245, 155, 0.2)', color: 'var(--accent-mint)', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem', cursor: 'pointer' }}
                    >
                      {quickUpi}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CARD FIELDS */}
            {method === 'card' && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Card Number</label>
                  <input
                    type="text"
                    value={cardInfo.number}
                    onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NETBANKING FIELDS */}
            {method === 'netbanking' && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', background: '#111827', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.88rem' }}
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* COD CONFIRMATION */}
            {method === 'cod' && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                You have selected <strong>Cash on Delivery (COD)</strong>. Please pay ₹{Number(amount).toLocaleString('en-IN')} in cash or via UPI to the delivery partner upon arrival.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <span>Pay ₹{Number(amount).toLocaleString('en-IN')} Now</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="var(--accent-mint)" />
              <span>Dummy Payment Gateway • 256-Bit Encrypted Test Simulation</span>
            </div>
          </form>
        )}

        {/* BODY STATE 2: 10-SECOND PROCESSING COUNTDOWN */}
        {payState === 'processing' && (
          <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
            {/* Animated Circular Countdown Spinner */}
            <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="spinner" style={{ width: '90px', height: '90px', border: '4px solid rgba(0, 245, 155, 0.15)', borderTopColor: 'var(--accent-mint)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <div style={{ position: 'absolute', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-heading)' }}>
                {countdown}s
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#fff' }}>
              Processing Secure Payment...
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '360px', margin: '0 auto 1.25rem', lineHeight: '1.5' }}>
              Connecting to Indian banking node via <strong style={{ color: 'var(--accent-cyan)' }}>{method.toUpperCase()}</strong>.
              <br />
              <span style={{ color: 'var(--accent-coral)', fontSize: '0.8rem' }}>Please do not close or refresh this window ({countdown}s remaining).</span>
            </p>

            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => setPayState('confirmed')}
              style={{ fontSize: '0.78rem', color: 'var(--accent-mint)', borderColor: 'rgba(0, 245, 155, 0.3)', margin: '0 auto' }}
            >
              Skip Wait & Confirm Now (Demo)
            </button>
          </div>
        )}

        {/* BODY STATE 3: PAYMENT CONFIRMED */}
        {payState === 'confirmed' && (
          <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(0, 245, 155, 0.15)',
              color: 'var(--accent-mint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 30px rgba(0, 245, 155, 0.4)'
            }}>
              <CheckCircle2 size={46} />
            </div>

            <span className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>Payment Confirmed</span>
            <h2 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '0.35rem' }}>
              Payment Successful!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              ₹{Number(amount).toLocaleString('en-IN')} received. Finalizing your order...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DummyPaymentModal;
