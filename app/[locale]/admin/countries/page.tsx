'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';

interface Country {
  id: string;
  name: string;
  code: string;
  _count: {
    cities: number;
  };
}

interface CountryFormData {
  name: string;
  code: string;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const t = useTranslations('admin.countries');
  const tCommon = useTranslations('admin.common');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CountryFormData>();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/admin/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CountryFormData) => {
    try {
      const url = editingCountry
        ? `/api/admin/countries/${editingCountry.id}`
        : '/api/admin/countries';
      const method = editingCountry ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchCountries();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving country:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(tCommon('deleteConfirm'))) return;

    try {
      await fetch(`/api/admin/countries/${id}`, { method: 'DELETE' });
      fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const openModal = (country?: Country) => {
    if (country) {
      setEditingCountry(country);
      reset({ name: country.name, code: country.code });
    } else {
      setEditingCountry(null);
      reset({ name: '', code: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCountry(null);
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
                  {t('code')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {t('cities')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {tCommon('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {countries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    {tCommon('noData')}
                  </td>
                </tr>
              ) : (
                countries.map((country) => (
                  <tr key={country.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{country.name}</td>
                    <td className="px-6 py-4 text-gray-600">{country.code}</td>
                    <td className="px-6 py-4 text-gray-600">{country._count.cities}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(country)}
                          className="p-2 text-gray-600 hover:text-[#C9A56B] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(country.id)}
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
        title={editingCountry ? tCommon('edit') : t('add')}
        size="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={t('name')}
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Input
            label={t('code')}
            placeholder="US"
            maxLength={2}
            {...register('code', {
              required: 'Code is required',
              minLength: { value: 2, message: 'Code must be 2 characters' },
              maxLength: { value: 2, message: 'Code must be 2 characters' },
            })}
            error={errors.code?.message}
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
