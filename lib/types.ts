export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  size: string;
  color: string;
  material: string;
  condition: "Excellent" | "Good" | "Fair";
  description: string;
  images: string[];
  styleTags: string[];
  isAvailable: boolean;
  isNew?: boolean;
  createdAt: string;
}

export interface Category {
  label: string;
  slug: string;
  image: string;
}

export interface FilterState {
  category: string[];
  size: string[];
  color: string[];
  material: string[];
  condition: string[];
  priceMin: number;
  priceMax: number;
  styleTags: string[];
  sort: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface SearchResult {
  products: Product[];
  query: string;
}
