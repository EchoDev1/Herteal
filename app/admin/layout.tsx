'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Layers,
  Home,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading, signOut, isAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!loading) {
      if (!user && pathname !== '/admin') {
        router.push('/admin');
      } else if (user && !isAdmin && pathname !== '/admin') {
        // User is logged in but not admin
        router.push('/admin');
      }
    }
  }, [user, isAdmin, loading, pathname, router]);

  useEffect(() => {
    // Set initial sidebar state based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  // Don't show sidebar on login page
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7A916C] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7A916C] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/collections', label: 'Collections', icon: Layers },
    { href: '/admin/homepage', label: 'Homepage Sections', icon: Home },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
    { href: '/admin/users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#2C5530] text-white transition-all duration-300 flex-shrink-0 flex flex-col h-screen fixed md:relative z-50 ${!isSidebarOpen && '-translate-x-full md:translate-x-0'}`}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {isSidebarOpen ? (
            <>
              <h1 className="text-xl font-[family-name:var(--font-playfair)] font-bold">
                Herteals Admin
              </h1>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden md:block p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:block p-2 hover:bg-white/10 rounded-lg transition-colors mx-auto"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`flex items-center ${isSidebarOpen ? 'gap-3 justify-start' : 'justify-center'} p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white text-[#2C5530]'
                    : 'hover:bg-white/10 text-white'
                }`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center ${isSidebarOpen ? 'gap-3 justify-start' : 'justify-center'} p-3 rounded-lg hover:bg-white/10 transition-colors w-full`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 min-h-screen overflow-x-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-[#2C5530]" />
              </button>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
                {navItems.find(item => pathname === item.href || pathname.startsWith(item.href + '/'))?.label || 'Admin Panel'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 text-sm font-medium text-[#2C5530] hover:bg-gray-100 rounded-lg transition-colors"
              >
                View Store
              </Link>
              <div className="w-10 h-10 rounded-full bg-[#7A916C] flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
