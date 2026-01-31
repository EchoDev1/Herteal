'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Package, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import VideoUpload from '@/components/admin/VideoUpload';
import { useCollections, Collection } from '@/contexts/CollectionsContext';

export default function CollectionsManagementPage() {
  const { collections, isLoaded, addCollection, updateCollection, deleteCollection } = useCollections();

  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState<Partial<Collection>>({
    name: '',
    slug: '',
    description: '',
    image: '',
    video: '',
    featured: false,
    order: 1,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      video: '',
      featured: false,
      order: 1,
    });
    setEditingCollection(null);
  };

  const handleAdd = () => {
    resetForm();
    setFormData((prev) => ({ ...prev, order: collections.length + 1 }));
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('collection-form-top')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData(collection);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('collection-form-top')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      deleteCollection(id);
    }
  };

  const handleSave = () => {
    try {
      if (!formData.name || !formData.slug) {
        alert('Please fill in all required fields');
        return;
      }

      if (editingCollection) {
        updateCollection(editingCollection.id, formData);
      } else {
        addCollection({
          name: formData.name!,
          slug: formData.slug!,
          description: formData.description || '',
          image: formData.image || '',
          video: formData.video || '',
          featured: formData.featured || false,
          order: formData.order || collections.length + 1,
        });
      }

      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('An error occurred while saving. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: editingCollection ? formData.slug : name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A916C]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Collections Management
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your product collections and categories</p>
        </div>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Collection
        </button>
      </div>

      {/* Enhanced Inline Create / Edit Collection Form */}
      {showForm && (
        <div id="collection-form-top" className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border-2 border-[#7A916C]/30 overflow-hidden">
          {/* Form Header - Enhanced with gradient */}
          <div className="bg-gradient-to-r from-[#2C5530] to-[#7A916C] px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {editingCollection ? 'Edit Collection' : 'Create New Collection'}
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                    {editingCollection ? 'Update Mode' : 'Add Mode'}
                  </span>
                </h2>
                <p className="text-sm text-white/90 mt-1">
                  {editingCollection ? 'Update the collection information and settings below' : 'Add a new collection to organize your products'}
                </p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Body - Enhanced with better spacing and visual hierarchy */}
          <div className="p-8 space-y-8">
            {/* Section 1: Basic Info - Enhanced */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                    Basic Information
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Enter the collection name and URL slug</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                    Collection Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 transition-all duration-200 font-medium"
                    placeholder="e.g., Evening Dresses Collection"
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                    This will be displayed as the main title of your collection
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 font-bold">/shop/</span>
                    <input
                      type="text"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 transition-all duration-200 font-medium"
                      placeholder="evening-dresses"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                    URL-friendly version (lowercase, hyphens only)
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] text-gray-900 bg-white placeholder:text-gray-400 transition-all duration-200 resize-none"
                  placeholder="Write a compelling description that highlights what makes this collection special. This will help customers understand the collection's theme and style."
                />
                <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                  <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                  A good description helps customers discover products and improves SEO
                </p>
              </div>
            </div>

            {/* Section 2: Media - Enhanced */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                    Media Assets
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Upload images and videos to showcase your collection</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <ImageUpload
                    label="Collection Cover Image"
                    value={formData.image || ''}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                    High-quality image (min 1200x800px) for best display
                  </p>
                </div>
                <div>
                  <VideoUpload
                    label="Collection Video (Optional)"
                    value={formData.video || ''}
                    onChange={(url) => setFormData({ ...formData, video: url })}
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                    Add a video to create an engaging experience
                  </p>
                </div>
              </div>

              {/* Media Preview Tip */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong className="font-semibold">Pro Tip:</strong> Use high-quality images that represent your collection's style. Videos can increase engagement by up to 80%!
                </p>
              </div>
            </div>

            {/* Section 3: Settings - Enhanced */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#7A916C]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7A916C] to-[#2C5530] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2C5530] uppercase tracking-wide">
                    Display Settings
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Configure how this collection appears on your site</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order || 1}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] text-gray-900 bg-white font-bold text-lg"
                    min="1"
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                    Lower numbers appear first (1 = top position)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7A916C] rounded-full"></span>
                    Visibility Options
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl px-5 py-4 hover:border-[#7A916C] hover:shadow-md transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-6 h-6 text-[#7A916C] border-gray-300 rounded-lg focus:ring-[#7A916C]"
                    />
                    <div>
                      <span className="text-sm font-bold text-gray-800 block flex items-center gap-2">
                        Featured Collection
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">⭐</span>
                      </span>
                      <span className="text-xs text-gray-600">Display prominently on the homepage</span>
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                    <span className="text-[#7A916C] mt-0.5">ℹ️</span>
                    Featured collections get priority placement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Footer - Enhanced */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <span className="text-red-500">*</span>
              <span>Required fields must be filled</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#7A916C] to-[#2C5530] text-white rounded-xl hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 font-bold transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                {editingCollection ? 'Save Changes' : 'Create Collection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...collections].sort((a, b) => a.order - b.order).map((collection) => (
          <div key={collection.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* Image */}
            <div className="h-48 bg-gray-200 relative">
              {collection.image ? (
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {collection.featured && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-[#7A916C] text-white text-xs font-medium rounded">
                  Featured
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#2C5530] mb-1">{collection.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{collection.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{collection.productCount} products</span>
                <span>/{collection.slug}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/admin/products?collection=${collection.slug}`}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Package className="w-4 h-4" />
                  Manage Products
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(collection)}
                    className="flex-1 px-3 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(collection.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {collections.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-600">
          No collections yet.{' '}
          <button onClick={handleAdd} className="text-[#7A916C] font-medium hover:underline">
            Create your first collection
          </button>
          .
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Collection Management</h3>
        <p className="text-sm text-blue-700">
          Collections help organize your products into categories. Featured collections will appear on the homepage.
          The display order determines how collections are shown across the site.
        </p>
      </div>
    </div>
  );
}
