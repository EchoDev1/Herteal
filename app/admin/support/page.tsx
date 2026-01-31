'use client';

import { useState } from 'react';
import { MessageSquare, Send, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useSupport } from '@/contexts/SupportContext';
import { format } from 'date-fns';

export default function SupportPage() {
  const { tickets, isLoaded, updateTicket, addMessage, addInternalNote } = useSupport();
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved' | 'closed'>('open');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [internalNote, setInternalNote] = useState('');

  const filteredTickets = tickets.filter(t => statusFilter === 'all' || t.status === statusFilter);
  const activeTicket = tickets.find(t => t.id === selectedTicket);

  const handleSendReply = () => {
    if (!selectedTicket || !replyMessage) return;
    addMessage(selectedTicket, { from: 'admin', message: replyMessage, adminName: 'Admin' });
    setReplyMessage('');
  };

  const handleAddNote = () => {
    if (!selectedTicket || !internalNote) return;
    addInternalNote(selectedTicket, internalNote, 'Admin');
    setInternalNote('');
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product': return '📦';
      case 'order': return '🛒';
      case 'technical': return '⚙️';
      case 'general': return '💬';
      default: return '💬';
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
          Support Tickets
        </h1>
        <p className="text-gray-600 mt-1">Manage customer support requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Tickets</p>
          <p className="text-2xl font-bold text-[#2C5530]">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-sm text-blue-800">Open</p>
          <p className="text-2xl font-bold text-blue-900">{stats.open}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <p className="text-sm text-yellow-800">In Progress</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.inProgress}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Resolved</p>
          <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {(['all', 'open', 'in_progress', 'resolved', 'closed'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                statusFilter === status
                  ? 'bg-[#7A916C] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`bg-white rounded-lg shadow-md p-4 border cursor-pointer transition-all ${
                selectedTicket === ticket.id
                  ? 'border-[#7A916C] ring-2 ring-[#7A916C]/20'
                  : 'border-gray-200 hover:border-[#7A916C]/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getCategoryIcon(ticket.category)}</span>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {ticket.subject}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600">{ticket.customerName}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(ticket.priority)} border`}>
                  {ticket.priority}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status === 'in_progress' ? 'In Progress' : ticket.status}
                </span>
                <span>{format(new Date(ticket.createdAt), 'MMM d')}</span>
              </div>
            </div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm">No {statusFilter !== 'all' && statusFilter} tickets</p>
            </div>
          )}
        </div>

        {/* Ticket Detail */}
        <div className="lg:col-span-2">
          {activeTicket ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              {/* Ticket Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getCategoryIcon(activeTicket.category)}</span>
                      <h2 className="text-xl font-bold text-[#2C5530]">{activeTicket.subject}</h2>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {activeTicket.customerName}
                      </span>
                      <span>{activeTicket.customerEmail}</span>
                      <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(activeTicket.status)}`}>
                        {activeTicket.status === 'in_progress' ? 'In Progress' : activeTicket.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded border font-medium text-sm ${getPriorityColor(activeTicket.priority)}`}>
                      {activeTicket.priority} priority
                    </span>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(new Date(activeTicket.createdAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex gap-2">
                  {activeTicket.status === 'open' && (
                    <button
                      onClick={() => updateTicket(activeTicket.id, { status: 'in_progress' })}
                      className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                    >
                      Start Working
                    </button>
                  )}
                  {activeTicket.status === 'in_progress' && (
                    <button
                      onClick={() => updateTicket(activeTicket.id, { status: 'resolved' })}
                      className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Resolved
                    </button>
                  )}
                  {activeTicket.status === 'resolved' && (
                    <button
                      onClick={() => updateTicket(activeTicket.id, { status: 'closed' })}
                      className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                    >
                      Close Ticket
                    </button>
                  )}
                  <select
                    value={activeTicket.priority}
                    onChange={(e) => updateTicket(activeTicket.id, { priority: e.target.value as any })}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Messages Timeline */}
              <div className="p-6 max-h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {activeTicket.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${
                        msg.from === 'admin'
                          ? 'bg-[#7A916C] text-white'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg p-4`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {msg.from === 'admin' ? msg.adminName || 'Admin' : activeTicket.customerName}
                          </span>
                          <span className={`text-xs ${msg.from === 'admin' ? 'text-white/70' : 'text-gray-500'}`}>
                            {format(new Date(msg.timestamp), 'h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              {activeTicket.internalNotes && activeTicket.internalNotes.length > 0 && (
                <div className="px-6 pb-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-yellow-900 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Internal Notes (Not visible to customer)
                    </h4>
                    <div className="space-y-2">
                      {activeTicket.internalNotes.map((note, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="text-yellow-900">{note.note}</p>
                          <p className="text-xs text-yellow-700 mt-1">
                            {note.adminName} - {format(new Date(note.timestamp), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reply Form */}
              <div className="p-6 border-t border-gray-200 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reply to Customer</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                  <button
                    onClick={handleSendReply}
                    className="mt-2 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] flex items-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Send Reply
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Internal Note</label>
                  <textarea
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Internal note (not visible to customer)..."
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                  <button
                    onClick={handleAddNote}
                    className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Response Time Info */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {activeTicket.firstResponseAt && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      First response: {format(new Date(activeTicket.firstResponseAt), 'MMM d, h:mm a')}
                    </span>
                  )}
                  {activeTicket.resolvedAt && (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Resolved: {format(new Date(activeTicket.resolvedAt), 'MMM d, h:mm a')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Select a ticket to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Support Tickets</h3>
        <p className="text-sm text-blue-700">
          Manage customer support requests efficiently. Track response times, add internal notes, and update ticket status as you work through customer issues.
        </p>
      </div>
    </div>
  );
}
