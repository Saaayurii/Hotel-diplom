'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Tag, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface Discount {
  id: string;
  code: string;
  description: string | null;
  type: string;
  value: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  maxUses: number | null;
  usedCount: number;
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await fetch('/api/admin/discounts');
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      console.error('Error fetching discounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this discount?')) return;

    try {
      await fetch(`/api/admin/discounts/${id}`, { method: 'DELETE' });
      fetchDiscounts();
    } catch (error) {
      console.error('Error deleting discount:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
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
          <h1 className="text-3xl font-serif text-black dark:text-white mb-2">Discounts Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage discount codes and promotions</p>
        </div>
        <Link href="/admin/discounts/new" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full">
            <Plus size={20} />
            Add Discount
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {discounts.length === 0 ? (
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400">
            No discounts found. Add your first discount to get started.
          </div>
        ) : (
          discounts.map((discount) => (
            <div
              key={discount.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={20} className="text-[#C9A56B]" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{discount.code}</h3>
                  </div>
                  {discount.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{discount.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/discounts/${discount.id}`}>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#C9A56B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Discount Value:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {discount.type === 'PERCENTAGE'
                      ? `${Number(discount.value)}%`
                      : `$${Number(discount.value)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Usage:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {discount.usedCount}
                    {discount.maxUses ? ` / ${discount.maxUses}` : ' / Unlimited'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Calendar size={14} />
                <span>
                  {formatDate(discount.validFrom)} - {formatDate(discount.validUntil)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    discount.isActive && !isExpired(discount.validUntil)
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  }`}
                >
                  {discount.isActive
                    ? isExpired(discount.validUntil)
                      ? 'Expired'
                      : 'Active'
                    : 'Inactive'}
                </span>
                {discount.type && (
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                    {discount.type}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
