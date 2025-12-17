'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Edit, Trash2, Hotel as HotelIcon, DollarSign, Search, ChevronDown, BedDouble } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { RoomForm } from '@/app/components/admin/RoomForm';
import { TableSkeleton } from '@/app/components/ui/Skeleton';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';
import { Input } from '@/app/components/ui/Input';

interface Room {
  id: string;
  number: string;
  hotelId: string;
  roomTypeId: string;
  floor: number;
  size: number | null;
  pricePerNight: string;
  isAvailable: boolean;
  description?: string;
  hotel: {
    id: string;
    name: string;
  };
  roomType: {
    id: string;
    name: string;
    maxGuests: number;
  };
}

interface Hotel {
  id: string;
  name: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [hotelFilter, setHotelFilter] = useState('all');

  const t = useTranslations('admin.rooms');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [roomsResponse, hotelsResponse] = await Promise.all([
        fetch('/api/admin/rooms'),
        fetch('/api/admin/hotels')
      ]);
      if (!roomsResponse.ok || !hotelsResponse.ok) throw new Error('Failed to fetch data');
      const roomsData = await roomsResponse.json();
      const hotelsData = await hotelsResponse.json();
      setRooms(roomsData);
      setHotels(hotelsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      showErrorToast('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/admin/rooms');
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      showErrorToast('Failed to load rooms');
    }
  };

  const filteredRooms = useMemo(() => {
    return rooms
      .filter(room => {
        if (availabilityFilter === 'all') return true;
        return availabilityFilter === 'available' ? room.isAvailable : !room.isAvailable;
      })
      .filter(room => {
        if (hotelFilter === 'all') return true;
        return room.hotel.id === hotelFilter;
      })
      .filter(room =>
        room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomType.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [rooms, searchTerm, availabilityFilter, hotelFilter]);

  const handleDelete = async (id: string, number: string) => {
    if (!confirm(t('deleteConfirm', { number }))) return;

    try {
      const response = await fetch(`/api/admin/rooms/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete room');
      showSuccessToast('Room deleted successfully');
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      showErrorToast('Failed to delete room');
    }
  };

  const handleCreate = () => {
    setSelectedRoom(null);
    setModalOpen(true);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  const handleSuccess = () => {
    handleModalClose();
    fetchRooms();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Input
            type="text"
            placeholder="Search by number, hotel, type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            icon={Search}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-36">
            <select
              value={hotelFilter}
              onChange={(e) => setHotelFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="all">All Hotels</option>
              {hotels.map(hotel => <option key={hotel.id} value={hotel.id}>{hotel.name}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative w-full sm:w-36">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <Button variant="primary" onClick={handleCreate} className="flex-shrink-0 w-full sm:w-auto">
            <Plus size={20} />
            {t('addRoom')}
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <TableSkeleton rows={5} columns={7} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Room</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Hotel</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Type</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Price</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="p-4 text-right font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredRooms.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      No rooms found.
                    </td>
                  </tr>
                ) : (
                  filteredRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 align-top">
                        <div className="font-semibold text-gray-900 dark:text-white">#{room.number}</div>
                        <div className="text-gray-500">Floor: {room.floor}, Size: {room.size ? `${room.size} m²` : 'N/A'}</div>
                      </td>
                      <td className="p-4 align-top text-gray-600 dark:text-gray-400">{room.hotel.name}</td>
                      <td className="p-4 align-top">
                        <div className="font-medium text-gray-800 dark:text-gray-200">{room.roomType.name}</div>
                        <div className="text-gray-500">Max {room.roomType.maxGuests} guests</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-semibold text-gray-900 dark:text-white">${Number(room.pricePerNight).toFixed(2)}</div>
                        <div className="text-gray-500">/ night</div>
                      </td>
                      <td className="p-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
                            room.isAvailable
                              ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
                              : 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300'
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full ${room.isAvailable ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          {room.isAvailable ? t('available') : t('unavailable')}
                        </span>
                      </td>
                      <td className="p-4 align-top text-right">
                        <div className="inline-flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(room)}>
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(room.id, room.number)}>
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
        title={selectedRoom ? 'Edit Room' : 'Create New Room'}
        size="2xl"
      >
        <RoomForm
          room={selectedRoom}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
}
