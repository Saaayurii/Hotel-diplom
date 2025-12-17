'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';
import { Select } from '@/app/components/ui/Select';

interface Amenity {
  id: string;
  name: string;
  description: string | null;
  category: string;
  icon: string | null;
}

interface AmenityFormData {
  name: string;
  description: string;
  category: string;
  icon: string;
}

const AMENITY_CATEGORIES = [
  { value: 'GENERAL', label: 'General' },
  { value: 'BATHROOM', label: 'Bathroom' },
  { value: 'BEDROOM', label: 'Bedroom' },
  { value: 'ENTERTAINMENT', label: 'Entertainment' },
  { value: 'FOOD_DRINK', label: 'Food & Drink' },
  { value: 'INTERNET', label: 'Internet' },
  { value: 'SERVICES', label: 'Services' },
];

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null);
  const t = useTranslations('admin.amenities');
  const tCommon = useTranslations('admin.common');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AmenityFormData>();

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      const response = await fetch('/api/admin/amenities');
      const data = await response.json();
      setAmenities(data);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AmenityFormData) => {
    try {
      const url = editingAmenity
        ? `/api/admin/amenities/${editingAmenity.id}`
        : '/api/admin/amenities';
      const method = editingAmenity ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchAmenities();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving amenity:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(tCommon('deleteConfirm'))) return;

    try {
      await fetch(`/api/admin/amenities/${id}`, { method: 'DELETE' });
      fetchAmenities();
    } catch (error) {
      console.error('Error deleting amenity:', error);
    }
  };

  const openModal = (amenity?: Amenity) => {
    if (amenity) {
      setEditingAmenity(amenity);
      reset({
        name: amenity.name,
        description: amenity.description || '',
        category: amenity.category,
        icon: amenity.icon || '',
      });
    } else {
      setEditingAmenity(null);
      reset({ name: '', description: '', category: 'GENERAL', icon: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAmenity(null);
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-black dark:text-white mb-2">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
        </div>
        <Button variant="primary" onClick={() => openModal()} className="w-full sm:w-auto">
          <Plus size={20} />
          {t('add')}
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('name')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('category')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('description')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  {tCommon('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {amenities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    {tCommon('noData')}
                  </td>
                </tr>
              ) : (
                amenities.map((amenity) => (
                  <tr key={amenity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{amenity.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{amenity.category}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 max-w-md truncate">
                      {amenity.description || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(amenity)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#C9A56B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(amenity.id)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
        title={editingAmenity ? tCommon('edit') : t('add')}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={t('name')}
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Select
            label={t('category')}
            {...register('category', { required: 'Category is required' })}
            error={errors.category?.message}
            options={AMENITY_CATEGORIES}
          />
          <Textarea
            label={t('description')}
            rows={3}
            {...register('description')}
            error={errors.description?.message}
          />
          <Input
            label={t('icon')}
            placeholder="wifi, tv, etc."
            {...register('icon')}
            error={errors.icon?.message}
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
