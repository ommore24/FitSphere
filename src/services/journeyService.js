import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Fitness Journey Service
 * Encapsulates athlete goal progress, nutrition logs, workout splits, and personal records.
 */
export const journeyService = {
  /**
   * Fetch active goal and metrics for an athlete
   */
  async getUserGoal(userId) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    return { data, error };
  },

  /**
   * Upsert an athlete goal
   */
  async upsertUserGoal(userId, goalData) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('user_goals')
      .upsert({
        user_id: userId,
        ...goalData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    return { data, error };
  },

  /**
   * Fetch logged meals for a specific date
   */
  async getNutritionLogs(userId, date = new Date().toISOString().split('T')[0]) {
    if (!isSupabaseConfigured) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('nutrition_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('log_date', date)
      .order('logged_at', { ascending: true });

    return { data: data || [], error };
  },

  /**
   * Log a new meal entry
   */
  async logMeal(userId, mealData) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('nutrition_logs')
      .insert({
        user_id: userId,
        log_date: mealData.date || new Date().toISOString().split('T')[0],
        meal_title: mealData.title,
        meal_type: mealData.type,
        calories: mealData.calories,
        protein_g: mealData.protein,
        carbs_g: mealData.carbs,
        fat_g: mealData.fat
      })
      .select()
      .single();

    return { data, error };
  },

  /**
   * Fetch weekly workout split for athlete
   */
  async getWorkoutSplits(userId) {
    if (!isSupabaseConfigured) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('workout_splits')
      .select('*, exercises(*)')
      .eq('user_id', userId)
      .order('day_of_week', { ascending: true });

    return { data: data || [], error };
  },

  /**
   * Fetch personal records (PRs)
   */
  async getProgressRecords(userId) {
    if (!isSupabaseConfigured) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('progress_records')
      .select('*')
      .eq('user_id', userId)
      .order('checked_at', { ascending: false });

    return { data: data || [], error };
  }
};

export default journeyService;
