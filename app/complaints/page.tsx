'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, MessageCircle, Mail, Phone } from 'lucide-react';

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7A916C] hover:text-[#6B8159] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-4">
            <span className="text-white bg-[#7A916C] px-2">Customer</span>{' '}
            <span className="text-[#7A916C]">Care</span>
          </h1>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            We value your feedback and are here to help. Submit your complaint or inquiry, and our team will respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="md:col-span-1 space-y-4">
            {/* Email Card */}
            <div className="bg-white rounded-lg p-6 border border-[#7A916C]/20 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#7A916C] rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#2D2D2D]">Email Us</h3>
              </div>
              <p className="text-sm text-[#6B6B6B]">support@herteals.com</p>
              <p className="text-xs text-[#6B6B6B] mt-2">Response time: 24 hours</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg p-6 border border-[#7A916C]/20 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#7A916C] rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#2D2D2D]">Call Us</h3>
              </div>
              <p className="text-sm text-[#6B6B6B]">+234 800 123 4567</p>
              <p className="text-xs text-[#6B6B6B] mt-2">Mon-Fri: 9AM - 6PM WAT</p>
            </div>

            {/* Live Chat Card */}
            <div className="bg-white rounded-lg p-6 border border-[#7A916C]/20 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#7A916C] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#2D2D2D]">Live Chat</h3>
              </div>
              <p className="text-sm text-[#6B6B6B] mb-3">Chat with our support team</p>
              <button className="text-sm text-[#7A916C] hover:text-[#6B8159] font-medium transition-colors">
                Start Chat →
              </button>
            </div>
          </div>

          {/* Complaint Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[#7A916C]/20">
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-6">
                Submit Your Complaint
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Thank you! Your complaint has been submitted successfully. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
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
                      required
                      className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Phone Number
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
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Complaint Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all bg-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="product">Product Quality</option>
                    <option value="delivery">Delivery Problem</option>
                    <option value="payment">Payment Issue</option>
                    <option value="return">Return/Refund</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all"
                    placeholder="Brief description of your issue"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-[#7A916C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A916C] focus:border-transparent transition-all resize-none"
                    placeholder="Please provide details about your complaint or inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-[#7A916C] text-white font-semibold rounded-lg hover:bg-[#6B8159] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Complaint
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-[#7A916C]/20">
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-[#2D2D2D]">How long does it take to get a response?</p>
                  <p className="text-[#6B6B6B] mt-1">We aim to respond to all complaints within 24 hours during business days.</p>
                </div>
                <div>
                  <p className="font-medium text-[#2D2D2D]">Can I track my complaint?</p>
                  <p className="text-[#6B6B6B] mt-1">Yes, you'll receive a complaint reference number via email to track your case.</p>
                </div>
                <div>
                  <p className="font-medium text-[#2D2D2D]">What if I'm not satisfied with the response?</p>
                  <p className="text-[#6B6B6B] mt-1">You can request to escalate your complaint to our management team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
