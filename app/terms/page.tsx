'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7A916C] hover:text-[#6B8159] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-[#7A916C]/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-2">
              <span className="text-white bg-[#7A916C] px-2">Terms &</span>{' '}
              <span className="text-[#7A916C]">Conditions</span>
            </h1>
            <p className="text-sm text-[#6B6B6B] mt-4">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none space-y-6 text-[#2D2D2D]">
            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                By accessing and using Herteals' website and services, you agree to be bound by these Terms and Conditions.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                2. Use of Services
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-3">
                You agree to use our services only for lawful purposes and in accordance with these terms. You must not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6B6B] ml-4">
                <li>Use our services in any way that violates applicable laws or regulations</li>
                <li>Engage in any fraudulent activity or impersonate others</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to any part of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                3. Account Responsibilities
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                When you create an account with us, you are responsible for maintaining the confidentiality of your account
                and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                4. Products and Pricing
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-3">
                All product descriptions, images, and prices are subject to change without notice. We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6B6B] ml-4">
                <li>Modify or discontinue products at any time</li>
                <li>Correct pricing errors on our website</li>
                <li>Limit quantities of products available for purchase</li>
                <li>Refuse or cancel any orders at our discretion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                5. Payment and Billing
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Payment must be received before your order is processed. We accept various payment methods as indicated
                on our website. All prices are in Nigerian Naira (₦) unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                6. Shipping and Delivery
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                We aim to deliver your orders within the estimated timeframe. However, delivery times are not guaranteed
                and may be affected by factors beyond our control. We are not responsible for delays caused by shipping carriers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                7. Returns and Refunds
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                We accept returns within 14 days of delivery for eligible items in their original condition. Refunds will
                be processed within 7-10 business days after we receive and inspect the returned item. Custom or personalized
                items are not eligible for return.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                8. Intellectual Property
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                All content on this website, including text, images, logos, and designs, is the property of Herteals and
                is protected by copyright and trademark laws. You may not use, reproduce, or distribute any content without
                our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Herteals shall not be liable for any indirect, incidental, special, or consequential damages arising from
                your use of our services. Our total liability shall not exceed the amount paid by you for the product or service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                10. Privacy Policy
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
                protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately
                upon posting. Your continued use of our services after changes are posted constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                12. Contact Information
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-[#FAF7F0] rounded-lg border border-[#7A916C]/20">
                <p className="text-[#2D2D2D] font-medium">Herteals Customer Service</p>
                <p className="text-[#6B6B6B]">Email: support@herteals.com</p>
                <p className="text-[#6B6B6B]">Phone: +234 800 123 4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
