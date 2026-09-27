import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    formatPrice,
    updateCartQuantity,
    removeFromCart,
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
    setIsCheckoutOpen,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res.message);
    if (res.success) {
      setPromoInput('');
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThresholdUSD - subtotalUSD);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-black/[0.08]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-black/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl text-neutral-950 font-normal">
                Shopping Bag
              </h2>
              <span className="font-mono text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded tabular-nums">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-4 sm:px-6 py-3 bg-[#F9F9F8] border-b border-black/[0.04]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span className="text-neutral-600 font-light">
                  Add <strong className="font-mono font-medium text-neutral-900">{formatPrice(remainingForFreeShipping)}</strong> more for Complimentary Express Shipping
                </span>
              ) : (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked: Complimentary Worldwide Express Shipping
                </span>
              )}
              <span className="font-mono text-[11px] text-neutral-500 tabular-nums">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  remainingForFreeShipping === 0 ? 'bg-emerald-600' : 'bg-neutral-900'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <Tag className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg text-neutral-900">Your bag is currently empty</p>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    Explore our curated collection of tailoring, leather goods, and fine chronographs.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}-${item.size}`}
                  className="flex gap-4 p-3 bg-neutral-50/70 rounded-lg border border-black/[0.04] transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#F5F5F3] rounded overflow-hidden shrink-0 border border-black/[0.04]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.variantId, item.size)}
                          className="text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                        <span>{item.variantName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.size}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Item Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-300 rounded bg-white">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.variantId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="p-1 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-medium text-neutral-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.variantId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="p-1 text-neutral-600 hover:text-neutral-950 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-semibold text-neutral-900 tabular-nums">
                        {formatPrice(item.unitPriceUSD * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-black/[0.06] bg-[#FBFBF9] space-y-4">
              
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded border border-emerald-200">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Promo <strong className="font-mono">{appliedPromo}</strong> ({appliedDiscountPercent}% OFF)
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. ATELIER15)"
                      className="flex-1 text-xs px-3 py-2 bg-white border border-neutral-300 rounded outline-none focus:border-neutral-900 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-neutral-900 text-white text-xs font-medium rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && !appliedPromo && (
                  <p className="text-[11px] text-red-600">{promoFeedback}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-black/[0.04]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-950 tabular-nums">
                    {formatPrice(subtotalUSD)}
                  </span>
                </div>

                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promotional Discount ({appliedDiscountPercent}%)</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountUSD)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Courier Delivery</span>
                  <span className="font-mono text-neutral-950 tabular-nums">
                    {shippingUSD === 0 ? 'Free' : formatPrice(shippingUSD)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-black/[0.06] text-sm font-semibold text-neutral-950">
                  <span>Total</span>
                  <span className="font-mono text-base tabular-nums">
                    {formatPrice(totalUSD)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-6 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 256-Bit SSL Checkout Security</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
