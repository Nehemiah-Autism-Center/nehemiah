export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialProfile {
  network: 'Instagram' | 'Facebook' | 'TikTok' | 'YouTube' | 'LinkedIn' | 'X';
  href: string;
}

// Menu order from the content document: Home · About Us · Our Services · Events · Blog · Contact.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const SITE_CONFIG = {
  name: 'Nehemiah Autism Center',
  shortName: 'Nehemiah',
  tagline: 'Together, let’s lighten the burden faced by autistic children and their parents!',
  description:
    'Nehemiah Autism Center is a locally established charitable organization supporting children and young people with autism and related developmental disorders, along with their families, through education, multidisciplinary services, and awareness initiatives that address social, psychological, and economic challenges and promote understanding of autism.',
  email: 'nehemiah.center@yahoo.com',
  phones: [
    { display: '+251 93 001 2652', tel: '+251930012652' },
    { display: '+251 97 905 0917', tel: '+251979050917' },
  ],
  address: 'Kera, Alemazeye Meda, Addis Ababa, Ethiopia',
  shortAddress: 'Kera, Alemazeye Meda, Addis Ababa',
  hours: [
    { days: 'Monday – Friday', time: '8:30 AM – 3:30 PM' },
    { days: 'Saturday', time: '8:30 AM – 12:30 PM' },
  ],
  map: {
    // Short link from the content document; it resolves to the center's Google Maps place.
    link: 'https://maps.app.goo.gl/xsjymvB88q6aC5ty6',
    // Keyless embed centred on the place's coordinates (8.9805749, 38.7428137).
    embed: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s8.9805749,38.7428137!6i16',
  },
  social: [
    { network: 'Instagram', href: 'https://www.instagram.com/nehemiah_autism_center/' },
    { network: 'Facebook', href: 'https://www.facebook.com/share/1KBfp9oW3i/' },
    { network: 'TikTok', href: 'https://www.tiktok.com/@nehemiahautismcenter' },
    { network: 'YouTube', href: 'https://www.youtube.com/@NehemiahAutismCenter' },
    { network: 'LinkedIn', href: 'https://www.linkedin.com/company/nehemiah-autism-center' },
    { network: 'X', href: 'https://x.com/NehemiahAutism' },
  ] satisfies SocialProfile[],
  footerAbout:
    'Nehemiah Autism Center is dedicated to empowering autistic children and their families through education, therapy, care, and community support. Together, we work toward a more inclusive future where every child is valued and given the opportunity to thrive.',
};

// Closing call-to-action from the content document, reused at the end of several pages.
export const SUPPORT_CTA = {
  title: 'Help Us Reach More Children',
  description:
    'Our work provides free teaching, therapy, transportation, and support for children and families who need it most. Your support can help us reach more autistic children and bring hope and opportunity within their reach.',
  buttonLabel: 'Support Our Mission',
  buttonHref: '/donate',
};

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Support',
    links: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Donate', href: '/donate' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Services', href: '/services' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Visit the Center', href: '/contact#visit' },
    ],
  },
];
