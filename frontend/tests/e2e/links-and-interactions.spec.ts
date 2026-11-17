import { expect, test } from '@playwright/test';
import { LOCALES, PAGES, loadEverything, pageUrl } from './helpers';

test.describe('links', () => {
  test('no page has an empty or "#" link, and every internal link resolves', async ({
    page,
    request,
  }) => {
    test.setTimeout(240_000);
    const internal = new Set<string>();
    const external = new Map<string, { target: string | null; rel: string | null }>();

    for (const locale of LOCALES) {
      for (const path of PAGES) {
        await page.goto(pageUrl(locale, path));
        // Playwright's $$eval runs this typed callback in the page context; no string is evaluated.
        const links = await page.$$eval('a', (anchors) =>
          anchors.map((a) => ({
            href: a.getAttribute('href'),
            text: (a.textContent ?? '').trim().slice(0, 40),
            target: a.getAttribute('target'),
            rel: a.getAttribute('rel'),
          })),
        );
        for (const link of links) {
          expect(link.href, `${locale}${path}: "${link.text}"`).toBeTruthy();
          expect(link.href, `${locale}${path}: "${link.text}"`).not.toBe('#');
          if (link.href!.startsWith('/')) internal.add(link.href!.split('#')[0]);
          else if (/^https?:/.test(link.href!)) external.set(link.href!, link);
          else expect(link.href, `${locale}${path}`).toMatch(/^(mailto:|tel:|#)/);
        }
      }
    }

    expect(internal.size).toBeGreaterThan(15);
    for (const href of internal) {
      const response = await request.get(href, { maxRedirects: 5 });
      expect(response.status(), `internal link ${href}`).toBeLessThan(400);
    }

    // External links: https only, new tab with noopener.
    for (const [href, link] of external) {
      expect(href, href).toMatch(/^https:\/\//);
      expect(link.target, href).toBe('_blank');
      expect(link.rel ?? '', href).toContain('noopener');
    }
    expect(external.size).toBeGreaterThanOrEqual(7); // 6 social profiles + Google Maps
  });

  test('contact links dial and email the document details', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('a[href="mailto:Nehemiah.center@yahoo.com"]').first()).toBeVisible();
    // The redesigned header carries a phone-only link (hidden from tablet width up), so look for a
    // link a visitor can actually see rather than the first one in the DOM.
    await expect(page.locator('a[href="tel:+251930012652"]:visible').first()).toBeVisible();
    await expect(page.locator('a[href="tel:+251979050917"]:visible').first()).toBeVisible();
  });
});

test.describe('keyboard and focus', () => {
  test('the first Tab stop is a skip link that moves focus to the main content', async ({
    page,
  }) => {
    await page.goto('/en/about');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('focused controls have a visible focus indicator', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const style = getComputedStyle(el);
      return { width: style.outlineWidth, style: style.outlineStyle, tag: el.tagName };
    });
    expect(outline.style).not.toBe('none');
    expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
  });

  test('FAQ accordion works from the keyboard', async ({ page }) => {
    await page.goto('/en/faq');
    const triggers = page.getByRole('button', { expanded: false });
    await expect(triggers).toHaveCount(5);
    const first = page.getByRole('button', { name: 'What is Nehemiah Autism Center?' });
    await first.focus();
    await page.keyboard.press('Enter');
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(
      page.getByText(/dedicated to supporting children and young people with autism/),
    ).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('button', { name: 'Who can receive services at Nehemiah Autism Center?' }),
    ).toBeFocused();
    await page.keyboard.press('Space');
    await expect(
      page.getByText(/Support is provided based on each child's individual needs/),
    ).toBeVisible();
    // single mode: opening one closes the other
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  test('FAQ answer about services names Food Therapy', async ({ page }) => {
    await page.goto('/en/faq');
    await page
      .getByRole('button', { name: 'What services does Nehemiah Autism Center provide?' })
      .click();
    const answer = page.getByText(/three main therapy services/);
    await expect(answer).toContainText('Speech and Language Therapy, and Food Therapy');
    await expect(page.locator('body')).not.toContainText(/occupational/i);
  });
});

test.describe('gallery', () => {
  test('filters by category and shows an honest empty state', async ({ page }) => {
    await page.goto('/en/gallery');
    const all = await page.getByRole('button', { name: /^Open photo larger:/ }).count();
    expect(all).toBe(17);

    await page.getByRole('button', { name: /Certificate & Recognition/ }).click();
    await expect(page.getByRole('button', { name: /^Open photo larger:/ })).toHaveCount(2);
    await expect(page.getByRole('button', { name: /Certificate & Recognition/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await page.getByRole('button', { name: /Free Medical Examinations/ }).click();
    await expect(page.getByRole('button', { name: /^Open photo larger:/ })).toHaveCount(0);
    await expect(page.getByRole('status')).toContainText(
      'Photos for this category will be added soon.',
    );
  });

  test('lightbox opens with the keyboard, traps focus, and returns focus on Escape', async ({
    page,
  }) => {
    await page.goto('/en/gallery');
    const firstPhoto = page.getByRole('button', { name: /^Open photo larger:/ }).first();
    await firstPhoto.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleDescription(/^1 \/ 17$/);
    await page.keyboard.press('ArrowRight');
    await expect(dialog).toHaveAccessibleDescription(/^2 \/ 17$/);

    // Focus stays inside the dialog however many times Tab is pressed.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(
        () => !!document.activeElement?.closest('[role="dialog"]'),
      );
      expect(inside).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(firstPhoto).toBeFocused();
  });
});

test.describe('contact form', () => {
  test('explains how it works, validates, and never claims the message was sent', async ({
    page,
  }) => {
    await page.goto('/en/contact');
    await expect(page.getByText(/Nothing is sent from this website/)).toBeVisible();

    await page.getByRole('button', { name: /Write my email/ }).click();
    await expect(page.locator('form').getByRole('alert')).toHaveCount(4);
    await expect(page.getByLabel('Your name')).toBeFocused();

    await page.getByLabel('Your name').fill('Abebe Kebede');
    await page.getByLabel('Email address').fill('abebe@example.org');
    await page.getByLabel('Subject').fill('Visiting the Center');
    await page.getByLabel('Message').fill('I would like to visit on Saturday morning.');
    await page.getByRole('button', { name: /Write my email/ }).click();

    await expect(page.getByText(/It has not been sent yet/)).toBeVisible();
    await expect(page.getByLabel('Message')).toHaveValue(
      'I would like to visit on Saturday morning.',
    );
    await expect(page.locator('body')).not.toContainText(/successfully|thank you for/i);
  });

  test('"Volunteer With Us" opens the form with the subject filled in', async ({ page }) => {
    await page.goto('/am/volunteer');
    await page.getByRole('link', { name: 'ከእኛ ጋር በበጎ ፈቃድ ይሳተፉ' }).last().click();
    await expect(page).toHaveURL(/\/am\/contact\?topic=volunteer$/);
    await expect(page.getByLabel('ርዕስ')).toHaveValue('ከእኛ ጋር በበጎ ፈቃድ ይሳተፉ');
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('opens, shows the six links, navigates, and closes', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Menu' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link')).toContainText([
      'Home',
      'About Us',
      'Our Services',
      'Events',
      'Blog',
      'Contact',
      'Support Nehemiah',
    ]);
    await dialog.getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/\/en\/about$/);
    await expect(dialog).toBeHidden();
  });

  test('closes with Escape and returns focus to the menu button', async ({ page }) => {
    await page.goto('/en');
    const button = page.getByRole('button', { name: 'Open menu' });
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(button).toBeFocused();
  });

  test('language can be switched without opening the menu', async ({ page }) => {
    await page.goto('/en/about');
    await page.getByRole('link', { name: 'አማርኛ' }).first().click();
    await expect(page).toHaveURL(/\/am\/about$/);
    await expect(page.getByRole('button', { name: 'ምናሌ ክፈት' })).toBeVisible();
  });
});

test.describe('calm by design', () => {
  test('has no auto-playing media, carousels or marquees on any page', async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(pageUrl('en', path));
      await loadEverything(page);
      const counts = await page.evaluate(() => ({
        video: document.querySelectorAll('video').length,
        audio: document.querySelectorAll('audio').length,
        marquee: document.querySelectorAll('marquee').length,
        carousel: document.querySelectorAll('[aria-roledescription="carousel"], [data-embla]')
          .length,
        autoplayIframes: [...document.querySelectorAll('iframe')].filter((f) =>
          /autoplay=1/.test(f.src),
        ).length,
      }));
      expect(counts, path || '/').toEqual({
        video: 0,
        audio: 0,
        marquee: 0,
        carousel: 0,
        autoplayIframes: 0,
      });
    }
  });

  test('turns off smooth scrolling and transitions when the visitor prefers reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(behavior).toBe('auto');
    const longest = await page.evaluate(() => {
      let max = 0;
      for (const el of document.querySelectorAll('a, button')) {
        const d = parseFloat(getComputedStyle(el).transitionDuration) || 0;
        max = Math.max(max, d);
      }
      return max;
    });
    expect(longest).toBeLessThan(0.01);
  });
});
