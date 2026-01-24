'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Collection interface
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  video?: string;
  productCount: number;
  featured: boolean;
  order: number;
}

interface CollectionsContextType {
  collections: Collection[];
  isLoaded: boolean;
  addCollection: (collection: Omit<Collection, 'id' | 'productCount'>) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  getCollectionBySlug: (slug: string) => Collection | undefined;
  getFeaturedCollections: () => Collection[];
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

// Default collections to start with
const defaultCollections: Collection[] = [
  {
    id: '1',
    name: 'Dresses',
    slug: 'dresses',
    description: 'From cocktail to evening wear, discover elegant silhouettes that celebrate your sophistication.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1200&fit=crop&q=80',
    productCount: 0,
    featured: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Suits',
    slug: 'suits',
    description: 'Power dressing redefined. Tailored pieces that command attention in the boardroom and beyond.',
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=1200&fit=crop&q=80',
    productCount: 0,
    featured: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Blouses',
    slug: 'blouses',
    description: 'Refined essentials crafted with meticulous attention to detail and timeless style.',
    image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=1200&fit=crop&q=80',
    productCount: 0,
    featured: true,
    order: 3,
  },
];

const STORAGE_KEY = 'herteals_collections';

export function CollectionsProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>(defaultCollections);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load collections from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Merge with default collections, prioritizing stored ones
          const storedIds = new Set(parsed.map((c: Collection) => c.id));
          const mergedCollections = [
            ...parsed,
            ...defaultCollections.filter(dc => !storedIds.has(dc.id))
          ];
          setCollections(mergedCollections);
        } catch (e) {
          console.error('Failed to parse stored collections', e);
          setCollections(defaultCollections);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever collections change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    }
  }, [collections, isLoaded]);

  const addCollection = (collectionData: Omit<Collection, 'id' | 'productCount'>) => {
    const newCollection: Collection = {
      ...collectionData,
      id: `col_${Date.now()}`,
      productCount: 0,
    };
    setCollections(prev => [...prev, newCollection]);
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  const getCollectionBySlug = (slug: string): Collection | undefined => {
    return collections.find(c => c.slug.toLowerCase() === slug.toLowerCase());
  };

  const getFeaturedCollections = (): Collection[] => {
    return collections
      .filter(c => c.featured)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        isLoaded,
        addCollection,
        updateCollection,
        deleteCollection,
        getCollectionBySlug,
        getFeaturedCollections,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionsContext);
  if (context === undefined) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
}
