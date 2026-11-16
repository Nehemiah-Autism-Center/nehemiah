import fs from 'node:fs';
import path from 'node:path';
import { test, type Page } from '@playwright/test';
import { loadEverything } from './helpers';

/**
 * Captures the review screenshots into docs/frontend-review/evidence (outside the frontend source,
 * so nothing here ships in the deployed bundle). Skipped unless explicitly requested:
 *
 *   CAPTURE_EVIDENCE=1 PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm exec playwright test evidence
 */
const OUT = path.resolve(__dirname, '../../../docs/frontend-review/evidence');

test.skip(
  !process.env.CAPTURE_EVIDENCE,
  'set CAPTURE_EVIDENCE=1 to (re)capture review screenshots',
);
test.beforeAll(() => fs.mkdirSync(OUT, { recursive: true }));

interface Shot {
  name: string;
  url: string;
  width: number;
  height: number;
  /** Full-page by default; set false for a viewport-only capture. */
  full?: boolean;
  act?: (page: Page) => Promise<void>;
}

const desktop = (name: string, url: string): Shot => ({
  name: `${name}-1440`,
  url,
  width: 1440,
  height: 900,
});

const SHOTS: Shot[] = [
  desktop('home-en', '/en'),
  desktop('home-am', '/am'),
  desktop('about-en', '/en/about'),
  desktop('about-am', '/am/about'),
  desktop('services-en', '/en/services'),
  desktop('events-en', '/en/events'),
  desktop('event-detail-en', '/en/events/world-autism-awareness-day'),
  desktop('blog-en', '/en/blog'),
  desktop('gallery-en', '/en/gallery'),
  desktop('volunteer-en', '/en/volunteer'),
  desktop('faq-en', '/en/faq'),
  desktop('contact-en', '/en/contact'),
  desktop('contact-am', '/am/contact'),
  desktop('donate-en', '/en/donate'),
  desktop('donate-am', '/am/donate'),
  desktop('not-found-en', '/en/does-not-exist'),
  desktop('not-found-am', '/am/does-not-exist'),
  { name: 'home-en-1024', url: '/en', width: 1024, height: 768 },
  { name: 'home-en-768', url: '/en', width: 768, height: 1024 },
  { name: 'home-en-375', url: '/en', width: 375, height: 812 },
  { name: 'home-am-375', url: '/am', width: 375, height: 812 },
  { name: 'contact-en-375', url: '/en/contact', width: 375, height: 812 },
  { name: 'gallery-en-375', url: '/en/gallery', width: 375, height: 812 },
  { name: 'home-am-320', url: '/am', width: 320, height: 700, full: false },
  {
    name: 'mobile-menu-en-375',
    url: '/en',
    width: 375,
    height: 812,
    full: false,
    act: async (page) => {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('dialog').waitFor();
    },
  },
  {
    name: 'mobile-menu-am-375',
    url: '/am',
    width: 375,
    height: 812,
    full: false,
    act: async (page) => {
      await page.getByRole('button', { name: 'ምናሌ ክፈት' }).click();
      await page.getByRole('dialog').waitFor();
    },
  },
  {
    name: 'gallery-lightbox-1440',
    url: '/en/gallery',
    width: 1440,
    height: 900,
    full: false,
    act: async (page) => {
      await page
        .getByRole('button', { name: /^Open photo larger:/ })
        .nth(2)
        .click();
      await page.getByRole('dialog').waitFor();
      await page.waitForTimeout(500);
    },
  },
  {
    name: 'gallery-empty-category-1440',
    url: '/en/gallery',
    width: 1440,
    height: 900,
    full: false,
    act: async (page) => {
      await page.getByRole('button', { name: /Staff Training/ }).click();
    },
  },
  {
    name: 'contact-form-errors-1440',
    url: '/en/contact',
    width: 1440,
    height: 900,
    full: false,
    act: async (page) => {
      await page.getByRole('button', { name: /Write my email/ }).click();
      await page.locator('form').getByRole('alert').first().waitFor();
      await page.locator('form').scrollIntoViewIfNeeded();
    },
  },
];

for (const shot of SHOTS) {
  test(`capture ${shot.name}`, async ({ page }) => {
    await page.setViewportSize({ width: shot.width, height: shot.height });
    await page.goto(shot.url, { waitUntil: 'networkidle' });
    await loadEverything(page);
    if (shot.act) await shot.act(page);
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(OUT, `${shot.name}.jpg`),
      fullPage: shot.full !== false,
      type: 'jpeg',
      quality: 55,
    });
  });
}
