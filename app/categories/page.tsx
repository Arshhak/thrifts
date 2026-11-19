import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";

const BASE = "https://images.unsplash.com/photo-";
const q = "?w=600&q=80";
function img(id: string) { return `${BASE}${id}${q}`; }

const CATEGORY_IMAGES: Record<string, string> = {
  outerwear: img("1558618666-fcd25c85cd64"),
  tops: img("1521572163474-6864f9cf17ab"),
  bottoms: img("1543087903-1ac2364bef05"),
  accessories: img("1562157873-818bc0726f68"),
  dresses: img("1515886657613-9f3515b0c78f"),
  footwear: img("1583743814966-8d34ad3ad78f"),
};

export default function CategoriesPage() {
  return (
    <div className="bg-[#E5E5E7] min-h-screen pt-20">
      <div className="bg-[#171717] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#A32626] text-xs font-bold uppercase tracking-widest block mb-3">
            Browse
          </span>
          <h1
            className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-none tracking-tighter uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CATEGORIES.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={CATEGORY_IMAGES[cat.slug]}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2
                    className="text-white font-black text-4xl uppercase leading-none mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {cat.label}
                  </h2>
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest group-hover:text-[#A32626] transition-colors">
                    SHOP NOW →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
