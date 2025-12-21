'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { Calendar, MapPin, Users, DollarSign, Clock, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Booking {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: string;
  finalPrice: string;
  specialRequests: string | null;
  createdAt: string;
  bookingStatus: {
    name: string;
    color: string | null;
  };
  room: {
    number: string;
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
    };
  };
}

export default function MyBookingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.push(`/${locale}/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
      fetchBookings();
    } catch (error) {
      console.error('Error checking auth:', error);
      router.push(`/${locale}/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/user/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        setError('Failed to load bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('An error occurred while loading bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      const res = await fetch(`/api/user/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings(bookings.map(b =>
          b.id === bookingId
            ? { ...b, bookingStatus: { name: 'Cancelled', color: '#EF4444' } }
            : b
        ));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('An error occurred while cancelling booking');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string, color: string | null) => {
    if (color) return color;

    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'cancelled':
      case 'rejected':
        return '#EF4444';
      case 'completed':
        return '#6366F1';
      default:
        return '#6B7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#C9A56B] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your bookings...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  My Bookings
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage your hotel reservations
                </p>
              </div>
              <Link
                href={`/${locale}/rooms`}
                className="mt-4 md:mt-0 px-6 py-3 bg-[#C9A56B] text-white rounded-lg hover:bg-[#B89560] transition-colors inline-block text-center"
              >
                Book New Room
              </Link>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No bookings yet
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start exploring our rooms and make your first reservation
                </p>
                <Link
                  href={`/${locale}/rooms`}
                  className="inline-block px-6 py-3 bg-[#C9A56B] text-white rounded-lg hover:bg-[#B89560] transition-colors"
                >
                  Browse Rooms
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Main Info */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-1">
                              {booking.room.hotel.name}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {booking.room.hotel.address.city.name},{' '}
                                {booking.room.hotel.address.city.country.name}
                              </span>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-[#C9A56B] mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Check-in</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {formatDate(booking.checkInDate)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-[#C9A56B] mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Check-out</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {formatDate(booking.checkOutDate)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Users className="w-5 h-5 text-[#C9A56B] mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Guests</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'Guest' : 'Guests'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Room:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {booking.room.roomType.name} - {booking.room.number}
                              </span>
                            </div>
                            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Nights:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {calculateNights(booking.checkInDate, booking.checkOutDate)}
                              </span>
                            </div>
                          </div>

                          {booking.specialRequests && (
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Special Requests:</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{booking.specialRequests}</p>
                            </div>
                          )}
                        </div>

                        {/* Status and Price */}
                        <div className="flex flex-col items-end gap-4 min-w-[200px]">
                          <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                              backgroundColor: `${getStatusColor(booking.bookingStatus.name, booking.bookingStatus.color)}20`,
                              color: getStatusColor(booking.bookingStatus.name, booking.bookingStatus.color),
                            }}
                          >
                            {getStatusIcon(booking.bookingStatus.name)}
                            <span className="font-semibold text-sm">{booking.bookingStatus.name}</span>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Price</p>
                            <p className="text-3xl font-bold text-[#C9A56B]">${booking.finalPrice}</p>
                          </div>

                          {booking.bookingStatus.name !== 'Cancelled' && booking.bookingStatus.name !== 'Completed' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={cancellingId === booking.id}
                              className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Booked on {formatDate(booking.createdAt)}</span>
                      <span>ID: {booking.id.slice(0, 8)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
