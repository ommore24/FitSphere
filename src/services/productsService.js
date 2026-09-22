import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import {
  MOCK_PRODUCTS,
  CATEGORIES,
  BRANDS,
  FITNESS_GOALS,
  DIETARY_PREFERENCES
} from '../data/mockProducts.js';

/**
 * Format a raw database row into consistent client product structure
 */
function formatProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.product_name || row.name,
    brand: row.brand,
    category: row.category,
    price: Number(row.price_inr ?? row.price ?? 0),
    originalPrice: Number(row.original_price_inr ?? row.originalPrice ?? row.price_inr ?? row.price ?? 0),
    discount: row.discount_percentage ?? row.discount ?? 0,
    rating: Number(row.rating ?? 4.5),
    reviewsCount: row.review_count ?? row.reviewsCount ?? 0,
    stock: row.stock_quantity ?? row.stock ?? 10,
    inStock: (row.stock_quantity ?? row.stock ?? 10) > 0,
    description: row.description,
    ingredients: row.ingredients,
    nutrition: row.nutrition_information || row.nutrition || null,
    servingInfo: row.serving_information || row.servingInfo || null,
    allergenInfo: row.allergen_information || row.allergenInfo || null,
    sellerName: row.seller_name || row.sellerName || 'Verified FitSphere Partner',
    verified: row.verification_status || row.verified || 'Verified',
    flavor: row.flavor,
    weight: row.package_weight || row.weight,
    tag: row.tag,
    tagColor: row.tag_color || row.tagColor || 'mint',
    imageBg: row.image_bg || row.imageBg,
    iconColor: row.icon_color || row.iconColor || '#00F59B',
    isFeatured: row.is_featured ?? row.isFeatured ?? false,
    goals: Array.isArray(row.goals)
      ? row.goals
      : (row.product_goals ? row.product_goals.map(g => g.goal) : []),
    dietaryTags: Array.isArray(row.dietaryTags)
      ? row.dietaryTags
      : (row.product_dietary_tags ? row.product_dietary_tags.map(d => d.tag) : []),
    reviews: Array.isArray(row.reviews) ? row.reviews : [],
    image: row.image || (Array.isArray(row.images) && row.images[0]?.url) || '',
    images: Array.isArray(row.images)
      ? row.images
      : (row.product_images ? row.product_images.map(img => ({ url: img.image_url, alt: img.alt_text, isPrimary: img.is_primary })) : [])
  };
}

/**
 * Filter and sort products in-memory for fallback
 */
function filterMockProducts({
  category,
  brand,
  goal,
  dietaryTag,
  search,
  sortBy,
  priceMin,
  priceMax,
  ratingMin,
  inStockOnly
} = {}) {
  let list = [...MOCK_PRODUCTS];

  if (category && category !== 'All Products') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (brand && brand !== 'All Brands') {
    list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (goal && goal !== 'All Goals') {
    list = list.filter(p => p.goals && p.goals.includes(goal));
  }

  if (dietaryTag && dietaryTag !== 'All Diets') {
    list = list.filter(p => p.dietaryTags && p.dietaryTags.includes(dietaryTag));
  }

  if (priceMin !== undefined && priceMin !== null && !isNaN(priceMin)) {
    list = list.filter(p => p.price >= Number(priceMin));
  }

  if (priceMax !== undefined && priceMax !== null && !isNaN(priceMax)) {
    list = list.filter(p => p.price <= Number(priceMax));
  }

  if (ratingMin !== undefined && ratingMin !== null && !isNaN(ratingMin) && Number(ratingMin) > 0) {
    list = list.filter(p => p.rating >= Number(ratingMin));
  }

  if (inStockOnly) {
    list = list.filter(p => p.inStock && p.stock > 0);
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  } else if (sortBy === 'newest') {
    list.sort((a, b) => (b.id.localeCompare ? b.id.localeCompare(a.id) : 0));
  } else {
    // default popularity / featured
    list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  }

  return list;
}

export const productsService = {
  /**
   * Fetch products with multi-faceted filtering and sorting
   */
  async getProducts(filters = {}) {
    if (!isSupabaseConfigured) {
      return { data: filterMockProducts(filters), error: null };
    }

    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_goals(goal),
          product_dietary_tags(tag),
          product_images(image_url, alt_text, is_primary)
        `);

      if (filters.category && filters.category !== 'All Products') {
        query = query.eq('category', filters.category);
      }

      if (filters.brand && filters.brand !== 'All Brands') {
        query = query.eq('brand', filters.brand);
      }

      if (filters.search && filters.search.trim()) {
        query = query.or(`product_name.ilike.%${filters.search.trim()}%,brand.ilike.%${filters.search.trim()}%,description.ilike.%${filters.search.trim()}%`);
      }

      if (filters.priceMin !== undefined && filters.priceMin !== null && !isNaN(filters.priceMin)) {
        query = query.gte('price_inr', Number(filters.priceMin));
      }

      if (filters.priceMax !== undefined && filters.priceMax !== null && !isNaN(filters.priceMax)) {
        query = query.lte('price_inr', Number(filters.priceMax));
      }

      if (filters.ratingMin !== undefined && filters.ratingMin !== null && !isNaN(filters.ratingMin) && Number(filters.ratingMin) > 0) {
        query = query.gte('rating', Number(filters.ratingMin));
      }

      if (filters.inStockOnly) {
        query = query.gt('stock_quantity', 0);
      }

      if (filters.sortBy === 'price-low') {
        query = query.order('price_inr', { ascending: true });
      } else if (filters.sortBy === 'price-high') {
        query = query.order('price_inr', { ascending: false });
      } else if (filters.sortBy === 'rating') {
        query = query.order('rating', { ascending: false });
      } else if (filters.sortBy === 'popular') {
        query = query.order('review_count', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        // Fallback to local catalog if table not yet created or empty
        return { data: filterMockProducts(filters), error: null };
      }

      let formatted = data.map(formatProduct);

      // Post-filter by goals, dietary tags, and rating if needed
      if (filters.goal && filters.goal !== 'All Goals') {
        formatted = formatted.filter(p => p.goals && p.goals.includes(filters.goal));
      }
      if (filters.dietaryTag && filters.dietaryTag !== 'All Diets') {
        formatted = formatted.filter(p => p.dietaryTags && p.dietaryTags.includes(filters.dietaryTag));
      }
      if (filters.ratingMin !== undefined && filters.ratingMin !== null && !isNaN(filters.ratingMin) && Number(filters.ratingMin) > 0) {
        formatted = formatted.filter(p => p.rating >= Number(filters.ratingMin));
      }

      return { data: formatted, error: null };

      return { data: formatted, error: null };
    } catch (err) {
      console.warn('productsService.getProducts fallback:', err);
      return { data: filterMockProducts(filters), error: null };
    }
  },

  /**
   * Fetch a single product by ID
   */
  async getProductById(id) {
    if (!id) return { data: null, error: new Error('Product ID required') };

    if (!isSupabaseConfigured) {
      const item = MOCK_PRODUCTS.find(p => p.id === id || String(p.id) === String(id));
      return { data: item || null, error: item ? null : new Error('Product not found') };
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_goals(goal),
          product_dietary_tags(tag),
          product_images(image_url, alt_text, is_primary)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        // Fallback to mock catalog
        const item = MOCK_PRODUCTS.find(p => p.id === id || String(p.id) === String(id));
        return { data: item || null, error: item ? null : new Error('Product not found') };
      }

      return { data: formatProduct(data), error: null };
    } catch (err) {
      const item = MOCK_PRODUCTS.find(p => p.id === id || String(p.id) === String(id));
      return { data: item || null, error: item ? null : err };
    }
  },

  /**
   * Get related products based on shared category, goals, or brand
   */
  async getRelatedProducts(product, limit = 4) {
    if (!product) return { data: [] };

    try {
      const all = await this.getProducts();
      const pool = (all.data || []).filter(p => p.id !== product.id);

      // Score relevance
      const scored = pool.map(p => {
        let score = 0;
        if (p.category === product.category) score += 3;
        if (p.brand === product.brand) score += 2;
        if (product.goals && p.goals) {
          const common = p.goals.filter(g => product.goals.includes(g));
          score += common.length * 2;
        }
        return { product: p, score };
      });

      scored.sort((a, b) => b.score - a.score);
      const related = scored.slice(0, limit).map(s => s.product);

      return { data: related };
    } catch (err) {
      console.warn('getRelatedProducts error:', err);
      return { data: [] };
    }
  },

  /**
   * Get available categories
   */
  getCategories() {
    return CATEGORIES;
  },

  /**
   * Get available brands
   */
  getBrands() {
    return BRANDS;
  },

  /**
   * Get available fitness goals
   */
  getFitnessGoals() {
    return FITNESS_GOALS;
  },

  /**
   * Get available dietary preferences
   */
  getDietaryTags() {
    return DIETARY_PREFERENCES;
  },

  /**
   * Fetch featured products for homepage showcase
   */
  async getFeaturedProducts(limit = 4) {
    const res = await this.getProducts();
    const featured = (res.data || []).filter(p => p.isFeatured).slice(0, limit);
    return { data: featured.length > 0 ? featured : (res.data || []).slice(0, limit), error: null };
  }
};

export default productsService;
