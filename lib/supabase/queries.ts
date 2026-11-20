import { createServerSupabaseClient } from "./server";
import type { DbCategory, DbProduct } from "@/lib/types";

// ─── Categories ───────────────────────────────────────────────────────────────

export async function fetchCategories(): Promise<DbCategory[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, image_url, created_at")
    .order("name");

  if (error) {
    const errorDetails = `[Supabase fetchCategories] Failed to fetch categories: ${error.message}`;
    console.error(errorDetails);
    throw new Error(errorDetails);
  }
  return data ?? [];
}

// ─── Products ─────────────────────────────────────────────────────────────────

export type ProductWithImages = DbProduct & { images: string[] };

/**
 * Common select query supporting both direct category column and
 * relational categories join (when foreign key is configured).
 */
const BASE_PRODUCT_FIELDS = `
  id,
  name,
  slug,
  price,
  original_price,
  category,
  brand,
  size,
  color,
  material,
  condition,
  description,
  status,
  style_tags,
  created_at,
  product_images (
    id,
    image_url,
    sort_order,
    is_primary
  )
`;

const RELATIONAL_PRODUCT_FIELDS = `
  id,
  name,
  slug,
  price,
  original_price,
  category,
  category_id,
  categories ( id, name, slug ),
  brand,
  size,
  color,
  material,
  condition,
  description,
  status,
  style_tags,
  created_at,
  product_images (
    id,
    image_url,
    sort_order,
    is_primary
  )
`;

/**
 * Fetches available products with their images.
 * Tries the relational join first (if foreign key exists in DB).
 * If the foreign key relationship is missing from schema cache, gracefully falls back
 * to direct column queries while warning the developer in development mode.
 */
export async function fetchProducts(opts?: {
  categorySlug?: string;
  limit?: number;
  sort?: "newest" | "price-asc" | "price-desc";
}): Promise<ProductWithImages[]> {
  const supabase = createServerSupabaseClient();

  // Helper to build queries
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function buildQuery(selectFields: string, isRelational: boolean): any {
    let q = supabase
      .from("products")
      .select(selectFields);

    // Filter available products
    q = q.or("status.eq.available,status.is.null");

    if (opts?.categorySlug) {
      if (isRelational) {
        q = q.eq("categories.slug", opts.categorySlug);
      } else {
        // Direct category text matching (by slug or name)
        q = q.or(`category.ilike.%${opts.categorySlug}%`);
      }
    }

    if (opts?.sort === "price-asc") {
      q = q.order("price", { ascending: true });
    } else if (opts?.sort === "price-desc") {
      q = q.order("price", { ascending: false });
    } else {
      q = q.order("created_at", { ascending: false });
    }

    if (opts?.limit) {
      q = q.limit(opts.limit);
    }

    return q;
  }

  // 1. Try relational query first
  const { data: relData, error: relError } = await buildQuery(RELATIONAL_PRODUCT_FIELDS, true);

  if (!relError) {
    return mapProductRows(relData ?? [], opts?.categorySlug);
  }

  // Check if error is due to missing foreign key relationship in schema cache
  const isRelationMissing =
    relError.message?.includes("relationship") ||
    relError.message?.includes("schema cache") ||
    relError.message?.includes("category_id");

  if (isRelationMissing) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[Supabase fetchProducts] Note: Foreign key relationship between 'products' and 'categories' is not detected yet.\n` +
        `Falling back to direct query on products.category. To enable relational joins, run the migration in Supabase SQL editor.`
      );
    }

    // 2. Fall back to direct query on products table
    const { data: directData, error: directError } = await buildQuery(BASE_PRODUCT_FIELDS, false);

    if (directError) {
      const msg = `[Supabase fetchProducts] Database query failed: ${directError.message} (${directError.details || ""})`;
      console.error(msg);
      throw new Error(msg);
    }

    return mapProductRows(directData ?? [], opts?.categorySlug);
  }

  // If another unexpected database error occurred, do NOT silently swallow it
  const fatalMsg = `[Supabase fetchProducts] Database error: ${relError.message} (${relError.details || relError.hint || ""})`;
  console.error(fatalMsg);
  throw new Error(fatalMsg);
}

export async function fetchProductBySlug(
  slug: string
): Promise<ProductWithImages | null> {
  const supabase = createServerSupabaseClient();

  // Try relational query first
  const { data: relData, error: relError } = await supabase
    .from("products")
    .select(RELATIONAL_PRODUCT_FIELDS)
    .eq("slug", slug)
    .maybeSingle();

  if (!relError && relData) {
    return mapProductRows([relData])[0] ?? null;
  }

  const isRelationMissing =
    relError?.message?.includes("relationship") ||
    relError?.message?.includes("schema cache") ||
    relError?.message?.includes("category_id");

  if (isRelationMissing || (!relData && !relError)) {
    // Fall back to direct fields query
    const { data: dirData, error: dirError } = await supabase
      .from("products")
      .select(BASE_PRODUCT_FIELDS)
      .eq("slug", slug)
      .maybeSingle();

    if (dirError) {
      const msg = `[Supabase fetchProductBySlug] Query failed for slug "${slug}": ${dirError.message}`;
      console.error(msg);
      throw new Error(msg);
    }

    if (!dirData) return null;
    return mapProductRows([dirData])[0] ?? null;
  }

  if (relError) {
    const msg = `[Supabase fetchProductBySlug] Query error for slug "${slug}": ${relError.message}`;
    console.error(msg);
    throw new Error(msg);
  }

  return null;
}

export async function fetchRelatedProducts(
  product: ProductWithImages,
  limit = 4
): Promise<ProductWithImages[]> {
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from("products")
    .select(BASE_PRODUCT_FIELDS)
    .or("status.eq.available,status.is.null")
    .neq("id", product.id)
    .limit(limit);

  if (product.category) {
    query = query.ilike("category", `%${product.category}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Supabase fetchRelatedProducts] Query error:", error.message);
    return [];
  }

  return mapProductRows(data ?? []);
}

// ─── Mapper ───────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProductRows(rows: any[], filterCategorySlug?: string): ProductWithImages[] {
  const results: ProductWithImages[] = [];

  for (const row of rows) {
    // If relation join was used and returned null categories, skip when filtering
    if (filterCategorySlug && row.categories === null && !row.category) {
      continue;
    }

    const categoryName =
      (Array.isArray(row.categories)
        ? row.categories[0]?.name
        : row.categories?.name) ??
      row.category ??
      "";

    // Extract images from product_images table, sorting by sort_order
    const rawImages = Array.isArray(row.product_images) ? row.product_images : [];
    const sortedImages: string[] = rawImages
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => (a.sort_order ?? a.position ?? 0) - (b.sort_order ?? b.position ?? 0))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((img: any) => (img.image_url ?? img.url) as string)
      .filter(Boolean);

    const isAvailable =
      typeof row.is_available === "boolean"
        ? row.is_available
        : row.status
        ? row.status === "available"
        : true;

    results.push({
      id: row.id,
      name: row.name ?? "",
      slug: row.slug ?? "",
      price: typeof row.price === "number" ? row.price : parseFloat(row.price || "0"),
      original_price: row.original_price ? parseFloat(row.original_price) : null,
      category_id: row.category_id ?? "",
      category: categoryName,
      size: row.size ?? "",
      color: row.color ?? "",
      material: row.material ?? "",
      condition: row.condition ?? "Good",
      description: row.description ?? "",
      style_tags: Array.isArray(row.style_tags) ? row.style_tags : [],
      is_available: isAvailable,
      is_new: Boolean(row.is_new),
      created_at: row.created_at ?? new Date().toISOString(),
      images: sortedImages,
    });
  }

  return results;
}
