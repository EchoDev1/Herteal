'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Product interface for the store
export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  category: string;
  collection?: string;
  stock: number;
  images: string[];
  video?: string;
  description?: string;
  featured?: boolean;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface ProductsContextType {
  products: StoreProduct[];
  addProduct: (product: Omit<StoreProduct, 'id' | 'slug' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<StoreProduct>) => void;
  deleteProduct: (id: string) => void;
  getProductsByCategory: (category: string) => StoreProduct[];
  getProductsByCollection: (collection: string) => StoreProduct[];
  getFeaturedProducts: () => StoreProduct[];
  getLatestProducts: (limit?: number) => StoreProduct[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Demo products to start with
const demoProducts: StoreProduct[] = [
  {
    id: 'demo_001',
    name: 'Elegant Evening Dress',
    slug: 'elegant-evening-dress',
    price: 45000,
    category: 'Dresses',
    collection: 'Ready To Wear Collection',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80'],
    description: 'A stunning evening dress perfect for special occasions',
    featured: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_002',
    name: 'Traditional Ankara Set',
    slug: 'traditional-ankara-set',
    price: 35000,
    category: 'Traditional',
    collection: 'The Art Of Herteals',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=600&q=80'],
    description: 'Beautiful traditional Ankara design',
    featured: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_003',
    name: 'Modern Blazer',
    slug: 'modern-blazer',
    price: 55000,
    category: 'Modern',
    collection: 'Ready To Wear Collection',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80'],
    description: 'Contemporary blazer for the modern woman',
    featured: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_004',
    name: 'Classic Suit',
    slug: 'classic-suit',
    price: 65000,
    category: 'Suits',
    collection: 'Ready To Wear Collection',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80'],
    description: 'Timeless suit for professional settings',
    featured: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_005',
    name: 'Silk Blouse',
    slug: 'silk-blouse',
    price: 28000,
    category: 'Blouses',
    collection: 'The Art Of Herteals',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80'],
    description: 'Luxurious silk blouse for elegant occasions',
    featured: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_006',
    name: 'Refined Details Dress',
    slug: 'refined-details-dress',
    price: 52000,
    category: 'Dresses',
    collection: 'The Art Of Herteals',
    stock: 18,
    images: ['https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80'],
    description: 'Intricate craftsmanship in every stitch',
    featured: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEY = 'herteals_products';

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<StoreProduct[]>(demoProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Merge with demo products, prioritizing stored ones
          const storedIds = new Set(parsed.map((p: StoreProduct) => p.id));
          const mergedProducts = [
            ...parsed,
            ...demoProducts.filter(dp => !storedIds.has(dp.id))
          ];
          setProducts(mergedProducts);
        } catch (e) {
          console.error('Failed to parse stored products', e);
          setProducts(demoProducts);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const addProduct = (productData: Omit<StoreProduct, 'id' | 'slug' | 'createdAt'>) => {
    const newProduct: StoreProduct = {
      ...productData,
      id: `prod_${Date.now()}`,
      slug: generateSlug(productData.name),
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<StoreProduct>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductsByCategory = (category: string): StoreProduct[] => {
    return products.filter(
      p => p.category.toLowerCase() === category.toLowerCase() && p.status === 'active'
    );
  };

  const getProductsByCollection = (collection: string): StoreProduct[] => {
    return products.filter(
      p => p.collection?.toLowerCase() === collection.toLowerCase() && p.status === 'active'
    );
  };

  const getFeaturedProducts = (): StoreProduct[] => {
    return products.filter(p => p.featured && p.status === 'active');
  };

  const getLatestProducts = (limit: number = 10): StoreProduct[] => {
    return [...products]
      .filter(p => p.status === 'active')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory,
        getProductsByCollection,
        getFeaturedProducts,
        getLatestProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
