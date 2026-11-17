import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE_SECONDS } from '@/shared/i18n/config';
import { resolveLocaleRedirect, stripLocale } from '@/shared/i18n/routing';

/**
 * Router prefetches and client-side navigations also pass through the middleware. They must
 * never change the remembered language: every page links to its other-language twin (the
 * language switcher), and Next prefetches visible links, so treating a prefetch as a visit
 * would silently flip a visitor's saved language just because the page was open.
 */
function isRouterRequest(request: NextRequest): boolean {
  return request.headers.has('rsc') || request.headers.has('next-router-prefetch');
}

/**
 * Language routing.
 *  - A request without a locale prefix is redirected to `/en/...` or `/am/...`, using the
 *    visitor's last chosen language (cookie) and falling back to English.
 *  - A real page request that already carries a locale (a typed or shared link) refreshes the
 *    cookie. Choosing a language in the switcher records it from the click handler instead
 *    (src/shared/i18n/cookie.ts), because that navigation is client-side.
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
  if (locale && locale !== cookieLocale && !isRouterRequest(request)) {
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
