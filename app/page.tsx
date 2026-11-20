import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import NewFindsSection from "@/components/home/NewFindsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import StyleDiscoverySection from "@/components/home/StyleDiscoverySection";
import EditorialBanner from "@/components/home/EditorialBanner";
import BrandStorySection from "@/components/home/BrandStorySection";
import SearchOverlay from "@/components/search/SearchOverlay";

export default function HomePage() {
  return (
    <>
      <SearchOverlay />
      <HeroSection />
      <Suspense fallback={<div className="bg-[#E5E5E7] py-20 min-h-[400px]" />}>
        <NewFindsSection />
      </Suspense>
      <Suspense fallback={<div className="bg-[#F2F2F2] py-20 min-h-[400px]" />}>
        <CategoriesSection />
      </Suspense>
      <StyleDiscoverySection />
      <EditorialBanner />
      <BrandStorySection />
    </>
  );
}
