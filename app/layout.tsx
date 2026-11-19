import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "KK THRIFTS — NEVER BASIC.",
  description:
    "Pre-loved fashion curated for the bold. Vintage, streetwear, and editorial thrift pieces. Second hand. First choice.",
  keywords: "thrift, vintage, streetwear, pre-loved, second hand, fashion",
  openGraph: {
    title: "KK THRIFTS — NEVER BASIC.",
    description: "Pre-loved fashion curated for the bold.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        <WishlistProvider>
          <SearchProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SearchProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
