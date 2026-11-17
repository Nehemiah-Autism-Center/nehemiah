import { loc, type Localized } from '@/shared/i18n/localized';
import { MEDIA, type MediaAsset } from '@/shared/content/media';

export interface SiteEvent {
  slug: string;
  title: Localized<string>;
  description: Localized<string>;
  /** How often it takes place (the part of the source schedule that is consistent in both languages). */
  frequency: Localized<string>;
  /** Planned time of day. English 8:00 AM–1:00 PM and Amharic 2፡00–7፡00 (Ethiopian clock) agree. */
  time: Localized<string>;
  venue: Localized<string>;
  /**
   * `to-be-confirmed`: the event is shown as an annual event WITHOUT a calendar date. The English
   * source says "April 4-5" and the Amharic source says "ሚያዝያ 4" (an Ethiopian-calendar month); the two
   * were deliberately not reconciled — see NAC-CONTENT-APPROVAL-REGISTER.md (EV-01).
   */
  dateStatus: 'to-be-confirmed' | 'confirmed';
  image: MediaAsset;
}

export const EVENTS: readonly SiteEvent[] = [
  {
    slug: 'world-autism-awareness-day',
    title: loc(
      'World Autism Awareness Day Community Gathering & Art Exhibition',
      'የዓለም የኦቲዝም ግንዛቤ ቀን፡ የማህበረሰብ ስብሰባ እና የሥዕል ኤግዚቢሽን',
    ),
    description: loc(
      'Join us at Nehemiah Autism Center for a day dedicated to autism awareness, child art displays, parent story-sharing, and interactive community workshops. Together, we build a world where every autistic child is safe, strong, and valued.',
      'በኦቲዝም ግንዛቤ ላይ ያተኮረ፣ የልጆች የሥዕል ሥራዎች ማሳያ፣ የወላጆች የተሞክሮ ልውውጥ እና ተሳታፊ የማህበረሰብ ወርክሾፖችን ያካተተ ልዩ ቀን ለማክበር በነህምያ ኦቲዝም ማዕከል ይቀላቀሉን። በአንድነት እያንዳንዱ ኦቲዝም ያለበት ልጅ ደህንነቱ የተጠበቀ፣ ጠንካራ እና ዋጋ የሚሰጠው እንዲሆን የሚያስችል ማህበረሰብ እንገነባለን።',
    ),
    frequency: loc('Once every year', 'በየዓመቱ'),
    time: loc('8:00 AM – 1:00 PM', 'ከጠዋቱ 2፡00 እስከ ቀኑ 7፡00'),
    venue: loc('A specific and selected place', 'በተመረጠ እና በተወሰነ ቦታ'),
    dateStatus: 'to-be-confirmed',
    image: MEDIA.event,
  },
];

export function getEvent(slug: string): SiteEvent | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

/** Labels for the detail rows. Amharic labels are the document's own ("የሚከናወንበት ጊዜ", "ሰዓት", "ቦታ"). */
export const EVENT_LABELS = {
  details: loc('Event details'),
  when: loc('When', 'የሚከናወንበት ጊዜ'),
  time: loc('Time', 'ሰዓት'),
  place: loc('Place', 'ቦታ'),
} as const;

/** Honest status text; English only until an approved Amharic version exists. */
export const EVENT_STATUS = {
  dateToBeConfirmed: loc('Date to be confirmed'),
  dateNote: loc(
    'The exact date has not been confirmed yet. Please check back soon or contact the Center.',
  ),
  venueNote: loc('The venue will be announced.'),
  timeNote: loc('Planned time — to be confirmed together with the date.'),
} as const;

/** Homepage section heading and sentence ("What’s up next" in the document; English only). */
export const UPCOMING_EVENTS_HEADING = loc('What’s up next');
// Source sentence kept as supplied except that "nehemiah" is capitalised (NAC-CONTENT-APPROVAL-REGISTER.md, CP-01).
export const UPCOMING_EVENTS_INTRO = loc(
  'Stay tuned with Nehemiah scroll into our upcoming events and make an impact',
);
