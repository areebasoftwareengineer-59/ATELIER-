import React from 'react';
import coatImg from '../assets/images/product_cashmere_coat_1790507691412.jpg';
import chronoImg from '../assets/images/product_chronograph_1790507672894.jpg';
import { Award, Compass, Feather, Sparkles } from 'lucide-react';

export const CraftsmanshipStory: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-black/[0.06] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium">
            <span>The Atelier Ethos</span>
            <span aria-hidden="true">·</span>
            <span>Origin Matters</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal">
            No Shortcuts. Master Italian & Swiss Workshops.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
            Every garment and instrument is produced in low-volume batches with family-owned ateliers whose lineages span generations of artisanal discipline.
          </p>
        </div>

        {/* 2-Column Visual Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Card 1: Tuscan Leather & Mongolian Wool */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100">
              <img
                src={coatImg}
                alt="Cashmere and wool tailoring"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Florence & Scandicci
              </span>
              <h3 className="font-serif text-xl text-neutral-900 font-normal">
                Slow-Tanned Full-Grain Leather & Cashmere
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Vegetable tannins extracted from chestnut wood treat our calfskin over 40 days without harsh synthetic chemicals. Our cashmere is hand-brushed for unmatched thermal loft.
              </p>
            </div>
          </div>

          {/* Card 2: Geneva Horology */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100">
              <img
                src={chronoImg}
                alt="Titanium Horology"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Geneva & La Chaux-de-Fonds
              </span>
              <h3 className="font-serif text-xl text-neutral-900 font-normal">
                Grade 5 Titanium & Micro-Engineering
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Hand-regulated Swiss mechanical movements tested across 5 positions. Double-domed sapphire with 7 layers of anti-reflective coating guarantees enduring legibility.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Pillars Adjacency Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-black/[0.06] text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
              <Award className="w-4 h-4 text-neutral-800" />
              <span>Full Provenance</span>
            </div>
            <p className="text-neutral-500 font-light leading-normal">
              Direct mill relationships without intermediary markups.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
              <Feather className="w-4 h-4 text-neutral-800" />
              <span>Unpadded Comfort</span>
            </div>
            <p className="text-neutral-500 font-light leading-normal">
              Soft drape structures that mold comfortably to body form.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
              <Compass className="w-4 h-4 text-neutral-800" />
              <span>Zero Excess Stock</span>
            </div>
            <p className="text-neutral-500 font-light leading-normal">
              Measured batch releases to eradicate seasonal deadstock waste.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
              <Sparkles className="w-4 h-4 text-neutral-800" />
              <span>Lifetime Restoration</span>
            </div>
            <p className="text-neutral-500 font-light leading-normal">
              In-house repair, re-conditioning, and movement servicing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
