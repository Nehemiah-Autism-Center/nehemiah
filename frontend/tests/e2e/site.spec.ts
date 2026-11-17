import { expect, test } from '@playwright/test';
import { LOCALES, PAGES, pageUrl } from './helpers';

test.describe('every page, in both languages', () => {
  for (const locale of LOCALES) {
    for (const path of PAGES) {
      test(`${locale}${path || '/'} loads with one h1, the right language and a title`, async ({
        page,
      }) => {
        const response = await page.goto(pageUrl(locale, path));
        expect(response?.status()).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.locator('h1')).toHaveCount(1);
        expect((await page.title()).trim().length).toBeGreaterThan(3);
        await expect(page.locator('main#main-content')).toBeVisible();
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
      });
    }
  }
});

test.describe('language routing', () => {
  test('redirects the root to English by default', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('redirects unprefixed pages to English and keeps the query string', async ({ page }) => {
    await page.goto('/contact?topic=volunteer');
    await expect(page).toHaveURL(/\/en\/contact\?topic=volunteer$/);
  });

  test('remembers the chosen language between visits', async ({ page, context }) => {
    await page.goto('/en/about');
    await page
      .getByRole('navigation', { name: 'Language' })
      .first()
      .getByRole('link', { name: 'አማርኛ' })
      .click();
    await expect(page).toHaveURL(/\/am\/about$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'am');

    const cookies = await context.cookies();
    expect(cookies.find((c) => c.name === 'NEXT_LOCALE')?.value).toBe('am');

    await page.goto('/');
    await expect(page).toHaveURL(/\/am$/);
    await page.goto('/services');
    await expect(page).toHaveURL(/\/am\/services$/);
  });

  test('viewing a link to the other language does not change the remembered language', async ({
    page,
    context,
  }) => {
    // Regression: every page links to its other-language twin and Next prefetches visible links.
    // A prefetch used to refresh the cookie, flipping an Amharic visitor back to English.
    const remembered = async () =>
      (await context.cookies()).find((c) => c.name === 'NEXT_LOCALE')?.value;

    await page.goto('/am'); // a real page request: remembered as Amharic
    expect(await remembered()).toBe('am');
    await page.waitForTimeout(3000); // time for any prefetch of the visible "English" link
    expect(await remembered()).toBe('am');

    await page.goto('/services');
    await expect(page).toHaveURL(/\/am\/services$/);
  });

  test('choosing English records the choice for the next visit', async ({ page, context }) => {
    await page.goto('/am/about');
    await page.getByRole('link', { name: 'English' }).first().click();
    await expect(page).toHaveURL(/\/en\/about$/);
    expect((await context.cookies()).find((c) => c.name === 'NEXT_LOCALE')?.value).toBe('en');
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('keeps Amharic while navigating between pages', async ({ page }) => {
    await page.goto('/am');
    const nav = page.getByRole('navigation', { name: 'ዋና ምናሌ' });
    await nav.getByRole('link', { name: 'ያግኙን' }).click();
    await expect(page).toHaveURL(/\/am\/contact$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'am');
    await page
      .getByRole('navigation', { name: 'ዋና ምናሌ' })
      .getByRole('link', { name: 'ዝግጅቶች' })
      .click();
    await expect(page).toHaveURL(/\/am\/events$/);
    await page.getByRole('link', { name: 'English' }).first().click();
    await expect(page).toHaveURL(/\/en\/events$/);
  });

  test('retired routes redirect to relevant pages', async ({ page }) => {
    await page.goto('/team');
    await expect(page).toHaveURL(/\/en\/about$/);
    await page.goto('/success-stories/maedot-yonas');
    await expect(page).toHaveURL(/\/en#impact$/);
    await page.goto('/gallery/masonry');
    await expect(page).toHaveURL(/\/en\/gallery$/);
  });

  test('unknown pages show the localized 404 inside the site shell', async ({ page }) => {
    const en = await page.goto('/en/does-not-exist');
    expect(en?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();

    const am = await page.goto('/am/does-not-exist');
    expect(am?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: 'ገጹ አልተገኘም' })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'am');
  });

  test('removed placeholder routes are gone, the scaffold login page still works', async ({
    page,
  }) => {
    const comingSoon = await page.goto('/coming-soon');
    expect(comingSoon?.status()).toBe(404);
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('metadata', () => {
  test('has localized title, description, canonical and hreflang alternates', async ({ page }) => {
    await page.goto('/am/about');
    await expect(page).toHaveTitle('ስለ እኛ | ነህምያ ኦቲዝም ማዕከል');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/am\/about$/);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      /\/en\/about$/,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="am"]')).toHaveAttribute(
      'href',
      /\/am\/about$/,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
      'href',
      /\/en\/about$/,
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'am_ET');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{60}/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /share-card\.jpg$/,
    );
  });

  test('home page title is the organisation name, not duplicated', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle('Nehemiah Autism Center');
  });
});

test.describe('home page hero', () => {
  const primaryAction = { en: 'Support Nehemiah', am: 'ነህምያን ይደግፉ' } as const;
  // Small laptop, tablet landscape and portrait, large and narrow phones.
  const screens = [
    [1440, 900],
    [1280, 720],
    [1024, 768],
    [768, 1024],
    [390, 844],
    [320, 700],
  ] as const;

  for (const locale of LOCALES) {
    for (const [width, height] of screens) {
      test(`${locale}: the primary action is visible without scrolling at ${width}x${height}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height });
        await page.goto(`/${locale}`);
        const button = page
          .locator('main')
          .getByRole('link', { name: primaryAction[locale] })
          .first();
        const box = await button.boundingBox();
        expect(box, 'primary action rendered').not.toBeNull();
        expect(box!.y + box!.height).toBeLessThanOrEqual(height);
      });
    }
  }
});
