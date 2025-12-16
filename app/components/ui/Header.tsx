'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Moon, Sun, Menu, X, User } from 'lucide-react';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('Header');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/hotels`, label: 'Hotels' },
    { href: `/${locale}/rooms`, label: 'Rooms' },
    { href: `/${locale}/about`, label: 'About' },
    { href: `/${locale}/contact`, label: 'Contact' },
  ];

  return (
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
                className="text-sm font-medium text-gray-700 hover:text-[#C9A56B] transition-colors dark:text-gray-300 dark:hover:text-[#C9A56B]"
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
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A56B] text-white hover:bg-[#B89560] transition-colors"
            >
              <User size={18} />
              <span className="text-sm font-medium">Sign In</span>
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:border-[#C9A56B] hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun size={18} className="text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:border-[#C9A56B] transition-colors dark:border-gray-700"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu size={20} className="text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#C9A56B] transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/auth/login`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg bg-[#C9A56B] text-white hover:bg-[#B89560] transition-colors"
            >
              <User size={18} />
              <span className="text-sm font-medium">Sign In</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
