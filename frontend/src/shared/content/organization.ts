import { loc, locProvisional } from '@/shared/i18n/localized';

/**
 * Organisation facts, taken from "website content.docx" (Organization basics).
 * Amharic strings are verbatim from the document unless flagged `amProvisional`.
 * Do not add facts here that are not in the approved document.
 */
export const ORGANIZATION = {
  name: loc('Nehemiah Autism Center', 'ነህምያ ኦቲዝም ማዕከል'),

  tagline: loc(
    'Together, let’s lighten the burden faced by autistic children and their parents!',
    // Source text kept verbatim, including "የወሳጆቻቸውን" (see NAC-CONTENT-APPROVAL-REGISTER.md, AM-03).
    'የኦቲስቲክ ልጆችንና የወሳጆቻቸውን ሸክም በጋራ እናቃልል!!',
  ),

  /** "Site description" from the document. */
  description: loc(
    'Nehemiah Autism Center is a locally established charitable organization supporting children and young people with autism and related developmental disorders, along with their families, through education, multidisciplinary services, and awareness initiatives that address social, psychological, and economic challenges and promote understanding of autism.',
    'ነህምያ ኦቲዝም ማዕከል ከ15 ዓመታት በፊት በወላጆች የተቋቋመ ሀገር በቀል ምግባረ ሰናይ ድርጅት ሲሆን፣ 90 ህጻናትንና ቤተሰቦቻቸውን በመደገፍ፣ የኦቲዝምን ተግዳሮቶች ለማቅለልና በህብረተሰቡ ያለውን የተሳሳተ ግንዛቤ ለመቀየር ይሰራል።',
  ),

  /** "Footer Sentence" from the document. */
  footerSentence: loc(
    'Nehemiah Autism Center is dedicated to empowering autistic children and their families through education, therapy, care, and community support. Together, we work toward a more inclusive future where every child is valued and given the opportunity to thrive.',
    'ነህምያ ኦቲዝም ማዕከል ኦቲዝም ያላቸውን ልጆችና ቤተሰቦቻቸውን በትምህርት፣ በቴራፒ፣ በእንክብካቤ እና በማህበረሰብ ድጋፍ ለማብቃት የሚሠራ ድርጅት ነው። እያንዳንዱ ልጅ ዋጋ የሚሰጠውና የማደግ ዕድል የሚያገኝበትን የተካተተ የወደፊት ማህበረሰብ ለመፍጠር በአንድነት እንሠራለን።',
  ),

  email: 'Nehemiah.center@yahoo.com',

  /** Display form is spaced for legibility; `tel` is the dialable E.164 number. */
  phones: [
    { display: '+251 93 001 2652', tel: '+251930012652' },
    { display: '+251 97 905 0917', tel: '+251979050917' },
  ],

  address: loc('Kera, Alemazeye meda, Addis Ababa, Ethiopia', 'ቄራ፣ አልማዝዬ ሜዳ፣ አዲስ አበባ፣ ኢትዮጵያ'),

  /** Amharic hours use the Ethiopian 12-hour clock exactly as supplied; they are not converted. */
  hours: [
    {
      days: loc('Monday – Friday', 'ሰኞ – ዓርብ'),
      time: loc('8:30 AM – 3:30 PM', 'ጠዋት 2፡30 – ቀን 9፡30'),
    },
    {
      days: loc('Saturday', 'ቅዳሜ'),
      time: loc('8:30 AM – 12:30 PM', 'ጠዋት 2፡30 – ቀን 6፡30'),
    },
  ],

  /** Short link supplied in the document; resolves to the "Nehemiah Autism Center" Google Maps place. */
  mapsUrl: 'https://maps.app.goo.gl/xsjymvB88q6aC5ty6',

  /** Embeddable map of the same Google Maps place (place id 0x164b8444e6192915:0x8fe79cdb01ddd566). */
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.74303275938243!3d8.980465798528387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8444e6192915%3A0x8fe79cdb01ddd566!2sNehemiah%20Autism%20Center!5e0!3m2!1sen!2set!4v1775026060632!5m2!1sen!2set',

  mapTitle: locProvisional(
    'Map showing the location of Nehemiah Autism Center',
    'የነህምያ ኦቲዝም ማዕከል አድራሻ ካርታ',
  ),
} as const;

export type SocialKey = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'x';

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}

/**
 * Official profiles from the document. Tracking parameters (Instagram `igsh`, TikTok `_r`/`_t`)
 * were removed and YouTube was upgraded from http to https; the profile targets are unchanged.
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/1KBfp9oW3i/' },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/nehemiah_autism_center',
  },
  { key: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@nehemiahautismcenter' },
  { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@NehemiahAutismCenter' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/nehemiah-autism-center',
  },
  { key: 'x', label: 'X (Twitter)', href: 'https://x.com/NehemiahAutism' },
];

/**
 * Figures stated in the document (About page / site description). Pending organisational
 * confirmation — see NAC-CONTENT-APPROVAL-REGISTER.md (ST-01..ST-03).
 */
export const ORGANIZATION_FIGURES = {
  childrenSupported: 90,
  childrenGraduated: 65, // "more than 65"
  yearsSinceFounding: 15, // "established 15 years ago"
} as const;
