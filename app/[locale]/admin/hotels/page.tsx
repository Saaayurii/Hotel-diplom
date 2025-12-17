'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Edit, Trash2, MapPin, Star, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { HotelForm } from '@/app/components/admin/HotelForm';
import { TableSkeleton } from '@/app/components/ui/Skeleton';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';
import { Input } from '@/app/components/ui/Input';

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
  address: {
    street: string;
    building: string;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
    cityId: string;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const t = useTranslations('admin.hotels');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/hotels');
      if (!response.ok) throw new Error('Failed to fetch hotels');
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      showErrorToast('Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = useMemo(() => {
    return hotels
      .filter(hotel => {
        if (statusFilter === 'all') return true;
        return statusFilter === 'active' ? hotel.isActive : !hotel.isActive;
      })
      .filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.address.city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.address.city.country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [hotels, searchTerm, statusFilter]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(t('deleteConfirm', { name }))) return;

    try {
      const response = await fetch(`/api/admin/hotels/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete hotel');
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Input
            type="text"
            placeholder="Search by name, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* You would create a proper Select component for this */}
          <div className="relative w-full sm:w-40">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <Button variant="primary" onClick={handleCreate} className="flex-shrink-0">
            <Plus size={20} className="mr-2" />
            {t('addHotel')}
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <TableSkeleton rows={5} columns={6} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Hotel</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Location</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Rating</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Rooms</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="p-4 text-right font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredHotels.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      No hotels found.
                    </td>
                  </tr>
                ) : (
                  filteredHotels.map((hotel) => (
                    <tr key={hotel.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 align-top">
                        <div className="font-semibold text-gray-900 dark:text-white">{hotel.name}</div>
                        <div className="text-gray-500 line-clamp-1">{hotel.email}</div>
                      </td>
                      <td className="p-4 align-top text-gray-600 dark:text-gray-400">
                        {hotel.address.street}, {hotel.address.city.name}, {hotel.address.city.country.name}
                      </td>
                      <td className="p-4 align-top">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-amber-400 text-amber-400" />
                          <span className="font-semibold">{hotel.stars.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="p-4 align-top font-medium text-gray-900 dark:text-gray-200">{hotel._count.rooms}</td>
                      <td className="p-4 align-top">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            hotel.isActive
                              ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300'
                          }`}
                        >
                          {hotel.isActive ? t('active') : t('inactive')}
                        </span>
                      </td>
                      <td className="p-4 align-top text-right">
                        <div className="inline-flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(hotel)}>
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(hotel.id, hotel.name)}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title={selectedHotel ? 'Edit Hotel' : 'Create New Hotel'}
        size="2xl"
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
