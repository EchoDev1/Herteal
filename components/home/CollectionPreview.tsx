'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';
import { useCollections } from '@/contexts/CollectionsContext';

export default function CollectionPreview() {
  const { collections, isLoaded } = useCollections();

  // Get featured collections sorted by order
  const featuredCollections = collections
    .filter(c => c.featured)
    .sort((a, b) => a.order - b.order);

  if (!isLoaded) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A916C]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredCollections.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">
            Shop By Category
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            From boardroom to evening events, discover pieces that celebrate sophistication
          </p>
        </div>

        {/* Alternating Image-Text Blocks */}
        <div className="space-y-16 md:space-y-24">
          {featuredCollections.map((collection, index) => (
            <div
              key={collection.id}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`relative h-[500px] md:h-[600px] ${
                  index % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                {collection.image ? (
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
                  Collection
                </span>
                <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D]">
                  {collection.name}
                </h3>
                <p className="text-lg text-[#6B6B6B] leading-relaxed">
                  {collection.description}
                </p>
                <div className="pt-4">
                  <Button href={`/shop/${collection.slug}`} variant="primary" size="lg">
                    Shop {collection.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
