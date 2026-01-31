'use client';

import { useState, useMemo } from 'react';
import { Search, AlertTriangle, PackageCheck, PackageX, Edit, History } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import { useInventory } from '@/contexts/InventoryContext';
import { format } from 'date-fns';

export default function InventoryManagementPage() {
  const { products, updateProduct } = useProducts();
  const { movements, addMovement } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [adjustmentQty, setAdjustmentQty] = useState('');
  const [adjustmentNotes, setAdjustmentNotes] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        stockFilter === 'all' ||
        (stockFilter === 'low' && p.stock > 0 && p.stock < 10) ||
        (stockFilter === 'out' && p.stock === 0);
      return matchesSearch && matchesFilter;
    });
  }, [products, searchTerm, stockFilter]);

  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 10);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: PackageX };
    if (stock < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800', icon: PackageCheck };
  };

  const handleAdjustStock = () => {
    if (!selectedProduct || !adjustmentQty) return;

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const qty = parseInt(adjustmentQty);
    const newStock = product.stock + qty;

    if (newStock < 0) {
      alert('Stock cannot be negative');
      return;
    }

    // Update product stock
    updateProduct(selectedProduct, { stock: newStock });

    // Log movement
    addMovement({
      productId: selectedProduct,
      productName: product.name,
      type: 'adjustment',
      quantity: qty,
      previousStock: product.stock,
      newStock,
      notes: adjustmentNotes || undefined,
      userName: 'Admin',
    });

    setSelectedProduct(null);
    setAdjustmentQty('');
    setAdjustmentNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
          Inventory Management
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Track stock levels and movements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-[#2C5530]">{products.length}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <p className="text-sm text-yellow-800">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-900">{lowStockProducts.length}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow-md p-4 border border-red-200">
          <p className="text-sm text-red-800">Out of Stock</p>
          <p className="text-2xl font-bold text-red-900">{outOfStockProducts.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Inventory Value</p>
          <p className="text-2xl font-bold text-green-900">₦{totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-900">Low Stock Alert</h3>
              <p className="text-sm text-yellow-700 mt-1">
                {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} running low on stock
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {lowStockProducts.slice(0, 5).map(p => (
                  <span key={p.id} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    {p.name} ({p.stock} left)
                  </span>
                ))}
                {lowStockProducts.length > 5 && (
                  <span className="text-xs text-yellow-700">+{lowStockProducts.length - 5} more</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white"
            />
          </div>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white"
          >
            <option value="all">All Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Value</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map(product => {
              const status = getStockStatus(product.stock);
              const StatusIcon = status.icon;
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-gray-900">{product.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#2C5530]">
                    ₦{(product.price * product.stock).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedProduct(product.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159]"
                    >
                      <Edit className="w-4 h-4" />
                      Adjust
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Recent Movements */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4 flex items-center gap-2">
          <History className="w-5 h-5" />
          Recent Stock Movements
        </h2>
        <div className="space-y-2">
          {movements.slice(0, 10).map(movement => (
            <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{movement.productName}</p>
                <p className="text-xs text-gray-500">
                  {movement.type === 'sale' ? 'Sale' : movement.type === 'restock' ? 'Restocked' : 'Adjusted'} •{' '}
                  {format(new Date(movement.date), 'MMM d, HH:mm')}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                </p>
                <p className="text-xs text-gray-500">Stock: {movement.newStock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjustment Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#2C5530]">Adjust Stock</h2>
              <p className="text-sm text-gray-600 mt-1">
                {products.find(p => p.id === selectedProduct)?.name}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity Adjustment
                </label>
                <input
                  type="number"
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(e.target.value)}
                  placeholder="Enter + or - amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use positive numbers to add stock, negative to reduce
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={adjustmentNotes}
                  onChange={(e) => setAdjustmentNotes(e.target.value)}
                  rows={3}
                  placeholder="Reason for adjustment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] text-gray-900"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setAdjustmentQty('');
                  setAdjustmentNotes('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAdjustStock}
                className="flex-1 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159]"
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Inventory</h3>
        <p className="text-sm text-blue-700">
          Track stock levels across all products. Low stock alerts help prevent stockouts. All stock movements are logged for audit purposes.
        </p>
      </div>
    </div>
  );
}
