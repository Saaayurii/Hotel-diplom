'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { MapDecoration } from '@/app/components/ui/MapDecoration';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto text-[#C9A56B]" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{t('lastUpdated')}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <h2>{t('section1Title')}</h2>
          <p>{t('section1Text')}</p>

          <h2>{t('section2Title')}</h2>
          <p>{t('section2Text')}</p>

          <h2>{t('section3Title')}</h2>
          <p>{t('section3Text')}</p>
        </div>

        <div className="mt-24 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('madeInDonbass')}
            </h2>
            <div className="relative max-w-4xl mx-auto h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <MapDecoration />
            </div>
             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">Приложение сделано на Донбассе</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
