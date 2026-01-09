'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isSupabaseEnabled } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error: authError } = await signIn(email, password);

      if (authError) {
        throw new Error(authError.message);
      }

      // Redirect to home page after successful login
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen relative overflow-hidden flex items-stretch">
      {/* Luxury Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F0] via-[#F5F0E8] to-[#EDE7DC]"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A916C]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7A916C]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#7A916C] hover:text-[#6B8159] mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium font-[family-name:var(--font-montserrat)] uppercase tracking-wider">Back to Home</span>
          </Link>

          {/* Sign In Card with luxury styling */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-[#7A916C]/10 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7A916C]/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#7A916C]/10 to-transparent rounded-tr-full"></div>

            {/* Header */}
            <div className="text-center mb-8 relative">
              {/* Logo */}
              <div className="inline-block mb-4">
                <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold">
                  <span className="text-white bg-[#7A916C] px-3 py-2 inline-block shadow-lg">HER</span>
                  <span className="text-[#7A916C]">TEALS</span>
                </h1>
              </div>

              <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-semibold text-[#2D2D2D] mb-2">
                Welcome Back
              </h2>
              <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
                Sign in to continue your luxury shopping experience
              </p>
            </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            {/* Email */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2 font-[family-name:var(--font-montserrat)]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-[#7A916C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] transition-all bg-white/50 backdrop-blur-sm font-[family-name:var(--font-montserrat)] text-[#2D2D2D] placeholder-[#6B6B6B]/50 disabled:bg-gray-100"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2 font-[family-name:var(--font-montserrat)]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-[#7A916C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] transition-all bg-white/50 backdrop-blur-sm font-[family-name:var(--font-montserrat)] text-[#2D2D2D] placeholder-[#6B6B6B]/50 disabled:bg-gray-100"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end pt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-[#7A916C] hover:text-[#6B8159] transition-colors font-[family-name:var(--font-montserrat)] font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-8 bg-gradient-to-r from-[#7A916C] to-[#6B8159] text-white font-bold rounded-lg hover:from-[#6B8159] hover:to-[#5C7049] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider font-[family-name:var(--font-montserrat)] relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center relative">
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#7A916C]/20"></div>
              <span className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)] uppercase tracking-widest">New Customer</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7A916C]/20"></div>
            </div>

            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)] mb-3">
              Don't have an account yet?
            </p>
            <Link
              href="/signup"
              className="inline-block py-3 px-8 border-2 border-[#7A916C] text-[#7A916C] hover:bg-[#7A916C] hover:text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider font-[family-name:var(--font-montserrat)] text-sm"
            >
              Create Account
            </Link>
          </div>
          </div>

          {/* Customer Support */}
          <div className="mt-4 text-center">
            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
              Need help?{' '}
              <Link href="/complaints" className="text-[#7A916C] hover:text-[#6B8159] font-semibold transition-colors underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
