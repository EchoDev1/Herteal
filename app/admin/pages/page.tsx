'use client';

import { useState } from 'react';
import { Edit, Eye, Save, X, Plus } from 'lucide-react';
import Link from 'next/link';

interface PageContent {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
  content: string;
}

export default function PagesManagementPage() {
  const [pages, setPages] = useState<PageContent[]>([
    {
      id: '1',
      title: 'Privacy Policy',
      slug: 'privacy',
      lastUpdated: 'January 2026',
      content: 'Privacy policy content...',
    },
    {
      id: '2',
      title: 'Terms & Conditions',
      slug: 'terms',
      lastUpdated: 'January 2026',
      content: 'Terms and conditions content...',
    },
    {
      id: '3',
      title: 'Complaints & Support',
      slug: 'complaints',
      lastUpdated: 'January 2026',
      content: 'Complaints and support content...',
    },
  ]);

  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setEditingPage({
      id: '',
      title: '',
      slug: '',
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      content: '',
    });
    setIsEditing(true);
  };

  const handleEdit = (page: PageContent) => {
    setEditingPage({ ...page });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingPage) {
      if (editingPage.id === '') {
        // Adding new page
        const newPage = { ...editingPage, id: Date.now().toString() };
        setPages([...pages, newPage]);
      } else {
        // Updating existing page
        setPages(pages.map(p => p.id === editingPage.id ? editingPage : p));
      }
      setIsEditing(false);
      setEditingPage(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Pages Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your site pages and content</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Page
          </button>
        )}
      </div>

      {isEditing && editingPage ? (
        /* Edit Mode */
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2C5530]">Editing: {editingPage.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={editingPage.title}
                onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={editingPage.slug}
                onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                placeholder="e.g., privacy, terms"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Updated
              </label>
              <input
                type="text"
                value={editingPage.lastUpdated}
                onChange={(e) => setEditingPage({ ...editingPage, lastUpdated: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                placeholder="e.g., January 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Content
              </label>
              <textarea
                value={editingPage.content}
                onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent font-mono text-sm"
                placeholder="Enter page content here..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Note: Content editing is simplified. For full page editing, access the page files directly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* List Mode */
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{page.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/${page.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                    <button
                      onClick={() => handleEdit(page)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Page Management</h3>
        <p className="text-sm text-blue-700">
          Use this section to manage your site&apos;s legal and informational pages. Changes made here will be reflected across the entire site.
          For advanced editing, you can access the page files directly in the project.
        </p>
      </div>
    </div>
  );
}
