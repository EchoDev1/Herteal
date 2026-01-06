// Tax and shipping constants
export const TAX_RATE = 0.08; // 8% tax
export const SHIPPING_COST = 15; // $15 flat shipping
export const FREE_SHIPPING_THRESHOLD = 500; // Free shipping over $500

// Product categories
export const CATEGORIES = {
  DRESSES: 'dresses',
  SUITS: 'suits',
  BLOUSES: 'blouses',
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  dresses: 'Dresses',
  suits: 'Suits',
  blouses: 'Blouses',
};

// Size options
export const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;

// Sort options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
] as const;

// Navigation links
export const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop/dresses', label: 'Dresses' },
  { href: '/shop/suits', label: 'Suits' },
  { href: '/shop/blouses', label: 'Blouses' },
] as const;
