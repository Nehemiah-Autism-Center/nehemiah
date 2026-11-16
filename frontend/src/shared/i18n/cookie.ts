import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE_SECONDS, type Locale } from './config';

/**
 * Remembers a visitor's explicit language choice. Called from the language switcher's click
 * handler: that navigation is client-side, and the middleware deliberately ignores router
 * requests (see src/middleware.ts), so the choice has to be recorded here.
 */
export function rememberLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}
