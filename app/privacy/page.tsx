'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <div className="w-16 h-16 bg-[#7A916C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#7A916C]" />
            </div>
            <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-2">
              <span className="text-white bg-[#7A916C] px-2">Privacy</span>{' '}
              <span className="text-[#7A916C]">Policy</span>
            </h1>
            <p className="text-sm text-[#6B6B6B] mt-4">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none space-y-6 text-[#2D2D2D]">
            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                1. Introduction
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Welcome to Herteals. We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we collect, use, store, and protect your information when you use
                our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                2. Information We Collect
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-3">
                We collect various types of information to provide and improve our services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6B6B] ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address</li>
                <li><strong>Payment Information:</strong> Credit card details, bank account information (processed securely through payment providers)</li>
                <li><strong>Account Information:</strong> Username, password, purchase history, preferences</li>
                <li><strong>Technical Information:</strong> IP address, browser type, device information, cookies</li>
                <li><strong>Usage Data:</strong> Pages visited, products viewed, time spent on site, search queries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-3">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6B6B] ml-4">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Detect and prevent fraud and security issues</li>
                <li>Comply with legal obligations</li>
                <li>Analyze usage patterns and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                4. How We Share Your Information
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6B6B] ml-4">
                <li><strong>Service Providers:</strong> Payment processors, shipping companies, email service providers</li>
                <li><strong>Business Partners:</strong> With your consent, for marketing purposes</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="text-[#6B6B6B] leading-relaxed mt-3">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                5. Data Security
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against
                unauthorized access, loss, destruction, or alteration. This includes encryption, secure servers,
                and regular security audits. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-3">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6B6B] ml-4">
                <li>Remember your preferences and settings</li>
                <li>Keep you signed in to your account</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Personalize content and advertisements</li>
                <li>Improve website functionality</li>
              </ul>
              <p className="text-[#6B6B6B] leading-relaxed mt-3">
                You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                7. Your Rights
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-3">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6B6B] ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                8. Data Retention
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this
                privacy policy, comply with legal obligations, resolve disputes, and enforce our agreements. When
                data is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Our services are not intended for children under 18 years of age. We do not knowingly collect
                personal information from children. If you believe we have collected information from a child,
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                Your information may be transferred to and processed in countries other than Nigeria. We ensure
                appropriate safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of significant changes by
                posting the new policy on our website and updating the "Last updated" date. Your continued use of
                our services after changes are posted constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#7A916C] mb-4">
                12. Contact Us
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                If you have any questions or concerns about this privacy policy or our data practices, please contact us:
              </p>
              <div className="p-4 bg-[#FAF7F0] rounded-lg border border-[#7A916C]/20">
                <p className="text-[#2D2D2D] font-medium">Herteals Privacy Team</p>
                <p className="text-[#6B6B6B]">Email: privacy@herteals.com</p>
                <p className="text-[#6B6B6B]">Phone: +234 800 123 4567</p>
                <p className="text-[#6B6B6B]">Address: Lagos, Nigeria</p>
              </div>
            </section>

            <section className="mt-8 p-4 bg-[#7A916C]/10 rounded-lg border border-[#7A916C]/20">
              <p className="text-sm text-[#2D2D2D]">
                <strong>Your Privacy Matters:</strong> At Herteals, we are committed to protecting your privacy
                and ensuring transparency in how we handle your personal information. We encourage you to read
                this policy carefully and contact us with any questions.
              </p>
            </section>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 flex justify-center gap-4 text-sm">
          <Link href="/terms" className="text-[#7A916C] hover:text-[#6B8159] font-medium transition-colors">
            Terms & Conditions
          </Link>
          <span className="text-[#6B6B6B]">•</span>
          <Link href="/complaints" className="text-[#7A916C] hover:text-[#6B8159] font-medium transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
