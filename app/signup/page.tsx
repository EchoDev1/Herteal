'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isSupabaseEnabled } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const { error: signUpError } = await signUp(formData.email, formData.password, fullName);

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      setSuccess(true);

      // Give time to read email verification message
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen relative overflow-hidden flex items-stretch">
      {/* Luxury Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F0] via-[#F5F0E8] to-[#EDE7DC]"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#7A916C]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7A916C]/10 rounded-full blur-3xl"></div>

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

          {/* Sign Up Card with luxury styling */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-[#7A916C]/10 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#7A916C]/10 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#7A916C]/10 to-transparent rounded-tl-full"></div>

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
                Join Our Exclusive Community
              </h2>
              <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
                Create your account and discover luxury tailored fashion
              </p>
            </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Account created successfully!
                </p>
                <p className="text-sm text-green-700">
                  Please check your email to verify your account. Redirecting...
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="group">
                <label htmlFor="firstName" className="block text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2 font-[family-name:var(--font-montserrat)]">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading || success}
                  className="w-full px-4 py-3 border-2 border-[#7A916C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] transition-all bg-white/50 backdrop-blur-sm font-[family-name:var(--font-montserrat)] text-[#2D2D2D] placeholder-[#6B6B6B]/50 disabled:bg-gray-100"
                  placeholder="John"
                />
              </div>
              <div className="group">
                <label htmlFor="lastName" className="block text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2 font-[family-name:var(--font-montserrat)]">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading || success}
                  className="w-full px-4 py-3 border-2 border-[#7A916C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] transition-all bg-white/50 backdrop-blur-sm font-[family-name:var(--font-montserrat)] text-[#2D2D2D] placeholder-[#6B6B6B]/50 disabled:bg-gray-100"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2 font-[family-name:var(--font-montserrat)]">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border-2 border-[#7A916C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] transition-all bg-white/50 backdrop-blur-sm font-[family-name:var(--font-montserrat)] text-[#2D2D2D] placeholder-[#6B6B6B]/50 disabled:bg-gray-100"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Password */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2 font-[family-name:var(--font-montserrat)]">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border-2 border-[#7A916C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] transition-all bg-white/50 backdrop-blur-sm font-[family-name:var(--font-montserrat)] text-[#2D2D2D] placeholder-[#6B6B6B]/50 disabled:bg-gray-100"
                placeholder="At least 6 characters"
              />
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2 font-[family-name:var(--font-montserrat)]">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border-2 border-[#7A916C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-[#7A916C] transition-all bg-white/50 backdrop-blur-sm font-[family-name:var(--font-montserrat)] text-[#2D2D2D] placeholder-[#6B6B6B]/50 disabled:bg-gray-100"
                placeholder="Re-enter password"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 bg-[#7A916C]/5 p-4 rounded-lg">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={isLoading || success}
                className="mt-1 w-5 h-5 text-[#7A916C] border-[#7A916C]/30 rounded focus:ring-[#7A916C] disabled:bg-gray-100"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-[#2D2D2D] font-[family-name:var(--font-montserrat)]">
                I agree to the{' '}
                <Link href="/terms" className="text-[#7A916C] hover:text-[#6B8159] font-semibold underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#7A916C] hover:text-[#6B8159] font-semibold underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full py-4 px-8 bg-gradient-to-r from-[#7A916C] to-[#6B8159] text-white font-bold rounded-lg hover:from-[#6B8159] hover:to-[#5C7049] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider font-[family-name:var(--font-montserrat)] relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isLoading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center relative">
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#7A916C]/20"></div>
              <span className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)] uppercase tracking-widest">Existing Customer</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7A916C]/20"></div>
            </div>

            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)] mb-3">
              Already have an account?
            </p>
            <Link
              href="/signin"
              className="inline-block py-3 px-8 border-2 border-[#7A916C] text-[#7A916C] hover:bg-[#7A916C] hover:text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider font-[family-name:var(--font-montserrat)] text-sm"
            >
              Sign In
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
