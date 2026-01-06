'use client';

import { useState } from 'react';
import { CreditCard, Smartphone } from 'lucide-react';

interface PaymentOptionsProps {
  amount: number;
  email: string;
  onSuccess: (reference: string) => void;
  onError: (error: string) => void;
}

export default function PaymentOptions({ amount, email, onSuccess, onError }: PaymentOptionsProps) {
  const [selectedMethod, setSelectedMethod] = useState<'flutterwave' | 'opay' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Flutterwave Payment Integration
  const handleFlutterwavePayment = async () => {
    setIsProcessing(true);

    try {
      // Initialize Flutterwave payment
      // @ts-ignore
      if (typeof FlutterwaveCheckout === 'undefined') {
        throw new Error('Flutterwave SDK not loaded');
      }

      // @ts-ignore
      FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-TEST-XXXXXXXX',
        tx_ref: `herteal-${Date.now()}`,
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,banktransfer,ussd',
        customer: {
          email: email,
          name: email.split('@')[0],
        },
        customizations: {
          title: 'Herteals Payment',
          description: 'Payment for your order',
          logo: '/logo.png',
        },
        callback: function (payment: any) {
          if (payment.status === 'successful') {
            onSuccess(payment.transaction_id);
          } else {
            onError('Payment was not successful');
          }
          setIsProcessing(false);
        },
        onclose: function () {
          setIsProcessing(false);
        },
      });
    } catch (error) {
      onError('Failed to initialize Flutterwave payment');
      setIsProcessing(false);
    }
  };

  // Opay Payment Integration
  const handleOpayPayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/payments/opay/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          email: email,
          reference: `herteal-opay-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Redirect to Opay payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      onError('Failed to initialize Opay payment');
      setIsProcessing(false);
    }
  };

  const handlePayment = () => {
    if (selectedMethod === 'flutterwave') {
      handleFlutterwavePayment();
    } else if (selectedMethod === 'opay') {
      handleOpayPayment();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Select Payment Method</h3>

        {/* Payment Methods */}
        <div className="space-y-3">
          {/* Flutterwave */}
          <button
            onClick={() => setSelectedMethod('flutterwave')}
            className={`w-full p-4 border-2 rounded-lg transition-all ${
              selectedMethod === 'flutterwave'
                ? 'border-[#7A916C] bg-[#7A916C]/5'
                : 'border-[#7A916C]/30 hover:border-[#7A916C]/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6B00] rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-[#2D2D2D]">Flutterwave</h4>
                <p className="text-sm text-[#6B6B6B]">Pay with card, bank transfer, or USSD</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedMethod === 'flutterwave'
                    ? 'border-[#7A916C] bg-[#7A916C]'
                    : 'border-gray-300'
                }`}
              >
                {selectedMethod === 'flutterwave' && (
                  <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>

          {/* Opay */}
          <button
            onClick={() => setSelectedMethod('opay')}
            className={`w-full p-4 border-2 rounded-lg transition-all ${
              selectedMethod === 'opay'
                ? 'border-[#7A916C] bg-[#7A916C]/5'
                : 'border-[#7A916C]/30 hover:border-[#7A916C]/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1DB954] rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-[#2D2D2D]">Opay</h4>
                <p className="text-sm text-[#6B6B6B]">Pay with Opay wallet or card</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedMethod === 'opay' ? 'border-[#7A916C] bg-[#7A916C]' : 'border-gray-300'
                }`}
              >
                {selectedMethod === 'opay' && (
                  <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Amount Summary */}
      <div className="p-4 bg-[#FAF7F0] rounded-lg border border-[#7A916C]/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#6B6B6B]">Amount to pay:</span>
          <span className="text-xl font-bold text-[#7A916C]">₦{amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={!selectedMethod || isProcessing}
        className="w-full py-3 px-6 bg-[#7A916C] text-white font-semibold rounded-lg hover:bg-[#6B8159] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : `Pay ₦${amount.toLocaleString()}`}
      </button>

      {/* Security Note */}
      <p className="text-xs text-center text-[#6B6B6B]">
        🔒 Your payment is secure and encrypted
      </p>
    </div>
  );
}
