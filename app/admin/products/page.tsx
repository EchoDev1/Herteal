'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import VideoUpload from '@/components/admin/VideoUpload';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  video?: string;
  status: 'active' | 'inactive';
}

// Form data with string types for inputs
interface ProductFormData {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: string;
  images: string[];
  video: string;
  status: 'active' | 'inactive';
}

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const collectionFilter = searchParams?.get('collection');

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Elegant Evening Dress',
      price: 45000,
      category: 'Dresses',
      stock: 25,
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
      status: 'active',
    },
    {
      id: 2,
      name: 'Traditional Ankara Set',
      price: 35000,
      category: 'Traditional',
      stock: 15,
      images: ['https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400'],
      status: 'active',
    },
    {
      id: 3,
      name: 'Modern Blazer',
      price: 55000,
      category: 'Modern',
      stock: 30,
      images: ['https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400'],
      status: 'active',
    },
    {
      id: 4,
      name: 'Classic Suit',
      price: 65000,
      category: 'Suits',
      stock: 20,
      images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400'],
      status: 'active',
    },
    {
      id: 5,
      name: 'Silk Blouse',
      price: 28000,
      category: 'Blouses',
      stock: 35,
      images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400'],
      status: 'active',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Check if we should open the add modal from URL parameter
  useEffect(() => {
    if (searchParams?.get('action') === 'add') {
      setShowAddModal(true);
      setEditingProduct(null);
    }
  }, [searchParams]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleSave = (product: Product) => {
    if (editingProduct && editingProduct.id !== 0) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection = collectionFilter
      ? p.category.toLowerCase() === collectionFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCollection;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            {collectionFilter ? `Products - ${collectionFilter.charAt(0).toUpperCase() + collectionFilter.slice(1)}` : 'Products'}
          </h1>
          <p className="text-gray-600 mt-1">
            {collectionFilter
              ? `Managing products in the ${collectionFilter} collection`
              : 'Manage your product inventory'}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
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

      {/* Add/Edit Modal */}
      {showAddModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
          defaultCategory={collectionFilter ? collectionFilter.charAt(0).toUpperCase() + collectionFilter.slice(1) : undefined}
        />
      )}
    </div>
  );
}

// Product Modal Component
function ProductModal({
  product,
  onSave,
  onClose,
  defaultCategory,
}: {
  product: Product | null;
  onSave: (product: Product) => void;
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
        stock: product.stock.toString(),
        images: product.images,
        video: product.video || '',
        status: product.status,
      };
    }
    return {
      id: 0,
      name: '',
      price: '',
      category: defaultCategory || '',
      stock: '',
      images: [],
      video: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData: Product = {
      id: formData.id,
      name: formData.name.trim(),
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      images: formData.images,
      video: formData.video || undefined,
      status: formData.status,
    };

    onSave(productData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#F0F0F0]">
          <h2 className="text-xl font-semibold text-[#2D2D2D]">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the product details. Images and video are optional.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] ${
                errors.name ? 'border-red-500' : 'border-[#7A916C]/30'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Price and Stock */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Price (₦) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] ${
                  errors.price ? 'border-red-500' : 'border-[#7A916C]/30'
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Enter stock quantity"
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] ${
                  errors.stock ? 'border-red-500' : 'border-[#7A916C]/30'
                }`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>
          </div>

          {/* Category and Status */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                <option value="Dresses">Dresses</option>
                <option value="Suits">Suits</option>
                <option value="Blouses">Blouses</option>
                <option value="Ready To Wear Collection">Ready To Wear Collection</option>
                <option value="The Art Of Herteals">The Art Of Herteals</option>
                <option value="Traditional">Traditional</option>
                <option value="Modern">Modern</option>
                <option value="Accessories">Accessories</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-4 py-2 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Images and Video Upload - Side by Side */}
          <div className="grid md:grid-cols-2 gap-4">
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

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              <strong>Tip:</strong> You can add images only, video only, or both. The first image will be used as the main product image.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors font-medium"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-200 text-[#2D2D2D] rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
