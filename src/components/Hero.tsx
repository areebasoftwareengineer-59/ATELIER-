import React from 'react';
import { heroImg } from '../data/products';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleExplore = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryQuick = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column: Refined typography */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Unboxed clean metadata (Zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium">
              <span>Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Craftsmanship</span>
              <span aria-hidden="true">·</span>
              <span>Limited Runs</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-950 font-normal tracking-tight leading-[1.1] max-w-xl text-balance">
              The Architecture of Quiet Luxury
            </h1>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-lg font-light">
              Carefully engineered garments, hand-burnished Tuscan leather goods, and chronometric precision instruments. Designed for a lifetime of understated wear.
            </p>

            {/* Action buttons (single-line controls) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleCategoryQuick('Timepieces')}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-neutral-300 text-neutral-900 text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                New Timepieces
              </button>
            </div>

            {/* Adjacent Trust Proof (Adjacency principle) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/[0.06] text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span className="text-xs font-normal">Global Express</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span className="text-xs font-normal">Authenticity Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-neutral-800 shrink-0" />
                <span className="text-xs font-normal">30-Day Returns</span>
              </div>
            </div>

          </div>

          {/* Right Image Column: High-fidelity campaign image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-lg overflow-hidden bg-neutral-200 shadow-md">
              <img
                src={heroImg}
                alt="Atelier Campaign 2026 Collection"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-neutral-300 font-mono">Series N° 26</p>
                  <p className="font-serif text-lg text-white">Milan & Florence Studios</p>
                </div>
                <span className="text-xs text-neutral-200 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded">
                  250 Pieces Worldwide
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
