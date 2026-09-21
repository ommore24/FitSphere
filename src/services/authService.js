import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Authentication Service
 * Centralizes all Supabase Auth interactions, session handling, and profile hooks.
 */
export const authService = {
  /**
   * Register a new athlete with email, password, and custom metadata
   */
  async signUp({ email, password, fullName, primaryGoal }) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          primary_goal: primaryGoal || 'General Fitness',
          role: 'athlete'
        }
      }
    });

    return { data, error };
  },

  /**
   * Sign in an athlete with email and password
   */
  async signIn({ email, password }) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { data, error };
  },

  /**
   * Sign in with OAuth provider (Google, Apple)
   */
  async signInWithOAuth(provider, redirectTo = window.location.origin + '/profile') {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo }
    });

    return { data, error };
  },

  /**
   * Sign out the active session
   */
  async signOut() {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Request password reset email
   */
  async resetPasswordForEmail(email, redirectTo = window.location.origin + '/forgot-password') {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });

    return { data, error };
  },

  /**
   * Update password for an authenticated athlete
   */
  async updatePassword(newPassword) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    return { data, error };
  },

  /**
   * Retrieve current Supabase session
   */
  async getSession() {
    if (!isSupabaseConfigured) {
      return { data: { session: null }, error: null };
    }

    return await supabase.auth.getSession();
  },

  /**
   * Retrieve currently authenticated user
   */
  async getUser() {
    if (!isSupabaseConfigured) {
      return { data: { user: null }, error: null };
    }

    return await supabase.auth.getUser();
  },

  /**
   * Subscribe to auth state changes (SIGN_IN, SIGN_OUT, TOKEN_REFRESHED)
   */
  onAuthStateChange(callback) {
    if (!isSupabaseConfigured) {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }

    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
};

export default authService;
