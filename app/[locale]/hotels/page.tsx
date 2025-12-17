'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { Search, Star, MapPin, Building, Users, Wifi, Car, Coffee, Sparkles, TrendingUp, Award, Globe } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface Hotel {
  id: string;
  name: string;
  description: string | null;
  stars: number;
  phone: string | null;
  email: string | null;
  isActive: boolean;
  address: {
    street: string;
    building: string;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  _count: {
    rooms: number;
  };
}

export default function HotelsPage() {
  const t = useTranslations('Hotels');
  const locale = useLocale();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [starsFilter, setStarsFilter] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await fetch('/api/hotels');
      const data = await res.json();

      // Check if the response is an array (successful response)
      if (Array.isArray(data)) {
        setHotels(data);
      } else {
        // Handle error responses
        console.error('Error fetching hotels:', data.error || 'Unknown error');
        setHotels([]);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address.city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address.city.country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStars = starsFilter === null || hotel.stars === starsFilter;
    return matchesSearch && matchesStars;
  });

  const stats = [
    { icon: Building, value: hotels.length.toString(), label: t('stats.totalHotels') },
    { icon: Globe, value: [...new Set(hotels.map(h => h.address.city.country.name))].length.toString(), label: t('stats.countries') },
    { icon: Award, value: hotels.filter(h => h.stars >= 4).length.toString(), label: t('stats.premium') },
    { icon: TrendingUp, value: '98%', label: t('stats.satisfaction') },
  ];

  const amenityIcons = [
    { icon: Wifi, label: 'WiFi' },
    { icon: Car, label: 'Parking' },
    { icon: Coffee, label: 'Breakfast' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section - Unique design with floating elements */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A56B] rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
              <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Floating badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
                <Sparkles className="w-4 h-4 text-[#C9A56B]" />
                {t('featured')}
                <Sparkles className="w-4 h-4 text-[#C9A56B]" />
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t('title').split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? 'text-[#C9A56B]' : ''}>{word} </span>
                ))}
              </h1>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>

              {/* Search Box with glassmorphism */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#C9A56B] focus:outline-none transition-all shadow-lg"
                    />
                  </div>
                  <select
                    value={starsFilter ?? ''}
                    onChange={(e) => setStarsFilter(e.target.value ? Number(e.target.value) : null)}
                    className="px-6 py-4 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:outline-none transition-all shadow-lg cursor-pointer min-w-[160px]"
                  >
                    <option value="">{t('allStars')}</option>
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <option key={stars} value={stars}>
                        {'★'.repeat(stars)} {stars} {t('stars')}
                      </option>
                    ))}
                  </select>
                  <button className="px-8 py-4 rounded-xl bg-[#C9A56B] hover:bg-[#B89560] text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    {t('searchButton')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
        </section>

        {/* Stats Section */}
        <section className="py-12 -mt-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A56B] to-[#E8D5B5] mb-4">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                  {t('exploreCollection')}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {t('allHotels')}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4 md:mt-0 max-w-md">
                {t('allHotelsSubtitle')}
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-t-3xl" />
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-b-3xl">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                  <Building className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('noHotels')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('tryDifferentSearch')}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHotels.map((hotel, index) => (
                  <div
                    key={hotel.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredCard(hotel.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#C9A56B] to-[#E8D5B5] rounded-3xl transform transition-all duration-500 ${hoveredCard === hotel.id ? 'scale-105 opacity-100' : 'scale-100 opacity-0'}`} />

                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700">
                      {/* Image Area with gradient overlay */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A56B]/20 via-transparent to-purple-500/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Building className="w-20 h-20 text-[#C9A56B]/30 group-hover:scale-110 transition-transform duration-500" />
                        </div>

                        {/* Stars badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#C9A56B] text-[#C9A56B]" />
                          ))}
                        </div>

                        {/* Quick amenities */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {amenityIcons.map((amenity, i) => (
                            <div key={i} className="w-8 h-8 rounded-lg bg-white/90 dark:bg-gray-800/90 flex items-center justify-center shadow-lg">
                              <amenity.icon className="w-4 h-4 text-[#C9A56B]" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#C9A56B] transition-colors line-clamp-1">
                            {hotel.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-4">
                          <MapPin className="w-4 h-4 text-[#C9A56B]" />
                          <span>{hotel.address.city.name}, {hotel.address.city.country.name}</span>
                        </div>

                        {hotel.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {hotel.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#C9A56B]/10 text-[#C9A56B]">
                              <Users className="w-4 h-4" />
                              <span className="font-medium">{hotel._count.rooms} {t('rooms')}</span>
                            </div>
                          </div>
                          <Link
                            href={`/${locale}/hotels/${hotel.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-[#C9A56B] text-gray-900 dark:text-white hover:text-white font-medium text-sm transition-all group-hover:translate-x-1"
                          >
                            {t('viewDetails')}
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#C9A56B] to-[#B89560] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#C9A56B] font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {t('ctaButton')}
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
