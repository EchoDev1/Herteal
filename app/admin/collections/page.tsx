'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Package } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import VideoUpload from '@/components/admin/VideoUpload';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  video?: string;
  productCount: number;
  featured: boolean;
  order: number;
}

export default function CollectionsManagementPage() {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Dresses',
      slug: 'dresses',
      description: 'Elegant dresses for every occasion',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      productCount: 0,
      featured: true,
      order: 1,
    },
    {
      id: '2',
      name: 'Suits',
      slug: 'suits',
      description: 'Tailored suits for the modern woman',
      image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660',
      productCount: 0,
      featured: true,
      order: 2,
    },
    {
      id: '3',
      name: 'Blouses',
      slug: 'blouses',
      description: 'Sophisticated blouses and tops',
      image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6',
      productCount: 0,
      featured: true,
      order: 3,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState<Partial<Collection>>({
    name: '',
    slug: '',
    description: '',
    image: '',
    video: '',
    featured: false,
    order: collections.length + 1,
  });

  const handleAdd = () => {
    setEditingCollection(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      video: '',
      featured: false,
      order: collections.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData(collection);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      setCollections(collections.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.slug) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingCollection) {
      // Update existing collection
      setCollections(collections.map(c =>
        c.id === editingCollection.id ? { ...c, ...formData } as Collection : c
      ));
    } else {
      // Add new collection
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: formData.name!,
        slug: formData.slug!,
        description: formData.description || '',
        image: formData.image || '',
        video: formData.video || '',
        productCount: 0,
        featured: formData.featured || false,
        order: formData.order || collections.length + 1,
      };
      setCollections([...collections, newCollection]);
    }

    setIsModalOpen(false);
    setFormData({});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingCollection(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Collections Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your product collections and categories</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Collection
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.sort((a, b) => a.order - b.order).map((collection) => (
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#2C5530]">
                {editingCollection ? 'Edit Collection' : 'Add New Collection'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    placeholder="e.g., Dresses"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    placeholder="e.g., dresses"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  placeholder="Brief description of this collection"
                />
              </div>

              {/* Image and Video Upload - Side by Side */}
              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order || 1}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    min="1"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 text-[#7A916C] border-gray-300 rounded focus:ring-[#7A916C]"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Collection</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingCollection ? 'Save Changes' : 'Create Collection'}
              </button>
            </div>
          </div>
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
