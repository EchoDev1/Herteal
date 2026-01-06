'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  CreditCard,
  FileText,
  TrendingUp,
  LogOut,
  Plus,
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  // Dashboard statistics - These will be dynamically populated when connected to the database
  // Currently showing 0 until the platform starts functioning
  const stats = [
    { label: 'Total Products', value: '0', icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: '0', icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Total Users', value: '0', icon: Users, color: 'bg-purple-500' },
    { label: 'Revenue', value: '₦0', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const quickActions = [
    { title: 'Products', description: 'Manage products, add, edit, delete', href: '/admin/products', icon: Package, color: 'bg-[#7A916C]' },
    { title: 'Orders', description: 'View and manage customer orders', href: '/admin/orders', icon: ShoppingCart, color: 'bg-blue-600' },
    { title: 'Users', description: 'Manage customer accounts', href: '/admin/users', icon: Users, color: 'bg-purple-600' },
    { title: 'Payments', description: 'Payment settings & transactions', href: '/admin/payments', icon: CreditCard, color: 'bg-green-600' },
    { title: 'Reports', description: 'View analytics and reports', href: '/admin/reports', icon: FileText, color: 'bg-orange-600' },
    { title: 'Settings', description: 'Configure store settings', href: '/admin/settings', icon: Settings, color: 'bg-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#7A916C]/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-[#7A916C]" />
              <h1 className="text-xl font-[family-name:var(--font-playfair)] font-bold">
                <span className="text-white bg-[#7A916C] px-1.5 inline-block">HER</span>
                <span className="text-[#7A916C]">TEALS</span>
                <span className="text-sm text-[#6B6B6B] ml-2">Admin</span>
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-2">
              Welcome to Admin Portal
            </h2>
            <p className="text-[#6B6B6B]">Complete access to manage your e-commerce platform</p>
          </div>
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Quick Add Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-[#7A916C]/20 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-[#2D2D2D] mb-1">{stat.value}</div>
              <div className="text-sm text-[#6B6B6B]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">Statistics Dashboard</h3>
              <p className="text-sm text-blue-700">
                The statistics above will automatically update in real-time once your platform is connected to a database and starts processing orders, managing products, and serving customers.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#2D2D2D] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-white rounded-lg p-6 border border-[#7A916C]/20 hover:border-[#7A916C] shadow-md hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-[#2D2D2D] mb-2">{action.title}</h4>
                <p className="text-sm text-[#6B6B6B]">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 border border-[#7A916C]/20 shadow-md">
          <h3 className="text-xl font-semibold text-[#2D2D2D] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-[#FAF7F0] rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D2D2D]">New order #1234 received</p>
                <p className="text-xs text-[#6B6B6B]">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-[#FAF7F0] rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D2D2D]">New user registered</p>
                <p className="text-xs text-[#6B6B6B]">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-[#FAF7F0] rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2D2D2D]">Product "Luxury Dress" updated</p>
                <p className="text-xs text-[#6B6B6B]">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
