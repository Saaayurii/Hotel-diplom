'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Shield } from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  dateOfBirth: string | null;
  role: string;
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-100 text-red-800',
      MANAGER: 'bg-blue-100 text-blue-800',
      CUSTOMER: 'bg-gray-100 text-gray-800',
    };
    return colors[role as keyof typeof colors] || colors.CUSTOMER;
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
          <h1 className="text-3xl font-serif text-black mb-2">Users Management</h1>
          <p className="text-gray-600">View and manage all users</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Bookings
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Reviews
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        {user.dateOfBirth && (
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Calendar size={12} />
                            <span>Born {formatDate(user.dateOfBirth)}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Mail size={14} />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Phone size={14} />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-gray-400" />
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{user._count.bookings}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{user._count.reviews}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
