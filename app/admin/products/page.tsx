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

// Inline Product Form Component
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
    <div id="product-form-top" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-[#2C5530] px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">
            {product ? 'Edit Product' : 'Quick Add Product'}
          </h2>
          <p className="text-sm text-white/70 mt-0.5">
            {product ? 'Update the product details below' : 'Fill in the details to add a new product'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Section 1: Basic Details */}
        <div>
          <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">1</span>
            Basic Details
          </h3>

          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Section 2: Pricing & Inventory */}
        <div>
          <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">2</span>
            Pricing &amp; Inventory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price ({'\u20A6'}) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-500 font-medium">{'\u20A6'}</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-2.5 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Enter stock quantity"
                min="0"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 ${
                  errors.stock ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Section 3: Category & Collection */}
        <div>
          <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">3</span>
            Category &amp; Collection
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                <option value="Dresses">Dresses</option>
                <option value="Suits">Suits</option>
                <option value="Blouses">Blouses</option>
                <option value="Traditional">Traditional</option>
                <option value="Modern">Modern</option>
                <option value="Accessories">Accessories</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Homepage Collection
                <span className="text-gray-400 font-normal ml-1 text-xs">(for homepage display)</span>
              </label>
              <select
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">No collection (won&apos;t show on homepage)</option>
                <option value="Ready To Wear Collection">Ready To Wear Collection</option>
                <option value="The Art Of Herteals">The Art Of Herteals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Section 4: Status & Visibility */}
        <div>
          <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">4</span>
            Status &amp; Visibility
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] text-gray-900 bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-start pt-7">
              <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 w-full hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-[#7A916C] border-gray-300 rounded focus:ring-[#7A916C]"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700 block">Featured Product</span>
                  <span className="text-xs text-gray-500">Highlight on the store</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Section 5: Media */}
        <div>
          <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">5</span>
            Media
            <span className="text-xs font-normal text-gray-400 normal-case">(Optional)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MultiImageUpload
              label="Product Images"
              values={formData.images}
              onChange={(urls) => setFormData({ ...formData, images: urls })}
              maxImages={10}
            />
            <VideoUpload
              label="Product Video"
              value={formData.video}
              onChange={(url) => setFormData({ ...formData, video: url })}
            />
          </div>
        </div>

        {/* Tip Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> Select a &quot;Homepage Collection&quot; to display this product on the homepage automatically. Products will appear in the corresponding section.
          </p>
        </div>
      </form>

      {/* Form Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Save className="w-4 h-4" />
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </div>
  );
}
