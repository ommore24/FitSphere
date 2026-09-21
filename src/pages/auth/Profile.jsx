import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Flame,
  Target,
  Dumbbell,
  Apple,
  Clock,
  Droplets,
  Activity,
  CheckCircle2,
  AlertCircle,
  Edit3,
  LayoutDashboard,
  LogOut,
  Save,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { profileService } from '../../services/profileService';
import '../../styles/auth.css';

export const Profile = () => {
  const { currentUser, userProfile, session, isAuthenticated, loading, logout, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'edit'

  // Form State initialized with defaults or loaded profile
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    starting_weight: '',
    target_weight: '',
    fitness_goal: 'Muscle Gain',
    activity_level: 'Moderately Active',
    fitness_experience: 'Intermediate (1-3 yrs)',
    workout_frequency: '4',
    preferred_workout_type: 'Strength / Resistance',
    dietary_preference: 'Vegetarian',
    allergies_or_intolerances: '',
    food_preferences: '',
    daily_water_intake: '3.0',
    average_sleep_duration: '7.5',
    daily_activity_level: 'Office work with 10k daily steps'
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  // Populate form with Supabase profile whenever userProfile updates
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || currentUser?.name || '',
        age: userProfile.age ?? '',
        gender: userProfile.gender || 'Male',
        height: userProfile.height ?? '',
        weight: userProfile.weight ?? '',
        starting_weight: userProfile.starting_weight ?? '',
        target_weight: userProfile.target_weight ?? '',
        fitness_goal: userProfile.fitness_goal || 'Muscle Gain',
        activity_level: userProfile.activity_level || 'Moderately Active',
        fitness_experience: userProfile.fitness_experience || 'Intermediate (1-3 yrs)',
        workout_frequency: userProfile.workout_frequency ? String(userProfile.workout_frequency) : '4',
        preferred_workout_type: userProfile.preferred_workout_type || 'Strength / Resistance',
        dietary_preference: userProfile.dietary_preference || 'Vegetarian',
        allergies_or_intolerances: userProfile.allergies_or_intolerances || '',
        food_preferences: userProfile.food_preferences || '',
        daily_water_intake: userProfile.daily_water_intake ?? '3.0',
        average_sleep_duration: userProfile.average_sleep_duration ?? '7.5',
        daily_activity_level: userProfile.daily_activity_level || ''
      });
    } else if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || '',
        fitness_goal: currentUser.goal || 'Muscle Gain'
      }));
    }
  }, [userProfile, currentUser]);

  // Handle Input Changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError('');
    setSuccessMessage('');
  };

  // Form Validation and Submission to Supabase
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setValidationError('');
    setSuccessMessage('');

    // Validations
    if (!formData.name.trim()) {
      setValidationError('Full Name is required.');
      return;
    }

    if (formData.age && (Number(formData.age) <= 0 || Number(formData.age) > 120)) {
      setValidationError('Please enter a valid age between 1 and 120.');
      return;
    }

    if (formData.height && (Number(formData.height) <= 40 || Number(formData.height) > 300)) {
      setValidationError('Please enter a valid height between 40 cm and 300 cm.');
      return;
    }

    if (formData.weight && (Number(formData.weight) <= 20 || Number(formData.weight) > 500)) {
      setValidationError('Please enter a valid weight between 20 kg and 500 kg.');
      return;
    }

    if (formData.target_weight && (Number(formData.target_weight) <= 20 || Number(formData.target_weight) > 500)) {
      setValidationError('Please enter a valid target weight between 20 kg and 500 kg.');
      return;
    }

    if (formData.daily_water_intake && (Number(formData.daily_water_intake) < 0 || Number(formData.daily_water_intake) > 20)) {
      setValidationError('Daily water intake must be between 0 and 20 liters.');
      return;
    }

    if (formData.average_sleep_duration && (Number(formData.average_sleep_duration) < 0 || Number(formData.average_sleep_duration) > 24)) {
      setValidationError('Average sleep duration must be between 0 and 24 hours.');
      return;
    }

    if (!session?.user?.id) {
      setValidationError('No active authenticated session found. Please sign in again.');
      return;
    }

    setSaving(true);

    try {
      const { data, error } = await profileService.upsertProfile(session.user.id, formData);

      if (error) {
        setValidationError(`Database Error: ${error.message}`);
      } else {
        setSuccessMessage('Profile and fitness data successfully saved to Supabase!');
        await refreshProfile();
        // Switch back to dashboard view after brief moment
        setTimeout(() => {
          setActiveTab('dashboard');
        }, 1200);
      }
    } catch (err) {
      setValidationError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleResetForm = () => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        age: userProfile.age ?? '',
        gender: userProfile.gender || 'Male',
        height: userProfile.height ?? '',
        weight: userProfile.weight ?? '',
        starting_weight: userProfile.starting_weight ?? '',
        target_weight: userProfile.target_weight ?? '',
        fitness_goal: userProfile.fitness_goal || 'Muscle Gain',
        activity_level: userProfile.activity_level || 'Moderately Active',
        fitness_experience: userProfile.fitness_experience || 'Intermediate (1-3 yrs)',
        workout_frequency: userProfile.workout_frequency ? String(userProfile.workout_frequency) : '4',
        preferred_workout_type: userProfile.preferred_workout_type || 'Strength / Resistance',
        dietary_preference: userProfile.dietary_preference || 'Vegetarian',
        allergies_or_intolerances: userProfile.allergies_or_intolerances || '',
        food_preferences: userProfile.food_preferences || '',
        daily_water_intake: userProfile.daily_water_intake ?? '3.0',
        average_sleep_duration: userProfile.average_sleep_duration ?? '7.5',
        daily_activity_level: userProfile.daily_activity_level || ''
      });
    } else if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || '',
        fitness_goal: currentUser.goal || 'Muscle Gain'
      }));
    }
    setValidationError('');
    setSuccessMessage('');
  };

  // If loading session state
  if (loading) {
    return (
      <div className="profile-container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 700 }}>
          Loading Athlete Profile from Supabase...
        </div>
      </div>
    );
  }

  // If user is not authenticated, show sign in / register prompt
  if (!isAuthenticated) {
    return (
      <div className="section" style={{ paddingTop: '4rem' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 245, 155, 0.12)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <User size={32} />
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Authentication Required</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Your personal fitness profile, goal metrics, nutrition preferences, and progress dashboard are securely stored in Supabase PostgreSQL and protected by Row Level Security.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary btn-lg">
                <span>Sign In to Account</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculated Mathematical Progress Calculation
  const calculateProgress = () => {
    if (!userProfile) return null;
    const current = Number(userProfile.weight);
    const start = Number(userProfile.starting_weight);
    const target = Number(userProfile.target_weight);
    const goal = userProfile.fitness_goal;

    if (!current || !target) return null;

    if (goal === 'Fat Loss' && start && start > target) {
      const prog = ((start - current) / (start - target)) * 100;
      return Math.min(100, Math.max(0, Math.round(prog)));
    }

    if ((goal === 'Weight Gain' || goal === 'Muscle Gain') && start && target > start) {
      const prog = ((current - start) / (target - start)) * 100;
      return Math.min(100, Math.max(0, Math.round(prog)));
    }

    // If starting weight not set but current & target exist
    return null;
  };

  // Safely extract initials from athlete name
  const getAthleteInitials = (name) => {
    if (!name || typeof name !== 'string') return 'A';
    const clean = name.trim();
    if (!clean) return 'A';
    const parts = clean.split(/\s+/).filter(Boolean);
    return parts.map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'A';
  };

  const calculatedProgress = calculateProgress();

  return (
    <div className="profile-container">
      <div className="container">
        {/* Profile Header Banner */}
        <div className="profile-header-card">
          <div className="profile-user-info">
            <div className="profile-avatar-large">
              {getAthleteInitials(userProfile?.name || currentUser?.name)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>{userProfile?.name || currentUser?.name || 'Athlete'}</h1>
                <span className="badge badge-mint">{userProfile?.fitness_goal || currentUser?.goal || 'General Fitness'}</span>
                <span className="badge badge-cyan">Supabase Synced</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {currentUser?.email || session?.user?.email || 'Authenticated Athlete'} • ID: <code style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>{session?.user?.id ? session.user.id.slice(0, 8) : '--------'}...</code>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={15} />
              <span>Personal Dashboard</span>
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'edit' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('edit')}
            >
              <Edit3 size={15} />
              <span>Edit Fitness Profile</span>
            </button>
            <button className="btn btn-sm btn-secondary" onClick={logout} title="Sign out session">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="profile-nav-tabs">
          <button
            className={`profile-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>1. Personal Dashboard</span>
          </button>
          <button
            className={`profile-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <Edit3 size={18} />
            <span>2. Edit Profile & Fitness Information</span>
          </button>
        </div>

        {/* =========================================================
            TAB 1: PERSONAL DASHBOARD (ACTUAL SAVED DATA)
            ========================================================= */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Primary Goal & Weight Progress Card */}
            <div className="dashboard-goal-banner">
              <div>
                <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>
                  Target Transformation Objective
                </span>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {userProfile?.fitness_goal || 'Goal Not Selected Yet'}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {userProfile?.preferred_workout_type ? `${userProfile.preferred_workout_type} focus` : 'Structured periodization'}{' '}
                  with {userProfile?.workout_frequency ? `${userProfile.workout_frequency} sessions per week` : 'consistent weekly training'}.
                </p>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Current Weight
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                      {userProfile?.weight ? `${userProfile.weight} kg` : <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Not set</span>}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Target Weight
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                      {userProfile?.target_weight ? `${userProfile.target_weight} kg` : <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Not set</span>}
                    </div>
                  </div>

                  {userProfile?.starting_weight && (
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Starting Baseline
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                        {userProfile.starting_weight} kg
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mathematically Computed Progress Indicator */}
              <div style={{ background: 'rgba(10, 14, 23, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Goal Completion
                </div>

                {calculatedProgress !== null ? (
                  <div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                      {calculatedProgress}%
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', margin: '0.75rem 0', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${calculatedProgress}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))',
                          borderRadius: '999px',
                          transition: 'width 0.6s ease'
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Calculated from starting ({userProfile?.starting_weight}kg) to target ({userProfile?.target_weight}kg)
                    </span>
                  </div>
                ) : (
                  <div style={{ padding: '0.75rem 0' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                      Insufficient Data
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '1rem' }}>
                      Add both starting weight and target weight in your profile to calculate accurate progress.
                    </p>
                    <button className="btn btn-sm btn-outline-mint" onClick={() => setActiveTab('edit')}>
                      Complete Profile
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Dashboard 4-Column Stat Cards Grid */}
            <div className="dashboard-overview-grid">
              {/* Card 1: Hydration */}
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <span className="dashboard-stat-title">Daily Hydration</span>
                  <Droplets size={20} color="var(--accent-cyan)" />
                </div>
                <div className="dashboard-stat-value">
                  {userProfile?.daily_water_intake ? `${userProfile.daily_water_intake} L` : 'Not recorded'}
                </div>
                <div className="dashboard-stat-sub">
                  Recommended target: 3.0 - 4.0 Liters daily
                </div>
              </div>

              {/* Card 2: Sleep */}
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <span className="dashboard-stat-title">Sleep Duration</span>
                  <Clock size={20} color="var(--accent-amber)" />
                </div>
                <div className="dashboard-stat-value">
                  {userProfile?.average_sleep_duration ? `${userProfile.average_sleep_duration} hrs` : 'Not recorded'}
                </div>
                <div className="dashboard-stat-sub">
                  Optimal cellular recovery window
                </div>
              </div>

              {/* Card 3: Activity Level */}
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <span className="dashboard-stat-title">Activity & Split</span>
                  <Activity size={20} color="var(--accent-secondary)" />
                </div>
                <div className="dashboard-stat-value" style={{ fontSize: '1.4rem' }}>
                  {userProfile?.activity_level || 'Not set'}
                </div>
                <div className="dashboard-stat-sub">
                  {userProfile?.workout_frequency ? `${userProfile.workout_frequency} workout days / week` : 'Frequency not set'}
                </div>
              </div>

              {/* Card 4: Nutrition Framework */}
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <span className="dashboard-stat-title">Dietary Preference</span>
                  <Apple size={20} color="var(--accent-primary)" />
                </div>
                <div className="dashboard-stat-value" style={{ fontSize: '1.4rem' }}>
                  {userProfile?.dietary_preference || 'Standard'}
                </div>
                <div className="dashboard-stat-sub">
                  {userProfile?.allergies_or_intolerances ? `Allergies: ${userProfile.allergies_or_intolerances}` : 'No logged allergies'}
                </div>
              </div>
            </div>

            {/* Incomplete Profile Prompt if user hasn't completed all key fields */}
            {(!userProfile?.height || !userProfile?.weight || !userProfile?.target_weight) && (
              <div className="glass-card" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', border: '1px solid rgba(0, 245, 155, 0.3)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <Sparkles size={18} color="var(--accent-primary)" />
                    <h3 style={{ fontSize: '1.15rem' }}>Complete Your Fitness & Health Information</h3>
                  </div>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>
                    Fill out your height, weight targets, dietary preferences, and lifestyle to unlock personalized recommendations.
                  </p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('edit')}>
                  <span>Edit Profile Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 2: EDIT PROFILE & FITNESS DATA (FORM)
            ========================================================= */}
        {activeTab === 'edit' && (
          <form onSubmit={handleSaveProfile}>
            {/* Feedback Alerts */}
            {validationError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                color: '#FCA5A5',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{validationError}</span>
              </div>
            )}

            {successMessage && (
              <div style={{
                background: 'rgba(0, 245, 155, 0.12)',
                border: '1px solid rgba(0, 245, 155, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                color: 'var(--accent-primary)',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Section 1: Basic Information */}
            <div className="form-section-card">
              <h3 className="form-section-title">
                <User size={20} color="var(--accent-primary)" />
                <span>1. Basic Athlete Information</span>
              </h3>
              <p className="form-section-subtitle">
                Core biometric data used to calculate metabolic requirements and progress trajectory.
              </p>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Alex Rivera"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    className="form-control"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="e.g. 26"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-control"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-4">
                <div className="form-group">
                  <label className="form-label">Height (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="40"
                    max="300"
                    className="form-control"
                    value={formData.height}
                    onChange={(e) => handleChange('height', e.target.value)}
                    placeholder="e.g. 178"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="500"
                    className="form-control"
                    value={formData.weight}
                    onChange={(e) => handleChange('weight', e.target.value)}
                    placeholder="e.g. 78.4"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Starting Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="500"
                    className="form-control"
                    value={formData.starting_weight}
                    onChange={(e) => handleChange('starting_weight', e.target.value)}
                    placeholder="e.g. 74.0"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="500"
                    className="form-control"
                    value={formData.target_weight}
                    onChange={(e) => handleChange('target_weight', e.target.value)}
                    placeholder="e.g. 82.0"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Fitness & Goal Information */}
            <div className="form-section-card">
              <h3 className="form-section-title">
                <Target size={20} color="var(--accent-secondary)" />
                <span>2. Fitness Goals & Training Architecture</span>
              </h3>
              <p className="form-section-subtitle">
                Select your primary physical objective from the 8 supported FitSphere pathways.
              </p>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Primary Fitness Goal *</label>
                  <select
                    className="form-control"
                    value={formData.fitness_goal}
                    onChange={(e) => handleChange('fitness_goal', e.target.value)}
                  >
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Strength">Strength</option>
                    <option value="Endurance">Endurance</option>
                    <option value="General Fitness">General Fitness</option>
                    <option value="Body Recomposition">Body Recomposition</option>
                    <option value="Posture & Mobility">Posture & Mobility</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Activity Level</label>
                  <select
                    className="form-control"
                    value={formData.activity_level}
                    onChange={(e) => handleChange('activity_level', e.target.value)}
                  >
                    <option value="Sedentary">Sedentary (Little to no exercise)</option>
                    <option value="Lightly Active">Lightly Active (1-3 days/week)</option>
                    <option value="Moderately Active">Moderately Active (3-5 days/week)</option>
                    <option value="Very Active">Very Active (6-7 days/week intense)</option>
                    <option value="Extremely Active">Extremely Active (Athletic training / physical job)</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Fitness Experience</label>
                  <select
                    className="form-control"
                    value={formData.fitness_experience}
                    onChange={(e) => handleChange('fitness_experience', e.target.value)}
                  >
                    <option value="Beginner (0-1 yr)">Beginner (0-1 yr)</option>
                    <option value="Intermediate (1-3 yrs)">Intermediate (1-3 yrs)</option>
                    <option value="Advanced (3+ yrs)">Advanced (3+ yrs)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Workout Frequency (Days / Week)</label>
                  <select
                    className="form-control"
                    value={formData.workout_frequency}
                    onChange={(e) => handleChange('workout_frequency', e.target.value)}
                  >
                    <option value="1">1 Day / Week</option>
                    <option value="2">2 Days / Week</option>
                    <option value="3">3 Days / Week</option>
                    <option value="4">4 Days / Week</option>
                    <option value="5">5 Days / Week</option>
                    <option value="6">6 Days / Week</option>
                    <option value="7">7 Days / Week</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Workout Type</label>
                  <select
                    className="form-control"
                    value={formData.preferred_workout_type}
                    onChange={(e) => handleChange('preferred_workout_type', e.target.value)}
                  >
                    <option value="Strength / Resistance">Strength / Resistance</option>
                    <option value="HIIT / Conditioning">HIIT / Conditioning</option>
                    <option value="Calisthenics">Calisthenics</option>
                    <option value="Cardio & Running">Cardio & Running</option>
                    <option value="Yoga / Mobility">Yoga / Mobility</option>
                    <option value="Hybrid / Functional">Hybrid / Functional</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Nutrition Preferences */}
            <div className="form-section-card">
              <h3 className="form-section-title">
                <Apple size={20} color="var(--accent-primary)" />
                <span>3. Nutrition & Dietary Preferences</span>
              </h3>
              <p className="form-section-subtitle">
                Configure dietary boundaries to customize future nutrition plans and supplement suggestions.
              </p>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Dietary Framework</label>
                  <select
                    className="form-control"
                    value={formData.dietary_preference}
                    onChange={(e) => handleChange('dietary_preference', e.target.value)}
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan (100% Plant-Based)</option>
                    <option value="Non-Vegetarian">Non-Vegetarian (Omnivore)</option>
                    <option value="Other">Other Specific Framework</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Allergies or Intolerances</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.allergies_or_intolerances}
                    onChange={(e) => handleChange('allergies_or_intolerances', e.target.value)}
                    placeholder="e.g. Lactose, Gluten, Peanuts, None"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Food Preferences & Notes</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={formData.food_preferences}
                  onChange={(e) => handleChange('food_preferences', e.target.value)}
                  placeholder="e.g. Prefer whole food protein sources, high-carb pre-workout meals, avoid artificial sweeteners"
                />
              </div>
            </div>

            {/* Section 4: Lifestyle Information */}
            <div className="form-section-card">
              <h3 className="form-section-title">
                <Activity size={20} color="var(--accent-cyan)" />
                <span>4. Lifestyle & Daily Habits</span>
              </h3>
              <p className="form-section-subtitle">
                Restorative habits that determine recovery bandwidth and physiological adaptation.
              </p>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Daily Water Intake Target (Liters)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    className="form-control"
                    value={formData.daily_water_intake}
                    onChange={(e) => handleChange('daily_water_intake', e.target.value)}
                    placeholder="e.g. 3.5"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Average Sleep Duration (Hours / Night)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    className="form-control"
                    value={formData.average_sleep_duration}
                    onChange={(e) => handleChange('average_sleep_duration', e.target.value)}
                    placeholder="e.g. 7.5"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Daily Non-Exercise Activity Summary</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.daily_activity_level}
                  onChange={(e) => handleChange('daily_activity_level', e.target.value)}
                  placeholder="e.g. Desk job with 8,000 daily walking steps and active weekend hikes"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetForm}
                disabled={saving}
              >
                <RotateCcw size={16} />
                <span>Reset Changes</span>
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={saving}
              >
                <Save size={18} />
                <span>{saving ? 'Persisting to Supabase...' : 'Save Profile & Fitness Data'}</span>
              </button>
            </div>
          </form>
        )}

        {/* =========================================================
            PRIVACY & SAFETY DISCLAIMER (MANDATORY REQUIREMENT)
            ========================================================= */}
        <div className="safety-disclaimer-box">
          <Info size={22} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div className="safety-disclaimer-text">
            <strong>Privacy & Health Safety Disclaimer:</strong> FitSphere collects your biometric, fitness, and nutrition details solely to personalize your training dashboard and supplement recommendations within the platform. All data is encrypted and strictly protected via PostgreSQL Row Level Security (RLS). This information is not intended to serve as medical advice, formal clinical diagnosis, or a substitute for professional healthcare consultation. Always consult a licensed medical practitioner or registered clinical dietitian prior to initiating any significant changes to your exercise regimen, caloric surplus/deficit, or dietary supplementation.
          </div>
        </div>
      </div>
    </div>
  );
};
