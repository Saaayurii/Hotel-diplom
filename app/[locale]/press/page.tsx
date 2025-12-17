'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { Newspaper, Users, Award, Mail, Phone, Download, ExternalLink } from 'lucide-react';

export default function PressPage() {
  const t = useTranslations('PressPage');

  const pressReleases = [
    {
      date: '2025-12-15',
      title: t('release1.title'),
      excerpt: t('release1.excerpt'),
    },
    {
      date: '2025-11-28',
      title: t('release2.title'),
      excerpt: t('release2.excerpt'),
    },
    {
      date: '2025-10-10',
      title: t('release3.title'),
      excerpt: t('release3.excerpt'),
    },
  ];

  const mediaLogos = [
    { name: 'Travel Weekly', opacity: 0.6 },
    { name: 'Forbes Travel', opacity: 0.7 },
    { name: 'Conde Nast', opacity: 0.6 },
    { name: 'BBC Travel', opacity: 0.7 },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A56B]/10 border border-[#C9A56B]/20 mb-6">
                <Newspaper className="w-4 h-4 text-[#C9A56B]" />
                <span className="text-sm font-medium text-[#C9A56B]">{t('hero.badge')}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {t('hero.title')}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#press-kit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C9A56B] text-white hover:bg-[#B89560] transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">{t('hero.downloadKit')}</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-[#C9A56B] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">{t('hero.contactPress')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A56B] mb-2">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('stats.hotels')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A56B] mb-2">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('stats.customers')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A56B] mb-2">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('stats.countries')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A56B] mb-2">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('stats.satisfaction')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases Section */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('releases.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {t('releases.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {pressReleases.map((release, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-[#C9A56B] transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                          {new Date(release.date).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-[#C9A56B] transition-colors">
                          {release.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {release.excerpt}
                        </p>
                        <button className="inline-flex items-center gap-2 text-[#C9A56B] hover:gap-3 transition-all">
                          <span className="font-medium">{t('releases.readMore')}</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Coverage Section */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('media.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('media.subtitle')}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {mediaLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all"
                    style={{ opacity: logo.opacity }}
                  >
                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {logo.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Press Kit Section */}
        <section id="press-kit" className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('pressKit.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {t('pressKit.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <Award className="w-10 h-10 text-[#C9A56B] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('pressKit.brandAssets')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('pressKit.brandAssetsDesc')}
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#C9A56B] hover:gap-3 transition-all">
                    <Download className="w-4 h-4" />
                    <span className="font-medium">{t('pressKit.download')}</span>
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <Users className="w-10 h-10 text-[#C9A56B] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('pressKit.companyInfo')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('pressKit.companyInfoDesc')}
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#C9A56B] hover:gap-3 transition-all">
                    <Download className="w-4 h-4" />
                    <span className="font-medium">{t('pressKit.download')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Contact Section */}
        <section id="contact" className="py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('contact.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {t('contact.subtitle')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#C9A56B]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#C9A56B]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {t('contact.email')}
                      </div>
                      <a
                        href="mailto:press@timeout-travel.com"
                        className="text-[#C9A56B] hover:underline"
                      >
                        press@timeout-travel.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#C9A56B]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#C9A56B]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {t('contact.phone')}
                      </div>
                      <a
                        href="tel:+15551234567"
                        className="text-[#C9A56B] hover:underline"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('contact.hours')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
