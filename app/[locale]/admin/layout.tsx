'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import {
  LayoutDashboard,
  Hotel,
  Bed,
  Calendar,
  Users,
  MessageSquare,
  Tag,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Logo } from '@/app/components/ui/Logo';
import { LanguageSwitcher } from '@/app/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/app/components/ui/ThemeSwitcher';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('admin.sidebar');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { href: `/${locale}/admin`, label: t('dashboard'), icon: LayoutDashboard },
    { href: `/${locale}/admin/hotels`, label: t('hotels'), icon: Hotel },
    { href: `/${locale}/admin/rooms`, label: t('rooms'), icon: Bed },
    { href: `/${locale}/admin/bookings`, label: t('bookings'), icon: Calendar },
    { href: `/${locale}/admin/users`, label: t('users'), icon: Users },
    { href: `/${locale}/admin/reviews`, label: t('reviews'), icon: MessageSquare },
    { href: `/${locale}/admin/discounts`, label: t('discounts'), icon: Tag },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(`/${locale}/auth/login`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 hidden lg:block">
            <Logo />
            <div className="flex items-center gap-2 mt-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto mt-16 lg:mt-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#C9A56B] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
