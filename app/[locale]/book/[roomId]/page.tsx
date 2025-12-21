'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { Calendar, Users, MapPin, Building, DoorOpen, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Room {
  id: string;
  number: string;
  pricePerNight: string;
  floor: number;
  size: number | null;
  description: string | null;
  hotel: {
    name: string;
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
    name: string;
    maxGuests: number;
  };
}

export default function BookRoomPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const roomId = params.roomId as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    specialRequests: '',
  });

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const fetchRoom = async () => {
    try {
      const res = await fetch(`/api/admin/rooms/${roomId}`);
      if (res.ok) {
        const data = await res.json();
        setRoom(data);
      } else {
        setError('Room not found');
      }
    } catch (error) {
      console.error('Error fetching room:', error);
      setError('Failed to load room details');
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) return 0;
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!room) return 0;
    const nights = calculateNights();
    return nights * parseFloat(room.pricePerNight);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          ...bookingData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/${locale}/profile/bookings`);
        }, 2000);
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('An error occurred while creating booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#C9A56B] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error && !room) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <Link
              href={`/${locale}/rooms`}
              className="inline-block px-6 py-3 bg-[#C9A56B] text-white rounded-lg hover:bg-[#B89560] transition-colors"
            >
              Back to Rooms
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!room) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Book Your Room
            </h1>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Room Details */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Room Details
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-[#C9A56B] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hotel</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{room.hotel.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A56B] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {room.hotel.address.city.name}, {room.hotel.address.city.country.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DoorOpen className="w-5 h-5 text-[#C9A56B] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Room Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {room.roomType.name} - Room {room.number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-[#C9A56B] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Max Guests</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {room.roomType.maxGuests} guests
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price per night</p>
                    <p className="text-3xl font-bold text-[#C9A56B]">${room.pricePerNight}</p>
                  </div>

                  {room.description && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{room.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Booking Information
                </h2>

                {success ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Booking Successful!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Redirecting to your bookings...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          required
                          value={bookingData.checkInDate}
                          onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Check-out Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          required
                          value={bookingData.checkOutDate}
                          onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                          min={bookingData.checkInDate || new Date().toISOString().split('T')[0]}
                          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          required
                          value={bookingData.numberOfGuests}
                          onChange={(e) => setBookingData({ ...bookingData, numberOfGuests: parseInt(e.target.value) })}
                          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none"
                        >
                          {Array.from({ length: room.roomType.maxGuests }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        rows={4}
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                        placeholder="Any special requests or requirements..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none resize-none"
                      />
                    </div>

                    {calculateNights() > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Nights</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{calculateNights()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Price per night</span>
                          <span className="font-semibold text-gray-900 dark:text-white">${room.pricePerNight}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                          <span className="font-bold text-gray-900 dark:text-white">Total</span>
                          <span className="font-bold text-2xl text-[#C9A56B]">${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting || !bookingData.checkInDate || !bookingData.checkOutDate}
                      className="w-full px-6 py-4 bg-[#C9A56B] text-white font-semibold rounded-lg hover:bg-[#B89560] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
