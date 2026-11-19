"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-[#171717] py-24 md:py-32 overflow-hidden relative"
    >
      {/* Background text */}
      <p
        className="absolute inset-0 flex items-center justify-center text-white/[0.03] font-black pointer-events-none select-none text-[clamp(8rem,20vw,20rem)] leading-none tracking-tighter whitespace-nowrap"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        NEVER BASIC
      </p>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Top label */}
          <span className="text-[#A32626] text-xs font-bold uppercase tracking-widest mb-6 block">
            Our Belief
          </span>

          {/* Main text */}
          <h2
            className="text-[clamp(4rem,12vw,10rem)] font-black text-white leading-none tracking-tighter uppercase mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            NEVER
            <br />
            BASIC.
          </h2>

          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
            <p className="text-white/60 text-lg md:text-xl max-w-md leading-relaxed">
              Second hand. First choice.
              <br />
              Every piece has a story. We&apos;re just passing it on.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-all duration-300 group self-start"
            >
              OUR STORY
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bottom marquee-style strip */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-wrap gap-8">
            {[
              "FOUND. NOT FOLLOWED.",
              "PRE-LOVED. RE-DISCOVERED.",
              "GOOD CLOTHES DESERVE ANOTHER LIFE.",
              "STYLE ISN'T NEW. IT'S YOURS.",
            ].map((phrase) => (
              <span
                key={phrase}
                className="text-white/20 text-xs font-bold uppercase tracking-widest"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
