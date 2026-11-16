import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE_SECONDS } from '@/shared/i18n/config';
import { resolveLocaleRedirect, stripLocale } from '@/shared/i18n/routing';

/**
 * Language routing.
 *  - A request without a locale prefix is redirected to `/en/...` or `/am/...`, using the
 *    visitor's last chosen language (cookie) and falling back to English.
 *  - A request that already carries a locale refreshes the cookie, so the visitor's choice
 *    persists across visits and when they land on a page via a shared link.
 * The decision logic lives in src/shared/i18n/routing.ts, where it is unit tested.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  const redirectPath = resolveLocaleRedirect({ pathname, search, cookieLocale });
  if (redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  const response = NextResponse.next();
  const { locale } = stripLocale(pathname);
  if (locale && locale !== cookieLocale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: '/',
      maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  // Skip Next internals, API routes and any request for a file (anything with an extension).
  matcher: ['/((?!_next/static|_next/image|api|.*\\..*).*)'],
};
