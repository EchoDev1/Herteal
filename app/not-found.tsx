import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center py-16">
          <h1 className="text-6xl md:text-7xl font-light mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Page Not Found
          </h2>
          <p className="text-soft-gray text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="secondary" size="lg">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
