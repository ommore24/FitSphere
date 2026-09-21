// FitSphere Fitness Journey Mock Data Structure

export const MOCK_JOURNEY_STATS = {
  activeGoal: 'Lean Hypertrophy & Strength',
  currentWeightKg: 78.4,
  targetWeightKg: 82.0,
  startWeightKg: 74.0,
  streakDays: 19,
  weeklyConsistency: '94%',
  overallGoalProgress: 68, // percent
  caloriesTarget: 2750,
  caloriesConsumed: 1980,
  caloriesBurned: 640,
  waterTargetLiters: 3.5,
  waterCurrentLiters: 2.6,
  sleepHours: 7.8,
  sleepQuality: 'Optimal (88%)',
  macroTargets: {
    protein: { current: 145, target: 185, unit: 'g', color: '#00F59B' },
    carbs: { current: 195, target: 250, unit: 'g', color: '#00E5FF' },
    fats: { current: 48, target: 62, unit: 'g', color: '#FF6B35' }
  }
};

export const MOCK_TODAYS_MEALS = [
  {
    id: 'm1',
    time: '08:00 AM',
    title: 'Power Oats & Whey',
    calories: 520,
    protein: '42g',
    carbs: '68g',
    fat: '11g',
    type: 'Breakfast'
  },
  {
    id: 'm2',
    time: '12:30 PM',
    title: 'Grilled Salmon Quinoa Bowl & Greens',
    calories: 710,
    protein: '54g',
    carbs: '62g',
    fat: '24g',
    type: 'Lunch'
  },
  {
    id: 'm3',
    time: '04:15 PM',
    title: 'Barebells Protein Bar & Cold Brew',
    calories: 220,
    protein: '20g',
    carbs: '16g',
    fat: '7g',
    type: 'Pre-Workout'
  },
  {
    id: 'm4',
    time: '07:45 PM',
    title: 'Grass-Fed Sirloin, Sweet Potato & Asparagus',
    calories: 680,
    protein: '58g',
    carbs: '54g',
    fat: '18g',
    type: 'Dinner'
  }
];

export const MOCK_WORKOUT_SPLIT = [
  {
    day: 'Monday',
    title: 'Upper Body Power & Push',
    duration: '65 min',
    intensity: 'High',
    status: 'Completed',
    exercises: [
      { name: 'Barbell Incline Bench Press', sets: '4 sets', reps: '6-8 reps', weight: '85 kg' },
      { name: 'Dumbbell Neutral Shoulder Press', sets: '3 sets', reps: '8-10 reps', weight: '30 kg' },
      { name: 'Weighted Dips', sets: '3 sets', reps: '10-12 reps', weight: '+15 kg' },
      { name: 'Cable Overhead Tricep Extension', sets: '4 sets', reps: '12-15 reps', weight: '35 kg' }
    ]
  },
  {
    day: 'Tuesday',
    title: 'Posterior Chain & Pull Focus',
    duration: '70 min',
    intensity: 'High',
    status: 'Completed',
    exercises: [
      { name: 'Barbell Romanian Deadlift', sets: '4 sets', reps: '8 reps', weight: '130 kg' },
      { name: 'Chest-Supported T-Bar Row', sets: '4 sets', reps: '8-10 reps', weight: '70 kg' },
      { name: 'Neutral Lat Pulldowns', sets: '3 sets', reps: '10-12 reps', weight: '75 kg' },
      { name: 'Incline Dumbbell Bicep Curls', sets: '4 sets', reps: '10-12 reps', weight: '16 kg' }
    ]
  },
  {
    day: 'Wednesday',
    title: 'Active Mobility & Zone 2 Cardio',
    duration: '45 min',
    intensity: 'Moderate',
    status: 'Scheduled Today',
    exercises: [
      { name: 'Dynamic Thoracic & Hip Opener Flow', sets: '15 min', reps: 'Continuous', weight: 'Bodyweight' },
      { name: 'Incline Treadmill Zone 2 Walk', sets: '30 min', reps: 'Heart Rate 125-135 bpm', weight: 'Speed 5.5' }
    ]
  },
  {
    day: 'Thursday',
    title: 'Lower Body Hypertrophy & Quads',
    duration: '60 min',
    intensity: 'High',
    status: 'Upcoming',
    exercises: [
      { name: 'Barbell Safety Bar Squats', sets: '4 sets', reps: '6-8 reps', weight: '115 kg' },
      { name: 'Bulgarian Split Squats', sets: '3 sets', reps: '10 reps / leg', weight: '24 kg' },
      { name: 'Seated Leg Extensions (Drop Set)', sets: '4 sets', reps: '12-15 reps', weight: '65 kg' },
      { name: 'Standing Calf Raises', sets: '4 sets', reps: '15-20 reps', weight: '90 kg' }
    ]
  }
];

export const MOCK_FITNESS_PLANS = [
  {
    id: 'plan-1',
    name: '12-Week Hypertrophy Architecture',
    level: 'Intermediate - Advanced',
    duration: '12 Weeks',
    split: 'Push / Pull / Legs / Upper',
    category: 'Muscle Building',
    isPro: true,
    enrolledCount: 3840
  },
  {
    id: 'plan-2',
    name: 'Metabolic Shred & Athletic Conditioning',
    level: 'All Levels',
    duration: '8 Weeks',
    split: 'Full Body Circuit + Zone 3 HIIT',
    category: 'Fat Loss',
    isPro: false,
    enrolledCount: 5120
  },
  {
    id: 'plan-3',
    name: 'Functional Strength & Barbell Longevity',
    level: 'Intermediate',
    duration: '10 Weeks',
    split: 'Compound Conjugate System',
    category: 'Power & Longevity',
    isPro: true,
    enrolledCount: 2290
  }
];

export const MOCK_PROGRESS_RECORDS = [
  { exercise: 'Barbell Bench Press', previous: '95 kg', current: '105 kg', delta: '+10 kg', date: 'Last checked 5 days ago' },
  { exercise: 'Conventional Deadlift', previous: '160 kg', current: '175 kg', delta: '+15 kg', date: 'Last checked 10 days ago' },
  { exercise: 'Back Squat', previous: '125 kg', current: '140 kg', delta: '+15 kg', date: 'Last checked 2 weeks ago' },
  { exercise: 'Resting Heart Rate', previous: '62 bpm', current: '56 bpm', delta: '-6 bpm', date: 'Measured this morning' }
];
