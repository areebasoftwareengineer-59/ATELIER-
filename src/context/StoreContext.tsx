import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, Review, CurrencyCode, ShippingAddress, PaymentMethod } from '../types/ecommerce';
import { PRODUCTS, CURRENCIES, PROMO_CODES } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface StoreContextType {
  products: Product[];
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotalUSD: number;
  discountUSD: number;
  shippingUSD: number;
  totalUSD: number;
  freeShippingThresholdUSD: number;
  freeShippingProgress: number; // 0 to 100
  appliedPromo: string | null;
  appliedDiscountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  addToCart: (product: Product, variantId?: string, size?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, variantId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string, size: string) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Selected Product & Modals
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  
  // Orders
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: PaymentMethod) => Order;
  lookupOrder: (orderId: string) => Order | undefined;

  // Reviews
  addReview: (productId: string, author: string, rating: number, comment: string, location?: string) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync cart and wishlist with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
  };

  const convertPrice = (amountUSD: number): number => {
    const rate = CURRENCIES[currency].rate;
    return Math.round(amountUSD * rate);
  };

  const formatPrice = (amountUSD: number): string => {
    const cfg = CURRENCIES[currency];
    const converted = convertPrice(amountUSD);
    const formatted = converted.toLocaleString(
      currency === 'INR' ? 'en-IN' : 'en-US'
    );
    return `${cfg.symbol}${formatted}`;
  };

  // Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);

  const freeShippingThresholdUSD = 250;
  const freeShippingProgress = Math.min(100, Math.round((subtotalUSD / freeShippingThresholdUSD) * 100));

  const appliedDiscountPercent = appliedPromo ? PROMO_CODES[appliedPromo]?.discountPercent || 0 : 0;
  const discountUSD = Math.round((subtotalUSD * appliedDiscountPercent) / 100);
  const shippingUSD = subtotalUSD >= freeShippingThresholdUSD || subtotalUSD === 0 ? 0 : 25;
  const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setAppliedPromo(clean);
      showToast(`Promo ${clean} applied: ${PROMO_CODES[clean].discountPercent}% off`);
      return { success: true, message: `Applied ${PROMO_CODES[clean].discountPercent}% discount!` };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const addToCart = (
    product: Product,
    variantId?: string,
    size?: string,
    quantity: number = 1
  ) => {
    const targetVariant = variantId
      ? product.variants.find((v) => v.id === variantId) || product.variants[0]
      : product.variants[0];
    const targetSize = size || product.sizes[0] || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.variantId === targetVariant.id &&
          item.size === targetSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          productId: product.id,
          product,
          variantId: targetVariant.id,
          variantName: targetVariant.name,
          size: targetSize,
          quantity,
          unitPriceUSD: product.priceUSD,
        },
      ];
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const updateCartQuantity = (
    productId: string,
    variantId: string,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.variantId === variantId &&
        item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, variantId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variantId === variantId &&
            item.size === size
          )
      )
    );
    showToast('Item removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved items.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = products.find((p) => p.id === productId);
        showToast(`Saved "${prod?.name || 'Item'}" to your wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentMethod
  ): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ATL-${randomNum}`;

    // Delivery in 3 business days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const estimatedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      shippingAddress,
      paymentMethod,
      subtotalUSD,
      discountUSD,
      shippingUSD,
      totalUSD,
      currency,
      status: 'confirmed',
      estimatedDeliveryDate,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);

    showToast(`Order #${orderId} confirmed successfully!`);
    return newOrder;
  };

  const lookupOrder = (orderId: string): Order | undefined => {
    const clean = orderId.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === clean);
  };

  // Add user review
  const addReview = (
    productId: string,
    author: string,
    rating: number,
    comment: string,
    location?: string
  ) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      rating,
      date: 'Today',
      comment,
      verified: true,
      location: location || 'Verified Collector',
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        const newReviews = [newRev, ...prod.reviews];
        const newTotalRatings = newReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAvg = Number((newTotalRatings / newReviews.length).toFixed(2));
        return {
          ...prod,
          reviews: newReviews,
          reviewsCount: newReviews.length,
          rating: newAvg,
        };
      })
    );

    // Also update selectedProduct if open
    setSelectedProduct((prev) => {
      if (!prev || prev.id !== productId) return prev;
      const newReviews = [newRev, ...prev.reviews];
      const newTotalRatings = newReviews.reduce((sum, r) => sum + r.rating, 0);
      const newAvg = Number((newTotalRatings / newReviews.length).toFixed(2));
      return {
        ...prev,
        reviews: newReviews,
        reviewsCount: newReviews.length,
        rating: newAvg,
      };
    });

    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        cart,
        cartCount,
        subtotalUSD,
        discountUSD,
        shippingUSD,
        totalUSD,
        freeShippingThresholdUSD,
        freeShippingProgress,
        appliedPromo,
        appliedDiscountPercent,
        applyPromoCode,
        removePromoCode,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        orders,
        latestOrder,
        placeOrder,
        lookupOrder,
        addReview,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
