import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchProducts, fetchCategories } from "@/lib/supabase/queries";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  // Load categories from DB
  const dbCategories = await fetchCategories();
  const categoryObj = dbCategories.find((c) => c.slug === categorySlug);

  if (!categoryObj) {
    notFound();
  }

  const products = await fetchProducts({ categorySlug, sort: "newest" });

  return (
    <CategoryPageClient
      categoryName={categoryObj.name}
      initialProducts={products}
    />
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E5E5E7] pt-20" />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
