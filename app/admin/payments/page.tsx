'use client';

import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, Calendar, Download, Eye, Filter, Search } from 'lucide-react';

interface Transaction {
  id: string;
  orderID: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  reference: string;
}

export default function PaymentsPage() {
  // Transactions will be empty initially and populate when payments start processing
  // This ensures stats show 0 until real transactions come in
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalRevenue: transactions.reduce((sum, txn) => txn.status === 'completed' ? sum + txn.amount : sum, 0),
    completedPayments: transactions.filter(t => t.status === 'completed').length,
    pendingPayments: transactions.filter(t => t.status === 'pending').length,
    failedPayments: transactions.filter(t => t.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Payments & Transactions
          </h1>
          <p className="text-gray-600 mt-1">View and manage payment transactions</p>
        </div>
        <button className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-[#2C5530]">₦{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-green-800">Completed</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">{stats.completedPayments}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-yellow-800">Pending</p>
            <Calendar className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-900">{stats.pendingPayments}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow-md p-4 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-red-800">Failed</p>
            <CreditCard className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-900">{stats.failedPayments}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by transaction ID, order ID, or customer..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{txn.id}</div>
                    <div className="text-xs text-gray-500">{txn.reference}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{txn.orderID}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{txn.customerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">₦{txn.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{txn.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(txn.status)}`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{new Date(txn.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No transactions found matching your criteria.
          </div>
        )}
      </div>

      {/* Payment Gateway Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Payment Integration</h3>
        <p className="text-sm text-blue-700">
          This page shows payment transactions. To process real payments, configure your payment gateway (Paystack, Flutterwave, etc.) in the Settings page.
        </p>
      </div>
    </div>
  );
}
