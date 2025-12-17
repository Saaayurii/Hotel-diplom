'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Briefcase, Users, Heart, Coffee, ArrowRight, Building, Award, TrendingUp } from 'lucide-react';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';

const CareersPage = () => {
  const t = useTranslations('Careers');

  const jobOpenings = [
    {
      title: t('jobs.job1.title'),
      department: t('jobs.job1.department'),
      location: t('jobs.job1.location'),
      type: t('jobs.job1.type'),
    },
    {
      title: t('jobs.job2.title'),
      department: t('jobs.job2.department'),
      location: t('jobs.job2.location'),
      type: t('jobs.job2.type'),
    },
    {
        title: t('jobs.job3.title'),
        department: t('jobs.job3.department'),
        location: t('jobs.job3.location'),
        type: t('jobs.job3.type'),
    },
    {
        title: t('jobs.job4.title'),
        department: t('jobs.job4.department'),
        location: t('jobs.job4.location'),
        type: t('jobs.job4.type'),
    },
  ];

  const values = [
    {
      icon: <Users size={32} className="text-[#C9A56B]" />,
      title: t('values.value1.title'),
      description: t('values.value1.description'),
    },
    {
      icon: <Heart size={32} className="text-[#C9A56B]" />,
      title: t('values.value2.title'),
      description: t('values.value2.description'),
    },
    {
      icon: <TrendingUp size={32} className="text-[#C9A56B]" />,
      title: t('values.value3.title'),
      description: t('values.value3.description'),
    },
  ];

  const benefits = [
    {
        icon: <Award size={40} className="text-[#C9A56B]" />,
        title: t('benefits.benefit1.title'),
        description: t('benefits.benefit1.description'),
    },
    {
        icon: <Coffee size={40} className="text-[#C9A56B]" />,
        title: t('benefits.benefit2.title'),
        description: t('benefits.benefit2.description'),
    },
    {
        icon: <Building size={40} className="text-[#C9A56B]" />,
        title: t('benefits.benefit3.title'),
        description: t('benefits.benefit3.description'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white dark:bg-black text-gray-800 dark:text-gray-200">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/4.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">{t('values.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">{t('values.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">{t('benefits.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t('benefits.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-8 border border-gray-200 dark:border-gray-700 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('jobs.title')}</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg">
                <div>
                  <h3 className="text-xl font-bold text-[#C9A56B]">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {job.department} &middot; {job.location} &middot; {job.type}
                  </p>
                </div>
                <button className="flex items-center text-[#C9A56B] font-semibold">
                  {t('jobs.applyNow')} <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">{t('cta.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <button className="mt-8 bg-[#C9A56B] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
            {t('cta.button')}
          </button>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
