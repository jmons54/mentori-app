import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { defaultLocale, Locale, locales } from './services/i18n';

function getLocale(pathname?: string) {
  const locale = pathname?.split('/')[1];
  if (locale && locales.includes(locale as Locale)) {
    return locale;
  }
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.match(/^(\/[a-z]{2})?\/admin.*/)) {
    let roles: string[] = [];
    const jwt = request.cookies.get('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt.value) as {
        roles: string[];
      };
      roles = payload.roles;
    }
    if (!jwt || !roles.includes('admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (!pathname.startsWith('/api') && !pathname.startsWith('/_')) {
    const pathnameHasLocale = locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
      const referer = request.headers
        .get('referer')
        ?.replace(/http(s)?:\/\//, '');
      const locale = getLocale(referer);
      request.nextUrl.pathname = `/${locale}${pathname}`;
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
      );
    }

    const locale = getLocale(pathname) || defaultLocale;
    return NextResponse.next({
      headers: { 'x-locale': locale },
    });
  }
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
