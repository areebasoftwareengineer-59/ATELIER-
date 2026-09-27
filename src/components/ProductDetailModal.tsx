import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, Star, Check, Shield, Truck, Ruler, Plus, Minus, ArrowRight } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    addReview,
  } = useStore();

  if (!selectedProduct) return null;

  const [selectedVariantId, setSelectedVariantId] = useState(
    selectedProduct.variants[0]?.id || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.sizes[0] || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(selectedProduct.image);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Review Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const isFavorited = isInWishlist(selectedProduct.id);
  const currentVariant =
    selectedProduct.variants.find((v) => v.id === selectedVariantId) ||
    selectedProduct.variants[0];

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentVariant.id, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const handleInstantBuy = () => {
    addToCart(selectedProduct, currentVariant.id, selectedSize, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    setIsSubmittingReview(true);
    addReview(
      selectedProduct.id,
      newAuthor.trim(),
      newRating,
      newComment.trim(),
      newLocation.trim() || undefined
    );
    setNewAuthor('');
    setNewComment('');
    setNewLocation('');
    setIsSubmittingReview(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden border border-black/[0.08] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-neutral-950 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            
            {/* Gallery Column (Left - 6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Primary Image Viewport */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F5F5F3] border border-black/[0.04]">
                <img
                  src={activeImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[11px] font-mono uppercase px-2.5 py-0.5 rounded">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                <div className="flex items-center gap-3">
                  {selectedProduct.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 aspect-[4/3] rounded overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === img
                          ? 'border-neutral-900 ring-1 ring-neutral-900'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality & Guarantee Adjacency */}
              <div className="p-4 bg-neutral-50 rounded-lg space-y-2 border border-black/[0.04] text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-neutral-800" />
                  <span className="font-medium text-neutral-800">Authentic Certified Atelier Piece</span>
                </div>
                <p className="text-neutral-500 pl-6 font-light">
                  Accompanied by an embossed archival certificate of authenticity with serial number matching database records.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Truck className="w-4 h-4 text-neutral-800" />
                  <span className="text-neutral-700">Insured express courier with signature required upon receipt.</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module (Right - 6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                    <span>{selectedProduct.category}</span>
                    <span className="mx-2">·</span>
                    <span>{selectedProduct.details.origin}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(selectedProduct.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono font-medium text-neutral-900">
                      {selectedProduct.rating}
                    </span>
                    <span className="text-neutral-500">
                      ({selectedProduct.reviewsCount} verified reviews)
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h1 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-normal">
                  {selectedProduct.name}
                </h1>

                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {selectedProduct.description}
                </p>

                {/* Price Line (tabular numerals) */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-mono text-2xl font-semibold text-neutral-950 tabular-nums">
                    {formatPrice(selectedProduct.priceUSD)}
                  </span>
                  {selectedProduct.originalPriceUSD && (
                    <span className="font-mono text-sm text-neutral-400 line-through tabular-nums">
                      {formatPrice(selectedProduct.originalPriceUSD)}
                    </span>
                  )}
                  <span className="text-xs text-neutral-500">
                    Includes all duties & local taxes
                  </span>
                </div>

                {/* Variant Color Selector */}
                {selectedProduct.variants.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-600">
                        Finish: <span className="text-neutral-950 font-medium">{currentVariant.name}</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 font-mono">
                        {selectedProduct.stockCount} units remaining
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantId(v.id)}
                          className={`group relative p-1 rounded-full border-2 transition-all cursor-pointer ${
                            selectedVariantId === v.id
                              ? 'border-neutral-900 scale-105'
                              : 'border-transparent hover:scale-105'
                          }`}
                          title={v.name}
                        >
                          <span
                            className="block w-6 h-6 rounded-full shadow-inner border border-black/10"
                            style={{ backgroundColor: v.colorHex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {selectedProduct.sizes.length > 1 && (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-600 font-medium">Select Specification</span>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-950 underline underline-offset-4 cursor-pointer text-xs"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Sizing Guide</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`py-2 px-3 text-xs font-mono font-medium rounded border transition-colors cursor-pointer text-center ${
                            selectedSize === s
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 bg-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper & Actions */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-4">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-300 rounded bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 font-mono text-sm font-medium text-neutral-900 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(selectedProduct.stockCount, quantity + 1))}
                        className="p-2.5 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(selectedProduct.id)}
                      className="p-2.5 border border-neutral-300 hover:border-neutral-400 rounded bg-white text-neutral-700 hover:text-red-600 transition-colors cursor-pointer"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorited ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3.5 px-6 bg-white border-2 border-neutral-950 text-neutral-950 text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      Add to Bag
                    </button>

                    <button
                      onClick={handleInstantBuy}
                      className="w-full py-3.5 px-6 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>Instant Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Accordion / Secondary Tabs (Details vs Verified Reviews) */}
              <div className="pt-6 border-t border-black/[0.08]">
                <div className="flex border-b border-black/[0.06] gap-6 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-b-2 border-neutral-950 text-neutral-950'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Materials & Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'reviews'
                        ? 'border-b-2 border-neutral-950 text-neutral-950'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <span>Collector Reviews</span>
                    <span className="font-mono text-[11px] bg-neutral-100 px-1.5 py-0.5 rounded">
                      {selectedProduct.reviewsCount}
                    </span>
                  </button>
                </div>

                <div className="pt-4 text-xs text-neutral-600">
                  {activeTab === 'details' ? (
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-neutral-900">Composition: </span>
                        <span>{selectedProduct.details.materials}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900">Manufacturing: </span>
                        <span>{selectedProduct.details.origin}</span>
                      </div>
                      {selectedProduct.details.dimensions && (
                        <div>
                          <span className="font-semibold text-neutral-900">Dimensions: </span>
                          <span>{selectedProduct.details.dimensions}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-neutral-900">Preservation Care: </span>
                        <span>{selectedProduct.details.care}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                      {/* Existing Reviews */}
                      {selectedProduct.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-neutral-50 rounded border border-black/[0.04] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-neutral-900">{rev.author}</span>
                            <span className="text-[11px] text-neutral-400">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-neutral-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-neutral-700 font-light">{rev.comment}</p>
                          {rev.location && (
                            <span className="text-[10px] text-neutral-400 block font-mono">
                              Verified Purchase · {rev.location}
                            </span>
                          )}
                        </div>
                      ))}

                      {/* Add Review Form */}
                      <form onSubmit={handleReviewSubmit} className="pt-3 border-t border-black/[0.06] space-y-2.5">
                        <span className="font-semibold text-neutral-900 block text-xs">
                          Leave a Verified Collector Review
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            className="p-2 border border-neutral-200 rounded text-xs outline-none focus:border-neutral-900 bg-white"
                          />
                          <input
                            type="text"
                            placeholder="City, Country"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="p-2 border border-neutral-200 rounded text-xs outline-none focus:border-neutral-900 bg-white"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-600">Rating:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <button
                                type="button"
                                key={num}
                                onClick={() => setNewRating(num)}
                                className="cursor-pointer"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    num <= newRating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-neutral-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <textarea
                          required
                          rows={2}
                          placeholder="Share your experience regarding fabric weight, hand-feel, or sizing..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full p-2 border border-neutral-200 rounded text-xs outline-none focus:border-neutral-900 bg-white resize-none"
                        />

                        <button
                          type="submit"
                          disabled={isSubmittingReview}
                          className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
