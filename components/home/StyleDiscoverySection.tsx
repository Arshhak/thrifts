import Link from "next/link";
import { STYLE_TAGS } from "@/lib/constants";

const STYLE_DESCRIPTIONS: Record<string, string> = {
  Y2K: "Low-rise, metallics, butterfly clips.",
  GRUNGE: "Flannel, ripped denim, band tees.",
  STREETWEAR: "Oversized, logos, utility.",
  VINTAGE: "Pre-80s, deadstock, heritage.",
  MINIMAL: "Clean lines, monochrome, essential.",
  "OLD MONEY": "Tailored, quiet luxury, classics.",
  "DENIM CULTURE": "Head-to-toe denim, raw hem.",
  EXPERIMENTAL: "Rule-breaking, editorial, art.",
};

const STYLE_COLORS: Record<string, string> = {
  Y2K: "bg-pink-100",
  GRUNGE: "bg-stone-800",
  STREETWEAR: "bg-[#171717]",
  VINTAGE: "bg-amber-100",
  MINIMAL: "bg-[#E5E5E7]",
  "OLD MONEY": "bg-green-900",
  "DENIM CULTURE": "bg-blue-900",
  EXPERIMENTAL: "bg-[#A32626]",
};

const STYLE_TEXT: Record<string, string> = {
  Y2K: "text-pink-800",
  GRUNGE: "text-stone-100",
  STREETWEAR: "text-white",
  VINTAGE: "text-amber-900",
  MINIMAL: "text-[#111111]",
  "OLD MONEY": "text-green-100",
  "DENIM CULTURE": "text-blue-100",
  EXPERIMENTAL: "text-white",
};

export default function StyleDiscoverySection() {
  return (
    <section className="bg-[#E5E5E7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-[#A32626] uppercase tracking-widest mb-3 block">
            Find Your Vibe
          </span>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tighter text-[#111111]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            WHAT&apos;S YOUR
            <br />
            FREQUENCY?
          </h2>
        </div>

        {/* Grid of style tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STYLE_TAGS.map((style) => (
            <Link
              key={style}
              href={`/shop?style=${encodeURIComponent(style)}`}
              className={`${STYLE_COLORS[style]} ${STYLE_TEXT[style]} p-6 md:p-8 aspect-square flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300`}
            >
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                Style
              </span>
              <div>
                <h3
                  className="text-2xl md:text-3xl font-black uppercase leading-none mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {style}
                </h3>
                <p className="text-xs opacity-60 font-medium leading-snug">
                  {STYLE_DESCRIPTIONS[style]}
                </p>
                <span className="text-xs font-bold uppercase tracking-widest mt-3 block opacity-0 group-hover:opacity-100 transition-opacity">
                  EXPLORE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
