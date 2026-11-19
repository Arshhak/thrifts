"use client";

import { CATEGORIES, CONDITIONS, SIZES, COLORS, MATERIALS } from "@/lib/constants";
import { FilterState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: Partial<FilterState>;
  onChange: (key: keyof FilterState, value: string[] | number | string) => void;
  onClear: () => void;
  productCount: number;
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <div className="border-b border-[#D0D0D3] pb-6 mb-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-4">{title}</p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer group">
            <span
              className={cn(
                "w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors",
                selected.includes(item)
                  ? "bg-[#111111] border-[#111111]"
                  : "border-[#D0D0D3] group-hover:border-[#111111]"
              )}
            >
              {selected.includes(item) && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                selected.includes(item) ? "text-[#111111]" : "text-[#686868] group-hover:text-[#111111]"
              )}
              onClick={() => onToggle(item)}
            >
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FilterSidebar({
  filters,
  onChange,
  onClear,
  productCount,
}: FilterSidebarProps) {
  function toggle(key: "category" | "size" | "color" | "condition" | "material", value: string) {
    const current = (filters[key] as string[]) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange(key, next);
  }

  const hasFilters = Object.entries(filters).some(
    ([k, v]) => k !== "sort" && (Array.isArray(v) ? v.length > 0 : v !== undefined)
  );

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#111111]">
            Filters
            {productCount > 0 && (
              <span className="text-[#686868] ml-2 font-normal">({productCount})</span>
            )}
          </h2>
          {hasFilters && (
            <button
              onClick={onClear}
              className="text-xs font-bold text-[#A32626] uppercase tracking-widest hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <FilterGroup
          title="Category"
          items={CATEGORIES.map((c) => c.label)}
          selected={filters.category || []}
          onToggle={(v) => toggle("category", v)}
        />
        <FilterGroup
          title="Size"
          items={SIZES}
          selected={filters.size || []}
          onToggle={(v) => toggle("size", v)}
        />
        <FilterGroup
          title="Condition"
          items={CONDITIONS}
          selected={filters.condition || []}
          onToggle={(v) => toggle("condition", v)}
        />
        <FilterGroup
          title="Color"
          items={COLORS}
          selected={filters.color || []}
          onToggle={(v) => toggle("color", v)}
        />
        <FilterGroup
          title="Material"
          items={MATERIALS}
          selected={filters.material || []}
          onToggle={(v) => toggle("material", v)}
        />
      </div>
    </aside>
  );
}
