import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  fetchProductBySlug,
  fetchRelatedProducts,
  type ProductWithImages,
} from "@/lib/supabase/queries";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;

  const dbProduct = await fetchProductBySlug(slug);

  if (!dbProduct) {
    notFound();
  }

  const relatedDb = await fetchRelatedProducts(dbProduct, 4);

  // Map to the shape ProductCard and ProductPageClient expect
  function mapProduct(p: ProductWithImages) {
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      originalPrice: p.original_price ?? undefined,
      category: p.category,
      size: p.size,
      color: p.color,
      material: p.material,
      condition: p.condition,
      description: p.description,
      images: p.images.length > 0 ? p.images : ["/placeholder.jpg"],
      styleTags: p.style_tags,
      isAvailable: p.is_available,
      isNew: p.is_new,
      createdAt: p.created_at,
    };
  }

  const product = mapProduct(dbProduct);
  const related = relatedDb.map(mapProduct);

  return <ProductPageClient product={product} related={related} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E5E5E7] pt-20" />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
