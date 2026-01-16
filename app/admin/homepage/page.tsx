'use client';

import { useState } from 'react';
import { Edit, Save, X, Image as ImageIcon, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import VideoUpload from '@/components/admin/VideoUpload';

interface HeroSection {
  title: string;
  subtitle: string;
  image: string;
  video?: string;
  ctaText: string;
  ctaLink: string;
}

interface FeaturedItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  video?: string;
}

interface ArtOfHerteals {
  title: string;
  subtitle: string;
  featuredItems: FeaturedItem[];
}

interface ReadyToWear {
  title: string;
  subtitle: string;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  video?: string;
}

interface PromoBanner {
  enabled: boolean;
  text: string;
  link: string;
}

export default function HomepageManagementPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'promo' | 'art-of-herteals' | 'ready-to-wear' | 'testimonials'>('hero');

  // Hero Section State - Support multiple hero sections
  const [heroSections, setHeroSections] = useState<(HeroSection & { id: string })[]>([
    {
      id: '1',
      title: 'LUXURY TAILORED FOR YOU',
      subtitle: 'Discover elegance in every stitch',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
      ctaText: 'SHOP NOW',
      ctaLink: '/shop',
    },
  ]);
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [heroFormData, setHeroFormData] = useState<Partial<HeroSection>>({});

  // The Art Of Herteals State
  const [artOfHerteals, setArtOfHerteals] = useState<ArtOfHerteals>({
    title: 'The Art Of Herteals',
    subtitle: 'A curated selection of our finest pieces, celebrating the intersection of tradition and contemporary style',
    featuredItems: [
      {
        id: '1',
        title: 'Timeless Classics',
        subtitle: 'Elegant silhouettes for every occasion',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
      },
      {
        id: '2',
        title: 'Bold Statements',
        subtitle: 'For the confident, modern woman',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
      },
      {
        id: '3',
        title: 'Refined Details',
        subtitle: 'Intricate craftsmanship in every stitch',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
      },
    ]
  });
  const [isEditingArtSection, setIsEditingArtSection] = useState(false);
  const [artSectionFormData, setArtSectionFormData] = useState({ title: '', subtitle: '' });
  const [isEditingArt, setIsEditingArt] = useState(false);
  const [editingFeaturedItemId, setEditingFeaturedItemId] = useState<string | null>(null);
  const [featuredItemFormData, setFeaturedItemFormData] = useState<Partial<FeaturedItem>>({});

  // Ready To Wear Collection State
  const [readyToWear, setReadyToWear] = useState<ReadyToWear>({
    title: 'Ready To Wear Collection',
    subtitle: 'Curated pieces for the modern woman',
  });
  const [isEditingRTW, setIsEditingRTW] = useState(false);
  const [rtwFormData, setRtwFormData] = useState<ReadyToWear>(readyToWear);

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
  const handleEditHero = (hero: HeroSection & { id: string }) => {
    setEditingHeroId(hero.id);
    setHeroFormData(hero);
    setIsEditingHero(true);
  };

  const handleAddHero = () => {
    setEditingHeroId(null);
    setHeroFormData({
      title: '',
      subtitle: '',
      image: '',
      video: '',
      ctaText: 'SHOP NOW',
      ctaLink: '/shop',
    });
    setIsEditingHero(true);
  };

  const handleSaveHero = () => {
    if (!heroFormData.title || !heroFormData.subtitle) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingHeroId) {
      // Update existing hero section
      setHeroSections(heroSections.map(h =>
        h.id === editingHeroId ? { ...h, ...heroFormData } as HeroSection & { id: string } : h
      ));
    } else {
      // Add new hero section
      const newHero: HeroSection & { id: string } = {
        id: Date.now().toString(),
        title: heroFormData.title!,
        subtitle: heroFormData.subtitle!,
        image: heroFormData.image || '',
        video: heroFormData.video || '',
        ctaText: heroFormData.ctaText || 'SHOP NOW',
        ctaLink: heroFormData.ctaLink || '/shop',
      };
      setHeroSections([...heroSections, newHero]);
    }

    setIsEditingHero(false);
    setEditingHeroId(null);
    setHeroFormData({});
  };

  const handleCancelHero = () => {
    setHeroFormData({});
    setIsEditingHero(false);
    setEditingHeroId(null);
  };

  const handleDeleteHero = (id: string) => {
    if (confirm('Are you sure you want to delete this hero section?')) {
      setHeroSections(heroSections.filter(h => h.id !== id));
    }
  };

  // Art Of Herteals Section Header Handlers
  const handleEditArtSection = () => {
    setArtSectionFormData({
      title: artOfHerteals.title,
      subtitle: artOfHerteals.subtitle,
    });
    setIsEditingArtSection(true);
  };

  const handleSaveArtSection = () => {
    if (!artSectionFormData.title || !artSectionFormData.subtitle) {
      alert('Please fill in all required fields');
      return;
    }

    setArtOfHerteals({
      ...artOfHerteals,
      title: artSectionFormData.title,
      subtitle: artSectionFormData.subtitle,
    });
    setIsEditingArtSection(false);
  };

  const handleCancelArtSection = () => {
    setArtSectionFormData({ title: '', subtitle: '' });
    setIsEditingArtSection(false);
  };

  // Art Of Herteals Featured Items Handlers
  const handleAddFeaturedItem = () => {
    setEditingFeaturedItemId(null);
    setFeaturedItemFormData({
      title: '',
      subtitle: '',
      image: '',
      video: '',
    });
    setIsEditingArt(true);
  };

  const handleEditFeaturedItem = (item: FeaturedItem) => {
    setEditingFeaturedItemId(item.id);
    setFeaturedItemFormData(item);
    setIsEditingArt(true);
  };

  const handleSaveFeaturedItem = () => {
    if (!featuredItemFormData.title || !featuredItemFormData.subtitle) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingFeaturedItemId) {
      // Update existing featured item
      const updatedItems = artOfHerteals.featuredItems.map(item =>
        item.id === editingFeaturedItemId
          ? { ...item, ...featuredItemFormData } as FeaturedItem
          : item
      );
      setArtOfHerteals({ ...artOfHerteals, featuredItems: updatedItems });
    } else {
      // Add new featured item
      const newItem: FeaturedItem = {
        id: Date.now().toString(),
        title: featuredItemFormData.title!,
        subtitle: featuredItemFormData.subtitle!,
        image: featuredItemFormData.image || '',
        video: featuredItemFormData.video || '',
      };
      setArtOfHerteals({
        ...artOfHerteals,
        featuredItems: [...artOfHerteals.featuredItems, newItem],
      });
    }

    setIsEditingArt(false);
    setEditingFeaturedItemId(null);
    setFeaturedItemFormData({});
  };

  const handleCancelFeaturedItem = () => {
    setFeaturedItemFormData({});
    setIsEditingArt(false);
    setEditingFeaturedItemId(null);
  };

  const handleDeleteFeaturedItem = (id: string) => {
    if (confirm('Are you sure you want to delete this featured item?')) {
      setArtOfHerteals({
        ...artOfHerteals,
        featuredItems: artOfHerteals.featuredItems.filter(item => item.id !== id),
      });
    }
  };

  // Ready To Wear Handlers
  const handleEditRTW = () => {
    setRtwFormData(readyToWear);
    setIsEditingRTW(true);
  };

  const handleSaveRTW = () => {
    setReadyToWear(rtwFormData);
    setIsEditingRTW(false);
  };

  const handleCancelRTW = () => {
    setRtwFormData(readyToWear);
    setIsEditingRTW(false);
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
        video: testimonialFormData.video || '',
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
    setTestimonialFormData({ rating: 5, video: '' });
    setIsEditingTestimonial(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#2C5530]">
          Homepage Sections
        </h1>
        <p className="text-gray-600 mt-1">Manage all sections displayed on your homepage</p>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Quick Navigation</h3>
            <p className="text-sm text-blue-700 mb-2">
              All homepage sections are organized here. For Shop By Category, visit the{' '}
              <Link href="/admin/collections" className="font-semibold underline">Collections page</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex gap-2 min-w-max">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'hero'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab('promo')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'promo'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Promo Banner
          </button>
          <button
            onClick={() => setActiveTab('ready-to-wear')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'ready-to-wear'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Ready To Wear Collection
          </button>
          <button
            onClick={() => setActiveTab('art-of-herteals')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'art-of-herteals'
                ? 'border-[#7A916C] text-[#7A916C]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            The Art Of Herteals
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2C5530]">Hero Sections</h2>
            {!isEditingHero && (
              <button
                onClick={handleAddHero}
                className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Add Hero Section
              </button>
            )}
          </div>

          {/* Hero Section Modal */}
          {isEditingHero && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#2C5530]">
                    {editingHeroId ? 'Edit Hero Section' : 'Add New Hero Section'}
                  </h3>
                  <button
                    onClick={handleCancelHero}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={heroFormData.title || ''}
                      onChange={(e) => setHeroFormData({ ...heroFormData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                      placeholder="LUXURY TAILORED FOR YOU"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle *</label>
                    <input
                      type="text"
                      value={heroFormData.subtitle || ''}
                      onChange={(e) => setHeroFormData({ ...heroFormData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                      placeholder="Discover elegance in every stitch"
                    />
                  </div>

                  {/* Image and Video Upload - Side by Side */}
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUpload
                      label="Background Image"
                      value={heroFormData.image || ''}
                      onChange={(url) => setHeroFormData({ ...heroFormData, image: url })}
                    />
                    <VideoUpload
                      label="Background Video"
                      value={heroFormData.video || ''}
                      onChange={(url) => setHeroFormData({ ...heroFormData, video: url })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                      <input
                        type="text"
                        value={heroFormData.ctaText || ''}
                        onChange={(e) => setHeroFormData({ ...heroFormData, ctaText: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="SHOP NOW"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                      <input
                        type="text"
                        value={heroFormData.ctaLink || ''}
                        onChange={(e) => setHeroFormData({ ...heroFormData, ctaLink: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                        placeholder="/shop"
                      />
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                  <button
                    onClick={handleCancelHero}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveHero}
                    className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingHeroId ? 'Save Changes' : 'Add Hero Section'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hero Sections List */}
          <div className="grid grid-cols-1 gap-6">
            {heroSections.map((hero) => (
              <div key={hero.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="h-64 bg-gray-200 relative">
                  {hero.image ? (
                    <img src={hero.image} alt={hero.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Title</p>
                    <p className="text-xl font-bold text-[#2C5530]">{hero.title}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Subtitle</p>
                    <p className="text-lg">{hero.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Button Text</p>
                      <p className="font-medium">{hero.ctaText}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Button Link</p>
                      <p className="font-medium">{hero.ctaLink}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditHero(hero)}
                      className="flex-1 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHero(hero.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {heroSections.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
              <p className="text-gray-600 mb-4">No hero sections yet.</p>
              <button
                onClick={handleAddHero}
                className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors inline-flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Add Your First Hero Section
              </button>
            </div>
          )}
        </div>
      )}

      {/* Ready To Wear Tab */}
      {activeTab === 'ready-to-wear' && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#2C5530]">Ready To Wear Collection</h2>
              <p className="text-sm text-gray-600 mt-1">Section title and subtitle for featured products carousel</p>
            </div>
            {!isEditingRTW && (
              <button
                onClick={handleEditRTW}
                className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {isEditingRTW ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={rtwFormData.title}
                  onChange={(e) => setRtwFormData({ ...rtwFormData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={rtwFormData.subtitle}
                  onChange={(e) => setRtwFormData({ ...rtwFormData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={handleCancelRTW}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRTW}
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
                <p className="text-sm text-gray-600">Section Title</p>
                <p className="text-lg font-bold">{readyToWear.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subtitle</p>
                <p className="text-lg">{readyToWear.subtitle}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* The Art Of Herteals Tab */}
      {activeTab === 'art-of-herteals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2C5530]">The Art Of Herteals</h2>
          </div>

          {/* Section Header/Description */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#2C5530]">Section Description</h3>
              {!isEditingArtSection && (
                <button
                  onClick={handleEditArtSection}
                  className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            {isEditingArtSection ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title *</label>
                  <input
                    type="text"
                    value={artSectionFormData.title}
                    onChange={(e) => setArtSectionFormData({ ...artSectionFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    placeholder="The Art Of Herteals"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle *</label>
                  <textarea
                    value={artSectionFormData.subtitle}
                    onChange={(e) => setArtSectionFormData({ ...artSectionFormData, subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                    placeholder="A curated selection of our finest pieces..."
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={handleCancelArtSection}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveArtSection}
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
                  <p className="text-sm text-gray-600">Title</p>
                  <p className="text-xl font-bold text-[#2C5530]">{artOfHerteals.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subtitle</p>
                  <p className="text-gray-700">{artOfHerteals.subtitle}</p>
                </div>
              </div>
            )}
          </div>

          {/* Featured Items Section */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#2C5530]">Featured Items</h3>
              {!isEditingArt && (
                <button
                  onClick={handleAddFeaturedItem}
                  className="px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Add Featured Item
                </button>
              )}
            </div>

          {/* Featured Item Modal */}
          {isEditingArt && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#2C5530]">
                    {editingFeaturedItemId ? 'Edit Featured Item' : 'Add New Featured Item'}
                  </h3>
                  <button
                    onClick={handleCancelFeaturedItem}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={featuredItemFormData.title || ''}
                      onChange={(e) => setFeaturedItemFormData({ ...featuredItemFormData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                      placeholder="Timeless Classics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle *</label>
                    <input
                      type="text"
                      value={featuredItemFormData.subtitle || ''}
                      onChange={(e) => setFeaturedItemFormData({ ...featuredItemFormData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A916C] focus:border-transparent"
                      placeholder="Elegant silhouettes for every occasion"
                    />
                  </div>

                  {/* Image and Video Upload - Side by Side */}
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUpload
                      label="Featured Item Image"
                      value={featuredItemFormData.image || ''}
                      onChange={(url) => setFeaturedItemFormData({ ...featuredItemFormData, image: url })}
                    />
                    <VideoUpload
                      label="Featured Item Video"
                      value={featuredItemFormData.video || ''}
                      onChange={(url) => setFeaturedItemFormData({ ...featuredItemFormData, video: url })}
                    />
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                  <button
                    onClick={handleCancelFeaturedItem}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFeaturedItem}
                    className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingFeaturedItemId ? 'Save Changes' : 'Add Featured Item'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Featured Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artOfHerteals.featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="h-64 bg-gray-200 relative">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5530] mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.subtitle}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditFeaturedItem(item)}
                      className="flex-1 px-4 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFeaturedItem(item.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {artOfHerteals.featuredItems.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
              <p className="text-gray-600 mb-4">No featured items yet.</p>
              <button
                onClick={handleAddFeaturedItem}
                className="px-6 py-2 bg-[#7A916C] text-white rounded-lg hover:bg-[#6B8159] transition-colors inline-flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Add Your First Featured Item
              </button>
            </div>
          )}
          </div>
          {/* End Featured Items Section */}
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
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
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

                  {/* Image and Video Upload - Side by Side */}
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUpload
                      label="Profile Image"
                      value={testimonialFormData.image || ''}
                      onChange={(url) => setTestimonialFormData({ ...testimonialFormData, image: url })}
                    />
                    <VideoUpload
                      label="Testimonial Video"
                      value={testimonialFormData.video || ''}
                      onChange={(url) => setTestimonialFormData({ ...testimonialFormData, video: url })}
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
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
