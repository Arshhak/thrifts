import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="bg-[#E5E5E7] min-h-screen pt-20">
      <div className="bg-[#171717] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#A32626] text-xs font-bold uppercase tracking-widest block mb-4">
            Our Story
          </span>
          <h1
            className="text-[clamp(4rem,10vw,8rem)] font-black text-white leading-none tracking-tighter uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ABOUT
            <br />
            KK THRIFTS.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-10">
          <p
            className="text-2xl md:text-3xl font-black text-[#111111] uppercase leading-tight"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            {BRAND.tagline}
          </p>
          <p className="text-[#686868] text-lg leading-relaxed">
            KK Thrifts was born from a simple belief: great style doesn&apos;t need to be new.
            The best pieces have already lived a life — they carry character, texture, and
            stories that fast fashion can&apos;t manufacture.
          </p>
          <p className="text-[#686868] text-lg leading-relaxed">
            We curate pre-loved fashion for people who know that style is a mindset, not a
            price tag. Bold, unconventional, forward-thinking.
          </p>
          {BRAND.phrases.map((phrase) => (
            <p
              key={phrase}
              className="text-[#111111] font-black text-xl uppercase tracking-tight border-l-4 border-[#A32626] pl-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {phrase}
            </p>
          ))}
          <div className="pt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#A32626] transition-colors group"
            >
              Shop All Pieces
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
