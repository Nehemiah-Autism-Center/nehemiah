import { loc, type Localized } from '@/shared/i18n/localized';

export interface MediaAsset {
  /** Path under /public. */
  src: string;
  /** Intrinsic pixel size of the optimised file (needed for next/image and to avoid layout shift). */
  width: number;
  height: number;
  /** Describes what is visible; never claims an event, date or category the organisation has not confirmed. */
  alt: Localized<string>;
  /**
   * True for temporary demonstration photographs. Each one is listed in
   * docs/frontend-review/NAC-MEDIA-REPLACEMENT-MANIFEST.md and must be replaced with an
   * organisation-approved photograph before a public release.
   */
  demo: boolean;
}

/**
 * Demonstration photographs live in /public/media/demo. To replace one, run
 * `pnpm media:optimize <original> public/media/demo/<name>.jpg` and update the size here.
 * Alt text has no approved Amharic yet, so Amharic pages show the English description.
 */
export function demoPhoto(file: string, width: number, height: number, alt: string): MediaAsset {
  return { src: `/media/demo/${file}`, width, height, alt: loc(alt), demo: true };
}

const heroFamilies = demoPhoto(
  'hero-families-event.jpg',
  1280,
  853,
  'A crowd of families and community members, including children, gathered outdoors at an event',
);

const heroChildren = demoPhoto(
  'hero-children-playing.jpg',
  1600,
  901,
  'Children playing a game with painted cans on an outdoor path while adults in blue T-shirts watch',
);

const volunteers = demoPhoto(
  'volunteers-certificates.jpg',
  1600,
  901,
  'A group of young people holding certificates of appreciation in front of an event banner',
);

const walkCrowd = demoPhoto(
  'demo-09.jpg',
  1600,
  1067,
  'A large crowd of people in orange T-shirts walking together, seen from above',
);

const seatedGroup = demoPhoto(
  'demo-03.jpg',
  1600,
  1067,
  'Adults and children in white T-shirts with a printed logo sitting together on the grass',
);

export const MEDIA = {
  logo: {
    src: '/media/brand/nehemiah-logo.png',
    width: 640,
    height: 640,
    alt: loc(
      'Nehemiah Autism Center logo: a puzzle-piece umbrella with the name Nehemiah in Amharic and English',
    ),
    demo: false,
  },
  /** 1200x630 card used for link previews; the organisation supplied no share image. */
  shareCard: {
    src: '/media/brand/share-card.jpg',
    width: 1200,
    height: 630,
    alt: loc('Nehemiah Autism Center logo'),
    demo: false,
  },
  /** Homepage hero photographs ("Hero photo" in the content document). */
  heroPrimary: heroChildren,
  heroSecondary: heroFamilies,
  /** Events section photograph (placed under "Events" in the content document). */
  event: heroFamilies,
  /** Volunteer page banner ("Banner photo" in the content document). */
  volunteerBanner: volunteers,
  /** About page banner and side photograph: the folder named in the document was not supplied. */
  aboutBanner: walkCrowd,
  aboutSide: seatedGroup,
} as const satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof MEDIA;

/** Photographs shown in the gallery. Which categories they belong to is decided in features/gallery. */
export const DEMO_PHOTOS = {
  heroFamilies,
  heroChildren,
  volunteers,
  walkCrowd,
  seatedGroup,
  ribbonGame: demoPhoto(
    'demo-01.jpg',
    1600,
    1067,
    'Children and adults playing a ribbon tug-of-war on a lawn',
  ),
  mascotCones: demoPhoto(
    'demo-02.jpg',
    1600,
    1067,
    'Children playing between orange, green and blue cones while a costumed mascot dances',
  ),
  parachute: demoPhoto(
    'demo-04.jpg',
    1600,
    1067,
    'Adults and children holding a large rainbow parachute outdoors',
  ),
  hug: demoPhoto('demo-05.jpg', 1600, 1067, 'Two women in white T-shirts smiling and hugging'),
  rockingToys: demoPhoto(
    'demo-06.jpg',
    1200,
    1600,
    'Two young children riding colourful spring rocking toys outdoors',
  ),
  cornActivity: demoPhoto(
    'demo-07.jpg',
    1200,
    1600,
    'Two children in colourful aprons and hats peeling corn cobs',
  ),
  countingGame: demoPhoto(
    'demo-08.jpg',
    1280,
    1280,
    'A boy in a school jumper placing paper tubes on a counting game',
  ),
  marchOnRoad: demoPhoto(
    'demo-10.jpg',
    1600,
    1067,
    'A long march of people in orange T-shirts on a road with a banner at the front',
  ),
  certificate: demoPhoto(
    'demo-11.jpg',
    1067,
    1600,
    'Two people in blue T-shirts holding a framed certificate',
  ),
  foamMats: demoPhoto(
    'demo-12.jpg',
    1600,
    1200,
    'Children and adults seated on colourful foam mats around activity materials',
  ),
  artsAndCrafts: demoPhoto(
    'demo-13.jpg',
    1600,
    900,
    'Children and adults doing arts and crafts around a table',
  ),
  smallChairs: demoPhoto(
    'demo-14.jpg',
    1600,
    1200,
    'Children sitting on small green chairs outdoors',
  ),
} as const satisfies Record<string, MediaAsset>;
