"use client";

import { useState, useMemo, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "@/components/shop/FilterSidebar";
import FilterDrawer from "@/components/shop/FilterDrawer";
import ProductGrid from "@/components/shop/ProductGrid";
import SearchOverlay from "@/components/search/SearchOverlay";
import { FilterState } from "@/lib/types";
import type { ProductWithImages } from "@/lib/supabase/queries";

const DEFAULT_FILTERS: Partial<FilterState> = {
  size: [],
  color: [],
  condition: [],
  material: [],
  sort: "newest",
};

function applyFilters(
  products: ProductWithImages[],
  filters: Partial<FilterState>
): ProductWithImages[] {
  let result = [...products];
  if (filters.size?.length) result = result.filter((p) => filters.size!.includes(p.size));
  if (filters.color?.length) result = result.filter((p) => filters.color!.includes(p.color));
  if (filters.condition?.length) result = result.filter((p) => filters.condition!.includes(p.condition));
  if (filters.material?.length) result = result.filter((p) => filters.material!.includes(p.material));
  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}

function toProductCardShape(p: ProductWithImages) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price ?? undefined,
    category: p.category,
    size: p.size,
    color: p.color,
    material: p.material,
    condition: p.condition,
    description: p.description,
    images: p.images.length > 0 ? p.images : ["/placeholder.jpg"],
    styleTags: p.style_tags,
    isAvailable: p.is_available,
    isNew: p.is_new,
    createdAt: p.created_at,
  };
}

interface CategoryPageClientProps {
  categoryName: string;
  initialProducts: ProductWithImages[];
}

export default function CategoryPageClient({
  categoryName,
  initialProducts,
}: CategoryPageClientProps) {
  const [filters, setFilters] = useState<Partial<FilterState>>(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string[] | number | string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleClear = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
  }, []);

  const filteredProducts = useMemo(
    () => applyFilters(initialProducts, filters),
    [initialProducts, filters]
  );

  const displayProducts = useMemo(
    () => filteredProducts.map(toProductCardShape),
    [filteredProducts]
  );

  return (
    <>
      <SearchOverlay />
      <div className="bg-[#E5E5E7] min-h-screen pt-20">
        {/* Header */}
        <div className="bg-[#171717] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#A32626] text-xs font-bold uppercase tracking-widest block mb-3">
              Category
            </span>
            <h1
              className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-none tracking-tighter uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {categoryName}.
            </h1>
            <p className="text-white/40 text-sm mt-3 uppercase tracking-widest font-medium">
              {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#111111]"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          <div className="flex gap-8">
            <FilterSidebar
              filters={{ ...filters, category: [categoryName] }}
              onChange={handleFilterChange}
              onClear={handleClear}
              productCount={filteredProducts.length}
            />
            <div className="flex-1 min-w-0">
              <ProductGrid products={displayProducts} />
            </div>
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        productCount={filteredProducts.length}
      />
    </>
  );
}
