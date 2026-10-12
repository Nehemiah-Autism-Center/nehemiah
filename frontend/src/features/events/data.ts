import type { Event } from './types';

export const eventsHeading = 'What’s Up Next';

export const eventsSubtitle =
  'Stay tuned with Nehemiah: scroll into our upcoming events and make an impact.';

export const events: Event[] = [
  {
    slug: 'world-autism-awareness-day',
    title: 'World Autism Awareness Day Community Gathering & Art Exhibition',
    description:
      'Join us at Nehemiah Autism Center for a day dedicated to autism awareness, child art displays, parent story-sharing, and interactive community workshops. Together, we build a world where every autistic child is safe, strong, and valued.',
    content:
      'Join us at Nehemiah Autism Center for a day dedicated to autism awareness, child art displays, parent story-sharing, and interactive community workshops. Together, we build a world where every autistic child is safe, strong, and valued.\n\nThe gathering happens once every year on April 4–5, from 8:00 AM to 1:00 PM, at a specific venue selected for the occasion.',
    image: '/images/nehemiah/event-awareness-day.jpg',
    date: 'April 4–5, every year',
    time: '8:00 AM – 1:00 PM',
    location: 'A specific, selected venue',
    organizer: 'Nehemiah Autism Center',
  },
];
