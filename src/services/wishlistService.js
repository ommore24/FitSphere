import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Wishlist Data-Access Service
 * Manages persistent user wishlist items in Supabase PostgreSQL (public.wishlists).
 * Strictly adheres to Row Level Security (RLS) using auth.uid() = user_id.
 */
export const wishlistService = {
  /**
   * Fetch all wishlist items for the authenticated user with joined product details
   * @param {string} userId - auth.users UUID
   */
  async getWishlist(userId) {
    if (!isSupabaseConfigured || !userId) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          id,
          user_id,
          product_id,
          created_at,
          product:products (
            id,
            product_name,
            brand,
            category,
            price_inr,
            original_price_inr,
            discount_percentage,
            rating,
            review_count,
            stock_quantity,
            description,
            serving_information,
            allergen_information,
            seller_name,
            verification_status,
            flavor,
            package_weight,
            tag,
            tag_color,
            image_bg,
            icon_color
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { data: [], error };
      }

      // Format to clean client structure
      const formatted = (data || []).map(item => ({
        id: item.id,
        productId: item.product_id,
        createdAt: item.created_at,
        product: item.product ? {
          id: item.product.id,
          name: item.product.product_name,
          brand: item.product.brand,
          category: item.product.category,
          price: Number(item.product.price_inr),
          originalPrice: Number(item.product.original_price_inr || item.product.price_inr),
          discount: item.product.discount_percentage,
          rating: Number(item.product.rating),
          reviews: item.product.review_count,
          stock: item.product.stock_quantity,
          inStock: item.product.stock_quantity > 0,
          description: item.product.description,
          servingInfo: item.product.serving_information,
          allergenInfo: item.product.allergen_information,
          sellerName: item.product.seller_name,
          verified: item.product.verification_status,
          flavor: item.product.flavor,
          weight: item.product.package_weight,
          tag: item.product.tag,
          tagColor: item.product.tag_color,
          imageBg: item.product.image_bg,
          iconColor: item.product.icon_color
        } : null
      })).filter(item => item.product !== null);

      return { data: formatted, error: null };
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      return { data: [], error: err };
    }
  },

  /**
   * Add a product to the user's wishlist
   * @param {string} userId
   * @param {string} productId
   */
  async addToWishlist(userId, productId) {
    if (!isSupabaseConfigured || !userId) {
      return { data: null, error: new Error('User not authenticated') };
    }

    try {
      const { data, error } = await supabase
        .from('wishlists')
        .upsert(
          {
            user_id: userId,
            product_id: productId
          },
          { onConflict: 'user_id,product_id' }
        )
        .select()
        .single();

      return { data, error };
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      return { data: null, error: err };
    }
  },

  /**
   * Remove a product from the user's wishlist
   * @param {string} userId
   * @param {string} productId
   */
  async removeFromWishlist(userId, productId) {
    if (!isSupabaseConfigured || !userId) {
      return { success: false, error: new Error('User not authenticated') };
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .match({ user_id: userId, product_id: productId });

      return { success: !error, error };
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      return { success: false, error: err };
    }
  },

  /**
   * Check if a product is in user's wishlist
   * @param {string} userId
   * @param {string} productId
   */
  async isInWishlist(userId, productId) {
    if (!isSupabaseConfigured || !userId) {
      return { inWishlist: false };
    }

    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('id')
        .match({ user_id: userId, product_id: productId })
        .maybeSingle();

      if (error) return { inWishlist: false, error };
      return { inWishlist: !!data, error: null };
    } catch (err) {
      return { inWishlist: false, error: err };
    }
  }
};

export default wishlistService;
