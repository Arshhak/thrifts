import { Product } from "./types";

const BASE = "https://images.unsplash.com/photo-";
const q = "?w=600&q=80";

function img(id: string) {
  return `${BASE}${id}${q}`;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "vintage-washed-black-denim-jacket",
    name: "Vintage Washed Black Denim Jacket",
    price: 1299,
    originalPrice: 2500,
    category: "Outerwear",
    size: "M",
    color: "Black",
    material: "Denim",
    condition: "Excellent",
    description:
      "A perfectly distressed black denim jacket with washed-out tones that give it that authentic vintage feel. Features classic chest pockets, button-down front, and a relaxed fit. Pairs effortlessly with everything from joggers to trousers.",
    images: [
      img("1558618666-fcd25c85cd64"),
      img("1551028930-b77f03a28f7d"),
      img("1543087903-1ac2364bef05"),
    ],
    styleTags: ["VINTAGE", "GRUNGE", "STREETWEAR"],
    isAvailable: true,
    isNew: true,
    createdAt: "2024-11-10T10:00:00Z",
  },
  {
    id: "2",
    slug: "oversized-graphic-tee-90s-print",
    name: "Oversized Graphic Tee (90s Print)",
    price: 599,
    originalPrice: 1200,
    category: "Tops",
    size: "L",
    color: "White",
    material: "Cotton",
    condition: "Good",
    description:
      "Bold 90s-era graphic print on a heavyweight oversized cotton tee. The kind of piece that anchors any vintage or streetwear look. Slightly boxy fit with dropped shoulders.",
    images: [
      img("1521572163474-6864f9cf17ab"),
      img("1529374255404-311a2a4f1fd9"),
      img("1509631179647-0177331693ae"),
    ],
    styleTags: ["Y2K", "GRUNGE", "STREETWEAR"],
    isAvailable: true,
    isNew: true,
    createdAt: "2024-11-09T10:00:00Z",
  },
  {
    id: "3",
    slug: "90s-baggy-cargo-jeans",
    name: "90s Baggy Cargo Jeans",
    price: 1099,
    originalPrice: 2200,
    category: "Bottoms",
    size: "32",
    color: "Blue",
    material: "Denim",
    condition: "Good",
    description:
      "Classic 90s-style baggy cargo jeans with multiple utility pockets. Mid-rise waist, wide-leg silhouette, and that authentic lived-in denim look. A wardrobe essential for any streetwear or Y2K aesthetic.",
    images: [
      img("1543087903-1ac2364bef05"),
      img("1582418702083-6dba09f54cfc"),
      img("1562157873-818bc0726f68"),
    ],
    styleTags: ["Y2K", "STREETWEAR", "DENIM CULTURE"],
    isAvailable: true,
    isNew: true,
    createdAt: "2024-11-08T10:00:00Z",
  },
  {
    id: "4",
    slug: "distressed-brown-leather-jacket",
    name: "Distressed Brown Leather Jacket",
    price: 2499,
    originalPrice: 5000,
    category: "Outerwear",
    size: "M",
    color: "Brown",
    material: "Leather",
    condition: "Excellent",
    description:
      "A premium distressed brown leather jacket with moto-style detailing. Features asymmetric zipper, quilted shoulder panels, and multiple pockets. The kind of piece that only gets better with age.",
    images: [
      img("1558618666-fcd25c85cd64"),
      img("1591047139829-d91aecb6caea"),
      img("1515886657613-9f3515b0c78f"),
    ],
    styleTags: ["GRUNGE", "VINTAGE", "EXPERIMENTAL"],
    isAvailable: true,
    isNew: true,
    createdAt: "2024-11-07T10:00:00Z",
  },
  {
    id: "5",
    slug: "vintage-corduroy-blazer",
    name: "Vintage Corduroy Blazer",
    price: 1799,
    originalPrice: 3500,
    category: "Outerwear",
    size: "L",
    color: "Brown",
    material: "Corduroy",
    condition: "Good",
    description:
      "A warm-toned corduroy blazer with a structured silhouette and classic notch lapels. Rich texture and old-world charm. Effortlessly bridges the gap between casual and dressed-up.",
    images: [
      img("1591047139829-d91aecb6caea"),
      img("1434389610994-02c89a7f1b31"),
      img("1467043153537-a4fba2cd39ef"),
    ],
    styleTags: ["OLD MONEY", "VINTAGE", "MINIMAL"],
    isAvailable: true,
    isNew: true,
    createdAt: "2024-11-06T10:00:00Z",
  },
  {
    id: "6",
    slug: "minimal-linen-overshirt",
    name: "Minimal Linen Overshirt",
    price: 749,
    originalPrice: 1500,
    category: "Tops",
    size: "M",
    color: "Cream",
    material: "Linen",
    condition: "Excellent",
    description:
      "A breathable linen overshirt in a soft cream tone. Clean, minimal design with a relaxed fit perfect for layering. Worn open over a tee or buttoned as a standalone — always effortless.",
    images: [
      img("1521572163474-6864f9cf17ab"),
      img("1441986300917-64674bd600d8"),
      img("1479064555987-dfe8f994ac7d"),
    ],
    styleTags: ["MINIMAL", "OLD MONEY"],
    isAvailable: true,
    isNew: true,
    createdAt: "2024-11-05T10:00:00Z",
  },
  {
    id: "7",
    slug: "y2k-mini-shoulder-bag",
    name: "Y2K Mini Shoulder Bag",
    price: 449,
    originalPrice: 900,
    category: "Accessories",
    size: "OS",
    color: "Black",
    material: "Faux Leather",
    condition: "Good",
    description:
      "A compact Y2K-inspired mini shoulder bag with chain strap and angular silhouette. The perfect finishing touch for any vintage or Y2K-coded look. Features a zip closure and small interior pocket.",
    images: [
      img("1562157873-818bc0726f68"),
      img("1483985988355-763728e1a15b"),
      img("1564859228273-274232fdb516"),
    ],
    styleTags: ["Y2K", "EXPERIMENTAL"],
    isAvailable: true,
    isNew: true,
    createdAt: "2024-11-04T10:00:00Z",
  },
  {
    id: "8",
    slug: "retro-track-jacket-90s",
    name: "Retro Track Jacket (90s)",
    price: 1199,
    originalPrice: 2400,
    category: "Outerwear",
    size: "L",
    color: "Navy",
    material: "Polyester",
    condition: "Good",
    description:
      "Classic 90s athletic track jacket with contrast stripe detailing and zip-up front. Lightweight polyester shell with a nostalgic energy. A streetwear staple that transcends decades.",
    images: [
      img("1529374255404-311a2a4f1fd9"),
      img("1509631179647-0177331693ae"),
      img("1515886657613-9f3515b0c78f"),
    ],
    styleTags: ["Y2K", "STREETWEAR", "VINTAGE"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-11-03T10:00:00Z",
  },
  {
    id: "9",
    slug: "faded-black-band-tee",
    name: "Faded Black Band Tee",
    price: 499,
    originalPrice: 1000,
    category: "Tops",
    size: "L",
    color: "Black",
    material: "Cotton",
    condition: "Fair",
    description:
      "A faded black band tee with that perfect worn-in patina. The fading and softness come from years of real use — not a factory wash. The grunge look that money can't buy but thrifting can deliver.",
    images: [
      img("1521572163474-6864f9cf17ab"),
      img("1551028930-b77f03a28f7d"),
      img("1583743814966-8d34ad3ad78f"),
    ],
    styleTags: ["GRUNGE", "VINTAGE"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-11-02T10:00:00Z",
  },
  {
    id: "10",
    slug: "wide-leg-cargo-pants",
    name: "Wide-Leg Cargo Pants",
    price: 1399,
    originalPrice: 2800,
    category: "Bottoms",
    size: "M",
    color: "Olive",
    material: "Cotton",
    condition: "Excellent",
    description:
      "Wide-leg cargo pants in earthy olive with oversized utility pockets and relaxed silhouette. Incredibly versatile — throw them on with a fitted tee or layer under an oversized jacket.",
    images: [
      img("1582418702083-6dba09f54cfc"),
      img("1543087903-1ac2364bef05"),
      img("1469334031218-e382a71b716b"),
    ],
    styleTags: ["STREETWEAR", "EXPERIMENTAL", "GRUNGE"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-11-01T10:00:00Z",
  },
  {
    id: "11",
    slug: "vintage-chunky-knit-sweater",
    name: "Vintage Chunky Knit Sweater",
    price: 899,
    originalPrice: 1800,
    category: "Tops",
    size: "M",
    color: "Cream",
    material: "Wool Knit",
    condition: "Good",
    description:
      "A heavyweight chunky knit sweater in warm cream. Oversized silhouette with dropped shoulders and ribbed trim. The kind of cozy that still looks intentional.",
    images: [
      img("1529374255404-311a2a4f1fd9"),
      img("1441986300917-64674bd600d8"),
      img("1434389610994-02c89a7f1b31"),
    ],
    styleTags: ["OLD MONEY", "MINIMAL", "VINTAGE"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-31T10:00:00Z",
  },
  {
    id: "12",
    slug: "oversized-fleece-hoodie",
    name: "Oversized Fleece Hoodie",
    price: 1099,
    originalPrice: 2200,
    category: "Tops",
    size: "XL",
    color: "Grey",
    material: "Fleece",
    condition: "Good",
    description:
      "An oversized fleece hoodie in a classic heathered grey. Soft-washed interior, kangaroo pocket, and drawstring hood. The ultimate comfort piece that still pulls its weight aesthetically.",
    images: [
      img("1529374255404-311a2a4f1fd9"),
      img("1509631179647-0177331693ae"),
      img("1583743814966-8d34ad3ad78f"),
    ],
    styleTags: ["STREETWEAR", "MINIMAL"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-30T10:00:00Z",
  },
  {
    id: "13",
    slug: "washed-denim-jacket-blue",
    name: "Washed Denim Jacket (Blue)",
    price: 1299,
    originalPrice: 2600,
    category: "Outerwear",
    size: "S",
    color: "Blue",
    material: "Denim",
    condition: "Excellent",
    description:
      "A light-washed blue denim jacket with a classic fit and authentic fade pattern. Timeless silhouette with chest pockets, button front, and adjustable waist tabs at the hem.",
    images: [
      img("1543087903-1ac2364bef05"),
      img("1558618666-fcd25c85cd64"),
      img("1562157873-818bc0726f68"),
    ],
    styleTags: ["DENIM CULTURE", "VINTAGE", "MINIMAL"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-29T10:00:00Z",
  },
  {
    id: "14",
    slug: "vintage-polo-shirt",
    name: "Vintage Polo Shirt",
    price: 649,
    originalPrice: 1300,
    category: "Tops",
    size: "M",
    color: "Navy",
    material: "Cotton",
    condition: "Excellent",
    description:
      "A crisp vintage polo in deep navy with the kind of soft, broken-in cotton you can't replicate with new pieces. Three-button placket, ribbed collar and cuffs.",
    images: [
      img("1521572163474-6864f9cf17ab"),
      img("1479064555987-dfe8f994ac7d"),
      img("1509631179647-0177331693ae"),
    ],
    styleTags: ["OLD MONEY", "MINIMAL"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-28T10:00:00Z",
  },
  {
    id: "15",
    slug: "pleated-wide-leg-trousers",
    name: "Pleated Wide-Leg Trousers",
    price: 1199,
    originalPrice: 2400,
    category: "Bottoms",
    size: "L",
    color: "Black",
    material: "Wool Blend",
    condition: "Good",
    description:
      "Elegant pleated wide-leg trousers in a soft wool blend. High-rise waist with front pleats that create a relaxed, fluid silhouette. Dresses up effortlessly — from streetwear to old money.",
    images: [
      img("1582418702083-6dba09f54cfc"),
      img("1434389610994-02c89a7f1b31"),
      img("1469334031218-e382a71b716b"),
    ],
    styleTags: ["OLD MONEY", "MINIMAL", "EXPERIMENTAL"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-27T10:00:00Z",
  },
  {
    id: "16",
    slug: "retro-windbreaker",
    name: "Retro Windbreaker",
    price: 999,
    originalPrice: 2000,
    category: "Outerwear",
    size: "L",
    color: "Red",
    material: "Nylon",
    condition: "Good",
    description:
      "A bold red retro windbreaker with contrast paneling and zip-up front. Lightweight and packable, with a cinched hem and cuffs. The kind of statement layer that completes a look.",
    images: [
      img("1529374255404-311a2a4f1fd9"),
      img("1515886657613-9f3515b0c78f"),
      img("1562157873-818bc0726f68"),
    ],
    styleTags: ["Y2K", "STREETWEAR", "EXPERIMENTAL"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-26T10:00:00Z",
  },
  {
    id: "17",
    slug: "printed-vintage-hawaiian-shirt",
    name: "Printed Vintage Hawaiian Shirt",
    price: 699,
    originalPrice: 1400,
    category: "Tops",
    size: "M",
    color: "Multicolor",
    material: "Rayon",
    condition: "Good",
    description:
      "A short-sleeve vintage Hawaiian shirt in a vivid tropical print. Lightweight rayon fabric with a relaxed camp-collar silhouette. Wear open over a tee or buttoned fully for maximum energy.",
    images: [
      img("1483985988355-763728e1a15b"),
      img("1509631179647-0177331693ae"),
      img("1564859228273-274232fdb516"),
    ],
    styleTags: ["VINTAGE", "EXPERIMENTAL"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-25T10:00:00Z",
  },
  {
    id: "18",
    slug: "canvas-tote-bag-vintage",
    name: "Canvas Tote Bag (Vintage)",
    price: 349,
    originalPrice: 700,
    category: "Accessories",
    size: "OS",
    color: "Khaki",
    material: "Canvas",
    condition: "Fair",
    description:
      "A heavy-duty vintage canvas tote in khaki with printed text and reinforced handles. That perfectly worn-in aesthetic with real stories attached. Big enough for daily essentials and then some.",
    images: [
      img("1467043153537-a4fba2cd39ef"),
      img("1441986300917-64674bd600d8"),
      img("1434389610994-02c89a7f1b31"),
    ],
    styleTags: ["MINIMAL", "VINTAGE"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-24T10:00:00Z",
  },
  {
    id: "19",
    slug: "distressed-crewneck-sweatshirt",
    name: "Distressed Crewneck Sweatshirt",
    price: 799,
    originalPrice: 1600,
    category: "Tops",
    size: "L",
    color: "Grey",
    material: "Cotton Fleece",
    condition: "Fair",
    description:
      "A heavy distressed crewneck sweatshirt in washed grey. Raw hems, worn-in texture, and authentic fading. The kind of casual that looks deliberate.",
    images: [
      img("1529374255404-311a2a4f1fd9"),
      img("1583743814966-8d34ad3ad78f"),
      img("1521572163474-6864f9cf17ab"),
    ],
    styleTags: ["GRUNGE", "STREETWEAR"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-23T10:00:00Z",
  },
  {
    id: "20",
    slug: "classic-denim-shorts",
    name: "Classic Denim Shorts",
    price: 599,
    originalPrice: 1200,
    category: "Bottoms",
    size: "30",
    color: "Blue",
    material: "Denim",
    condition: "Good",
    description:
      "Vintage mid-rise denim shorts with a relaxed fit and raw-hem finish. Lived-in denim with authentic fade. The definitive summer staple — effortless and always relevant.",
    images: [
      img("1543087903-1ac2364bef05"),
      img("1582418702083-6dba09f54cfc"),
      img("1562157873-818bc0726f68"),
    ],
    styleTags: ["DENIM CULTURE", "VINTAGE"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-22T10:00:00Z",
  },
  {
    id: "21",
    slug: "vintage-utility-vest",
    name: "Vintage Utility Vest",
    price: 899,
    originalPrice: 1800,
    category: "Outerwear",
    size: "M",
    color: "Khaki",
    material: "Cotton",
    condition: "Good",
    description:
      "A vintage multi-pocket utility vest in khaki cotton. Loaded with pockets — chest, cargo, and hidden — with a classic military-inspired silhouette. The ultimate functional layer.",
    images: [
      img("1591047139829-d91aecb6caea"),
      img("1467043153537-a4fba2cd39ef"),
      img("1515886657613-9f3515b0c78f"),
    ],
    styleTags: ["GRUNGE", "EXPERIMENTAL", "STREETWEAR"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-21T10:00:00Z",
  },
  {
    id: "22",
    slug: "corduroy-wide-leg-pants",
    name: "Corduroy Wide-Leg Pants",
    price: 1099,
    originalPrice: 2200,
    category: "Bottoms",
    size: "M",
    color: "Brown",
    material: "Corduroy",
    condition: "Excellent",
    description:
      "Warm brown wide-leg corduroy pants with a mid-rise waist and clean silhouette. Rich texture that photographs beautifully and feels even better. A must-have for any vintage or old money-coded wardrobe.",
    images: [
      img("1582418702083-6dba09f54cfc"),
      img("1467043153537-a4fba2cd39ef"),
      img("1434389610994-02c89a7f1b31"),
    ],
    styleTags: ["OLD MONEY", "VINTAGE", "MINIMAL"],
    isAvailable: true,
    isNew: false,
    createdAt: "2024-10-20T10:00:00Z",
  },
];

export function getNewFinds(count = 8): Product[] {
  return [...SAMPLE_PRODUCTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

export function getProductBySlug(slug: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return SAMPLE_PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category ||
        p.styleTags.some((t) => product.styleTags.includes(t)))
  ).slice(0, count);
}

export function filterProducts(
  products: Product[],
  filters: {
    category?: string[];
    size?: string[];
    color?: string[];
    condition?: string[];
    material?: string[];
    priceMin?: number;
    priceMax?: number;
    styleTags?: string[];
    sort?: string;
    query?: string;
  }
): Product[] {
  let result = [...products];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.styleTags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.category?.length) {
    result = result.filter((p) => filters.category!.includes(p.category));
  }
  if (filters.size?.length) {
    result = result.filter((p) => filters.size!.includes(p.size));
  }
  if (filters.color?.length) {
    result = result.filter((p) => filters.color!.includes(p.color));
  }
  if (filters.condition?.length) {
    result = result.filter((p) => filters.condition!.includes(p.condition));
  }
  if (filters.material?.length) {
    result = result.filter((p) => filters.material!.includes(p.material));
  }
  if (filters.priceMin !== undefined) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }
  if (filters.styleTags?.length) {
    result = result.filter((p) =>
      p.styleTags.some((t) => filters.styleTags!.includes(t))
    );
  }

  if (filters.sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else {
    result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return result;
}
