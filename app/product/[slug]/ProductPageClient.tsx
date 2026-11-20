"use client";

import Link from "next/link";
import { Heart, MessageCircle, ChevronRight, ArrowLeft } from "lucide-react";
import ImageGallery from "@/components/products/ImageGallery";
import ProductCard from "@/components/products/ProductCard";
import SearchOverlay from "@/components/search/SearchOverlay";
import { getWhatsAppUrl } from "@/lib/constants";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";

const CONDITION_STYLES: Record<string, string> = {
  Excellent: "bg-green-50 text-green-800 border-green-200",
  Good: "bg-blue-50 text-blue-800 border-blue-200",
  Fair: "bg-amber-50 text-amber-800 border-amber-200",
};

interface ProductPageClientProps {
  product: Product;
  related: Product[];
}

export default function ProductPageClient({ product, related }: ProductPageClientProps) {
  const whatsappUrl = getWhatsAppUrl(product.name, product.price);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <>
      <SearchOverlay />
      <div className="bg-[#E5E5E7] min-h-screen pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[#686868] uppercase tracking-wider">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-[#111111] transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <Link
              href={`/shop/${product.category.toLowerCase()}`}
              className="hover:text-[#111111] transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#111111] truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <div>
              <ImageGallery images={product.images} alt={product.name} />
            </div>

            {/* Product info */}
            <div className="flex flex-col">
              {/* Category + New badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-[#686868] uppercase tracking-widest">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="bg-[#A32626] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                    NEW
                  </span>
                )}
              </div>

              {/* Name */}
              <h1
                className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#111111] mb-6 tracking-tight"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-[#111111]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-[#686868] line-through font-medium">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm font-bold text-green-700 bg-green-50 px-2 py-0.5">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="border border-[#D0D0D3] text-[#686868] text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                  Size: {product.size}
                </span>
                <span
                  className={cn(
                    "border text-xs font-bold uppercase tracking-widest px-3 py-1.5",
                    CONDITION_STYLES[product.condition]
                  )}
                >
                  {product.condition}
                </span>
                <span className="border border-[#D0D0D3] text-[#686868] text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                  {product.color}
                </span>
                <span className="border border-[#D0D0D3] text-[#686868] text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                  {product.material}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#686868] mb-3">
                  About This Piece
                </p>
                <p className="text-sm text-[#686868] leading-relaxed">{product.description}</p>
              </div>

              {/* Style tags */}
              {product.styleTags.length > 0 && (
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {product.styleTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/shop?style=${encodeURIComponent(tag)}`}
                        className="text-xs font-bold text-[#686868] uppercase tracking-widest hover:text-[#A32626] transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div className="mb-8 p-4 bg-white/60">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${product.isAvailable ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
                    {product.isAvailable ? "Available" : "Sold Out"}
                  </span>
                </div>
                <p className="text-xs text-[#686868] mt-2 leading-relaxed">
                  This is a one-of-a-kind pre-loved piece. Once it&apos;s gone, it&apos;s gone.
                  Enquire via WhatsApp to claim it.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                {product.isAvailable && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#111111] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#A32626] transition-colors duration-300 group w-full"
                  >
                    <MessageCircle size={18} />
                    Enquire on WhatsApp
                  </a>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "flex items-center justify-center gap-3 py-4 text-sm font-bold uppercase tracking-widest border transition-colors duration-300 w-full",
                    wishlisted
                      ? "bg-[#A32626] border-[#A32626] text-white"
                      : "bg-transparent border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white"
                  )}
                >
                  <Heart size={18} className={wishlisted ? "fill-white" : ""} />
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>

              {/* Back link */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#686868] uppercase tracking-widest hover:text-[#111111] transition-colors mt-8 self-start"
              >
                <ArrowLeft size={14} /> Back to Shop
              </Link>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[#D0D0D3]">
              <div className="mb-8">
                <span className="text-xs font-bold text-[#A32626] uppercase tracking-widest block mb-2">
                  You May Also Like
                </span>
                <h2
                  className="text-4xl md:text-5xl font-black text-[#111111] leading-none tracking-tight uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  RELATED FINDS.
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
