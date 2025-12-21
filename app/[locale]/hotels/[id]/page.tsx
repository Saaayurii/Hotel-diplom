'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { MapPin, Star, Phone, Mail, Clock, Users, Wifi, Car, Coffee, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Hotel {
  id: string;
  name: string;
  description: string | null;
  stars: number;
  phone: string | null;
  email: string | null;
  checkInTime: string;
  checkOutTime: string;
  isActive: boolean;
  address: {
    street: string;
    building: string;
    postalCode: string | null;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  hotelImages: Array<{
    id: string;
    url: string;
    caption: string | null;
    isPrimary: boolean;
    displayOrder: number;
  }>;
  rooms: Array<{
    id: string;
    number: string;
    floor: number;
    size: number | null;
    pricePerNight: string;
    isAvailable: boolean;
    roomType: {
      name: string;
      description: string | null;
      maxGuests: number;
    };
  }>;
  _count: {
    rooms: number;
    reviews: number;
  };
}

export default function HotelDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('HotelDetail');
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchHotel(params.id as string);
    }
  }, [params.id]);

  const fetchHotel = async (id: string) => {
    try {
      const res = await fetch(`/api/hotels/${id}`);
      const data = await res.json();

      if (res.ok) {
        setHotel(data);
      } else {
        console.error('Error fetching hotel:', data.error);
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (hotel && hotel.hotelImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % hotel.hotelImages.length);
    }
  };

  const prevImage = () => {
    if (hotel && hotel.hotelImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? hotel.hotelImages.length - 1 : prev - 1
      );
    }
  };

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

  if (!hotel) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Building className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hotel Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The hotel you're looking for doesn't exist.</p>
            <Link
              href={`/${locale}/hotels`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A56B] text-white rounded-xl hover:bg-[#B89560] transition-all"
            >
              Back to Hotels
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const sortedImages = [...hotel.hotelImages].sort((a, b) => {
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    return a.displayOrder - b.displayOrder;
  });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section with Image Gallery */}
        <section className="relative">
          {/* Image Gallery */}
          <div className="relative h-[500px] bg-gray-200 dark:bg-gray-800">
            {sortedImages.length > 0 ? (
              <>
                <Image
                  src={sortedImages[currentImageIndex].url}
                  alt={sortedImages[currentImageIndex].caption || hotel.name}
                  fill
                  className="object-cover"
                  priority
                />
                {sortedImages.length > 1 && (
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
                      {sortedImages.map((_, index) => (
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
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <Building className="w-32 h-32 text-[#C9A56B]/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Hotel Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A56B] text-[#C9A56B]" />
                ))}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{hotel.name}</h1>
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-[#C9A56B]" />
                <span>
                  {hotel.address.street} {hotel.address.building}, {hotel.address.city.name}, {hotel.address.city.country.name}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Hotel</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {hotel.description || 'No description available.'}
                  </p>
                </div>

                {/* Rooms */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Rooms</h2>
                  <div className="space-y-4">
                    {hotel.rooms.map((room) => (
                      <div
                        key={room.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-[#C9A56B] transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                              {room.roomType.name} - Room {room.number}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {room.roomType.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#C9A56B]">${room.pricePerNight}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">per night</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Up to {room.roomType.maxGuests} guests</span>
                          </div>
                          {room.size && (
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              <span>{room.size}m²</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span>Floor {room.floor}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                              room.isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {room.isAvailable ? 'Available' : 'Booked'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg sticky top-8">
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">Hotel Information</h3>

                  <div className="space-y-4">
                    {/* Contact */}
                    {hotel.phone && (
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Phone className="w-5 h-5 text-[#C9A56B]" />
                        <span>{hotel.phone}</span>
                      </div>
                    )}
                    {hotel.email && (
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Mail className="w-5 h-5 text-[#C9A56B]" />
                        <span>{hotel.email}</span>
                      </div>
                    )}

                    {/* Check-in/out times */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 mb-3">
                        <Clock className="w-5 h-5 text-[#C9A56B]" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Check-in</div>
                          <div className="text-sm">{hotel.checkInTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Clock className="w-5 h-5 text-[#C9A56B]" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Check-out</div>
                          <div className="text-sm">{hotel.checkOutTime}</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="text-2xl font-bold text-[#C9A56B]">{hotel._count.rooms}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Rooms</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="text-2xl font-bold text-[#C9A56B]">{hotel._count.reviews}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-900 dark:text-white mb-3">Popular Amenities</div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Wifi className="w-5 h-5 text-[#C9A56B]" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">WiFi</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Car className="w-5 h-5 text-[#C9A56B]" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Parking</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Coffee className="w-5 h-5 text-[#C9A56B]" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Breakfast</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-6 px-6 py-4 bg-[#C9A56B] hover:bg-[#B89560] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
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
