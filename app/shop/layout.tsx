import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Herteal',
  description: 'Browse our complete collection of luxury tailored clothing for women. Featuring elegant dresses, sophisticated suits, and refined blouses.',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
