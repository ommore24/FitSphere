// Multi-Brand Fitness & Nutrition Catalog (All prices in Indian Rupees ₹ / INR)

export const CATEGORIES = [
  'All Products',
  'Protein',
  'Vitamins & Supplements',
  'Sports Nutrition',
  'Healthy Foods',
  'Fitness Accessories',
  'Wellness Products',
  'Recovery Products'
];

export const BRANDS = [
  'All Brands',
  'MuscleBlaze',
  'Optimum Nutrition',
  'Fast&Up',
  'Thorne Research',
  'Cellucor',
  'The Whole Truth',
  'Yoga Bar',
  'Kobo',
  'Boldfit',
  'Kapiva',
  'Organic India',
  'Hyperice',
  'Dr Trust'
];

export const FITNESS_GOALS = [
  'All Goals',
  'Muscle Building',
  'Weight Loss',
  'General Fitness',
  'Endurance',
  'Recovery'
];

export const DIETARY_PREFERENCES = [
  'All Diets',
  'Vegetarian',
  'Non-Vegetarian',
  'High Protein',
  'Sugar Free',
  'Gluten Free',
  'Keto',
  'Lactose Free',
  'Organic'
];

export const MOCK_PRODUCTS = [
  {
    id: '11111111-1111-1111-1111-111111110001',
    name: 'Biozyme Whey Isolate 100% Ultra-Pure',
    brand: 'MuscleBlaze',
    category: 'Protein',
    price: 6499,
    originalPrice: 7999,
    discount: 19,
    rating: 4.9,
    reviewsCount: 482,
    stock: 35,
    inStock: true,
    tag: 'Best Seller',
    tagColor: 'mint',
    flavor: 'Belgian Chocolate',
    weight: '2 kg (4.4 lbs)',
    description: 'Clinically evaluated enhanced absorption formula delivering 27g of pure isolate protein per scoop with certified 50% higher protein absorption.',
    ingredients: 'Whey Protein Isolate, Enhanced Absorption Formula (EAF®), Digestive Enzyme Blend, Natural & Artificial Flavors, Sucralose.',
    nutrition: {
      serving_size: '31g (1 Scoop)',
      protein_g: 27,
      carbs_g: 1.2,
      fat_g: 0.5,
      calories: 118,
      bcaa_g: 5.96
    },
    servingInfo: '1 Rounded Scoop (31g) mixed with 200-240ml cold water post-workout',
    allergenInfo: 'Contains Milk (Whey). Manufactured in a facility that also processes soy and nuts.',
    sellerName: 'MuscleBlaze Official Store',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    iconColor: '#00F59B',
    isFeatured: true,
    goals: ['Muscle Building', 'Recovery'],
    dietaryTags: ['Vegetarian', 'High Protein', 'Gluten Free'],
    images: [
      { url: '/images/products/mb_biozyme.jpg', alt: 'Biozyme Whey Isolate Front', isPrimary: true }
    ],
    image: '/images/products/mb_biozyme.jpg',
    reviews: [
          {
                "id": "rev-101",
                "userName": "Vikram Sharma",
                "avatarInitials": "VS",
                "rating": 5,
                "date": "Verified Buyer • 4 days ago",
                "title": "Zero bloating, exceptional mixability!",
                "comment": "I have tried multiple isolates over 6 years of training, but MB Biozyme really delivers on the absorption claim. The digestive enzymes make a huge difference, leaving no heavy feeling post-workout.",
                "helpfulCount": 34
          },
          {
                "id": "rev-102",
                "userName": "Neha Kapoor",
                "avatarInitials": "NK",
                "rating": 5,
                "date": "Verified Buyer • 1 week ago",
                "title": "Authenticity verified, tastes incredible",
                "comment": "Verified the scratch code on the MuscleBlaze portal instantly. Belgian Chocolate with cold almond milk tastes like a cafe shake. 27g pure protein per scoop keeps me hitting my macros.",
                "helpfulCount": 28
          },
          {
                "id": "rev-103",
                "userName": "Rahul Verma",
                "avatarInitials": "RV",
                "rating": 4,
                "date": "Verified Buyer • 2 weeks ago",
                "title": "Noticeable recovery speed and lean gains",
                "comment": "Great results in muscle recovery and fullness. Slightly premium price, but the quality and scoop-on-top packaging make it worth every rupee.",
                "helpfulCount": 15
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110002',
    name: 'Gold Standard 100% Whey Double Rich',
    brand: 'Optimum Nutrition',
    category: 'Protein',
    price: 7299,
    originalPrice: 8999,
    discount: 19,
    rating: 4.9,
    reviewsCount: 839,
    stock: 42,
    inStock: true,
    tag: 'Global Icon',
    tagColor: 'cyan',
    flavor: 'Double Rich Chocolate',
    weight: '2.27 kg (5 lbs)',
    description: 'The world’s most trusted whey protein blend featuring micro-filtered whey protein isolates with 5.5g naturally occurring BCAAs.',
    ingredients: 'Protein Blend (Whey Protein Isolates, Whey Protein Concentrate, Whey Peptides), Cocoa, Natural Flavors, Lecithin, Acesulfame Potassium.',
    nutrition: {
      serving_size: '30.4g (1 Scoop)',
      protein_g: 24,
      carbs_g: 3.0,
      fat_g: 1.0,
      calories: 120,
      bcaa_g: 5.5
    },
    servingInfo: '1 Scoop (30.4g) in 180-240ml water or skimmed milk',
    allergenInfo: 'Contains Milk and Soy (Lecithin). Gluten Free.',
    sellerName: 'Optimum Nutrition India',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.18) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#00E5FF',
    isFeatured: true,
    goals: ['Muscle Building', 'General Fitness', 'Recovery'],
    dietaryTags: ['Vegetarian', 'High Protein', 'Gluten Free'],
    images: [
      { url: '/images/products/on_gold.jpeg', alt: 'Gold Standard Whey Canister', isPrimary: true }
    ],
    image: '/images/products/on_gold.jpeg',
    reviews: [
          {
                "id": "rev-201",
                "userName": "Siddharth Rao",
                "avatarInitials": "SR",
                "rating": 5,
                "date": "Verified Buyer • 3 days ago",
                "title": "The Gold Standard for a reason",
                "comment": "Double Rich Chocolate mixes effortlessly in a standard shaker with zero clumps. Consistent recovery and steady strength progress across heavy push-pull cycles.",
                "helpfulCount": 42
          },
          {
                "id": "rev-202",
                "userName": "Ananya Deshmukh",
                "avatarInitials": "AD",
                "rating": 5,
                "date": "Verified Buyer • 1 week ago",
                "title": "Authentic imported batch with hologram",
                "comment": "Genuine Optimum Nutrition tub with verification seal. Best all-round daily whey for oatmeal bowls and post-workout smoothies.",
                "helpfulCount": 22
          },
          {
                "id": "rev-203",
                "userName": "Karan Singhania",
                "avatarInitials": "KS",
                "rating": 4,
                "date": "Verified Buyer • 3 weeks ago",
                "title": "Smooth flavor profile that is not overly sweet",
                "comment": "Naturally occurring 5.5g BCAAs help immensely with DOMS after heavy squat sessions. Reliable everyday staple.",
                "helpfulCount": 19
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110003',
    name: 'Vitalize Daily Multivitamin + Minerals',
    brand: 'Fast&Up',
    category: 'Vitamins & Supplements',
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.7,
    reviewsCount: 312,
    stock: 60,
    inStock: true,
    tag: 'Effervescent',
    tagColor: 'mint',
    flavor: 'Orange Burst',
    weight: '20 Effervescent Tablets',
    description: 'All-in-one daily multivitamin with 21 essential nutrients and natural beetroot extract in convenient effervescent tablets for rapid absorption.',
    ingredients: 'Vitamins A, B-Complex, C, D3, E, K, Zinc, Magnesium, Calcium, Beetroot Extract, Citric Acid, Sodium Bicarbonate.',
    nutrition: {
      serving_size: '1 Tablet (4g)',
      protein_g: 0.1,
      carbs_g: 0.8,
      fat_g: 0.0,
      calories: 8,
      bcaa_g: 0
    },
    servingInfo: 'Drop 1 tablet in 250ml cold water, allow to dissolve completely and drink with breakfast',
    allergenInfo: '100% Vegetarian. Sugar-free and gentle on the stomach.',
    sellerName: 'Aeronutrix Life Science',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#FBBF24',
    isFeatured: false,
    goals: ['General Fitness', 'Endurance'],
    dietaryTags: ['Vegetarian', 'Sugar Free', 'Gluten Free'],
    images: [
      { url: '/images/products/vitalize.jpg', alt: 'Fast&Up Vitalize Tube', isPrimary: true }
    ],
    image: '/images/products/vitalize.jpg',
    reviews: [
          {
                "id": "rev-301",
                "userName": "Aditya Joshi",
                "avatarInitials": "AJ",
                "rating": 5,
                "date": "Verified Buyer • 5 days ago",
                "title": "Refreshing morning energy drink!",
                "comment": "Replaced traditional chalky pills with this effervescent tablet. Orange burst flavor is delicious, and I noticed much better afternoon focus and energy.",
                "helpfulCount": 18
          },
          {
                "id": "rev-302",
                "userName": "Pooja Sundaram",
                "avatarInitials": "PS",
                "rating": 5,
                "date": "Verified Buyer • 2 weeks ago",
                "title": "Gentle on stomach and clean beetroot boost",
                "comment": "100% vegetarian with natural beetroot extract. Gives a clean stamina surge during my 10k morning run workouts.",
                "helpfulCount": 14
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110004',
    name: 'Basic Nutrients 2/Day Clinical Formula',
    brand: 'Thorne Research',
    category: 'Vitamins & Supplements',
    price: 3499,
    originalPrice: 3999,
    discount: 13,
    rating: 4.9,
    reviewsCount: 195,
    stock: 25,
    inStock: true,
    tag: 'Clinical Grade',
    tagColor: 'cyan',
    flavor: 'Vegetarian Capsules',
    weight: '60 Capsules (30-Day Supply)',
    description: 'Comprehensive daily multivitamin with chelated minerals and active methylated vitamins for optimal bioavailability.',
    ingredients: 'Active Folate (5-MTHF), Methylcobalamin, Vitamin D3, Zinc Bisglycinate, Magnesium Malate, Boron, Hypromellose Capsule.',
    nutrition: {
      serving_size: '2 Capsules',
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      calories: 0,
      bcaa_g: 0
    },
    servingInfo: 'Take 2 capsules daily with a meal or as recommended by your health practitioner',
    allergenInfo: 'Free from gluten, dairy, yeast, artificial colors, and preservatives.',
    sellerName: 'Thorne Direct India',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.2) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#00E5FF',
    isFeatured: false,
    goals: ['General Fitness', 'Recovery'],
    dietaryTags: ['Vegetarian', 'Gluten Free', 'Sugar Free'],
    images: [
      { url: '/images/products/thorne_basic.jpg', alt: 'Thorne Basic Nutrients Bottle', isPrimary: true }
    ],
    image: '/images/products/thorne_basic.jpg',
    reviews: [
          {
                "id": "rev-401",
                "userName": "Dr. Rajiv Menon",
                "avatarInitials": "RM",
                "rating": 5,
                "date": "Verified Buyer • 1 week ago",
                "title": "Highest clinical purity multivitamin",
                "comment": "Chelated minerals and active methylated 5-MTHF folate offer superior cellular bioavailability over generic drugstore vitamins. Recommended to all serious athletes.",
                "helpfulCount": 51
          },
          {
                "id": "rev-402",
                "userName": "Meera Iyer",
                "avatarInitials": "MI",
                "rating": 5,
                "date": "Verified Buyer • 2 weeks ago",
                "title": "Noticeable difference in hair, nails & vitality",
                "comment": "Within two weeks of taking 2 capsules daily with breakfast, daytime fatigue vanished. Thorne standards are leagues ahead.",
                "helpfulCount": 27
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110005',
    name: 'CreAMP Micronized Creatine Monohydrate',
    brand: 'MuscleBlaze',
    category: 'Sports Nutrition',
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.8,
    reviewsCount: 654,
    stock: 75,
    inStock: true,
    tag: 'Top Rated',
    tagColor: 'mint',
    flavor: 'Unflavored Pure',
    weight: '250 grams (83 Servings)',
    description: 'Micro-refined pharmaceutical grade creatine monohydrate engineered for high solubility, ATP regeneration, and strength gains.',
    ingredients: '100% Pure Micronized Creatine Monohydrate (CreAMP).',
    nutrition: {
      serving_size: '3g (1 Scoop)',
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      calories: 0,
      bcaa_g: 0
    },
    servingInfo: 'Add 1 scoop (3g) to 200ml cold water, juice, or protein shake post-workout',
    allergenInfo: 'Zero allergens. Produced in a certified clean facility.',
    sellerName: 'MuscleBlaze Official Store',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    iconColor: '#00F59B',
    isFeatured: true,
    goals: ['Muscle Building', 'Endurance'],
    dietaryTags: ['Vegetarian', 'Gluten Free', 'Sugar Free', 'Keto'],
    images: [
      { url: '/images/products/mb_creatine.png', alt: 'MuscleBlaze CreAMP Tub', isPrimary: true }
    ],
    image: '/images/products/mb_creatine.png',
    reviews: [
          {
                "id": "rev-501",
                "userName": "Harsh Vardhan",
                "avatarInitials": "HV",
                "rating": 5,
                "date": "Verified Buyer • 4 days ago",
                "title": "Broke my bench press plateau in 3 weeks!",
                "comment": "CreAMP dissolves noticeably faster than standard creatine without leaving sand at the bottom of the glass. Added 5kg to my working sets.",
                "helpfulCount": 39
          },
          {
                "id": "rev-502",
                "userName": "Tanmay Bhatt",
                "avatarInitials": "TB",
                "rating": 5,
                "date": "Verified Buyer • 1 week ago",
                "title": "Zero stomach distress, rapid saturation",
                "comment": "Pure micronized powder. Intracellular water retention gave my delts and chest a much fuller appearance. 83 servings lasts nearly 3 months.",
                "helpfulCount": 25
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110006',
    name: 'C4 Original Explosive Pre-Workout',
    brand: 'Cellucor',
    category: 'Sports Nutrition',
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    rating: 4.8,
    reviewsCount: 520,
    stock: 30,
    inStock: true,
    tag: 'High Energy',
    tagColor: 'coral',
    flavor: 'Fruit Punch',
    weight: '390 grams (60 Servings)',
    description: 'America’s #1 pre-workout with CarnoSyn Beta-Alanine for muscular endurance and TeaCrine for long-lasting clean mental drive.',
    ingredients: 'Beta-Alanine, Creatine Nitrate, Arginine AKG, Explosive Energy Blend (Caffeine Anhydrous 150mg, Velvet Bean extract), Citric Acid.',
    nutrition: {
      serving_size: '6.5g (1 Scoop)',
      protein_g: 0,
      carbs_g: 1.0,
      fat_g: 0,
      calories: 5,
      bcaa_g: 0
    },
    servingInfo: 'Take 1 scoop with 180ml of water 20-30 minutes prior to intense physical training',
    allergenInfo: 'Contains 150mg caffeine per serving. Not recommended for children or pregnant women.',
    sellerName: 'NutraKart Global',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.22) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#FF6B35',
    isFeatured: false,
    goals: ['Endurance', 'Muscle Building'],
    dietaryTags: ['Vegetarian', 'Sugar Free', 'Gluten Free'],
    images: [
      { url: '/images/products/c4_original.png', alt: 'Cellucor C4 Tub', isPrimary: true }
    ],
    image: '/images/products/c4_original.png',
    reviews: [
          {
                "id": "rev-601",
                "userName": "Aryan Malhotra",
                "avatarInitials": "AM",
                "rating": 5,
                "date": "Verified Buyer • 2 days ago",
                "title": "Laser focus and explosive endurance",
                "comment": "Beta-alanine tingles start within 15 minutes. Great vascularity and zero jittery crash after tough 90-minute workouts.",
                "helpfulCount": 33
          },
          {
                "id": "rev-602",
                "userName": "Sneha Reddy",
                "avatarInitials": "SR",
                "rating": 4,
                "date": "Verified Buyer • 1 week ago",
                "title": "Fruit Punch is sweet and crisp",
                "comment": "Gives me that vital spark after a tiring workday to smash PRs in the gym. One rounded scoop is the sweet spot.",
                "helpfulCount": 16
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110007',
    name: '100% Whey Clean Protein Bar (Pack of 12)',
    brand: 'The Whole Truth',
    category: 'Healthy Foods',
    price: 1440,
    originalPrice: 1680,
    discount: 14,
    rating: 4.9,
    reviewsCount: 390,
    stock: 50,
    inStock: true,
    tag: 'Zero Sugar',
    tagColor: 'mint',
    flavor: 'Cocoa Cranberry & Almond',
    weight: '12 x 52g Bars',
    description: 'Clean label whole food protein bar with 15g whey isolate, sweetened solely by raw dates. Zero added sugar, zero artificial sweeteners.',
    ingredients: 'Dates (40%), Whey Protein Isolate (28%), Almonds (18%), Raw Cocoa (10%), Cranberries (4%).',
    nutrition: {
      serving_size: '52g (1 Bar)',
      protein_g: 15,
      carbs_g: 22.0,
      fat_g: 6.5,
      calories: 206,
      bcaa_g: 3.2
    },
    servingInfo: 'Ready-to-eat anytime nutritious high-protein snack, travel fuel, or pre/post workout energy bar',
    allergenInfo: 'Contains Tree Nuts (Almonds) and Milk (Whey). Gluten Free.',
    sellerName: 'The Whole Truth Foods',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    iconColor: '#00F59B',
    isFeatured: true,
    goals: ['Muscle Building', 'Weight Loss', 'General Fitness'],
    dietaryTags: ['Vegetarian', 'High Protein', 'Gluten Free', 'Sugar Free'],
    images: [
      { url: '/images/products/whole_truth_bar.jpg', alt: 'The Whole Truth Bar Pack', isPrimary: true }
    ],
    image: '/images/products/whole_truth_bar.jpg',
    reviews: [
          {
                "id": "rev-701",
                "userName": "Ritu Sen",
                "avatarInitials": "RS",
                "rating": 5,
                "date": "Verified Buyer • 3 days ago",
                "title": "Zero artificial sweeteners or chemical aftertaste",
                "comment": "Just dates, almonds, cocoa, and pure whey isolate. Texture is soft, chewy, and naturally satisfying. My daily 4 PM snack at work.",
                "helpfulCount": 31
          },
          {
                "id": "rev-702",
                "userName": "Abhishek Kulkarni",
                "avatarInitials": "AK",
                "rating": 5,
                "date": "Verified Buyer • 2 weeks ago",
                "title": "Cleanest protein bar in India",
                "comment": "15g protein per bar with zero bloating. Whole Truth transparency in ingredients is genuinely unmatched.",
                "helpfulCount": 23
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110008',
    name: 'Slow Roasted All-Natural Dark Chocolate Peanut Butter',
    brand: 'Yoga Bar',
    category: 'Healthy Foods',
    price: 499,
    originalPrice: 649,
    discount: 23,
    rating: 4.7,
    reviewsCount: 710,
    stock: 80,
    inStock: true,
    tag: 'All Natural',
    tagColor: 'mint',
    flavor: 'Dark Chocolate Crunchy',
    weight: '1 kg Jar',
    description: 'Slow-roasted premium slow-ground slow-batch peanuts with Belgian dark cocoa and organic coconut sugar. High fiber and clean plant protein.',
    ingredients: 'Roasted Peanuts (85%), Dark Chocolate & Cocoa (10%), Organic Coconut Sugar (5%).',
    nutrition: {
      serving_size: '32g (2 Tablespoons)',
      protein_g: 9,
      carbs_g: 7.0,
      fat_g: 14.0,
      calories: 190,
      bcaa_g: 1.5
    },
    servingInfo: 'Spread 2 tablespoons (32g) on whole wheat toast, oatmeal, or blend in shakes',
    allergenInfo: 'Contains Peanuts. Manufactured in a facility handling tree nuts.',
    sellerName: 'Sproutlife Foods',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#FBBF24',
    isFeatured: false,
    goals: ['Weight Loss', 'General Fitness', 'Muscle Building'],
    dietaryTags: ['Vegetarian', 'High Protein', 'Gluten Free'],
    images: [
      { url: '/images/products/yogabar_pb.jpg', alt: 'Yoga Bar Peanut Butter Jar', isPrimary: true }
    ],
    image: '/images/products/yogabar_pb.jpg',
    reviews: [
          {
                "id": "rev-801",
                "userName": "Kabir Sen",
                "avatarInitials": "KS",
                "rating": 5,
                "date": "Verified Buyer • 2 days ago",
                "title": "Unbelievable rich dark cocoa flavor",
                "comment": "Zero palm oil and zero hydrogenated oils. Real peanut crunch with Belgian dark cocoa. Tastes decadent yet fits my clean bulking macros perfectly.",
                "helpfulCount": 46
          },
          {
                "id": "rev-802",
                "userName": "Shreya Mukherjee",
                "avatarInitials": "SM",
                "rating": 5,
                "date": "Verified Buyer • 1 week ago",
                "title": "Best peanut butter on the market",
                "comment": "Spreads smoothly on toasted multigrain bread with sliced bananas. The natural coconut sugar sweetness is subtle and perfect.",
                "helpfulCount": 29
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110009',
    name: 'Heavy Duty Neoprene 6-Inch Weight Lifting Belt',
    brand: 'Kobo',
    category: 'Fitness Accessories',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviewsCount: 310,
    stock: 40,
    inStock: true,
    tag: 'Core Support',
    tagColor: 'cyan',
    flavor: 'Stealth Matte Black',
    weight: '550 grams (Medium 32-38")',
    description: 'Ergonomically contoured 6-inch lumbar support belt with quick-locking steel roller buckle for heavy squats, deadlifts, and overhead presses.',
    ingredients: 'High density EVA foam core, dual-stitched ballistic nylon, heavy gauge steel quick lock buckle.',
    nutrition: null,
    servingInfo: 'Fasten snugly around core midway between ribs and hips prior to heavy lifting sets',
    allergenInfo: 'Synthetic materials. Hypoallergenic breathable interior lining.',
    sellerName: 'Kobo Sports India',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.2) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#00E5FF',
    isFeatured: false,
    goals: ['Muscle Building', 'Endurance'],
    dietaryTags: [],
    images: [
      { url: '/images/products/kobo_belt.jpg', alt: 'Kobo Lifting Belt', isPrimary: true }
    ],
    image: '/images/products/kobo_belt.jpg',
    reviews: [
          {
                "id": "rev-901",
                "userName": "Manpreet Singh",
                "avatarInitials": "MS",
                "rating": 5,
                "date": "Verified Buyer • 5 days ago",
                "title": "Rock solid lumbar support for heavy squats",
                "comment": "Hit a 180kg squat PR with total confidence. The steel roller buckle locks securely and does not pop off under maximum abdominal pressure.",
                "helpfulCount": 24
          },
          {
                "id": "rev-902",
                "userName": "Sameer Khan",
                "avatarInitials": "SK",
                "rating": 4,
                "date": "Verified Buyer • 2 weeks ago",
                "title": "Comfortable contouring without bruising ribs",
                "comment": "Much more ergonomic than stiff leather belts. Neoprene core provides firm bracing with zero pinching.",
                "helpfulCount": 17
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110010',
    name: 'Anti-Skid Pro Eco-TPE Dual Tone 6mm Yoga Mat',
    brand: 'Boldfit',
    category: 'Fitness Accessories',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.7,
    reviewsCount: 940,
    stock: 65,
    inStock: true,
    tag: 'Eco-Friendly',
    tagColor: 'mint',
    flavor: 'Dual Tone Emerald/Black',
    weight: '900 grams (183cm x 61cm)',
    description: 'Dense 6mm dual-side non-slip textured TPE mat designed for joint cushioning, stability, and sweat-resistant grip during high-intensity training.',
    ingredients: 'Biodegradable TPE (Thermoplastic Elastomer). Free of PVC and latex.',
    nutrition: null,
    servingInfo: 'Unroll on flat surface. Clean with damp cloth and mild cleanser after vigorous workout',
    allergenInfo: 'Latex-free and PVC-free.',
    sellerName: 'Boldfit Prime Retails',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    iconColor: '#00F59B',
    isFeatured: false,
    goals: ['General Fitness', 'Recovery'],
    dietaryTags: [],
    images: [
      { url: '/images/products/boldfit_mat.jpg', alt: 'Boldfit Pro Yoga Mat', isPrimary: true }
    ],
    image: '/images/products/boldfit_mat.jpg',
    reviews: [
          {
                "id": "rev-1001",
                "userName": "Shalini Mishra",
                "avatarInitials": "SM",
                "rating": 5,
                "date": "Verified Buyer • 3 days ago",
                "title": "Zero slip during sweaty vinyasa flows",
                "comment": "6mm density cushions knees and elbows perfectly on marble floors. Beautiful emerald dual-tone color and completely free of toxic chemical smell.",
                "helpfulCount": 38
          },
          {
                "id": "rev-1002",
                "userName": "Nikhil Jain",
                "avatarInitials": "NJ",
                "rating": 4,
                "date": "Verified Buyer • 1 week ago",
                "title": "Durable grip and easy to carry",
                "comment": "Comes with a neat carrying strap and breathable bag. Grips firmly to the floor without curling at the edges.",
                "helpfulCount": 15
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110011',
    name: 'Pure Himalayan Shilajit Gold Resin with Gold Vark',
    brand: 'Kapiva',
    category: 'Wellness Products',
    price: 1799,
    originalPrice: 2299,
    discount: 22,
    rating: 4.8,
    reviewsCount: 420,
    stock: 55,
    inStock: true,
    tag: 'Ayurvedic Pure',
    tagColor: 'coral',
    flavor: 'Earthy Natural Resin',
    weight: '20 grams with Brass Spoon',
    description: 'Sourced from altitudes above 18,000 feet in the Himalayas. Lab-tested with >60% Fulvic Acid and enriched with 24K Gold Vark for stamina and vigor.',
    ingredients: '100% Shodhit Himalayan Shilajit Resin, Swarna Vark (24K Gold Ash).',
    nutrition: null,
    servingInfo: 'Dissolve pea-sized ball (250mg) in 150ml warm milk or lukewarm water once daily on an empty stomach',
    allergenInfo: 'Natural mineral resin. Consult physician if you have gout or high uric acid levels.',
    sellerName: 'Kapiva Wellness Official',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.2) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#FF6B35',
    isFeatured: true,
    goals: ['General Fitness', 'Endurance', 'Recovery'],
    dietaryTags: ['Vegetarian', 'Organic', 'Gluten Free'],
    images: [
      { url: '/images/products/kapiva_shilajit.jpg', alt: 'Kapiva Shilajit Jar', isPrimary: true }
    ],
    image: '/images/products/kapiva_shilajit.jpg',
    reviews: [
          {
                "id": "rev-1101",
                "userName": "Harish Chandra",
                "avatarInitials": "HC",
                "rating": 5,
                "date": "Verified Buyer • 4 days ago",
                "title": "Authentic Himalayan resin with 24K gold",
                "comment": "Dissolves cleanly in warm milk leaving zero residue. The lab-tested certificate of analysis gives total peace of mind regarding heavy metals.",
                "helpfulCount": 44
          },
          {
                "id": "rev-1102",
                "userName": "Rajesh Pillai",
                "avatarInitials": "RP",
                "rating": 5,
                "date": "Verified Buyer • 2 weeks ago",
                "title": "Noticeable stamina boost in gym and daily work",
                "comment": "A pea-sized scoop each morning has significantly boosted my endurance and recovery from high volume leg sessions.",
                "helpfulCount": 27
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110012',
    name: 'Organic Certified Ashwagandha Anti-Stress & Vitality',
    brand: 'Organic India',
    category: 'Wellness Products',
    price: 495,
    originalPrice: 550,
    discount: 10,
    rating: 4.8,
    reviewsCount: 380,
    stock: 90,
    inStock: true,
    tag: 'Adaptogen',
    tagColor: 'mint',
    flavor: 'Organic Vegetarian Capsules',
    weight: '60 Veg Capsules',
    description: 'Certified organic adaptogenic herb that promotes restful sleep, adrenal balance, cortisol regulation, and overall cellular vitality.',
    ingredients: 'Organic Ashwagandha Root (Withania somnifera) 400mg, Vegetable Cellulose Capsule.',
    nutrition: null,
    servingInfo: 'Take 2 capsules twice daily with food or water, preferably before bedtime',
    allergenInfo: '100% Certified Organic. Suitable for vegans.',
    sellerName: 'Organic India Direct',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    iconColor: '#00F59B',
    isFeatured: false,
    goals: ['Recovery', 'General Fitness'],
    dietaryTags: ['Vegetarian', 'Organic', 'Gluten Free', 'Sugar Free'],
    images: [
      { url: '/images/products/organic_india_ashwa.jpg', alt: 'Organic India Ashwagandha Bottle', isPrimary: true }
    ],
    image: '/images/products/organic_india_ashwa.jpg',
    reviews: [
          {
                "id": "rev-1201",
                "userName": "Sunita Roy",
                "avatarInitials": "SR",
                "rating": 5,
                "date": "Verified Buyer • 6 days ago",
                "title": "Significantly lowers evening stress & cortisol",
                "comment": "Sleep quality has deepened tremendously. I wake up rested and ready to train without any morning grogginess. Organic India quality is consistent.",
                "helpfulCount": 32
          },
          {
                "id": "rev-1202",
                "userName": "Dr. Alok Mathur",
                "avatarInitials": "AM",
                "rating": 5,
                "date": "Verified Buyer • 3 weeks ago",
                "title": "Pure root extract in vegetarian capsules",
                "comment": "Standardized potency without artificial flow agents. Highly recommended for active individuals managing work and training fatigue.",
                "helpfulCount": 21
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110013',
    name: 'Hypervolt GO 2 Ultra-Lightweight Percussion Massage Gun',
    brand: 'Hyperice',
    category: 'Recovery Products',
    price: 14999,
    originalPrice: 17999,
    discount: 17,
    rating: 4.9,
    reviewsCount: 215,
    stock: 18,
    inStock: true,
    tag: 'Therapy Grade',
    tagColor: 'cyan',
    flavor: 'Arctic White Finish',
    weight: '680 grams (Pocket Portable)',
    description: 'Patented QuietGlide® brushless 40W high-torque motor delivering 3 speeds of targeted percussion to melt away tension and speed athletic recovery.',
    ingredients: 'High-grade polycarbonate casing, rechargeable lithium-ion battery (3 hours run time), brushless motor.',
    nutrition: null,
    servingInfo: 'Apply to sore muscle groups for 60-90 seconds per muscle belly pre or post workout',
    allergenInfo: 'Electronic medical/wellness device. Do not use over open wounds, bone fractures, or throat.',
    sellerName: 'Hyperice Authorized Retailer',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.22) 0%, rgba(15, 23, 42, 0.95) 75%)',
    iconColor: '#00E5FF',
    isFeatured: true,
    goals: ['Recovery', 'General Fitness'],
    dietaryTags: [],
    images: [
      { url: '/images/products/hypervolt_go2.jpg', alt: 'Hypervolt GO 2 Device', isPrimary: true }
    ],
    image: '/images/products/hypervolt_go2.jpg',
    reviews: [
          {
                "id": "rev-1301",
                "userName": "Pradeep Kumar",
                "avatarInitials": "PK",
                "rating": 5,
                "date": "Verified Buyer • 5 days ago",
                "title": "Whisper quiet with deep percussive punch",
                "comment": "Compact enough for my travel bag, but has enough stall force to release stubborn knots in my traps and hamstrings within minutes.",
                "helpfulCount": 29
          },
          {
                "id": "rev-1302",
                "userName": "Monica D'Souza",
                "avatarInitials": "MD",
                "rating": 5,
                "date": "Verified Buyer • 2 weeks ago",
                "title": "Battery lasts weeks, ergonomic angle",
                "comment": "Reaches the mid-back effortlessly. Outstanding build quality and aesthetic arctic white design.",
                "helpfulCount": 18
          }
    ]
  },
  {
    id: '11111111-1111-1111-1111-111111110014',
    name: 'High Density EPP Deep Tissue Trigger Point Foam Roller',
    brand: 'Dr Trust',
    category: 'Recovery Products',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.6,
    reviewsCount: 540,
    stock: 50,
    inStock: true,
    tag: 'Myofascial',
    tagColor: 'mint',
    flavor: 'Textured Grid Black/Lime',
    weight: '45cm x 14cm (High Density)',
    description: 'Multi-density grid pattern simulates the hands of a sports massage therapist to release myofascial trigger points in calves, lats, and spine.',
    ingredients: '100% Recyclable Expanded Polypropylene (EPP) Core.',
    nutrition: null,
    servingInfo: 'Roll slowly over tight muscles for 30-60 seconds. Pause on tender spots for deep myofascial release',
    allergenInfo: 'Non-toxic, sweat-proof, odor-free, eco-friendly foam.',
    sellerName: 'Dr Trust Medical Store',
    verified: 'Verified',
    imageBg: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    iconColor: '#00F59B',
    isFeatured: false,
    goals: ['Recovery', 'General Fitness'],
    dietaryTags: [],
    images: [
      { url: '/images/products/drtrust_roller.jpg', alt: 'Dr Trust Foam Roller', isPrimary: true }
    ],
    image: '/images/products/drtrust_roller.jpg',
    reviews: [
      {
        id: "rev-1401",
        userName: "Gaurav Malhotra",
        avatarInitials: "GM",
        rating: 5,
        date: "Verified Buyer • 5 days ago",
        title: "Rigid and durable, doesn't deform under body weight",
        comment: "Excellent high-density EPP foam. Doesn't bend or lose firmness even when rolling out tight IT bands and upper back knots. Fantastic relief after deadlift days.",
        helpfulCount: 24
      },
      {
        id: "rev-1402",
        userName: "Pooja Hegde",
        avatarInitials: "PH",
        rating: 4,
        date: "Verified Buyer • 2 weeks ago",
        title: "Great grid texture for deep tissue trigger points",
        comment: "The grid texture digs deep into the thoracic spine and glutes. Lightweight enough to carry along to the gym or crossfit sessions.",
        helpfulCount: 16
      }
    ]
  }
];
