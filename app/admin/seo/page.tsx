'use client';

import { useState } from 'react';
import { Globe, Plus, Edit, Trash2, Save, ExternalLink } from 'lucide-react';
import { useSEO } from '@/contexts/SEOContext';

export default function SEOPage() {
  const { settings, isLoaded, updateGlobal, setPageSEO, updateAnalytics, addRedirect, removeRedirect } = useSEO();
  const [showRedirectForm, setShowRedirectForm] = useState(false);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [redirectForm, setRedirectForm] = useState({ from: '', to: '', type: 301 as 301 | 302 });
  const [pageForm, setPageForm] = useState({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    noindex: false,
  });

  const handleAddRedirect = () => {
    if (!redirectForm.from || !redirectForm.to) {
      alert('Please fill in both from and to URLs');
      return;
    }
    addRedirect(redirectForm.from, redirectForm.to, redirectForm.type);
    setRedirectForm({ from: '', to: '', type: 301 });
    setShowRedirectForm(false);
  };

  const handleEditPage = (path: string) => {
    const page = settings.pages[path];
    if (page) {
      setPageForm({
        title: page.title,
        description: page.description,
        keywords: page.keywords.join(', '),
        ogImage: page.ogImage || '',
        noindex: page.noindex || false,
      });
      setEditingPage(path);
    }
  };

  const handleSavePage = () => {
    if (!editingPage) return;
    setPageSEO(editingPage, {
      title: pageForm.title,
      description: pageForm.description,
      keywords: pageForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
      ogImage: pageForm.ogImage || undefined,
      noindex: pageForm.noindex,
    });
    setEditingPage(null);
    setPageForm({ title: '', description: '', keywords: '', ogImage: '', noindex: false });
  };

  const commonPages = [
    { path: '/', name: 'Home' },
    { path: '/shop', name: 'Shop' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/blog', name: 'Blog' },
  ];

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A916C]"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
          SEO Management
        </h1>
        <p className="text-gray-600 mt-1">Optimize your site for search engines</p>
      </div>

      {/* Global SEO Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Global SEO Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Title
            </label>
            <input
              type="text"
              value={settings.global.siteTitle}
              onChange={(e) => updateGlobal({ siteTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              placeholder="Herteals - Fashion E-commerce"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              value={settings.global.siteDescription}
              onChange={(e) => updateGlobal({ siteDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              placeholder="Your one-stop destination for fashion..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              value={settings.global.keywords.join(', ')}
              onChange={(e) => updateGlobal({
                keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              placeholder="fashion, clothing, nigeria, online shopping"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OG Image URL
              </label>
              <input
                type="text"
                value={settings.global.ogImage}
                onChange={(e) => updateGlobal({ ogImage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter Handle
              </label>
              <input
                type="text"
                value={settings.global.twitterHandle || ''}
                onChange={(e) => updateGlobal({ twitterHandle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                placeholder="@herteals"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Integration */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4">Analytics Integration</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.analytics.googleAnalyticsId || ''}
              onChange={(e) => updateAnalytics({ googleAnalyticsId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Pixel ID
            </label>
            <input
              type="text"
              value={settings.analytics.facebookPixelId || ''}
              onChange={(e) => updateAnalytics({ facebookPixelId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              placeholder="1234567890"
            />
          </div>
        </div>
      </div>

      {/* Page-Specific SEO */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4">Page-Specific SEO</h2>
        <p className="text-sm text-gray-600 mb-4">
          Override global SEO settings for specific pages
        </p>

        <div className="space-y-3">
          {commonPages.map(page => {
            const pageSEO = settings.pages[page.path];
            const isEditing = editingPage === page.path;

            return (
              <div key={page.path} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{page.name}</h3>
                    <p className="text-xs text-gray-500">{page.path}</p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => handleEditPage(page.path)}
                      className="p-1.5 text-[#7A916C] hover:bg-gray-100 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3 mt-3">
                    <input
                      type="text"
                      value={pageForm.title}
                      onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                      placeholder="Page Title"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-900"
                    />
                    <textarea
                      value={pageForm.description}
                      onChange={(e) => setPageForm({ ...pageForm, description: e.target.value })}
                      placeholder="Page Description"
                      rows={2}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-900"
                    />
                    <input
                      type="text"
                      value={pageForm.keywords}
                      onChange={(e) => setPageForm({ ...pageForm, keywords: e.target.value })}
                      placeholder="Keywords (comma separated)"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-900"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSavePage}
                        className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] text-sm flex items-center gap-1"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingPage(null);
                          setPageForm({ title: '', description: '', keywords: '', ogImage: '', noindex: false });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : pageSEO ? (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Title:</span> {pageSEO.title}</p>
                    <p><span className="font-medium">Description:</span> {pageSEO.description}</p>
                    {pageSEO.keywords.length > 0 && (
                      <p><span className="font-medium">Keywords:</span> {pageSEO.keywords.join(', ')}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Using global SEO settings</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* URL Redirects */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2C5530]">URL Redirects</h2>
          <button
            onClick={() => setShowRedirectForm(true)}
            className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Redirect
          </button>
        </div>

        {showRedirectForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={redirectForm.from}
                onChange={(e) => setRedirectForm({ ...redirectForm, from: e.target.value })}
                placeholder="From URL (e.g., /old-page)"
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
              />
              <input
                type="text"
                value={redirectForm.to}
                onChange={(e) => setRedirectForm({ ...redirectForm, to: e.target.value })}
                placeholder="To URL (e.g., /new-page)"
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={redirectForm.type}
                onChange={(e) => setRedirectForm({ ...redirectForm, type: parseInt(e.target.value) as 301 | 302 })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
              >
                <option value={301}>301 - Permanent</option>
                <option value={302}>302 - Temporary</option>
              </select>
              <button
                onClick={handleAddRedirect}
                className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] text-sm"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowRedirectForm(false);
                  setRedirectForm({ from: '', to: '', type: 301 });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {settings.redirects.length === 0 ? (
            <p className="text-center py-8 text-gray-500 text-sm">No redirects configured</p>
          ) : (
            settings.redirects.map((redirect, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-gray-700">{redirect.from}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                  <span className="font-mono text-gray-700">{redirect.to}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    redirect.type === 301 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {redirect.type}
                  </span>
                </div>
                <button
                  onClick={() => removeRedirect(redirect.from)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About SEO</h3>
        <p className="text-sm text-blue-700">
          Search Engine Optimization improves your site's visibility in search results. Configure meta tags, social sharing images, and URL redirects. Use Google Analytics to track performance.
        </p>
      </div>
    </div>
  );
}
