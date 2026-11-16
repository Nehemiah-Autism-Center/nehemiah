import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ORGANIZATION, SOCIAL_LINKS } from '@/shared/content/organization';
import { SERVICES, SERVICE_NAMES_EN } from '@/shared/content/services';
import { DEMO_PHOTOS, MEDIA, type MediaAsset } from '@/shared/content/media';
import { FOOTER_GROUPS, PRIMARY_NAV } from '@/shared/content/navigation';
import { ROUTES, ROUTE_PATHS } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { HERO, CLOSING_CTA } from '@/features/home/data';
import { ABOUT_HISTORY, ABOUT_INTRO, ABOUT_MISSION } from '@/features/about/data';
import { SERVICES_SUMMARY } from '@/features/services/data';
import { FAQ_CATEGORIES, FAQ_ITEM_COUNT } from '@/features/faq/data';
import { VOLUNTEER_INTRO, VOLUNTEER_ROLES } from '@/features/volunteer/data';
import { EVENTS } from '@/features/events/data';
import { BLOG_POSTS } from '@/features/blog/data';
import { GALLERY_CATEGORIES, GALLERY_PHOTOS } from '@/features/gallery/data';
import { TESTIMONIALS, getVisibleTestimonials } from '@/features/testimonials/data';
import { DONATION_MESSAGE } from '@/features/donation/data';
import { LOCATION, CONTACT_COPY } from '@/features/contact/data';

const ROOT = path.resolve(__dirname, '../../..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PUBLIC_ROUTES_DIR = path.join(ROOT, 'src/app/[locale]/(public)');

/** Collects every string in a (JSON-like) structure. */
function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out));
  return out;
}

const ALL_PUBLIC_CONTENT = strings([
  ORGANIZATION,
  SERVICES,
  SERVICES_SUMMARY,
  HERO,
  CLOSING_CTA,
  ABOUT_INTRO,
  ABOUT_MISSION,
  ABOUT_HISTORY,
  FAQ_CATEGORIES,
  VOLUNTEER_INTRO,
  VOLUNTEER_ROLES,
  EVENTS.map((event) => ({ ...event, image: undefined })),
  BLOG_POSTS,
  GALLERY_CATEGORIES,
  TESTIMONIALS,
  DONATION_MESSAGE,
  LOCATION,
  CONTACT_COPY,
  ui,
]);

describe('principal therapy services', () => {
  it('are exactly ABA, Speech and Language Therapy and Food Therapy, in that order', () => {
    expect(SERVICE_NAMES_EN).toEqual([
      'Applied Behavior Analysis (ABA)',
      'Speech and Language Therapy',
      'Food Therapy',
    ]);
    expect(SERVICES).toHaveLength(3);
  });

  it('each have an approved description in both languages', () => {
    for (const service of SERVICES) {
      expect(service.description.en.length, service.id).toBeGreaterThan(20);
      expect(service.description.am?.length, service.id).toBeGreaterThan(20);
      expect(service.name.am, service.id).toBeTruthy();
    }
  });

  it('never mention Occupational Therapy anywhere in public content (either language)', () => {
    const offenders = ALL_PUBLIC_CONTENT.filter(
      (s) => /occupational/i.test(s) || /የሙያ\s*(ሕክምና|ቴራፒ|እገዛ)/.test(s),
    );
    expect(offenders).toEqual([]);
  });

  it('name Food Therapy wherever the three services are listed in prose', () => {
    const proseListing = [...ABOUT_INTRO.en, SERVICES_SUMMARY.en].filter((s) =>
      /three main therapy services/i.test(s),
    );
    expect(proseListing).toHaveLength(2);
    for (const s of proseListing) expect(s).toContain('Food Therapy');
    for (const s of [...(ABOUT_INTRO.am ?? []), SERVICES_SUMMARY.am ?? '']) {
      if (/ABA/.test(s) && /ቴራፒ/.test(s)) expect(s).toContain('የምግብ አመጋገብ ቴራፒ');
    }
  });
});

describe('unsupported claims removed', () => {
  const forbidden: [string, RegExp][] = [
    ['fundraiser progress', /\$\s?\d|raised|target:/i],
    ['invented counters', /\b300\+|\b500\+/],
    ['named founder/staff', /Rahel|Tewdros|Firdawek|Meseret Haile/i],
    ['waiting-list claim', /463/],
    [
      'named donors/partners',
      /Commercial Bank|Oak International|Development Bank|Embassy of Finland|Nib Insurance/i,
    ],
    ['invented venues', /Meskel Square|Addis Ababa University|Welo Sefer|Megenagna|Gotera/i],
    ['named children', /Maedot|Nathan Wbshet|Beniyas/i],
    ['bank accounts', /\baccount number\b|\bIBAN\b|\bSWIFT\b/i],
  ];
  for (const [label, pattern] of forbidden) {
    it(`contains no ${label}`, () => {
      expect(ALL_PUBLIC_CONTENT.filter((s) => pattern.test(s))).toEqual([]);
    });
  }
});

describe('organisation details (from the content document)', () => {
  it('has the public email and two valid, dialable phone numbers', () => {
    expect(ORGANIZATION.email).toBe('Nehemiah.center@yahoo.com');
    expect(ORGANIZATION.phones).toHaveLength(2);
    for (const phone of ORGANIZATION.phones) {
      expect(phone.tel).toMatch(/^\+251\d{9}$/);
      expect(phone.display.replace(/\D/g, '')).toBe(phone.tel.replace(/\D/g, ''));
    }
    expect(ORGANIZATION.phones.map((p) => p.tel)).toEqual(['+251930012652', '+251979050917']);
  });

  it('has the address and both opening-hours rows in both languages', () => {
    expect(ORGANIZATION.address.en).toBe('Kera, Alemazeye meda, Addis Ababa, Ethiopia');
    expect(ORGANIZATION.address.am).toBe('ቄራ፣ አልማዝዬ ሜዳ፣ አዲስ አበባ፣ ኢትዮጵያ');
    expect(ORGANIZATION.hours).toHaveLength(2);
    expect(ORGANIZATION.hours[0].time.en).toBe('8:30 AM – 3:30 PM');
    expect(ORGANIZATION.hours[1].time.en).toBe('8:30 AM – 12:30 PM');
    for (const row of ORGANIZATION.hours) {
      expect(row.days.am).toBeTruthy();
      expect(row.time.am).toBeTruthy();
    }
  });

  it('links to the six official social profiles over https without tracking parameters', () => {
    expect(SOCIAL_LINKS.map((l) => l.key).sort()).toEqual(
      ['facebook', 'instagram', 'linkedin', 'tiktok', 'x', 'youtube'].sort(),
    );
    for (const link of SOCIAL_LINKS) {
      expect(link.href, link.key).toMatch(/^https:\/\/[^\s#]+$/);
      expect(link.href, link.key).not.toMatch(/igsh=|utm_|_r=1|_t=|\?s=/);
    }
    expect(ORGANIZATION.mapsUrl).toBe('https://maps.app.goo.gl/xsjymvB88q6aC5ty6');
    expect(ORGANIZATION.mapsEmbedUrl).toContain('0x164b8444e6192915');
  });
});

describe('navigation', () => {
  it('uses the document menu order', () => {
    expect(PRIMARY_NAV.map((n) => n.label)).toEqual([
      'nav.home',
      'nav.about',
      'nav.services',
      'nav.events',
      'nav.blog',
      'nav.contact',
    ]);
  });

  it('uses the document footer groups', () => {
    expect(FOOTER_GROUPS.map((g) => g.links.map((l) => l.label))).toEqual([
      ['nav.volunteer', 'nav.donate', 'nav.faq', 'nav.events'],
      ['nav.about', 'nav.services', 'nav.gallery', 'nav.blog'],
      ['footer.contactUs', 'footer.visit', 'footer.social'],
    ]);
  });

  it('only links to pages that exist, with no empty or "#" targets', () => {
    const links = [...PRIMARY_NAV, ...FOOTER_GROUPS.flatMap((g) => g.links)];
    for (const link of links) {
      expect(link.href, link.label).not.toMatch(/^#?$/);
      const pathname = link.href.split('#')[0];
      expect(ROUTE_PATHS, link.href).toContain(pathname);
      const file =
        pathname === '/'
          ? path.join(PUBLIC_ROUTES_DIR, 'page.tsx')
          : path.join(PUBLIC_ROUTES_DIR, pathname, 'page.tsx');
      expect(existsSync(file), `${link.href} -> ${file}`).toBe(true);
    }
  });

  it('has a page for every registered route', () => {
    for (const [key, pathname] of Object.entries(ROUTES)) {
      const file =
        pathname === '/'
          ? path.join(PUBLIC_ROUTES_DIR, 'page.tsx')
          : path.join(PUBLIC_ROUTES_DIR, pathname, 'page.tsx');
      expect(existsSync(file), key).toBe(true);
    }
  });
});

describe('media', () => {
  const assets: [string, MediaAsset][] = [
    ...Object.entries(MEDIA),
    ...Object.entries(DEMO_PHOTOS),
    ...GALLERY_PHOTOS.map((p): [string, MediaAsset] => [`gallery:${p.id}`, p]),
  ];

  it('references only files that exist, are web-sized, and match their declared dimensions', async () => {
    for (const [name, asset] of assets) {
      const file = path.join(PUBLIC_DIR, asset.src);
      expect(existsSync(file), `${name} -> ${asset.src}`).toBe(true);
      expect(statSync(file).size, `${name} size`).toBeLessThan(500 * 1024);
      const meta = await sharp(file).metadata();
      expect([meta.width, meta.height], name).toEqual([asset.width, asset.height]);
    }
  });

  it('carries no embedded metadata (EXIF, GPS, camera data)', async () => {
    for (const [name, asset] of assets) {
      const meta = await sharp(path.join(PUBLIC_DIR, asset.src)).metadata();
      expect(meta.exif, `${name} exif`).toBeUndefined();
    }
  });

  it('has a non-empty English description for every image', () => {
    for (const [name, asset] of assets) {
      expect(asset.alt.en.trim().length, name).toBeGreaterThan(10);
    }
  });

  it('flags photographs as demonstration media and the brand assets as final', () => {
    expect(MEDIA.logo.demo).toBe(false);
    expect(MEDIA.shareCard.demo).toBe(false);
    for (const photo of GALLERY_PHOTOS) expect(photo.demo, photo.id).toBe(true);
  });

  it('ships only the optimised /media tree (no leftover raw images)', () => {
    expect(existsSync(path.join(PUBLIC_DIR, 'images'))).toBe(false);
  });
});

describe('gallery', () => {
  it('has the 13 categories from the document, uniquely identified', () => {
    expect(GALLERY_CATEGORIES).toHaveLength(13);
    expect(new Set(GALLERY_CATEGORIES.map((c) => c.id)).size).toBe(13);
    expect(GALLERY_CATEGORIES[0].title.en).toBe('Volunteers in Action');
    expect(GALLERY_CATEGORIES[12].title.en).toBe('Free Medical Examinations');
  });

  it('only assigns a photo to categories that exist', () => {
    const ids = new Set(GALLERY_CATEGORIES.map((c) => c.id));
    for (const photo of GALLERY_PHOTOS) {
      for (const category of photo.categories) expect(ids.has(category), photo.id).toBe(true);
    }
  });

  it('does not assign invented facts to photographs (no dates, names or events in descriptions)', () => {
    for (const photo of GALLERY_PHOTOS) {
      expect(photo.alt.en, photo.id).not.toMatch(
        /\b(19|20)\d{2}\b|Buhe|Easter|Christmas|Timket|Meskel/i,
      );
    }
  });
});

describe('FAQ, volunteer roles and event', () => {
  it('has the five FAQ questions in two categories, each answered in both languages', () => {
    expect(FAQ_ITEM_COUNT).toBe(5);
    expect(FAQ_CATEGORIES.map((c) => c.items.length)).toEqual([2, 3]);
    for (const item of FAQ_CATEGORIES.flatMap((c) => c.items)) {
      expect(item.question.am, item.id).toBeTruthy();
      expect(item.answer.am, item.id).toBeTruthy();
    }
  });

  it('has the five volunteer role categories in both languages', () => {
    expect(VOLUNTEER_ROLES).toHaveLength(5);
    for (const role of VOLUNTEER_ROLES) {
      expect(role.title.am, role.id).toBeTruthy();
      expect(role.description.am, role.id).toBeTruthy();
    }
  });

  it('shows the awareness event without presenting an unconfirmed date as confirmed', () => {
    expect(EVENTS).toHaveLength(1);
    const [event] = EVENTS;
    expect(event.dateStatus).toBe('to-be-confirmed');
    const shown = strings({ ...event, image: undefined }).join(' ');
    // Neither source's date is shown: not "April 4-5", not "ሚያዝያ 4", no month names at all.
    expect(shown).not.toMatch(/april|ሚያዝያ|\b4\s*[-–]\s*5\b|ኤፕሪል/i);
  });

  it('publishes the Buhe 2026 article with no invented date', () => {
    expect(BLOG_POSTS).toHaveLength(1);
    expect(BLOG_POSTS[0].title.en).toMatch(/^Celebrating Buhe 2026:/);
    expect(BLOG_POSTS[0].publishedOn).toBeUndefined();
  });
});

describe('testimonials', () => {
  it('has the six supplied testimonials, all pending approval, with attributions preserved', () => {
    expect(TESTIMONIALS).toHaveLength(6);
    expect(TESTIMONIALS.every((t) => t.approval === 'pending')).toBe(true);
    expect(TESTIMONIALS.map((t) => t.attribution.en)).toEqual([
      'A Nehemiah Volunteer',
      'A Grateful Parent',
      'Volunteer',
      'Parent of a Child at the Center',
      'Former Volunteer',
      'A Grateful Parent',
    ]);
  });

  it('can be withheld from a release without code changes', () => {
    expect(getVisibleTestimonials(TESTIMONIALS, false)).toHaveLength(6);
    expect(getVisibleTestimonials(TESTIMONIALS, true)).toHaveLength(0);
    const mixed = [TESTIMONIALS[0], { ...TESTIMONIALS[1], approval: 'approved' as const }];
    expect(getVisibleTestimonials(mixed, true).map((t) => t.id)).toEqual([TESTIMONIALS[1].id]);
  });
});
