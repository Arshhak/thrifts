import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-[#D0D0D3] animate-pulse">
            <div className="aspect-[3/4]" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-[#C0C0C3] rounded w-3/4" />
              <div className="h-3 bg-[#C0C0C3] rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p
          className="text-6xl font-black text-[#D0D0D3] mb-4 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          No Finds.
        </p>
        <p className="text-[#686868] text-sm font-medium max-w-xs">
          No pieces match your filters right now. Try adjusting or clearing your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
