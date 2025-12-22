'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Compass } from 'lucide-react';

export function Footer() {
  const locale = useLocale();
  const t = useTranslations('Footer');

  const footerLinks = {
    company: [
      { href: `/${locale}/about`, label: t('aboutUs') },
      { href: `/${locale}/careers`, label: t('careers') },
      { href: `/${locale}/press`, label: t('press') },
      { href: `/${locale}/blog`, label: t('blog') },
    ],
    support: [
      { href: `/${locale}/help`, label: t('helpCenter') },
      { href: `/${locale}/contact`, label: t('contactUs') },
      { href: `/${locale}/help`, label: t('faq') },
      { href: `/${locale}/privacy`, label: t('termsOfService') },
    ],
    destinations: [
      { href: `/${locale}/hotels`, label: t('allHotels') },
      { href: `/${locale}/rooms`, label: t('europe') },
      { href: `/${locale}/rooms`, label: t('asia') },
      { href: `/${locale}/rooms`, label: t('americas') },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800 pb-20 lg:pb-0">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A56B] to-transparent" />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              {t('experienceLuxury')}
            </p>

            {/* Decorative Compass */}
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-8 h-8 text-[#C9A56B]" />
              <p className="text-xs italic text-gray-500 dark:text-gray-500">
                {t('adventureTime')}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:border-[#C9A56B] hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:border-[#C9A56B] hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:border-[#C9A56B] hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#C9A56B] transition-colors dark:text-gray-400 dark:hover:text-[#C9A56B]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('support')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#C9A56B] transition-colors dark:text-gray-400 dark:hover:text-[#C9A56B]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('destinations')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#C9A56B] transition-colors dark:text-gray-400 dark:hover:text-[#C9A56B]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-[#C9A56B]" />
                <span>+1 455 6516</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-[#C9A56B]" />
                <span>info@timeout.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#C9A56B]" />
                <span>123 Travel Street,<br />Adventure City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} {t('copyright')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-gray-600 hover:text-[#C9A56B] transition-colors dark:text-gray-400 dark:hover:text-[#C9A56B]"
              >
                {t('privacyPolicy')}
              </Link>
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-gray-600 hover:text-[#C9A56B] transition-colors dark:text-gray-400 dark:hover:text-[#C9A56B]"
              >
                {t('cookiePolicy')}
              </Link>
              <Link
                href={`/${locale}/hotels`}
                className="text-sm text-gray-600 hover:text-[#C9A56B] transition-colors dark:text-gray-400 dark:hover:text-[#C9A56B]"
              >
                {t('sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
