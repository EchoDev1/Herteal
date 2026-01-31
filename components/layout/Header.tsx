'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, X, Heart, User, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCartStore();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* Falling Stars Crown - Right Side */}
      <div className="absolute top-12 right-4 md:top-16 md:right-8 z-[60] w-32 h-24 md:w-40 md:h-32 pointer-events-none">
        {/* Crown formed by stars */}
        <div className="relative w-full h-full">
          {/* Falling stars that form crown shape */}
          {/* Star 1 - Left peak */}
          <div className="absolute top-0 left-0 animate-fall-star-1" style={{animationDelay: '0s'}}>
            <span className="text-[#7A916C] text-2xl md:text-3xl animate-sparkle">★</span>
          </div>
          {/* Star 2 - Left-center valley */}
          <div className="absolute top-0 left-0 animate-fall-star-2" style={{animationDelay: '0.2s'}}>
            <span className="text-[#7A916C] text-base md:text-lg animate-sparkle">★</span>
          </div>
          {/* Star 3 - Center peak (tallest) */}
          <div className="absolute top-0 left-0 animate-fall-star-3" style={{animationDelay: '0.4s'}}>
            <span className="text-[#7A916C] text-3xl md:text-4xl animate-sparkle">★</span>
          </div>
          {/* Star 4 - Right-center valley */}
          <div className="absolute top-0 left-0 animate-fall-star-4" style={{animationDelay: '0.6s'}}>
            <span className="text-[#7A916C] text-base md:text-lg animate-sparkle">★</span>
          </div>
          {/* Star 5 - Right peak */}
          <div className="absolute top-0 left-0 animate-fall-star-5" style={{animationDelay: '0.8s'}}>
            <span className="text-[#7A916C] text-2xl md:text-3xl animate-sparkle">★</span>
          </div>
          {/* Star 6 - Left base */}
          <div className="absolute top-0 left-0 animate-fall-star-6" style={{animationDelay: '1.0s'}}>
            <span className="text-[#7A916C] text-sm md:text-base animate-sparkle">★</span>
          </div>
          {/* Star 7 - Right base */}
          <div className="absolute top-0 left-0 animate-fall-star-7" style={{animationDelay: '1.2s'}}>
            <span className="text-[#7A916C] text-sm md:text-base animate-sparkle">★</span>
          </div>
          {/* Star 8 - Center base */}
          <div className="absolute top-0 left-0 animate-fall-star-8" style={{animationDelay: '1.4s'}}>
            <span className="text-[#7A916C] text-sm md:text-base animate-sparkle">★</span>
          </div>
        </div>
      </div>

      {/* Vintage Badge - Top Left Corner */}
      <div className="absolute top-16 left-4 md:top-20 md:left-8 z-[60] pointer-events-none">
        <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-pulse">
          {/* Outer circle with decorative border */}
          <div className="absolute inset-0 rounded-full border-3 md:border-4 border-[#7A916C] bg-white shadow-2xl transform rotate-0 transition-transform hover:rotate-12 duration-500">
            {/* Inner decorative circle */}
            <div className="absolute inset-1.5 md:inset-2 rounded-full border-2 border-dashed border-[#7A916C]/40"></div>

            {/* Badge content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-1.5 md:p-2">
              {/* Top ribbon text */}
              <div className="text-[7px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-[#7A916C] font-bold font-[family-name:var(--font-montserrat)] mb-0.5">
                Est. 2024
              </div>

              {/* Main brand name */}
              <div className="text-center mb-0.5">
                <div className="text-xs md:text-sm lg:text-base font-[family-name:var(--font-playfair)] font-extrabold leading-none">
                  <span className="text-white bg-[#7A916C] px-1 inline-block">HER</span>
                  <span className="text-[#7A916C]">TEALS</span>
                </div>
              </div>

              {/* Bottom ribbon text */}
              <div className="text-[6px] md:text-[7px] lg:text-[8px] uppercase tracking-wider text-[#2D2D2D] font-semibold font-[family-name:var(--font-montserrat)]">
                Luxury Fashion
              </div>

              {/* Decorative stars */}
              <div className="absolute top-0.5 md:top-1 left-1/2 -translate-x-1/2">
                <span className="text-[#7A916C] text-[10px] md:text-xs">★</span>
              </div>
              <div className="absolute bottom-0.5 md:bottom-1 left-1/2 -translate-x-1/2">
                <span className="text-[#7A916C] text-[10px] md:text-xs">★</span>
              </div>
            </div>
          </div>

          {/* Vintage ribbon accent */}
          <div className="absolute -bottom-1.5 md:-bottom-2 left-1/2 -translate-x-1/2 w-12 h-5 md:w-16 md:h-6 bg-[#7A916C] transform -skew-x-12 shadow-lg hidden sm:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-[7px] md:text-[8px] font-bold tracking-widest font-[family-name:var(--font-montserrat)]">PREMIUM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Bar - Soft Olive Green with Sparkle */}
      <div className="relative bg-[#7A916C] text-white overflow-hidden">
        {/* Sparkle Effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent animate-pulse delay-100"></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent animate-pulse delay-200"></div>
        </div>
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4 relative z-10">
          <p className="text-xs md:text-sm font-[family-name:var(--font-montserrat)] text-center text-white">
            Explore our Early 2026 Collection - Free Shipping on Orders Over ₦150,000
          </p>
          <Link
            href="/shop"
            className="text-xs md:text-sm font-semibold underline hover:no-underline transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Main Header - Menu and Icons */}
      <div className="border-b border-[#F0F0F0] relative z-[70]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16 md:h-20">
            {/* Left Icons - Menu, Search, and other icons */}
            <div className="flex items-center gap-4 md:gap-6 pointer-events-auto">
              {/* Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors pointer-events-auto cursor-pointer group"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                type="button"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-[#2D2D2D] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-[#2D2D2D] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-[#2D2D2D] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors pointer-events-auto cursor-pointer"
                aria-label="Search"
                type="button"
              >
                <Search className="w-5 h-5 text-[#2D2D2D]" />
              </button>

              {/* Wishlist (Desktop only) */}
              <Link
                href="/wishlist"
                className="hidden md:block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-[#2D2D2D]" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label={`Shopping bag with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#2D2D2D]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2C5530] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Account (Desktop only) */}
              <Link
                href="/account"
                className="hidden md:block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-[#2D2D2D]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logo - Centered */}
      <div className="md:hidden bg-white border-b border-[#F0F0F0]">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center justify-center text-2xl font-[family-name:var(--font-playfair)] font-extrabold transition-colors no-underline"
          >
            <span className="text-white bg-[#7A916C] px-1.5 inline-block">HER</span>
            <span className="text-[#7A916C]">TEALS</span>
          </Link>
        </div>
      </div>

      {/* Logo and Tagline - Centered (Desktop) */}
      <div className="hidden md:block bg-white border-b border-[#F0F0F0]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* Logo - Bolder and Centered */}
            <Link
              href="/"
              className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-extrabold transition-colors no-underline"
            >
              <span className="text-white bg-[#7A916C] px-1.5 inline-block">HER</span>
              <span className="text-[#7A916C]">TEALS</span>
            </Link>

            {/* Tagline */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-[#7A916C]/40"></div>
              <p className="text-xs uppercase tracking-[0.4em] font-[family-name:var(--font-montserrat)] font-light text-[#2D2D2D]/70 italic">
                Tailoring Meets Intellects
              </p>
              <div className="h-px w-12 bg-[#7A916C]/40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu Bar - Desktop Only */}
      <div className="hidden md:block border-b border-[#F0F0F0] bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-8 py-4">
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-widest text-[#2D2D2D] hover:text-[#7A916C] transition-colors font-[family-name:var(--font-montserrat)]"
            >
              Shop All
            </Link>
            <Link
              href="/shop?filter=new-in"
              className="text-xs font-semibold uppercase tracking-widest text-[#2D2D2D] hover:text-[#7A916C] transition-colors font-[family-name:var(--font-montserrat)]"
            >
              New In
            </Link>
            <Link
              href="/shop/dresses"
              className="text-xs font-semibold uppercase tracking-widest text-[#2D2D2D] hover:text-[#7A916C] transition-colors font-[family-name:var(--font-montserrat)]"
            >
              Dresses
            </Link>
            <Link
              href="/shop/suits"
              className="text-xs font-semibold uppercase tracking-widest text-[#2D2D2D] hover:text-[#7A916C] transition-colors font-[family-name:var(--font-montserrat)]"
            >
              Suits
            </Link>
            <Link
              href="/shop/blouses"
              className="text-xs font-semibold uppercase tracking-widest text-[#2D2D2D] hover:text-[#7A916C] transition-colors font-[family-name:var(--font-montserrat)]"
            >
              Blouses
            </Link>
            <Link
              href="/shop?filter=sale"
              className="text-xs font-semibold uppercase tracking-widest text-[#8B0000] hover:text-[#6B0000] transition-colors font-[family-name:var(--font-montserrat)]"
            >
              ON-SALE
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/account"
                  className="text-xs font-semibold uppercase tracking-widest text-[#2D2D2D] hover:text-[#7A916C] transition-colors font-[family-name:var(--font-montserrat)]"
                >
                  {profile?.full_name || 'Account'}
                </Link>
                <button
                  onClick={signOut}
                  className="text-xs font-semibold uppercase tracking-widest text-white bg-[#8B0000] hover:bg-[#6B0000] px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-montserrat)] flex items-center gap-2"
                >
                  <LogOut className="w-3 h-3" />
                  SIGN OUT
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="text-xs font-semibold uppercase tracking-widest text-white bg-[#7A916C] hover:bg-[#6B8159] px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-montserrat)]"
              >
                SIGN-IN
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Search Bar (Slide down when open) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen ? 'max-h-24' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 border-b border-[#F0F0F0]">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <label htmlFor="header-search" className="sr-only">Search for products</label>
            <input
              id="header-search"
              type="search"
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-3 border border-[#F0F0F0] rounded-lg focus:outline-none focus:border-[#2C5530] transition-colors"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D2D2D]"
              aria-label="Close search"
              type="button"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
        role="presentation"
      >
        <div
          className={`fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#7A916C] shadow-2xl transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white">
            <span className="text-lg font-[family-name:var(--font-playfair)] font-bold">
              <span className="text-white bg-[#7A916C] px-1.5 inline-block">HER</span>
              <span className="text-[#7A916C]">TEALS</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Close menu"
              type="button"
            >
              <X className="w-5 h-5 text-[#2D2D2D]" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-1.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }} aria-label="Mobile navigation">
            {/* Category Links */}
            <Link
              href="/shop?category=traditional"
              className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Traditional
            </Link>
            <Link
              href="/shop?category=modern"
              className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Modern
            </Link>
            <Link
              href="/shop?category=accessories"
              className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accessories
            </Link>

            {/* Divider */}
            <div className="pt-3 mt-3 border-t border-white/20 space-y-1.5">
              {user && (
                <div className="px-4 py-2.5 mb-2">
                  <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Signed in as</p>
                  <p className="text-sm font-medium text-white">{profile?.full_name || user.email}</p>
                </div>
              )}
              <Link
                href="/wishlist"
                className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href="/account"
                className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Account
              </Link>

              {/* Complaints Section */}
              <Link
                href="/complaints"
                className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Customer Care & Complaints
              </Link>

              {/* Auth Actions */}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-white bg-[#8B0000] hover:bg-[#6B0000] rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="block px-4 py-2.5 text-sm font-medium text-white bg-[#7A916C] hover:bg-[#6B8159] rounded-lg transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
