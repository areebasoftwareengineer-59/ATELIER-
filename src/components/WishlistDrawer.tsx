import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    setIsCartOpen,
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: any) => {
    addToCart(product, product.variants[0]?.id, product.sizes[0], 1);
    toggleWishlist(product.id);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-black/[0.08]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-black/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-neutral-900 fill-neutral-900" />
              <h2 className="font-serif text-xl text-neutral-950 font-normal">
                Saved Wishlist
              </h2>
              <span className="font-mono text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded tabular-nums">
                {savedProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <Heart className="w-12 h-12 text-neutral-300 stroke-1" />
                <p className="font-serif text-lg text-neutral-900">Your wishlist is empty</p>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Tap the heart icon on any piece to save it for future consideration.
                </p>
              </div>
            ) : (
              savedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex gap-4 p-3 bg-neutral-50/70 rounded-lg border border-black/[0.04] transition-all"
                >
                  <div className="w-20 h-24 bg-[#F5F5F3] rounded overflow-hidden shrink-0 border border-black/[0.04]">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500">{prod.subtitle}</p>
                      <p className="font-mono text-xs font-semibold text-neutral-950 mt-1 tabular-nums">
                        {formatPrice(prod.priceUSD)}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleMoveToBag(prod)}
                        className="w-full py-1.5 px-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
