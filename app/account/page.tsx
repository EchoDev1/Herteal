'use client';

import Link from 'next/link';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-2">
              My Account
            </h1>
            <p className="text-gray-600 font-[family-name:var(--font-montserrat)]">
              Manage your account and orders
            </p>
          </div>

          {/* Account Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile */}
            <Link
              href="/account/profile"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#7A916C]/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#7A916C]" />
                </div>
                <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-[#2D2D2D]">
                  Profile
                </h2>
              </div>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-montserrat)]">
                View and edit your personal information
              </p>
            </Link>

            {/* Orders */}
            <Link
              href="/account/orders"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#7A916C]/10 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#7A916C]" />
                </div>
                <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-[#2D2D2D]">
                  Orders
                </h2>
              </div>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-montserrat)]">
                Track and manage your orders
              </p>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#7A916C]/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#7A916C]" />
                </div>
                <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-[#2D2D2D]">
                  Wishlist
                </h2>
              </div>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-montserrat)]">
                View your saved items
              </p>
            </Link>

            {/* Settings */}
            <Link
              href="/account/settings"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#7A916C]/10 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-[#7A916C]" />
                </div>
                <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-[#2D2D2D]">
                  Settings
                </h2>
              </div>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-montserrat)]">
                Manage your preferences
              </p>
            </Link>

            {/* Sign Out */}
            <button
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-[#2D2D2D]">
                  Sign Out
                </h2>
              </div>
              <p className="text-sm text-gray-600 font-[family-name:var(--font-montserrat)]">
                Sign out of your account
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
