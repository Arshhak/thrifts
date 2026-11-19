import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

const BASE = "https://images.unsplash.com/photo-";
const q = "?w=600&q=80";

function img(id: string) {
  return `${BASE}${id}${q}`;
}

const CATEGORY_IMAGES: Record<string, string> = {
  outerwear: img("1558618666-fcd25c85cd64"),
  tops: img("1521572163474-6864f9cf17ab"),
  bottoms: img("1543087903-1ac2364bef05"),
  accessories: img("1562157873-818bc0726f68"),
  dresses: img("1515886657613-9f3515b0c78f"),
  footwear: img("1583743814966-8d34ad3ad78f"),
};

export default function CategoriesSection() {
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

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Large featured: Outerwear */}
          <div className="col-span-2 md:col-span-1 md:row-span-2 group relative overflow-hidden aspect-[4/3] md:aspect-auto">
            <CategoryTile
              label={CATEGORIES[0].label}
              href={`/shop/${CATEGORIES[0].slug}`}
              imageSrc={CATEGORY_IMAGES[CATEGORIES[0].slug]}
              large
            />
          </div>

          {CATEGORIES.slice(1, 5).map((cat) => (
            <div key={cat.slug} className="group relative overflow-hidden aspect-square">
              <CategoryTile
                label={cat.label}
                href={`/shop/${cat.slug}`}
                imageSrc={CATEGORY_IMAGES[cat.slug]}
              />
            </div>
          ))}

          {/* Last category spans 2 on mobile */}
          <div className="col-span-2 md:col-span-1 group relative overflow-hidden aspect-[4/3] md:aspect-square">
            <CategoryTile
              label={CATEGORIES[5].label}
              href={`/shop/${CATEGORIES[5].slug}`}
              imageSrc={CATEGORY_IMAGES[CATEGORIES[5].slug]}
            />
          </div>
        </div>
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
