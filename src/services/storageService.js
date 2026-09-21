import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Storage Service
 * Encapsulates bucket operations for athlete avatars, coach credentials, and product assets.
 */
export const storageService = {
  /**
   * Upload an athlete profile avatar
   */
  async uploadAvatar(userId, file) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true
      });

    if (error) return { data: null, error };

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { data: { path: filePath, publicUrl: publicUrlData.publicUrl }, error: null };
  },

  /**
   * Upload coach verification certification documentation (PDF or image)
   */
  async uploadCoachCredential(coachEmail, file) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const cleanEmail = coachEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const fileExt = file.name.split('.').pop();
    const filePath = `credentials/${cleanEmail}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('coach-credentials')
      .upload(filePath, file, {
        upsert: false
      });

    return { data, error };
  },

  /**
   * Retrieve public URL for a storage object
   */
  getPublicUrl(bucket, filePath) {
    if (!isSupabaseConfigured) return '';
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data?.publicUrl || '';
  }
};

export default storageService;
