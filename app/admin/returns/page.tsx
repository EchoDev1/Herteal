'use client';

import { useState } from 'react';
import { RotateCcw, CheckCircle, XCircle, Package, DollarSign, MessageSquare, Eye } from 'lucide-react';
import { useReturns } from '@/contexts/ReturnsContext';
import { format } from 'date-fns';

export default function ReturnsPage() {
  const { returns, isLoaded, updateReturn, approveReturn, rejectReturn, markAsReceived, processRefund } = useReturns();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'item_received' | 'refunded'>('pending');
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [viewingImages, setViewingImages] = useState<string[] | null>(null);

  const filteredReturns = returns.filter(r => statusFilter === 'all' || r.status === statusFilter);

  const handleStatusUpdate = (id: string, status: string) => {
    switch (status) {
      case 'approved': approveReturn(id); break;
      case 'rejected': rejectReturn(id); break;
      case 'item_received': markAsReceived(id); break;
      case 'refunded': processRefund(id); break;
      default: updateReturn(id, { status: status as 'pending' | 'approved' | 'rejected' | 'item_received' | 'refunded' });
    }
  };

  const handleAddNote = () => {
    if (!selectedReturn || !adminNote) return;
    updateReturn(selectedReturn, { adminNotes: adminNote });
    setAdminNote('');
    setSelectedReturn(null);
  };

  const stats = {
    total: returns.length,
    pending: returns.filter(r => r.status === 'pending').length,
    approved: returns.filter(r => r.status === 'approved').length,
    refunded: returns.filter(r => r.status === 'refunded').length,
    totalRefunds: returns
      .filter(r => r.status === 'refunded')
      .reduce((sum, r) => sum + r.refundAmount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'item_received': return 'bg-purple-100 text-purple-800';
      case 'refunded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'item_received': return 'Item Received';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

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
          Returns & Refunds
        </h1>
        <p className="text-gray-600 mt-1">Manage customer return requests and refunds</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Returns</p>
          <p className="text-2xl font-bold text-[#2C5530]">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <p className="text-sm text-yellow-800">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-sm text-blue-800">Approved</p>
          <p className="text-2xl font-bold text-blue-900">{stats.approved}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Refunded</p>
          <p className="text-2xl font-bold text-green-900">{stats.refunded}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-md p-4 border border-purple-200">
          <p className="text-sm text-purple-800">Total Refunds</p>
          <p className="text-2xl font-bold text-purple-900">₦{stats.totalRefunds.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'approved', 'rejected', 'item_received', 'refunded'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                statusFilter === status
                  ? 'bg-[#7A916C] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Returns List */}
      <div className="space-y-4">
        {filteredReturns.map(returnRequest => (
          <div key={returnRequest.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-[#2C5530]">
                      Return Request #{returnRequest.id.slice(0, 8)}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(returnRequest.status)}`}>
                      {getStatusLabel(returnRequest.status)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Customer:</span> {returnRequest.customerName}
                    </p>
                    <p>
                      <span className="font-medium">Order:</span> #{returnRequest.orderId.slice(0, 8)}
                    </p>
                    <p>
                      <span className="font-medium">Product:</span> {returnRequest.productName}
                    </p>
                    <p>
                      <span className="font-medium">Requested:</span>{' '}
                      {format(new Date(returnRequest.requestedAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Refund Amount</p>
                  <p className="text-2xl font-bold text-[#2C5530]">₦{returnRequest.refundAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {returnRequest.refundMethod === 'original' ? 'Original Payment' : 'Store Credit'}
                  </p>
                </div>
              </div>

              {/* Return Reason */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-1">Return Reason</p>
                <p className="text-sm text-gray-900 font-medium">{returnRequest.reason}</p>
                {returnRequest.reasonDetails && (
                  <p className="text-sm text-gray-600 mt-1">{returnRequest.reasonDetails}</p>
                )}
              </div>

              {/* Images */}
              {returnRequest.images && returnRequest.images.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Attached Images</p>
                  <div className="flex gap-2">
                    {returnRequest.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setViewingImages(returnRequest.images || null)}
                        className="relative group"
                      >
                        <img src={img} alt="" className="w-20 h-20 object-cover rounded border border-gray-200" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              {returnRequest.adminNotes && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-medium text-blue-900 mb-1">Admin Notes:</p>
                  <p className="text-sm text-blue-800">{returnRequest.adminNotes}</p>
                </div>
              )}

              {/* Add Note Form */}
              {selectedReturn === returnRequest.id && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Add internal notes..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] text-sm"
                    >
                      Save Note
                    </button>
                    <button
                      onClick={() => {
                        setSelectedReturn(null);
                        setAdminNote('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Workflow Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                {returnRequest.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(returnRequest.id, 'approved')}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(returnRequest.id, 'rejected')}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}

                {returnRequest.status === 'approved' && (
                  <button
                    onClick={() => handleStatusUpdate(returnRequest.id, 'item_received')}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center gap-1"
                  >
                    <Package className="w-4 h-4" />
                    Mark as Received
                  </button>
                )}

                {returnRequest.status === 'item_received' && (
                  <button
                    onClick={() => handleStatusUpdate(returnRequest.id, 'refunded')}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-1"
                  >
                    <DollarSign className="w-4 h-4" />
                    Process Refund
                  </button>
                )}

                {!returnRequest.adminNotes && returnRequest.status !== 'refunded' && (
                  <button
                    onClick={() => setSelectedReturn(returnRequest.id)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm flex items-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Add Note
                  </button>
                )}

                {returnRequest.processedAt && (
                  <div className="ml-auto text-xs text-gray-500">
                    Processed: {format(new Date(returnRequest.processedAt), 'MMM d, yyyy')}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReturns.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <RotateCcw className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No {statusFilter !== 'all' && statusFilter} return requests</p>
        </div>
      )}

      {/* Image Viewer Modal */}
      {viewingImages && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setViewingImages(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <XCircle className="w-8 h-8" />
            </button>
            <div className="flex gap-4 overflow-x-auto">
              {viewingImages.map((img, idx) => (
                <img key={idx} src={img} alt="" className="max-h-[80vh] object-contain" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Return Workflow</h3>
        <p className="text-sm text-blue-700">
          <span className="font-medium">Pending</span> → Review and approve/reject →{' '}
          <span className="font-medium">Approved</span> → Wait for item →{' '}
          <span className="font-medium">Item Received</span> → Process refund →{' '}
          <span className="font-medium">Refunded</span>
        </p>
      </div>
    </div>
  );
}
