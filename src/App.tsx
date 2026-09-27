/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogControls } from './components/CatalogControls';
import { ProductCard } from './components/ProductCard';
import { CraftsmanshipStory } from './components/CraftsmanshipStory';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastContainer } from './components/ToastContainer';
import { SearchX } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const { products, selectedCategory, searchQuery, sortBy, setSelectedCategory, setSearchQuery } = useStore();

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        
        if (!matchesCategory) return false;

        if (!searchQuery.trim()) return true;

        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.details.materials.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default featured
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#191919]">
      <Header />
      
      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero />

        {/* Curated Product Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium mb-1">
                <span>Catalogue Raisonné</span>
                <span aria-hidden="true">·</span>
                <span>Active Editions</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-950">
                {selectedCategory === 'All' ? 'Permanent Collection' : selectedCategory}
              </h2>
            </div>
            <p className="text-xs text-neutral-500 font-mono">
              Showing {filteredProducts.length} of {products.length} archival pieces
            </p>
          </div>

          {/* Interactive Filters & Search */}
          <CatalogControls />

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <SearchX className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg text-neutral-900">No matching pieces found</p>
                <p className="text-xs text-neutral-500">
                  Try adjusting your search keywords or browsing all categories.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-neutral-950 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </section>

        {/* Brand Heritage Narrative & Proof */}
        <CraftsmanshipStory />
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackerModal />
      <WishlistDrawer />
      <SizeGuideModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
