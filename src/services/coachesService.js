import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Coaches & Verification Service
 * Handles certified coach queries and coach applicant submissions.
 */
export const coachesService = {
  /**
   * Fetch verified coaches directory
   */
  async getVerifiedCoaches() {
    if (!isSupabaseConfigured) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('is_verified', true)
      .order('rating', { ascending: false });

    return { data: data || [], error };
  },

  /**
   * Fetch a single coach by ID
   */
  async getCoachById(coachId) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', coachId)
      .single();

    return { data, error };
  },

  /**
   * Submit a coach onboarding application
   */
  async submitCoachApplication(applicationData) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('coach_applications')
      .insert({
        full_name: applicationData.fullName,
        email: applicationData.email,
        phone: applicationData.phone || null,
        certification: applicationData.certification,
        experience_years: applicationData.experienceYears,
        portfolio_url: applicationData.portfolioUrl || null,
        statement: applicationData.statement || null,
        status: 'pending'
      })
      .select()
      .single();

    return { data, error };
  }
};

export default coachesService;
