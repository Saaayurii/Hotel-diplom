'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';

interface BookingStatus {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  _count: {
    bookings: number;
  };
}

interface BookingStatusFormData {
  name: string;
  description: string;
  color: string;
}

export default function BookingStatusesPage() {
  const [bookingStatuses, setBookingStatuses] = useState<BookingStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<BookingStatus | null>(null);
  const t = useTranslations('admin.bookingStatuses');
  const tCommon = useTranslations('admin.common');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingStatusFormData>();

  useEffect(() => {
    fetchBookingStatuses();
  }, []);

  const fetchBookingStatuses = async () => {
    try {
      const response = await fetch('/api/admin/booking-statuses');
      const data = await response.json();
      setBookingStatuses(data);
    } catch (error) {
      console.error('Error fetching booking statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: BookingStatusFormData) => {
    try {
      const url = editingStatus
        ? `/api/admin/booking-statuses/${editingStatus.id}`
        : '/api/admin/booking-statuses';
      const method = editingStatus ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchBookingStatuses();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving booking status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(tCommon('deleteConfirm'))) return;

    try {
      await fetch(`/api/admin/booking-statuses/${id}`, { method: 'DELETE' });
      fetchBookingStatuses();
    } catch (error) {
      console.error('Error deleting booking status:', error);
    }
  };

  const openModal = (status?: BookingStatus) => {
    if (status) {
      setEditingStatus(status);
      reset({
        name: status.name,
        description: status.description || '',
        color: status.color || '#000000',
      });
    } else {
      setEditingStatus(null);
      reset({ name: '', description: '', color: '#4F46E5' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStatus(null);
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
                  {t('description')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('color')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {t('bookings')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  {tCommon('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookingStatuses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    {tCommon('noData')}
                  </td>
                </tr>
              ) : (
                bookingStatuses.map((status) => (
                  <tr key={status.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{status.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 max-w-md truncate">
                      {status.description || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: status.color || '#000000' }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{status.color}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{status._count.bookings}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(status)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#C9A56B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(status.id)}
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
        title={editingStatus ? tCommon('edit') : t('add')}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t('color')}
            </label>
            <input
              type="color"
              {...register('color')}
              className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
            />
          </div>
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
