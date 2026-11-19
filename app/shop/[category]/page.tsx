"use client";

import { useState, useMemo, useCallback } from "react";
import { notFound } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "@/components/shop/FilterSidebar";
import FilterDrawer from "@/components/shop/FilterDrawer";
import ProductGrid from "@/components/shop/ProductGrid";
import SearchOverlay from "@/components/search/SearchOverlay";
import { SAMPLE_PRODUCTS, filterProducts } from "@/lib/sample-data";
import { CATEGORIES } from "@/lib/constants";
import { FilterState } from "@/lib/types";

const DEFAULT_FILTERS: Partial<FilterState> = {
  size: [],
  color: [],
  condition: [],
  material: [],
  sort: "newest",
};

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const categoryObj = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!categoryObj) {
    notFound();
  }

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

  const filteredProducts = useMemo(() => {
    return filterProducts(SAMPLE_PRODUCTS, {
      ...filters,
      category: [categoryObj.label],
    });
  }, [filters, categoryObj.label]);

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
              {categoryObj.label}.
            </h1>
            <p className="text-white/40 text-sm mt-3 uppercase tracking-widest font-medium">
              {filteredProducts.length} pieces found
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
              filters={{ ...filters, category: [categoryObj.label] }}
              onChange={handleFilterChange}
              onClear={handleClear}
              productCount={filteredProducts.length}
            />
            <div className="flex-1 min-w-0">
              <ProductGrid products={filteredProducts} />
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
