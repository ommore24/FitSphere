import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Products & Marketplace Data-Access Service
 * Encapsulates all PostgreSQL table queries for products, categories, and inventory.
 * Ready for full database migration in Part 2.
 */
export const productsService = {
  /**
   * Fetch products with optional category, brand, and search filters
   */
  async getProducts({ category, brand, search, sortBy } = {}) {
    if (!isSupabaseConfigured) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    let query = supabase.from('products').select('*');

    if (category && category !== 'All Products') {
      query = query.eq('category', category);
    }

    if (brand && brand !== 'All Brands') {
      query = query.eq('brand', brand);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    if (sortBy === 'price-low') {
      query = query.order('price', { ascending: true });
    } else if (sortBy === 'price-high') {
      query = query.order('price', { ascending: false });
    } else if (sortBy === 'rating') {
      query = query.order('rating', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    return { data: data || [], error };
  },

  /**
   * Fetch a single product by ID
   */
  async getProductById(id) {
    if (!isSupabaseConfigured) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  /**
   * Fetch distinct categories from database
   */
  async getCategories() {
    if (!isSupabaseConfigured) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    return { data: data || [], error };
  },

  /**
   * Fetch featured products for homepage showcase
   */
  async getFeaturedProducts(limit = 4) {
    if (!isSupabaseConfigured) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .limit(limit);

    return { data: data || [], error };
  }
};

export default productsService;
