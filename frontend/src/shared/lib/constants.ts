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
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Success Stories', href: '/success-stories' },
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
  name: 'Nehemiah Autism Center',
  tagline: 'Holistic care & education for children with Autism Spectrum Disorder',
  phone: '+2519 79 05 09 17',
  phone2: '',
  phone3: '+251 118 963640',
  email: 'Nehemiah.center@yahoo.com',
  address: 'Kera Almazye Meda, Addis Ababa',
  hours: '08:00 - 17:00',
  social: {
    facebook: 'https://www.facebook.com/NehemiahAutismCenter',
    twitter: ' https://x.com/NehemiahAutism?s=20',
    instagram:
      '  https://www.instagram.com/nehemiah_autism_center?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    youtube: '#',
    linkedin: 'https://www.linkedin.com/company/nehemiah-autism-center',
  },
  footerLinks: {
    organization: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Programs', href: '#' },
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Donate', href: '/donate' },
    ],
    support: [
      { label: 'Therapeutic Interventions', href: '#' },
      { label: 'Special Education', href: '#' },
      { label: 'Life Skills Training', href: '#' },
      { label: 'Parental Counseling', href: '#' },
    ],
    discover: [
      { label: 'How To Sponsor', href: '#' },
      { label: 'Become a Volunteer', href: '/volunteer' },
      { label: 'Autism Awareness', href: '#' },
      { label: 'Community Support', href: '#' },
    ],
  },
  footerAbout:
    'Nehemiah Autism Center was founded in 2011 to provide holistic care, education, and empowerment to children with Autism Spectrum Disorder (ASD). We strive to reduce social stigma and create an inclusive environment for our children.',
};
