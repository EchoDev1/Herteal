'use client';

export default function TrustBadges() {
  const features = [
    {
      title: 'Premium Quality',
      description: 'Handcrafted with premium fabrics',
    },
    {
      title: 'Secure Payments',
      description: 'Shop with confidence',
    },
    {
      title: 'Nigeria-Wide Delivery',
      description: 'Fast shipping across Nigeria',
    },
    {
      title: 'Expert Tailoring',
      description: 'Precision craftsmanship',
    },
  ];

  const paymentMethods = ['Paystack', 'Flutterwave', 'Bank Transfer', 'Cards'];

  return (
    <section className="py-12 md:py-16 bg-white border-t border-[#F0F0F0]">
      <div className="container mx-auto px-4">
        {/* Features - Minimal Text Only */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-[#6B6B6B]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Methods - Minimal */}
        <div className="text-center border-t border-[#F0F0F0] pt-8">
          <p className="text-xs uppercase tracking-widest text-[#6B6B6B] mb-4">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {paymentMethods.map((method, index) => (
              <span
                key={index}
                className="text-xs font-medium text-[#2D2D2D] tracking-wide"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
