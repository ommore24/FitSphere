import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Profile & Fitness Data Service
 * Encapsulates all PostgreSQL data access for the user_profiles table.
 * Strictly adheres to Row Level Security (RLS).
 */
export const profileService = {
  /**
   * Fetch the active athlete's profile by their authenticated user ID
   * @param {string} userId - auth.users UUID
   */
  async getProfile(userId) {
    if (!isSupabaseConfigured || !userId) {
      return { data: null, error: new Error('Supabase client or userId not available.') };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    return { data, error };
  },

  /**
   * Upsert an athlete's profile and fitness data
   * @param {string} userId - auth.users UUID
   * @param {Object} profileData - Profile, fitness, nutrition, and lifestyle payload
   */
  async upsertProfile(userId, profileData) {
    if (!isSupabaseConfigured || !userId) {
      return { data: null, error: new Error('Supabase client or userId not available.') };
    }

    // Sanitize numerical fields to null if empty
    const parseOptionalFloat = (val) => {
      if (val === '' || val === null || val === undefined) return null;
      const num = parseFloat(val);
      return isNaN(num) ? null : num;
    };

    const parseOptionalInt = (val) => {
      if (val === '' || val === null || val === undefined) return null;
      const num = parseInt(val, 10);
      return isNaN(num) ? null : num;
    };

    const sanitizedPayload = {
      id: userId,
      name: profileData.name ? profileData.name.trim() : null,
      age: parseOptionalInt(profileData.age),
      gender: profileData.gender || null,
      height: parseOptionalFloat(profileData.height),
      weight: parseOptionalFloat(profileData.weight),
      target_weight: parseOptionalFloat(profileData.target_weight),
      starting_weight: parseOptionalFloat(profileData.starting_weight),
      fitness_goal: profileData.fitness_goal || null,
      activity_level: profileData.activity_level || null,
      fitness_experience: profileData.fitness_experience || null,
      workout_frequency: parseOptionalInt(profileData.workout_frequency),
      preferred_workout_type: profileData.preferred_workout_type || null,
      dietary_preference: profileData.dietary_preference || null,
      allergies_or_intolerances: profileData.allergies_or_intolerances ? profileData.allergies_or_intolerances.trim() : null,
      food_preferences: profileData.food_preferences ? profileData.food_preferences.trim() : null,
      daily_water_intake: parseOptionalFloat(profileData.daily_water_intake),
      average_sleep_duration: parseOptionalFloat(profileData.average_sleep_duration),
      daily_activity_level: profileData.daily_activity_level || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(sanitizedPayload, { onConflict: 'id' })
      .select()
      .single();

    return { data, error };
  },

  /**
   * Partially update athlete profile fields
   */
  async updateProfile(userId, partialUpdates) {
    if (!isSupabaseConfigured || !userId) {
      return { data: null, error: new Error('Supabase client or userId not available.') };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...partialUpdates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  }
};

export default profileService;
