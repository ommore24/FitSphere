import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import {
  MOCK_JOURNEY_STATS,
  MOCK_TODAYS_MEALS,
  MOCK_WORKOUT_SPLIT,
  MOCK_FITNESS_PLANS,
  MOCK_PROGRESS_RECORDS
} from '../data/mockJourney';
import { MOCK_COACHES } from '../data/mockCoaches';
import { CoachApplyModal } from '../components/common/CoachApplyModal';
import '../styles/journey.css';

export const FitnessJourney = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' or specific module
  const [coachModalOpen, setCoachModalOpen] = useState(false);

  const tabs = [
    { id: 'all', label: 'Complete Overview', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: Flame },
    { id: 'goal', label: 'My Goal & Progress', icon: Target },
    { id: 'nutrition', label: 'Nutrition Tracking', icon: Apple },
    { id: 'exercise', label: 'Exercise & Splits', icon: Dumbbell },
    { id: 'plans', label: 'Fitness Plans', icon: BookOpen },
    { id: 'coaches', label: 'Consult a Coach', icon: UserCheck },
    { id: 'membership', label: 'Premium Membership', icon: Crown },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp }
  ];

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
                19-Day Consistency Streak
              </span>
            </div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              FitSphere Fitness Journey
            </h1>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
              Your unified health command center. Track daily macros, follow progressive splits, and crush physical milestones.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline-mint" onClick={() => setCoachModalOpen(true)}>
              <Award size={16} />
              <span>Become a Coach</span>
            </button>
          </div>
        </div>

        {/* 9-Module Navigation Tabs Bar */}
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
            MODULE 1: FITNESS DASHBOARD STAT WIDGETS
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'dashboard') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Flame size={20} color="var(--accent-secondary)" />
                <span>1. Fitness Dashboard</span>
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Updated Today, 04:30 PM</span>
            </div>

            <div className="journey-stat-grid">
              {/* Daily Streak */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(255, 107, 53, 0.15)', color: 'var(--accent-secondary)' }}>
                  <Flame size={24} />
                </div>
                <div>
                  <h3>{MOCK_JOURNEY_STATS.streakDays} Days</h3>
                  <p>Habit Streak</p>
                </div>
              </div>

              {/* Calories Target */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(0, 245, 155, 0.15)', color: 'var(--accent-primary)' }}>
                  <Activity size={24} />
                </div>
                <div>
                  <h3>{MOCK_JOURNEY_STATS.caloriesConsumed} / {MOCK_JOURNEY_STATS.caloriesTarget}</h3>
                  <p>Calories Intake</p>
                </div>
              </div>

              {/* Water Intake */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(0, 229, 255, 0.15)', color: 'var(--accent-cyan)' }}>
                  <Apple size={24} />
                </div>
                <div>
                  <h3>{MOCK_JOURNEY_STATS.waterCurrentLiters}L / {MOCK_JOURNEY_STATS.waterTargetLiters}L</h3>
                  <p>Hydration Target</p>
                </div>
              </div>

              {/* Sleep Score */}
              <div className="journey-stat-card">
                <div className="stat-card-icon" style={{ background: 'rgba(251, 191, 36, 0.15)', color: 'var(--accent-amber)' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h3>{MOCK_JOURNEY_STATS.sleepHours} hrs</h3>
                  <p>{MOCK_JOURNEY_STATS.sleepQuality}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 2 & 3: MY GOAL & GOAL PROGRESS
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'goal') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Target size={20} color="var(--accent-primary)" />
                <span>2 & 3. My Goal & Goal Progress</span>
              </h2>
              <span className="badge badge-mint">Phase 2: Hypertrophy</span>
            </div>

            <div className="goal-overview-card">
              <div>
                <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Current Objective</span>
                <h3 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>{MOCK_JOURNEY_STATS.activeGoal}</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Targeting lean bodyweight progression from {MOCK_JOURNEY_STATS.startWeightKg}kg to {MOCK_JOURNEY_STATS.targetWeightKg}kg with consistent 250 kcal clean surplus and high-density resistance training.
                </p>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Current Weight</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{MOCK_JOURNEY_STATS.currentWeightKg} kg</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Target Weight</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{MOCK_JOURNEY_STATS.targetWeightKg} kg</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Weekly Consistency</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{MOCK_JOURNEY_STATS.weeklyConsistency}</div>
                  </div>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="progress-ring-container">
                <div className="progress-circle-box">
                  <span className="progress-circle-label">{MOCK_JOURNEY_STATS.overallGoalProgress}%</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                    Milestone Progress
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    3.6 kg gained of 8.0 kg target. Projected finish in 6 weeks.
                  </div>
                </div>
              </div>
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
                <Apple size={20} color="var(--accent-cyan)" />
                <span>4. Nutrition Tracking & Macros</span>
              </h2>
              <span className="badge badge-cyan">Real-time Caloric Balance</span>
            </div>

            <div className="nutrition-grid">
              {/* Macro Bars */}
              <div className="glass-card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Macro Targets Today</h3>
                <p style={{ fontSize: '0.85rem' }}>
                  Calibrated to your lean muscle building surplus target.
                </p>

                <div className="macro-bar-group">
                  {/* Protein */}
                  <div className="macro-row">
                    <div className="macro-info">
                      <span style={{ color: 'var(--accent-primary)' }}>Protein</span>
                      <span>{MOCK_JOURNEY_STATS.macroTargets.protein.current}g / {MOCK_JOURNEY_STATS.macroTargets.protein.target}g</span>
                    </div>
                    <div className="macro-track">
                      <div
                        className="macro-fill"
                        style={{
                          width: `${(MOCK_JOURNEY_STATS.macroTargets.protein.current / MOCK_JOURNEY_STATS.macroTargets.protein.target) * 100}%`,
                          background: 'var(--accent-primary)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Carbohydrates */}
                  <div className="macro-row">
                    <div className="macro-info">
                      <span style={{ color: 'var(--accent-cyan)' }}>Carbohydrates</span>
                      <span>{MOCK_JOURNEY_STATS.macroTargets.carbs.current}g / {MOCK_JOURNEY_STATS.macroTargets.carbs.target}g</span>
                    </div>
                    <div className="macro-track">
                      <div
                        className="macro-fill"
                        style={{
                          width: `${(MOCK_JOURNEY_STATS.macroTargets.carbs.current / MOCK_JOURNEY_STATS.macroTargets.carbs.target) * 100}%`,
                          background: 'var(--accent-cyan)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Fats */}
                  <div className="macro-row">
                    <div className="macro-info">
                      <span style={{ color: 'var(--accent-secondary)' }}>Fats</span>
                      <span>{MOCK_JOURNEY_STATS.macroTargets.fats.current}g / {MOCK_JOURNEY_STATS.macroTargets.fats.target}g</span>
                    </div>
                    <div className="macro-track">
                      <div
                        className="macro-fill"
                        style={{
                          width: `${(MOCK_JOURNEY_STATS.macroTargets.fats.current / MOCK_JOURNEY_STATS.macroTargets.fats.target) * 100}%`,
                          background: 'var(--accent-secondary)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Log Food Intake</span>
                  <button className="btn btn-sm btn-outline-mint">
                    <Plus size={14} />
                    <span>Quick Meal Log (Part 1 Preview)</span>
                  </button>
                </div>
              </div>

              {/* Logged Meals List */}
              <div className="glass-card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Meals Logged Today</h3>
                <div className="meals-list" style={{ marginTop: '1rem' }}>
                  {MOCK_TODAYS_MEALS.map((meal) => (
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
            MODULE 5: EXERCISE PLANS (Weekly Split)
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'exercise') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Dumbbell size={20} color="var(--accent-primary)" />
                <span>5. Exercise Plans & Weekly Split</span>
              </h2>
              <span className="badge badge-mint">4-Day Periodized Architecture</span>
            </div>

            <div className="workout-split-grid">
              {MOCK_WORKOUT_SPLIT.map((split, idx) => (
                <div key={idx} className="workout-card">
                  <div className="workout-card-header">
                    <div>
                      <span className="badge badge-neutral" style={{ marginBottom: '0.35rem' }}>
                        {split.day}
                      </span>
                      <h4 className="workout-title">{split.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {split.duration} • {split.intensity} Intensity
                      </span>
                    </div>
                    <span className={`badge ${split.status === 'Completed' ? 'badge-mint' : split.status === 'Scheduled Today' ? 'badge-coral' : 'badge-neutral'}`}>
                      {split.status}
                    </span>
                  </div>

                  <table className="exercise-table">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {split.exercises.map((ex, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600, color: '#fff' }}>{ex.name}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{ex.sets}</td>
                          <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{ex.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 6: FITNESS PLANS (Curated Programs)
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'plans') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <BookOpen size={20} color="var(--accent-cyan)" />
                <span>6. Master Fitness Plans</span>
              </h2>
              <span className="badge badge-neutral">Guided Transformation Paths</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
              {MOCK_FITNESS_PLANS.map((plan) => (
                <div key={plan.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="badge badge-cyan">{plan.category}</span>
                      {plan.isPro && <span className="badge badge-coral">Pro Plan</span>}
                    </div>
                    <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0' }}>{plan.name}</h3>
                    <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                      Split Structure: <strong>{plan.split}</strong>
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <span>Duration: {plan.duration}</span>
                      <span>Level: {plan.level}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {plan.enrolledCount.toLocaleString()} Athletes Active
                    </span>
                    <button className="btn btn-sm btn-primary">
                      <span>View Protocol</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 7: CONSULT A COACH
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'coaches') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <UserCheck size={20} color="var(--accent-secondary)" />
                <span>7. Consult a Verified Coach</span>
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

                  <p className="coach-bio">{coach.bio}</p>

                  <div className="coach-footer">
                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>
                        {coach.sessionRate}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>1-on-1 Consultation</span>
                    </div>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => alert(`Part 1 Preview: Booking module for ${coach.name} will be active in Part 2.`)}
                    >
                      <span>Book Session</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 8: PREMIUM MEMBERSHIP
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'membership') && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Crown size={20} color="var(--accent-amber)" />
                <span>8. Premium Membership (FitSphere Pro)</span>
              </h2>
              <span className="badge badge-mint">Active Subscription</span>
            </div>

            <div className="membership-card">
              <div>
                <span className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>FitSphere Pro Tier</span>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Full Athletic Ecosystem Access</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Your subscription grants personalized weekly caloric adjustments, private video consultations, priority warehouse shipping, and full catalog member discounts.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
                  <span className="badge badge-neutral">✓ 2-Day Free Delivery</span>
                  <span className="badge badge-neutral">✓ Weekly Macro Adjuster</span>
                  <span className="badge badge-neutral">✓ All Pro Workout Plans</span>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>₹1,499<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '1rem' }}>Renews October 2026</div>
                <button className="btn btn-secondary" style={{ width: '100%' }}>Manage Pro Plan</button>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            MODULE 9: PROGRESS TRACKING & PRs
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'progress') && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TrendingUp size={20} color="var(--accent-primary)" />
                <span>9. Progress Tracking & Lifetime PRs</span>
              </h2>
              <span className="badge badge-cyan">Progressive Overload Log</span>
            </div>

            <div className="pr-grid">
              {MOCK_PROGRESS_RECORDS.map((record, index) => (
                <div key={index} className="pr-card">
                  <div className="pr-exercise">{record.exercise}</div>
                  <div className="pr-value">
                    <span>{record.current}</span>
                    <span className="pr-delta">{record.delta}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    {record.date} (Previous: {record.previous})
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Coach Application Modal */}
      <CoachApplyModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
      />
    </div>
  );
};
