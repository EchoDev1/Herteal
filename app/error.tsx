'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-[family-name:var(--font-playfair)] font-light text-[#2D2D2D] mb-4">
          Oops!
        </h1>
        <h2 className="text-2xl font-[family-name:var(--font-montserrat)] text-[#2D2D2D] mb-4">
          Something went wrong
        </h2>
        <p className="text-[#6B6B6B] mb-8">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Button href="/" variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
