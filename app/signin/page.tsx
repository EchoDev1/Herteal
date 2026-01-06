'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add your sign-in logic here
    // For now, this is a placeholder
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign-in functionality will be implemented here');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 px-4">
      <div className="container mx-auto max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7A916C] hover:text-[#6B8159] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Sign In Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-[#7A916C]/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-2">
              <span className="text-white bg-[#7A916C] px-2">HER</span>
              <span className="text-[#7A916C]">TEALS</span>
            </h1>
            <p className="text-sm text-[#6B6B6B] mt-4">Welcome back! Sign in to your account</p>
          </div>

          {/* Sign In Form */}
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

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-[#7A916C] border-[#7A916C]/30 rounded focus:ring-[#7A916C]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-[#6B6B6B]">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#7A916C] hover:text-[#6B8159] transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-[#7A916C] text-white font-semibold rounded-lg hover:bg-[#6B8159] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#6B6B6B]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#7A916C] hover:text-[#6B8159] font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-6 flex items-center">
            <div className="flex-1 h-px bg-[#7A916C]/20"></div>
            <span className="px-4 text-xs text-[#6B6B6B] uppercase">Or continue with</span>
            <div className="flex-1 h-px bg-[#7A916C]/20"></div>
          </div>

          {/* Social Sign In */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2 px-4 border border-[#7A916C]/30 rounded-lg hover:bg-[#FAF7F0] transition-colors">
              <span className="text-sm font-medium text-[#2D2D2D]">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 border border-[#7A916C]/30 rounded-lg hover:bg-[#FAF7F0] transition-colors">
              <span className="text-sm font-medium text-[#2D2D2D]">Facebook</span>
            </button>
          </div>
        </div>

        {/* Customer Support */}
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
