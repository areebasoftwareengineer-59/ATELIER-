import React from 'react';
import { useStore } from '../context/StoreContext';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export const CatalogControls: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useStore();

  const categories = ['All', 'Apparel', 'Leather Goods', 'Timepieces', 'Footwear', 'Fragrance'];

  return (
    <div id="catalog-section" className="pt-10 pb-6 border-b border-black/[0.06]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Interactive Segmented Filter Controls (functional buttons with click handlers) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Right Search & Sort Controls */}
        <div className="flex items-center gap-3">
          
          {/* Quick inline search input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter items..."
              className="w-full text-xs pl-8 pr-7 py-2 bg-white border border-neutral-200 rounded focus:border-neutral-900 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded px-2.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-transparent text-neutral-700 outline-none cursor-pointer font-medium"
            >
              <option value="featured">Curated Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
