'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { generateId } from '@/lib/utils';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import Button from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();

  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formValues.fullName.trim())
      newErrors.fullName = 'Full name is required';
    if (!formValues.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email))
      newErrors.email = 'Invalid email format';
    if (!formValues.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formValues.addressLine1.trim())
      newErrors.addressLine1 = 'Address is required';
    if (!formValues.city.trim()) newErrors.city = 'City is required';
    if (!formValues.state.trim()) newErrors.state = 'State is required';
    if (!formValues.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      // Create order
      const order = {
        id: generateId('order'),
        items: items,
        shippingAddress: {
          fullName: formValues.fullName,
          addressLine1: formValues.addressLine1,
          addressLine2: formValues.addressLine2,
          city: formValues.city,
          state: formValues.state,
          zipCode: formValues.zipCode,
          country: 'United States',
          phone: formValues.phone,
        },
        total: total,
        orderDate: new Date(),
        status: 'confirmed' as const,
      };

      // Store order in localStorage
      localStorage.setItem('lastOrder', JSON.stringify(order));

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push('/checkout/success');
    }, 1500);
  };

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A916C]"></div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-12">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              <ShippingForm
                values={formValues}
                errors={errors}
                onChange={handleChange}
              />
              <PaymentForm />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <OrderSummary />
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-full mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
