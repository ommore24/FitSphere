import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Cart Data-Access Service
 * Manages persistent user cart items in Supabase PostgreSQL (public.cart_items).
 * Strictly adheres to Row Level Security (RLS) using auth.uid() = user_id.
 */
export const cartService = {
  /**
   * Fetch all cart items for the authenticated user with joined product details
   * @param {string} userId - auth.users UUID
   */
  async getCart(userId) {
    if (!isSupabaseConfigured || !userId) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          user_id,
          product_id,
          quantity,
          created_at,
          updated_at,
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
        .order('created_at', { ascending: true });

      if (error) {
        // If table doesn't exist yet or network error, return gracefully
        return { data: [], error };
      }

      // Format to clean client structure
      const formattedItems = (data || []).map((row) => ({
        id: row.id,
        productId: row.product_id,
        quantity: row.quantity,
        product: {
          id: row.product?.id || row.product_id,
          name: row.product?.product_name || 'Product',
          brand: row.product?.brand || '',
          category: row.product?.category || '',
          price: Number(row.product?.price_inr) || 0,
          originalPrice: row.product?.original_price_inr ? Number(row.product.original_price_inr) : null,
          rating: Number(row.product?.rating) || 4.8,
          reviewsCount: row.product?.review_count || 0,
          stock: row.product?.stock_quantity ?? 50,
          description: row.product?.description || '',
          flavor: row.product?.flavor || '',
          weight: row.product?.package_weight || '',
          tag: row.product?.tag || '',
          tagColor: row.product?.tag_color || 'mint',
          imageBg: row.product?.image_bg || '',
          iconColor: row.product?.icon_color || '#00F59B',
          seller: row.product?.seller_name || 'FitSphere Official',
          verified: row.product?.verification_status === 'Verified'
        }
      }));

      return { data: formattedItems, error: null };
    } catch (err) {
      console.warn('cartService.getCart fallback:', err.message);
      return { data: [], error: err };
    }
  },

  /**
   * Add or increment product in user's persistent Supabase cart
   * @param {string} userId - auth.users UUID
   * @param {string} productId - products UUID
   * @param {number} quantity - Quantity to add
   * @param {number} maxStock - Maximum available inventory
   */
  async addToCart(userId, productId, quantity = 1, maxStock = 999) {
    if (!isSupabaseConfigured || !userId || !productId) {
      return { data: null, error: new Error('User or product ID unavailable') };
    }

    try {
      // Check existing row
      const { data: existingRow } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .maybeSingle();

      let targetQty = quantity;
      if (existingRow) {
        targetQty = Math.min(existingRow.quantity + quantity, maxStock);
      } else {
        targetQty = Math.min(quantity, maxStock);
      }

      const { data, error } = await supabase
        .from('cart_items')
        .upsert(
          {
            user_id: userId,
            product_id: productId,
            quantity: targetQty,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id,product_id' }
        )
        .select()
        .single();

      return { data, error };
    } catch (err) {
      console.warn('cartService.addToCart error:', err.message);
      return { data: null, error: err };
    }
  },

  /**
   * Update quantity of a product in user's cart
   * @param {string} userId - auth.users UUID
   * @param {string} productId - products UUID
   * @param {number} quantity - New quantity (must be > 0)
   */
  async updateQuantity(userId, productId, quantity) {
    if (!isSupabaseConfigured || !userId || !productId) {
      return { data: null, error: null };
    }

    try {
      if (quantity <= 0) {
        return this.removeFromCart(userId, productId);
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('product_id', productId)
        .select()
        .single();

      return { data, error };
    } catch (err) {
      console.warn('cartService.updateQuantity error:', err.message);
      return { data: null, error: err };
    }
  },

  /**
   * Remove a product from the user's cart
   */
  async removeFromCart(userId, productId) {
    if (!isSupabaseConfigured || !userId || !productId) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      return { data, error };
    } catch (err) {
      console.warn('cartService.removeFromCart error:', err.message);
      return { data: null, error: err };
    }
  },

  /**
   * Clear the user's entire cart
   */
  async clearCart(userId) {
    if (!isSupabaseConfigured || !userId) {
      return { data: null, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      return { data, error };
    } catch (err) {
      console.warn('cartService.clearCart error:', err.message);
      return { data: null, error: err };
    }
  }
};

export default cartService;
