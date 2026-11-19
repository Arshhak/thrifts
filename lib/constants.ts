export const BRAND = {
  name: "KK THRIFTS",
  tagline: "NEVER BASIC.",
  phrases: [
    "FOUND. NOT FOLLOWED.",
    "PRE-LOVED. RE-DISCOVERED. RE-WORN.",
    "GOOD CLOTHES DESERVE ANOTHER LIFE.",
    "SECOND HAND. FIRST CHOICE.",
    "STYLE ISN'T NEW. IT'S YOURS.",
  ],
  whatsapp: "919999999999",
  instagram: "https://instagram.com/kkthrifts",
};

export const WHATSAPP_BASE = `https://wa.me/${BRAND.whatsapp}`;

export function getWhatsAppUrl(name: string, price: number): string {
  const text = `Hi, I'm interested in ${name} priced at ₹${price}. Is this item still available?`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export const CATEGORIES = [
  { label: "Outerwear", slug: "outerwear", image: "photo-1558618666-fcd25c85cd64" },
  { label: "Tops", slug: "tops", image: "photo-1521572163474-6864f9cf17ab" },
  { label: "Bottoms", slug: "bottoms", image: "photo-1543087903-1ac2364bef05" },
  { label: "Accessories", slug: "accessories", image: "photo-1562157873-818bc0726f68" },
  { label: "Dresses", slug: "dresses", image: "photo-1515886657613-9f3515b0c78f" },
  { label: "Footwear", slug: "footwear", image: "photo-1583743814966-8d34ad3ad78f" },
];

export const STYLE_TAGS = [
  "Y2K",
  "GRUNGE",
  "STREETWEAR",
  "VINTAGE",
  "MINIMAL",
  "OLD MONEY",
  "DENIM CULTURE",
  "EXPERIMENTAL",
];

export const COLORS = [
  "Black",
  "White",
  "Blue",
  "Brown",
  "Cream",
  "Grey",
  "Navy",
  "Olive",
  "Red",
  "Khaki",
  "Multicolor",
];

export const MATERIALS = [
  "Cotton",
  "Denim",
  "Leather",
  "Linen",
  "Faux Leather",
  "Polyester",
  "Wool Knit",
  "Fleece",
  "Wool Blend",
  "Nylon",
  "Rayon",
  "Canvas",
  "Cotton Fleece",
  "Corduroy",
];

export const CONDITIONS = ["Excellent", "Good", "Fair"];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "OS"];

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export const COLORS_PALETTE = {
  primaryBg: "#E5E5E7",
  lightBg: "#F2F2F2",
  secondaryBg: "#D0D0D3",
  darkBg: "#171717",
  primaryText: "#111111",
  secondaryText: "#686868",
  accent: "#A32626",
};
