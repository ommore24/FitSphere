import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Target,
  ShoppingBag,
  CheckCircle2,
  Dumbbell,
  Apple,
  ArrowRight,
  Flame,
  Zap,
  Activity,
  ShieldAlert,
  Eye,
  Star
} from 'lucide-react';
import { MOCK_PRODUCTS, FITNESS_GOALS, DIETARY_PREFERENCES } from '../data/mockProducts';
import { productsService } from '../services/productsService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/recommendations.css';

export const Recommendations = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const { addToCart, showToast } = useCart();

  // 1. Goal Options
  const goalList = [
    { id: 'Muscle Gain', title: 'Muscle Gain & Hypertrophy', iconColor: '#00F59B', badge: 'High Protein' },
    { id: 'Fat Loss', title: 'Fat Loss & Metabolic Shred', iconColor: '#FF6B35', badge: 'Caloric Deficit' },
    { id: 'Strength', title: 'Strength & Powerlifting', iconColor: '#00E5FF', badge: 'Heavy Load' },
    { id: 'Posture & Mobility', title: 'Posture & Mobility Decompression', iconColor: '#FBBF24', badge: 'Alignment' },
    { id: 'General Fitness', title: 'General Fitness & Energy', iconColor: '#A855F7', badge: 'Balanced' }
  ];

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const dietaryList = ['Standard', 'Vegetarian', 'Vegan', 'Keto', 'High Protein', 'Gluten-Free'];

  // Initialize from user profile if logged in
  const profileGoal = userProfile?.fitness_goal || 'Muscle Gain';
  const profileDiet = userProfile?.dietary_preference || 'Standard';

  const [selectedGoal, setSelectedGoal] = useState(profileGoal);
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');
  const [selectedDiet, setSelectedDiet] = useState(profileDiet);
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  // Sync profile when userProfile loads
  useEffect(() => {
    if (userProfile?.fitness_goal) {
      const match = goalList.find(g => g.id.toLowerCase() === userProfile.fitness_goal.toLowerCase());
      if (match) setSelectedGoal(match.id);
    }
    if (userProfile?.dietary_preference) {
      setSelectedDiet(userProfile.dietary_preference);
    }
  }, [userProfile?.fitness_goal, userProfile?.dietary_preference]);

  // Load product catalog
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await productsService.getProducts();
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn('Recommendations catalog load fallback:', err);
      }
    }
    loadCatalog();
  }, []);

  // Filter dynamic recommendations based on selectedGoal and selectedDiet
  const recommendedProducts = useMemo(() => {
    let list = [...products];

    // Score relevance for each product
    const scored = list.map(p => {
      let score = 0;
      let reason = '';

      // Match Goal
      if (p.goals && p.goals.some(g => g.toLowerCase().includes(selectedGoal.toLowerCase()) || selectedGoal.toLowerCase().includes(g.toLowerCase()))) {
        score += 5;
        reason = `Formulated specifically for ${selectedGoal}`;
      } else if (p.category === 'Protein' && selectedGoal.includes('Muscle')) {
        score += 4;
        reason = `High-yield protein for ${selectedGoal}`;
      } else if (p.category === 'Creatine' && (selectedGoal.includes('Muscle') || selectedGoal.includes('Strength'))) {
        score += 4;
        reason = `Clinically proven for ${selectedGoal}`;
      } else if (p.category === 'Healthy Foods' && selectedGoal.includes('Fat Loss')) {
        score += 3;
        reason = `Low-calorie clean nutrition for ${selectedGoal}`;
      } else {
        score += 1;
        reason = `Supports total athletic performance`;
      }

      // Match Diet
      if (selectedDiet !== 'Standard' && p.dietaryTags) {
        if (p.dietaryTags.some(d => d.toLowerCase().includes(selectedDiet.toLowerCase()))) {
          score += 4;
          reason += ` & ${selectedDiet} compliant`;
        }
      }

      return { product: p, score, reason };
    });

    scored.sort((a, b) => b.score - a.score);

    // Pick top 3 matching products for the recommended stack
    return scored.slice(0, 3);
  }, [products, selectedGoal, selectedDiet]);

  // Total bundle price calculations
  const stackTotalPrice = recommendedProducts.reduce((sum, item) => sum + item.product.price, 0);
  const stackOriginalPrice = Math.round(stackTotalPrice * 1.15);

  const handleAddFullStack = () => {
    recommendedProducts.forEach(({ product }) => {
      addToCart(product, 1);
    });
    showToast(`Added full ${selectedGoal} recommended stack (${recommendedProducts.length} items) to cart!`, 'success');
  };

  // Dynamic Workout Protocol generator based on selectedGoal & Level
  const dynamicWorkoutProtocol = useMemo(() => {
    if (selectedGoal === 'Fat Loss') {
      return {
        frequency: '4 Days Lift + 2 Days Zone 2 HIIT',
        focus: 'High density Circuits & Caloric Deficit',
        repRange: '12-15 Reps (60-70% 1RM)',
        recoveryWindow: '45-60 Seconds Rest'
      };
    } else if (selectedGoal === 'Strength') {
      return {
        frequency: '4 Days Heavy Compound Progression',
        focus: 'Maximal Power, Neural Drive & Heavy Loading',
        repRange: '3-5 Reps (85-90% 1RM)',
        recoveryWindow: '3-5 Minutes Rest'
      };
    } else if (selectedGoal === 'Posture & Mobility') {
      return {
        frequency: 'Daily 20-min Mobility & Spinal Decompression',
        focus: 'Thoracic Extension, Core Anti-Extension & Alignment',
        repRange: '10-12 Controlled Holds',
        recoveryWindow: '30 Seconds Rest'
      };
    } else {
      // Muscle Gain / General
      return {
        frequency: selectedLevel === 'Advanced' ? '5 Days Push/Pull/Legs' : '4 Days Upper/Lower Split',
        focus: 'Time Under Tension & Progressive Mechanical Overload',
        repRange: '8-12 Reps (75-80% 1RM)',
        recoveryWindow: '60-90 Seconds Rest'
      };
    }
  }, [selectedGoal, selectedLevel]);

  // Dynamic Macro Strategy based on selectedGoal & Diet
  const dynamicMacroStrategy = useMemo(() => {
    if (selectedGoal === 'Fat Loss') {
      return {
        proteinMultiplier: '2.2g per kg bodyweight',
        caloricSurplus: '300-500 kcal Caloric Deficit',
        hydrationGoal: '3.5 - 4.0 Liters Daily',
        dietNote: `Calibrated for ${selectedDiet} framework`
      };
    } else if (selectedGoal === 'Strength' || selectedGoal === 'Muscle Gain') {
      return {
        proteinMultiplier: '2.0g per kg bodyweight',
        caloricSurplus: '250-350 kcal Caloric Surplus',
        hydrationGoal: '3.5 Liters Daily',
        dietNote: `Calibrated for ${selectedDiet} framework`
      };
    } else {
      return {
        proteinMultiplier: '1.6g per kg bodyweight',
        caloricSurplus: 'Isocaloric Maintenance',
        hydrationGoal: '3.0 Liters Daily',
        dietNote: `Calibrated for ${selectedDiet} framework`
      };
    }
  }, [selectedGoal, selectedDiet]);

  return (
    <div className="rec-container">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="badge badge-mint">
            <Sparkles size={13} /> Algorithmic Recommendation Engine
          </span>
          <h1 className="section-title">Personalized Goal Recommendations</h1>
          <p className="section-subtitle">
            Configure your target goal, experience level, and dietary framework to dynamically generate a recommended multi-brand marketplace stack and blueprint.
          </p>

          {/* Medical Safety Disclaimer Banner */}
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginTop: '1.25rem', color: '#FCA5A5', fontSize: '0.85rem', lineHeight: '1.5', textAlign: 'left' }}>
            <strong style={{ color: '#EF4444' }}>Safety Disclaimer:</strong> These recommendations are for informational purposes only and are not medical advice, diagnosis or treatment. Please consult a qualified healthcare professional for medical or supplement-related concerns.
          </div>
        </div>

        {/* User Profile Sync Indicator */}
        {userProfile && (
          <div style={{ background: 'rgba(0, 245, 155, 0.08)', border: '1px solid var(--accent-mint)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', color: '#fff' }}>
              ✓ Synced with saved profile for <strong>{userProfile.name || currentUser?.name || 'Athlete'}</strong> ({userProfile.fitness_goal || 'Muscle Gain'} • {userProfile.dietary_preference || 'Standard'})
            </span>
            <Link to="/profile" style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: 700, textDecoration: 'underline' }}>
              Edit Saved Profile
            </Link>
          </div>
        )}

        {/* STEP 1: SELECT GOAL */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: '#fff' }}>
            Step 1: Select Your Primary Physical Ambition
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Clicking a goal dynamically updates recommended products, macro targets, and training protocols.
          </p>
        </div>

        <div className="goals-select-grid">
          {goalList.map((g) => (
            <div
              key={g.id}
              className={`goal-pick-card ${selectedGoal === g.id ? 'selected' : ''}`}
              onClick={() => setSelectedGoal(g.id)}
            >
              <div className="goal-icon-badge">
                <Target size={22} color={g.iconColor} />
              </div>
              <span className="badge badge-neutral" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem', fontSize: '0.72rem' }}>
                {g.badge}
              </span>
              <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>{g.title}</h4>
            </div>
          ))}
        </div>

        {/* STEP 2: EXPERIENCE & DIET PREFERENCES */}
        <div className="rec-filters-box" style={{ marginTop: '2rem' }}>
          <div className="rec-filter-group">
            <h5>Step 2A: Experience Level</h5>
            <div className="rec-chips">
              {experienceLevels.map((lvl) => (
                <button
                  key={lvl}
                  className={`rec-chip ${selectedLevel === lvl ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="rec-filter-group">
            <h5>Step 2B: Dietary Framework</h5>
            <div className="rec-chips">
              {dietaryList.map((diet) => (
                <button
                  key={diet}
                  className={`rec-chip ${selectedDiet === diet ? 'active' : ''}`}
                  onClick={() => setSelectedDiet(diet)}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STEP 3: DYNAMIC RECOMMENDED STACK */}
        <div className="stack-showcase-box" style={{ marginTop: '2.5rem' }}>
          <div className="stack-header">
            <div>
              <span className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>
                Dynamic Recommendation Engine Output
              </span>
              <h2 style={{ fontSize: '1.9rem', color: '#fff', marginBottom: '0.35rem' }}>
                Recommended Stack for {selectedGoal}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Matched for {selectedLevel} Level • {selectedDiet} Framework
              </p>
            </div>

            <span className="badge badge-coral" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              Bundle Savings Applied
            </span>
          </div>

          {/* Products in this dynamic stack */}
          <div className="stack-products-grid">
            {recommendedProducts.map(({ product, reason }) => (
              <div key={product.id} className="stack-product-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '100%', height: '140px', background: product.imageBg || 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0.5rem' }}>
                    {(product.images?.[0]?.url || product.image) ? (
                      <img
                        src={product.images?.[0]?.url || product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <Zap size={36} color={product.iconColor || '#00F59B'} />
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-mint)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {product.brand}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', margin: '0.35rem 0', color: '#fff' }}>
                    {product.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                    <Star size={13} fill="var(--accent-amber)" color="var(--accent-amber)" />
                    <span style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 700 }}>{product.rating}</span>
                  </div>

                  {/* Explicit Recommendation Reason */}
                  <div style={{ padding: '0.5rem 0.65rem', background: 'rgba(0, 245, 155, 0.08)', border: '1px solid rgba(0, 245, 155, 0.25)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--accent-mint)', marginBottom: '1rem', lineHeight: '1.4' }}>
                    <strong>Reason:</strong> {reason}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.15rem', fontFamily: 'var(--font-heading)' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => navigate(`/marketplace/${product.id}`)}
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => addToCart(product, 1)}
                    >
                      <ShoppingBag size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stack Total Bar */}
          <div className="stack-total-bar">
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Complete Stack Total ({recommendedProducts.length} Items):</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-heading)' }}>
                  ₹{stackTotalPrice.toLocaleString('en-IN')}
                </span>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>
                  ₹{stackOriginalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" onClick={handleAddFullStack}>
              <ShoppingBag size={18} />
              <span>Add Full Stack to Cart (Instant Discount)</span>
            </button>
          </div>

          {/* Dynamic Training & Macro Strategy */}
          <div className="protocol-grid">
            <div className="protocol-card">
              <h4>
                <Dumbbell size={18} color="var(--accent-primary)" />
                <span>Synchronized Training Protocol</span>
              </h4>
              <ul className="feature-list" style={{ margin: 0 }}>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Frequency:</strong> {dynamicWorkoutProtocol.frequency}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Focus:</strong> {dynamicWorkoutProtocol.focus}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Loading:</strong> {dynamicWorkoutProtocol.repRange}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Recovery:</strong> {dynamicWorkoutProtocol.recoveryWindow}</span>
                </li>
              </ul>
            </div>

            <div className="protocol-card">
              <h4>
                <Apple size={18} color="var(--accent-cyan)" />
                <span>Macro & Nutrition Strategy</span>
              </h4>
              <ul className="feature-list" style={{ margin: 0 }}>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span><strong>Protein Target:</strong> {dynamicMacroStrategy.proteinMultiplier}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span><strong>Caloric Target:</strong> {dynamicMacroStrategy.caloricSurplus}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span><strong>Hydration:</strong> {dynamicMacroStrategy.hydrationGoal}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span><strong>Diet Preference:</strong> {dynamicMacroStrategy.dietNote}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
