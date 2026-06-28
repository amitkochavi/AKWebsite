import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;

function detectLocale(pathname: string): string {
  const seg = pathname.split('/')[1];
  return (locales as readonly string[]).includes(seg) ? seg : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internals, API, admin, and static files.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    PUBLIC_FILE.test(pathname)
  ) {
    const res = NextResponse.next();
    res.headers.set('x-locale', detectLocale(pathname));
    return res;
  }

  // Redirect bare root to default locale.
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // If the first segment isn't a known locale, prefix with the default locale.
  const firstSeg = pathname.split('/')[1];
  if (!(locales as readonly string[]).includes(firstSeg)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  const res = NextResponse.next();
  res.headers.set('x-locale', firstSeg);
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
