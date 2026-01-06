export interface Size {
  label: string;
  inStock: boolean;
}

export interface Color {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'dresses' | 'suits' | 'blouses';
  price: number;
  salePrice?: number;
  onSale?: boolean;
  description: string;
  longDescription: string;
  images: string[];
  sizes: Size[];
  colors: Color[];
  fabric: string;
  careInstructions: string;
  featured: boolean;
  inStock: boolean;
}
