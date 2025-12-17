import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { ToastProvider } from '@/app/components/ui/ToastProvider';
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "TIMEOUT - Hotel Booking System",
    template: "%s | TIMEOUT Travel Agency"
  },
  description: "Book your perfect hotel room with TIMEOUT Travel Agency. Experience luxury and comfort with our modern online booking system. Discover exclusive offers and unforgettable stays around the world.",
  keywords: ["hotel booking", "travel", "accommodation", "luxury hotels", "vacation", "TIMEOUT", "Mediterranean travel", "hotel reservations"],
  authors: [{ name: "TIMEOUT Travel Agency" }],
  creator: "TIMEOUT Travel Agency",
  publisher: "TIMEOUT",
  applicationName: "TIMEOUT Hotel Booking",
  metadataBase: new URL('https://timeout.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ru': '/ru',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timeout.com',
    title: 'TIMEOUT - Hotel Booking System',
    description: 'Book your perfect hotel room with TIMEOUT Travel Agency. Experience luxury, comfort, and unforgettable stays around the world.',
    siteName: 'TIMEOUT Travel Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TIMEOUT Travel Agency - Hotel Booking System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TIMEOUT - Hotel Booking System',
    description: 'Book your perfect hotel room with TIMEOUT Travel Agency',
    images: ['/og-image.jpg'],
    creator: '@TimeoutAgency',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
