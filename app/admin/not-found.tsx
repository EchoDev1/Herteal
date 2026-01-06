'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C5530] via-[#3A6D40] to-[#2C5530] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white/20 font-[family-name:var(--font-playfair)]">
            404
          </h1>
          <div className="relative -mt-20">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50">
          <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530] mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The admin page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7A916C] text-white font-medium rounded-lg hover:bg-[#6B8159] transition-colors shadow-lg"
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#2C5530] font-medium rounded-lg hover:bg-gray-100 transition-colors border-2 border-[#7A916C]"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Quick Links:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/admin/products"
                className="text-sm text-[#7A916C] hover:text-[#6B8159] font-medium hover:underline"
              >
                Products
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/admin/orders"
                className="text-sm text-[#7A916C] hover:text-[#6B8159] font-medium hover:underline"
              >
                Orders
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/admin/users"
                className="text-sm text-[#7A916C] hover:text-[#6B8159] font-medium hover:underline"
              >
                Users
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/admin/settings"
                className="text-sm text-[#7A916C] hover:text-[#6B8159] font-medium hover:underline"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}
