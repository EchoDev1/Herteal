import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart - Herteal',
  description: 'Review your selected items and proceed to checkout.',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
