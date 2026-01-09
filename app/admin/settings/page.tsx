'use client';

import { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
}

interface PaymentSettings {
  paystack: boolean;
  flutterwave: boolean;
  opay: boolean;
  bankTransfer: boolean;
}

interface PaymentConfig {
  paystackPublicKey: string;
  paystackSecretKey: string;
  flutterwavePublicKey: string;
  flutterwaveSecretKey: string;
  opayPublicKey: string;
  opaySecretKey: string;
  opayMerchantId: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankName: string;
}

interface EmailSettings {
  orderConfirmation: boolean;
  orderShipped: boolean;
  orderDelivered: boolean;
  newsletter: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'email' | 'advanced'>('general');
  const [saved, setSaved] = useState(false);

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'Herteals',
    siteDescription: 'Luxury Tailored Fashion for Women',
    contactEmail: 'info@herteals.com',
    contactPhone: '+234 800 123 4567',
    address: 'Lagos, Nigeria',
    currency: '₦',
    taxRate: 8,
    shippingFee: 15,
    freeShippingThreshold: 500,
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    paystack: false,
    flutterwave: false,
    opay: false,
    bankTransfer: false,
  });

  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>({
    paystackPublicKey: '',
    paystackSecretKey: '',
    flutterwavePublicKey: '',
    flutterwaveSecretKey: '',
    opayPublicKey: '',
    opaySecretKey: '',
    opayMerchantId: '',
    bankAccountNumber: '',
    bankAccountName: '',
    bankName: '',
  });

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    newsletter: true,
  });

  const handleSaveSettings = () => {
    // Here you would typically save to a database
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Configure your site settings and preferences</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save All Changes
        </button>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-800">
          <AlertCircle className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'general'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'payment'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Payment
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'email'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'advanced'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Advanced
          </button>
        </nav>
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-[#2C5530] mb-4">Site Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={siteSettings.siteName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <input
                  type="text"
                  value={siteSettings.siteDescription}
                  onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={siteSettings.contactPhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <input
                  type="text"
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-[#2C5530] mb-4">Pricing & Shipping</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency Symbol</label>
                  <input
                    type="text"
                    value={siteSettings.currency}
                    onChange={(e) => setSiteSettings({ ...siteSettings, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={siteSettings.taxRate}
                    onChange={(e) => setSiteSettings({ ...siteSettings, taxRate: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Fee (₦)</label>
                  <input
                    type="number"
                    value={siteSettings.shippingFee}
                    onChange={(e) => setSiteSettings({ ...siteSettings, shippingFee: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold (₦)</label>
                  <input
                    type="number"
                    value={siteSettings.freeShippingThreshold}
                    onChange={(e) => setSiteSettings({ ...siteSettings, freeShippingThreshold: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Settings Tab */}
      {activeTab === 'payment' && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#2C5530] mb-4">Payment Methods</h2>
          <p className="text-sm text-gray-600 mb-6">Enable or disable payment methods for your store</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Paystack</h3>
                  <p className="text-sm text-gray-600">Accept card payments via Paystack</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentSettings.paystack}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, paystack: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Flutterwave</h3>
                  <p className="text-sm text-gray-600">Accept payments via Flutterwave</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentSettings.flutterwave}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, flutterwave: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Opay</h3>
                  <p className="text-sm text-gray-600">Accept payments via Opay</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentSettings.opay}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, opay: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏦</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Bank Transfer</h3>
                  <p className="text-sm text-gray-600">Accept bank transfer payments</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentSettings.bankTransfer}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, bankTransfer: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>
          </div>

          {/* Payment Gateway Configuration */}
          <div className="mt-8 space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-[#2C5530] mb-4">Payment Gateway Configuration</h3>
              <p className="text-sm text-gray-600 mb-6">
                Enter your API credentials for each payment gateway. These credentials will be used to process payments securely.
              </p>

              {/* Paystack Configuration */}
              {paymentSettings.paystack && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="text-md font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💳</span>
                    Paystack Configuration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key *
                      </label>
                      <input
                        type="text"
                        value={paymentConfig.paystackPublicKey}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, paystackPublicKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key *
                      </label>
                      <input
                        type="password"
                        value={paymentConfig.paystackSecretKey}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, paystackSecretKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="sk_test_..."
                      />
                    </div>
                    <p className="text-xs text-blue-700">
                      Get your API keys from your{' '}
                      <a href="https://dashboard.paystack.com/#/settings/developer" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                        Paystack Dashboard
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Flutterwave Configuration */}
              {paymentSettings.flutterwave && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                  <h4 className="text-md font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    Flutterwave Configuration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key *
                      </label>
                      <input
                        type="text"
                        value={paymentConfig.flutterwavePublicKey}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, flutterwavePublicKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="FLWPUBK_TEST-..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key *
                      </label>
                      <input
                        type="password"
                        value={paymentConfig.flutterwaveSecretKey}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, flutterwaveSecretKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="FLWSECK_TEST-..."
                      />
                    </div>
                    <p className="text-xs text-orange-700">
                      Get your API keys from your{' '}
                      <a href="https://dashboard.flutterwave.com/settings/apis" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                        Flutterwave Dashboard
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Opay Configuration */}
              {paymentSettings.opay && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <h4 className="text-md font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    Opay Configuration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Merchant ID *
                      </label>
                      <input
                        type="text"
                        value={paymentConfig.opayMerchantId}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, opayMerchantId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="Your Opay Merchant ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key *
                      </label>
                      <input
                        type="text"
                        value={paymentConfig.opayPublicKey}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, opayPublicKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="OPAYPRV..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key *
                      </label>
                      <input
                        type="password"
                        value={paymentConfig.opaySecretKey}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, opaySecretKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="OPAYSEC..."
                      />
                    </div>
                    <p className="text-xs text-purple-700">
                      Get your API credentials from your{' '}
                      <a href="https://merchant.opayweb.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                        Opay Merchant Dashboard
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Bank Transfer Configuration */}
              {paymentSettings.bankTransfer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h4 className="text-md font-bold text-green-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏦</span>
                    Bank Transfer Configuration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Name *
                      </label>
                      <input
                        type="text"
                        value={paymentConfig.bankAccountName}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, bankAccountName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="Herteals Limited"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        value={paymentConfig.bankAccountNumber}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, bankAccountNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="0123456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        value={paymentConfig.bankName}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, bankName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="e.g., Access Bank, GTBank, First Bank"
                      />
                    </div>
                    <p className="text-xs text-green-700">
                      This bank account will be displayed to customers for direct bank transfers.
                    </p>
                  </div>
                </div>
              )}

              {!paymentSettings.paystack && !paymentSettings.flutterwave && !paymentSettings.opay && !paymentSettings.bankTransfer && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    Enable at least one payment method above to configure payment settings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Email Settings Tab */}
      {activeTab === 'email' && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#2C5530] mb-4">Email Notifications</h2>
          <p className="text-sm text-gray-600 mb-6">Manage automated email notifications</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <h3 className="font-medium text-gray-900">Order Confirmation</h3>
                <p className="text-sm text-gray-600">Send email when order is placed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.orderConfirmation}
                  onChange={(e) => setEmailSettings({ ...emailSettings, orderConfirmation: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <h3 className="font-medium text-gray-900">Order Shipped</h3>
                <p className="text-sm text-gray-600">Send email when order is shipped</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.orderShipped}
                  onChange={(e) => setEmailSettings({ ...emailSettings, orderShipped: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <h3 className="font-medium text-gray-900">Order Delivered</h3>
                <p className="text-sm text-gray-600">Send email when order is delivered</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.orderDelivered}
                  onChange={(e) => setEmailSettings({ ...emailSettings, orderDelivered: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <h3 className="font-medium text-gray-900">Newsletter</h3>
                <p className="text-sm text-gray-600">Enable newsletter subscriptions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.newsletter}
                  onChange={(e) => setEmailSettings({ ...emailSettings, newsletter: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A916C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A916C]"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Settings Tab */}
      {activeTab === 'advanced' && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-[#2C5530] mb-4">Advanced Settings</h2>

          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-900 mb-1">Database Connection</h3>
                  <p className="text-sm text-yellow-700">
                    Currently using in-memory storage. Connect a database (MongoDB, PostgreSQL, etc.) for production use.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Authentication</h3>
                  <p className="text-sm text-blue-700">
                    Authentication system requires Supabase configuration. Configure your credentials in .env.local to enable authentication.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-900 mb-1">Payment Integration</h3>
                  <p className="text-sm text-purple-700">
                    Payment gateways need API keys and configuration. Set up Paystack/Flutterwave in production.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-900 mb-1">Email Service</h3>
                  <p className="text-sm text-green-700">
                    Configure email service (SendGrid, Mailgun, etc.) for transactional emails.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
