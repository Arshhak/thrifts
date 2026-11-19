import Link from "next/link";
import { STYLE_TAGS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const STYLE_DESCRIPTIONS: Record<string, string> = {
  Y2K: "Low-rise everything, metallics, butterfly clips, and unapologetic maximalism.",
  GRUNGE: "Flannel, ripped denim, band tees, and a studied nonchalance.",
  STREETWEAR: "Oversized silhouettes, logo plays, utility pockets, and sneaker culture.",
  VINTAGE: "Pre-80s deadstock, heritage labels, and pieces with provenance.",
  MINIMAL: "Clean lines, monochrome palettes, and the power of restraint.",
  "OLD MONEY": "Tailored classics, quiet luxury, and the confidence of old wealth.",
  "DENIM CULTURE": "Head-to-toe denim, raw hems, washes, and trucker jackets.",
  EXPERIMENTAL: "Rule-breaking silhouettes, art-school energy, and the unexpected.",
};

const STYLE_COLORS: Record<string, { bg: string; text: string }> = {
  Y2K: { bg: "bg-pink-100", text: "text-pink-900" },
  GRUNGE: { bg: "bg-stone-800", text: "text-stone-100" },
  STREETWEAR: { bg: "bg-[#171717]", text: "text-white" },
  VINTAGE: { bg: "bg-amber-100", text: "text-amber-900" },
  MINIMAL: { bg: "bg-[#F2F2F2]", text: "text-[#111111]" },
  "OLD MONEY": { bg: "bg-green-900", text: "text-green-100" },
  "DENIM CULTURE": { bg: "bg-blue-900", text: "text-blue-100" },
  EXPERIMENTAL: { bg: "bg-[#A32626]", text: "text-white" },
};

export default function StylePage() {
  return (
    <div className="bg-[#E5E5E7] min-h-screen pt-20">
      <div className="bg-[#171717] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#A32626] text-xs font-bold uppercase tracking-widest block mb-3">
            Style Discovery
          </span>
          <h1
            className="text-[clamp(2.5rem,8vw,6rem)] font-black text-white leading-none tracking-tighter uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            FIND YOUR
            <br />
            FREQUENCY.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STYLE_TAGS.map((style) => {
            const colors = STYLE_COLORS[style];
            return (
              <Link
                key={style}
                href={`/shop?style=${encodeURIComponent(style)}`}
                className={`${colors.bg} ${colors.text} p-10 group hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between min-h-[220px]`}
              >
                <span className="text-xs font-bold uppercase tracking-widest opacity-50">
                  Style Frequency
                </span>
                <div>
                  <h2
                    className="text-5xl md:text-6xl font-black uppercase leading-none mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {style}
                  </h2>
                  <p className="text-sm opacity-60 leading-relaxed max-w-sm">
                    {STYLE_DESCRIPTIONS[style]}
                  </p>
                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold uppercase tracking-widest">Shop This Style</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
