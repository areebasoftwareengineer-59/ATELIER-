export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1.0)
  prefix: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'Leather Goods' | 'Timepieces' | 'Footwear' | 'Fragrance';
  subtitle: string;
  description: string;
  priceUSD: number;
  originalPriceUSD?: number;
  image: string;
  secondaryImage?: string;
  gallery: string[];
  variants: ProductVariant[];
  sizes: string[];
  tags: string[];
  stockCount: number;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  details: {
    materials: string;
    origin: string;
    dimensions?: string;
    care: string;
  };
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  variantId: string;
  variantName: string;
  size: string;
  quantity: number;
  unitPriceUSD: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export type PaymentMethod = 'cod' | 'card' | 'upi';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotalUSD: number;
  discountUSD: number;
  shippingUSD: number;
  totalUSD: number;
  currency: CurrencyCode;
  status: 'confirmed' | 'packaging' | 'dispatched' | 'delivered';
  estimatedDeliveryDate: string;
}
