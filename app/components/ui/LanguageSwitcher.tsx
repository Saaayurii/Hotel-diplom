'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => switchLanguage(locale === 'en' ? 'ru' : 'en')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-[#C9A56B] hover:bg-gray-50 transition-colors"
      >
        <Globe size={18} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700 uppercase">
          {locale}
        </span>
      </button>
    </div>
  );
}
