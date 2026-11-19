"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import FilterSidebar from "@/components/shop/FilterSidebar";
import FilterDrawer from "@/components/shop/FilterDrawer";
import ProductGrid from "@/components/shop/ProductGrid";
import SearchOverlay from "@/components/search/SearchOverlay";
import { SAMPLE_PRODUCTS, filterProducts } from "@/lib/sample-data";
import { SORT_OPTIONS } from "@/lib/constants";
import { FilterState } from "@/lib/types";

const DEFAULT_FILTERS: Partial<FilterState> = {
  category: [],
  size: [],
  color: [],
  condition: [],
  material: [],
  sort: "newest",
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Partial<FilterState>>({
    ...DEFAULT_FILTERS,
    category: searchParams.get("category") ? [searchParams.get("category")!] : [],
    sort: searchParams.get("sort") || "newest",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortOpen, setSortOpen] = useState(false);

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string[] | number | string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleClear = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
    setSearchQuery("");
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(SAMPLE_PRODUCTS, {
      ...filters,
      query: searchQuery || undefined,
    });
  }, [filters, searchQuery]);

  const currentSort =
    SORT_OPTIONS.find((o) => o.value === filters.sort) || SORT_OPTIONS[0];

  const hasActiveFilters =
    searchQuery ||
    (filters.category?.length ?? 0) > 0 ||
    (filters.size?.length ?? 0) > 0 ||
    (filters.color?.length ?? 0) > 0 ||
    (filters.condition?.length ?? 0) > 0 ||
    (filters.material?.length ?? 0) > 0;

  return (
    <>
      <SearchOverlay />
      <div className="bg-[#E5E5E7] min-h-screen pt-20">
        {/* Page header */}
        <div className="bg-[#171717] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#A32626] text-xs font-bold uppercase tracking-widest block mb-3">
              All Pieces
            </span>
            <h1
              className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-none tracking-tighter uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SHOP ALL.
            </h1>
            <p className="text-white/40 text-sm mt-3 uppercase tracking-widest font-medium">
              {filteredProducts.length} pieces found
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Toolbar */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            {/* Search input */}
            <div className="flex-1 min-w-[200px] relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#686868]"
              />
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-sm font-medium text-[#111111] placeholder-[#686868] outline-none border-b-2 border-transparent focus:border-[#111111] transition-colors"
              />
            </div>

            {/* Mobile filter button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#111111] hover:bg-[#D0D0D3] transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="bg-[#A32626] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 bg-white px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#111111] hover:bg-[#D0D0D3] transition-colors"
              >
                {currentSort.label}
                <ChevronDown size={14} className={sortOpen ? "rotate-180" : ""} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white shadow-lg z-30 min-w-[180px]">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        handleFilterChange("sort", opt.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#F2F2F2] transition-colors ${
                        filters.sort === opt.value ? "text-[#A32626]" : "text-[#111111]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear all */}
            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="text-xs font-bold text-[#A32626] uppercase tracking-widest hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Body */}
          <div className="flex gap-8">
            {/* Sidebar */}
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClear}
              productCount={filteredProducts.length}
            />

            {/* Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-medium text-[#686868] uppercase tracking-widest">
                  {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
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
