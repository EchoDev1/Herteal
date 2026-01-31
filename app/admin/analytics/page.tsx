'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users, Download, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

// This page would normally pull data from Orders context
// For now, generating sample data for demonstration

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days' | 'year'>('30days');

  // Generate sample revenue data
  const revenueData = useMemo(() => {
    const days = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : dateRange === '90days' ? 90 : 365;
    return Array.from({ length: Math.min(days, 30) }, (_, i) => ({
      date: format(subDays(new Date(), days - i - 1), 'MMM d'),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 20) + 5,
    }));
  }, [dateRange]);

  const categoryData = [
    { name: 'Dresses', value: 45000, count: 23 },
    { name: 'Suits', value: 32000, count: 16 },
    { name: 'Blouses', value: 18000, count: 12 },
    { name: 'Traditional', value: 28000, count: 14 },
    { name: 'Accessories', value: 12000, count: 8 },
  ];

  const topProducts = [
    { name: 'Elegant Evening Dress', sales: 45, revenue: 180000 },
    { name: 'Business Suit Set', sales: 32, revenue: 160000 },
    { name: 'Traditional Ankara Dress', sales: 28, revenue: 112000 },
    { name: 'Silk Blouse', sales: 24, revenue: 96000 },
    { name: 'Designer Handbag', sales: 18, revenue: 90000 },
  ];

  const topCustomers = [
    { name: 'Sarah Johnson', orders: 12, spent: 540000 },
    { name: 'Amara Okafor', orders: 8, spent: 360000 },
    { name: 'Chioma Eze', orders: 5, spent: 225000 },
    { name: 'Blessing Adeyemi', orders: 4, spent: 180000 },
  ];

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = revenueData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const conversionRate = 3.2;

  const COLORS = ['#7A916C', '#2C5530', '#6B8159', '#3A6D40', '#A8C69F'];

  const exportData = () => {
    const csvData = [
      ['Date', 'Revenue', 'Orders'],
      ...revenueData.map(d => [d.date, d.revenue, d.orders]),
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Analytics & Reports
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Track sales performance and customer insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100 text-sm">Total Revenue</p>
            <DollarSign className="w-6 h-6 text-green-100" />
          </div>
          <p className="text-3xl font-bold">₦{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-green-100 mt-2">+12.5% from last period</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm">Total Orders</p>
            <ShoppingCart className="w-6 h-6 text-blue-100" />
          </div>
          <p className="text-3xl font-bold">{totalOrders}</p>
          <p className="text-xs text-blue-100 mt-2">+8.3% from last period</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm">Avg Order Value</p>
            <TrendingUp className="w-6 h-6 text-purple-100" />
          </div>
          <p className="text-3xl font-bold">₦{avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-purple-100 mt-2">+4.2% from last period</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-orange-100 text-sm">Conversion Rate</p>
            <Users className="w-6 h-6 text-orange-100" />
          </div>
          <p className="text-3xl font-bold">{conversionRate}%</p>
          <p className="text-xs text-orange-100 mt-2">+0.8% from last period</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#7A916C" strokeWidth={2} name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4">Orders Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#2C5530" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-[#2C5530] mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-[#2C5530] mb-4">Best Selling Products</h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#7A916C] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#2C5530]">₦{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4">Top Customers</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#2C5530]">₦{customer.spent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₦{(customer.spent / customer.orders).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Analytics</h3>
        <p className="text-sm text-blue-700">
          Analytics data is generated from your orders, products, and customer data. Connect your orders to see real-time insights. Export reports for external analysis or accounting purposes.
        </p>
      </div>
    </div>
  );
}
