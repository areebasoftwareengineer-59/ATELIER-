import React from 'react';
import { useStore } from '../context/StoreContext';
import { Check, Copy, Package, Calendar, Truck, ArrowRight, Printer } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { latestOrder, formatPrice, showToast, setIsOrderTrackerOpen } = useStore();

  if (!latestOrder) return null;

  const copyOrderId = () => {
    navigator.clipboard.writeText(latestOrder.id);
    showToast(`Order ID ${latestOrder.id} copied to clipboard!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-black/[0.08] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Success Confirmation */}
        <div className="bg-neutral-900 text-white p-6 sm:p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <Check className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
              Transaction Approved & Verified
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Order Confirmed — Preparing Dispatch
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded text-xs font-mono text-neutral-200">
            <span>Order Reference: <strong>{latestOrder.id}</strong></span>
            <button
              onClick={copyOrderId}
              className="text-neutral-300 hover:text-white p-0.5 cursor-pointer"
              title="Copy Order ID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Estimated Delivery Milestone Tracker */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-black/[0.05] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-neutral-900">
                <Calendar className="w-4 h-4 text-neutral-600" />
                Estimated Express Delivery:
              </span>
              <span className="font-semibold text-neutral-900 font-mono">
                {latestOrder.estimatedDeliveryDate}
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center">
              <div className="space-y-1">
                <div className="w-3 h-3 bg-neutral-900 rounded-full mx-auto ring-4 ring-neutral-200" />
                <span className="text-[10px] font-medium text-neutral-900 block">Confirmed</span>
              </div>
              <div className="space-y-1">
                <div className="w-3 h-3 bg-neutral-900 rounded-full mx-auto" />
                <span className="text-[10px] font-medium text-neutral-900 block">Preparing</span>
              </div>
              <div className="space-y-1">
                <div className="w-3 h-3 bg-neutral-300 rounded-full mx-auto" />
                <span className="text-[10px] text-neutral-400 block">Courier Transit</span>
              </div>
              <div className="space-y-1">
                <div className="w-3 h-3 bg-neutral-300 rounded-full mx-auto" />
                <span className="text-[10px] text-neutral-400 block">Delivered</span>
              </div>
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Purchased Items
            </h4>
            <div className="divide-y divide-black/[0.04] border-y border-black/[0.04]">
              {latestOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded bg-neutral-100"
                    />
                    <div>
                      <p className="font-medium text-neutral-900">{item.product.name}</p>
                      <p className="text-[11px] text-neutral-500 font-light">
                        {item.variantName} · {item.size} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums font-semibold text-neutral-900">
                    {formatPrice(item.unitPriceUSD * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Line */}
            <div className="flex justify-between items-center pt-2 text-sm">
              <span className="font-medium text-neutral-700">Total Paid ({latestOrder.paymentMethod.toUpperCase()})</span>
              <span className="font-mono text-base font-bold text-neutral-950 tabular-nums">
                {formatPrice(latestOrder.totalUSD)}
              </span>
            </div>
          </div>

          {/* Delivery Address Receipt */}
          <div className="p-4 bg-neutral-50 rounded text-xs space-y-1 text-neutral-600">
            <p className="font-semibold text-neutral-900">Shipping To:</p>
            <p className="text-neutral-800">{latestOrder.shippingAddress.fullName}</p>
            <p>{latestOrder.shippingAddress.streetAddress}</p>
            <p>
              {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.postalCode}, {latestOrder.shippingAddress.country}
            </p>
            <p className="text-[11px] text-neutral-400 font-mono pt-1">
              Contact: {latestOrder.shippingAddress.email} · {latestOrder.shippingAddress.phone}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 hover:border-neutral-400 rounded text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>

            <button
              onClick={() => {
                setIsOrderTrackerOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <span>Track Live Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
