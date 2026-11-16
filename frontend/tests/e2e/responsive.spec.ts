import { expect, test } from '@playwright/test';
import { LOCALES, PAGES, VIEWPORTS, loadEverything, overflowingElements, pageUrl } from './helpers';

/**
 * Every page, in both languages, at the six required viewports: nothing may scroll sideways,
 * overlap the edge of the screen, or leave an image unloaded. Amharic is included on purpose —
 * its words are long and its glyphs tall, which is where cards, buttons and menus usually break.
 */
for (const viewport of VIEWPORTS) {
  test.describe(`viewport ${viewport.name}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const locale of LOCALES) {
      for (const path of PAGES) {
        test(`${locale}${path || '/'} has no horizontal overflow and loads every image`, async ({
          page,
        }) => {
          const errors: string[] = [];
          page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
          page.on('pageerror', (e) => errors.push(e.message));

          await page.goto(pageUrl(locale, path), { waitUntil: 'networkidle' });
          await loadEverything(page);

          expect(await overflowingElements(page)).toEqual([]);

          const broken = await page.evaluate(() =>
            [...document.images]
              .filter((i) => !i.complete || i.naturalWidth === 0)
              .map((i) => i.currentSrc || i.src),
          );
          expect(broken).toEqual([]);
          expect(errors).toEqual([]);
        });
      }
    }

    test('primary navigation is reachable at this width', async ({ page }) => {
      await page.goto('/en');
      const desktopNav = page.getByRole('navigation', { name: 'Main navigation' });
      if (viewport.width >= 1024) {
        await expect(desktopNav).toBeVisible();
        await expect(desktopNav.getByRole('link')).toHaveCount(6);
      } else {
        await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
      }
    });

    test('tap targets in the header are at least 44px', async ({ page }) => {
      await page.goto('/en');
      const small = await page.evaluate(() => {
        const header = document.querySelector('header');
        const bad: string[] = [];
        for (const el of header?.querySelectorAll('a, button') ?? []) {
          const r = el.getBoundingClientRect();
          // Skip elements hidden at this width (display:none has no box) and the visually hidden skip link.
          if (r.width === 0 || r.height === 0) continue;
          if (r.height < 43.5 || r.width < 43.5) {
            bad.push(
              `${el.tagName.toLowerCase()} "${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 25)}" ${Math.round(r.width)}x${Math.round(r.height)}`,
            );
          }
        }
        return bad;
      });
      expect(small).toEqual([]);
    });
  });
}
