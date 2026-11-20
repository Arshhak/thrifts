import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { fetchProducts } from "@/lib/supabase/queries";

export default async function NewFindsSection() {
  const dbProducts = await fetchProducts({ limit: 8, sort: "newest" });

  const products = dbProducts.map((p) => ({
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
  }));

  return (
    <section className="bg-[#E5E5E7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-[#A32626] uppercase tracking-widest mb-3 block">
              Just Dropped
            </span>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tighter text-[#111111]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              NEW FINDS.
              <br />
              NO REPEATS.
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#A32626] transition-colors border-b border-[#111111] pb-1 hover:border-[#A32626] self-start sm:self-auto"
          >
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid or empty state */}
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <p
              className="text-4xl font-black text-[#D0D0D3] uppercase mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Drops Coming Soon.
            </p>
            <p className="text-[#686868] text-sm font-medium">
              We&apos;re sourcing fresh pre-loved pieces. Stay tuned.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
