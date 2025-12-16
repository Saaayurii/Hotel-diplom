'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, User, Hotel as HotelIcon, Bed, DollarSign } from 'lucide-react';

interface Booking {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: string;
  finalPrice: string;
  numberOfGuests: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  room: {
    number: string;
    hotel: {
      name: string;
    };
  };
  bookingStatus: {
    name: string;
    color: string | null;
  };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A56B]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-black mb-2">Bookings Management</h1>
          <p className="text-gray-600">View and manage all bookings</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Guest
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Hotel & Room
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Check-in
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Check-out
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Guests
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {booking.user.firstName} {booking.user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-900">
                          <HotelIcon size={16} />
                          <span>{booking.room.hotel.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Bed size={14} />
                          <span>Room {booking.room.number}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{formatDate(booking.checkInDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{formatDate(booking.checkOutDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{booking.numberOfGuests}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-1 font-semibold text-gray-900">
                          <DollarSign size={16} />
                          <span>{Number(booking.finalPrice).toFixed(2)}</span>
                        </div>
                        {booking.totalPrice !== booking.finalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${Number(booking.totalPrice).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: booking.bookingStatus.color || '#e5e7eb',
                          color: '#000',
                        }}
                      >
                        {booking.bookingStatus.name}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
