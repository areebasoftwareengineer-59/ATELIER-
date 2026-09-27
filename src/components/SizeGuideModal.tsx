import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-xl rounded-lg shadow-2xl overflow-hidden border border-black/[0.08] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FBFBF9]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-neutral-800" />
            <h2 className="font-serif text-xl text-neutral-950 font-normal">
              Atelier Sizing Guide
            </h2>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-700">
          
          {/* Apparel Table */}
          <div className="space-y-2">
            <h4 className="font-semibold text-neutral-950 uppercase tracking-wider">
              Tailoring & Coats (Inches / cm)
            </h4>
            <div className="overflow-x-auto border border-black/[0.06] rounded">
              <table className="w-full text-left font-mono">
                <thead className="bg-neutral-50 border-b border-black/[0.06] text-neutral-600">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">EU / US</th>
                    <th className="p-2.5">Chest</th>
                    <th className="p-2.5">Shoulder</th>
                    <th className="p-2.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">38 / S</td>
                    <td className="p-2.5">48 / 38</td>
                    <td className="p-2.5">40" / 102cm</td>
                    <td className="p-2.5">18.5" / 47cm</td>
                    <td className="p-2.5">43" / 109cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">40 / M</td>
                    <td className="p-2.5">50 / 40</td>
                    <td className="p-2.5">42" / 107cm</td>
                    <td className="p-2.5">19.2" / 49cm</td>
                    <td className="p-2.5">44" / 112cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">42 / L</td>
                    <td className="p-2.5">52 / 42</td>
                    <td className="p-2.5">44" / 112cm</td>
                    <td className="p-2.5">20.0" / 51cm</td>
                    <td className="p-2.5">45" / 114cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">44 / XL</td>
                    <td className="p-2.5">54 / 44</td>
                    <td className="p-2.5">46" / 117cm</td>
                    <td className="p-2.5">20.8" / 53cm</td>
                    <td className="p-2.5">46" / 117cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footwear Table */}
          <div className="space-y-2">
            <h4 className="font-semibold text-neutral-950 uppercase tracking-wider">
              Footwear Conversion
            </h4>
            <div className="overflow-x-auto border border-black/[0.06] rounded">
              <table className="w-full text-left font-mono">
                <thead className="bg-neutral-50 border-b border-black/[0.06] text-neutral-600">
                  <tr>
                    <th className="p-2.5">EU</th>
                    <th className="p-2.5">US Men</th>
                    <th className="p-2.5">UK</th>
                    <th className="p-2.5">Foot Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">40</td>
                    <td className="p-2.5">7.0</td>
                    <td className="p-2.5">6.0</td>
                    <td className="p-2.5">25.5 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">41</td>
                    <td className="p-2.5">8.0</td>
                    <td className="p-2.5">7.0</td>
                    <td className="p-2.5">26.3 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">42</td>
                    <td className="p-2.5">9.0</td>
                    <td className="p-2.5">8.0</td>
                    <td className="p-2.5">27.0 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">43</td>
                    <td className="p-2.5">10.0</td>
                    <td className="p-2.5">9.0</td>
                    <td className="p-2.5">27.8 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-neutral-950">44</td>
                    <td className="p-2.5">11.0</td>
                    <td className="p-2.5">10.0</td>
                    <td className="p-2.5">28.5 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded text-neutral-500 font-light">
            Need bespoke alteration advice? Our concierge team offers complimentary virtual fitting appointments. Contact concierge@atelier-luxury.com
          </div>

        </div>
      </div>
    </div>
  );
};
