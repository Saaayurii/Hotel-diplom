'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Logo } from '@/app/components/ui/Logo';
import { LanguageSwitcher } from '@/app/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/app/components/ui/ThemeSwitcher';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const t = useTranslations('auth.login');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || t('loginFailed'));
        return;
      }

      // Redirect based on role
      if (result.user.role === 'ADMIN' || result.user.role === 'MANAGER') {
        window.location.href = `/${locale}/admin`;
      } else {
        window.location.href = `/${locale}`;
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(t('genericError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with language and theme switchers */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      <div className="flex flex-1">
      {/* Decorative left block with grid */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F5F3F0] dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, #C9A56B 1px, transparent 1px),
                linear-gradient(to bottom, #C9A56B 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="absolute top-20 left-20 w-32 h-32 border-l-2 border-t-2 border-[#C9A56B]" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border-r-2 border-b-2 border-[#C9A56B]" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            className="opacity-30"
          >
            <circle cx="100" cy="100" r="80" stroke="#C9A56B" strokeWidth="2" />
            <circle cx="100" cy="100" r="60" stroke="#C9A56B" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="40" stroke="#C9A56B" strokeWidth="2" />
            <line x1="100" y1="160" x2="100" y2="180" stroke="#C9A56B" strokeWidth="2" />
            <line x1="20" y1="100" x2="40" y2="100" stroke="#C9A56B" strokeWidth="2" />
            <line x1="160" y1="100" x2="180" y2="100" stroke="#C9A56B" strokeWidth="2" />
            <polygon points="100,50 95,100 100,90 105,100" fill="#C9A56B" />
            <polygon points="100,150 95,100 100,110 105,100" fill="#8B7355" />
            <circle cx="100" cy="100" r="5" fill="#C9A56B" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-20">
          <h2 className="text-5xl font-serif text-black dark:text-white leading-tight mb-6">
            IT'S TIME<br />
            TO EXPLORE<br />
            THE WORLD
          </h2>
          <p className="text-gray-600 dark:text-gray-400 italic text-lg font-serif">
            adventure time is today
          </p>
        </div>
      </div>

      {/* Right part - login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">

          <div className="flex justify-between items-center mb-12">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#C9A56B] transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {tCommon('goBack')}
            </Link>
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-black dark:text-white mb-2">{t('title')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              type="email"
              label={t('email')}
              placeholder={t('emailPlaceholder')}
              {...register('email', {
                required: t('emailIsRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalidEmail'),
                },
              })}
              error={errors.email?.message}
            />

            <Input
              type="password"
              label={t('password')}
              placeholder={t('passwordPlaceholder')}
              {...register('password', {
                required: t('passwordIsRequired'),
                minLength: {
                  value: 6,
                  message: t('passwordMinLength'),
                },
              })}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 border-gray-300 dark:border-gray-600 rounded text-[#C9A56B] focus:ring-[#C9A56B] dark:bg-gray-700"
                />
                <span className="text-gray-600 dark:text-gray-400">{t('rememberMe')}</span>
              </label>
              <Link
                href={`/${locale}/auth/forgot-password`}
                className="text-[#C9A56B] hover:text-black dark:hover:text-white transition-colors"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              {t('signIn')}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">OR</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {t('noAccount')}{' '}
              <Link
                href={`/${locale}/auth/register`}
                className="text-[#C9A56B] hover:text-black dark:hover:text-white font-medium transition-colors"
              >
                {t('createAccount')}
              </Link>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 tracking-wider">
              {t('tagline')}
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
