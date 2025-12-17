'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { LifeBuoy, ShieldCheck, BookOpen, Search, User, Briefcase, Settings } from 'lucide-react';
import { useState } from 'react';

export default function HelpPage() {
  const t = useTranslations('Help');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('faq');

  const allFaqItems = [
    {
      category: 'General',
      question: t('faq.item1.question'),
      answer: t('faq.item1.answer'),
    },
    {
      category: 'General',
      question: t('faq.item2.question'),
      answer: t('faq.item2.answer'),
    },
    {
      category: 'Booking',
      question: t('faq.item3.question'),
      answer: t('faq.item3.answer'),
    },
    {
        category: 'Account',
        question: t('faq.item4.question'),
        answer: t('faq.item4.answer'),
    },
    {
        category: 'Booking',
        question: t('faq.item5.question'),
        answer: t('faq.item5.answer'),
    },
    {
        category: 'Account',
        question: t('faq.item6.question'),
        answer: t('faq.item6.answer'),
    },
  ];

  const filteredFaqItems = allFaqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return (
          <div className="space-y-6">
            {filteredFaqItems.length > 0 ? (
              filteredFaqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {item.answer}
                  </p>
                </div>
              ))
            ) : (
              <p>{t('faq.noResults')}</p>
            )}
          </div>
        );
      case 'getting-started':
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold">{t('gettingStarted.title')}</h3>
            <p>{t('gettingStarted.p1')}</p>
            <p>{t('gettingStarted.p2')}</p>
          </div>
        );
      case 'booking':
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold">{t('bookingManagement.title')}</h3>
            <p>{t('bookingManagement.p1')}</p>
            <p>{t('bookingManagement.p2')}</p>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold">{t('accountSettings.title')}</h3>
            <p>{t('accountSettings.p1')}</p>
            <p>{t('accountSettings.p2')}</p>
          </div>
        );
      default:
        return null;
    }
  };

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
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C9A56B]"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="font-serif text-xl font-bold mb-4">{t('navigation.title')}</h2>
              <nav className="space-y-2">
                {[
                  { id: 'faq', label: t('navigation.faq'), icon: BookOpen },
                  { id: 'getting-started', label: t('navigation.gettingStarted'), icon: User },
                  { id: 'booking', label: t('navigation.bookingManagement'), icon: Briefcase },
                  { id: 'account', label: t('navigation.accountSettings'), icon: Settings },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id 
                          ? 'bg-[#C9A56B] text-white' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <section className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              {renderContent()}
            </div>
          </section>
        </div>
        
        {/* Contact Section */}
        <section className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4 justify-center">
                    <ShieldCheck className="w-8 h-8 text-[#C9A56B] mr-4" />
                    <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
                        {t('contact.title')}
                    </h2>
                </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
                {t('contact.description')}
              </p>
              <a 
                href="mailto:support@timeout.com"
                className="inline-block bg-[#C9A56B] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {t('contact.button')}
              </a>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}