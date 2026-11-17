import { fireEvent, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderIn } from '../helpers';

const nav = vi.hoisted(() => ({ pathname: '/en/about' }));
vi.mock('next/navigation', () => ({
  usePathname: () => nav.pathname,
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

import { SiteHeader } from '@/shared/components/layout/SiteHeader';
import { SiteFooter } from '@/shared/components/layout/SiteFooter';

beforeEach(() => {
  nav.pathname = '/en/about';
});

describe('SiteHeader (English)', () => {
  it('shows the six primary links, in the document order, pointing at English pages', () => {
    renderIn('en', <SiteHeader />);
    const primary = screen.getByRole('navigation', { name: 'Main navigation' });
    const links = within(primary).getAllByRole('link');
    expect(links.map((l) => [l.textContent, l.getAttribute('href')])).toEqual([
      ['Home', '/en'],
      ['About Us', '/en/about'],
      ['Our Services', '/en/services'],
      ['Events', '/en/events'],
      ['Blog', '/en/blog'],
      ['Contact', '/en/contact'],
    ]);
  });

  it('marks only the current page with aria-current', () => {
    renderIn('en', <SiteHeader />);
    const primary = screen.getByRole('navigation', { name: 'Main navigation' });
    const current = within(primary)
      .getAllByRole('link')
      .filter((l) => l.getAttribute('aria-current') === 'page');
    expect(current.map((l) => l.textContent)).toEqual(['About Us']);
  });

  it('marks nested pages as current for their section', () => {
    nav.pathname = '/en/events/world-autism-awareness-day';
    renderIn('en', <SiteHeader />);
    const current = within(screen.getByRole('navigation', { name: 'Main navigation' }))
      .getAllByRole('link')
      .filter((l) => l.getAttribute('aria-current') === 'page');
    expect(current.map((l) => l.textContent)).toEqual(['Events']);
  });

  it('has a single call to action that links to the donation page', () => {
    renderIn('en', <SiteHeader />);
    const cta = screen.getByRole('link', { name: 'Support Nehemiah' });
    expect(cta).toHaveAttribute('href', '/en/donate');
  });

  it('exposes real tap-to-call and email links with no placeholder targets', () => {
    renderIn('en', <SiteHeader />);
    expect(screen.getAllByRole('link', { name: 'Nehemiah.center@yahoo.com' })[0]).toHaveAttribute(
      'href',
      'mailto:Nehemiah.center@yahoo.com',
    );
    expect(screen.getAllByRole('link', { name: '+251 93 001 2652' })[0]).toHaveAttribute(
      'href',
      'tel:+251930012652',
    );
    expect(screen.getAllByRole('link', { name: '+251 97 905 0917' })[0]).toHaveAttribute(
      'href',
      'tel:+251979050917',
    );
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href'), link.textContent ?? '').not.toMatch(/^(#|)$/);
    }
  });

  it('links to all six social profiles, each opening safely in a new tab and saying so', () => {
    renderIn('en', <SiteHeader />);
    const social = screen
      .getAllByRole('link')
      .filter((l) => /opens in a new tab/.test(l.getAttribute('aria-label') ?? ''));
    // desktop utility bar only (the mobile menu is closed)
    expect(social).toHaveLength(6);
    for (const link of social) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('href')).toMatch(/^https:\/\//);
    }
    expect(social.map((l) => l.getAttribute('aria-label'))).toEqual([
      'Facebook (opens in a new tab)',
      'Instagram (opens in a new tab)',
      'TikTok (opens in a new tab)',
      'YouTube (opens in a new tab)',
      'LinkedIn (opens in a new tab)',
      'X (Twitter) (opens in a new tab)',
    ]);
  });
});

describe('LanguageSwitcher', () => {
  it('links to the same page in the other language, naming each language in its own script', () => {
    renderIn('en', <SiteHeader />);
    const english = screen.getAllByRole('link', { name: 'English' })[0];
    const amharic = screen.getAllByRole('link', { name: 'አማርኛ' })[0];
    expect(english).toHaveAttribute('href', '/en/about');
    expect(amharic).toHaveAttribute('href', '/am/about');
    expect(english).toHaveAttribute('lang', 'en');
    expect(amharic).toHaveAttribute('lang', 'am');
    expect(amharic).toHaveAttribute('hreflang', 'am');
    expect(english).toHaveAttribute('aria-current', 'true');
    expect(amharic).not.toHaveAttribute('aria-current');
  });

  it('preserves the current page and nested path when switching', () => {
    nav.pathname = '/en/blog/celebrating-buhe-2026';
    renderIn('en', <SiteHeader />);
    expect(screen.getAllByRole('link', { name: 'አማርኛ' })[0]).toHaveAttribute(
      'href',
      '/am/blog/celebrating-buhe-2026',
    );
  });

  it('records an explicit choice in the language cookie when a language link is clicked', () => {
    document.cookie = 'NEXT_LOCALE=; max-age=0; path=/';
    renderIn('en', <SiteHeader />);
    fireEvent.click(screen.getAllByRole('link', { name: 'አማርኛ' })[0]);
    expect(document.cookie).toContain('NEXT_LOCALE=am');
  });

  it('is exposed as a labelled navigation landmark', () => {
    renderIn('en', <SiteHeader />);
    expect(screen.getAllByRole('navigation', { name: 'Language' }).length).toBeGreaterThan(0);
  });
});

describe('SiteHeader (Amharic)', () => {
  beforeEach(() => {
    nav.pathname = '/am/about';
  });

  it('shows Amharic navigation that keeps the visitor in Amharic', () => {
    renderIn('am', <SiteHeader />);
    const primary = screen.getByRole('navigation', { name: 'ዋና ምናሌ' });
    const links = within(primary).getAllByRole('link');
    expect(links.map((l) => [l.textContent, l.getAttribute('href')])).toEqual([
      ['መነሻ', '/am'],
      ['ስለ እኛ', '/am/about'],
      ['አገልግሎቶቻችን', '/am/services'],
      ['ዝግጅቶች', '/am/events'],
      ['ብሎግ', '/am/blog'],
      ['ያግኙን', '/am/contact'],
    ]);
  });

  it('uses the approved Amharic label for the call to action', () => {
    renderIn('am', <SiteHeader />);
    expect(screen.getByRole('link', { name: 'ነህምያን ይደግፉ' })).toHaveAttribute('href', '/am/donate');
  });

  it('marks Amharic as the active language and keeps the page', () => {
    renderIn('am', <SiteHeader />);
    expect(screen.getAllByRole('link', { name: 'አማርኛ' })[0]).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getAllByRole('link', { name: 'English' })[0]).toHaveAttribute(
      'href',
      '/en/about',
    );
  });
});

describe('mobile menu', () => {
  it('opens as a labelled dialog containing the navigation, and closes on Escape', async () => {
    renderIn('en', <SiteHeader />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog', { name: 'Menu' });
    const links = within(
      within(dialog).getByRole('navigation', { name: 'Main navigation' }),
    ).getAllByRole('link');
    expect(links.map((l) => l.textContent)).toEqual([
      'Home',
      'About Us',
      'Our Services',
      'Events',
      'Blog',
      'Contact',
    ]);
    expect(within(dialog).getByRole('link', { name: 'Support Nehemiah' })).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes after a link is chosen', async () => {
    renderIn('en', <SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = await screen.findByRole('dialog');
    fireEvent.click(within(dialog).getByRole('link', { name: 'Events' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('is labelled in Amharic for Amharic visitors', () => {
    nav.pathname = '/am';
    renderIn('am', <SiteHeader />);
    expect(screen.getByRole('button', { name: 'ምናሌ ክፈት' })).toBeInTheDocument();
  });
});

describe('SiteFooter', () => {
  it('uses the document link groups with locale-aware targets', () => {
    renderIn('en', <SiteFooter locale="en" />);
    const groups = {
      Support: ['/en/volunteer', '/en/donate', '/en/faq', '/en/events'],
      Discover: ['/en/about', '/en/services', '/en/gallery', '/en/blog'],
      Connect: ['/en/contact', '/en/contact#location', '/en/contact#social'],
    };
    for (const [name, hrefs] of Object.entries(groups)) {
      const group = screen.getByRole('navigation', { name });
      expect(
        within(group)
          .getAllByRole('link')
          .map((l) => l.getAttribute('href')),
      ).toEqual(hrefs);
    }
    expect(
      within(screen.getByRole('navigation', { name: 'Connect' }))
        .getAllByRole('link')
        .map((l) => l.textContent),
    ).toEqual(['Contact Us', 'Visit the Center', 'Social Media']);
  });

  it('shows the approved footer sentence, tagline, contact details and the current year', () => {
    renderIn('en', <SiteFooter locale="en" />);
    expect(
      screen.getByText(/dedicated to empowering autistic children and their families/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Together, let’s lighten the burden/)).toBeInTheDocument();
    expect(screen.getByText(/Kera, Alemazeye meda, Addis Ababa, Ethiopia/)).toBeInTheDocument();
    expect(screen.getByText('8:30 AM – 3:30 PM')).toBeInTheDocument();
    expect(screen.getByText('8:30 AM – 12:30 PM')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`©\\s*${new Date().getFullYear()}`))).toBeInTheDocument();
    expect(screen.queryByText(/2024/)).not.toBeInTheDocument();
  });

  it('is fully localized in Amharic with approved text, including the Ethiopian-clock hours', () => {
    renderIn('am', <SiteFooter locale="am" />);
    expect(screen.getByText(/ነህምያ ኦቲዝም ማዕከል ኦቲዝም ያላቸውን ልጆችና ቤተሰቦቻቸውን/)).toBeInTheDocument();
    expect(screen.getByText('ጠዋት 2፡30 – ቀን 9፡30')).toBeInTheDocument();
    expect(screen.getByText('ጠዋት 2፡30 – ቀን 6፡30')).toBeInTheDocument();
    const connect = screen.getByRole('navigation', { name: 'ተገናኙ' });
    expect(within(connect).getAllByRole('link')[0]).toHaveAttribute('href', '/am/contact');
  });

  it('has no "#" or empty link targets', () => {
    renderIn('en', <SiteFooter locale="en" />);
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href'), link.textContent ?? '').not.toMatch(/^(#|)$/);
    }
  });
});
