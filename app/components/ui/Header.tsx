'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Moon, Sun } from 'lucide-react';

export function Header() {
  const locale = useLocale();
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`}>
            <Logo />
          </Link>

          {/* Right side - Theme & Language switchers */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </header>
  );
}
