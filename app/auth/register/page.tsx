'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Logo } from '@/app/components/ui/Logo';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement registration logic
      console.log('Registration data:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Правая часть - форма регистрации */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Логотип */}
          <div className="mb-12">
            <Logo />
          </div>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-black mb-2">Join Us</h2>
            <p className="text-gray-600">Create your account to start your journey</p>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                label="FIRST NAME"
                placeholder="John"
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                })}
                error={errors.firstName?.message}
              />

              <Input
                type="text"
                label="LAST NAME"
                placeholder="Doe"
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                })}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              type="email"
              label="EMAIL"
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
            />

            <Input
              type="tel"
              label="PHONE"
              placeholder="+1 (555) 000-0000"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[\d\s\+\-\(\)]+$/,
                  message: 'Invalid phone number',
                },
              })}
              error={errors.phone?.message}
            />

            <Input
              type="password"
              label="PASSWORD"
              placeholder="Minimum 6 characters"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
            />

            <Input
              type="password"
              label="CONFIRM PASSWORD"
              placeholder="Re-enter your password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === password || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
            />

            <div className="pt-2">
              <label className="flex items-start text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 mt-0.5 w-4 h-4 border-gray-300 rounded text-[#C9A56B] focus:ring-[#C9A56B]"
                  {...register('acceptTerms', {
                    required: 'You must accept the terms and conditions',
                  })}
                />
                <span>
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-[#C9A56B] hover:text-black transition-colors"
                  >
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-[#C9A56B] hover:text-black transition-colors"
                  >
                    Privacy Policy
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
              Create Account
            </Button>
          </form>

          {/* Разделитель */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Вход */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-[#C9A56B] hover:text-black font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Декоративная линия внизу */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500 tracking-wider">
              START YOUR ADVENTURE TODAY
            </p>
          </div>
        </div>
      </div>

      {/* Декоративный правый блок */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F5F3F0] relative overflow-hidden">
        {/* Фоновая сетка */}
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

        {/* Декоративные элементы */}
        <div className="absolute top-20 left-20 w-32 h-32 border-l-2 border-t-2 border-[#C9A56B]" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border-r-2 border-b-2 border-[#C9A56B]" />

        {/* Карта */}
        <div className="absolute top-1/4 right-20 opacity-40">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
            {/* Упрощенная карта Европы */}
            <path
              d="M150 100 L180 120 L190 140 L180 160 L190 180 L170 200 L150 190 L130 200 L110 180 L120 160 L110 140 L120 120 Z"
              stroke="#C9A56B"
              strokeWidth="2"
              fill="#C9A56B"
              fillOpacity="0.2"
            />
          </svg>
        </div>

        {/* Текстовый контент */}
        <div className="relative z-10 flex flex-col justify-center px-20">
          <h2 className="text-5xl font-serif text-black leading-tight mb-6">
            ARE YOU<br />
            <span className="text-[#C9A56B]">READY?</span>
          </h2>
          <p className="text-gray-600 italic text-lg font-serif mb-8">
            adventure time is today
          </p>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-[#C9A56B] rounded-full flex items-center justify-center">
                <span className="text-[#C9A56B] font-bold">✓</span>
              </div>
              <span>Exclusive travel packages</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-[#C9A56B] rounded-full flex items-center justify-center">
                <span className="text-[#C9A56B] font-bold">✓</span>
              </div>
              <span>Best price guarantee</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-[#C9A56B] rounded-full flex items-center justify-center">
                <span className="text-[#C9A56B] font-bold">✓</span>
              </div>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
