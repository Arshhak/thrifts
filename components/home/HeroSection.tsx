"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
  "https://images.unsplash.com/photo-1543087903-1ac2364bef05?w=800&q=80",
];

export default function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#F2F2F2] overflow-hidden pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)] items-center gap-0">
          {/* Text Side */}
          <div
            className="flex flex-col justify-center py-16 lg:py-0 order-2 lg:order-1"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Top labels */}
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#A32626] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                NEW FINDS
              </span>
              <span className="text-[#686868] text-xs font-medium uppercase tracking-widest">
                PRE-LOVED. RE-DISCOVERED.
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-[clamp(4rem,10vw,8rem)] leading-[0.9] font-black uppercase tracking-tight text-[#111111] mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              FOUND
              <br />
              YOUR NEXT
              <br />
              <span className="text-[#A32626]">FAVOURITE.</span>
            </h1>

            {/* Sub text */}
            <p className="text-[#686868] text-base md:text-lg max-w-sm mb-10 leading-relaxed font-medium">
              Style isn&apos;t new. It&apos;s yours. Pre-loved pieces curated for the bold,
              the unconventional, the fashion-forward.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#A32626] transition-colors duration-300 group"
              >
                SHOP NOW
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?sort=newest"
                className="text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#A32626] transition-colors border-b border-[#111111] pb-1 hover:border-[#A32626]"
              >
                NEW FINDS →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-16 pt-10 border-t border-[#D0D0D3]">
              <div>
                <p
                  className="text-4xl font-black text-[#111111]"
                  style={{ fontFamily: "'Archivo Black', sans-serif" }}
                >
                  22+
                </p>
                <p className="text-xs uppercase tracking-widest text-[#686868] font-semibold mt-1">
                  Pieces
                </p>
              </div>
              <div>
                <p
                  className="text-4xl font-black text-[#111111]"
                  style={{ fontFamily: "'Archivo Black', sans-serif" }}
                >
                  100%
                </p>
                <p className="text-xs uppercase tracking-widest text-[#686868] font-semibold mt-1">
                  Curated
                </p>
              </div>
              <div>
                <p
                  className="text-4xl font-black text-[#111111]"
                  style={{ fontFamily: "'Archivo Black', sans-serif" }}
                >
                  ₹349+
                </p>
                <p className="text-xs uppercase tracking-widest text-[#686868] font-semibold mt-1">
                  Starting At
                </p>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div
            className="relative order-1 lg:order-2 h-[50vh] lg:h-screen"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.3s",
            }}
          >
            {HERO_IMAGES.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0"
                style={{
                  opacity: i === activeImage ? 1 : 0,
                  transition: "opacity 1s ease",
                }}
              >
                <Image
                  src={src}
                  alt={`KK Thrifts editorial ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ))}

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="transition-all duration-300"
                  aria-label={`Image ${i + 1}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === activeImage
                        ? "w-6 h-2 bg-white"
                        : "w-2 h-2 bg-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Side label */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 hidden lg:flex flex-col items-center gap-2 z-10">
              <span
                className="text-[#686868] text-[10px] font-bold uppercase tracking-[0.3em] writing-mode-vertical"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                FOUND. NOT FOLLOWED.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-[#111111] text-white py-4 overflow-hidden">
        <div className="flex items-center gap-12 px-6 md:px-12 justify-center flex-wrap">
          <span
            className="text-lg font-black tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            NEVER BASIC.
          </span>
          <span className="w-1 h-1 rounded-full bg-[#A32626]" />
          <span className="text-sm font-medium text-white/60 uppercase tracking-widest">
            Pre-loved pieces.
          </span>
          <span className="w-1 h-1 rounded-full bg-[#A32626]" />
          <Link
            href="/shop"
            className="text-sm font-bold text-[#A32626] uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
          >
            SHOP NOW <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
