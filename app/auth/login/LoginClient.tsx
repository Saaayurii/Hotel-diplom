'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { Logo } from '@/app/components/ui/Logo';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginClient() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

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
        alert(result.error || 'Login failed');
        return;
      }

      // Redirect based on role
      if (result.user.role === 'ADMIN' || result.user.role === 'MANAGER') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Декоративный левый блок с сеткой */}
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

        {/* Компас */}
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

        {/* Текстовый контент */}
        <div className="relative z-10 flex flex-col justify-center px-20">
          <h2 className="text-5xl font-serif text-black leading-tight mb-6">
            IT'S TIME<br />
            TO EXPLORE<br />
            THE WORLD
          </h2>
          <p className="text-gray-600 italic text-lg font-serif">
            adventure time is today
          </p>
        </div>
      </div>

      {/* Правая часть - форма входа */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Логотип */}
          <div className="mb-12">
            <Logo />
          </div>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-black mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              type="password"
              label="PASSWORD"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 border-gray-300 rounded text-[#C9A56B] focus:ring-[#C9A56B]"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-[#C9A56B] hover:text-black transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Sign In
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

          {/* Регистрация */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="text-[#C9A56B] hover:text-black font-medium transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Декоративная линия внизу */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500 tracking-wider">
              THE BEST OPPORTUNITY TO TRAVEL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
