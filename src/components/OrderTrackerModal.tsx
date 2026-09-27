import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Search, Package, Check, Truck, Clock, ShieldCheck } from 'lucide-react';

export const OrderTrackerModal: React.FC = () => {
  const {
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    lookupOrder,
    orders,
    formatPrice,
  } = useStore();

  const [inputOrderId, setInputOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOrderTrackerOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOrderId.trim()) return;
    const found = lookupOrder(inputOrderId);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const handleSelectRecent = (orderId: string) => {
    setInputOrderId(orderId);
    const found = lookupOrder(orderId);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-xl rounded-lg shadow-2xl overflow-hidden border border-black/[0.08] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FBFBF9]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-neutral-800" />
            <h2 className="font-serif text-xl text-neutral-950 font-normal">
              Atelier Shipment Tracker
            </h2>
          </div>
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close order tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-medium text-neutral-700 block">
              Enter Atelier Order Reference (e.g. ATL-10420)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                placeholder="ATL-XXXXX"
                className="flex-1 p-2.5 bg-neutral-50 border border-neutral-300 rounded text-xs font-mono uppercase outline-none focus:border-neutral-900"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-neutral-950 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
          </form>

          {/* Quick Select from User's Local Orders */}
          {orders.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium block">
                Your Recent Orders
              </span>
              <div className="flex flex-wrap gap-2">
                {orders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => handleSelectRecent(ord.id)}
                    className="px-2.5 py-1 text-xs font-mono bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-800 transition-colors cursor-pointer"
                  >
                    {ord.id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result Display */}
          {hasSearched && (
            <div>
              {searchedOrder ? (
                <div className="p-4 bg-neutral-50 rounded-lg border border-black/[0.06] space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                    <div>
                      <span className="text-[11px] text-neutral-500 font-mono">Reference</span>
                      <p className="font-mono font-semibold text-neutral-900 text-sm">{searchedOrder.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-neutral-500">Estimated Delivery</span>
                      <p className="text-xs font-semibold text-neutral-900">{searchedOrder.estimatedDeliveryDate}</p>
                    </div>
                  </div>

                  {/* Shipment Stepper */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-neutral-800">Dispatch Status</p>
                    <div className="relative border-l-2 border-neutral-900 ml-2 pl-4 space-y-4 text-xs">
                      
                      <div className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-neutral-900 rounded-full ring-4 ring-neutral-100" />
                        <p className="font-semibold text-neutral-900">Order Confirmed & Payment Verified</p>
                        <p className="text-[11px] text-neutral-500">Allocated to Florence Atelier warehouse</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-neutral-900 rounded-full ring-4 ring-neutral-100" />
                        <p className="font-semibold text-neutral-900">Archival Packaging & Quality Inspection</p>
                        <p className="text-[11px] text-neutral-500">Certificate of authenticity signed by master artisan</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-neutral-300 rounded-full" />
                        <p className="font-medium text-neutral-400">DHL Express International Transit</p>
                        <p className="text-[11px] text-neutral-400">Tracking airway bill assigned</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-neutral-300 rounded-full" />
                        <p className="font-medium text-neutral-400">Out for Signature Delivery</p>
                      </div>

                    </div>
                  </div>

                  <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-xs text-neutral-600">
                    <span>Recipient: {searchedOrder.shippingAddress.fullName}</span>
                    <span className="font-mono tabular-nums font-semibold text-neutral-900">
                      Total: {formatPrice(searchedOrder.totalUSD)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-50 rounded border border-black/[0.04] space-y-1">
                  <p className="font-medium text-neutral-800">No record found for "{inputOrderId}"</p>
                  <p>Please double-check your order reference format (e.g. ATL-12345).</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
