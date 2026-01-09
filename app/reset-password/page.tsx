'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updatePassword, isSupabaseEnabled } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { error: updateError } = await updatePassword(password);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccess(true);

      // Redirect to signin after 2 seconds
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
      setIsLoading(false);
    }
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

        {/* Reset Password Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-[#7A916C]/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#7A916C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#7A916C]" />
            </div>
            <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-[#2D2D2D]">
              Reset Password
            </h1>
            <p className="text-sm text-[#6B6B6B]">
              Enter your new password below
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Password reset successfully!</p>
                <p className="text-xs text-green-700">Redirecting to sign in...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Reset Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                New Password *
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all disabled:bg-gray-100"
                placeholder="At least 6 characters"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all disabled:bg-gray-100"
                placeholder="Re-enter password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full py-3 px-6 bg-[#7A916C] text-white font-semibold rounded-lg hover:bg-[#6B8159] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting Password...' : success ? 'Password Reset!' : 'Reset Password'}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F0] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7A916C] mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
