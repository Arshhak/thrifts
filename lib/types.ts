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

// ─── Supabase DB row types (snake_case, matching actual schema) ───────────────

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  created_at: string;
}

export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  category_id?: string | null;
  /** Resolved category name from join or column */
  category: string;
  brand?: string;
  size: string;
  color: string;
  material: string;
  condition: "Excellent" | "Good" | "Fair";
  description: string;
  status?: string;
  style_tags: string[];
  is_available: boolean;
  is_new: boolean;
  created_at: string;
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
