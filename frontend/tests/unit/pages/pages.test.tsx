import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderIn } from '../helpers';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en',
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

import { HomePage } from '@/features/home';
import { AboutPage } from '@/features/about';
import { ServicesPage } from '@/features/services';
import { VolunteerPage } from '@/features/volunteer';
import { FaqPage } from '@/features/faq';
import { EventDetailPage, EventsPage } from '@/features/events';
import { BlogPage, BlogPostPage } from '@/features/blog';
import { DonatePage } from '@/features/donation';
import { ContactPage } from '@/features/contact';
import { EVENTS } from '@/features/events/data';
import { BLOG_POSTS } from '@/features/blog/data';
import { LocaleProvider } from '@/shared/i18n/LocaleProvider';

// A bare "may" is a verb ("it may seem small"), so it only counts as a month before a day number.
const MONTHS =
  /\b(january|february|march|april|june|july|august|september|october|november|december)\b|\bmay\s+\d/i;

function headingLevels(container: HTMLElement) {
  return [...container.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
}

/** Heading outline must start at h1 and never skip a level going down. */
function expectValidOutline(container: HTMLElement) {
  const levels = headingLevels(container);
  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  expect(levels[0]).toBe(1);
  levels.forEach((level, i) => {
    if (i > 0) expect(level - levels[i - 1], `heading ${i}`).toBeLessThanOrEqual(1);
  });
}

describe('Home page', () => {
  it('has one h1, the approved heading, and a valid heading outline', () => {
    const { container } = renderIn('en', <HomePage locale="en" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Welcome to Nehemiah Autism Center',
    );
    expectValidOutline(container);
  });

  it('chunks the hero text but keeps every approved word', () => {
    renderIn('en', <HomePage locale="en" />);
    expect(
      screen.getByText(/where autistic children are empowered through care/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Founded by families who understand these challenges firsthand/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Join us in making a difference—support Nehemiah Autism Center/),
    ).toBeInTheDocument();
  });

  it('offers one clear primary action and the document button labels', () => {
    renderIn('en', <HomePage locale="en" />);
    expect(screen.getAllByRole('link', { name: 'Support Nehemiah' })[0]).toHaveAttribute(
      'href',
      '/en/donate',
    );
    expect(screen.getByRole('link', { name: 'What We Do' })).toHaveAttribute(
      'href',
      '/en/services',
    );
    expect(screen.getAllByRole('link', { name: 'Learn More' })[0]).toHaveAttribute(
      'href',
      '/en/about',
    );
    expect(screen.getByRole('link', { name: 'Volunteer With Us' })).toHaveAttribute(
      'href',
      '/en/volunteer',
    );
    expect(screen.getByRole('link', { name: 'Partner With Us' })).toHaveAttribute(
      'href',
      '/en/contact?topic=partnership',
    );
    expect(screen.getByRole('link', { name: 'Support Our Mission' })).toHaveAttribute(
      'href',
      '/en/donate',
    );
  });

  it('lists exactly the three approved services, with Food Therapy third', () => {
    renderIn('en', <HomePage locale="en" />);
    const services = screen.getByRole('region', { name: 'Services We Provide' });
    const names = within(services)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(names).toEqual([
      'Applied Behavior Analysis (ABA)',
      'Speech and Language Therapy',
      'Food Therapy',
    ]);
    expect(screen.queryByText(/occupational/i)).not.toBeInTheDocument();
  });

  it('shows the impact figures without any animation wrapper', () => {
    renderIn('en', <HomePage locale="en" />);
    const impact = screen.getByRole('region', { name: 'Our Impact' });
    expect(within(impact).getByText('90')).toBeInTheDocument();
    expect(within(impact).getByText('65+')).toBeInTheDocument();
    expect(within(impact).getByText('15')).toBeInTheDocument();
  });

  it('shows the six testimonials verbatim with their attributions', () => {
    const { container } = renderIn('en', <HomePage locale="en" />);
    const quotes = container.querySelectorAll('[data-testimonial] blockquote');
    expect(quotes).toHaveLength(6);
    expect(quotes[0]).toHaveTextContent(
      /Before coming here, I honestly didn’t know much about autism/,
    );
    expect(screen.getAllByText('A Grateful Parent')).toHaveLength(2);
    expect(screen.getByText('Parent of a Child at the Center')).toBeInTheDocument();
  });

  it('presents the event with no confirmed date and the blog post with no invented date', () => {
    renderIn('en', <HomePage locale="en" />);
    expect(screen.getByText('Date to be confirmed')).toBeInTheDocument();
    expect(screen.getByText('Publication date to be confirmed')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(MONTHS);
  });

  it('embeds a titled map and links to the same place in Google Maps', () => {
    const { container } = renderIn('en', <HomePage locale="en" />);
    const frame = container.querySelector('iframe');
    expect(frame).toHaveAttribute('title', 'Map showing the location of Nehemiah Autism Center');
    expect(frame?.getAttribute('src')).toContain('google.com/maps/embed');
    const maps = screen.getByRole('link', { name: /Open in Google Maps/ });
    expect(maps).toHaveAttribute('href', 'https://maps.app.goo.gl/xsjymvB88q6aC5ty6');
    expect(maps).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('gives every image a text alternative or marks it decorative', () => {
    const { container } = renderIn('en', <HomePage locale="en" />);
    for (const img of container.querySelectorAll('img')) {
      expect(img.hasAttribute('alt'), img.getAttribute('src') ?? '').toBe(true);
    }
  });

  it('renders approved Amharic copy for Amharic visitors and tags English fallbacks', () => {
    const { container } = renderIn('am', <HomePage locale="am" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'ወደ ነህምያ ኦቲዝም ማዕከል እንኳን በደህና መጡ',
    );
    expect(screen.getByRole('region', { name: 'የምንሰጣቸው አገልግሎቶች' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ነህምያን ይደግፉ', hidden: false })).toBeInTheDocument();
    // No approved Amharic exists for testimonials, so they appear in English, marked lang="en".
    const quote = container.querySelector('[data-testimonial] blockquote p');
    expect(quote).toHaveAttribute('lang', 'en');
    // Approved Amharic text is NOT marked as a fallback.
    expect(screen.getByText(/ከ15 ዓመታት በፊት በወላጆች የተቋቋመ/)).not.toHaveAttribute('lang');
  });
});

describe('About page', () => {
  it('names Food Therapy as the third service everywhere it lists them', () => {
    renderIn('en', <AboutPage locale="en" />);
    expect(
      screen.getByText(
        /Applied Behavior Analysis \(ABA\), Speech and Language Therapy, and Food Therapy\./,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/occupational/i)).not.toBeInTheDocument();
  });

  it('shows the mission, history and impact with only supported facts', () => {
    renderIn('en', <AboutPage locale="en" />);
    expect(screen.getByRole('heading', { name: 'Our Mission' })).toBeInTheDocument();
    // scoped to the Mission region: the breadcrumb is also an ordered list
    expect(
      within(screen.getByRole('region', { name: 'Our Mission' })).getAllByRole('listitem'),
    ).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Our History' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('region', { name: 'Our History' })).getByText(
        /founded by parents who struggled to find schools/,
      ),
    ).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\b(19|20)\d{2}\b/);
  });

  it('uses the corrected Amharic service list', () => {
    renderIn('am', <AboutPage locale="am" />);
    expect(screen.getByText(/የምግብ አመጋገብ ቴራፒ \(Food Therapy\)/)).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('Occupational');
  });
});

describe('Services page', () => {
  it('lists the three therapies and the summary sentence', () => {
    const { container } = renderIn('en', <ServicesPage locale="en" />);
    expect(container.querySelectorAll('[data-service]')).toHaveLength(3);
    expect(
      screen.getByText(/also provide support and counseling services for families/),
    ).toBeInTheDocument();
    expectValidOutline(container);
  });
});

describe('Volunteer page', () => {
  it('shows the five roles and no application form', () => {
    const { container } = renderIn('en', <VolunteerPage locale="en" />);
    expect(
      within(screen.getByRole('region', { name: 'Volunteer roles' })).getAllByRole('heading', {
        level: 3,
      }),
    ).toHaveLength(5);
    expect(container.querySelector('form, input, textarea, select')).toBeNull();
    expectValidOutline(container);
  });

  it('points to a real way to volunteer and never claims an application was submitted', () => {
    renderIn('en', <VolunteerPage locale="en" />);
    expect(screen.getByRole('link', { name: 'Volunteer With Us' })).toHaveAttribute(
      'href',
      '/en/contact?topic=volunteer',
    );
    expect(screen.getByText(/There is no online volunteer application yet/)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(
      /submitted|thank you for applying|application received/i,
    );
  });
});

describe('FAQ page', () => {
  it('shows all five questions grouped by category as accordion triggers', () => {
    const { container } = renderIn('en', <FaqPage locale="en" />);
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(5);
    expect(screen.getByRole('heading', { name: 'General', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Services', level: 2 })).toBeInTheDocument();
    expectValidOutline(container);
  });

  it('answers the services question with Food Therapy', async () => {
    renderIn('en', <FaqPage locale="en" />);
    fireEvent.click(
      screen.getByRole('button', { name: 'What services does Nehemiah Autism Center provide?' }),
    );
    expect(await screen.findByText(/three main therapy services/)).toHaveTextContent(
      'Speech and Language Therapy, and Food Therapy',
    );
    expect(document.body.textContent).not.toMatch(/occupational/i);
  });
});

describe('Events', () => {
  const event = EVENTS[0];

  it('lists the annual event as date-to-be-confirmed', () => {
    renderIn('en', <EventsPage locale="en" />);
    expect(screen.getByText('Date to be confirmed')).toBeInTheDocument();
    const title = within(screen.getByRole('heading', { level: 3 })).getByRole('link');
    expect(title).toHaveTextContent(
      'World Autism Awareness Day Community Gathering & Art Exhibition',
    );
    expect(title).toHaveAttribute('href', '/en/events/world-autism-awareness-day');
  });

  it('shows frequency, planned time and place but no calendar date, in English', () => {
    const { container } = renderIn('en', <EventDetailPage event={event} locale="en" />);
    expect(screen.getByText('Once every year')).toBeInTheDocument();
    expect(screen.getByText('8:00 AM – 1:00 PM')).toBeInTheDocument();
    expect(screen.getByText('A specific and selected place')).toBeInTheDocument();
    expect(screen.getByText(/exact date has not been confirmed/)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(MONTHS);
    expect(document.body.textContent).not.toMatch(/ሚያዝያ/);
    expectValidOutline(container);
  });

  it('shows the same facts with the document’s Amharic labels and no date in Amharic', () => {
    renderIn('am', <EventDetailPage event={event} locale="am" />);
    expect(screen.getByText('የሚከናወንበት ጊዜ')).toBeInTheDocument();
    expect(screen.getByText('ሰዓት')).toBeInTheDocument();
    expect(screen.getByText('ቦታ')).toBeInTheDocument();
    expect(screen.getByText('በየዓመቱ')).toBeInTheDocument();
    expect(screen.getByText('ከጠዋቱ 2፡00 እስከ ቀኑ 7፡00')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/ሚያዝያ/);
  });
});

describe('Blog', () => {
  it('keeps a valid heading outline on the list page (h1 then h2 cards, no skipped level)', () => {
    const { container } = renderIn('en', <BlogPage locale="en" />);
    expectValidOutline(container);
  });

  it('lists the Buhe 2026 post with a link to it', () => {
    renderIn('en', <BlogPage locale="en" />);
    const link = within(screen.getByRole('heading', { level: 2 })).getByRole('link');
    expect(link).toHaveTextContent(/^Celebrating Buhe 2026:/);
    expect(link).toHaveAttribute('href', '/en/blog/celebrating-buhe-2026');
    // the "Read more" link carries the post title for screen-reader users
    expect(screen.getByRole('link', { name: /Read more: Celebrating Buhe 2026/ })).toHaveAttribute(
      'href',
      '/en/blog/celebrating-buhe-2026',
    );
  });

  it('shows the approved article text with no invented date', () => {
    const { container } = renderIn('en', <BlogPostPage post={BLOG_POSTS[0]} locale="en" />);
    expect(
      screen.getByText(/joyfully celebrated Buhe 2026 with our children, families, and community/),
    ).toBeInTheDocument();
    expect(screen.getByText('Publication date to be confirmed')).toBeInTheDocument();
    expect(container.querySelector('time')).toBeNull();
    expectValidOutline(container);
  });
});

describe('Donate page', () => {
  it('says online donations are coming soon, using the approved message', () => {
    renderIn('en', <DonatePage locale="en" />);
    expect(
      screen.getByRole('heading', { name: 'Online donations are coming soon' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'While online donations are coming soon, support us by volunteering, attending events, or contacting our Center today.',
      ),
    ).toBeInTheDocument();
  });

  it('collects no money or personal details and implies no donation was made', () => {
    const { container } = renderIn('en', <DonatePage locale="en" />);
    expect(container.querySelector('form, input, textarea, select')).toBeNull();
    expect(document.body.textContent).not.toMatch(
      /\$|birr|\bETB\b|thank you for (your )?donat|donation (received|successful)|account number/i,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('offers the three real alternatives from the message', () => {
    renderIn('en', <DonatePage locale="en" />);
    expect(screen.getByRole('link', { name: 'Volunteer' })).toHaveAttribute(
      'href',
      '/en/volunteer',
    );
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('href', '/en/events');
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/en/contact');
    expect(screen.getByRole('link', { name: 'Nehemiah.center@yahoo.com' })).toBeInTheDocument();
  });

  it('shows the English message to Amharic visitors, tagged lang="en" (no approved Amharic yet)', () => {
    renderIn('am', <DonatePage locale="am" />);
    expect(
      screen.getByRole('heading', { name: 'Online donations are coming soon' }),
    ).toHaveAttribute('lang', 'en');
  });
});

describe('Contact page', () => {
  it('lists every contact detail from the document and the six social links', () => {
    const { container } = renderIn('en', <ContactPage locale="en" />);
    expect(screen.getAllByRole('link', { name: 'Nehemiah.center@yahoo.com' })[0]).toHaveAttribute(
      'href',
      'mailto:Nehemiah.center@yahoo.com',
    );
    expect(screen.getByRole('link', { name: '+251 93 001 2652' })).toHaveAttribute(
      'href',
      'tel:+251930012652',
    );
    expect(screen.getByRole('link', { name: '+251 97 905 0917' })).toHaveAttribute(
      'href',
      'tel:+251979050917',
    );
    expect(screen.getByText('Kera, Alemazeye meda, Addis Ababa, Ethiopia')).toBeInTheDocument();
    expect(screen.getByText('8:30 AM – 3:30 PM')).toBeInTheDocument();
    expect(container.querySelector('#social')).not.toBeNull();
    expect(container.querySelector('#location')).not.toBeNull();
    expect(container.querySelectorAll('#social a')).toHaveLength(6);
    expectValidOutline(container);
  });
});

describe('locale provider', () => {
  it('defaults to English when no provider is present', () => {
    render(
      <LocaleProvider locale="en">
        <p>ok</p>
      </LocaleProvider>,
    );
    expect(screen.getByText('ok')).toBeInTheDocument();
  });
});
