// FitSphere Fitness Journey & Exercise Data Structure

export const MOCK_JOURNEY_STATS = {
  activeGoal: 'Muscle Gain',
  currentWeightKg: 74.5,
  targetWeightKg: 78.0,
  startWeightKg: 70.0,
  streakDays: 14,
  weeklyConsistency: '92%',
  overallGoalProgress: 65,
  caloriesTarget: 2600,
  caloriesConsumed: 1850,
  caloriesBurned: 550,
  waterTargetLiters: 3.5,
  waterCurrentLiters: 2.2,
  sleepHours: 7.5,
  sleepQuality: 'Optimal (85%)',
  macroTargets: {
    protein: { current: 130, target: 165, unit: 'g', color: '#00F59B' },
    carbs: { current: 180, target: 240, unit: 'g', color: '#00E5FF' },
    fats: { current: 45, target: 60, unit: 'g', color: '#FF6B35' }
  }
};

export const MOCK_TODAYS_MEALS = [
  {
    id: 'm1',
    time: '08:00 AM',
    title: 'Oats & Whey Protein',
    calories: 480,
    protein: '38g',
    carbs: '55g',
    fat: '10g',
    type: 'Breakfast'
  },
  {
    id: 'm2',
    time: '01:00 PM',
    title: 'Paneer / Chicken Brown Rice Bowl',
    calories: 650,
    protein: '45g',
    carbs: '60g',
    fat: '18g',
    type: 'Lunch'
  },
  {
    id: 'm3',
    time: '04:30 PM',
    title: 'Protein Bar & Banana',
    calories: 250,
    protein: '20g',
    carbs: '28g',
    fat: '6g',
    type: 'Snacks'
  },
  {
    id: 'm4',
    time: '08:15 PM',
    title: 'Grilled Fish / Tofu Veggie Stir-Fry',
    calories: 470,
    protein: '42g',
    carbs: '37g',
    fat: '11g',
    type: 'Dinner'
  }
];

export const GOAL_PLANS_DATABASE = {
  'Fat Loss': {
    title: 'High-Def Fat Loss & Shred Protocol',
    subtitle: 'Caloric deficit maximization with hypertrophy retention',
    duration: '8 Weeks',
    difficulty: 'Intermediate',
    estCaloriesBurned: '550 - 700 kcal/session',
    restTime: '45 - 60 sec',
    weeklySchedule: '4 Days Lift + 2 Days Zone 2 Cardio',
    exercises: [
      { exercise: 'Barbell Goblet Squat', sets: 4, reps: '12-15', duration: '45 min', difficulty: 'Moderate', calories: 240, rest: '60s' },
      { exercise: 'Dumbbell Walking Lunges', sets: 3, reps: '15 reps/leg', duration: '30 min', difficulty: 'High', calories: 180, rest: '45s' },
      { exercise: 'Incline Dumbbell Press', sets: 4, reps: '10-12', duration: '40 min', difficulty: 'Moderate', calories: 190, rest: '60s' },
      { exercise: 'Mountain Climbers & Burpee Circuit', sets: 4, reps: '45s work', duration: '15 min', difficulty: 'High', calories: 160, rest: '30s' }
    ]
  },
  'Weight Gain': {
    title: 'Hyper-Caloric Weight & Mass Expansion',
    subtitle: 'Progressive heavy compound loading with caloric surplus',
    duration: '10 Weeks',
    difficulty: 'Beginner - Intermediate',
    estCaloriesBurned: '400 - 500 kcal/session',
    restTime: '90 - 120 sec',
    weeklySchedule: '3 Days Full Body Heavy Compound',
    exercises: [
      { exercise: 'Barbell Back Squat', sets: 4, reps: '6-8', duration: '50 min', difficulty: 'High', calories: 260, rest: '120s' },
      { exercise: 'Flat Barbell Bench Press', sets: 4, reps: '6-8', duration: '45 min', difficulty: 'High', calories: 220, rest: '120s' },
      { exercise: 'Barbell Bent-Over Row', sets: 4, reps: '8-10', duration: '40 min', difficulty: 'Moderate', calories: 190, rest: '90s' },
      { exercise: 'Standing Overhead Press', sets: 3, reps: '8-10', duration: '35 min', difficulty: 'Moderate', calories: 150, rest: '90s' }
    ]
  },
  'Muscle Gain': {
    title: '4-Day Hypertrophy & Muscle Volume Architecture',
    subtitle: 'Optimal time-under-tension and mechanical damage for muscle growth',
    duration: '12 Weeks',
    difficulty: 'Intermediate',
    estCaloriesBurned: '450 - 600 kcal/session',
    restTime: '60 - 90 sec',
    weeklySchedule: '4-Day Push / Pull / Legs / Upper Split',
    exercises: [
      { exercise: 'Incline Barbell Press', sets: 4, reps: '8-10', duration: '50 min', difficulty: 'High', calories: 230, rest: '90s' },
      { exercise: 'Romanian Deadlift (RDL)', sets: 4, reps: '8-10', duration: '45 min', difficulty: 'High', calories: 250, rest: '90s' },
      { exercise: 'Lat Pulldowns (Wide Grip)', sets: 4, reps: '10-12', duration: '35 min', difficulty: 'Moderate', calories: 170, rest: '60s' },
      { exercise: 'Cable Lateral Raises & Bicep Curls', sets: 4, reps: '12-15', duration: '30 min', difficulty: 'Moderate', calories: 140, rest: '60s' }
    ]
  },
  'Strength': {
    title: 'Maximal Strength & Neural Drive System',
    subtitle: 'Low-rep high-load powerlifting progression',
    duration: '10 Weeks',
    difficulty: 'Advanced',
    estCaloriesBurned: '350 - 450 kcal/session',
    restTime: '3 - 5 min',
    weeklySchedule: '4 Days Heavy Compound Frequency',
    exercises: [
      { exercise: 'Conventional Barbell Deadlift', sets: 5, reps: '3-5', duration: '60 min', difficulty: 'High', calories: 280, rest: '180s' },
      { exercise: 'Competition Back Squat', sets: 5, reps: '3-5', duration: '60 min', difficulty: 'High', calories: 270, rest: '180s' },
      { exercise: 'Strict Overhead Press', sets: 4, reps: '4-6', duration: '40 min', difficulty: 'High', calories: 180, rest: '150s' },
      { exercise: 'Weighted Pull-Ups', sets: 4, reps: '5', duration: '35 min', difficulty: 'High', calories: 190, rest: '150s' }
    ]
  },
  'Endurance': {
    title: 'Aerobic Capacity & Lactate Threshold Building',
    subtitle: 'Mitochondrial density and VO2 max improvement',
    duration: '8 Weeks',
    difficulty: 'All Levels',
    estCaloriesBurned: '600 - 800 kcal/session',
    restTime: '30 - 45 sec',
    weeklySchedule: '5 Days Cardio & High Rep Endurance',
    exercises: [
      { exercise: 'Zone 2 Incline Treadmill Run/Walk', sets: 1, reps: '45 min', duration: '45 min', difficulty: 'Moderate', calories: 420, rest: '0s' },
      { exercise: 'Kettlebell Swings & Thrusters', sets: 5, reps: '20', duration: '30 min', difficulty: 'High', calories: 260, rest: '45s' },
      { exercise: 'Rowing Machine Interval Sprints', sets: 8, reps: '500m', duration: '25 min', difficulty: 'High', calories: 290, rest: '30s' }
    ]
  },
  'General Fitness': {
    title: 'Total Body Health & Functional Longevity',
    subtitle: 'Balanced cardiovascular health, strength, and core stability',
    duration: 'Ongoing',
    difficulty: 'Beginner - Intermediate',
    estCaloriesBurned: '350 - 450 kcal/session',
    restTime: '60 sec',
    weeklySchedule: '3 Days Full Body + 2 Days Active Recovery',
    exercises: [
      { exercise: 'Bodyweight Push-Ups & Inverted Rows', sets: 3, reps: '12-15', duration: '30 min', difficulty: 'Moderate', calories: 150, rest: '60s' },
      { exercise: 'Dumbbell Goblet Squat to Press', sets: 3, reps: '12', duration: '30 min', difficulty: 'Moderate', calories: 180, rest: '60s' },
      { exercise: 'Plank Hold & Farmer Carrying', sets: 3, reps: '60 sec', duration: '20 min', difficulty: 'Moderate', calories: 120, rest: '45s' }
    ]
  },
  'Body Recomposition': {
    title: 'Simultaneous Muscle Build & Fat Reduction',
    subtitle: 'Maintenance calories with high protein intake and density training',
    duration: '12 Weeks',
    difficulty: 'Intermediate',
    estCaloriesBurned: '500 - 600 kcal/session',
    restTime: '60 sec',
    weeklySchedule: '4 Days Upper/Lower + 2 Days HIIT',
    exercises: [
      { exercise: 'Dumbbell Bulgarian Split Squat', sets: 4, reps: '10', duration: '40 min', difficulty: 'High', calories: 210, rest: '60s' },
      { exercise: 'Standing Barbell Press & Pull-Up Superset', sets: 4, reps: '10', duration: '45 min', difficulty: 'High', calories: 230, rest: '60s' },
      { exercise: 'Assault Bike / Rowing HIIT Sprints', sets: 6, reps: '30s max', duration: '20 min', difficulty: 'High', calories: 200, rest: '60s' }
    ]
  },
  'Posture & Mobility': {
    title: 'Spinal Alignment, Core Stability & Thoracic Freedom',
    subtitle: 'Decompress spine, lengthen hip flexors, and enhance posture',
    duration: '6 Weeks',
    difficulty: 'All Levels',
    estCaloriesBurned: '200 - 300 kcal/session',
    restTime: '30 sec',
    weeklySchedule: 'Daily 20-min Posture & Mobility Protocol',
    exercises: [
      { exercise: 'Cat-Cow & Thoracic Rotation Reach', sets: 3, reps: '10 cycles', duration: '15 min', difficulty: 'Easy', calories: 50, rest: '15s' },
      { exercise: 'Prone Cobra & Scapular Y-T-W Extensions', sets: 3, reps: '12 holds', duration: '15 min', difficulty: 'Easy', calories: 70, rest: '30s' },
      { exercise: 'Kneeling Hip Flexor & Hamstring Decompression', sets: 3, reps: '45 sec hold', duration: '15 min', difficulty: 'Easy', calories: 60, rest: '15s' },
      { exercise: 'Deadbug & Bird-Dog Anti-Extension Core', sets: 4, reps: '10 reps/side', duration: '15 min', difficulty: 'Moderate', calories: 90, rest: '30s' }
    ]
  }
};

export const EXERCISE_LIBRARY_DATABASE = [
  // Fat Loss / Cardio
  { id: 'ex-1', category: 'Fat Loss', name: 'High-Knee HIIT Sprints', targetArea: 'Full Body & Cardio', difficulty: 'Moderate', reps: '45s work / 15s rest', calories: 150, instructions: 'Keep torso upright, drive knees towards chest level explosively.', safetyNote: 'Land softly on balls of feet to protect knee joints.' },
  { id: 'ex-2', category: 'Fat Loss', name: 'Kettlebell Clean & Push Press', targetArea: 'Shoulders & Legs', difficulty: 'High', reps: '4 sets × 12 reps', calories: 210, instructions: 'Explode through hips to clean kettlebell to rack position, then press overhead.', safetyNote: 'Brace core tightly to avoid lumbar hyperextension.' },
  
  // Muscle Building / Strength
  { id: 'ex-3', category: 'Muscle Building', name: 'Barbell Incline Bench Press', targetArea: 'Upper Chest & Triceps', difficulty: 'High', reps: '4 sets × 8-10 reps', calories: 180, instructions: 'Set bench to 30 degrees. Lower bar under control to upper chest and drive upward.', safetyNote: 'Keep shoulder blades retracted and feet flat on floor.' },
  { id: 'ex-4', category: 'Strength', name: 'Conventional Barbell Deadlift', targetArea: 'Posterior Chain & Back', difficulty: 'High', reps: '4 sets × 5 reps', calories: 260, instructions: 'Hinge at hips, grip bar shoulder-width, pull chest up, drive through floor.', safetyNote: 'Maintain neutral spine; never round lower back under heavy load.' },
  { id: 'ex-5', category: 'Muscle Building', name: 'Seated Cable Row (Neutral Grip)', targetArea: 'Lats & Rhomboids', difficulty: 'Moderate', reps: '4 sets × 12 reps', calories: 140, instructions: 'Pull handles toward lower abdomen while keeping chest up.', safetyNote: 'Avoid excessive swinging or pulling with momentum.' },
  
  // Home Workouts / No Equipment
  { id: 'ex-6', category: 'Home Workouts', name: 'Decline Push-Ups & Pike Push-Ups', targetArea: 'Chest, Shoulders & Core', difficulty: 'Moderate', reps: '3 sets × 15 reps', calories: 110, instructions: 'Elevate feet on bench or chair for decline, or elevate hips into V-shape for pike.', safetyNote: 'Keep elbows tucked at 45 degrees.' },
  { id: 'ex-7', category: 'No Equipment', name: 'Bodyweight Prisoner Squats & Jump Lunges', targetArea: 'Quads & Glutes', difficulty: 'Moderate', reps: '4 sets × 20 reps', calories: 160, instructions: 'Interlock fingers behind head, squat deep, drive through heels.', safetyNote: 'Keep knees tracking over toes; do not collapse inwards.' },

  // Flexibility & Posture & Mobility
  { id: 'ex-8', category: 'Posture & Mobility', name: 'Wall Angels & Thoracic Extension', targetArea: 'Thoracic Spine & Posture', difficulty: 'Easy', reps: '3 sets × 12 reps', calories: 45, instructions: 'Stand against wall, press lower back, elbows, and wrists against wall. Slide arms vertically.', safetyNote: 'Improves posture alignment and relieves desk hunch. Does not alter skeletal height.' },
  { id: 'ex-9', category: 'Flexibility', name: 'Couch Stretch & Hip Flexor Decompression', targetArea: 'Hip Flexors & Quads', difficulty: 'Easy', reps: '3 sets × 45 sec/leg', calories: 35, instructions: 'Place rear shin against wall or couch, kneel forward, tuck pelvis.', safetyNote: 'Relieves anterior pelvic tilt and lower back tightness.' },
  { id: 'ex-10', category: 'Posture & Mobility', name: 'Prone Cobra & Scapular Retraction', targetArea: 'Upper Back & Posture', difficulty: 'Easy', reps: '4 sets × 10 holds (5s hold)', calories: 55, instructions: 'Lie face down, lift chest, rotate thumbs outward, squeeze shoulder blades.', safetyNote: 'Strengthens postural muscles to correct rounded shoulders.' }
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
      { name: 'Weighted Dips', sets: '3 sets', reps: '10-12 reps', weight: '+15 kg' }
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
      { name: 'Neutral Lat Pulldowns', sets: '3 sets', reps: '10-12 reps', weight: '75 kg' }
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
      { name: 'Incline Treadmill Zone 2 Walk', sets: '30 min', reps: 'HR 125-135 bpm', weight: 'Speed 5.5' }
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
      { name: 'Bulgarian Split Squats', sets: '3 sets', reps: '10 reps / leg', weight: '24 kg' }
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
    name: 'Posture, Mobility & Spinal Decompression',
    level: 'All Levels',
    duration: '6 Weeks',
    split: 'Daily Mobility & Posture Alignment',
    category: 'Posture & Mobility',
    isPro: false,
    enrolledCount: 2940
  }
];

export const MOCK_PROGRESS_RECORDS = [
  { exercise: 'Barbell Bench Press', previous: '95 kg', current: '105 kg', delta: '+10 kg', date: 'Last checked 5 days ago' },
  { exercise: 'Conventional Deadlift', previous: '160 kg', current: '175 kg', date: 'Last checked 10 days ago', delta: '+15 kg' },
  { exercise: 'Back Squat', previous: '125 kg', current: '140 kg', delta: '+15 kg', date: 'Last checked 2 weeks ago' }
];
