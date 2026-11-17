import { loc, type Localized } from '@/shared/i18n/localized';

export interface BlogPost {
  slug: string;
  title: Localized<string>;
  /** Body paragraphs. */
  body: Localized<string[]>;
  /** Used as the meta description and the card summary ("Search Summary" in the document). */
  summary: Localized<string>;
  /** ISO date (YYYY-MM-DD). Omitted until the organisation confirms the publication date. */
  publishedOn?: string;
  /**
   * Cover photograph. Omitted until the organisation supplies one: the document refers to a
   * photograph "at folder" that was not provided, and a stock photo would misrepresent the day.
   */
  cover?: undefined;
}

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'celebrating-buhe-2026',
    title: loc(
      'Celebrating Buhe 2026: A Day of Joy, Music, and Togetherness at Nehemiah Autism Center',
    ),
    body: loc<string[]>([
      'Nehemiah Autism Center joyfully celebrated Buhe 2026 with our children, families, and community. The day was filled with music, laughter, cultural activities, and unforgettable moments, creating a joyful and inclusive experience where everyone could participate, connect, and celebrate together.',
    ]),
    summary: loc(
      'Nehemiah Autism Center celebrated Buhe 2026 with joy, culture, music, and inclusion.',
    ),
    // publishedOn intentionally omitted — see NAC-CONTENT-APPROVAL-REGISTER.md (BL-01).
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Shown on the blog pages; English only (the document has no Amharic for the blog). */
export const BLOG_COPY = {
  empty: loc('No posts match your search.'),
  notDated: loc('Publication date to be confirmed'),
  backToBlog: loc('Back to the blog'),
  coverPending: loc('Cover photo to be added'),
} as const;
