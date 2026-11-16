import { ROUTES, type RouteKey } from '@/shared/i18n/routing';
import type { UiKey } from '@/shared/i18n/ui';

export interface NavLink {
  /** Locale-less internal path; may include a #hash. */
  href: string;
  label: UiKey;
}

/** Menu order specified in the content document: Home · About Us · Our Services · Events · Blog · Contact. */
export const PRIMARY_NAV: readonly NavLink[] = [
  { href: ROUTES.home, label: 'nav.home' },
  { href: ROUTES.about, label: 'nav.about' },
  { href: ROUTES.services, label: 'nav.services' },
  { href: ROUTES.events, label: 'nav.events' },
  { href: ROUTES.blog, label: 'nav.blog' },
  { href: ROUTES.contact, label: 'nav.contact' },
];

export interface FooterGroup {
  title: UiKey;
  links: readonly NavLink[];
}

/** Footer link groups specified in the content document. */
export const FOOTER_GROUPS: readonly FooterGroup[] = [
  {
    title: 'footer.support',
    links: [
      { href: ROUTES.volunteer, label: 'nav.volunteer' },
      { href: ROUTES.donate, label: 'nav.donate' },
      { href: ROUTES.faq, label: 'nav.faq' },
      { href: ROUTES.events, label: 'nav.events' },
    ],
  },
  {
    title: 'footer.discover',
    links: [
      { href: ROUTES.about, label: 'nav.about' },
      { href: ROUTES.services, label: 'nav.services' },
      { href: ROUTES.gallery, label: 'nav.gallery' },
      { href: ROUTES.blog, label: 'nav.blog' },
    ],
  },
  {
    title: 'footer.connect',
    links: [
      { href: ROUTES.contact, label: 'footer.contactUs' },
      { href: `${ROUTES.contact}#location`, label: 'footer.visit' },
      { href: `${ROUTES.contact}#social`, label: 'footer.social' },
    ],
  },
];

/** True when `href` points at the page `pathname` (both locale-less). */
export function isCurrentPage(href: string, pathname: string): boolean {
  const target = href.split('#')[0];
  if (target === ROUTES.home) return pathname === ROUTES.home;
  return pathname === target || pathname.startsWith(`${target}/`);
}

export type { RouteKey };
