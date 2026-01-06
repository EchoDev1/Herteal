import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Herteal',
  description: 'Complete your purchase securely.',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
