'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Upload, Trash2, Copy, Grid, List, Tag, Image as ImageIcon, Play } from 'lucide-react';
import { useMedia, MediaFile } from '@/contexts/MediaContext';
import { format } from 'date-fns';
import Image from 'next/image';

export default function MediaLibraryPage() {
  const { mediaFiles, isLoaded, addMedia, updateMedia, deleteMedia, bulkDelete } = useMedia();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredMedia = useMemo(() => {
    return mediaFiles.filter(media => {
      const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || media.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [mediaFiles, searchTerm, typeFilter]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        const type = file.type.startsWith('image/') ? 'image' : 'video';

        addMedia({
          url,
          name: file.name,
          type,
          size: file.size,
          tags: [],
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    event.target.value = '';
  };

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === filteredMedia.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredMedia.map(m => m.id)));
    }
  };

  const handleBulkDelete = () => {
    bulkDelete(Array.from(selectedFiles));
    setSelectedFiles(new Set());
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const stats = {
    total: mediaFiles.length,
    images: mediaFiles.filter(m => m.type === 'image').length,
    videos: mediaFiles.filter(m => m.type === 'video').length,
    totalSize: mediaFiles.reduce((sum, m) => sum + m.size, 0),
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
            Media Library
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Centralized media management</p>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2 cursor-pointer text-sm"
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </label>
          {selectedFiles.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedFiles.size})
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Files</p>
          <p className="text-2xl font-bold text-[#2C5530]">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-sm text-blue-800">Images</p>
          <p className="text-2xl font-bold text-blue-900">{stats.images}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-md p-4 border border-purple-200">
          <p className="text-sm text-purple-800">Videos</p>
          <p className="text-2xl font-bold text-purple-900">{stats.videos}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Total Size</p>
          <p className="text-2xl font-bold text-green-900">{formatFileSize(stats.totalSize)}</p>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by filename..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#7A916C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#7A916C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {filteredMedia.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFiles.size === filteredMedia.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-[#7A916C] border-gray-300 rounded focus:ring-[#7A916C]"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
          </div>
        )}
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all ${selectedFiles.has(media.id) ? 'border-[#7A916C]' : 'border-gray-200'}`}
            >
              <div className="relative aspect-video bg-gray-100">
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(media.id)}
                    onChange={() => handleSelect(media.id)}
                    className="w-5 h-5 text-[#7A916C] border-gray-300 rounded focus:ring-[#7A916C]"
                  />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{media.name}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>{formatFileSize(media.size)}</span>
                  <span>{media.usedIn.length} uses</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setSelectedMedia(media);
                      setIsDetailModalOpen(true);
                    }}
                    className="flex-1 px-2 py-1 bg-[#7A916C] text-white rounded text-xs hover:bg-[#6B8159] transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => copyToClipboard(media.url)}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMedia(media.id)}
                    className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedFiles.size === filteredMedia.length && filteredMedia.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#7A916C] border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Used In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMedia.map((media) => (
                <tr key={media.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(media.id)}
                      onChange={() => handleSelect(media.id)}
                      className="w-4 h-4 text-[#7A916C] border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      {media.type === 'image' ? (
                        <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{media.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${media.type === 'image' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {media.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatFileSize(media.size)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{media.usedIn.length} places</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(media.uploadedAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedMedia(media);
                          setIsDetailModalOpen(true);
                        }}
                        className="text-[#7A916C] hover:text-[#6B8159]"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(media.url)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMedia(media.id)}
                        className="text-red-600 hover:text-red-700"
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
      )}

      {filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">No media files</p>
          <p className="text-sm text-gray-500 mt-1">Upload images or videos to get started</p>
          <label
            htmlFor="file-upload-empty"
            className="inline-block mt-4 px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors cursor-pointer"
          >
            Upload Files
          </label>
          <input
            type="file"
            id="file-upload-empty"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Media Detail Modal */}
      {isDetailModalOpen && selectedMedia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#2C5530]">Media Details</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Preview */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                {selectedMedia.type === 'image' ? (
                  <img src={selectedMedia.url} alt={selectedMedia.name} className="w-full" />
                ) : (
                  <video src={selectedMedia.url} controls className="w-full" />
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Filename</p>
                  <p className="font-medium text-gray-900">{selectedMedia.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium text-gray-900 capitalize">{selectedMedia.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="font-medium text-gray-900">{formatFileSize(selectedMedia.size)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Uploaded</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(selectedMedia.uploadedAt), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
              </div>

              {/* URL */}
              <div>
                <p className="text-sm text-gray-600 mb-2">URL</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedMedia.url}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedMedia.url)}
                    className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Usage */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Used In ({selectedMedia.usedIn.length})</p>
                {selectedMedia.usedIn.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMedia.usedIn.map((usage, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{usage.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{usage.type}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Not currently used</p>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-between">
              <button
                onClick={() => {
                  deleteMedia(selectedMedia.id);
                  setIsDetailModalOpen(false);
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Media Library</h3>
        <p className="text-sm text-blue-700">
          The media library stores all images and videos used across your site. Track where media is used, organize with tags, and manage your assets efficiently. Supported formats: JPG, PNG, GIF, MP4, WebM.
        </p>
      </div>
    </div>
  );
}
