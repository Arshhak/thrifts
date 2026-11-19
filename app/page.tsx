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
      <NewFindsSection />
      <CategoriesSection />
      <StyleDiscoverySection />
      <EditorialBanner />
      <BrandStorySection />
    </>
  );
}
