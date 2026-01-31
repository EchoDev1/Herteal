'use client';

import { useState } from 'react';
import { Receipt, Save } from 'lucide-react';
import { useTax } from '@/contexts/TaxContext';
import { NIGERIAN_STATES } from '@/contexts/ShippingContext';

export default function TaxSettingsPage() {
  const { settings, isLoaded, updateGlobalSettings, updateRegionalRate } = useTax();
  const [editingState, setEditingState] = useState<string | null>(null);
  const [regionalForm, setRegionalForm] = useState({ rate: '', enabled: true });

  const handleSaveGlobal = (updates: any) => {
    updateGlobalSettings(updates);
  };

  const handleEditRegional = (state: string) => {
    const regional = settings.regional.find(r => r.state === state);
    if (regional) {
      setRegionalForm({ rate: regional.rate.toString(), enabled: regional.enabled });
      setEditingState(state);
    }
  };

  const handleSaveRegional = () => {
    if (!editingState) return;
    updateRegionalRate(editingState, parseFloat(regionalForm.rate), regionalForm.enabled);
    setEditingState(null);
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
          Tax Settings
        </h1>
        <p className="text-gray-600 mt-1">Configure VAT and tax rates</p>
      </div>

      {/* Global Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4 flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Global Tax Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.global.enabled}
                onChange={(e) => handleSaveGlobal({ enabled: e.target.checked })}
                className="w-5 h-5 text-[#7A916C] border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">Enable Tax</span>
                <p className="text-xs text-gray-500">Calculate and apply tax to orders</p>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Label
              </label>
              <input
                type="text"
                value={settings.global.taxLabel}
                onChange={(e) => handleSaveGlobal({ taxLabel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.global.defaultRate}
                onChange={(e) => handleSaveGlobal({ defaultRate: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Nigerian VAT is 7.5%</p>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.global.pricesIncludeTax}
                onChange={(e) => handleSaveGlobal({ pricesIncludeTax: e.target.checked })}
                className="w-5 h-5 text-[#7A916C] border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">Prices Include Tax</span>
                <p className="text-xs text-gray-500">Product prices already include tax</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Regional Tax Rates */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-[#2C5530] mb-4">Regional Tax Rates</h2>
        <p className="text-sm text-gray-600 mb-4">
          Configure specific tax rates for each Nigerian state
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {settings.regional.map(regional => (
            <div
              key={regional.state}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{regional.state}</p>
                {editingState === regional.state ? (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      step="0.01"
                      value={regionalForm.rate}
                      onChange={(e) => setRegionalForm({ ...regionalForm, rate: e.target.value })}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded text-gray-900"
                    />
                    <span className="text-sm text-gray-600">%</span>
                    <button
                      onClick={handleSaveRegional}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-600">{regional.rate}%</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={regional.enabled}
                    onChange={(e) => updateRegionalRate(regional.state, regional.rate, e.target.checked)}
                    className="w-4 h-4 text-[#7A916C] border-gray-300 rounded"
                  />
                </label>
                <button
                  onClick={() => handleEditRegional(regional.state)}
                  className="text-sm text-[#7A916C] hover:text-[#6B8159]"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">About Tax Settings</h3>
        <p className="text-sm text-blue-700">
          Nigerian VAT (Value Added Tax) is currently 7.5%. Configure regional rates if specific states have different tax requirements. Tax calculations are applied automatically at checkout.
        </p>
      </div>
    </div>
  );
}
