import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Target,
  TrendingUp,
  Apple,
  Dumbbell,
  BookOpen,
  UserCheck,
  Crown,
  Activity,
  Calendar,
  CheckCircle,
  Plus,
  ArrowRight,
  ShieldAlert,
  Clock,
  Award,
  Filter,
  Check,
  DollarSign,
  Droplet,
  Lock
} from 'lucide-react';
import {
  MOCK_JOURNEY_STATS,
  MOCK_TODAYS_MEALS,
  GOAL_PLANS_DATABASE,
  EXERCISE_LIBRARY_DATABASE,
  MOCK_FITNESS_PLANS,
  MOCK_PROGRESS_RECORDS
} from '../data/mockJourney';
import { MOCK_COACHES } from '../data/mockCoaches';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CoachApplyModal } from '../components/common/CoachApplyModal';
import { DummyPaymentModal } from '../components/common/DummyPaymentModal';
import '../styles/journey.css';

export const FitnessJourney = () => {
  const { currentUser, userProfile, isAuthenticated, loading } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState('all');
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // 1. Goal Selection State
  const initialGoal = userProfile?.fitness_goal || 'Muscle Gain';
  const [selectedGoal, setSelectedGoal] = useState(initialGoal);

  // Sync selectedGoal if userProfile changes
  useEffect(() => {
    if (userProfile?.fitness_goal) {
      setSelectedGoal(userProfile.fitness_goal);
    }
  }, [userProfile?.fitness_goal]);

  // 2. Interactive Nutrition Tracking State
  const [meals, setMeals] = useState(MOCK_TODAYS_MEALS);
  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [newMeal, setNewMeal] = useState({
    title: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    type: 'Breakfast'
  });

  // 3. Interactive Water Tracker State
  const initialWater = userProfile?.daily_water_intake ? Number(userProfile.daily_water_intake) : 2.2;
  const [waterLiters, setWaterLiters] = useState(initialWater);

  // 4. Interactive Exercise Library Category Filter
  const [selectedExCategory, setSelectedExCategory] = useState('All');

  // 5. Interactive Plan Purchase Calculator State
  const [planAddons, setPlanAddons] = useState({
    nutritionAddon: false,
    coachConsultation: false,
    advancedPersonalized: false
  });
  const [planPurchasedModal, setPlanPurchasedModal] = useState(false);

  // 6. Interactive Coach Booking Modal State
  const [bookingCoach, setBookingCoach] = useState(null);
  const [bookingForm, setBookingForm] = useState({ date: '', time: '10:00 AM', notes: '' });

  // Calculations for Nutrition
  const totalCaloriesLogged = meals.reduce((sum, m) => sum + Number(m.calories || 0), 0);
  const totalProteinLogged = meals.reduce((sum, m) => sum + Number(parseInt(m.protein || 0)), 0);
  const totalCarbsLogged = meals.reduce((sum, m) => sum + Number(parseInt(m.carbs || 0)), 0);
  const totalFatLogged = meals.reduce((sum, m) => sum + Number(parseInt(m.fat || 0)), 0);

  // Dynamic user data
  const athleteName = userProfile?.name || currentUser?.name || 'Athlete';
  const currentWeight = userProfile?.weight ? Number(userProfile.weight) : MOCK_JOURNEY_STATS.currentWeightKg;
  const targetWeight = userProfile?.target_weight ? Number(userProfile.target_weight) : MOCK_JOURNEY_STATS.targetWeightKg;

  // Active Goal Plan
  const activePlanData = GOAL_PLANS_DATABASE[selectedGoal] || GOAL_PLANS_DATABASE['Muscle Gain'];

  // Add Meal Handler
  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!newMeal.title || !newMeal.calories) {
      showToast('Please enter meal title and calories.', 'warning');
      return;
    }

    const mealItem = {
      id: 'm-' + Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: newMeal.title,
      calories: Number(newMeal.calories),
      protein: `${newMeal.protein || 0}g`,
      carbs: `${newMeal.carbs || 0}g`,
      fat: `${newMeal.fat || 0}g`,
      type: newMeal.type
    };

    setMeals([mealItem, ...meals]);
    setNewMeal({ title: '', calories: '', protein: '', carbs: '', fat: '', type: 'Breakfast' });
    setShowAddMealForm(false);
    showToast(`Logged "${mealItem.title}" (${mealItem.calories} kcal) to daily nutrition!`, 'success');
  };

  // Water Increment
  const handleAddWater = (amount) => {
    setWaterLiters(prev => Math.round((prev + amount) * 10) / 10);
    showToast(`Added +${amount}L water intake! Total: ${Math.round((waterLiters + amount) * 10) / 10}L`, 'info');
  };

  // Exercise Library Filtering
  const filteredExercises = selectedExCategory === 'All'
    ? EXERCISE_LIBRARY_DATABASE
    : EXERCISE_LIBRARY_DATABASE.filter(ex => ex.category.toLowerCase() === selectedExCategory.toLowerCase());

  // Plan Price Calculation
  const basePlanPrice = 100; // INR
  const nutritionPrice = planAddons.nutritionAddon ? 49 : 0;
  const coachPrice = planAddons.coachConsultation ? 199 : 0;
  const advPrice = planAddons.advancedPersonalized ? 299 : 0;
  const totalPlanPrice = basePlanPrice + nutritionPrice + coachPrice + advPrice;

  // Coach Booking Submission
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    showToast(`Consultation booked with ${bookingCoach.name} for ${bookingForm.date} at ${bookingForm.time}!`, 'success');
    setBookingCoach(null);
  };

  const tabs = [
    { id: 'all', label: 'Complete Overview', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: Flame },
    { id: 'goal', label: 'My Goal & Plans', icon: Target },
    { id: 'library', label: 'Exercise Library', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition Tracking', icon: Apple },
    { id: 'coaches', label: 'Verified Coaches', icon: UserCheck },
    { id: 'purchase', label: 'Fitness Plan Purchase', icon: BookOpen },
    { id: 'membership', label: 'Premium Membership', icon: Crown }
  ];

  const goalOptionsList = [
    'Fat Loss',
    'Weight Gain',
    'Muscle Gain',
    'Strength',
    'Endurance',
    'General Fitness',
    'Body Recomposition',
    'Posture & Mobility'
  ];

  const exerciseCategories = [
    'All',
    'Fat Loss',
    'Weight Gain',
    'Muscle Building',
    'Strength',
    'Cardio',
    'Flexibility',
    'Home Workouts',
    'No Equipment',
    'Posture & Mobility'
  ];

  // If session state is loading
  if (loading) {
    return (
      <div className="section" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-mint)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading athlete profile and fitness data...</p>
        </div>
      </div>
    );
  }

  // Authentication Required Gate - Fitness Journey accessible only to logged-in users
  if (!isAuthenticated && !currentUser) {
    return (
      <div className="section" style={{ paddingTop: '4rem', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', border: '1px solid rgba(0, 245, 155, 0.25)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(0, 245, 155, 0.12)',
                color: 'var(--accent-mint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: '1px solid rgba(0, 245, 155, 0.3)'
              }}
            >
              <Lock size={36} />
            </div>

            <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Login Required</span>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Sign In to Access Your Fitness Journey</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Your training splits, personalized nutrition goals, hydration tracker, exercise library, and verified coach consultations are reserved for logged-in athletes. Please sign in or create an account to enter your training hub.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary btn-lg">
                <span>Sign In to FitSphere</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                <span>Create New Account</span>
              </Link>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <Link to="/marketplace" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
                ← Return to Public Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="journey-container">
      <div className="container">
        {/* Journey Header */}
        <div className="journey-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <span className="badge badge-coral">
                <Flame size={13} /> Active Athlete Hub
              </span>
              <span className="badge badge-mint">
                Welcome, {athleteName}
              </span>
            </div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              FitSphere Fitness Journey
            </h1>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
              Interactive health & training command center. Select goals, log nutrition, explore exercises, and consult certified coaches.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline-mint" onClick={() => setCoachModalOpen(true)}>
              <Award size={16} />
              <span>Become a Coach</span>
            </button>
          </div>
        </div>

        {/* Module Navigation Tabs */}
        <div className="journey-tabs-bar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`journey-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            MODULE 1: FITNESS DASHBOARD
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'dashboard') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Flame size={20} color="var(--accent-secondary)" />
                <span>1. Fitness Dashboard</span>
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-mint)', fontWeight: 600 }}>Active Goal: {selectedGoal}</span>
            </div>

            <div className="journey-stat-grid">
              {/* Daily Streak */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(255, 107, 53, 0.15)', color: 'var(--accent-secondary)' }}>
                  <Flame size={24} />
                </div>
                <div>
                  <h3>19 Days</h3>
                  <p>Consistency Streak</p>
                </div>
              </div>

              {/* Calories Target */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(0, 245, 155, 0.15)', color: 'var(--accent-primary)' }}>
                  <Activity size={24} />
                </div>
                <div>
                  <h3>{totalCaloriesLogged} / 2,500 kcal</h3>
                  <p>Calories Logged Today</p>
                </div>
              </div>

              {/* Water Intake */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(0, 229, 255, 0.15)', color: 'var(--accent-cyan)' }}>
                  <Droplet size={24} />
                </div>
                <div>
                  <h3>{waterLiters}L / 3.5L</h3>
                  <p>Daily Hydration</p>
                </div>
              </div>

              {/* Weight Status */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(251, 191, 36, 0.15)', color: 'var(--accent-amber)' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3>{currentWeight} kg → {targetWeight} kg</h3>
                  <p>Current vs Target Weight</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 2: GOAL PLANS & SELECTION
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'goal') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Target size={20} color="var(--accent-primary)" />
                <span>2. Goal Selection & Predefined Training Plans</span>
              </h2>
              <span className="badge badge-mint">Interactive Goal Switcher</span>
            </div>

            {/* Goal Pills Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              {goalOptionsList.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGoal(g)}
                  className={`category-pill ${selectedGoal === g ? 'active' : ''}`}
                  style={{ fontSize: '0.88rem', padding: '0.5rem 1.1rem' }}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Selected Goal Plan Card */}
            <div className="goal-overview-card">
              <div style={{ flex: 1 }}>
                <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Active Protocol: {selectedGoal}</span>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.4rem', color: '#fff' }}>{activePlanData.title}</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  {activePlanData.subtitle}
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Duration</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{activePlanData.duration}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Difficulty</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{activePlanData.difficulty}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Est. Burn</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{activePlanData.estCaloriesBurned}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Rest Period</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{activePlanData.restTime}</div>
                  </div>
                </div>

                <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-mint)', fontSize: '0.85rem' }}>
                  <strong>Weekly Architecture:</strong> {activePlanData.weeklySchedule}
                </div>
              </div>
            </div>

            {/* Prescribed Exercises Table for Selected Goal */}
            <div className="glass-card" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Prescribed Exercises for {selectedGoal}</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="exercise-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Exercise Name</th>
                      <th>Sets</th>
                      <th>Repetitions</th>
                      <th>Target Duration</th>
                      <th>Difficulty</th>
                      <th>Est. Burn</th>
                      <th>Rest Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePlanData.exercises.map((ex, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700, color: '#fff' }}>{ex.exercise}</td>
                        <td>{ex.sets}</td>
                        <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{ex.reps}</td>
                        <td>{ex.duration}</td>
                        <td><span className="badge badge-neutral">{ex.difficulty}</span></td>
                        <td style={{ color: 'var(--accent-cyan)' }}>{ex.calories} kcal</td>
                        <td>{ex.rest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 3: EXERCISE LIBRARY
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'library') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Dumbbell size={20} color="var(--accent-cyan)" />
                <span>3. Exercise Library</span>
              </h2>
              <span className="badge badge-neutral">Showing {filteredExercises.length} Movements</span>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              {exerciseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedExCategory(cat)}
                  className={`category-pill ${selectedExCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Exercise Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
              {filteredExercises.map((ex) => (
                <div key={ex.id} className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="badge badge-cyan">{ex.category}</span>
                      <span className="badge badge-neutral">{ex.difficulty}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: '0.4rem 0' }}>{ex.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: 600, marginBottom: '0.6rem' }}>
                      Target: {ex.targetArea} • {ex.reps}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '0.85rem' }}>
                      {ex.instructions}
                    </p>
                  </div>

                  <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--accent-coral)' }}>Safety Note:</strong> {ex.safetyNote}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 4: NUTRITION TRACKING
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'nutrition') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Apple size={20} color="var(--accent-mint)" />
                <span>4. Interactive Nutrition & Water Tracking</span>
              </h2>
              <button className="btn btn-sm btn-primary" onClick={() => setShowAddMealForm(!showAddMealForm)}>
                <Plus size={15} />
                <span>{showAddMealForm ? 'Cancel' : 'Log Food Intake'}</span>
              </button>
            </div>

            {/* Meal Logging Form */}
            {showAddMealForm && (
              <form onSubmit={handleAddMeal} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem', border: '1px solid var(--accent-mint)' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-mint)' }}>Log a New Meal Entry</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Meal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Scrambled Eggs & Toast"
                      value={newMeal.title}
                      onChange={(e) => setNewMeal({ ...newMeal, title: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Meal Type</label>
                    <select
                      value={newMeal.type}
                      onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: '#111827', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Calories (kcal) *</label>
                    <input
                      type="number"
                      required
                      placeholder="450"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Protein (g)</label>
                    <input
                      type="number"
                      placeholder="35"
                      value={newMeal.protein}
                      onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Carbs (g)</label>
                    <input
                      type="number"
                      placeholder="45"
                      value={newMeal.carbs}
                      onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Fats (g)</label>
                    <input
                      type="number"
                      placeholder="12"
                      value={newMeal.fat}
                      onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-sm btn-primary">
                  <span>Save Logged Meal</span>
                </button>
              </form>
            )}

            <div className="nutrition-grid">
              {/* Macro Bars */}
              <div className="glass-card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Macro Totals Logged Today</h3>

                <div className="macro-bar-group" style={{ marginTop: '1rem' }}>
                  {/* Protein */}
                  <div className="macro-row">
                    <div className="macro-info">
                      <span style={{ color: 'var(--accent-primary)' }}>Protein</span>
                      <span>{totalProteinLogged}g / 165g</span>
                    </div>
                    <div className="macro-track">
                      <div className="macro-fill" style={{ width: `${Math.min(100, (totalProteinLogged / 165) * 100)}%`, background: 'var(--accent-primary)' }} />
                    </div>
                  </div>

                  {/* Carbohydrates */}
                  <div className="macro-row">
                    <div className="macro-info">
                      <span style={{ color: 'var(--accent-cyan)' }}>Carbohydrates</span>
                      <span>{totalCarbsLogged}g / 240g</span>
                    </div>
                    <div className="macro-track">
                      <div className="macro-fill" style={{ width: `${Math.min(100, (totalCarbsLogged / 240) * 100)}%`, background: 'var(--accent-cyan)' }} />
                    </div>
                  </div>

                  {/* Fats */}
                  <div className="macro-row">
                    <div className="macro-info">
                      <span style={{ color: 'var(--accent-secondary)' }}>Fats</span>
                      <span>{totalFatLogged}g / 60g</span>
                    </div>
                    <div className="macro-track">
                      <div className="macro-fill" style={{ width: `${Math.min(100, (totalFatLogged / 60) * 100)}%`, background: 'var(--accent-secondary)' }} />
                    </div>
                  </div>
                </div>

                {/* Water Control */}
                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Droplet size={16} color="var(--accent-cyan)" /> Hydration Tracker ({waterLiters}L / 3.5L)
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-sm btn-outline-mint" onClick={() => handleAddWater(0.25)}>+0.25 L Glass</button>
                    <button className="btn btn-sm btn-outline-mint" onClick={() => handleAddWater(0.5)}>+0.5 L Bottle</button>
                    <button className="btn btn-sm btn-outline" onClick={() => setWaterLiters(0.0)}>Reset</button>
                  </div>
                </div>
              </div>

              {/* Logged Meals List */}
              <div className="glass-card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Today's Food Entries</h3>
                <div className="meals-list" style={{ marginTop: '1rem' }}>
                  {meals.map((meal) => (
                    <div key={meal.id} className="meal-item">
                      <div>
                        <div className="meal-title">{meal.title}</div>
                        <div className="meal-meta">
                          {meal.time} • {meal.type} • {meal.protein} Protein
                        </div>
                      </div>
                      <div className="meal-macros">
                        <div className="meal-calories">{meal.calories} kcal</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          C: {meal.carbs} | F: {meal.fat}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 5: VERIFIED COACHES
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'coaches') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <UserCheck size={20} color="var(--accent-secondary)" />
                <span>5. Consult a Certified Coach</span>
              </h2>
              <button className="btn btn-sm btn-outline-mint" onClick={() => setCoachModalOpen(true)}>
                <span>Apply as Coach</span>
              </button>
            </div>

            <div className="coaches-grid">
              {MOCK_COACHES.map((coach) => (
                <div key={coach.id} className="coach-card">
                  <div className="coach-header">
                    <div className="coach-avatar" style={{ background: coach.avatarBg }}>
                      {coach.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h4>{coach.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{coach.title}</span>
                    </div>
                  </div>

                  <p className="coach-bio">{coach.bio}</p>

                  <div className="coach-footer">
                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>
                        {coach.sessionRate}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>1-on-1 Session</span>
                    </div>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setBookingCoach(coach)}
                    >
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 6: FITNESS PLAN PURCHASE CALCULATOR
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'purchase') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <BookOpen size={20} color="var(--accent-amber)" />
                <span>6. Fitness Plan Purchase & Optional Add-ons</span>
              </h2>
              <span className="badge badge-mint">Dynamic Price Calculator</span>
            </div>

            <div className="glass-card" style={{ padding: '2rem', maxWidth: '750px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Select Your Fitness Protocol Package</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Get lifetime access to structured training routines with optional personalized nutrition and 1-on-1 coach sessions.
              </p>

              {/* Base Plan */}
              <div style={{ padding: '1rem', background: 'rgba(0, 245, 155, 0.08)', border: '1px solid var(--accent-mint)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>Basic Goal Training Protocol</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Includes weekly exercise splits, sets/reps, and rest guidelines.</div>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-mint)' }}>₹100</div>
              </div>

              {/* Add-ons Selector */}
              <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Optional Protocol Add-ons:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="checkbox"
                      checked={planAddons.nutritionAddon}
                      onChange={(e) => setPlanAddons({ ...planAddons, nutritionAddon: e.target.checked })}
                      style={{ accentColor: 'var(--accent-mint)', width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>Custom Macro Nutrition Add-on</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Specific meal plans aligned to your caloric target.</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>+₹49</div>
                </label>

                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="checkbox"
                      checked={planAddons.coachConsultation}
                      onChange={(e) => setPlanAddons({ ...planAddons, coachConsultation: e.target.checked })}
                      style={{ accentColor: 'var(--accent-mint)', width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>1-on-1 Certified Coach Consultation</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>30-minute private video call & form assessment.</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>+₹199</div>
                </label>

                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="checkbox"
                      checked={planAddons.advancedPersonalized}
                      onChange={(e) => setPlanAddons({ ...planAddons, advancedPersonalized: e.target.checked })}
                      style={{ accentColor: 'var(--accent-mint)', width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>Advanced Personalized Periodization Plan</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tailored to your specific gym equipment & injury history.</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>+₹299</div>
                </label>
              </div>

              {/* Total Calculation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Calculated Price:</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-heading)' }}>
                    ₹{totalPlanPrice}
                  </div>
                </div>

                <button className="btn btn-primary btn-lg" onClick={() => setIsPaymentModalOpen(true)}>
                  <span>Checkout Selected Plan</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 7: PREMIUM MEMBERSHIP LINK
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'membership') && (
          <section style={{ marginBottom: '2rem' }}>
            <div className="membership-card">
              <div>
                <span className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>FitSphere Pro Tier</span>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Full Athletic Ecosystem Access</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Unlock macro algorithms, complete workout plans, 2 free coach sessions, and free shipping across the marketplace catalog.
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>₹499<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></div>
                <Link to="/premium" className="btn btn-secondary" style={{ width: '100%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', marginTop: '1rem' }}>Manage Pro Plan</Link>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Plan Purchase Dummy Payment Modal */}
      <DummyPaymentModal
        isOpen={isPaymentModalOpen}
        amount={totalPlanPrice}
        title={`${selectedGoal} Training Protocol Purchase`}
        onPaymentSuccess={() => {
          setIsPaymentModalOpen(false);
          setPlanPurchasedModal(true);
          showToast(`🎉 Order confirmed! Access granted to ${selectedGoal} Protocol.`, 'success');
        }}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      {/* Plan Purchase Confirmation Overlay */}
      {planPurchasedModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '2rem', textAlign: 'center' }}>
            <CheckCircle size={50} color="var(--accent-mint)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Goal Training Protocol Active</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Your <strong>{selectedGoal} Protocol</strong> order of <strong style={{ color: 'var(--accent-mint)' }}>₹{totalPlanPrice}</strong> is complete. Your exercise splits and macro goals are unlocked!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => setPlanPurchasedModal(false)}>
                Go to Training Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coach Booking Modal */}
      {bookingCoach && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <form onSubmit={handleConfirmBooking} className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Book 1-on-1 Consultation</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Schedule a 30-minute private assessment with <strong>{bookingCoach.name}</strong> ({bookingCoach.title}). Session Rate: <strong>{bookingCoach.sessionRate}</strong>.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Preferred Date *</label>
              <input
                type="date"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Preferred Time Slot</label>
              <select
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', background: '#111827', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              >
                <option value="10:00 AM">10:00 AM IST</option>
                <option value="02:00 PM">02:00 PM IST</option>
                <option value="05:30 PM">05:30 PM IST</option>
                <option value="08:00 PM">08:00 PM IST</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Consultation Notes / Focus Areas</label>
              <textarea
                rows={3}
                placeholder="Describe injuries, training history, or questions for your coach..."
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline" onClick={() => setBookingCoach(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </div>
          </form>
        </div>
      )}

      {/* Coach Application Modal */}
      <CoachApplyModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
      />
    </div>
  );
};

export default FitnessJourney;
