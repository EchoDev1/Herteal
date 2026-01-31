import { use } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { products } from '@/data/products';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductGrid from '@/components/product/ProductGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Herteals`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

function ProductJsonLd({ product }: { product: typeof products[0] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.salePrice || product.price,
      priceCurrency: 'NGN',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    brand: {
      '@type': 'Brand',
      name: 'Herteals',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} />
      <div className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
            <ProductGallery images={product.images} productName={product.name} video={product.video} />
            <ProductInfo product={product} />
          </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-light-gray pt-16">
            <h2 className="text-3xl font-light mb-8 text-center">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
        </div>
      </div>
    </>
  );
}
