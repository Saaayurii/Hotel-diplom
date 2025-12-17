'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Hotel, Bed, Calendar, Users, TrendingUp, DollarSign, Activity, AlertCircle } from 'lucide-react';

interface Stats {
  totalHotels: number;
  totalRooms: number;
  totalBookings: number;
  totalUsers: number;
  totalRevenue: number;
  activeBookings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('admin.dashboard');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: t('totalHotels'), value: stats?.totalHotels, icon: Hotel, color: 'text-blue-500' },
    { title: t('totalRooms'), value: stats?.totalRooms, icon: Bed, color: 'text-green-500' },
    { title: t('activeBookings'), value: stats?.activeBookings, icon: Calendar, color: 'text-purple-500' },
    { title: t('totalUsers'), value: stats?.totalUsers, icon: Users, color: 'text-orange-500' },
    { title: t('totalBookings'), value: stats?.totalBookings, icon: TrendingUp, color: 'text-indigo-500' },
    { title: t('totalRevenue'), value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign, color: 'text-emerald-500' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm animate-pulse">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="mt-4 h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="mt-2 h-8 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('recentActivity')}</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 h-48">
            <Activity size={40} className="mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t('noActivity')}</h3>
            <p className="text-sm">Check back later for updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
