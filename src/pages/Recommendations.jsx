import React, { useState } from 'react';
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
  Activity
} from 'lucide-react';
import {
  GOAL_OPTIONS,
  EXPERIENCE_LEVELS,
  DIETARY_PREFERENCES,
  GOAL_RECOMMENDATIONS_DATA
} from '../data/mockGoals';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import '../styles/recommendations.css';

export const Recommendations = () => {
  const [selectedGoal, setSelectedGoal] = useState('muscle');
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [selectedDiet, setSelectedDiet] = useState('standard');
  const { addToCart, showToast } = useCart();

  const currentRecommendation = GOAL_RECOMMENDATIONS_DATA[selectedGoal] || GOAL_RECOMMENDATIONS_DATA.muscle;

  const handleAddBundleToCart = () => {
    // Add all products in the recommended bundle to cart
    currentRecommendation.products.forEach((recItem) => {
      const fullProduct = MOCK_PRODUCTS.find((p) => p.id === recItem.id) || {
        id: recItem.id,
        name: recItem.name,
        brand: recItem.brand,
        price: recItem.price,
        imageBg: 'linear-gradient(135deg, #1E293B, #0F172A)',
        iconColor: '#00F59B'
      };
      addToCart(fullProduct);
    });
    showToast(`Added full ${currentRecommendation.title} bundle to cart with discount!`);
  };

  return (
    <div className="rec-container">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="badge badge-mint">
            <Sparkles size={13} /> Algorithmic Synergy Engine
          </span>
          <h1 className="section-title">Personalized Goal Recommendations</h1>
          <p className="section-subtitle">
            Configure your target physical objective, experience level, and nutrition preferences to receive a tailored multi-brand stack and workout blueprint.
          </p>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="wizard-steps-indicator">
          <div className="wizard-step active">
            <div className="step-num">1</div>
            <span>Target Goal</span>
          </div>
          <div className="wizard-step active">
            <div className="step-num">2</div>
            <span>Experience & Diet</span>
          </div>
          <div className="wizard-step active">
            <div className="step-num">3</div>
            <span>Recommended Blueprint</span>
          </div>
        </div>

        {/* STEP 1: SELECT GOAL */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
            Step 1: Select Your Primary Ambition
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Choose the outcome you are prioritizing for the upcoming 12-week cycle.
          </p>
        </div>

        <div className="goals-select-grid">
          {GOAL_OPTIONS.map((goal) => (
            <div
              key={goal.id}
              className={`goal-pick-card ${selectedGoal === goal.id ? 'selected' : ''}`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <div className="goal-icon-badge">
                <Target size={22} color={goal.iconColor} />
              </div>
              <span className="badge badge-neutral" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem', fontSize: '0.72rem' }}>
                {goal.badge}
              </span>
              <h4>{goal.title}</h4>
              <p>{goal.subtitle}</p>
            </div>
          ))}
        </div>

        {/* STEP 2: EXPERIENCE & DIET PREFERENCES */}
        <div className="rec-filters-box">
          <div className="rec-filter-group">
            <h5>Step 2A: Athletic Training Experience</h5>
            <div className="rec-chips">
              {EXPERIENCE_LEVELS.map((lvl) => (
                <button
                  key={lvl.id}
                  className={`rec-chip ${selectedLevel === lvl.id ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(lvl.id)}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rec-filter-group">
            <h5>Step 2B: Dietary Framework</h5>
            <div className="rec-chips">
              {DIETARY_PREFERENCES.map((diet) => (
                <button
                  key={diet.id}
                  className={`rec-chip ${selectedDiet === diet.id ? 'active' : ''}`}
                  onClick={() => setSelectedDiet(diet.id)}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STEP 3: DYNAMIC RECOMMENDED STACK */}
        <div className="stack-showcase-box">
          <div className="stack-header">
            <div>
              <span className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>
                Recommended Synergy Stack
              </span>
              <h2 style={{ fontSize: '1.9rem', color: '#fff', marginBottom: '0.35rem' }}>
                {currentRecommendation.title}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                {currentRecommendation.headline}
              </p>
            </div>

            <span className="badge badge-coral" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              {currentRecommendation.bundleDiscount}
            </span>
          </div>

          {/* Products in this stack */}
          <div className="stack-products-grid">
            {currentRecommendation.products.map((item, idx) => (
              <div key={idx} className="stack-product-card">
                <span className="stack-product-role">{item.role}</span>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.brand}</div>
                <h4 style={{ fontSize: '1.05rem', margin: '0.35rem 0 0.75rem', color: '#fff' }}>
                  {item.name}
                </h4>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '1.1rem' }}>
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                    Included in Stack
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stack Pricing & One-Click Add */}
          <div className="stack-total-bar">
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Complete Stack Bundle Total:</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                  ${currentRecommendation.totalPrice.toFixed(2)}
                </span>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>
                  ${currentRecommendation.originalTotalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" onClick={handleAddBundleToCart}>
              <ShoppingBag size={18} />
              <span>Add Full Stack to Cart (Instant Discount)</span>
            </button>
          </div>

          {/* Complementary Training & Nutrition Protocol */}
          <div className="protocol-grid">
            <div className="protocol-card">
              <h4>
                <Dumbbell size={18} color="var(--accent-primary)" />
                <span>Synchronized Training Protocol</span>
              </h4>
              <ul className="feature-list" style={{ margin: 0 }}>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Frequency:</strong> {currentRecommendation.workoutProtocol.frequency}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Focus:</strong> {currentRecommendation.workoutProtocol.focus}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Loading:</strong> {currentRecommendation.workoutProtocol.repRange}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span><strong>Recovery:</strong> {currentRecommendation.workoutProtocol.recoveryWindow}</span>
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
                  <span><strong>Protein:</strong> {currentRecommendation.nutritionTarget.proteinMultiplier}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span><strong>Caloric Target:</strong> {currentRecommendation.nutritionTarget.caloricSurplus}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span><strong>Hydration:</strong> {currentRecommendation.nutritionTarget.hydrationGoal}</span>
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                  <span><strong>Diet Preference:</strong> Optimized for {selectedDiet} framework</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
