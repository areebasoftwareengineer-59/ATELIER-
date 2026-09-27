import React from 'react';
import { Product } from '../types/ecommerce';
import { useStore } from '../context/StoreContext';
import { Heart, Plus, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants[0]?.id, product.sizes[0], 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group flex flex-col bg-white rounded-lg border border-black/[0.06] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer relative"
    >
      {/* Image Container (65-75% height) on neutral backdrop */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full bg-[#F5F5F3] overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Single Badge (if present) - strictly text based */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-neutral-900/90 text-white text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded backdrop-blur-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-red-600 shadow-sm transition-all duration-200 cursor-pointer"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-neutral-950/90 hover:bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold rounded backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          
          {/* Category & Origin Unboxed Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.details.origin.replace('Crafted in ', '')}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-medium text-neutral-900 text-sm sm:text-base group-hover:text-neutral-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Subtitle / Key Specs */}
          <p className="text-xs text-neutral-500 line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="pt-3 mt-3 border-t border-black/[0.05] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-semibold text-neutral-950 tabular-nums">
              {formatPrice(product.priceUSD)}
            </span>
            {product.originalPriceUSD && (
              <span className="font-mono text-xs text-neutral-400 line-through tabular-nums">
                {formatPrice(product.originalPriceUSD)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-mono tabular-nums font-medium">{product.rating}</span>
            <span className="text-[11px] text-neutral-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden pt-3">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-neutral-900 text-white text-xs font-medium rounded flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
