import { createClient } from '@supabase/supabase-js';

// Read credentials strictly from Vite environment variables (never hardcoded)
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawSupabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

/**
 * Normalizes the Supabase URL by trimming any accidental trailing slashes
 * or '/rest/v1' paths to ensure Auth, Storage, and PostgREST endpoints resolve properly.
 */
const normalizeSupabaseUrl = (url) => {
  if (!url) return '';
  return url
    .trim()
    .replace(/\/rest\/v1\/?$/i, '')
    .replace(/\/+$/, '');
};

const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);
const supabaseKey = rawSupabaseKey.trim();

/**
 * Helper to check if valid Supabase environment variables are configured.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('http')
);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    '[FitSphere Supabase] Missing or invalid Supabase credentials in .env. ' +
    'Please verify VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set.'
  );
}

/**
 * Reusable Supabase client instance with session persistence and auto-refresh enabled.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'fitsphere_auth_token'
    }
  }
);

export default supabase;
