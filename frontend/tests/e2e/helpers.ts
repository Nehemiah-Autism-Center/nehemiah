import type { Page } from '@playwright/test';

export const LOCALES = ['en', 'am'] as const;
export type Locale = (typeof LOCALES)[number];

/** Every public page (locale-less paths; '' is the home page). */
export const PAGES = [
  '',
  '/about',
  '/services',
  '/events',
  '/events/world-autism-awareness-day',
  '/blog',
  '/blog/celebrating-buhe-2026',
  '/gallery',
  '/volunteer',
  '/faq',
  '/contact',
  '/donate',
] as const;

/** Viewports required by the work order. */
export const VIEWPORTS = [
  { name: '320', width: 320, height: 700 },
  { name: '375', width: 375, height: 812 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1440', width: 1440, height: 900 },
] as const;

export const pageUrl = (locale: Locale, path: string) => `/${locale}${path}`;

/** Scrolls through the page so lazy-loaded images and the map frame load, then returns to the top. */
export async function loadEverything(page: Page) {
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      (img as HTMLImageElement).loading = 'eager';
    });
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.onload = img.onerror = resolve;
              setTimeout(resolve, 8000);
            }),
      ),
    );
  });
}

/** Elements that stick out past the right edge of the viewport (excluding fixed-position UI). */
export async function overflowingElements(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const found: string[] = [];
    if (document.documentElement.scrollWidth <= width + 1) return found;
    for (const el of document.querySelectorAll('body *')) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.right > width + 1 && getComputedStyle(el).position !== 'fixed') {
        found.push(
          `${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 3).join('.')}`,
        );
        if (found.length >= 5) break;
      }
    }
    return found.length ? found : ['(document wider than viewport)'];
  });
}
