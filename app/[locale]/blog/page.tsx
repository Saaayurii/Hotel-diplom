'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';

export default function BlogPage() {
  const t = useTranslations('Blog');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg">
          {t('welcomeMessage')}
        </p>
        {/* Add more blog content here */}
      </main>
      <Footer />
    </div>
  );
}
