'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '@/types/order';
import { formatPrice, formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Retrieve order from localStorage
    const orderData = localStorage.getItem('lastOrder');
    if (orderData) {
      const parsedOrder = JSON.parse(orderData);
      // Convert date string back to Date object
      parsedOrder.orderDate = new Date(parsedOrder.orderDate);
      setOrder(parsedOrder);
    }
  }, []);

  if (!order) {
    return (
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">No Order Found</h1>
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#7A916C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#7A916C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">
              Order Confirmed!
            </h1>
            <p className="text-[#6B6B6B] text-lg font-[family-name:var(--font-montserrat)]">
              Thank you for your purchase. We've sent a confirmation email to{' '}
              {order.shippingAddress.fullName}.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-[#F9F9F9] border border-[#F0F0F0] p-8 space-y-6">
            <div className="flex justify-between items-start border-b border-[#F0F0F0] pb-6">
              <div>
                <p className="text-sm text-[#6B6B6B] mb-1 font-[family-name:var(--font-montserrat)]">Order Number</p>
                <p className="text-lg font-medium text-[#2D2D2D] font-[family-name:var(--font-montserrat)]">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#6B6B6B] mb-1 font-[family-name:var(--font-montserrat)]">Order Date</p>
                <p className="text-lg font-medium text-[#2D2D2D] font-[family-name:var(--font-montserrat)]">
                  {formatDate(order.orderDate)}
                </p>
              </div>
            </div>

            {/* Items */}
            <div>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm py-2 border-b border-[#F0F0F0] last:border-0"
                  >
                    <div>
                      <p className="font-medium text-[#2D2D2D] font-[family-name:var(--font-montserrat)]">
                        {item.product.name}
                      </p>
                      <p className="text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
                        Size: {item.selectedSize} | Color: {item.selectedColor}{' '}
                        | Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="font-medium text-[#2D2D2D] font-[family-name:var(--font-montserrat)]">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">Shipping Address</h2>
              <div className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-[#F0F0F0]">
              <div className="flex justify-between items-center text-2xl font-medium text-[#2D2D2D] font-[family-name:var(--font-montserrat)]">
                <span>Total Paid</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
