'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';

interface RoomType {
  id: string;
  name: string;
  description: string | null;
  maxGuests: number;
  _count: {
    rooms: number;
  };
}

interface RoomTypeFormData {
  name: string;
  description: string;
  maxGuests: number;
}

export default function RoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);
  const t = useTranslations('admin.roomTypes');
  const tCommon = useTranslations('admin.common');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RoomTypeFormData>();

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const response = await fetch('/api/admin/room-types');
      const data = await response.json();
      setRoomTypes(data);
    } catch (error) {
      console.error('Error fetching room types:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: RoomTypeFormData) => {
    try {
      const url = editingRoomType
        ? `/api/admin/room-types/${editingRoomType.id}`
        : '/api/admin/room-types';
      const method = editingRoomType ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchRoomTypes();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving room type:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(tCommon('deleteConfirm'))) return;

    try {
      await fetch(`/api/admin/room-types/${id}`, { method: 'DELETE' });
      fetchRoomTypes();
    } catch (error) {
      console.error('Error deleting room type:', error);
    }
  };

  const openModal = (roomType?: RoomType) => {
    if (roomType) {
      setEditingRoomType(roomType);
      reset({
        name: roomType.name,
        description: roomType.description || '',
        maxGuests: roomType.maxGuests,
      });
    } else {
      setEditingRoomType(null);
      reset({ name: '', description: '', maxGuests: 2 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoomType(null);
    reset();
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
          <h1 className="text-3xl font-serif text-black mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
        <Button variant="primary" onClick={() => openModal()}>
          <Plus size={20} className="mr-2" />
          {t('add')}
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {t('name')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {t('description')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {t('maxGuests')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Rooms
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {tCommon('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {roomTypes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {tCommon('noData')}
                  </td>
                </tr>
              ) : (
                roomTypes.map((roomType) => (
                  <tr key={roomType.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{roomType.name}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                      {roomType.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{roomType.maxGuests}</td>
                    <td className="px-6 py-4 text-gray-600">{roomType._count.rooms}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(roomType)}
                          className="p-2 text-gray-600 hover:text-[#C9A56B] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(roomType.id)}
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
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingRoomType ? tCommon('edit') : t('add')}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={t('name')}
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Textarea
            label={t('description')}
            rows={3}
            {...register('description')}
            error={errors.description?.message}
          />
          <Input
            type="number"
            label={t('maxGuests')}
            min={1}
            {...register('maxGuests', {
              required: 'Max guests is required',
              min: { value: 1, message: 'Must be at least 1' },
            })}
            error={errors.maxGuests?.message}
          />
          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={closeModal}>
              {tCommon('cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {tCommon('save')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
