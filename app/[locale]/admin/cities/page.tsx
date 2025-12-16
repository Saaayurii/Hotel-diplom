'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { Select } from '@/app/components/ui/Select';

interface City {
  id: string;
  name: string;
  countryId: string;
  country: {
    name: string;
    code: string;
  };
}

interface Country {
  id: string;
  name: string;
  code: string;
}

interface CityFormData {
  name: string;
  countryId: string;
}

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const t = useTranslations('admin.cities');
  const tCommon = useTranslations('admin.common');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CityFormData>();

  useEffect(() => {
    fetchCities();
    fetchCountries();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/admin/cities');
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/admin/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const onSubmit = async (data: CityFormData) => {
    try {
      const url = editingCity
        ? `/api/admin/cities/${editingCity.id}`
        : '/api/admin/cities';
      const method = editingCity ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchCities();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(tCommon('deleteConfirm'))) return;

    try {
      await fetch(`/api/admin/cities/${id}`, { method: 'DELETE' });
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const openModal = (city?: City) => {
    if (city) {
      setEditingCity(city);
      reset({ name: city.name, countryId: city.countryId });
    } else {
      setEditingCity(null);
      reset({ name: '', countryId: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCity(null);
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
                  {t('country')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {tCommon('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cities.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    {tCommon('noData')}
                  </td>
                </tr>
              ) : (
                cities.map((city) => (
                  <tr key={city.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{city.name}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {city.country.name} ({city.country.code})
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(city)}
                          className="p-2 text-gray-600 hover:text-[#C9A56B] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(city.id)}
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
        title={editingCity ? tCommon('edit') : t('add')}
        size="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={t('name')}
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Select
            label={t('country')}
            {...register('countryId', { required: 'Country is required' })}
            error={errors.countryId?.message}
            options={countries.map(c => ({ value: c.id, label: `${c.name} (${c.code})` }))}
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
