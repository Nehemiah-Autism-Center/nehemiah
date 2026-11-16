import { describe, expect, it } from 'vitest';
import {
  isUnlocalizedPath,
  localizePath,
  resolveLocaleRedirect,
  stripLocale,
  switchLocalePath,
} from '@/shared/i18n/routing';
import { isLocale } from '@/shared/i18n/config';

describe('stripLocale', () => {
  it('splits a locale prefix from the rest of the path', () => {
    expect(stripLocale('/en/about')).toEqual({ locale: 'en', path: '/about' });
    expect(stripLocale('/am/events/world-autism-awareness-day')).toEqual({
      locale: 'am',
      path: '/events/world-autism-awareness-day',
    });
  });

  it('treats the bare locale as the home page', () => {
    expect(stripLocale('/en')).toEqual({ locale: 'en', path: '/' });
    expect(stripLocale('/am')).toEqual({ locale: 'am', path: '/' });
  });

  it('does not mistake a path that merely starts with the same letters for a locale', () => {
    expect(stripLocale('/english')).toEqual({ locale: null, path: '/english' });
    expect(stripLocale('/amazing')).toEqual({ locale: null, path: '/amazing' });
    expect(stripLocale('/about')).toEqual({ locale: null, path: '/about' });
  });
});

describe('localizePath', () => {
  it('prefixes internal paths with the locale', () => {
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/', 'am')).toBe('/am');
    expect(localizePath('/about', 'am')).toBe('/am/about');
    expect(localizePath('/blog/celebrating-buhe-2026', 'en')).toBe(
      '/en/blog/celebrating-buhe-2026',
    );
  });

  it('keeps query strings and hashes', () => {
    expect(localizePath('/contact?topic=volunteer', 'am')).toBe('/am/contact?topic=volunteer');
    expect(localizePath('/contact#location', 'en')).toBe('/en/contact#location');
    expect(localizePath('/contact?topic=partnership#form', 'am')).toBe(
      '/am/contact?topic=partnership#form',
    );
    expect(localizePath('/#impact', 'en')).toBe('/en#impact');
  });

  it('is idempotent and can re-target an already localized path', () => {
    expect(localizePath('/en/about', 'en')).toBe('/en/about');
    expect(localizePath('/en/about', 'am')).toBe('/am/about');
    expect(localizePath(localizePath('/faq', 'am'), 'am')).toBe('/am/faq');
  });

  it('leaves external, mailto, tel and hash-only links untouched', () => {
    expect(localizePath('https://example.org/a', 'am')).toBe('https://example.org/a');
    expect(localizePath('//cdn.example.org/a', 'am')).toBe('//cdn.example.org/a');
    expect(localizePath('mailto:a@b.org', 'am')).toBe('mailto:a@b.org');
    expect(localizePath('tel:+251930012652', 'am')).toBe('tel:+251930012652');
    expect(localizePath('#main-content', 'am')).toBe('#main-content');
  });
});

describe('switchLocalePath', () => {
  it('returns the same page in the other language', () => {
    expect(switchLocalePath('/en/about', 'am')).toBe('/am/about');
    expect(switchLocalePath('/am', 'en')).toBe('/en');
    expect(switchLocalePath('/en/events/world-autism-awareness-day', 'am')).toBe(
      '/am/events/world-autism-awareness-day',
    );
  });
});

describe('resolveLocaleRedirect', () => {
  it('sends an unprefixed request to the default language', () => {
    expect(resolveLocaleRedirect({ pathname: '/' })).toBe('/en');
    expect(resolveLocaleRedirect({ pathname: '/about' })).toBe('/en/about');
  });

  it("uses the visitor's remembered language", () => {
    expect(resolveLocaleRedirect({ pathname: '/', cookieLocale: 'am' })).toBe('/am');
    expect(resolveLocaleRedirect({ pathname: '/services', cookieLocale: 'am' })).toBe(
      '/am/services',
    );
  });

  it('ignores an invalid cookie value', () => {
    expect(resolveLocaleRedirect({ pathname: '/about', cookieLocale: 'fr' })).toBe('/en/about');
    expect(resolveLocaleRedirect({ pathname: '/about', cookieLocale: '' })).toBe('/en/about');
    expect(resolveLocaleRedirect({ pathname: '/about', cookieLocale: null })).toBe('/en/about');
  });

  it('preserves the query string', () => {
    expect(
      resolveLocaleRedirect({
        pathname: '/contact',
        search: '?topic=volunteer',
        cookieLocale: 'am',
      }),
    ).toBe('/am/contact?topic=volunteer');
  });

  it('does not redirect requests that already carry a locale', () => {
    expect(resolveLocaleRedirect({ pathname: '/en/about', cookieLocale: 'am' })).toBeNull();
    expect(resolveLocaleRedirect({ pathname: '/am' })).toBeNull();
  });

  it('leaves the scaffold pages outside the localized site alone', () => {
    for (const pathname of ['/login', '/register', '/dashboard', '/dashboard/settings']) {
      expect(isUnlocalizedPath(pathname)).toBe(true);
      expect(resolveLocaleRedirect({ pathname })).toBeNull();
    }
    expect(isUnlocalizedPath('/loginfo')).toBe(false);
  });
});

describe('isLocale', () => {
  it('accepts only supported languages', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('am')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(42)).toBe(false);
  });
});
