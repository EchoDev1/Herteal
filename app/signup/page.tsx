'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Add your sign-up logic here
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created successfully! Redirecting to sign in...');
      // Redirect to sign-in page
      window.location.href = '/signin';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7A916C] hover:text-[#6B8159] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Sign Up Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-[#7A916C]/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-2">
              <span className="text-white bg-[#7A916C] px-2">HER</span>
              <span className="text-[#7A916C]">TEALS</span>
            </h1>
            <p className="text-sm text-[#6B6B6B] mt-4">Create your account and start shopping</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName ? 'border-red-500' : 'border-[#7A916C]/30'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all`}
                  placeholder="John"
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? 'border-red-500' : 'border-[#7A916C]/30'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-[#7A916C]/30'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all"
                placeholder="+234 800 000 0000"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-[#7A916C]/30'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all`}
                placeholder="At least 8 characters"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#7A916C]/30'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all`}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-[#7A916C] border-[#7A916C]/30 rounded focus:ring-[#7A916C]"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-[#6B6B6B]">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#7A916C] hover:text-[#6B8159] font-medium">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#7A916C] hover:text-[#6B8159] font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-[#7A916C] text-white font-semibold rounded-lg hover:bg-[#6B8159] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#6B6B6B]">
              Already have an account?{' '}
              <Link href="/signin" className="text-[#7A916C] hover:text-[#6B8159] font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-6 flex items-center">
            <div className="flex-1 h-px bg-[#7A916C]/20"></div>
            <span className="px-4 text-xs text-[#6B6B6B] uppercase">Or sign up with</span>
            <div className="flex-1 h-px bg-[#7A916C]/20"></div>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2 px-4 border border-[#7A916C]/30 rounded-lg hover:bg-[#FAF7F0] transition-colors">
              <span className="text-sm font-medium text-[#2D2D2D]">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 border border-[#7A916C]/30 rounded-lg hover:bg-[#FAF7F0] transition-colors">
              <span className="text-sm font-medium text-[#2D2D2D]">Facebook</span>
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg border border-[#7A916C]/20">
            <h3 className="font-semibold text-[#7A916C] mb-2">Fast Checkout</h3>
            <p className="text-xs text-[#6B6B6B]">Save your details for quick purchases</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#7A916C]/20">
            <h3 className="font-semibold text-[#7A916C] mb-2">Track Orders</h3>
            <p className="text-xs text-[#6B6B6B]">Monitor your orders in real-time</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#7A916C]/20">
            <h3 className="font-semibold text-[#7A916C] mb-2">Exclusive Offers</h3>
            <p className="text-xs text-[#6B6B6B]">Get special discounts and early access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
