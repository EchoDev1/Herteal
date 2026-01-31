'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Calendar, Tag as TagIcon } from 'lucide-react';
import { useDiscounts, Coupon } from '@/contexts/DiscountsContext';
import { format } from 'date-fns';

export default function DiscountsPage() {
  const { coupons, isLoaded, addCoupon, updateCoupon, deleteCoupon } = useDiscounts();
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'expired'>('active');
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as Coupon['type'],
    value: '',
    minimumOrderValue: '',
    maxUsage: '',
    validFrom: '',
    validUntil: '',
  });

  const filteredCoupons = coupons.filter(c => c.status === activeTab);

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData({ ...formData, code });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code || !formData.value || !formData.validFrom || !formData.validUntil) {
      alert('Please fill in all required fields');
      return;
    }

    const couponData = {
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: parseFloat(formData.value),
      minimumOrderValue: formData.minimumOrderValue ? parseFloat(formData.minimumOrderValue) : undefined,
      maxUsage: formData.maxUsage ? parseInt(formData.maxUsage) : undefined,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
    };

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponData);
    } else {
      addCoupon(couponData);
    }

    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      type: 'percentage',
      value: '',
      minimumOrderValue: '',
      maxUsage: '',
      validFrom: '',
      validUntil: '',
    });
    setEditingCoupon(null);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minimumOrderValue: coupon.minimumOrderValue?.toString() || '',
      maxUsage: coupon.maxUsage?.toString() || '',
      validFrom: coupon.validFrom.split('T')[0],
      validUntil: coupon.validUntil.split('T')[0],
    });
    setShowForm(true);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Coupon code copied!');
  };

  const stats = {
    active: coupons.filter(c => c.status === 'active').length,
    scheduled: coupons.filter(c => c.status === 'scheduled').length,
    expired: coupons.filter(c => c.status === 'expired').length,
    totalUsage: coupons.reduce((sum, c) => sum + c.currentUsage, 0),
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A916C]"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Discounts & Coupons
          </h1>
          <p className="text-gray-600 mt-1">Create and manage promotional codes</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Active Coupons</p>
          <p className="text-2xl font-bold text-[#2C5530]">{stats.active}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-sm text-blue-800">Scheduled</p>
          <p className="text-2xl font-bold text-blue-900">{stats.scheduled}</p>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Expired</p>
          <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Total Usage</p>
          <p className="text-2xl font-bold text-green-900">{stats.totalUsage}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-2">
          {(['active', 'scheduled', 'expired'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#7A916C] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCoupons.map(coupon => (
          <div key={coupon.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <TagIcon className="w-5 h-5 text-[#7A916C]" />
                <span className="font-mono font-bold text-lg text-[#2C5530]">{coupon.code}</span>
              </div>
              <button onClick={() => copyCode(coupon.code)} className="p-1 hover:bg-gray-100 rounded">
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">
                  {coupon.type === 'percentage' ? `${coupon.value}%` :
                   coupon.type === 'fixed' ? `₦${coupon.value}` : 'Free Shipping'}
                </span>
              </div>
              {coupon.minimumOrderValue && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min Order</span>
                  <span className="font-medium">₦{coupon.minimumOrderValue.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Usage</span>
                <span className="font-medium">
                  {coupon.currentUsage}{coupon.maxUsage ? `/${coupon.maxUsage}` : ''}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Valid Until</span>
                <span className="font-medium">{format(new Date(coupon.validUntil), 'MMM d, yyyy')}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEdit(coupon)}
                className="flex-1 px-3 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] text-sm flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => deleteCoupon(coupon.id)}
                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <TagIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No {activeTab} coupons</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#2C5530]">
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  >
                    <option value="percentage">Percentage Off</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value * {formData.type === 'percentage' && '(%)'}
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Order Value
                  </label>
                  <input
                    type="number"
                    value={formData.minimumOrderValue}
                    onChange={(e) => setFormData({ ...formData, minimumOrderValue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Usage Limit
                  </label>
                  <input
                    type="number"
                    value={formData.maxUsage}
                    onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                    placeholder="Unlimited"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid From *
                  </label>
                  <input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Until *
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159]"
                >
                  {editingCoupon ? 'Update' : 'Create'} Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Coupons</h3>
        <p className="text-sm text-blue-700">
          Create discount codes for promotional campaigns. Set minimum order values, usage limits, and validity periods to control your promotions effectively.
        </p>
      </div>
    </div>
  );
}
