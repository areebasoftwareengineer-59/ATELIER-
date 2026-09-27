import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, PaymentMethod } from '../types/ecommerce';
import { X, CreditCard, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotalUSD,
    discountUSD,
    shippingUSD,
    totalUSD,
    formatPrice,
    placeOrder,
  } = useStore();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCVC, setCardCVC] = useState('382');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.email || !address.phone || !address.streetAddress) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      placeOrder(address, paymentMethod);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden border border-black/[0.08] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FBFBF9]">
          <div>
            <h2 className="font-serif text-xl text-neutral-950 font-normal">
              Atelier Express Checkout
            </h2>
            <p className="text-xs text-neutral-500">
              Provide delivery destination and select payment method
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Destination Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-mono flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Delivery Destination
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Julian Montgomery"
                    className="w-full p-2.5 bg-neutral-50/50 border border-neutral-300 rounded text-xs outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">Email Address (for Receipt) *</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="julian@example.com"
                    className="w-full p-2.5 bg-neutral-50/50 border border-neutral-300 rounded text-xs outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">Mobile Phone (Delivery SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full p-2.5 bg-neutral-50/50 border border-neutral-300 rounded text-xs outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">Country / Region *</label>
                  <select
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    className="w-full p-2.5 bg-neutral-50/50 border border-neutral-300 rounded text-xs outline-none focus:border-neutral-900"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Japan">Japan</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-medium text-neutral-700">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    placeholder="742 Evergreen Boulevard, Suite 4B"
                    className="w-full p-2.5 bg-neutral-50/50 border border-neutral-300 rounded text-xs outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">City / District *</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="New York"
                    className="w-full p-2.5 bg-neutral-50/50 border border-neutral-300 rounded text-xs outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700">Postal / Zip Code *</label>
                  <input
                    type="text"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder="10001"
                    className="w-full p-2.5 bg-neutral-50/50 border border-neutral-300 rounded text-xs outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] font-mono flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery (COD) */}
                <label
                  className={`p-3.5 rounded-lg border-2 flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-950 bg-neutral-50/80 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Banknote className="w-5 h-5 text-neutral-800" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-neutral-950"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-neutral-900">Cash on Delivery</p>
                    <p className="text-[11px] text-neutral-500 font-light mt-0.5">Pay in cash or card upon delivery</p>
                  </div>
                </label>

                {/* Card Payment */}
                <label
                  className={`p-3.5 rounded-lg border-2 flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-neutral-950 bg-neutral-50/80 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <CreditCard className="w-5 h-5 text-neutral-800" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-neutral-950"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-neutral-900">Credit / Debit Card</p>
                    <p className="text-[11px] text-neutral-500 font-light mt-0.5">Visa, Mastercard, Amex</p>
                  </div>
                </label>

                {/* UPI / Instant Bank Transfer */}
                <label
                  className={`p-3.5 rounded-lg border-2 flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-neutral-950 bg-neutral-50/80 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <CheckCircle2 className="w-5 h-5 text-neutral-800" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-neutral-950"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-neutral-900">UPI / Direct Transfer</p>
                    <p className="text-[11px] text-neutral-500 font-light mt-0.5">Instant zero-fee transfer</p>
                  </div>
                </label>
              </div>

              {/* Conditional Card Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-3 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-600 font-medium">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-neutral-300 rounded text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-600 font-medium">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2 bg-white border border-neutral-300 rounded text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-600 font-medium">CVC / Security Code</label>
                      <input
                        type="text"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        className="w-full p-2 bg-white border border-neutral-300 rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded text-xs text-amber-900 space-y-1">
                  <p className="font-semibold">Cash on Delivery Terms:</p>
                  <p className="font-light">
                    Our dedicated courier will verify your ID upon delivery. You can inspect the package seals prior to payment.
                  </p>
                </div>
              )}
            </div>

            {/* Order Review Summary */}
            <div className="p-4 bg-neutral-50 rounded border border-black/[0.04] space-y-2">
              <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Order Review ({cart.length} items)
              </h4>
              <div className="space-y-1 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(subtotalUSD)}</span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier Delivery</span>
                  <span className="font-mono tabular-nums">
                    {shippingUSD === 0 ? 'Complimentary' : formatPrice(shippingUSD)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-black/[0.06] text-sm font-semibold text-neutral-950">
                  <span>Grand Total</span>
                  <span className="font-mono text-base tabular-nums">
                    {formatPrice(totalUSD)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 px-6 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Order Confirmation...</span>
                ) : (
                  <span>Complete Order · {formatPrice(totalUSD)}</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                <span>30-Day Atelier Guarantee · Free Returns & Exchanges</span>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
