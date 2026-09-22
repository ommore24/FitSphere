import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '../services/cartService';
import { wishlistService } from '../services/wishlistService';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const CartContext = createContext();

const RECENTLY_VIEWED_KEY = 'fitsphere_recently_viewed';
const GUEST_CART_KEY = 'fitsphere_guest_cart';
const GUEST_WISHLIST_KEY = 'fitsphere_guest_wishlist';

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // Helper to load guest cart from localStorage or pre-fill with starter sample if empty
  const getGuestCart = () => {
    try {
      const saved = localStorage.getItem(GUEST_CART_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load guest cart:', e);
    }
    return [{ product: MOCK_PRODUCTS[0], quantity: 1 }];
  };

  // Helper to load guest wishlist from localStorage
  const getGuestWishlist = () => {
    try {
      const saved = localStorage.getItem(GUEST_WISHLIST_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load guest wishlist:', e);
    }
    return [MOCK_PRODUCTS[1].id, MOCK_PRODUCTS[4].id];
  };

  // Initialize guest cart from localStorage or pre-fill with starter sample if empty
  const [cart, setCart] = useState(getGuestCart);

  // Wishlist state: array of product IDs
  const [wishlist, setWishlist] = useState(getGuestWishlist);

  // Wishlist full products list
  const [wishlistItems, setWishlistItems] = useState([]);

  // Comparison drawer state (max 4 products)
  const [comparisonList, setComparisonList] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Recently viewed products
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load recently viewed:', e);
    }
    return [];
  });

  // Toast feedback
  const [toast, setToast] = useState(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  // Sync with Supabase on user change (login/logout)
  useEffect(() => {
    let isMounted = true;

    async function syncUserData() {
      if (!currentUser?.id) {
        // Logged out: reset user state to local guest cart/wishlist
        setCart(getGuestCart());
        const guestWish = getGuestWishlist();
        setWishlist(guestWish);
        setWishlistItems(MOCK_PRODUCTS.filter(p => guestWish.includes(p.id)));
        return;
      }

      setIsLoadingCart(true);
      setIsLoadingWishlist(true);

      try {
        // Fetch cart from Supabase
        const { data: remoteCart, error: cartErr } = await cartService.getCart(currentUser.id);
        if (isMounted && !cartErr && Array.isArray(remoteCart)) {
          setCart(remoteCart);
        }

        // Fetch wishlist from Supabase
        const { data: remoteWishlist, error: wishErr } = await wishlistService.getWishlist(currentUser.id);
        if (isMounted && !wishErr && Array.isArray(remoteWishlist)) {
          const ids = remoteWishlist.map(item => item.productId);
          setWishlist(ids);
          setWishlistItems(remoteWishlist.map(item => item.product).filter(Boolean));
        }
      } catch (err) {
        console.warn('Supabase sync error:', err);
      } finally {
        if (isMounted) {
          setIsLoadingCart(false);
          setIsLoadingWishlist(false);
        }
      }
    }

    syncUserData();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);

  // Persist guest state to localStorage when not authenticated
  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
      } catch (e) {
        console.warn('Failed to save guest cart:', e);
      }
    }
  }, [cart, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
      } catch (e) {
        console.warn('Failed to save guest wishlist:', e);
      }
    }
  }, [wishlist, currentUser]);

  // Cart operations
  const addToCart = async (product, qty = 1) => {
    const maxStock = product.stock ?? product.stock_quantity ?? 99;
    if (maxStock <= 0) {
      showToast(`Sorry, "${product.name}" is currently out of stock.`, 'warning');
      return false;
    }

    const currentItem = cart.find(i => i.product.id === product.id);
    const existingQty = currentItem ? currentItem.quantity : 0;
    const targetQty = existingQty + qty;

    if (targetQty > maxStock) {
      showToast(`Cannot add more. Only ${maxStock} units left in stock.`, 'warning');
      return false;
    }

    // Optimistic local state update
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: targetQty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });

    showToast(`Added "${product.name}" to cart (₹${(product.price * qty).toLocaleString('en-IN')})`);

    // Persist to Supabase if authenticated
    if (currentUser?.id) {
      cartService.addToCart(currentUser.id, product.id, qty).catch(err => {
        console.warn('Failed to persist cart item to Supabase:', err);
      });
    }

    return true;
  };

  const removeFromCart = async (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');

    if (currentUser?.id) {
      cartService.removeFromCart(currentUser.id, productId).catch(err => {
        console.warn('Failed to remove cart item from Supabase:', err);
      });
    }
  };

  const updateQuantity = async (productId, delta) => {
    const item = cart.find(i => i.product.id === productId);
    if (!item) return;

    const maxStock = item.product.stock ?? item.product.stock_quantity ?? 99;
    const newQty = item.quantity + delta;

    if (newQty > maxStock) {
      showToast(`Maximum available stock reached (${maxStock} units).`, 'warning');
      return;
    }

    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(i =>
        i.product.id === productId ? { ...i, quantity: newQty } : i
      )
    );

    if (currentUser?.id) {
      cartService.updateQuantity(currentUser.id, productId, newQty).catch(err => {
        console.warn('Failed to update cart quantity in Supabase:', err);
      });
    }
  };

  const clearCart = async () => {
    setCart([]);
    showToast('Cart cleared', 'info');

    if (currentUser?.id) {
      cartService.clearCart(currentUser.id).catch(err => {
        console.warn('Failed to clear cart in Supabase:', err);
      });
    }
  };

  // Wishlist operations
  const toggleWishlist = async (product) => {
    const exists = wishlist.includes(product.id);

    if (exists) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      setWishlistItems(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'info');

      if (currentUser?.id) {
        wishlistService.removeFromWishlist(currentUser.id, product.id).catch(err => {
          console.warn('Failed to remove from Supabase wishlist:', err);
        });
      }
    } else {
      setWishlist(prev => [...prev, product.id]);
      setWishlistItems(prev => [product, ...prev]);
      showToast(`Saved "${product.name}" to wishlist`);

      if (currentUser?.id) {
        wishlistService.addToWishlist(currentUser.id, product.id).catch(err => {
          console.warn('Failed to save to Supabase wishlist:', err);
        });
      } else {
        showToast(`Tip: Log in to keep your saved items synced forever!`, 'info');
      }
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Comparison operations (Max 4 products)
  const toggleComparison = (product) => {
    setComparisonList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from comparison`, 'info');
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 products at a time.', 'warning');
        return prev;
      }
      showToast(`Added "${product.name}" to comparison (${prev.length + 1}/4)`);
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId) => {
    setComparisonList(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonList([]);
    setIsComparisonModalOpen(false);
  };

  const isComparing = (productId) => comparisonList.some(p => p.id === productId);

  // Recently viewed recording
  const recordViewedProduct = (product) => {
    if (!product || !product.id) return;
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to store recently viewed:', e);
      }
      return updated;
    });
  };

  // Calculations in INR
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartOriginalSubtotal = cart.reduce(
    (total, item) => total + ((item.product.originalPrice || item.product.price) * item.quantity),
    0
  );
  const cartSavings = Math.max(0, cartOriginalSubtotal - cartSubtotal);
  const shippingFee = cartSubtotal > 1000 || cart.length === 0 ? 0 : 99;
  const cartTotal = cartSubtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        wishlistItems,
        isLoadingCart,
        isLoadingWishlist,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartSubtotal,
        cartOriginalSubtotal,
        cartSavings,
        shippingFee,
        cartTotal,
        // Comparison
        comparisonList,
        isComparing,
        toggleComparison,
        removeFromComparison,
        clearComparison,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        // Recently Viewed
        recentlyViewed,
        recordViewedProduct,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
