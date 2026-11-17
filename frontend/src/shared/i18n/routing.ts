import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './config';

/** Every public page of the site, keyed by a stable name. Paths are locale-less. */
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  events: '/events',
  blog: '/blog',
  gallery: '/gallery',
  volunteer: '/volunteer',
  faq: '/faq',
  contact: '/contact',
  donate: '/donate',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_PATHS: readonly string[] = Object.values(ROUTES);

/** Top-level paths that live outside the localized public site (existing scaffold pages). */
const UNLOCALIZED_PREFIXES = ['/login', '/register', '/dashboard', '/coming-soon'] as const;

const LOCALE_SEGMENT = new RegExp(`^/(${LOCALES.join('|')})(?=/|$)`);

export function isUnlocalizedPath(pathname: string): boolean {
  return UNLOCALIZED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Splits a pathname into its locale prefix (if any) and the remaining locale-less path. */
export function stripLocale(pathname: string): { locale: Locale | null; path: string } {
  const match = pathname.match(LOCALE_SEGMENT);
  if (!match) return { locale: null, path: pathname || '/' };
  return { locale: match[1] as Locale, path: pathname.slice(match[0].length) || '/' };
}

function splitOnce(value: string, separator: string): [string, string | undefined] {
  const index = value.indexOf(separator);
  return index === -1 ? [value, undefined] : [value.slice(0, index), value.slice(index + 1)];
}

/**
 * Adds the locale prefix to an internal href, keeping any query string and hash.
 * Idempotent. External URLs, `mailto:`/`tel:` links and hash-only links are returned unchanged.
 */
export function localizePath(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const [beforeHash, hash] = splitOnce(href, '#');
  const [pathname, query] = splitOnce(beforeHash, '?');
  const { path } = stripLocale(pathname);
  const base = path === '/' ? `/${locale}` : `/${locale}${path}`;
  return `${base}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

/** The same page in another language. */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localizePath(stripLocale(pathname).path, target);
}

/**
 * Decides whether a request needs a locale redirect. Returns the target path, or null when the
 * request already carries a locale (or targets a path outside the localized site).
 * Used by src/middleware.ts; kept pure so it can be unit tested.
 */
export function resolveLocaleRedirect(args: {
  pathname: string;
  search?: string;
  cookieLocale?: string | null;
}): string | null {
  const { pathname, search = '', cookieLocale } = args;
  if (isUnlocalizedPath(pathname)) return null;
  if (stripLocale(pathname).locale) return null;
  const target = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  return `${localizePath(pathname, target)}${search}`;
}

export function blogPostPath(slug: string): string {
  return `${ROUTES.blog}/${slug}`;
}

export function eventPath(slug: string): string {
  return `${ROUTES.events}/${slug}`;
}
