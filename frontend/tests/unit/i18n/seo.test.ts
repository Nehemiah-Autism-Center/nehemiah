import { describe, expect, it } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { buildMetadata } from '@/shared/i18n/metadata';
import { ui } from '@/shared/i18n/ui';
import { loc } from '@/shared/i18n/localized';
import { SITE_URL } from '@/shared/i18n/config';

describe('sitemap', () => {
  const entries = sitemap();

  it('lists every page in both languages (12 pages x 2 languages)', () => {
    expect(entries).toHaveLength(24);
    expect(entries.filter((e) => e.url.includes('/en')).length).toBe(12);
    expect(entries.filter((e) => e.url.includes('/am')).length).toBe(12);
  });

  it('uses absolute, locale-prefixed URLs with hreflang alternates', () => {
    const about = entries.find((e) => e.url === `${SITE_URL}/am/about`);
    expect(about?.alternates?.languages).toEqual({
      en: `${SITE_URL}/en/about`,
      am: `${SITE_URL}/am/about`,
    });
    for (const entry of entries) expect(entry.url).toMatch(/^https?:\/\/[^/]+\/(en|am)(\/|$)/);
  });

  it('does not invent modification dates', () => {
    for (const entry of entries) expect(entry.lastModified).toBeUndefined();
  });

  it('includes the event and blog detail pages', () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/en/events/world-autism-awareness-day`);
    expect(urls).toContain(`${SITE_URL}/am/blog/celebrating-buhe-2026`);
  });
});

describe('robots', () => {
  it('allows the site, hides the scaffold pages and points at the sitemap', () => {
    const result = robots();
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule.allow).toBe('/');
    expect(rule.disallow).toEqual(['/login', '/register', '/dashboard']);
  });
});

describe('buildMetadata', () => {
  it('builds localized canonical, hreflang and social metadata', () => {
    const meta = buildMetadata({
      locale: 'am',
      path: '/about',
      title: ui['nav.about'],
      description: loc('English description', 'የአማርኛ መግለጫ'),
    });
    expect(meta.title).toBe('ስለ እኛ');
    expect(meta.description).toBe('የአማርኛ መግለጫ');
    expect(meta.alternates?.canonical).toBe('/am/about');
    expect(meta.alternates?.languages).toEqual({
      en: '/en/about',
      am: '/am/about',
      'x-default': '/en/about',
    });
    expect(meta.openGraph).toMatchObject({ locale: 'am_ET', alternateLocale: ['en_US'] });
  });

  it('can opt out of the title suffix for the home page', () => {
    const meta = buildMetadata({
      locale: 'en',
      path: '/',
      title: loc('Nehemiah Autism Center'),
      description: loc('d'),
      absoluteTitle: true,
    });
    expect(meta.title).toEqual({ absolute: 'Nehemiah Autism Center' });
  });
});
