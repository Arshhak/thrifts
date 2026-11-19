"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { useEffect } from "react";
import { CATEGORIES, CONDITIONS, SIZES, COLORS, MATERIALS } from "@/lib/constants";
import { FilterState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Partial<FilterState>;
  onChange: (key: keyof FilterState, value: string[] | number | string) => void;
  onClear: () => void;
  productCount: number;
}

function ChipGroup({
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
    <div className="mb-7">
      <p className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onToggle(item)}
            className={cn(
              "text-xs font-semibold uppercase tracking-wide px-3 py-1.5 border transition-colors",
              selected.includes(item)
                ? "bg-[#111111] border-[#111111] text-white"
                : "bg-transparent border-[#D0D0D3] text-[#686868] hover:border-[#111111] hover:text-[#111111]"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  onClear,
  productCount,
}: FilterDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function toggle(key: "category" | "size" | "color" | "condition" | "material", value: string) {
    const current = (filters[key] as string[]) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange(key, next);
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white lg:hidden transition-transform duration-400 ease-in-out max-h-[85vh] overflow-hidden flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E7] flex-shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[#111111]" />
            <span className="text-sm font-bold uppercase tracking-widest">Filters</span>
            {productCount > 0 && (
              <span className="text-xs text-[#686868]">({productCount} items)</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onClear}
              className="text-xs font-bold text-[#A32626] uppercase tracking-widest"
            >
              Clear All
            </button>
            <button onClick={onClose} aria-label="Close filters">
              <X size={20} className="text-[#111111]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-5 py-6">
          <ChipGroup
            title="Category"
            items={CATEGORIES.map((c) => c.label)}
            selected={filters.category || []}
            onToggle={(v) => toggle("category", v)}
          />
          <ChipGroup
            title="Size"
            items={SIZES}
            selected={filters.size || []}
            onToggle={(v) => toggle("size", v)}
          />
          <ChipGroup
            title="Condition"
            items={CONDITIONS}
            selected={filters.condition || []}
            onToggle={(v) => toggle("condition", v)}
          />
          <ChipGroup
            title="Color"
            items={COLORS}
            selected={filters.color || []}
            onToggle={(v) => toggle("color", v)}
          />
          <ChipGroup
            title="Material"
            items={MATERIALS}
            selected={filters.material || []}
            onToggle={(v) => toggle("material", v)}
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#E5E5E7] flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-[#111111] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#A32626] transition-colors"
          >
            View {productCount} Items
          </button>
        </div>
      </div>
    </>
  );
}
