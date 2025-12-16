'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Hotel as HotelIcon, DollarSign } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { RoomForm } from '@/app/components/admin/RoomForm';
import { TableSkeleton } from '@/app/components/ui/Skeleton';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';

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
    name: string;
  };
  roomType: {
    name: string;
    maxGuests: number;
  };
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      showErrorToast('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, number: string) => {
    if (!confirm(`Are you sure you want to delete room "${number}"?`)) return;

    try {
      const response = await fetch(`/api/admin/rooms/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

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

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-black mb-2">Rooms Management</h1>
          <p className="text-gray-600">Manage your hotel rooms</p>
        </div>
        <TableSkeleton rows={5} columns={8} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-black mb-2">Rooms Management</h1>
          <p className="text-gray-600">Manage your hotel rooms</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          Add Room
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Room Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Hotel
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Floor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Price/Night
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
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No rooms found. Add your first room to get started.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{room.number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <HotelIcon size={16} />
                        <span>{room.hotel.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-gray-900">{room.roomType.name}</div>
                        <div className="text-sm text-gray-500">
                          Max {room.roomType.maxGuests} guests
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{room.floor}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">
                        {room.size ? `${room.size} m²` : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-900">
                          {Number(room.pricePerNight).toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          room.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {room.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(room)}
                          className="p-2 text-gray-600 hover:text-[#C9A56B] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(room.id, room.number)}
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
        title={selectedRoom ? 'Edit Room' : 'Create New Room'}
        size="lg"
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
