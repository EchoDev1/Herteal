'use client';

import { useState } from 'react';
import { Edit, Save, X, Image as ImageIcon, Star } from 'lucide-react';

interface HeroSection {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

interface PromoBanner {
  enabled: boolean;
  text: string;
  link: string;
}

export default function HomepageManagementPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'promo' | 'testimonials'>('hero');

  // Hero Section State
  const [heroSection, setHeroSection] = useState<HeroSection>({
    title: 'LUXURY TAILORED FOR YOU',
    subtitle: 'Discover elegance in every stitch',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop',
  });
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [heroFormData, setHeroFormData] = useState<HeroSection>(heroSection);

  // Promo Banner State
  const [promoBanner, setPromoBanner] = useState<PromoBanner>({
    enabled: true,
    text: 'FREE SHIPPING ON ORDERS OVER ₦50,000',
    link: '/shop',
  });
  const [isEditingPromo, setIsEditingPromo] = useState(false);
  const [promoFormData, setPromoFormData] = useState<PromoBanner>(promoBanner);

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'Lagos',
      rating: 5,
      text: 'Absolutely stunning quality! The attention to detail is impeccable.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    {
      id: '2',
      name: 'Amara Okafor',
      location: 'Abuja',
      rating: 5,
      text: 'I feel like a queen in every piece from Herteals.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: '3',
      name: 'Chioma Eze',
      location: 'Port Harcourt',
      rating: 5,
      text: 'The perfect blend of luxury and comfort. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    },
  ]);
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialFormData, setTestimonialFormData] = useState<Partial<Testimonial>>({});

  // Hero Section Handlers
  const handleEditHero = () => {
    setHeroFormData(heroSection);
    setIsEditingHero(true);
  };

  const handleSaveHero = () => {
    setHeroSection(heroFormData);
    setIsEditingHero(false);
  };

  const handleCancelHero = () => {
    setHeroFormData(heroSection);
    setIsEditingHero(false);
  };

  // Promo Banner Handlers
  const handleEditPromo = () => {
    setPromoFormData(promoBanner);
    setIsEditingPromo(true);
  };

  const handleSavePromo = () => {
    setPromoBanner(promoFormData);
    setIsEditingPromo(false);
  };

  const handleCancelPromo = () => {
    setPromoFormData(promoBanner);
    setIsEditingPromo(false);
  };

  // Testimonial Handlers
  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonialId(testimonial.id);
    setTestimonialFormData(testimonial);
    setIsEditingTestimonial(true);
  };

  const handleSaveTestimonial = () => {
    if (!testimonialFormData.name || !testimonialFormData.text) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingTestimonialId) {
      setTestimonials(testimonials.map(t =>
        t.id === editingTestimonialId ? { ...t, ...testimonialFormData } as Testimonial : t
      ));
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        name: testimonialFormData.name!,
        location: testimonialFormData.location || '',
        rating: testimonialFormData.rating || 5,
        text: testimonialFormData.text!,
        image: testimonialFormData.image || '',
      };
      setTestimonials([...testimonials, newTestimonial]);
    }

    setIsEditingTestimonial(false);
    setEditingTestimonialId(null);
    setTestimonialFormData({});
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const handleAddTestimonial = () => {
    setEditingTestimonialId(null);
    setTestimonialFormData({ rating: 5 });
    setIsEditingTestimonial(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
          Homepage Management
        </h1>
        <p className="text-gray-600 mt-1">Manage your homepage sections and content</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'hero'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab('promo')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'promo'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Promo Banner
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'testimonials'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Testimonials
          </button>
        </nav>
      </div>

      {/* Hero Section Tab */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2C5530]">Hero Section</h2>
            {!isEditingHero && (
              <button
                onClick={handleEditHero}
                className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {isEditingHero ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={heroFormData.title}
                  onChange={(e) => setHeroFormData({ ...heroFormData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={heroFormData.subtitle}
                  onChange={(e) => setHeroFormData({ ...heroFormData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                <input
                  type="text"
                  value={heroFormData.image}
                  onChange={(e) => setHeroFormData({ ...heroFormData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
                {heroFormData.image && (
                  <div className="mt-2 h-48 rounded-lg overflow-hidden border border-gray-300">
                    <img src={heroFormData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={heroFormData.ctaText}
                    onChange={(e) => setHeroFormData({ ...heroFormData, ctaText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <input
                    type="text"
                    value={heroFormData.ctaLink}
                    onChange={(e) => setHeroFormData({ ...heroFormData, ctaLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={handleCancelHero}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveHero}
                  className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
                <img src={heroSection.image} alt="Hero" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="text-lg font-bold">{heroSection.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subtitle</p>
                <p className="text-lg">{heroSection.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Button Text</p>
                  <p className="font-medium">{heroSection.ctaText}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Button Link</p>
                  <p className="font-medium">{heroSection.ctaLink}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Promo Banner Tab */}
      {activeTab === 'promo' && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2C5530]">Promo Banner</h2>
            {!isEditingPromo && (
              <button
                onClick={handleEditPromo}
                className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {isEditingPromo ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={promoFormData.enabled}
                  onChange={(e) => setPromoFormData({ ...promoFormData, enabled: e.target.checked })}
                  className="w-5 h-5 text-[#7A916C] border-gray-300 rounded focus:ring-[#7A916C]"
                />
                <label className="text-sm font-medium text-gray-700">Enable Promo Banner</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner Text</label>
                <input
                  type="text"
                  value={promoFormData.text}
                  onChange={(e) => setPromoFormData({ ...promoFormData, text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                <input
                  type="text"
                  value={promoFormData.link}
                  onChange={(e) => setPromoFormData({ ...promoFormData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={handleCancelPromo}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePromo}
                  className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-bold">{promoBanner.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Text</p>
                <p className="text-lg">{promoBanner.text}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Link</p>
                <p className="font-medium">{promoBanner.link}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2C5530]">Testimonials</h2>
            <button
              onClick={handleAddTestimonial}
              className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors"
            >
              Add Testimonial
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[#2C5530]">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTestimonial(testimonial)}
                    className="flex-1 px-3 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Modal */}
          {isEditingTestimonial && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#2C5530]">
                    {editingTestimonialId ? 'Edit Testimonial' : 'Add Testimonial'}
                  </h3>
                  <button
                    onClick={() => setIsEditingTestimonial(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        value={testimonialFormData.name || ''}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={testimonialFormData.location || ''}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select
                      value={testimonialFormData.rating || 5}
                      onChange={(e) => setTestimonialFormData({ ...testimonialFormData, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Text *</label>
                    <textarea
                      value={testimonialFormData.text || ''}
                      onChange={(e) => setTestimonialFormData({ ...testimonialFormData, text: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
                    <input
                      type="text"
                      value={testimonialFormData.image || ''}
                      onChange={(e) => setTestimonialFormData({ ...testimonialFormData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={() => setIsEditingTestimonial(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTestimonial}
                    className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
