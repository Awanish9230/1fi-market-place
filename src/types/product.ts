export interface Variant {
  id: string;
  name: string; // e.g., "128 GB", "256 GB", "16GB RAM / 512GB SSD"
  price: number;
  originalPrice?: number;
  inStock?: boolean;
  colorName?: string;
  colorHex?: string;
}

export interface EmiPlan {
  id: string;
  months: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate?: number; // 0 for No Cost EMI
  isNoCost?: boolean;
  cashback?: number;
  processingFee?: number;
  badge?: string; // "Most Popular", "Lowest Monthly", "Best Value"
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Mobiles' | 'Laptops' | 'Audio' | 'TV' | 'Wearables' | 'Tablets';
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  images?: string[];
  description: string;
  highlights?: string[];
  specs?: ProductSpec[];
  rating?: number;
  reviewsCount?: number;
  isPopular?: boolean;
  isNewArrival?: boolean;
  variants: Variant[];
  emiPlans: EmiPlan[];
}

export type ProductCategory = 'All' | 'Mobiles' | 'Laptops' | 'Audio' | 'TV' | 'Wearables';

export interface FilterOptions {
  category?: ProductCategory;
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'popular' | 'price-asc' | 'price-desc';
}

export interface SelectedEmiState {
  product: Product;
  selectedVariant: Variant;
  selectedEmiPlan: EmiPlan;
}
