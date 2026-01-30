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

      {/* Inline Create / Edit Collection Form */}
      {showForm && (
        <div id="collection-form-top" className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-[#2C5530] px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                {editingCollection ? 'Edit Collection' : 'Create New Collection'}
              </h2>
              <p className="text-sm text-white/70 mt-0.5">
                {editingCollection ? 'Update the collection details below' : 'Fill in the details to add a new collection'}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-6">
            {/* Section 1: Basic Info */}
            <div>
              <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">1</span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Collection Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                    placeholder="e.g., Evening Dresses"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-500">/</span>
                    <input
                      type="text"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                      placeholder="evening-dresses"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                  placeholder="Brief description of this collection..."
                />
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Section 2: Media */}
            <div>
              <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">2</span>
                Media
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUpload
                  label="Collection Image"
                  value={formData.image || ''}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
                <VideoUpload
                  label="Collection Video"
                  value={formData.video || ''}
                  onChange={(url) => setFormData({ ...formData, video: url })}
                />
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Section 3: Settings */}
            <div>
              <h3 className="text-sm font-semibold text-[#2C5530] uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#7A916C] text-white rounded-full flex items-center justify-center text-xs">3</span>
                Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order || 1}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white"
                    min="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Controls the order collections appear on the site</p>
                </div>

                <div className="flex items-start pt-7">
                  <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 w-full hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 text-[#7A916C] border-gray-300 rounded focus:ring-[#7A916C]"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Featured Collection</span>
                      <span className="text-xs text-gray-500">Show on the homepage</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Save className="w-4 h-4" />
              {editingCollection ? 'Save Changes' : 'Create Collection'}
            </button>
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
