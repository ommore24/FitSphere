// FitSphere Goal-Based Recommendations Matrix (Prices in Indian Rupees ₹ / INR)

export const GOAL_OPTIONS = [
  {
    id: 'muscle',
    title: 'Lean Muscle & Hypertrophy',
    subtitle: 'Maximize clean protein synthesis, progressive strength, and metabolic muscle mass.',
    badge: 'High Demand',
    iconColor: '#00F59B'
  },
  {
    id: 'fatloss',
    title: 'Fat Loss & High Definition',
    subtitle: 'Preserve lean tissue while maximizing caloric expenditure and metabolic energy.',
    badge: 'Fast Results',
    iconColor: '#FF6B35'
  },
  {
    id: 'endurance',
    title: 'Athletic Conditioning & Endurance',
    subtitle: 'Elevate VO2 max, mitochondrial efficiency, and sustained muscular endurance.',
    badge: 'Hyrox / Marathon',
    iconColor: '#00E5FF'
  },
  {
    id: 'longevity',
    title: 'Vitality, Mobility & Longevity',
    subtitle: 'Optimize joint resilience, cellular energy, restorative sleep, and hormonal balance.',
    badge: 'Holistic Health',
    iconColor: '#FBBF24'
  }
];

export const EXPERIENCE_LEVELS = [
  { id: 'novice', label: 'Novice (0 - 1 Year)', desc: 'Building fundamental habits and clean movement mechanics' },
  { id: 'intermediate', label: 'Intermediate (1 - 3 Years)', desc: 'Consistent training seeking optimized nutrition and plateau breaking' },
  { id: 'advanced', label: 'Advanced (3+ Years)', desc: 'Fine-tuned periodization, micro-loading, and targeted supplementation' }
];

export const DIETARY_PREFERENCES = [
  { id: 'standard', label: 'High-Protein Balanced' },
  { id: 'plant', label: '100% Plant-Based / Vegan' },
  { id: 'keto', label: 'Low-Carb / Ketogenic' },
  { id: 'glutenfree', label: 'Gluten-Free Clean' }
];

export const GOAL_RECOMMENDATIONS_DATA = {
  muscle: {
    title: 'The Clean Hypertrophy Power Stack',
    headline: 'Engineered for rapid muscular protein synthesis and progressive overload recovery.',
    bundleDiscount: 'Save 15% Bundle Pricing',
    totalPrice: 9347,
    originalTotalPrice: 10997,
    products: [
      {
        id: 'prod-1',
        name: 'Gold Standard 100% Whey Isolate',
        brand: 'Optimum Nutrition',
        role: 'Post-Workout Rapid Amino Inflow',
        price: 6499
      },
      {
        id: 'prod-2',
        name: 'Creapure® Micronized Creatine',
        brand: 'Thorne Research',
        role: 'ATP Regeneration & Power Capacity',
        price: 2999
      },
      {
        id: 'prod-3',
        name: 'Apex Seamless Lifting Straps',
        brand: 'Gymshark',
        role: 'Grip Fatigue Elimination for Overload',
        price: 1499
      }
    ],
    workoutProtocol: {
      frequency: '4 - 5 Days / Week',
      focus: 'Push / Pull / Legs Hypertrophy Split',
      repRange: '6 - 12 Repetitions with 2-3 RIR',
      recoveryWindow: '48 Hours between identical muscle groups'
    },
    nutritionTarget: {
      proteinMultiplier: '2.0g - 2.2g per kg bodyweight',
      caloricSurplus: '+250 - 350 kcal clean surplus',
      hydrationGoal: '3.5 - 4.0 Liters daily'
    }
  },
  fatloss: {
    title: 'The Thermogenic Shred & Lean Definition Stack',
    headline: 'Formulated to protect muscle tissue during a calorie deficit while fueling intense sessions.',
    bundleDiscount: 'Save 18% Bundle Pricing',
    totalPrice: 9599,
    originalTotalPrice: 11797,
    products: [
      {
        id: 'prod-4',
        name: 'Pre-Kaged Elite Ultra Pre-Workout',
        brand: 'Kaged Muscle',
        role: 'High Energy & Focus in Caloric Deficit',
        price: 4999
      },
      {
        id: 'prod-8',
        name: 'Impact Whey Protein Isolate Natural',
        brand: 'MyProtein',
        role: 'Zero Sugar High-Protein Satiety',
        price: 4299
      },
      {
        id: 'prod-5',
        name: 'High Protein Soft Crisp Bars',
        brand: 'Barebells',
        role: 'Guilt-Free High Protein Snack',
        price: 2499
      }
    ],
    workoutProtocol: {
      frequency: '4 Days Weights + 2 Days Zone 2',
      focus: 'High Density Resistance + Low Impact Cardio',
      repRange: '8 - 15 Repetitions with tempo control',
      recoveryWindow: 'Daily step target: 10,000 - 12,000 steps'
    },
    nutritionTarget: {
      proteinMultiplier: '2.2g - 2.4g per kg bodyweight (High Satiety)',
      caloricSurplus: '-350 - 500 kcal deficit',
      hydrationGoal: '3.8 Liters daily'
    }
  },
  endurance: {
    title: 'The Hyrox & Tri-Endurance Engine Stack',
    headline: 'Optimized for cellular hydration, mitochondrial efficiency, and sustained tempo output.',
    bundleDiscount: 'Save 12% Bundle Pricing',
    totalPrice: 6773,
    originalTotalPrice: 7697,
    products: [
      {
        id: 'prod-2',
        name: 'Creapure® Micronized Creatine',
        brand: 'Thorne Research',
        role: 'Cellular Hydration & Anaerobic Glycolysis',
        price: 2999
      },
      {
        id: 'prod-7',
        name: 'Essential Multivitamin 3-in-1',
        brand: 'Thorne Research',
        role: 'Electrolyte & Micronutrient Replenishment',
        price: 3199
      },
      {
        id: 'prod-3',
        name: 'Apex Seamless Lifting Straps',
        brand: 'Gymshark',
        role: 'Ergonomic Support & Functional Pulls',
        price: 1499
      }
    ],
    workoutProtocol: {
      frequency: '5 Days / Week',
      focus: 'Polarized 80/20 Endurance & Functional Strength',
      repRange: '15 - 20 Reps + Zone 2 / Lactate Threshold Intervals',
      recoveryWindow: 'Full rest day with mobility'
    },
    nutritionTarget: {
      proteinMultiplier: '1.6g - 1.8g per kg bodyweight',
      caloricSurplus: 'Eucaloric (Maintenance with high glycogen)',
      hydrationGoal: '4.0 Liters daily + electrolytes'
    }
  },
  longevity: {
    title: 'The Cellular Vitality & Longevity Protocol',
    headline: 'Designed to support joint integrity, restorative deep sleep, and natural hormone balance.',
    bundleDiscount: 'Save 15% Bundle Pricing',
    totalPrice: 10367,
    originalTotalPrice: 12197,
    products: [
      {
        id: 'prod-7',
        name: 'Essential Multivitamin 3-in-1',
        brand: 'Thorne Research',
        role: 'Bioavailable Methylated Cellular Cofactors',
        price: 3199
      },
      {
        id: 'prod-1',
        name: 'Gold Standard 100% Whey Isolate',
        brand: 'Optimum Nutrition',
        role: 'Sarcopenia Defense & Lean Mass Preservation',
        price: 6499
      },
      {
        id: 'prod-5',
        name: 'High Protein Soft Crisp Bars',
        brand: 'Barebells',
        role: 'Low Glycemic Satiety Snack',
        price: 2499
      }
    ],
    workoutProtocol: {
      frequency: '3 - 4 Days / Week',
      focus: 'Mobility, Functional Balance & Resistance',
      repRange: '10 - 15 Reps with eccentric control',
      recoveryWindow: 'Sauna, cold plunges, and 8 hours sleep'
    },
    nutritionTarget: {
      proteinMultiplier: '1.6g - 2.0g per kg bodyweight',
      caloricSurplus: 'Clean anti-inflammatory whole food baseline',
      hydrationGoal: '3.0 Liters daily'
    }
  }
};
