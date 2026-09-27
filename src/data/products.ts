import { Product, CurrencyConfig, CurrencyCode } from '../types/ecommerce';

import heroImg from '../assets/images/hero_luxury_editorial_1790507655304.jpg';
import chronoImg from '../assets/images/product_chronograph_1790507672894.jpg';
import coatImg from '../assets/images/product_cashmere_coat_1790507691412.jpg';
import toteImg from '../assets/images/product_leather_tote_1790507707169.jpg';
import sneakerImg from '../assets/images/product_minimalist_sneakers_1790507737893.jpg';
import perfumeImg from '../assets/images/product_niche_perfume_1790507757235.jpg';

export { heroImg };

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, prefix: true },
  INR: { code: 'INR', symbol: '₹', rate: 86.5, prefix: true },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, prefix: true },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, prefix: true },
};

export const PRODUCTS: Product[] = [
  {
    id: 'atl-coat-01',
    name: 'Atelier Heavy Cashmere Overcoat',
    category: 'Apparel',
    subtitle: '100% Mongolian Cashmere & Wool Blend',
    description: 'An architectural double-faced tailored coat cut from dense Mongolian wool and brushed cashmere. Features a structured drop shoulder, horn buttons, deep internal welt pockets, and a clean vented hem.',
    priceUSD: 495,
    originalPriceUSD: 580,
    image: coatImg,
    gallery: [coatImg, heroImg],
    variants: [
      { id: 'v-charcoal', name: 'Charcoal Mélange', colorHex: '#2B2B2C', inStock: true },
      { id: 'v-camel', name: 'Camel Dune', colorHex: '#A88D73', inStock: true },
      { id: 'v-obsidian', name: 'Obsidian Black', colorHex: '#141414', inStock: true },
    ],
    sizes: ['38 / S', '40 / M', '42 / L', '44 / XL'],
    tags: ['Cashmere', 'Tailored', 'Winter 2026', 'Made in Florence'],
    stockCount: 8,
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    badge: 'Atelier Edition',
    details: {
      materials: '85% Virgin Wool, 15% Mongolian Cashmere, Bemberg Cupro lining',
      origin: 'Crafted in Scandicci, Italy',
      care: 'Specialist dry clean only. Store on wide cedar hanger.',
    },
    reviews: [
      {
        id: 'rev-01',
        author: 'Julian M.',
        rating: 5,
        date: 'March 14, 2026',
        comment: 'The drape and weight are second to none. The brushed cashmere finish catches light in the most subtle way. Worth every penny.',
        verified: true,
        location: 'London, UK'
      },
      {
        id: 'rev-02',
        author: 'Priya K.',
        rating: 5,
        date: 'February 28, 2026',
        comment: 'Incredible tailoring. Fits oversized exactly as described without drowning the silhouette. The horn buttons feel solid.',
        verified: true,
        location: 'Mumbai, IN'
      }
    ]
  },
  {
    id: 'atl-chrono-02',
    name: 'Chronographe Modèle 01 Titane',
    category: 'Timepieces',
    subtitle: 'Grade 5 Titanium & Dual Column Wheel',
    description: 'A minimalist 39mm automatic chronograph sculpted from aerospace-grade titanium with bead-blasted satin contours. Features double-domed anti-reflective sapphire crystal and a 65-hour power reserve calibre.',
    priceUSD: 850,
    image: chronoImg,
    gallery: [chronoImg],
    variants: [
      { id: 'v-slate', name: 'Matte Slate Titanium', colorHex: '#4E5359', inStock: true },
      { id: 'v-black', name: 'PVD Stealth Black', colorHex: '#1B1B1C', inStock: true },
      { id: 'v-silver', name: 'Brushed Raw Steel', colorHex: '#B0B5B9', inStock: false },
    ],
    sizes: ['39mm Case'],
    tags: ['Automatic', 'Titanium', 'Sapphire', 'Swiss Calibre'],
    stockCount: 5,
    rating: 4.95,
    reviewsCount: 24,
    featured: true,
    badge: 'Limited Batch',
    details: {
      materials: 'Grade 5 Titanium, Domed Sapphire Crystal, FKM Rubber & Mesh Strap',
      origin: 'Geneva, Switzerland',
      dimensions: '39mm diameter, 11.2mm thickness, 20mm lug width',
      care: '100m water resistance. Service recommendation every 5 years.',
    },
    reviews: [
      {
        id: 'rev-03',
        author: 'David Van H.',
        rating: 5,
        date: 'March 02, 2026',
        comment: 'The tactile click of the chronograph pushers is addictive. The weight balance on the wrist is perfection.',
        verified: true,
        location: 'Amsterdam, NL'
      }
    ]
  },
  {
    id: 'atl-tote-03',
    name: 'Verona Full-Grain Leather Shopper',
    category: 'Leather Goods',
    subtitle: 'Vegetable-Tanned Tuscan Calfskin',
    description: 'Constructed from 2.2mm French calf leather tanned naturally with chestnut bark extracts in Tuscany. Hand-burnished edges, antiqued matte brass hardware, and dedicated suede-lined laptop compartment.',
    priceUSD: 380,
    originalPriceUSD: 440,
    image: toteImg,
    gallery: [toteImg],
    variants: [
      { id: 'v-noir', name: 'Noir Matte', colorHex: '#18181A', inStock: true },
      { id: 'v-cognac', name: 'Cognac Saddle', colorHex: '#7A3F1F', inStock: true },
      { id: 'v-olive', name: 'Forest Olive', colorHex: '#2E3A2E', inStock: true },
    ],
    sizes: ['Standard 16L'],
    tags: ['Vegetable-Tanned', 'Full-Grain', 'Handmade', 'Tuscany'],
    stockCount: 12,
    rating: 4.88,
    reviewsCount: 51,
    featured: true,
    details: {
      materials: '100% Full-grain French calfskin, Solid brass hardware, Natural cotton twill lining',
      origin: 'Florence, Italy',
      dimensions: '42cm x 36cm x 14cm (Holds up to 16" MacBook Pro)',
      care: 'Condition once annually with natural beeswax balm.',
    },
    reviews: [
      {
        id: 'rev-04',
        author: 'Elena R.',
        rating: 5,
        date: 'March 18, 2026',
        comment: 'The leather smells glorious and already develops a rich patina after three weeks. Seamless everyday companion.',
        verified: true,
        location: 'New York, USA'
      }
    ]
  },
  {
    id: 'atl-sneaker-04',
    name: 'Atelier 01 Minimal Low-Top',
    category: 'Footwear',
    subtitle: 'Nappa Calfskin & Natural Hevea Rubber Sole',
    description: 'A pure, unembellished low-top sneaker handmade in the Marche region of Italy. Supple full-grain nappa leather, cushioned calfskin footbed with arch support, and vulcanized natural amber rubber sole.',
    priceUSD: 245,
    image: sneakerImg,
    gallery: [sneakerImg],
    variants: [
      { id: 'v-chalk', name: 'Off-White / Chalk', colorHex: '#EAE6DF', inStock: true },
      { id: 'v-bone', name: 'Bone White', colorHex: '#F6F4EE', inStock: true },
      { id: 'v-ebony', name: 'Ebony Monolith', colorHex: '#222222', inStock: true },
    ],
    sizes: ['EU 40 / US 7', 'EU 41 / US 8', 'EU 42 / US 9', 'EU 43 / US 10', 'EU 44 / US 11'],
    tags: ['Handcrafted', 'Nappa Leather', 'Marche Italy', 'Margom Outsole'],
    stockCount: 14,
    rating: 4.85,
    reviewsCount: 67,
    featured: true,
    details: {
      materials: 'Italian Nappa calfskin upper, calfskin lining, vulcanized rubber cupsole',
      origin: 'Civitanova Marche, Italy',
      care: 'Clean with damp cotton cloth. Apply neutral leather conditioner.',
    },
    reviews: [
      {
        id: 'rev-05',
        author: 'Marcus S.',
        rating: 5,
        date: 'March 09, 2026',
        comment: 'Zero break-in period required. Soft leather, clean stitching, clean silhouette that works with both tailored trousers and raw denim.',
        verified: true,
        location: 'Berlin, DE'
      }
    ]
  },
  {
    id: 'atl-perfume-05',
    name: 'Extrait de Parfum — Santal Basalte',
    category: 'Fragrance',
    subtitle: '32% Concentration Extrait de Parfum 100ml',
    description: 'An evocative olfactory journey combining Mysore sandalwood, smoky smoked cade, crisp cardamom, and Haitian vetiver over a base of mineral ambergris and raw basalt. Formulated in Grasse.',
    priceUSD: 195,
    image: perfumeImg,
    gallery: [perfumeImg],
    variants: [
      { id: 'v-100ml', name: '100ml Flacon', colorHex: '#B87333', inStock: true },
      { id: 'v-50ml', name: '50ml Travel Flacon', colorHex: '#8C5220', inStock: true },
    ],
    sizes: ['100ml (3.4 fl. oz)', '50ml (1.7 fl. oz)'],
    tags: ['Extrait', 'Grasse', 'Sandalwood', 'Unisex'],
    stockCount: 19,
    rating: 4.92,
    reviewsCount: 42,
    featured: true,
    badge: 'Bestseller',
    details: {
      materials: 'Alcohol denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool',
      origin: 'Grasse, France',
      care: 'Keep away from direct heat and sunlight.',
    },
    reviews: [
      {
        id: 'rev-06',
        author: 'Camille L.',
        rating: 5,
        date: 'March 22, 2026',
        comment: 'Stays on the skin for 14+ hours. It is rich, warm, meditative, and non-overpowering. Constantly get asked what scent I am wearing.',
        verified: true,
        location: 'Paris, FR'
      }
    ]
  },
  {
    id: 'atl-suit-06',
    name: 'Unstructured Wool Twill Blazer',
    category: 'Apparel',
    subtitle: 'High-Twist Tropical Wool 260g/m²',
    description: 'Designed for fluid movement with unpadded shoulders and quarter-lining. Tailored from crease-resistant high-twist wool from Biella mills. Features patch pockets and genuine horn button closures.',
    priceUSD: 390,
    originalPriceUSD: 460,
    image: coatImg,
    gallery: [coatImg],
    variants: [
      { id: 'v-navy', name: 'Deep Midnight Navy', colorHex: '#1B2430', inStock: true },
      { id: 'v-peat', name: 'Peat Charcoal', colorHex: '#303030', inStock: true },
    ],
    sizes: ['38 / S', '40 / M', '42 / L', '44 / XL'],
    tags: ['Biella Mills', 'Crease-Resistant', 'Tailoring'],
    stockCount: 7,
    rating: 4.81,
    reviewsCount: 19,
    featured: false,
    details: {
      materials: '100% Virgin Tropical Wool, Unstructured Bemberg sleeves',
      origin: 'Biella & Naples, Italy',
      care: 'Steam to release creases. Professional dry clean only.',
    },
    reviews: [
      {
        id: 'rev-07',
        author: 'Arjun N.',
        rating: 5,
        date: 'March 11, 2026',
        comment: 'Unbelievably breathable yet holds shape during travel. The patch pockets give it just the right relaxed sartorial edge.',
        verified: true,
        location: 'Delhi, IN'
      }
    ]
  },
  {
    id: 'atl-pouch-07',
    name: 'Architectural Folio & Document Pouch',
    category: 'Leather Goods',
    subtitle: 'Smooth Box Calfskin with Magnetic Closure',
    description: 'A minimalist geometric folio for carrying 14" notebooks, tablets, pens, and documents. Precision edge-painted with reinforced corner gussets and concealed neodymium magnetic clasps.',
    priceUSD: 175,
    image: toteImg,
    gallery: [toteImg],
    variants: [
      { id: 'v-black', name: 'Basalt Black', colorHex: '#18181A', inStock: true },
      { id: 'v-tan', name: 'Warm Tan', colorHex: '#9E6738', inStock: true },
    ],
    sizes: ['14-inch Folio'],
    tags: ['Box Calfskin', 'Hand-Painted Edges', 'Minimalist'],
    stockCount: 15,
    rating: 4.79,
    reviewsCount: 29,
    featured: false,
    details: {
      materials: 'European Box Calfskin, Microfiber lining',
      origin: 'Porto, Portugal',
      dimensions: '35cm x 26cm x 2cm',
      care: 'Wipe with soft dry microfibre cloth.',
    },
    reviews: [
      {
        id: 'rev-08',
        author: 'Sophia T.',
        rating: 5,
        date: 'February 19, 2026',
        comment: 'Sleek, minimal, fits effortlessly into my tote or under my arm during meetings.',
        verified: true,
        location: 'Zurich, CH'
      }
    ]
  },
  {
    id: 'atl-watch-08',
    name: 'Field Automatic 38mm Obsidian',
    category: 'Timepieces',
    subtitle: 'Bead-Blasted 316L Stainless Steel',
    description: 'A modern interpretation of mid-century officer timepieces. Featuring high-legibility Super-LumiNova BGW9 numerals, screw-down crown, and reinforced ballistic sailcloth strap.',
    priceUSD: 520,
    image: chronoImg,
    gallery: [chronoImg],
    variants: [
      { id: 'v-black-dial', name: 'Obsidian Matte Dial', colorHex: '#1E1E1E', inStock: true },
      { id: 'v-khaki-dial', name: 'Olive Field Dial', colorHex: '#3D4A3E', inStock: true },
    ],
    sizes: ['38mm Case'],
    tags: ['Field Watch', 'Automatic', '100m Water Resistant'],
    stockCount: 9,
    rating: 4.91,
    reviewsCount: 31,
    featured: false,
    details: {
      materials: '316L Stainless Steel, Flat Sapphire with AR coating, Sailcloth strap',
      origin: 'La Chaux-de-Fonds, Switzerland',
      dimensions: '38mm diameter, 10.8mm thickness, 46mm lug-to-lug',
      care: '100m water resistance. Screw down crown completely before water exposure.',
    },
    reviews: [
      {
        id: 'rev-09',
        author: 'Kenji O.',
        rating: 5,
        date: 'March 15, 2026',
        comment: 'The lume is bright and crisp, keeping time within +3 sec/day right out of the box. Outstanding quality.',
        verified: true,
        location: 'Tokyo, JP'
      }
    ]
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'ATELIER15': { discountPercent: 15, description: '15% Off Your Entire Atelier Order' },
  'WELCOME10': { discountPercent: 10, description: '10% Welcome First Purchase Discount' },
  'MODERN20': { discountPercent: 20, description: '20% Limited Spring Atelier Privilege' },
};
