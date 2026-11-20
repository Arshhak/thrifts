"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";

export default function SearchOverlay() {
  const { isOpen, query, closeSearch, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.styleTags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(-1);
      }, 100);
    }
  }, [isOpen]);

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      }
      if (e.key === "Enter") {
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(`/product/${results[selectedIndex].slug}`);
          closeSearch();
        } else if (query.trim()) {
          router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
          closeSearch();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, results, selectedIndex, query, closeSearch, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 md:pt-28 px-4">
      <div className="bg-white w-full max-w-2xl shadow-2xl">
        {/* Input row */}
        <div className="flex items-center px-5 h-16 border-b border-[#E5E5E7]">
          <Search size={20} className="text-[#686868] flex-shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for pieces..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            className="flex-1 text-[#111111] text-base font-medium placeholder-[#686868] outline-none bg-transparent"
          />
          <button
            onClick={closeSearch}
            className="text-[#686868] hover:text-[#111111] transition-colors ml-3"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul>
            {results.map((product, i) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={closeSearch}
                  className={`flex items-center gap-4 px-5 py-3 hover:bg-[#F2F2F2] transition-colors ${
                    i === selectedIndex ? "bg-[#F2F2F2]" : ""
                  }`}
                >
                  <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden bg-[#E5E5E7]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#111111] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-[#686868] mt-0.5">
                      {product.category} · Size {product.size}
                    </p>
                  </div>
                  <span className="text-sm font-black text-[#111111] flex-shrink-0">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Search all */}
        {query.trim() && (
          <div className="border-t border-[#E5E5E7]">
            <button
              onClick={() => {
                router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
                closeSearch();
              }}
              className="w-full flex items-center justify-between px-5 py-4 text-xs font-bold uppercase tracking-widest text-[#686868] hover:text-[#111111] hover:bg-[#F2F2F2] transition-colors"
            >
              <span>Search for &quot;{query}&quot;</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Empty state */}
        {query.trim() && results.length === 0 && (
          <div className="px-5 py-8 text-center">
            <p className="text-[#686868] text-sm font-medium">No results found for &quot;{query}&quot;</p>
            <p className="text-[#686868] text-xs mt-1">Try a different term or browse all items.</p>
          </div>
        )}

        {/* Suggestions when empty */}
        {!query && (
          <div className="px-5 py-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#686868] mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Denim Jacket", "Cargo Pants", "Band Tee", "Leather Jacket", "Vintage", "Y2K"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs font-semibold uppercase tracking-wide text-[#111111] bg-[#E5E5E7] px-3 py-1.5 hover:bg-[#D0D0D3] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
