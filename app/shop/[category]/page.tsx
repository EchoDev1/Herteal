'use client';

import { useState, useMemo } from 'react';
import { use } from 'react';
import { products } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilter from '@/components/product/CategoryFilter';
import { CATEGORY_LABELS } from '@/lib/constants';

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const [sortBy, setSortBy] = useState('featured');

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === category);
  }, [category]);

  const sortedProducts = useMemo(() => {
    const sorted = [...categoryProducts];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'featured':
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [categoryProducts, sortBy]);

  const categoryLabel =
    CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category;

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">
            {categoryLabel}
          </h1>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto font-[family-name:var(--font-montserrat)]">
            {category === 'dresses' &&
              'Elegant silhouettes for every occasion'}
            {category === 'suits' && 'Power dressing redefined'}
            {category === 'blouses' &&
              'Refined essentials for the modern wardrobe'}
          </p>
        </div>

        {/* Filters */}
        <CategoryFilter sortBy={sortBy} onSortChange={setSortBy} />

        {/* Products Grid */}
        <ProductGrid products={sortedProducts} />
      </div>
    </div>
  );
}
