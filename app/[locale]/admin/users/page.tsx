'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, Calendar, Shield, Search, ChevronDown, UserPlus, Edit, Trash2 } from 'lucide-react';
import { TableSkeleton } from '@/app/components/ui/Skeleton';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  dateOfBirth: string | null;
  role: 'ADMIN' | 'MANAGER' | 'CUSTOMER';
  isActive: boolean;
  createdAt: string;
  _count: {
    bookings: number;
    reviews: number;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const t = useTranslations('admin.users');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        if (roleFilter === 'all') return true;
        return user.role === roleFilter;
      })
      .filter(user => {
        if (statusFilter === 'all') return true;
        return statusFilter === 'active' ? user.isActive : !user.isActive;
      })
      .filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [users, searchTerm, roleFilter, statusFilter]);

  const formatDate = (date: string) => new Date(date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Input
            type="text"
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            icon={Search}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-36">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="CUSTOMER">Customer</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative w-full sm:w-36">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <Button variant="primary" className="flex-shrink-0 w-full sm:w-auto">
            <UserPlus size={20} />
            Add User
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <TableSkeleton rows={8} columns={6} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">User</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Contact</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Role</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Activity</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Joined</th>
                  <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="p-4 text-right font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 align-top">
                        <div className="font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</div>
                        {user.dateOfBirth && <div className="text-gray-500 text-xs">Born {formatDate(user.dateOfBirth)}</div>}
                      </td>
                      <td className="p-4 align-top text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2"> <Mail size={14}/> {user.email}</div>
                        {user.phone && <div className="flex items-center gap-2 mt-1"><Phone size={14}/>{user.phone}</div>}
                      </td>
                      <td className="p-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'ADMIN' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                            user.role === 'MANAGER' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-300'
                          }`}
                        >
                          <Shield size={12}/>{user.role}
                        </span>
                      </td>
                      <td className="p-4 align-top text-gray-600 dark:text-gray-400">
                        <div>{user._count.bookings} bookings</div>
                        <div>{user._count.reviews} reviews</div>
                      </td>
                      <td className="p-4 align-top text-gray-600 dark:text-gray-400">{formatDate(user.createdAt)}</td>
                      <td className="p-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
                            user.isActive
                              ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
                              : 'bg-gray-100 dark:bg-gray-700/60 text-gray-800 dark:text-gray-300'
                          }`}
                        >
                           <span className={`h-2 w-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                          {user.isActive ? t('active') : t('inactive')}
                        </span>
                      </td>
                      <td className="p-4 align-top text-right">
                        <div className="inline-flex items-center gap-1">
                          <Button variant="ghost" size="icon"><Edit size={16} /></Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 size={16} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
