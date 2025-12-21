'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { Search, Users, Maximize, Layers, BedDouble, Check, X, Wifi, Tv, Wind, Bath, Coffee, Utensils, Sparkles, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Room {
  id: string;
  number: string;
  floor: number;
  size: number | null;
  pricePerNight: string;
  isAvailable: boolean;
  description: string | null;
  hotel: {
    id: string;
    name: string;
    address: {
      city: {
        name: string;
        country: {
          name: string;
        };
      };
    };
  };
  roomType: {
    id: string;
    name: string;
    maxGuests: number;
  };
}

interface RoomType {
  id: string;
  name: string;
}

export default function RoomsPage() {
  const t = useTranslations('Rooms');
  const locale = useLocale();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomsRes, typesRes] = await Promise.all([
        fetch('/api/admin/rooms'),
        fetch('/api/admin/room-types')
      ]);
      const [roomsData, typesData] = await Promise.all([
        roomsRes.json(),
        typesRes.json()
      ]);
      setRooms(Array.isArray(roomsData) ? roomsData : []);
      setRoomTypes(Array.isArray(typesData) ? typesData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === '' || room.roomType.id === typeFilter;
    const matchesAvailability = availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && room.isAvailable) ||
      (availabilityFilter === 'unavailable' && !room.isAvailable);
    const price = parseFloat(room.pricePerNight);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesSearch && matchesType && matchesAvailability && matchesPrice;
  });

  const roomFeatures = [
    { icon: Wifi, label: t('features.wifi'), description: t('features.wifiDesc') },
    { icon: Tv, label: t('features.tv'), description: t('features.tvDesc') },
    { icon: Wind, label: t('features.ac'), description: t('features.acDesc') },
    { icon: Bath, label: t('features.bath'), description: t('features.bathDesc') },
    { icon: Coffee, label: t('features.minibar'), description: t('features.minibarDesc') },
    { icon: Utensils, label: t('features.room_service'), description: t('features.room_serviceDesc') },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section - Unique design matching hotels page */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/lamp-comfort-bed-pillow-fabric.jpg"
              alt="Rooms background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-gray-900/70 to-purple-900/80" />
          </div>
          {/* Animated background */}
          <div className="absolute inset-0">
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
                <BedDouble className="w-4 h-4 text-[#C9A56B]" />
                {t('premiumRooms')}
                <Sparkles className="w-4 h-4 text-[#C9A56B]" />
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t('heroTitle')}{' '}
                <span className="text-[#C9A56B]">{t('heroTitleHighlight')}</span>
              </h1>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                {t('heroSubtitle')}
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">{rooms.length}</div>
                  <div className="text-sm text-gray-300">{t('totalRooms')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">{rooms.filter(r => r.isAvailable).length}</div>
                  <div className="text-sm text-gray-300">{t('availableNow')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 col-span-2 md:col-span-1">
                  <div className="text-3xl font-bold text-white mb-1">{roomTypes.length}</div>
                  <div className="text-sm text-gray-300">{t('roomTypes')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Room Features Showcase */}
        <section className="py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                {t('premiumAmenities')}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t('featuresTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {roomFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-[#C9A56B] transition-all duration-300 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white dark:bg-gray-800 group-hover:bg-white/20 shadow-lg group-hover:shadow-none transition-all mb-4">
                    <feature.icon className="w-7 h-7 text-[#C9A56B] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors mb-1">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            {/* Search Row */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Mobile: Filters Toggle & View Mode */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${showFilters ? 'bg-[#C9A56B] text-white border-[#C9A56B]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="sm:inline">{t('filters')}</span>
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-200 dark:bg-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                  >
                    <Grid3X3 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                  >
                    <List className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Filters */}
            <div className={`grid gap-3 overflow-hidden transition-all duration-300 ${showFilters ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all"
              >
                <option value="">{t('allTypes')}</option>
                {roomTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all"
              >
                <option value="all">{t('allAvailability')}</option>
                <option value="available">{t('availableOnly')}</option>
                <option value="unavailable">{t('unavailableOnly')}</option>
              </select>
            </div>

            {/* Results count */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{t('showing')} <strong className="text-gray-900 dark:text-white">{filteredRooms.length}</strong> {t('of')} <strong className="text-gray-900 dark:text-white">{rooms.length}</strong> {t('rooms')}</span>
            </div>
          </div>
        </section>

        {/* Rooms Grid/List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-56 rounded-t-2xl" />
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-b-2xl">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                  <BedDouble className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('noRooms')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('tryDifferentFilters')}</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    {/* Image Placeholder with gradient */}
                    <div className="relative h-56 bg-gradient-to-br from-[#C9A56B]/30 via-purple-500/20 to-blue-500/20 dark:from-[#C9A56B]/20 dark:via-purple-500/10 dark:to-blue-500/10 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BedDouble className="w-20 h-20 text-[#C9A56B]/40 group-hover:scale-110 transition-transform duration-500" />
                      </div>

                      {/* Status badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          room.isAvailable
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {room.isAvailable ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {room.isAvailable ? t('available') : t('unavailable')}
                        </span>
                      </div>

                      {/* Price badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow-lg">
                          <span className="text-[#C9A56B] font-bold text-lg">${room.pricePerNight}</span>
                          <span className="text-gray-500 text-sm">{t('perNight')}</span>
                        </div>
                      </div>

                      {/* Quick features */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                        {[Wifi, Tv, Wind, Coffee].map((Icon, i) => (
                          <div key={i} className="w-8 h-8 rounded-lg bg-white/90 dark:bg-gray-800/90 flex items-center justify-center shadow">
                            <Icon className="w-4 h-4 text-[#C9A56B]" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#C9A56B] transition-colors">
                            {room.roomType.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {room.hotel.name} - #{room.number}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 my-4 py-4 border-y border-gray-100 dark:border-gray-700">
                        <div className="text-center">
                          <Users className="w-5 h-5 text-[#C9A56B] mx-auto mb-1" />
                          <p className="text-xs text-gray-500 dark:text-gray-400">{t('maxGuests')}</p>
                          <p className="font-bold text-gray-900 dark:text-white">{room.roomType.maxGuests}</p>
                        </div>
                        <div className="text-center">
                          <Layers className="w-5 h-5 text-[#C9A56B] mx-auto mb-1" />
                          <p className="text-xs text-gray-500 dark:text-gray-400">{t('floor')}</p>
                          <p className="font-bold text-gray-900 dark:text-white">{room.floor}</p>
                        </div>
                        <div className="text-center">
                          <Maximize className="w-5 h-5 text-[#C9A56B] mx-auto mb-1" />
                          <p className="text-xs text-gray-500 dark:text-gray-400">{t('size')}</p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {room.size ? `${room.size}` : '-'}
                            {room.size && <span className="text-xs font-normal"> {t('sqm')}</span>}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/${locale}/rooms/${room.id}`}
                          className="flex-1 text-center py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-[#C9A56B] hover:text-[#C9A56B] transition-all"
                        >
                          {t('viewDetails')}
                        </Link>
                        {room.isAvailable && (
                          <Link
                            href={`/${locale}/book/${room.id}`}
                            className="flex-1 text-center py-3 rounded-xl bg-[#C9A56B] text-white font-medium hover:bg-[#B89560] transition-all shadow-lg hover:shadow-xl"
                          >
                            {t('bookNow')}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className="group flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-72 h-48 md:h-auto bg-gradient-to-br from-[#C9A56B]/30 via-purple-500/20 to-blue-500/20 flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BedDouble className="w-16 h-16 text-[#C9A56B]/40" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          room.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {room.isAvailable ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {room.isAvailable ? t('available') : t('unavailable')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#C9A56B] transition-colors mb-1">
                          {room.roomType.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {room.hotel.name} - Room #{room.number}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Users className="w-4 h-4 text-[#C9A56B]" />
                            {room.roomType.maxGuests} {t('guests')}
                          </span>
                          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Layers className="w-4 h-4 text-[#C9A56B]" />
                            {t('floor')} {room.floor}
                          </span>
                          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Maximize className="w-4 h-4 text-[#C9A56B]" />
                            {room.size ? `${room.size} ${t('sqm')}` : '-'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#C9A56B]">${room.pricePerNight}</span>
                          <span className="text-gray-500 text-sm"> {t('perNight')}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/${locale}/rooms/${room.id}`}
                            className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-[#C9A56B] hover:text-[#C9A56B] transition-all"
                          >
                            {t('viewDetails')}
                          </Link>
                          {room.isAvailable && (
                            <Link
                              href={`/${locale}/book/${room.id}`}
                              className="px-4 py-2 rounded-xl bg-[#C9A56B] text-white font-medium hover:bg-[#B89560] transition-all"
                            >
                              {t('bookNow')}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
