export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  currency: string;
  amazonUrl: string;
  asin: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  composition: string;
  form: string;
  quantity: string;
  description: string;
  highlights: string[];
  pricePerUnit: string;
  inStock: boolean;
  lastUpdated: string;
  reviews?: {
    author: string;
    rating: number;
    title: string;
    text: string;
    date: string;
    verified: boolean;
  }[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  slug: string;
  name: string;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  inStockOnly?: boolean;
}

export interface ProductSort {
  field: 'name' | 'brand' | 'price' | 'rating' | 'reviewCount';
  direction: 'asc' | 'desc';
}