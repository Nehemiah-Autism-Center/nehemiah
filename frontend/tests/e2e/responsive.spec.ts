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

    /**
     * Generosity redesign: the desktop utility bar is a dense 40px strip with 28px social squares
     * and 24px inline contact links, as specified. WCAG 2.5.8 (AA) requires 24px, so that is the
     * floor for those (social, utility and language links, inline contact links); everything else
     * keeps 44px: all controls on phones (< 768px), and on larger screens the main navigation,
     * the Support button and the menu button.
     */
    test('tap targets in the header meet the size rules', async ({ page }) => {
      await page.goto('/en');
      const small = await page.evaluate((isPhone) => {
        const header = document.querySelector('header');
        const bad: string[] = [];
        for (const el of header?.querySelectorAll('a, button') ?? []) {
          const r = el.getBoundingClientRect();
          // Skip elements hidden at this width (display:none has no box) and the visually hidden skip link.
          if (r.width === 0 || r.height === 0) continue;
          const label = (el.getAttribute('aria-label') || el.textContent || '').trim();
          const strict =
            isPhone ||
            el.tagName === 'BUTTON' ||
            el.closest('nav[aria-label="Main navigation"]') !== null ||
            el.getAttribute('href')?.endsWith('/donate') === true;
          const min = strict ? 43.5 : 24;
          if (r.height < min || r.width < min) {
            bad.push(
              `${el.tagName.toLowerCase()} "${label.slice(0, 25)}" ${Math.round(r.width)}x${Math.round(r.height)} (needs ${strict ? 44 : 24})`,
            );
          }
        }
        return bad;
      }, viewport.width < 768);
      expect(small).toEqual([]);
    });
  });
}
