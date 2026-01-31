'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Plus, Edit, Trash2, Search, Play, Save, X } from 'lucide-react';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import VideoUpload from '@/components/admin/VideoUpload';
import { useProducts, StoreProduct } from '@/contexts/ProductsContext';

// Form data with string types for inputs
interface ProductFormData {
  id: string;
  name: string;
  price: string;
  category: string;
  collection: string;
  stock: string;
  images: string[];
  video: string;
  description: string;
  featured: boolean;
  status: 'active' | 'inactive';
}

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const collectionFilter = searchParams?.get('collection');

  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);

  // Check if we should open the add form from URL parameter
  useEffect(() => {
    if (searchParams?.get('action') === 'add') {
      setShowForm(true);
      setEditingProduct(null);
    }
  }, [searchParams]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('product-form-top')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEdit = (product: StoreProduct) => {
    setEditingProduct(product);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('product-form-top')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (productData: Omit<StoreProduct, 'id' | 'slug' | 'createdAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection = collectionFilter
      ? p.category.toLowerCase() === collectionFilter.toLowerCase() ||
        p.collection?.toLowerCase() === collectionFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCollection;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            {collectionFilter ? `Products - ${collectionFilter.charAt(0).toUpperCase() + collectionFilter.slice(1)}` : 'Products'}
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {collectionFilter
              ? `Managing products in the ${collectionFilter} collection`
              : 'Manage your product inventory'}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Quick Add Product
        </button>
      </div>

      {/* Inline Quick Add / Edit Product Form */}
      {showForm && (
        <ProductInlineForm
          product={editingProduct}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          defaultCategory={collectionFilter ? collectionFilter.charAt(0).toUpperCase() + collectionFilter.slice(1) : undefined}
        />
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#7A916C] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Collection</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded-lg"
                          unoptimized={product.images[0].startsWith('data:')}
                        />
                      ) : product.video ? (
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                      {product.video && product.images && product.images.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{'\u20A6'}{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>
                      <span className="font-medium">{product.category}</span>
                      {product.collection && (
                        <span className="block text-xs text-gray-500">{product.collection}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-[#7A916C] hover:bg-[#7A916C]/10 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          No products found. {searchTerm && 'Try a different search term or '}
          <button onClick={handleAdd} className="text-[#7A916C] font-medium hover:underline">
            add a new product
          </button>
          .
        </div>
      )}
    </div>
  );
}

// Enhanced Inline Product Form Component
function ProductInlineForm({
  product,
  onSave,
  onClose,
  defaultCategory,
}: {
  product: StoreProduct | null;
  onSave: (product: Omit<StoreProduct, 'id' | 'slug' | 'createdAt'>) => void;
  onClose: () => void;
  defaultCategory?: string;
}) {
  const [formData, setFormData] = useState<ProductFormData>(() => {
    if (product) {
      return {
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        collection: product.collection || '',
        stock: product.stock.toString(),
        images: product.images,
        video: product.video || '',
        description: product.description || '',
        featured: product.featured || false,
        status: product.status,
      };
    }
    return {
      id: '',
      name: '',
      price: '',
      category: defaultCategory || '',
      collection: '',
      stock: '',
      images: [],
      video: '',
      description: '',
      featured: false,
      status: 'active',
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData: Omit<StoreProduct, 'id' | 'slug' | 'createdAt'> = {
      name: formData.name.trim(),
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      collection: formData.collection || undefined,
      stock: parseInt(formData.stock) || 0,
      images: formData.images,
      video: formData.video || undefined,
      description: formData.description || undefined,
      featured: formData.featured,
      status: formData.status,
    };

    onSave(productData);
  };

  return (
    <div id="product-form-top" className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border-2 border-[#7A916C]/30 overflow-hidden">
      {/* Form Header - Enhanced with gradient */}
      <div className="bg-gradient-to-r from-[#2C5530] to-[#7A916C] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {product ? 'Edit Product' : 'Quick Add Product'}
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                {product ? 'Update Mode' : 'Add Mode'}
              </span>
            </h2>
            <p className="text-sm text-white/90 mt-1">
              {product ? 'Update the product information and inventory details below' : 'Add a new product to your store inventory'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Form Body - Enhanced with better spacing and visual hierarchy */}
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Section 1: Basic Details - Enhanced */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                Basic Details
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Enter the product name and description</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Elegant Evening Dress"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 font-medium transition-all duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Choose a clear, descriptive name that customers will search for
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Product Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product's features, materials, and what makes it special. Include details about fit, care instructions, and unique selling points."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 transition-all duration-200 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                A detailed description helps customers make informed decisions
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Inventory - Enhanced */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                Pricing &amp; Inventory
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Set product price and stock levels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Price ({'\u20A6'}) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 font-bold">{'\u20A6'}</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 border-2 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 font-bold text-lg transition-all duration-200 ${
                    errors.price ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.price}</p>}
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Set competitive pricing based on market research
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Enter available quantity"
                min="0"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 font-bold text-lg transition-all duration-200 ${
                  errors.stock ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.stock}</p>}
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Track inventory to prevent overselling
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Category & Collection - Enhanced */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                Category &amp; Collection
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Organize your product for better discovery</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white font-medium transition-all duration-200 ${
                  errors.category ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="">Select a category</option>
                <option value="Dresses">Dresses</option>
                <option value="Suits">Suits</option>
                <option value="Blouses">Blouses</option>
                <option value="Traditional">Traditional</option>
                <option value="Modern">Modern</option>
                <option value="Accessories">Accessories</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.category}</p>}
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Categories help customers filter and find products
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Homepage Collection
              </label>
              <select
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white font-medium transition-all duration-200"
              >
                <option value="">No collection (won&apos;t show on homepage)</option>
                <option value="Ready To Wear Collection">Ready To Wear Collection</option>
                <option value="The Art Of Herteals">The Art Of Herteals</option>
              </select>
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Feature this product on homepage in a collection
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Status & Visibility - Enhanced */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
              4
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                Status &amp; Visibility
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Control product availability and promotion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Product Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white font-medium transition-all duration-200"
              >
                <option value="active">Active - Visible to customers</option>
                <option value="inactive">Inactive - Hidden from store</option>
              </select>
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Inactive products won&apos;t appear in the store
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                Promotion Options
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl px-5 py-4 hover:border-[#7A916C] hover:shadow-md transition-all duration-200">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-6 h-6 text-[#7A916C] border-gray-300 rounded-lg focus:ring-[#7A916C]"
                />
                <div>
                  <span className="text-sm font-bold text-gray-800 block flex items-center gap-2">
                    Featured Product
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">⭐</span>
                  </span>
                  <span className="text-xs text-gray-600">Highlight this product on your store</span>
                </div>
              </label>
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Featured products get premium placement
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Media - Enhanced */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
              5
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                Product Media
                <span className="text-xs font-normal text-gray-400 normal-case ml-2">(Optional but Recommended)</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Upload high-quality images and videos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <MultiImageUpload
                label="Product Images"
                values={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                maxImages={10}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Upload multiple angles (max 10 images)
              </p>
            </div>
            <div>
              <VideoUpload
                label="Product Video (Optional)"
                value={formData.video}
                onChange={(url) => setFormData({ ...formData, video: url })}
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                Videos increase conversion rates significantly
              </p>
            </div>
          </div>

          {/* Media Pro Tip */}
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong className="font-semibold">Pro Tip:</strong> Products with high-quality images and videos see up to 3x more engagement. Show your product from different angles and in use!
            </p>
          </div>
        </div>

        {/* Homepage Collection Info Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-5 rounded-lg">
          <p className="text-sm text-green-800">
            <strong className="font-semibold">💡 Homepage Display:</strong> Select a &quot;Homepage Collection&quot; above to automatically feature this product on your homepage. Products in collections get 5x more visibility!
          </p>
        </div>
      </form>

      {/* Form Footer - Enhanced */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="text-red-500">*</span>
          <span>Required fields must be filled</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#7A916C] to-[#2C5530] text-white rounded-xl hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 font-bold transform hover:scale-105"
          >
            <Save className="w-5 h-5" />
            {product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
