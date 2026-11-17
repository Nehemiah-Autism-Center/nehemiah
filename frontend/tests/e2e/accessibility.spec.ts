import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { LOCALES, PAGES, loadEverything, pageUrl } from './helpers';

/** WCAG 2.0/2.1/2.2 A and AA rules plus axe's best-practice rules (landmarks, headings, etc.). */
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

async function violations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return results.violations.map((v) => ({
    rule: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
  }));
}

for (const [label, viewport] of [
  ['desktop 1440', { width: 1440, height: 900 }],
  ['mobile 375', { width: 375, height: 812 }],
] as const) {
  test.describe(`axe — ${label}`, () => {
    test.use({ viewport });

    for (const locale of LOCALES) {
      for (const path of PAGES) {
        test(`${locale}${path || '/'} has no WCAG A/AA violations`, async ({ page }) => {
          await page.goto(pageUrl(locale, path), { waitUntil: 'networkidle' });
          await loadEverything(page);
          expect(await violations(page)).toEqual([]);
        });
      }
    }
  });
}

test.describe('axe — interactive states', () => {
  test('mobile menu (open) has no violations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    expect(await violations(page)).toEqual([]);
  });

  test('mobile menu (open, Amharic) has no violations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/am');
    await page.getByRole('button', { name: 'ምናሌ ክፈት' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    expect(await violations(page)).toEqual([]);
  });

  test('gallery lightbox (open) has no violations', async ({ page }) => {
    await page.goto('/en/gallery');
    await page
      .getByRole('button', { name: /^Open photo larger:/ })
      .first()
      .click();
    await expect(page.getByRole('dialog')).toBeVisible();
    expect(await violations(page)).toEqual([]);
  });

  test('FAQ with an answer expanded has no violations', async ({ page }) => {
    await page.goto('/en/faq');
    await page.getByRole('button', { name: 'What is Nehemiah Autism Center?' }).click();
    expect(await violations(page)).toEqual([]);
  });

  test('contact form showing validation errors has no violations', async ({ page }) => {
    await page.goto('/en/contact');
    await page.getByRole('button', { name: /Write my email/ }).click();
    await expect(page.locator('form').getByRole('alert')).toHaveCount(4);
    expect(await violations(page)).toEqual([]);
  });

  test('gallery with an empty category has no violations', async ({ page }) => {
    await page.goto('/en/gallery');
    await page.getByRole('button', { name: /Staff Training/ }).click();
    await expect(page.getByRole('status')).toContainText('will be added soon');
    expect(await violations(page)).toEqual([]);
  });
});
