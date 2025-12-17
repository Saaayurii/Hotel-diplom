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
  Globe,
  MapPin,
  DoorOpen,
  Sparkles,
  CreditCard,
  FileText,
  ChevronLeft,
  ChevronRight,
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
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const menuItems = [
    { href: `/${locale}/admin`, label: t('dashboard'), icon: LayoutDashboard },
    { href: `/${locale}/admin/hotels`, label: t('hotels'), icon: Hotel },
    { href: `/${locale}/admin/rooms`, label: t('rooms'), icon: Bed },
    { href: `/${locale}/admin/bookings`, label: t('bookings'), icon: Calendar },
    { href: `/${locale}/admin/users`, label: t('users'), icon: Users },
    { href: `/${locale}/admin/reviews`, label: t('reviews'), icon: MessageSquare },
    { href: `/${locale}/admin/discounts`, label: t('discounts'), icon: Tag },
    { href: `/${locale}/admin/countries`, label: t('countries'), icon: Globe },
    { href: `/${locale}/admin/cities`, label: t('cities'), icon: MapPin },
    { href: `/${locale}/admin/room-types`, label: t('roomTypes'), icon: DoorOpen },
    { href: `/${locale}/admin/amenities`, label: t('amenities'), icon: Sparkles },
    { href: `/${locale}/admin/payment-methods`, label: t('paymentMethods'), icon: CreditCard },
    { href: `/${locale}/admin/booking-statuses`, label: t('bookingStatuses'), icon: FileText },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(`/${locale}/auth/login`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const currentPage = menuItems.find(item => pathname === item.href || (item.href !== `/${locale}/admin` && pathname.startsWith(item.href)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and Collapse Toggle */}
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 ${sidebarCollapsed ? 'px-2' : ''}`}>
            {!sidebarCollapsed && <Logo />}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hidden lg:block"
            >
              {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== `/${locale}/admin` && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-[#C9A56B] text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon size={20} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className={`p-3 border-t border-gray-200 dark:border-gray-800 ${sidebarCollapsed ? 'px-2' : ''}`}>
            <button
              onClick={handleLogout}
              title={sidebarCollapsed ? t('logout') : undefined}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <LogOut size={20} />
              {!sidebarCollapsed && <span>{t('logout')}</span>}
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentPage?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
