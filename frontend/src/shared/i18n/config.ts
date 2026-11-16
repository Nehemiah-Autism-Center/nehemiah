export const LOCALES = ['en', 'am'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Cookie that remembers the visitor's language between visits. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Language names are always shown in their own language so visitors can find theirs. */
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  en: 'English',
  am: 'አማርኛ',
};

/** BCP 47 tags used for <html lang> and hreflang. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en',
  am: 'am',
};

/** Open Graph locale codes. */
export const LOCALE_OG: Record<Locale, string> = {
  en: 'en_US',
  am: 'am_ET',
};

/**
 * Public origin used for canonical URLs, hreflang alternates and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL per environment; the local default is for development only.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001').replace(
  /\/$/,
  '',
);
