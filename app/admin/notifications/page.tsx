'use client';

import { useState } from 'react';
import { Bell, Mail, Smartphone, Eye, Edit, Save, Send } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationsContext';
import { format } from 'date-fns';

export default function NotificationsPage() {
  const { templates, logs, isLoaded, updateTemplate, sendNotification } = useNotifications();
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState({
    subject: '',
    content: '',
    enabled: true,
    channels: [] as ('email' | 'sms' | 'push' | 'in_app')[],
  });
  const [testEmail, setTestEmail] = useState('');

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template.id);
    setTemplateForm({
      subject: template.subject,
      content: template.content,
      enabled: template.enabled,
      channels: template.channels,
    });
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    updateTemplate(editingTemplate, templateForm);
    setEditingTemplate(null);
    setTemplateForm({ subject: '', content: '', enabled: true, channels: [] });
  };

  const handleToggleChannel = (channel: 'email' | 'sms' | 'push' | 'in_app') => {
    setTemplateForm({
      ...templateForm,
      channels: templateForm.channels.includes(channel)
        ? templateForm.channels.filter(c => c !== channel)
        : [...templateForm.channels, channel],
    });
  };

  const handleSendTest = (templateId: string) => {
    if (!testEmail) {
      alert('Please enter an email address');
      return;
    }
    sendNotification(templateId, testEmail, 'email', {});
    alert('Test notification sent!');
    setTestEmail('');
  };

  const insertVariable = (variable: string) => {
    setTemplateForm({
      ...templateForm,
      content: templateForm.content + `{{${variable}}}`,
    });
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'push': return <Bell className="w-4 h-4" />;
      case 'in_app': return <Eye className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
          Notifications Center
        </h1>
        <p className="text-gray-600 mt-1">Manage notification templates and delivery settings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Templates</p>
          <p className="text-2xl font-bold text-[#2C5530]">{templates.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200">
          <p className="text-sm text-green-800">Active</p>
          <p className="text-2xl font-bold text-green-900">
            {templates.filter(t => t.enabled).length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-sm text-blue-800">Sent Today</p>
          <p className="text-2xl font-bold text-blue-900">
            {logs.filter(l => {
              const today = new Date().toDateString();
              return new Date(l.sentAt).toDateString() === today && l.status === 'sent';
            }).length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg shadow-md p-4 border border-red-200">
          <p className="text-sm text-red-800">Failed Today</p>
          <p className="text-2xl font-bold text-red-900">
            {logs.filter(l => {
              const today = new Date().toDateString();
              return new Date(l.sentAt).toDateString() === today && l.status === 'failed';
            }).length}
          </p>
        </div>
      </div>

      {/* Notification Templates */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#2C5530]">Notification Templates</h2>

        {templates.map(template => {
          const isEditing = editingTemplate === template.id;

          return (
            <div key={template.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#2C5530]">{template.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {template.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {template.channels.map(channel => (
                        <span key={channel} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                          {getChannelIcon(channel)}
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="p-2 text-[#7A916C] hover:bg-gray-100 rounded"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    {/* Channels */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notification Channels
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['email', 'sms', 'push', 'in_app'] as const).map(channel => (
                          <button
                            key={channel}
                            onClick={() => handleToggleChannel(channel)}
                            className={`px-3 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                              templateForm.channels.includes(channel)
                                ? 'bg-[#7A916C] text-white border-[#7A916C]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#7A916C]'
                            }`}
                          >
                            {getChannelIcon(channel)}
                            <span className="text-sm">{channel}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={templateForm.subject}
                        onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        value={templateForm.content}
                        onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                      />
                    </div>

                    {/* Variables */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insert Variables
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {template.variables.map(variable => (
                          <button
                            key={variable}
                            onClick={() => insertVariable(variable)}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 font-mono"
                          >
                            {`{{${variable}}}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Enabled Toggle */}
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={templateForm.enabled}
                          onChange={(e) => setTemplateForm({ ...templateForm, enabled: e.target.checked })}
                          className="w-4 h-4 text-[#7A916C] border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Enable this notification</span>
                      </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={handleSaveTemplate}
                        className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setEditingTemplate(null);
                          setTemplateForm({ subject: '', content: '', enabled: true, channels: [] });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700">Subject:</p>
                      <p className="text-sm text-gray-900">{template.subject}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700">Content:</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{template.content}</p>
                    </div>

                    {/* Test Notification */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <input
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="Enter email to test..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
                      />
                      <button
                        onClick={() => handleSendTest(template.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                      >
                        <Send className="w-4 h-4" />
                        Send Test
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification Logs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#2C5530]">Recent Notifications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Sent At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.slice(0, 10).map(log => {
                const template = templates.find(t => t.id === log.templateId);
                return (
                  <tr key={log.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {template?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.recipient}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-700">
                        {getChannelIcon(log.channel)}
                        {log.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(log.sentAt), 'MMM d, yyyy h:mm a')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {logs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No notifications sent yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Notifications</h3>
        <p className="text-sm text-blue-700">
          Configure notification templates for automated customer communications. Use variables like {`{{customer_name}}`} and {`{{order_id}}`} to personalize messages. Enable or disable notifications by channel (email, SMS, push, in-app).
        </p>
      </div>
    </div>
  );
}
