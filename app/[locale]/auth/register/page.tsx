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

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');
  const t = useTranslations('auth.register');
  const commonT = useTranslations('common');
  const locale = useLocale();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || t('registrationFailed'));
        return;
      }

      window.location.href = `/${locale}`;
    } catch (error) {
      console.error('Registration error:', error);
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
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">

          <div className="mb-12">
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-black dark:text-white mb-2">{t('title')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                label={t('firstName')}
                placeholder={t('firstNamePlaceholder')}
                {...register('firstName', {
                  required: t('firstNameRequired'),
                  minLength: {
                    value: 2,
                    message: t('firstNameMinLength'),
                  },
                })}
                error={errors.firstName?.message}
              />

              <Input
                type="text"
                label={t('lastName')}
                placeholder={t('lastNamePlaceholder')}
                {...register('lastName', {
                  required: t('lastNameRequired'),
                  minLength: {
                    value: 2,
                    message: t('lastNameMinLength'),
                  },
                })}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              type="email"
              label={t('email')}
              placeholder={t('emailPlaceholder')}
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalidEmail'),
                },
              })}
              error={errors.email?.message}
            />

            <Input
              type="tel"
              label={t('phone')}
              placeholder={t('phonePlaceholder')}
              {...register('phone', {
                required: t('phoneRequired'),
                pattern: {
                  value: /^[\d\s\+\-\(\)]+$/,
                  message: t('invalidPhone'),
                },
              })}
              error={errors.phone?.message}
            />

            <Input
              type="password"
              label={t('password')}
              placeholder={t('passwordPlaceholder')}
              {...register('password', {
                required: t('passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('passwordMinLength'),
                },
              })}
              error={errors.password?.message}
            />

            <Input
              type="password"
              label={t('confirmPassword')}
              placeholder={t('confirmPasswordPlaceholder')}
              {...register('confirmPassword', {
                required: t('confirmPasswordRequired'),
                validate: value =>
                  value === password || t('passwordsDoNotMatch'),
              })}
              error={errors.confirmPassword?.message}
            />

            <div className="pt-2">
              <label className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  className="mr-2 mt-0.5 w-4 h-4 border-gray-300 dark:border-gray-600 rounded text-[#C9A56B] focus:ring-[#C9A56B] dark:bg-gray-700"
                  {...register('acceptTerms', {
                    required: t('acceptTermsRequired'),
                  })}
                />
                <span>
                  {t('acceptTerms')}{' '}
                  <Link
                    href={`/${locale}/terms`}
                    className="text-[#C9A56B] hover:text-black dark:hover:text-white transition-colors"
                  >
                    {t('termsAndConditions')}
                  </Link>{' '}
                  {t('and')}{' '}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-[#C9A56B] hover:text-black dark:hover:text-white transition-colors"
                  >
                    {t('privacyPolicy')}
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              {t('createAccount')}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">{t('or')}</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {t('haveAccount')}{' '}
              <Link
                href={`/${locale}/auth/login`}
                className="text-[#C9A56B] hover:text-black dark:hover:text-white font-medium transition-colors"
              >
                {t('signInHere')}
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 tracking-wider">
              {t('tagline')}
            </p>
          </div>
        </div>
      </div>

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

        <div className="absolute top-1/4 right-20 opacity-40">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
            <path
              d="M150 100 L180 120 L190 140 L180 160 L190 180 L170 200 L150 190 L130 200 L110 180 L120 160 L110 140 L120 120 Z"
              stroke="#C9A56B"
              strokeWidth="2"
              fill="#C9A56B"
              fillOpacity="0.2"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-20">
          <h2 className="text-5xl font-serif text-black dark:text-white leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: t.raw('decorativeTitle') }}
          />
          <p className="text-gray-600 dark:text-gray-400 italic text-lg font-serif mb-8">
            {t('decorativeSubtitle')}
          </p>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-[#C9A56B] rounded-full flex items-center justify-center">
                <span className="text-[#C9A56B] font-bold">✓</span>
              </div>
              <span>{t('feature1')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-[#C9A56B] rounded-full flex items-center justify-center">
                <span className="text-[#C9A56B] font-bold">✓</span>
              </div>
              <span>{t('feature2')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-[#C9A56B] rounded-full flex items-center justify-center">
                <span className="text-[#C9A56B] font-bold">✓</span>
              </div>
              <span>{t('feature3')}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
