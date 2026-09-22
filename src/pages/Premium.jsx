import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DummyPaymentModal } from '../components/common/DummyPaymentModal';
import { Crown, Check, X, ShieldCheck, Zap, ArrowLeft, Star, Award } from 'lucide-react';

export const Premium = () => {
  const { currentUser } = useAuth();
  const { showToast } = useCart();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkMembership() {
      if (!isSupabaseConfigured || !currentUser?.id) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('memberships')
          .select('*')
          .eq('user_id', currentUser.id)
          .eq('status', 'ACTIVE')
          .maybeSingle();

        if (isMounted && !error && data) {
          setIsPremium(true);
        }
      } catch (err) {
        console.warn('Membership check fallback:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkMembership();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);

  const handleStartUpgrade = () => {
    setIsPaymentModalOpen(true);
  };

  const executeUpgrade = async (paymentDetails) => {
    setIsPaymentModalOpen(false);
    setUpgrading(true);

    try {
      if (isSupabaseConfigured && currentUser?.id) {
        await supabase
          .from('memberships')
          .upsert({
            user_id: currentUser.id,
            plan: 'FitSphere Pro Premium',
            status: 'ACTIVE',
            price_inr: 499.00,
            payment_id: 'PAY-DEMO-' + Math.floor(100000 + Math.random() * 900000)
          }, { onConflict: 'user_id' });
      }

      setIsPremium(true);
      showToast('🎉 Welcome to FitSphere Premium! All pro features unlocked.', 'success');
    } catch (err) {
      console.error('Upgrade error:', err);
      setIsPremium(true);
      showToast('🎉 Upgrade complete (Demo Mode)', 'success');
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <Link to="/fitness-journey" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
            <ArrowLeft size={16} />
            <span>Return to Fitness Journey</span>
          </Link>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <span className="badge badge-coral" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Crown size={14} /> Athletic Pro Tier
            </span>
          </div>
          <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
            FitSphere Premium Membership
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '580px' }}>
            Elevate your training with personalized macro adjustments, full workout protocols, priority warehouse dispatch, and free coach sessions.
          </p>
        </div>

        {/* Pricing & Comparison Table */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '850px', margin: '0 auto 3rem', alignItems: 'stretch' }}>
          {/* FREE USER CARD */}
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>FREE ATHLETE</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                ₹0 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ forever</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Standard access to marketplace products, basic fitness goal tracking, and sample exercises.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <span>Basic Marketplace & Cart</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <span>Basic Exercise Library</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <span>Basic Nutrition & Water Tracking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
                  <X size={16} color="#EF4444" />
                  <span>Advanced Goal Protocols</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
                  <X size={16} color="#EF4444" />
                  <span>2 Free Coach Consultations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
                  <X size={16} color="#EF4444" />
                  <span>Priority Shipping & Verified Badge</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Current Basic Account
              </div>
            </div>
          </div>

          {/* PREMIUM USER CARD */}
          <div className="glass-card" style={{ padding: '2rem', border: '2px solid var(--accent-mint)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', right: '20px', background: 'var(--accent-mint)', color: '#000', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
              RECOMMENDED
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-mint)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Crown size={15} /> FITSPHERE PREMIUM
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-mint)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                ₹499 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Full access to all advanced fitness programs, macro adjustment algorithms, and verified coach sessions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <strong>Full Fitness Journey Ecosystem</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <strong>Complete Exercise & Split Protocols</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <strong>Advanced Goal-Based Recommendations</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <strong>2 Free Certified Coach Consultations</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
                  <Check size={16} color="var(--accent-mint)" />
                  <strong>Priority Dispatch & Free Express Shipping</strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              {isPremium ? (
                <div style={{ padding: '0.85rem', background: 'rgba(0, 245, 155, 0.15)', border: '1px solid var(--accent-mint)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontWeight: 700, color: 'var(--accent-mint)' }}>
                  ✓ ACTIVE PREMIUM MEMBER
                </div>
              ) : (
                <button
                  onClick={handleStartUpgrade}
                  disabled={upgrading}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <Crown size={18} />
                  <span>{upgrading ? 'Processing...' : 'Upgrade to Premium (₹499)'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Security / Info footer */}
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={16} color="var(--accent-mint)" />
          <span>College Demo Mode: Test payment architecture is activated for evaluation.</span>
        </div>

        <DummyPaymentModal
          isOpen={isPaymentModalOpen}
          amount={499}
          title="FitSphere Premium Pro Upgrade"
          onPaymentSuccess={executeUpgrade}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Premium;
