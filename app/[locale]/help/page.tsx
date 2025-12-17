'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { LifeBuoy, ShieldCheck, BookOpen } from 'lucide-react';

export default function HelpPage() {
  const t = useTranslations('Help');

  const faqItems = [
    {
      question: t('faq.item1.question'),
      answer: t('faq.item1.answer'),
    },
    {
      question: t('faq.item2.question'),
      answer: t('faq.item2.answer'),
    },
    {
      question: t('faq.item3.question'),
      answer: t('faq.item3.answer'),
    },
    {
        question: t('faq.item4.question'),
        answer: t('faq.item4.answer'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <LifeBuoy className="w-16 h-16 mx-auto mb-4 text-[#C9A56B]" />
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-start">
          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('faq.title')}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact and Guidelines Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                    <ShieldCheck className="w-8 h-8 text-[#C9A56B] mr-4" />
                    <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
                        {t('contact.title')}
                    </h2>
                </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('contact.description')}
              </p>
              <a 
                href="mailto:support@timeout.com"
                className="inline-block bg-[#C9A56B] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {t('contact.button')}
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                    <BookOpen className="w-8 h-8 text-[#C9A56B] mr-4" />
                    <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
                        {t('guidelines.title')}
                    </h2>
                </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('guidelines.description')}
              </p>
              <a 
                href="/privacy"
                className="text-[#C9A56B] font-semibold hover:underline"
              >
                {t('guidelines.link')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
