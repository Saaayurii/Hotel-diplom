'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/app/components/ui/Input';
import { Select } from '@/app/components/ui/Select';
import { Textarea } from '@/app/components/ui/Textarea';
import { Button } from '@/app/components/ui/Button';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';

interface City {
  id: string;
  name: string;
  country: {
    name: string;
  };
}

interface Hotel {
  id?: string;
  name: string;
  description?: string;
  stars: number;
  phone?: string;
  email?: string;
  checkInTime: string;
  checkOutTime: string;
  isActive: boolean;
  addressId?: string;
  address?: {
    street: string;
    building: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    cityId: string;
  };
}

interface HotelFormProps {
  hotel?: Hotel | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function HotelForm({ hotel, onSuccess, onCancel }: HotelFormProps) {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [formData, setFormData] = useState({
    name: hotel?.name || '',
    description: hotel?.description || '',
    stars: hotel?.stars || 3,
    phone: hotel?.phone || '',
    email: hotel?.email || '',
    checkInTime: hotel?.checkInTime || '14:00',
    checkOutTime: hotel?.checkOutTime || '12:00',
    isActive: hotel?.isActive ?? true,
    street: hotel?.address?.street || '',
    building: hotel?.address?.building || '',
    postalCode: hotel?.address?.postalCode || '',
    latitude: hotel?.address?.latitude || undefined,
    longitude: hotel?.address?.longitude || undefined,
    cityId: hotel?.address?.cityId || '',
  });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/admin/cities');
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      showErrorToast('Failed to load cities');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = hotel?.id ? `/api/admin/hotels/${hotel.id}` : '/api/admin/hotels';
      const method = hotel?.id ? 'PUT' : 'POST';

      const payload = hotel?.id
        ? {
            name: formData.name,
            description: formData.description,
            stars: Number(formData.stars),
            phone: formData.phone,
            email: formData.email,
            checkInTime: formData.checkInTime,
            checkOutTime: formData.checkOutTime,
            isActive: formData.isActive,
          }
        : {
            name: formData.name,
            description: formData.description,
            stars: Number(formData.stars),
            phone: formData.phone,
            email: formData.email,
            checkInTime: formData.checkInTime,
            checkOutTime: formData.checkOutTime,
            isActive: formData.isActive,
            address: {
              street: formData.street,
              building: formData.building,
              postalCode: formData.postalCode || undefined,
              latitude: formData.latitude ? Number(formData.latitude) : undefined,
              longitude: formData.longitude ? Number(formData.longitude) : undefined,
              cityId: formData.cityId,
            },
          };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save hotel');
      }

      showSuccessToast(hotel?.id ? 'Hotel updated successfully' : 'Hotel created successfully');
      onSuccess();
    } catch (error) {
      console.error('Error saving hotel:', error);
      showErrorToast('Failed to save hotel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hotel Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Enter hotel name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter hotel description"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stars *</label>
          <Select
            value={formData.stars.toString()}
            onChange={(e) => setFormData({ ...formData, stars: Number(e.target.value) })}
            required
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? 's' : ''}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
          <Select
            value={formData.isActive.toString()}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.value === 'true' })
            }
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 234 567 8900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="hotel@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Time *
          </label>
          <Input
            type="time"
            value={formData.checkInTime}
            onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Time *
          </label>
          <Input
            type="time"
            value={formData.checkOutTime}
            onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
            required
          />
        </div>
      </div>

      {!hotel?.id && (
        <>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street *
                </label>
                <Input
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  required
                  placeholder="Enter street name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building *
                </label>
                <Input
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  required
                  placeholder="Building number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <Select
                  value={formData.cityId}
                  onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                  required
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.country.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value ? Number(e.target.value) : undefined })
                  }
                  placeholder="40.7128"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value ? Number(e.target.value) : undefined })
                  }
                  placeholder="-74.0060"
                />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : hotel?.id ? 'Update Hotel' : 'Create Hotel'}
        </Button>
      </div>
    </form>
  );
}
