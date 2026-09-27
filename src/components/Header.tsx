import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CurrencyCode } from '../types/ecommerce';
import { CURRENCIES } from '../data/products';
import { Search, ShoppingBag, Heart, Package, X, ChevronDown, Check } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currency,
    setCurrency,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsOrderTrackerOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useStore();

  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const categories = ['All', 'Apparel', 'Leather Goods', 'Timepieces', 'Footwear', 'Fragrance'];

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
      {/* Promotional Announcement Banner (dismissible, <= 40px) */}
      {!isBannerDismissed && (
        <div className="bg-neutral-900 text-neutral-200 text-xs py-2 px-4 flex items-center justify-between transition-colors">
          <div className="flex-1 text-center font-normal tracking-wide">
            <span>Complimentary Global Express Delivery on orders over $250</span>
            <span className="mx-2 opacity-40">·</span>
            <span className="text-amber-200 font-medium">Use code ATELIER15 for 15% off</span>
          </div>
          <button
            onClick={() => setIsBannerDismissed(true)}
            className="text-neutral-400 hover:text-white p-0.5 ml-2 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 1 row, exactly 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <div className="flex items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-neutral-950 hover:opacity-85 transition-opacity cursor-pointer"
          >
            ATELIER
          </a>
        </div>

        {/* Zone 2: 4-6 text navigation links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-neutral-700">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryNav(cat)}
              className="relative py-1 hover:text-neutral-950 transition-colors cursor-pointer group"
            >
              {cat}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neutral-950 transition-all duration-200 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary action clusters (Currency, Track, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/70 transition-colors cursor-pointer"
              title="Change Currency"
            >
              <span className="font-mono">{currency}</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {isCurrencyDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsCurrencyDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-lg shadow-lg border border-neutral-200/80 py-1 z-20">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => {
                        setCurrency(cCode);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-neutral-900">{cCode} ({CURRENCIES[cCode].symbol})</span>
                      {currency === cCode && <Check className="w-3 h-3 text-neutral-900" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => {
              setIsSearchActive(!isSearchActive);
              if (!isSearchActive) {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="p-2 text-neutral-700 hover:text-neutral-950 rounded hover:bg-neutral-100/70 transition-colors cursor-pointer"
            aria-label="Search Catalog"
            title="Search Products"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Order Tracker Trigger */}
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="p-2 text-neutral-700 hover:text-neutral-950 rounded hover:bg-neutral-100/70 transition-colors cursor-pointer"
            aria-label="Track Order"
            title="Track Order Status"
          >
            <Package className="w-4.5 h-4.5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-neutral-700 hover:text-neutral-950 rounded hover:bg-neutral-100/70 relative transition-colors cursor-pointer"
            aria-label="Saved Wishlist"
            title="Wishlist"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] font-medium flex items-center justify-center rounded-full tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-neutral-950 text-white text-xs font-medium px-3.5 py-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono text-xs tabular-nums bg-white/20 px-1.5 py-0.5 rounded">
              {cartCount}
            </span>
          </button>

        </div>
      </div>

      {/* Expanded Quick Search Row */}
      {isSearchActive && (
        <div className="bg-white border-t border-black/[0.06] px-4 py-3 sm:px-8 animate-fadeIn">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cashmere coats, titanium watches, leather bags, parfum..."
              className="flex-1 text-sm bg-transparent outline-none text-neutral-900 placeholder-neutral-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchActive(false)}
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 ml-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
