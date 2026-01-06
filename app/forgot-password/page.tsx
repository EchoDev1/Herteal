'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 px-4">
      <div className="container mx-auto max-w-md">
        {/* Back Button */}
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-[#7A916C] hover:text-[#6B8159] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Sign In</span>
        </Link>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-[#7A916C]/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#7A916C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#7A916C]" />
            </div>
            <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-[#2D2D2D]">
              Forgot Password?
            </h1>
            <p className="text-sm text-[#6B6B6B]">
              {emailSent
                ? "Check your email for reset instructions"
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          {emailSent ? (
            <div>
              {/* Success Message */}
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-[#6B6B6B] text-center">
                  Didn't receive the email? Check your spam folder or try again.
                </p>

                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full py-3 px-6 bg-[#7A916C]/10 text-[#7A916C] font-semibold rounded-lg hover:bg-[#7A916C]/20 transition-colors"
                >
                  Try Another Email
                </button>

                <Link
                  href="/signin"
                  className="block w-full py-3 px-6 text-center bg-[#7A916C] text-white font-semibold rounded-lg hover:bg-[#6B8159] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-[#7A916C] text-white font-semibold rounded-lg hover:bg-[#6B8159] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              {/* Back to Sign In */}
              <div className="text-center">
                <Link
                  href="/signin"
                  className="text-sm text-[#7A916C] hover:text-[#6B8159] font-medium transition-colors"
                >
                  Remember your password? Sign in
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#6B6B6B]">
            Need help?{' '}
            <Link href="/complaints" className="text-[#7A916C] hover:text-[#6B8159] font-medium transition-colors">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
