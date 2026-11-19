"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, Menu, X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "NEW FINDS", href: "/shop?sort=newest" },
  { label: "CATEGORIES", href: "/categories" },
  { label: "FIND YOUR STYLE", href: "/style" },
  { label: "ABOUT", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useWishlist();
  const { openSearch } = useSearch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#171717] shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "font-display text-xl md:text-2xl tracking-widest font-black transition-colors",
                scrolled ? "text-white" : "text-[#111111]"
              )}
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              KK THRIFTS
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#A32626]",
                    scrolled ? "text-white" : "text-[#111111]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={openSearch}
                className={cn(
                  "transition-colors hover:text-[#A32626]",
                  scrolled ? "text-white" : "text-[#111111]"
                )}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className={cn(
                  "relative transition-colors hover:text-[#A32626]",
                  scrolled ? "text-white" : "text-[#111111]"
                )}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#A32626] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className={cn(
                  "md:hidden transition-colors hover:text-[#A32626]",
                  scrolled ? "text-white" : "text-[#111111]"
                )}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-[#171717] flex flex-col transition-transform duration-500 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-white font-black text-xl tracking-widest"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            KK THRIFTS
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:text-[#A32626] transition-colors"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-10 gap-2 flex-1">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-4xl font-black tracking-widest uppercase py-3 border-b border-white/10 hover:text-[#A32626] transition-colors"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                animationDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-10 flex gap-4">
          <button
            onClick={() => { setMenuOpen(false); openSearch(); }}
            className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
          >
            <Search size={16} /> Search
          </button>
          <Link
            href="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
          >
            <Heart size={16} /> Wishlist {count > 0 && `(${count})`}
          </Link>
        </div>
      </div>
    </>
  );
}
