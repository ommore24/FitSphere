-- ==============================================================================
-- FitSphere Part 3: Multi-Brand Marketplace Schema & Seed Migration
-- Run this script in the Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Create table public.products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  brand text not null,
  category text not null check (category in (
    'Protein',
    'Vitamins & Supplements',
    'Sports Nutrition',
    'Healthy Foods',
    'Fitness Accessories',
    'Wellness Products',
    'Recovery Products'
  )),
  price_inr numeric(10,2) not null check (price_inr >= 0),
  original_price_inr numeric(10,2),
  discount_percentage numeric(5,2) default 0,
  rating numeric(3,2) default 4.8,
  review_count integer default 120,
  stock_quantity integer not null default 50 check (stock_quantity >= 0),
  description text,
  ingredients text,
  nutrition_information jsonb default '{}'::jsonb,
  serving_information text,
  allergen_information text,
  seller_name text default 'FitSphere Certified Merchant',
  verification_status text default 'Verified' check (verification_status in ('Verified', 'Pending', 'Under Audit')),
  flavor text,
  package_weight text,
  tag text,
  tag_color text default 'mint',
  image_bg text default 'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
  icon_color text default '#00F59B',
  is_featured boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Create table public.product_images
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  image_url text not null,
  display_order integer default 0,
  is_primary boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. Create table public.product_goals
create table if not exists public.product_goals (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  goal text not null check (goal in (
    'Fat Loss',
    'Weight Gain',
    'Muscle Gain',
    'Strength',
    'Endurance',
    'General Fitness',
    'Body Recomposition',
    'Posture & Mobility'
  )),
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique(product_id, goal)
);

-- 4. Create table public.product_dietary_tags
create table if not exists public.product_dietary_tags (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  tag text not null check (tag in (
    'Vegetarian',
    'Vegan',
    'Eggetarian',
    'Non-Vegetarian',
    'High Protein',
    'Sugar Free',
    'Gluten Free',
    'Keto',
    'Lactose Free',
    'Organic'
  )),
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique(product_id, tag)
);

-- 5. Create table public.wishlists (User Persistent Wishlist)
create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- 6. Create table public.cart_items (User Persistent Cart)
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on catalog tables
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_goals enable row level security;
alter table public.product_dietary_tags enable row level security;

-- Public read policies for catalog tables
create policy "Allow public read access for products"
  on public.products for select using (true);

create policy "Allow public read access for product_images"
  on public.product_images for select using (true);

create policy "Allow public read access for product_goals"
  on public.product_goals for select using (true);

create policy "Allow public read access for product_dietary_tags"
  on public.product_dietary_tags for select using (true);

-- Enable RLS on user commerce tables
alter table public.wishlists enable row level security;
alter table public.cart_items enable row level security;

-- Wishlists: Authenticated users can only read, insert, and delete their own rows
create policy "Users can view own wishlist"
  on public.wishlists for select
  using (auth.uid() = user_id);

create policy "Users can insert to own wishlist"
  on public.wishlists for insert
  with check (auth.uid() = user_id);

create policy "Users can delete from own wishlist"
  on public.wishlists for delete
  using (auth.uid() = user_id);

-- Cart Items: Authenticated users can only read, insert, update, and delete their own rows
create policy "Users can view own cart items"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can insert to own cart items"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cart items"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "Users can delete from own cart items"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- Indexes for lightning fast queries
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_brand on public.products(brand);
create index if not exists idx_products_price on public.products(price_inr);
create index if not exists idx_product_goals_goal on public.product_goals(goal);
create index if not exists idx_product_dietary_tag on public.product_dietary_tags(tag);
create index if not exists idx_wishlists_user on public.wishlists(user_id);
create index if not exists idx_cart_items_user on public.cart_items(user_id);

-- ==============================================================================
-- REALISTIC SEED DATA (Indian Sports Nutrition & Fitness Catalog in ₹ / INR)
-- ==============================================================================

do $$
declare
  p1_id uuid := '11111111-1111-1111-1111-111111110001';
  p2_id uuid := '11111111-1111-1111-1111-111111110002';
  p3_id uuid := '11111111-1111-1111-1111-111111110003';
  p4_id uuid := '11111111-1111-1111-1111-111111110004';
  p5_id uuid := '11111111-1111-1111-1111-111111110005';
  p6_id uuid := '11111111-1111-1111-1111-111111110006';
  p7_id uuid := '11111111-1111-1111-1111-111111110007';
  p8_id uuid := '11111111-1111-1111-1111-111111110008';
  p9_id uuid := '11111111-1111-1111-1111-111111110009';
  p10_id uuid := '11111111-1111-1111-1111-111111110010';
  p11_id uuid := '11111111-1111-1111-1111-111111110011';
  p12_id uuid := '11111111-1111-1111-1111-111111110012';
  p13_id uuid := '11111111-1111-1111-1111-111111110013';
  p14_id uuid := '11111111-1111-1111-1111-111111110014';
begin

  -- Insert Products
  insert into public.products (
    id, product_name, brand, category, price_inr, original_price_inr, discount_percentage,
    rating, review_count, stock_quantity, description, ingredients, nutrition_information,
    serving_information, allergen_information, seller_name, verification_status, flavor,
    package_weight, tag, tag_color, image_bg, icon_color, is_featured
  ) values
  (
    p1_id,
    'Biozyme Whey Isolate 100% Ultra-Pure',
    'MuscleBlaze',
    'Protein',
    6499.00,
    7999.00,
    18.75,
    4.9,
    482,
    35,
    'Clinically evaluated enhanced absorption formula delivering 27g of pure isolate protein per scoop with certified 50% higher protein absorption.',
    'Whey Protein Isolate, Enhanced Absorption Formula (EAF®), Digestive Enzyme Blend, Natural & Artificial Flavors, Sucralose.',
    '{"protein_g": 27, "carbs_g": 1.2, "fat_g": 0.5, "calories": 118, "bcaa_g": 5.96}'::jsonb,
    '1 Rounded Scoop (31g) mixed with 200-240ml cold water post-workout',
    'Contains Milk (Whey). Manufactured in a facility that also processes soy and nuts.',
    'MuscleBlaze Official Store',
    'Verified',
    'Belgian Chocolate',
    '2 kg (4.4 lbs)',
    'Best Seller',
    'mint',
    'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00F59B',
    true
  ),
  (
    p2_id,
    'Gold Standard 100% Whey Double Rich',
    'Optimum Nutrition',
    'Protein',
    7299.00,
    8999.00,
    18.89,
    4.9,
    839,
    42,
    'The world’s most trusted whey protein blend featuring micro-filtered whey protein isolates with 5.5g naturally occurring BCAAs.',
    'Protein Blend (Whey Protein Isolates, Whey Protein Concentrate, Whey Peptides), Cocoa, Natural Flavors, Lecithin, Acesulfame Potassium.',
    '{"protein_g": 24, "carbs_g": 3.0, "fat_g": 1.0, "calories": 120, "bcaa_g": 5.5}'::jsonb,
    '1 Scoop (30.4g) in 180-240ml water or skimmed milk',
    'Contains Milk and Soy (Lecithin). Gluten Free.',
    'Optimum Nutrition India',
    'Verified',
    'Double Rich Chocolate',
    '2.27 kg (5 lbs)',
    'Global Icon',
    'coral',
    'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#FF6B35',
    true
  ),
  (
    p3_id,
    'Plant Power Pea & Brown Rice Organic Protein',
    'Cosmix',
    'Protein',
    2899.00,
    3499.00,
    17.15,
    4.7,
    192,
    28,
    '100% raw vegan protein blend formulated with raw organic pea protein and sprouted brown rice, sweetened naturally with monk fruit.',
    'Organic Pea Protein Isolate, Organic Sprouted Brown Rice Protein, Raw Cacao Powder, Monk Fruit Extract, Digestive Plant Enzymes.',
    '{"protein_g": 22, "carbs_g": 2.5, "fat_g": 1.8, "calories": 115, "bcaa_g": 4.6}'::jsonb,
    '1 Scoop (32g) with 250ml oat milk or water',
    '100% Dairy-Free, Lactose-Free, Soy-Free, Gluten-Free.',
    'Cosmix Wellness India',
    'Verified',
    'Dark Raw Cacao',
    '1 kg (2.2 lbs)',
    '100% Vegan',
    'mint',
    'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00F59B',
    true
  ),
  (
    p4_id,
    'Creapure® 100% Micronized Creatine Monohydrate',
    'FitSphere Labs',
    'Sports Nutrition',
    1499.00,
    1999.00,
    25.01,
    4.9,
    620,
    60,
    'German-manufactured 99.99% pure micronized creatine monohydrate to maximize cellular ATP production, explosive power, and hypertrophy.',
    'Pure Creapure® Micronized Creatine Monohydrate (200 Mesh). Zero fillers, zero sugar.',
    '{"protein_g": 0, "carbs_g": 0, "fat_g": 0, "calories": 0, "creatine_g": 3.0}'::jsonb,
    '1 Scoop (3g) daily dissolved in water or fruit juice',
    'Allergen Free. Manufactured in a certified cGMP facility.',
    'FitSphere Official Labs',
    'Verified',
    'Unflavored',
    '400 g (133 Servings)',
    'Clinical Grade',
    'cyan',
    'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00E5FF',
    true
  ),
  (
    p5_id,
    'WrathX Pre-Workout Explosive Energy & Pump',
    'MuscleBlaze',
    'Sports Nutrition',
    2499.00,
    2999.00,
    16.67,
    4.8,
    312,
    24,
    'Heavy-hitting pre-workout packed with 400mg Caffeine, 4000mg L-Citrulline, and 3200mg Beta-Alanine for laser focus and skin-splitting pumps.',
    'L-Citrulline DL-Malate, Beta-Alanine, Anhydrous Caffeine, Taurine, L-Tyrosine, Theacrine, AstraGin®, Natural Flavors.',
    '{"caffeine_mg": 400, "citrulline_mg": 4000, "beta_alanine_mg": 3200, "calories": 5}'::jsonb,
    '1 Scoop (14g) in 250ml ice-cold water 20 minutes prior to intense lifting',
    'High Caffeine. Not recommended for children, pregnant women, or caffeine-sensitive athletes.',
    'MuscleBlaze Official Store',
    'Verified',
    'Blue Raspberry Slush',
    '420 g (30 Servings)',
    'High Stimulant',
    'coral',
    'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.18) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#FF6B35',
    false
  ),
  (
    p6_id,
    'Reload Fast-Hydration Effervescent Electrolytes',
    'Fast&Up',
    'Sports Nutrition',
    499.00,
    650.00,
    23.23,
    4.8,
    510,
    80,
    'Instant hypotonic hydration tablets with optimal sodium, potassium, magnesium, and vitamin B12 to eliminate muscle cramps and fatigue.',
    'Sodium Chloride, Potassium Chloride, Magnesium Carbonate, Calcium Carbonate, Vitamin C, Vitamin B12, Citric Acid, Stevia.',
    '{"sodium_mg": 180, "potassium_mg": 75, "magnesium_mg": 20, "calories": 10}'::jsonb,
    'Drop 1 tablet in 500ml water during endurance workouts or morning hydration',
    'Vegetarian. Sugar-Free.',
    'Fast&Up India',
    'Verified',
    'Citrus Orange Burst',
    '20 Effervescent Tablets',
    'Instant Hydration',
    'cyan',
    'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00E5FF',
    false
  ),
  (
    p7_id,
    'Daily Multivitamin Defense with 23 Micronutrients',
    'TrueBasics',
    'Vitamins & Supplements',
    1199.00,
    1599.00,
    25.02,
    4.8,
    345,
    45,
    'Advanced multi-mineral and multivitamin enhanced with Ashwagandha, Ginseng, and powerful antioxidants to boost immune function and stamina.',
    'Vitamin A, B-Complex (B1, B2, B3, B5, B6, B9, B12), Vitamin C, Vitamin D3 (2000 IU), Vitamin E, Zinc, KSM-66 Ashwagandha.',
    '{"vit_d3_iu": 2000, "zinc_mg": 12, "ashwagandha_mg": 200, "calories": 0}'::jsonb,
    '1 Tablet daily with breakfast or post-lunch meal',
    'Vegetarian. Zero artificial colors.',
    'TrueBasics Official Store',
    'Verified',
    'Neutral',
    '60 Tablets (2 Months Supply)',
    'Essential Health',
    'mint',
    'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00F59B',
    false
  ),
  (
    p8_id,
    'High-Protein Fuel Energy Bars (20g Protein)',
    'Yoga Bar',
    'Healthy Foods',
    1099.00,
    1350.00,
    18.59,
    4.7,
    280,
    50,
    'Wholesome snack bar with 20g whey & almond protein, complex whole grain oats, and zero artificial preservatives or trans fats.',
    'Whey Protein Concentrate, Almonds, Whole Grain Oats, Honey, Dark Chocolate, Cocoa Butter, Flaxseeds, Chia Seeds.',
    '{"protein_g": 20, "carbs_g": 22, "fat_g": 6.5, "fiber_g": 8.0, "calories": 230}'::jsonb,
    'Ready-to-eat convenient pre-workout boost or mid-day athletic snack',
    'Contains Almonds, Milk. May contain traces of other tree nuts.',
    'Yoga Bar Official Store',
    'Verified',
    'Chocolate Brownie Fudge',
    'Box of 6 Bars (420g)',
    'On-The-Go',
    'coral',
    'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#FF6B35',
    false
  ),
  (
    p9_id,
    'Dark Chocolate High-Protein Peanut Butter',
    'The Whole Truth',
    'Healthy Foods',
    449.00,
    550.00,
    18.36,
    4.9,
    410,
    65,
    'Made with 100% slow-roasted slow-ground peanuts, whey protein isolate, raw organic cocoa, and natural unrefined dates. Zero palm oil.',
    'Roasted Peanuts (80%), Whey Protein Isolate (12%), Raw Cocoa Powder (5%), Dates (3%).',
    '{"protein_g": 10, "carbs_g": 5, "fat_g": 12, "calories": 170}'::jsonb,
    '2 Tablespoons (32g) spread on toast, fruit, or blended into smoothies',
    'Contains Peanuts, Milk. Zero Added Sugar, Zero Palm Oil, Zero Preservatives.',
    'The Whole Truth Foods',
    'Verified',
    'Dark Chocolate Creamy',
    '500 g',
    'Clean Label',
    'mint',
    'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00F59B',
    false
  ),
  (
    p10_id,
    'Heavy-Duty Natural Latex Loop Resistance Bands Set',
    'FitSphere Pro',
    'Fitness Accessories',
    1299.00,
    1899.00,
    31.60,
    4.9,
    378,
    40,
    'Set of 5 snap-resistant 100% Malaysian natural latex resistance loop bands calibrated from 10 lbs to 50 lbs for glute activation and pull-up assist.',
    '100% High-Grade Malaysian Natural Latex. Tear-resistant double layered build.',
    '{"resistance_range_lbs": "10-50 lbs", "count": 5, "material": "100% Natural Latex"}'::jsonb,
    'Use for warmups, rehabilitation, mobility drills, and progressive resistance loading',
    'Contains Natural Latex.',
    'FitSphere Gear Division',
    'Verified',
    'Multicolor Pack (5 Bands)',
    '5 Bands + Carry Pouch',
    'Essential Gear',
    'cyan',
    'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00E5FF',
    true
  ),
  (
    p11_id,
    'Pro Alignment High-Density Cushioned Yoga Mat (6mm)',
    'FitSphere Pro',
    'Fitness Accessories',
    1899.00,
    2599.00,
    26.93,
    4.8,
    215,
    30,
    'Eco-friendly dual-layer TPE workout mat with laser-engraved posture alignment lines and superior non-slip grip for floor sessions.',
    'High-Density Eco-TPE (Thermoplastic Elastomer). 100% PVC-free, non-toxic.',
    '{"thickness_mm": 6, "dimensions_cm": "183 x 61", "weight_kg": 0.95}'::jsonb,
    'Ideal for yoga, core conditioning, calisthenics, and post-workout mobility',
    'Hypoallergenic. Zero toxic chemicals or phthalates.',
    'FitSphere Gear Division',
    'Verified',
    'Midnight Black & Mint',
    '183 x 61 x 0.6 cm',
    'Eco-Friendly',
    'mint',
    'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00F59B',
    false
  ),
  (
    p12_id,
    'Hypervolt Percussive Deep Tissue Therapy Massage Gun',
    'Hyperice',
    'Recovery Products',
    18999.00,
    24999.00,
    24.00,
    5.0,
    142,
    15,
    'State-of-the-art brushless motor delivering 3 speeds of rapid percussive therapy to flush lactic acid, alleviate DOMS, and restore fascia elasticity.',
    'Patented QuietGlide™ 60W Brushless Motor, Rechargeable Lithium-Ion Battery (3h runtime), 5 Interchangeable Massage Heads.',
    '{"speeds": 3, "strokes_per_min": 3200, "battery_hours": 3, "weight_kg": 1.1}'::jsonb,
    'Apply 30-60 seconds per muscle group pre-workout for activation or post-workout for recovery',
    'Do not use directly on bony prominences or injured joints without medical guidance.',
    'Hyperice India Authorized Dealer',
    'Verified',
    'Matte Stealth Gray',
    'Complete Kit (Gun + 5 Heads)',
    'Premium Recovery',
    'coral',
    'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.2) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#FF6B35',
    true
  ),
  (
    p13_id,
    'High-Density Textured Muscle Recovery Foam Roller',
    'FitSphere Pro',
    'Recovery Products',
    999.00,
    1499.00,
    33.36,
    4.8,
    265,
    48,
    'Engineered multi-zone matrix texture replicates therapist fingertip and palm pressure for self-myofascial release of tight IT bands, quads, and lats.',
    'Expanded Polypropylene (EPP) Core with High-Density EVA Foam Shell.',
    '{"length_cm": 45, "diameter_cm": 14, "max_load_kg": 220}'::jsonb,
    'Roll slowly along muscle bellies for 1-2 minutes per area before and after training',
    'Durable water-resistant EVA foam. Easily wipes clean.',
    'FitSphere Gear Division',
    'Verified',
    'Dual-Tone Mint & Black',
    '45 cm x 14 cm',
    'Recovery Essential',
    'cyan',
    'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00E5FF',
    false
  ),
  (
    p14_id,
    'Heavy-Duty Padded Lifting Wrist Straps (Pair)',
    'Gymshark',
    'Fitness Accessories',
    1499.00,
    1899.00,
    21.06,
    4.9,
    490,
    55,
    'Industrial grade cotton webbing with 5mm neoprene wrist padding to eliminate grip fatigue during maximal deadlifts, heavy shrugs, and barbell rows.',
    'High-Tensile Cotton Webbing, Heavy-Duty Reinforced Stitching, 5mm High-Density Neoprene Cushioning.',
    '{"length_cm": 58, "width_cm": 3.8, "load_tested_kg": 350}'::jsonb,
    'Wrap securely around barbell or dumbbell knurling to enhance grip connection',
    'Machine washable with cold water. Air dry.',
    'Gymshark Official Importer',
    'Verified',
    'Stealth Black / White Logo',
    'Pair (2 Straps)',
    'Strength Essential',
    'mint',
    'radial-gradient(circle at 50% 50%, rgba(0, 245, 155, 0.15) 0%, rgba(17, 24, 39, 0.95) 75%)',
    '#00F59B',
    false
  )
  on conflict (id) do update set
    price_inr = excluded.price_inr,
    original_price_inr = excluded.original_price_inr,
    rating = excluded.rating,
    stock_quantity = excluded.stock_quantity;

  -- Insert Product Goals
  insert into public.product_goals (product_id, goal) values
    (p1_id, 'Muscle Gain'), (p1_id, 'Strength'), (p1_id, 'Body Recomposition'), (p1_id, 'Fat Loss'),
    (p2_id, 'Muscle Gain'), (p2_id, 'Strength'), (p2_id, 'General Fitness'),
    (p3_id, 'Muscle Gain'), (p3_id, 'General Fitness'), (p3_id, 'Fat Loss'), (p3_id, 'Body Recomposition'),
    (p4_id, 'Strength'), (p4_id, 'Muscle Gain'), (p4_id, 'Weight Gain'),
    (p5_id, 'Strength'), (p5_id, 'Endurance'), (p5_id, 'Body Recomposition'),
    (p6_id, 'Endurance'), (p6_id, 'General Fitness'), (p6_id, 'Fat Loss'),
    (p7_id, 'General Fitness'), (p7_id, 'Endurance'), (p7_id, 'Posture & Mobility'),
    (p8_id, 'Muscle Gain'), (p8_id, 'Weight Gain'), (p8_id, 'General Fitness'),
    (p9_id, 'Weight Gain'), (p9_id, 'Muscle Gain'), (p9_id, 'General Fitness'),
    (p10_id, 'Posture & Mobility'), (p10_id, 'Fat Loss'), (p10_id, 'General Fitness'),
    (p11_id, 'Posture & Mobility'), (p11_id, 'General Fitness'),
    (p12_id, 'Posture & Mobility'), (p12_id, 'Muscle Gain'), (p12_id, 'Endurance'),
    (p13_id, 'Posture & Mobility'), (p13_id, 'General Fitness'),
    (p14_id, 'Strength'), (p14_id, 'Muscle Gain')
  on conflict (product_id, goal) do nothing;

  -- Insert Product Dietary Tags
  insert into public.product_dietary_tags (product_id, tag) values
    (p1_id, 'Vegetarian'), (p1_id, 'High Protein'), (p1_id, 'Sugar Free'),
    (p2_id, 'Vegetarian'), (p2_id, 'High Protein'), (p2_id, 'Gluten Free'),
    (p3_id, 'Vegan'), (p3_id, 'Vegetarian'), (p3_id, 'High Protein'), (p3_id, 'Gluten Free'), (p3_id, 'Lactose Free'), (p3_id, 'Organic'),
    (p4_id, 'Vegan'), (p4_id, 'Vegetarian'), (p4_id, 'Sugar Free'), (p4_id, 'Gluten Free'),
    (p5_id, 'Vegetarian'), (p5_id, 'Sugar Free'), (p5_id, 'Keto'),
    (p6_id, 'Vegan'), (p6_id, 'Vegetarian'), (p6_id, 'Sugar Free'), (p6_id, 'Gluten Free'),
    (p7_id, 'Vegetarian'), (p7_id, 'Sugar Free'), (p7_id, 'Gluten Free'),
    (p8_id, 'Vegetarian'), (p8_id, 'High Protein'),
    (p9_id, 'Vegetarian'), (p9_id, 'High Protein'), (p9_id, 'Sugar Free'), (p9_id, 'Gluten Free'),
    (p10_id, 'Organic'),
    (p11_id, 'Vegan'),
    (p12_id, 'Organic'),
    (p13_id, 'Organic'),
    (p14_id, 'Organic')
  on conflict (product_id, tag) do nothing;

end $$;
