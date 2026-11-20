import Image from "next/image";
import Link from "next/link";
import { fetchCategories } from "@/lib/supabase/queries";
import type { DbCategory } from "@/lib/types";

// Fallback Unsplash images keyed by category slug
const BASE = "https://images.unsplash.com/photo-";
const q = "?w=600&q=80";
const FALLBACK_IMAGES: Record<string, string> = {
  outerwear: `${BASE}1558618666-fcd25c85cd64${q}`,
  tops: `${BASE}1521572163474-6864f9cf17ab${q}`,
  bottoms: `${BASE}1543087903-1ac2364bef05${q}`,
  denim: `${BASE}1483418914781-5c5ef0d6cdda${q}`,
  accessories: `${BASE}1562157873-818bc0726f68${q}`,
  materials: `${BASE}1558769132-cb1aea458c5e${q}`,
  dresses: `${BASE}1515886657613-9f3515b0c78f${q}`,
  footwear: `${BASE}1583743814966-8d34ad3ad78f${q}`,
};
const DEFAULT_IMAGE = `${BASE}1558618666-fcd25c85cd64${q}`;

function getCategoryImage(cat: DbCategory): string {
  if (cat.image_url) return cat.image_url;
  return FALLBACK_IMAGES[cat.slug] ?? DEFAULT_IMAGE;
}

export default async function CategoriesSection() {
  const dbCategories = await fetchCategories();

  // Ensure we always have at least 1 category to display (graceful fallback)
  const categories = dbCategories.length > 0 ? dbCategories : [];

  return (
    <section className="bg-[#F2F2F2] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-[#A32626] uppercase tracking-widest mb-3 block">
            Browse By Category
          </span>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tighter text-[#111111]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SHOP THE CULTURE.
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="py-16 text-center">
            <p
              className="text-4xl font-black text-[#D0D0D3] uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Categories Loading Soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* First category: large featured tile */}
            <div className="col-span-2 md:col-span-1 md:row-span-2 group relative overflow-hidden aspect-[4/3] md:aspect-auto">
              <CategoryTile
                label={categories[0].name}
                href={`/shop/${categories[0].slug}`}
                imageSrc={getCategoryImage(categories[0])}
                large
              />
            </div>

            {/* Middle tiles */}
            {categories.slice(1, 5).map((cat) => (
              <div key={cat.slug} className="group relative overflow-hidden aspect-square">
                <CategoryTile
                  label={cat.name}
                  href={`/shop/${cat.slug}`}
                  imageSrc={getCategoryImage(cat)}
                />
              </div>
            ))}

            {/* Last tile (spans 2 on mobile) */}
            {categories[5] && (
              <div className="col-span-2 md:col-span-1 group relative overflow-hidden aspect-[4/3] md:aspect-square">
                <CategoryTile
                  label={categories[5].name}
                  href={`/shop/${categories[5].slug}`}
                  imageSrc={getCategoryImage(categories[5])}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryTile({
  label,
  href,
  imageSrc,
  large = false,
}: {
  label: string;
  href: string;
  imageSrc: string;
  large?: boolean;
}) {
  return (
    <Link href={href} className="block relative w-full h-full min-h-[200px] overflow-hidden group">
      <Image
        src={imageSrc}
        alt={label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-end p-5">
        <div>
          <h3
            className={`text-white font-black uppercase tracking-wide leading-none ${
              large ? "text-5xl md:text-6xl" : "text-2xl md:text-3xl"
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {label}
          </h3>
          <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1 block group-hover:text-[#A32626] transition-colors">
            SHOP NOW →
          </span>
        </div>
      </div>
    </Link>
  );
}
