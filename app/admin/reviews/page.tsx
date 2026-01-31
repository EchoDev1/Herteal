'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';
import { useReviews } from '@/contexts/ReviewsContext';
import { format } from 'date-fns';

export default function ReviewsPage() {
  const { reviews, isLoaded, approveReview, rejectReview, bulkApprove, bulkReject, addReply, updateReview } = useReviews();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [selectedReviews, setSelectedReviews] = useState<Set<string>>(new Set());

  const filteredReviews = reviews.filter(r => statusFilter === 'all' || r.status === statusFilter);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedReviews);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedReviews(newSelected);
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    if (selectedReviews.size === 0) return;
    if (action === 'approve') bulkApprove(Array.from(selectedReviews));
    else bulkReject(Array.from(selectedReviews));
    setSelectedReviews(new Set());
  };

  const handleAddReply = () => {
    if (!selectedReview || !replyText) return;
    addReply(selectedReview, replyText);
    setReplyText('');
    setSelectedReview(null);
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    avgRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0,
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A916C]"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Reviews & Ratings
          </h1>
          <p className="text-gray-600 mt-1">Moderate customer reviews</p>
        </div>
        {selectedReviews.size > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction('approve')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve ({selectedReviews.size})
            </button>
            <button
              onClick={() => handleBulkAction('reject')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject ({selectedReviews.size})
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-2xl font-bold text-[#2C5530]">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <p className="text-sm text-yellow-800">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Approved</p>
          <p className="text-2xl font-bold text-green-900">{stats.approved}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-md p-4 border border-purple-200">
          <p className="text-sm text-purple-800">Avg Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-purple-900">{stats.avgRating}</p>
            <div className="flex">
              {renderStars(Math.round(parseFloat(stats.avgRating.toString())))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#7A916C] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedReviews.has(review.id)}
                  onChange={() => handleSelect(review.id)}
                  className="mt-1 w-4 h-4 text-[#7A916C] border-gray-300 rounded"
                />

                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{review.userName}</span>
                        {review.verifiedPurchase && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">
                          {format(new Date(review.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      review.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {review.status}
                    </span>
                  </div>

                  {/* Product */}
                  <p className="text-sm text-gray-600 mb-2">
                    Product: <span className="font-medium">{review.productName}</span>
                  </p>

                  {/* Review Content */}
                  <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
                  <p className="text-gray-700 mb-3">{review.comment}</p>

                  {/* Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded" />
                      ))}
                    </div>
                  )}

                  {/* Admin Reply */}
                  {review.adminReply && (
                    <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-sm font-medium text-blue-900 mb-1">Admin Reply:</p>
                      <p className="text-sm text-blue-800">{review.adminReply}</p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {selectedReview === review.id && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddReply}
                          className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] text-sm"
                        >
                          Send Reply
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReview(null);
                            setReplyText('');
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200">
                    {review.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveReview(review.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => rejectReview(review.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                    {!review.adminReply && (
                      <button
                        onClick={() => setSelectedReview(review.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Reply
                      </button>
                    )}
                    <button
                      onClick={() => updateReview(review.id, { featured: !review.featured })}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                        review.featured
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${review.featured ? 'fill-current' : ''}`} />
                      {review.featured ? 'Featured' : 'Feature'}
                    </button>
                    <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Star className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No {statusFilter !== 'all' && statusFilter} reviews</p>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Reviews</h3>
        <p className="text-sm text-blue-700">
          Moderate customer reviews before they appear on your site. Reply to reviews to engage with customers and build trust. Feature the best reviews to showcase customer satisfaction.
        </p>
      </div>
    </div>
  );
}
