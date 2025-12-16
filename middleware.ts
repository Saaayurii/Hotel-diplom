import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';
import { locales } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    console.log('Middleware - skipping API route:', pathname);
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  console.log('Middleware - pathname:', pathname);
  console.log('Middleware - has token:', !!token);

  // Extract locale from pathname
  const pathnameLocale = pathname.split('/')[1];
  const isValidLocale = locales.includes(pathnameLocale as any);
  const basePathname = isValidLocale ? pathname.slice(pathnameLocale.length + 1) : pathname;

  console.log('Middleware - base pathname:', basePathname);

  // Protect admin routes
  if (basePathname.startsWith('/admin')) {
    console.log('Middleware - protecting admin route');

    if (!token) {
      const locale = isValidLocale ? pathnameLocale : 'en';
      console.log('Middleware - no token, redirecting to login');
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }

    const session = await verifyToken(token);
    console.log('Middleware - session:', session ? `user: ${session.email}, role: ${session.role}` : 'null');

    if (!session || (session.role !== 'ADMIN' && session.role !== 'MANAGER')) {
      const locale = isValidLocale ? pathnameLocale : 'en';
      console.log('Middleware - unauthorized, redirecting to home');
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    console.log('Middleware - access granted');
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
