export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Volunteers', href: '/team' },
      { label: 'FAQ', href: '/about#faq' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  { label: 'Contact', href: '/contact' },
];

export const SITE_CONFIG = {
  name: 'Nehemiah',
  tagline: 'Charity & Fundraising',
  phone: '(+880) 0823 560 433',
  email: 'support@nehemiah.org',
  address: 'Road-2, East Shibgonj, House No: M-23, Sylhet',
  hours: '10.00 - 18.00 UTC+06',
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#',
    linkedin: '#',
  },
  footerLinks: {
    organization: [
      { label: 'Join Academy', href: '#' },
      { label: 'Press Releases', href: '#' },
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Donate', href: '/donate' },
    ],
    support: [
      { label: 'Love Philosophy', href: '#' },
      { label: 'Share & Care', href: '#' },
      { label: 'Child Education', href: '#' },
      { label: 'Medical Treatment', href: '#' },
    ],
    discover: [
      { label: 'How To Sponsor', href: '#' },
      { label: 'Support a Volunteer', href: '#' },
      { label: 'Community Attitudes', href: '#' },
      { label: 'Family Adopting', href: '#' },
    ],
  },
  footerAbout:
    'We are a volunteer based organisation and helps disabled and under-privileged children by providing them with funding for equipment and services so they can live a better life.',
};
