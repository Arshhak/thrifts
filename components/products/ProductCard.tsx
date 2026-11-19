"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const CONDITION_COLORS: Record<string, string> = {
  Excellent: "bg-green-100 text-green-800",
  Good: "bg-blue-100 text-blue-800",
  Fair: "bg-amber-100 text-amber-800",
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className={cn("group relative bg-[#F2F2F2] overflow-hidden", className)}>
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#A32626] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
              NEW
            </span>
          )}
          <span
            className={cn(
              "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5",
              CONDITION_COLORS[product.condition]
            )}
          >
            {product.condition}
          </span>
        </div>

        {/* Hover: second image */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={15}
          className={cn(
            "transition-colors",
            wishlisted ? "fill-[#A32626] text-[#A32626]" : "text-[#686868]"
          )}
        />
      </button>

      {/* Info */}
      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#111111] leading-tight hover:text-[#A32626] transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-[#111111]">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#686868] line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-[#686868] uppercase tracking-wider bg-[#D0D0D3] px-1.5 py-0.5">
              {product.size}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {product.styleTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold text-[#686868] uppercase tracking-wider"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
