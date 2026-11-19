"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import { Product } from "@/lib/types";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const wishlistProducts: Product[] = SAMPLE_PRODUCTS.filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <div className="bg-[#E5E5E7] min-h-screen pt-20">
      <div className="bg-[#171717] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#A32626] text-xs font-bold uppercase tracking-widest block mb-3">
            Saved Items
          </span>
          <h1
            className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-none tracking-tighter uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            WISHLIST.
          </h1>
          <p className="text-white/40 text-sm mt-3 uppercase tracking-widest font-medium">
            {wishlistProducts.length} saved piece{wishlistProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={48} className="text-[#D0D0D3] mb-4" />
            <p
              className="text-5xl font-black text-[#D0D0D3] mb-4 uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Nothing Yet.
            </p>
            <p className="text-[#686868] text-sm font-medium max-w-xs mb-8">
              Save pieces you love to your wishlist. They&apos;ll be here when you&apos;re ready.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#A32626] transition-colors"
            >
              Start Shopping <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group relative bg-[#F2F2F2] overflow-hidden">
                <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-[#A32626] rounded-full flex items-center justify-center hover:bg-[#8a1f1f] transition-colors shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Heart size={15} className="fill-white text-white" />
                </button>
                <div className="p-3">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-[#111111] leading-tight hover:text-[#A32626] transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#111111]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] font-bold text-[#686868] uppercase tracking-wider bg-[#D0D0D3] px-1.5 py-0.5">
                      {product.size}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
