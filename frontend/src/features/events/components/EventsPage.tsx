import type { Locale } from '@/shared/i18n/config';
import { ui } from '@/shared/i18n/ui';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { EVENTS, UPCOMING_EVENTS_HEADING, UPCOMING_EVENTS_INTRO } from '@/features/events/data';
import { EventCard } from './EventCard';

export function EventsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner locale={locale} title={ui['nav.events']} trail={[{ label: ui['nav.events'] }]} />
      <Section labelledBy="events-page-heading">
        <SectionHeading
          locale={locale}
          id="events-page-heading"
          title={UPCOMING_EVENTS_HEADING}
          subtitle={UPCOMING_EVENTS_INTRO}
        />
        <ul className="grid max-w-3xl gap-6">
          {EVENTS.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} locale={locale} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
