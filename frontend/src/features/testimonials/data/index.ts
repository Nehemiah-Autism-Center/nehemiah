import { loc, type Localized } from '@/shared/i18n/localized';

export interface Testimonial {
  id: string;
  /** Wording preserved exactly as supplied. */
  quote: Localized<string>;
  /** Attribution preserved exactly as supplied. */
  attribution: Localized<string>;
  /**
   * `pending`: supplied by the organisation's social media manager but not yet confirmed as
   * approved for publication. Pending items can be withheld from a release without code changes
   * by building with NEXT_PUBLIC_HIDE_PENDING_TESTIMONIALS=true (see getVisibleTestimonials).
   */
  approval: 'pending' | 'approved';
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'volunteer-1',
    quote: loc(
      '“Before coming here, I honestly didn’t know much about autism. But after spending time with the children, I realized how much they have to teach us. Volunteering here has changed the way I see people.”',
    ),
    attribution: loc('A Nehemiah Volunteer'),
    approval: 'pending',
  },
  {
    id: 'parent-1',
    quote: loc(
      '“The first time I saw my child make progress, I became emotional. It may seem like a small step to others, but for us, it meant everything. Nehemiah gave us hope when we really needed it.”',
    ),
    attribution: loc('A Grateful Parent'),
    approval: 'pending',
  },
  {
    id: 'volunteer-2',
    quote: loc(
      '“I came here thinking I was going to help the children, but in many ways, they changed me more than I changed them. Every smile, every small achievement, and every moment of connection stays with me.”',
    ),
    attribution: loc('Volunteer'),
    approval: 'pending',
  },
  {
    id: 'parent-2',
    quote: loc(
      '“There were times when I felt alone and worried about my child’s future. Here, I met people who understand what we are going through. For the first time, I felt that we were not alone.”',
    ),
    attribution: loc('Parent of a Child at the Center'),
    approval: 'pending',
  },
  {
    id: 'former-volunteer',
    quote: loc(
      '“Volunteering at Nehemiah is more than giving your time. You build relationships, you learn patience, and you begin to understand that even a small act of kindness can mean so much to someone.”',
    ),
    attribution: loc('Former Volunteer'),
    approval: 'pending',
  },
  {
    id: 'parent-3',
    quote: loc(
      '“Seeing my child grow in confidence and learn new things gives me hope for the future. I am grateful for every teacher, therapist, volunteer, and person who has been part of our journey.”',
    ),
    attribution: loc('A Grateful Parent'),
    approval: 'pending',
  },
];

/** Section heading. English only (no approved Amharic yet). */
export const TESTIMONIALS_HEADING = loc('Testimonials');

/** True when pending testimonials must not be published (set at build time). */
export const HIDE_PENDING_TESTIMONIALS =
  process.env.NEXT_PUBLIC_HIDE_PENDING_TESTIMONIALS === 'true';

export function getVisibleTestimonials(
  items: readonly Testimonial[] = TESTIMONIALS,
  hidePending: boolean = HIDE_PENDING_TESTIMONIALS,
): Testimonial[] {
  return items.filter((item) => item.approval === 'approved' || !hidePending);
}
