import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandStorySection() {
  return (
    <section className="bg-[#F2F2F2] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <span className="text-xs font-bold text-[#A32626] uppercase tracking-widest mb-4 block">
              The Story
            </span>
            <h2
              className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#111111] uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              FASHION IS
              <br />
              A CYCLE.
              <br />
              WE&apos;RE IN IT.
            </h2>
            <p className="text-[#686868] leading-relaxed mb-4 max-w-md">
              KK Thrifts was born from a simple belief: great style doesn&apos;t need to be new.
              The best pieces have already lived a life — they carry character, texture, and
              stories that fast fashion can&apos;t manufacture.
            </p>
            <p className="text-[#686868] leading-relaxed mb-8 max-w-md">
              We curate pre-loved fashion for people who know that style is a mindset, not a
              price tag. Bold, unconventional, forward-thinking — this is KK Thrifts.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#111111] hover:text-[#A32626] transition-colors border-b border-[#111111] pb-1 hover:border-[#A32626]"
            >
              READ MORE <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: stats / manifesto */}
          <div className="bg-[#171717] p-10 md:p-12">
            <p
              className="text-[#A32626] text-xs font-bold uppercase tracking-widest mb-8"
            >
              Our Manifesto
            </p>
            <div className="flex flex-col gap-6">
              {[
                { number: "01", text: "Pre-loved is not second-best. It&apos;s first choice." },
                { number: "02", text: "Style isn't bought. It's found, built, and owned." },
                { number: "03", text: "Every piece deserves another life." },
                { number: "04", text: "Be the reference, not the replica." },
              ].map((item) => (
                <div key={item.number} className="flex gap-5 items-start border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <span
                    className="text-white/20 text-2xl font-black flex-shrink-0"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.number}
                  </span>
                  <p
                    className="text-white/70 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
