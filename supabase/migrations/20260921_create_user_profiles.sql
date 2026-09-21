-- ==============================================================================
-- FitSphere Part 2: User Profiles, Fitness Data & Personal Dashboard Schema
-- Run this script in the Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Create table public.user_profiles
create table if not exists public.user_profiles (
  -- Primary key linked directly to Supabase Auth User ID
  id uuid references auth.users(id) on delete cascade primary key,
  
  -- Basic Athlete Profile
  name text,
  age integer check (age is null or (age > 0 and age < 120)),
  gender text check (gender is null or gender in ('Male', 'Female', 'Non-binary', 'Prefer not to say')),
  height numeric check (height is null or (height > 40 and height < 300)), -- Height in centimeters (cm)
  weight numeric check (weight is null or (weight > 20 and weight < 500)), -- Current weight in kilograms (kg)
  target_weight numeric check (target_weight is null or (target_weight > 20 and target_weight < 500)), -- Target weight in kg
  starting_weight numeric check (starting_weight is null or (starting_weight > 20 and starting_weight < 500)), -- Starting weight for mathematical progress tracking

  -- Fitness Information & Primary Goal
  fitness_goal text check (fitness_goal is null or fitness_goal in (
    'Fat Loss',
    'Weight Gain',
    'Muscle Gain',
    'Strength',
    'Endurance',
    'General Fitness',
    'Body Recomposition',
    'Posture & Mobility'
  )),
  activity_level text check (activity_level is null or activity_level in (
    'Sedentary',
    'Lightly Active',
    'Moderately Active',
    'Very Active',
    'Extremely Active'
  )),
  fitness_experience text check (fitness_experience is null or fitness_experience in (
    'Beginner (0-1 yr)',
    'Intermediate (1-3 yrs)',
    'Advanced (3+ yrs)'
  )),
  workout_frequency integer check (workout_frequency is null or (workout_frequency >= 1 and workout_frequency <= 7)), -- Workout days per week (1-7)
  preferred_workout_type text check (preferred_workout_type is null or preferred_workout_type in (
    'Strength / Resistance',
    'HIIT / Conditioning',
    'Calisthenics',
    'Cardio & Running',
    'Yoga / Mobility',
    'Hybrid / Functional'
  )),

  -- Nutrition Preferences
  dietary_preference text check (dietary_preference is null or dietary_preference in (
    'Vegetarian',
    'Vegan',
    'Non-Vegetarian',
    'Other'
  )),
  allergies_or_intolerances text,
  food_preferences text,

  -- Lifestyle Information
  daily_water_intake numeric check (daily_water_intake is null or (daily_water_intake >= 0 and daily_water_intake <= 20)), -- Liters per day
  average_sleep_duration numeric check (average_sleep_duration is null or (average_sleep_duration >= 0 and average_sleep_duration <= 24)), -- Hours per night
  daily_activity_level text,

  -- Timestamps
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.user_profiles enable row level security;

-- 3. Row Level Security Policies
-- Users can only view their own profile
drop policy if exists "Users can view own profile" on public.user_profiles;
create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

-- Users can only insert their own profile
drop policy if exists "Users can insert own profile" on public.user_profiles;
create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

-- Users can only update their own profile
drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 4. Trigger to automatically keep updated_at in sync
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_user_profiles_updated_at on public.user_profiles;
create trigger set_user_profiles_updated_at
  before update on public.user_profiles
  for each row
  execute function public.handle_updated_at();

-- 5. Optional trigger to automatically create an initial profile row on auth signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, name, fitness_goal)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'primary_goal', 'General Fitness')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
