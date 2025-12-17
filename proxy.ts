import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';
import { locales } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip proxy for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  // Extract locale from pathname
  const pathnameLocale = pathname.split('/')[1];
  const isValidLocale = locales.includes(pathnameLocale as any);
  const basePathname = isValidLocale ? pathname.slice(pathnameLocale.length + 1) : pathname;

  // Protect admin routes
  if (basePathname.startsWith('/admin')) {
    if (!token) {
      const locale = isValidLocale ? pathnameLocale : 'en';
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }

    const session = await verifyToken(token);

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      const locale = isValidLocale ? pathnameLocale : 'en';
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
