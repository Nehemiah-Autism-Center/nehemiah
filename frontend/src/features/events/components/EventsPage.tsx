import type { Locale } from '@/shared/i18n/config';
import { ui } from '@/shared/i18n/ui';
import { PAGE_BANNERS } from '@/shared/content/media';
import { cn } from '@/shared/lib/utils';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { EVENTS, UPCOMING_EVENTS_HEADING, UPCOMING_EVENTS_INTRO } from '@/features/events/data';
import { EventCard } from './EventCard';

export function EventsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['nav.events']}
        trail={[{ label: ui['nav.events'] }]}
        image={PAGE_BANNERS.events}
      />
      <Section labelledBy="events-page-heading">
        <SectionHeading
          locale={locale}
          id="events-page-heading"
          title={UPCOMING_EVENTS_HEADING}
          subtitle={UPCOMING_EVENTS_INTRO}
        />
        <ul className={cn('grid gap-8', EVENTS.length > 1 && 'md:grid-cols-2 lg:grid-cols-3')}>
          {EVENTS.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} locale={locale} horizontal={EVENTS.length === 1} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
