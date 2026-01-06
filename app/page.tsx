import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import EditorialSection from '@/components/home/EditorialSection';
import TrustBadges from '@/components/home/TrustBadges';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import CollectionPreview from '@/components/home/CollectionPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <EditorialSection />
      <TrustBadges />
      <CollectionPreview />
      <Testimonials />
      <Newsletter />
    </>
  );
}
