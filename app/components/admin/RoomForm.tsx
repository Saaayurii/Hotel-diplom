'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/app/components/ui/Input';
import { Select } from '@/app/components/ui/Select';
import { Textarea } from '@/app/components/ui/Textarea';
import { Button } from '@/app/components/ui/Button';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';

interface Hotel {
  id: string;
  name: string;
}

interface RoomType {
  id: string;
  name: string;
  maxGuests: number;
}

interface Room {
  id?: string;
  number: string;
  hotelId: string;
  roomTypeId: string;
  floor: number;
  size?: number | null;
  pricePerNight: string;
  isAvailable: boolean;
  description?: string | null;
}

interface RoomFormProps {
  room?: Room | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function RoomForm({ room, onSuccess, onCancel }: RoomFormProps) {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [formData, setFormData] = useState({
    number: room?.number || '',
    hotelId: room?.hotelId || '',
    roomTypeId: room?.roomTypeId || '',
    floor: room?.floor || 1,
    size: room?.size || undefined,
    pricePerNight: room?.pricePerNight || '',
    isAvailable: room?.isAvailable ?? true,
    description: room?.description || '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [hotelsRes, roomTypesRes] = await Promise.all([
        fetch('/api/admin/hotels'),
        fetch('/api/admin/room-types'),
      ]);

      const [hotelsData, roomTypesData] = await Promise.all([
        hotelsRes.json(),
        roomTypesRes.json(),
      ]);

      setHotels(hotelsData);
      setRoomTypes(roomTypesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      showErrorToast('Failed to load form data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = room?.id ? `/api/admin/rooms/${room.id}` : '/api/admin/rooms';
      const method = room?.id ? 'PUT' : 'POST';

      const payload = {
        number: formData.number,
        hotelId: formData.hotelId,
        roomTypeId: formData.roomTypeId,
        floor: Number(formData.floor),
        size: formData.size ? Number(formData.size) : undefined,
        pricePerNight: formData.pricePerNight,
        isAvailable: formData.isAvailable,
        description: formData.description || undefined,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save room');
      }

      showSuccessToast(room?.id ? 'Room updated successfully' : 'Room created successfully');
      onSuccess();
    } catch (error) {
      console.error('Error saving room:', error);
      showErrorToast('Failed to save room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Number *
          </label>
          <Input
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
            placeholder="101"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hotel *
          </label>
          <Select
            value={formData.hotelId}
            onChange={(e) => setFormData({ ...formData, hotelId: e.target.value })}
            required
          >
            <option value="">Select a hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Type *
          </label>
          <Select
            value={formData.roomTypeId}
            onChange={(e) => setFormData({ ...formData, roomTypeId: e.target.value })}
            required
          >
            <option value="">Select a room type</option>
            {roomTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} (Max {type.maxGuests} guests)
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floor *
          </label>
          <Input
            type="number"
            value={formData.floor}
            onChange={(e) => setFormData({ ...formData, floor: Number(e.target.value) })}
            required
            min="0"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size (m²)
          </label>
          <Input
            type="number"
            step="0.1"
            value={formData.size || ''}
            onChange={(e) =>
              setFormData({ ...formData, size: e.target.value ? Number(e.target.value) : undefined })
            }
            placeholder="25.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price per Night *
          </label>
          <Input
            type="number"
            step="0.01"
            value={formData.pricePerNight}
            onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
            required
            min="0"
            placeholder="100.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability Status *
          </label>
          <Select
            value={formData.isAvailable.toString()}
            onChange={(e) =>
              setFormData({ ...formData, isAvailable: e.target.value === 'true' })
            }
            required
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter room description"
            rows={4}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : room?.id ? 'Update Room' : 'Create Room'}
        </Button>
      </div>
    </form>
  );
}
