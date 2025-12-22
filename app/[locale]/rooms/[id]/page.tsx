'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { MapPin, Star, Phone, Mail, Clock, Users, Wifi, Tv, Wind, Bath, Coffee, Utensils, BedDouble, Layers, Maximize, ChevronLeft, ChevronRight, Building } from 'lucide-react';
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
    stars: number;
    phone: string | null;
    email: string | null;
    checkInTime: string;
    checkOutTime: string;
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
  };
  roomType: {
    id: string;
    name: string;
    description: string | null;
    maxGuests: number;
  };
  roomImages: Array<{
    id: string;
    url: string;
    caption: string | null;
    isPrimary: boolean;
    displayOrder: number;
  }>;
}

export default function RoomDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('RoomDetail');
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchRoom(params.id as string);
    }
  }, [params.id]);

  const fetchRoom = async (id: string) => {
    try {
      const res = await fetch(`/api/rooms/${id}`);
      const data = await res.json();

      if (res.ok) {
        setRoom(data);
      } else {
        console.error('Error fetching room:', data.error);
      }
    } catch (error) {
      console.error('Error fetching room:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (room && room.roomImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % room.roomImages.length);
    }
  };

  const prevImage = () => {
    if (room && room.roomImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? room.roomImages.length - 1 : prev - 1
      );
    }
  };

  const roomFeatures = [
    { icon: Wifi, label: t('features.wifi') },
    { icon: Tv, label: t('features.tv') },
    { icon: Wind, label: t('features.ac') },
    { icon: Bath, label: t('features.bath') },
    { icon: Coffee, label: t('features.minibar') },
    { icon: Utensils, label: t('features.roomService') },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A56B]" />
        </div>
      </>
    );
  }

  if (!room) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <BedDouble className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('notFound')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('notFoundDesc')}</p>
            <Link
              href={`/${locale}/rooms`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A56B] text-white rounded-xl hover:bg-[#B89560] transition-all"
            >
              {t('backToRooms')}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section with Image Gallery */}
        <section className="relative">
          <div className="relative h-[500px] bg-gray-200 dark:bg-gray-800">
            {room.roomImages.length > 0 ? (
              <>
                <Image
                  src={room.roomImages[currentImageIndex].url}
                  alt={room.roomImages[currentImageIndex].caption || room.roomType.name}
                  fill
                  className="object-cover"
                  priority
                />
                {room.roomImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {room.roomImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#C9A56B]/20 via-purple-500/10 to-blue-500/10">
                <BedDouble className="w-32 h-32 text-[#C9A56B]/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Room Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  room.isAvailable
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {room.isAvailable ? t('available') : t('unavailable')}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {room.roomType.name} - {t('room')} #{room.number}
              </h1>
              <div className="flex items-center gap-2 text-lg">
                <Building className="w-5 h-5 text-[#C9A56B]" />
                <Link href={`/${locale}/hotels/${room.hotel.id}`} className="hover:text-[#C9A56B] transition-colors">
                  {room.hotel.name}
                </Link>
                <span className="mx-2">|</span>
                <MapPin className="w-5 h-5 text-[#C9A56B]" />
                <span>
                  {room.hotel.address.city.name}, {room.hotel.address.city.country.name}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Room Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('aboutRoom')}</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {room.roomType.description || room.description || t('noDescription')}
                  </p>

                  {/* Room Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <Users className="w-8 h-8 text-[#C9A56B] mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('maxGuests')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{room.roomType.maxGuests}</p>
                    </div>
                    <div className="text-center">
                      <Layers className="w-8 h-8 text-[#C9A56B] mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('floor')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{room.floor}</p>
                    </div>
                    <div className="text-center">
                      <Maximize className="w-8 h-8 text-[#C9A56B] mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('size')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {room.size ? `${room.size} m²` : '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('amenities')}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {roomFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
                      >
                        <feature.icon className="w-6 h-6 text-[#C9A56B]" />
                        <span className="text-gray-700 dark:text-gray-300">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('hotelInfo')}</h2>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{room.hotel.name}</h3>
                        <div className="flex">
                          {[...Array(room.hotel.stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#C9A56B] text-[#C9A56B]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {room.hotel.address.street} {room.hotel.address.building}, {room.hotel.address.city.name}
                      </p>
                      <div className="space-y-2">
                        {room.hotel.phone && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Phone className="w-4 h-4 text-[#C9A56B]" />
                            <span>{room.hotel.phone}</span>
                          </div>
                        )}
                        {room.hotel.email && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4 text-[#C9A56B]" />
                            <span>{room.hotel.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#C9A56B]" />
                            <span>{t('checkIn')}: {room.hotel.checkInTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#C9A56B]" />
                            <span>{t('checkOut')}: {room.hotel.checkOutTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/${locale}/hotels/${room.hotel.id}`}
                      className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-[#C9A56B] hover:text-[#C9A56B] transition-all"
                    >
                      {t('viewHotel')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar - Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-[#C9A56B] mb-1">${room.pricePerNight}</div>
                    <div className="text-gray-500 dark:text-gray-400">{t('perNight')}</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">{t('roomType')}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{room.roomType.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">{t('maxGuests')}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{room.roomType.maxGuests} {t('guests')}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">{t('floor')}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{room.floor}</span>
                    </div>
                    {room.size && (
                      <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">{t('size')}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{room.size} m²</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600 dark:text-gray-400">{t('status')}</span>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        room.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {room.isAvailable ? t('available') : t('unavailable')}
                      </span>
                    </div>
                  </div>

                  {room.isAvailable ? (
                    <Link
                      href={`/${locale}/book/${room.id}`}
                      className="block w-full text-center px-6 py-4 bg-[#C9A56B] hover:bg-[#B89560] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      {t('bookNow')}
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="block w-full text-center px-6 py-4 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
                    >
                      {t('unavailable')}
                    </button>
                  )}

                  <Link
                    href={`/${locale}/rooms`}
                    className="block w-full text-center px-6 py-3 mt-4 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:border-[#C9A56B] hover:text-[#C9A56B] transition-all"
                  >
                    {t('backToRooms')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
