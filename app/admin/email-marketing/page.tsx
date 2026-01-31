'use client';

import { useState } from 'react';
import { Mail, Plus, Edit, Trash2, Send, Users, Calendar, Eye } from 'lucide-react';
import { useEmailMarketing } from '@/contexts/EmailMarketingContext';
import { format } from 'date-fns';

export default function EmailMarketingPage() {
  const {
    subscribers,
    campaigns,
    isLoaded,
    addSubscriber,
    updateSubscriber,
    unsubscribe,
    addCampaign,
    updateCampaign,
    deleteCampaign,
  } = useEmailMarketing();

  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns'>('campaigns');
  const [showSubscriberForm, setShowSubscriberForm] = useState(false);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [subscriberForm, setSubscriberForm] = useState({ email: '', name: '' });
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    subject: '',
    content: '',
    recipients: 'all' as 'all' | 'customers' | 'segment',
    scheduledAt: '',
  });

  const handleAddSubscriber = () => {
    if (!subscriberForm.email) {
      alert('Email is required');
      return;
    }
    addSubscriber({ email: subscriberForm.email, name: subscriberForm.name || undefined, source: 'manual' });
    setSubscriberForm({ email: '', name: '' });
    setShowSubscriberForm(false);
  };

  const handleSubmitCampaign = () => {
    if (!campaignForm.name || !campaignForm.subject || !campaignForm.content) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingCampaign) {
      updateCampaign(editingCampaign.id, campaignForm);
    } else {
      addCampaign(campaignForm);
    }

    setCampaignForm({ name: '', subject: '', content: '', recipients: 'all', scheduledAt: '' });
    setEditingCampaign(null);
    setShowCampaignForm(false);
  };

  const handleEditCampaign = (campaign: any) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      name: campaign.name,
      subject: campaign.subject,
      content: campaign.content,
      recipients: campaign.recipients,
      scheduledAt: campaign.scheduledAt ? campaign.scheduledAt.split('T')[0] : '',
    });
    setShowCampaignForm(true);
  };

  const stats = {
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter(s => s.status === 'active').length,
    totalCampaigns: campaigns.length,
    sentCampaigns: campaigns.filter(c => c.status === 'sent').length,
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
            Email Marketing
          </h1>
          <p className="text-gray-600 mt-1">Manage subscribers and email campaigns</p>
        </div>
        <button
          onClick={() => {
            if (activeTab === 'subscribers') {
              setShowSubscriberForm(true);
            } else {
              setEditingCampaign(null);
              setCampaignForm({ name: '', subject: '', content: '', recipients: 'all', scheduledAt: '' });
              setShowCampaignForm(true);
            }
          }}
          className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {activeTab === 'subscribers' ? 'Add Subscriber' : 'Create Campaign'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Subscribers</p>
          <p className="text-2xl font-bold text-[#2C5530]">{stats.totalSubscribers}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Active</p>
          <p className="text-2xl font-bold text-green-900">{stats.activeSubscribers}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-sm text-blue-800">Total Campaigns</p>
          <p className="text-2xl font-bold text-blue-900">{stats.totalCampaigns}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-md p-4 border border-purple-200">
          <p className="text-sm text-purple-800">Sent</p>
          <p className="text-2xl font-bold text-purple-900">{stats.sentCampaigns}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'campaigns'
                ? 'bg-[#7A916C] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'subscribers'
                ? 'bg-[#7A916C] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Subscribers
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'campaigns' ? (
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2C5530] mb-1">{campaign.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Subject: {campaign.subject}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {campaign.recipients === 'all' ? 'All Subscribers' :
                   campaign.recipients === 'customers' ? 'Customers Only' : 'Segment'}
                </span>
                {campaign.scheduledAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(campaign.scheduledAt), 'MMM d, yyyy')}
                  </span>
                )}
                {campaign.sentAt && (
                  <span className="flex items-center gap-1">
                    <Send className="w-4 h-4" />
                    Sent {format(new Date(campaign.sentAt), 'MMM d, yyyy')}
                  </span>
                )}
              </div>

              {campaign.status === 'sent' && (
                <div className="flex gap-6 p-3 bg-gray-50 rounded-lg mb-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Sent</p>
                    <p className="text-lg font-bold text-gray-900">{campaign.stats.sent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Opened</p>
                    <p className="text-lg font-bold text-green-700">{campaign.stats.opened}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Clicked</p>
                    <p className="text-lg font-bold text-blue-700">{campaign.stats.clicked}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {campaign.status === 'draft' && (
                  <>
                    <button
                      onClick={() => handleEditCampaign(campaign)}
                      className="px-3 py-1.5 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] text-sm flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCampaign(campaign.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {campaigns.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No campaigns created yet</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Subscribed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map(subscriber => (
                <tr key={subscriber.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{subscriber.name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {subscriber.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {format(new Date(subscriber.subscribedAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      {subscriber.status === 'active' ? (
                        <button
                          onClick={() => updateSubscriber(subscriber.id, { status: 'unsubscribed' })}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Unsubscribe
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSubscriber(subscriber.id, { status: 'active' })}
                          className="text-green-600 hover:text-green-800 text-xs"
                        >
                          Reactivate
                        </button>
                      )}
                      <button
                        onClick={() => unsubscribe(subscriber.email)}
                        className="text-gray-600 hover:text-gray-800 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {subscribers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No subscribers yet</p>
            </div>
          )}
        </div>
      )}

      {/* Subscriber Form Modal */}
      {showSubscriberForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#2C5530]">Add Subscriber</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={subscriberForm.email}
                  onChange={(e) => setSubscriberForm({ ...subscriberForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={subscriberForm.name}
                  onChange={(e) => setSubscriberForm({ ...subscriberForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowSubscriberForm(false);
                    setSubscriberForm({ email: '', name: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubscriber}
                  className="flex-1 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Form Modal */}
      {showCampaignForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#2C5530]">
                {editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
              </h2>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Subject *</label>
                <input
                  type="text"
                  value={campaignForm.subject}
                  onChange={(e) => setCampaignForm({ ...campaignForm, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Content *</label>
                <textarea
                  value={campaignForm.content}
                  onChange={(e) => setCampaignForm({ ...campaignForm, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <select
                    value={campaignForm.recipients}
                    onChange={(e) => setCampaignForm({ ...campaignForm, recipients: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  >
                    <option value="all">All Subscribers</option>
                    <option value="customers">Customers Only</option>
                    <option value="segment">Specific Segment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
                  <input
                    type="date"
                    value={campaignForm.scheduledAt}
                    onChange={(e) => setCampaignForm({ ...campaignForm, scheduledAt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCampaignForm(false);
                    setEditingCampaign(null);
                    setCampaignForm({ name: '', subject: '', content: '', recipients: 'all', scheduledAt: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitCampaign}
                  className="flex-1 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159]"
                >
                  {editingCampaign ? 'Update' : 'Create'} Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Email Marketing</h3>
        <p className="text-sm text-blue-700">
          Build your subscriber list and create engaging email campaigns. Send newsletters, promotional offers, and updates to keep customers informed and engaged.
        </p>
      </div>
    </div>
  );
}
