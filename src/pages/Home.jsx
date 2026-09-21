import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Users,
  Star,
  Activity,
  Calendar,
  Layers
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { MOCK_COACHES } from '../data/mockCoaches';
import { ProductCard } from '../components/marketplace/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { CoachApplyModal } from '../components/common/CoachApplyModal';
import '../styles/hero.css';

export const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [activeGoalPreview, setActiveGoalPreview] = useState('muscle');

  // Featured 4 products for homepage
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Left Text Column */}
          <div className="animate-fade-in">
            <div className="hero-badge-wrap">
              <span className="badge badge-mint">
                <Sparkles size={13} /> The Unified Fitness Ecosystem
              </span>
            </div>

            <h1 className="hero-title">
              Fuel Your Ambition. <br />
              <span className="hero-title-accent">Marketplace</span> Meets <br />
              <span className="hero-title-coral">Fitness Journey</span>.
            </h1>

            <p className="hero-description">
              FitSphere merges premium multi-brand sports nutrition and performance gear
              with an intelligent, personalized workout and macronutrient tracking journey.
              Everything your transformation demands, unified in one platform.
            </p>

            <div className="hero-actions">
              <Link to="/marketplace" className="btn btn-primary btn-lg">
                <ShoppingBag size={18} />
                <span>Explore Marketplace</span>
              </Link>
              <Link to="/fitness-journey" className="btn btn-coral btn-lg">
                <Flame size={18} />
                <span>Start Fitness Journey</span>
              </Link>
            </div>

            {/* Live Stats Row */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <h4>120+</h4>
                <p>Verified Brands</p>
              </div>
              <div className="stat-item">
                <h4>50k+</h4>
                <p>Active Athletes</p>
              </div>
              <div className="stat-item">
                <h4>99.4%</h4>
                <p>Goal Adherence</p>
              </div>
            </div>
          </div>

          {/* Right Interactive Visual Showcase */}
          <div className="hero-showcase">
            <div className="hero-main-card">
              <div className="hero-card-header">
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Dual Experience Hub
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>FitSphere Unified Core</h3>
                </div>
                <span className="badge badge-mint">Live Platform</span>
              </div>

              {/* Split Experience Cards */}
              <div className="hero-split-experience">
                <Link to="/marketplace" className="experience-mini-card">
                  <div className="mini-card-icon icon-mint-bg">
                    <ShoppingBag size={20} />
                  </div>
                  <h4>Marketplace</h4>
                  <p>Shop tested isolates, aminos, and precision lifting accessories.</p>
                </Link>

                <Link to="/fitness-journey" className="experience-mini-card journey-accent">
                  <div className="mini-card-icon icon-coral-bg">
                    <Flame size={20} />
                  </div>
                  <h4>Fitness Journey</h4>
                  <p>Log macros, track progressive overload, and sync recovery goals.</p>
                </Link>
              </div>

              {/* Real-time Widget Preview Inside Card */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={16} color="var(--accent-primary)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Today's Performance Target</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 800 }}>68% Hit</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), #00E5FF)', borderRadius: '999px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.65rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>145g / 185g Protein</span>
                  <span>1,980 / 2,750 kcal</span>
                </div>
              </div>
            </div>

            {/* Floating Live Proof Badges */}
            <div className="floating-proof-badge floating-proof-1">
              <ShieldCheck size={24} color="var(--accent-primary)" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>100% Authentic Brands</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Optimum, Thorne, Rogue & Gymshark</div>
              </div>
            </div>

            <div className="floating-proof-badge floating-proof-2">
              <TrendingUp size={24} color="var(--accent-secondary)" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>19-Day Habit Streak</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Consistency drives transformation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHORT FITSPHERE INTRODUCTION */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-mint">Why FitSphere</span>
            <h2 className="section-title">The First Truly Integrated Fitness Ecosystem</h2>
            <p className="section-subtitle">
              Until now, you bought supplements on one website, tracked workouts in a separate app, and consulted coaches on social media. FitSphere unifies every dimension under one roof.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 245, 155, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShoppingBag size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Curated Multi-Brand Marketplace</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                No counterfeits, no gray-market batches. Only lab-certified supplements, verified raw ingredients, and authentic apparel from industry leaders.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 107, 53, 0.1)', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Flame size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Adaptive Fitness Journey</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Dynamic workout splits, real-time macronutrient logging, progress tracking, and personalized goal progression designed for sustainable gains.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Elite Verified Coaches</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Connect directly with certified strength coaches and registered sports dietitians who tailor programs directly into your FitSphere app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUAL EXPERIENCE PREVIEWS (Marketplace & Fitness Journey) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-cyan">Dual Core Experience</span>
            <h2 className="section-title">Two Worlds. Seamlessly Synchronized.</h2>
            <p className="section-subtitle">
              Jump between finding the highest quality fuel for your body and tracking the metrics that forge results.
            </p>
          </div>

          <div className="dual-section-grid">
            {/* Marketplace Preview Box */}
            <div className="dual-banner banner-glow-mint">
              <div>
                <span className="badge badge-mint">Experience 01</span>
                <h3>The FitSphere Marketplace</h3>
                <p>
                  Explore pure whey isolates, Creapure® monohydrate, endurance hydration formulas, and ergonomic lifting accessories.
                </p>

                <ul className="feature-list">
                  <li>
                    <CheckCircle2 size={18} color="var(--accent-primary)" />
                    <span>Lab-tested third-party purity standards</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} color="var(--accent-primary)" />
                    <span>Cross-brand price comparison and bundle savings</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} color="var(--accent-primary)" />
                    <span>Same-day dispatch & verified batch serial numbers</span>
                  </li>
                </ul>
              </div>

              <Link to="/marketplace" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <span>Enter Marketplace</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Journey Preview Box */}
            <div className="dual-banner banner-glow-coral">
              <div>
                <span className="badge badge-coral">Experience 02</span>
                <h3>The Fitness Journey Tracker</h3>
                <p>
                  Set your target objective, follow structured 4-day power splits, record daily macro intakes, and track lifetime PRs.
                </p>

                <ul className="feature-list">
                  <li>
                    <CheckCircle2 size={18} color="var(--accent-secondary)" />
                    <span>Daily calorie & macro targets (Protein, Carbs, Fats)</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} color="var(--accent-secondary)" />
                    <span>Weekly Push / Pull / Legs periodized schedules</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} color="var(--accent-secondary)" />
                    <span>Goal completion rings & body metric analytics</span>
                  </li>
                </ul>
              </div>

              <Link to="/fitness-journey" className="btn btn-coral" style={{ alignSelf: 'flex-start' }}>
                <span>Launch Fitness Journey</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS PREVIEW */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-mint">Curated Excellence</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Multi-Brand Gear & Nutrition</h2>
            </div>
            <Link to="/marketplace" className="btn btn-secondary">
              <span>View Full Marketplace ({MOCK_PRODUCTS.length}+ items)</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. GOAL-BASED RECOMMENDATIONS PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-cyan">Precision Matching</span>
            <h2 className="section-title">Personalized Goal Recommendations</h2>
            <p className="section-subtitle">
              Don't guess what your body needs. Match your specific fitness ambition with clinically-dosed supplement stacks and workout splits.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
              {[
                { id: 'muscle', label: 'Hypertrophy & Mass' },
                { id: 'fatloss', label: 'Fat Loss & Definition' },
                { id: 'endurance', label: 'Athletic Conditioning' },
                { id: 'longevity', label: 'Mobility & Longevity' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`btn btn-sm ${activeGoalPreview === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveGoalPreview(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>Customized Blueprint</span>
                <h3 style={{ fontSize: '1.65rem', marginBottom: '0.75rem' }}>
                  {activeGoalPreview === 'muscle' && 'The Clean Hypertrophy Architecture Stack'}
                  {activeGoalPreview === 'fatloss' && 'The Metabolic Shred & Retention Protocol'}
                  {activeGoalPreview === 'endurance' && 'The Hyrox & Stamina Endurance Engine'}
                  {activeGoalPreview === 'longevity' && 'The Cellular Vitality & Joint Durability Protocol'}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  A calibrated synergy of rapid-acting proteins, cellular creatine phosphate replenishment, and targeted accessories designed to accelerate recovery between high-intensity sessions.
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/recommendations" className="btn btn-outline-mint">
                    <span>Explore Goal Wizard</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1rem' }}>Recommended Blueprint Items:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Gold Standard 100% Whey Isolate</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>$64.99</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Creapure® Micronized Creatine</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>$38.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Apex Lifting Straps</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>$24.50</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontWeight: 700 }}>Full Stack Price (15% Off):</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>$128.98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COACH SPOTLIGHT SECTION */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-coral">Certified Mentorship</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Train with Verified Elite Coaches</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/fitness-journey" className="btn btn-secondary">
                <span>Browse All Coaches</span>
              </Link>
              <button className="btn btn-outline-mint" onClick={() => setCoachModalOpen(true)}>
                <Award size={16} />
                <span>Join As A Coach</span>
              </button>
            </div>
          </div>

          <div className="coaches-grid">
            {MOCK_COACHES.map((coach) => (
              <div key={coach.id} className="coach-card">
                <div className="coach-header">
                  <div className="coach-avatar" style={{ background: coach.avatarBg }}>
                    {coach.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <h4>{coach.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{coach.title}</span>
                  </div>
                </div>

                <div className="coach-credentials-chips">
                  {coach.credentials.map((cred, i) => (
                    <span key={i} className="credential-chip">
                      {cred}
                    </span>
                  ))}
                </div>

                <p className="coach-bio">{coach.bio}</p>

                <div className="coach-footer">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                      <Star size={14} fill="currentColor" />
                      <span>{coach.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({coach.reviews})</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {coach.activeClients} Active Clients
                    </span>
                  </div>

                  <Link to="/fitness-journey" className="btn btn-sm btn-primary">
                    <span>Consult Coach</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PREMIUM MEMBERSHIP PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="membership-card">
            <div>
              <span className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>
                FitSphere Pro
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Unlock the Full Athletic Architecture
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Upgrade to FitSphere Pro to unlock advanced periodization protocols, direct private chat with sports dietitians, and free priority shipping on all marketplace orders.
              </p>

              <div className="membership-perks-grid">
                <div className="perk-item">
                  <CheckCircle2 size={20} color="var(--accent-primary)" />
                  <div>
                    <h5>Free Expedited Delivery</h5>
                    <p>Unlimited 2-day delivery on all multi-brand supplement orders.</p>
                  </div>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={20} color="var(--accent-primary)" />
                  <div>
                    <h5>Personalized Macro Blueprint</h5>
                    <p>Weekly adaptive caloric adjustments based on bodyweight trends.</p>
                  </div>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={20} color="var(--accent-primary)" />
                  <div>
                    <h5>1-on-1 Coach Access</h5>
                    <p>Monthly live check-in and form assessment with certified coaches.</p>
                  </div>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={20} color="var(--accent-primary)" />
                  <div>
                    <h5>Pro Exclusive Stacks</h5>
                    <p>Members-only discounts on newly launched formulas and drops.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(10, 14, 23, 0.7)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Membership Tier
              </span>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0', fontFamily: 'var(--font-heading)' }}>
                $19<span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/month</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Cancel anytime. 14-day risk-free athletic satisfaction trial.
              </p>
              <Link to="/fitness-journey" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <span>Activate Pro Membership</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <span className="badge badge-mint" style={{ marginBottom: '1rem' }}>
              Transform Your Fitness
            </span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem' }}>
              Ready to Redefine What Your Body Can Achieve?
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Join thousands of dedicated athletes relying on FitSphere for verified nutrition, scientifically-backed training plans, and unwavering community support.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary btn-lg">
                <span>Create Free Athlete Account</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/marketplace" className="btn btn-secondary btn-lg">
                <span>Browse Marketplace</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Quick View Product Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Coach Application Modal */}
      <CoachApplyModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
      />
    </div>
  );
};
