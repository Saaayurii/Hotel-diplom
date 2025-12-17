'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Moon, Sun, User, Home, Building2, DoorOpen, Info, Phone, Globe } from 'lucide-react';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const navLinks = [
    { href: `/${locale}`, label: t('home'), icon: Home },
    { href: `/${locale}/hotels`, label: t('hotels'), icon: Building2 },
    { href: `/${locale}/rooms`, label: t('rooms'), icon: DoorOpen },
    { href: `/${locale}/about`, label: t('about'), icon: Info },
    { href: `/${locale}/contact`, label: t('contact'), icon: Phone },
    { href: `/${locale}/press`, label: t('press'), icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-[#C9A56B]'
                      : 'text-gray-700 hover:text-[#C9A56B] dark:text-gray-300 dark:hover:text-[#C9A56B]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side - Actions & Controls */}
            <div className="flex items-center gap-3">
              {/* Login/Profile Button - Desktop */}
              <Link
                href={`/${locale}/auth/login`}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A56B] text-white hover:bg-[#B89560] transition-colors"
              >
                <User size={18} />
                <span className="text-sm font-medium">{t('signIn')}</span>
              </Link>

              {/* Theme toggle - Desktop */}
              <button
                onClick={toggleTheme}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:border-[#C9A56B] hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon size={18} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun size={18} className="text-gray-600 dark:text-gray-300" />
                )}
              </button>

              {/* Language switcher - Desktop */}
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
        <div className="grid grid-cols-7 h-16">
          {/* Navigation Links */}
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  active
                    ? 'text-[#C9A56B]'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium truncate max-w-full px-0.5">
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center gap-0.5 text-gray-500 dark:text-gray-400"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span className="text-[10px] font-medium">
              {theme === 'light' ? t('dark') : t('light')}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={switchLanguage}
            className="flex flex-col items-center justify-center gap-0.5 text-gray-500 dark:text-gray-400"
            aria-label="Switch language"
          >
            <Globe size={20} />
            <span className="text-[10px] font-medium uppercase">{locale}</span>
          </button>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="lg:hidden h-16" />
    </>
  );
}
