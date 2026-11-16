import { loc, locProvisional, type Localized } from '@/shared/i18n/localized';
import { DEMO_PHOTOS, type MediaAsset } from '@/shared/content/media';

export type GalleryCategoryId =
  | 'volunteers-in-action'
  | 'parent-support'
  | 'autism-awareness-activities'
  | 'certificate-recognition'
  | 'visits-special-guests'
  | 'staff-training'
  | 'parent-meetings'
  | 'holiday-celebrations'
  | 'autism-awareness-programs'
  | 'collaboration-partnerships'
  | 'donation-programs'
  | 'therapy-services'
  | 'free-medical-examinations';

export interface GalleryCategory {
  id: GalleryCategoryId;
  title: Localized<string>;
  description: Localized<string>;
}

/** The 13 gallery categories, in the order and wording supplied in "website content.docx" (English only). */
export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  {
    id: 'volunteers-in-action',
    title: loc('Volunteers in Action'),
    description: loc(
      'Our dedicated volunteers generously share their time, skills, and compassion, making a meaningful difference in the lives of children.',
    ),
  },
  {
    id: 'parent-support',
    title: loc('Parent Support'),
    description: loc(
      'Parents actively support their children, share experiences, and build strength through connection, guidance, encouragement, and mutual understanding together.',
    ),
  },
  {
    id: 'autism-awareness-activities',
    title: loc('Autism Awareness Activities'),
    description: loc(
      'Raising awareness, sharing knowledge, and promoting understanding to build a more informed, inclusive, accepting, and supportive community for everyone.',
    ),
  },
  {
    id: 'certificate-recognition',
    title: loc('Certificate & Recognition'),
    description: loc(
      'Celebrating and recognizing individuals whose dedication, service, and contributions have created a positive and meaningful impact within our community.',
    ),
  },
  {
    id: 'visits-special-guests',
    title: loc('Visits & Special Guests'),
    description: loc(
      'Welcoming visitors and special guests who come to learn, connect, share experiences, and support our mission and community.',
    ),
  },
  {
    id: 'staff-training',
    title: loc('Staff Training'),
    description: loc(
      'Empowering our staff through continuous training, professional development, and shared learning to strengthen the quality of support and services.',
    ),
  },
  {
    id: 'parent-meetings',
    title: loc('Parent Meetings'),
    description: loc(
      'Creating opportunities for parents to connect, exchange experiences, receive guidance, and work together toward supporting their children’s development.',
    ),
  },
  {
    id: 'holiday-celebrations',
    title: loc('Holiday Celebrations'),
    description: loc(
      'Celebrating special holidays and cultural traditions together, creating joyful memories, meaningful experiences, and opportunities for inclusion, connection, and happiness.',
    ),
  },
  {
    id: 'autism-awareness-programs',
    title: loc('Autism Awareness Programs'),
    description: loc(
      'Bringing communities together through educational programs that promote understanding, acceptance, inclusion, and greater support for autistic children and families.',
    ),
  },
  {
    id: 'collaboration-partnerships',
    title: loc('Collaboration & Partnerships'),
    description: loc(
      'Working alongside organizations, professionals, and communities to strengthen our services, share knowledge, and create greater opportunities for our children.',
    ),
  },
  {
    id: 'donation-programs',
    title: loc('Donation Programs'),
    description: loc(
      'Through the generosity of our supporters, donations help provide essential resources, services, and opportunities for children and their families.',
    ),
  },
  {
    id: 'therapy-services',
    title: loc('Therapy Services'),
    description: loc(
      'Providing individualized therapeutic support that helps children develop communication, independence, daily living, social, and other essential skills for life.',
    ),
  },
  {
    id: 'free-medical-examinations',
    title: loc('Free Medical Examinations'),
    description: loc(
      'Providing free medical examinations and support services to help children and families access essential healthcare and professional guidance.',
    ),
  },
];

export interface GalleryPhoto extends MediaAsset {
  id: string;
  /**
   * Categories the photograph visibly belongs to. Left empty unless the image itself shows it
   * (a certificate, a public march). The organisation assigns the rest when it supplies final
   * photographs — see NAC-MEDIA-REPLACEMENT-MANIFEST.md. No event, date or person is named.
   */
  categories: readonly GalleryCategoryId[];
}

function photo(
  id: string,
  asset: MediaAsset,
  categories: readonly GalleryCategoryId[] = [],
): GalleryPhoto {
  return { id, ...asset, categories };
}

/** Temporary demonstration photographs (all `demo: true`). */
export const GALLERY_PHOTOS: readonly GalleryPhoto[] = [
  photo('families-event', DEMO_PHOTOS.heroFamilies),
  photo('children-playing', DEMO_PHOTOS.heroChildren),
  photo('volunteers-certificates', DEMO_PHOTOS.volunteers, [
    'volunteers-in-action',
    'certificate-recognition',
  ]),
  photo('walk-crowd', DEMO_PHOTOS.walkCrowd, ['autism-awareness-activities']),
  photo('march-on-road', DEMO_PHOTOS.marchOnRoad, ['autism-awareness-activities']),
  photo('certificate', DEMO_PHOTOS.certificate, ['certificate-recognition']),
  photo('ribbon-game', DEMO_PHOTOS.ribbonGame),
  photo('mascot-cones', DEMO_PHOTOS.mascotCones),
  photo('seated-group', DEMO_PHOTOS.seatedGroup),
  photo('parachute', DEMO_PHOTOS.parachute),
  photo('hug', DEMO_PHOTOS.hug),
  photo('rocking-toys', DEMO_PHOTOS.rockingToys),
  photo('corn-activity', DEMO_PHOTOS.cornActivity),
  photo('counting-game', DEMO_PHOTOS.countingGame),
  photo('foam-mats', DEMO_PHOTOS.foamMats),
  photo('arts-and-crafts', DEMO_PHOTOS.artsAndCrafts),
  photo('small-chairs', DEMO_PHOTOS.smallChairs),
];

/** Photographs shown in the homepage preview. */
export const GALLERY_PREVIEW_IDS = [
  'children-playing',
  'families-event',
  'ribbon-game',
  'parachute',
  'arts-and-crafts',
  'volunteers-certificates',
] as const;

/** Interface text for the gallery; short labels carry provisional Amharic, sentences are English only. */
export const GALLERY_COPY = {
  all: locProvisional('All photos', 'ሁሉም ፎቶዎች'),
  filterLabel: locProvisional('Show photos from', 'ፎቶዎችን አሳይ'),
  viewGallery: locProvisional('View the gallery', 'ጋለሪውን ይመልከቱ'),
  empty: loc('Photos for this category will be added soon.'),
  close: locProvisional('Close', 'ዝጋ'),
  previous: locProvisional('Previous photo', 'ቀዳሚ ፎቶ'),
  next: locProvisional('Next photo', 'ቀጣይ ፎቶ'),
  openPhoto: locProvisional('Open photo larger', 'ፎቶውን አስፋ'),
} as const;
