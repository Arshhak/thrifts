import { Suspense } from "react";
import { fetchProducts } from "@/lib/supabase/queries";
import ShopClient from "./ShopClient";

async function ShopPageContent() {
  const products = await fetchProducts({ sort: "newest" });
  return <ShopClient initialProducts={products} />;
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E5E5E7] pt-20" />}>
      <ShopPageContent />
    </Suspense>
  );
}
