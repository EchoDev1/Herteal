'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilter from '@/components/product/CategoryFilter';

function ShopContent() {
  const [sortBy, setSortBy] = useState('featured');
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by sale if filter=sale
    if (filter === 'sale') {
      filtered = filtered.filter(product => product.onSale);
    } else if (filter === 'new-in') {
      filtered = filtered.filter(product => product.featured);
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        return filtered.sort((a, b) => {
          const priceA = a.onSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.onSale && b.salePrice ? b.salePrice : b.price;
          return priceA - priceB;
        });
      case 'price-desc':
        return filtered.sort((a, b) => {
          const priceA = a.onSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.onSale && b.salePrice ? b.salePrice : b.price;
          return priceB - priceA;
        });
      case 'name-asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'featured':
      default:
        return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [sortBy, filter]);

  const pageTitle = filter === 'sale' ? 'ON-SALE Items' : filter === 'new-in' ? 'New Arrivals' : 'All Products';
  const pageDescription = filter === 'sale'
    ? 'Discover amazing deals on luxury tailored clothing'
    : filter === 'new-in'
    ? 'Explore our latest collection of luxury pieces'
    : 'Explore our complete collection of luxury tailored clothing';

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">
            {pageTitle}
          </h1>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto font-[family-name:var(--font-montserrat)]">
            {pageDescription}
          </p>
        </div>

        {/* Filters */}
        <CategoryFilter sortBy={sortBy} onSortChange={setSortBy} />

        {/* Products Grid */}
        <ProductGrid products={filteredAndSortedProducts} />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
