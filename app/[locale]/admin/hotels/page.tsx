'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { HotelForm } from '@/app/components/admin/HotelForm';
import { TableSkeleton } from '@/app/components/ui/Skeleton';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';

interface Hotel {
  id: string;
  name: string;
  description: string | null;
  stars: number;
  phone: string | null;
  email: string | null;
  isActive: boolean;
  checkInTime: string;
  checkOutTime: string;
  addressId: string;
  address: {
    id: string;
    street: string;
    building: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    cityId: string;
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
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/hotels');
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      showErrorToast('Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/hotels/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete hotel');
      }

      showSuccessToast('Hotel deleted successfully');
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      showErrorToast('Failed to delete hotel');
    }
  };

  const handleCreate = () => {
    setSelectedHotel(null);
    setModalOpen(true);
  };

  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedHotel(null);
  };

  const handleSuccess = () => {
    handleModalClose();
    fetchHotels();
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-black mb-2">Hotels Management</h1>
          <p className="text-gray-600">Manage your hotels and properties</p>
        </div>
        <TableSkeleton rows={5} columns={7} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-black mb-2">Hotels Management</h1>
          <p className="text-gray-600">Manage your hotels and properties</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          Add Hotel
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Hotel
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Stars
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Rooms
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hotels.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No hotels found. Add your first hotel to get started.
                  </td>
                </tr>
              ) : (
                hotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{hotel.name}</div>
                        {hotel.description && (
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {hotel.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <div>{hotel.address.street} {hotel.address.building}</div>
                          <div>{hotel.address.city.name}, {hotel.address.city.country.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-[#C9A56B] text-[#C9A56B]" />
                        <span className="font-medium">{hotel.stars}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{hotel._count.rooms}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {hotel.email && <div className="text-gray-900">{hotel.email}</div>}
                        {hotel.phone && <div className="text-gray-600">{hotel.phone}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          hotel.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {hotel.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(hotel)}
                          className="p-2 text-gray-600 hover:text-[#C9A56B] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(hotel.id, hotel.name)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title={selectedHotel ? 'Edit Hotel' : 'Create New Hotel'}
        size="lg"
      >
        <HotelForm
          hotel={selectedHotel}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
}
