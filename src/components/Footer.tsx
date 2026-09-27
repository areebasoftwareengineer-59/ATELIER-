import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    showToast('Subscribed! Your invitation code ATELIER15 has been copied to your bag.');
    setEmail('');
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-3xl text-white tracking-tight">
              ATELIER
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              Contemporary tailoring, vegetable-tanned leather goods, and high-precision horology. Distributed directly to private collectors without traditional retail markups.
            </p>
            <div className="text-xs text-neutral-400 space-y-1 font-mono pt-2">
              <p>Studios: Florence · Geneva · Grasse · Tokyo</p>
              <p>Client Concierge: concierge@atelier-luxury.com</p>
            </div>
          </div>

          {/* Quick Categories Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {['Apparel', 'Leather Goods', 'Timepieces', 'Footwear', 'Fragrance'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Private Dispatch (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Private Dispatch
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Receive private invitations to seasonal limited releases and archival restoration appointments.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <Check className="w-4 h-4" />
                <span>Enrolled. Privilege Code: ATELIER15</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-neutral-950 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  New subscribers receive 15% off their first order.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Clean copyright and unboxed links */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} ATELIER MAISON DE CONFECTION S.A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Ethical Provenance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
