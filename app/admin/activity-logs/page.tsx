'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Download, Trash2, Eye, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useActivityLogs, ActivityLog } from '@/contexts/ActivityLogsContext';
import { format } from 'date-fns';

export default function ActivityLogsPage() {
  const { logs, isLoaded, clearLogs } = useActivityLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch =
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEntityType = entityTypeFilter === 'all' || log.entityType === entityTypeFilter;
      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;

      return matchesSearch && matchesEntityType && matchesSeverity;
    });
  }, [logs, searchTerm, entityTypeFilter, severityFilter]);

  const getSeverityIcon = (severity: ActivityLog['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: ActivityLog['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Date/Time', 'User', 'Action', 'Entity Type', 'Entity Name', 'Severity'];
    const csvData = filteredLogs.map(log => [
      log.id,
      format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      log.userName,
      log.action,
      log.entityType,
      log.entityName,
      log.severity,
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `activity-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const handleViewDetails = (log: ActivityLog) => {
    setSelectedLog(log);
    setIsDetailModalOpen(true);
  };

  const stats = {
    total: logs.length,
    critical: logs.filter(l => l.severity === 'critical').length,
    warning: logs.filter(l => l.severity === 'warning').length,
    info: logs.filter(l => l.severity === 'info').length,
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
            Activity Logs
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Track all admin actions and system changes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={clearLogs}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Logs</p>
          <p className="text-2xl font-bold text-[#2C5530]">{stats.total}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow-md p-4 border border-red-200">
          <p className="text-sm text-red-800">Critical</p>
          <p className="text-2xl font-bold text-red-900">{stats.critical}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-md p-4 border border-yellow-200">
          <p className="text-sm text-yellow-800">Warnings</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.warning}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 border border-blue-200">
          <p className="text-sm text-blue-800">Info</p>
          <p className="text-2xl font-bold text-blue-900">{stats.info}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs by action, user, entity..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={entityTypeFilter}
              onChange={(e) => setEntityTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white"
            >
              <option value="all">All Entities</option>
              <option value="product">Product</option>
              <option value="order">Order</option>
              <option value="user">User</option>
              <option value="collection">Collection</option>
              <option value="blog">Blog</option>
              <option value="setting">Setting</option>
              <option value="discount">Discount</option>
              <option value="shipping">Shipping</option>
              <option value="tax">Tax</option>
              <option value="return">Return</option>
              <option value="review">Review</option>
              <option value="other">Other</option>
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent text-gray-900 bg-white"
            >
              <option value="all">All Severity</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {format(new Date(log.timestamp), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(log.timestamp), 'HH:mm:ss')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                    <div className="text-xs text-gray-500">{log.userId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.action}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.entityName}</div>
                    <div className="text-xs text-gray-500">
                      {log.entityType} • {log.entityId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                      {getSeverityIcon(log.severity)}
                      {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleViewDetails(log)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm || entityTypeFilter !== 'all' || severityFilter !== 'all' ? (
              <div>
                <p className="text-lg font-medium">No logs found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium">No activity logs yet</p>
                <p className="text-sm mt-1">Activity logs will appear here as admin actions are performed</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {isDetailModalOpen && selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-2 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full my-8">
            <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-lg">
              <h2 className="text-2xl font-bold text-[#2C5530]">Activity Log Details</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Log Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Log ID</p>
                  <p className="text-sm font-mono font-medium text-gray-900">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Timestamp</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(selectedLog.timestamp), 'MMM d, yyyy HH:mm:ss')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">User</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLog.userName}</p>
                  <p className="text-xs text-gray-500">{selectedLog.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Severity</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedLog.severity)}`}>
                    {getSeverityIcon(selectedLog.severity)}
                    {selectedLog.severity.charAt(0).toUpperCase() + selectedLog.severity.slice(1)}
                  </span>
                </div>
              </div>

              {/* Action Info */}
              <div>
                <h3 className="text-lg font-bold text-[#2C5530] mb-3">Action Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Action</p>
                    <p className="font-medium text-gray-900">{selectedLog.action}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entity Type</p>
                    <p className="font-medium text-gray-900">{selectedLog.entityType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entity Name</p>
                    <p className="font-medium text-gray-900">{selectedLog.entityName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entity ID</p>
                    <p className="font-mono text-sm text-gray-900">{selectedLog.entityId}</p>
                  </div>
                </div>
              </div>

              {/* Changes */}
              {selectedLog.changes && selectedLog.changes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#2C5530] mb-3">Changes Made</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {selectedLog.changes.map((change, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                        <p className="text-sm font-semibold text-gray-700 mb-2">{change.field}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Old Value</p>
                            <p className="text-sm bg-red-50 border border-red-200 rounded px-2 py-1 text-red-900 font-mono">
                              {change.oldValue !== null && change.oldValue !== undefined
                                ? JSON.stringify(change.oldValue)
                                : '<empty>'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">New Value</p>
                            <p className="text-sm bg-green-50 border border-green-200 rounded px-2 py-1 text-green-900 font-mono">
                              {change.newValue !== null && change.newValue !== undefined
                                ? JSON.stringify(change.newValue)
                                : '<empty>'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Info */}
              {(selectedLog.ipAddress || selectedLog.userAgent) && (
                <div>
                  <h3 className="text-lg font-bold text-[#2C5530] mb-3">Technical Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {selectedLog.ipAddress && (
                      <div>
                        <p className="text-sm text-gray-600">IP Address</p>
                        <p className="font-mono text-sm text-gray-900">{selectedLog.ipAddress}</p>
                      </div>
                    )}
                    {selectedLog.userAgent && (
                      <div>
                        <p className="text-sm text-gray-600">User Agent</p>
                        <p className="font-mono text-xs text-gray-900 break-all">{selectedLog.userAgent}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end rounded-b-lg">
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
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Activity Logs</h3>
        <p className="text-sm text-blue-700">
          Activity logs track all administrative actions performed in the system. This includes creating, updating, and deleting products, orders, users, and other entities. Logs are automatically generated and cannot be edited to maintain audit integrity.
        </p>
      </div>
    </div>
  );
}
