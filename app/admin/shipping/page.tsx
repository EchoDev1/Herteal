'use client';

import { useState } from 'react';
import { Truck, Edit, Save, X } from 'lucide-react';
import { useShipping, NIGERIAN_STATES } from '@/contexts/ShippingContext';

export default function ShippingManagementPage() {
  const { zones, isLoaded, updateMethod } = useShipping();
  const [editingMethod, setEditingMethod] = useState<{ zoneId: string; methodId: string } | null>(null);
  const [methodForm, setMethodForm] = useState({
    baseRate: '',
    perKgRate: '',
    estimatedDays: { min: '', max: '' },
    enabled: true,
  });

  const handleEditMethod = (zoneId: string, methodId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    const method = zone?.methods.find(m => m.id === methodId);
    if (method) {
      setMethodForm({
        baseRate: method.baseRate.toString(),
        perKgRate: method.perKgRate?.toString() || '',
        estimatedDays: {
          min: method.estimatedDays.min.toString(),
          max: method.estimatedDays.max.toString(),
        },
        enabled: method.enabled,
      });
      setEditingMethod({ zoneId, methodId });
    }
  };

  const handleSaveMethod = () => {
    if (!editingMethod) return;

    updateMethod(editingMethod.zoneId, editingMethod.methodId, {
      baseRate: parseFloat(methodForm.baseRate),
      perKgRate: methodForm.perKgRate ? parseFloat(methodForm.perKgRate) : undefined,
      estimatedDays: {
        min: parseInt(methodForm.estimatedDays.min),
        max: parseInt(methodForm.estimatedDays.max),
      },
      enabled: methodForm.enabled,
    });

    setEditingMethod(null);
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
          Shipping Management
        </h1>
        <p className="text-gray-600 mt-1">Configure shipping zones and rates for Nigeria</p>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Nigerian Shipping Zones</h3>
        <p className="text-sm text-blue-700">
          Pre-configured shipping zones for all 37 Nigerian states. Adjust rates and delivery times for each zone and shipping method.
        </p>
      </div>

      {/* Shipping Zones */}
      <div className="space-y-4">
        {zones.map(zone => (
          <div key={zone.id} className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#2C5530] flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    {zone.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {zone.states.join(', ')}
                  </p>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {zone.states.length} state{zone.states.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Shipping Methods</h4>
              <div className="space-y-3">
                {zone.methods.map(method => (
                  <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                    {editingMethod?.zoneId === zone.id && editingMethod?.methodId === method.id ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900">{method.name}</h5>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveMethod}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingMethod(null)}
                              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Base Rate (₦)
                            </label>
                            <input
                              type="number"
                              value={methodForm.baseRate}
                              onChange={(e) => setMethodForm({ ...methodForm, baseRate: e.target.value })}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Per Kg Rate (₦)
                            </label>
                            <input
                              type="number"
                              value={methodForm.perKgRate}
                              onChange={(e) => setMethodForm({ ...methodForm, perKgRate: e.target.value })}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Min Days
                            </label>
                            <input
                              type="number"
                              value={methodForm.estimatedDays.min}
                              onChange={(e) => setMethodForm({
                                ...methodForm,
                                estimatedDays: { ...methodForm.estimatedDays, min: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Max Days
                            </label>
                            <input
                              type="number"
                              value={methodForm.estimatedDays.max}
                              onChange={(e) => setMethodForm({
                                ...methodForm,
                                estimatedDays: { ...methodForm.estimatedDays, max: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-900"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={methodForm.enabled}
                            onChange={(e) => setMethodForm({ ...methodForm, enabled: e.target.checked })}
                            className="w-4 h-4 text-[#7A916C] border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Enabled</span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{method.name}</h5>
                          <div className="flex gap-4 mt-1 text-sm text-gray-600">
                            <span>₦{method.baseRate.toLocaleString()}</span>
                            {method.perKgRate && <span>+ ₦{method.perKgRate}/kg</span>}
                            <span>{method.estimatedDays.min}-{method.estimatedDays.max} days</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            method.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {method.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => handleEditMethod(zone.id, method.id)}
                            className="p-1.5 text-[#7A916C] hover:bg-gray-100 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All States List */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-[#2C5530] mb-4">All Nigerian States</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {NIGERIAN_STATES.map(state => (
            <div key={state} className="px-3 py-2 bg-gray-50 rounded text-sm text-gray-700">
              {state}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
