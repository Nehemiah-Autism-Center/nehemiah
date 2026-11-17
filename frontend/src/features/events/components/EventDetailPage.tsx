import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { PAGE_BANNERS } from '@/shared/content/media';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { EVENT_LABELS, EVENT_STATUS, type SiteEvent } from '@/features/events/data';

function Detail({
  label,
  locale,
  children,
}: {
  label: (typeof EVENT_LABELS)[keyof typeof EVENT_LABELS];
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 border-b pb-4 last:border-b-0 last:pb-0">
      <LocalizedText
        as="dt"
        value={label}
        locale={locale}
        className="text-green-ink text-sm font-semibold tracking-wider uppercase"
      />
      <dd className="text-heading mt-1 space-y-1 text-lg">{children}</dd>
    </div>
  );
}

/**
 * Event detail. While the date is unconfirmed the page says so plainly and shows no calendar date
 * or countdown: the English and Amharic sources disagree and were not reconciled (see register EV-01).
 */
export function EventDetailPage({ event, locale }: { event: SiteEvent; locale: Locale }) {
  const unconfirmed = event.dateStatus === 'to-be-confirmed';
  return (
    <>
      <PageBanner
        locale={locale}
        title={event.title}
        trail={[{ label: ui['nav.events'], href: ROUTES.events }, { label: event.title }]}
        image={PAGE_BANNERS.events}
      />
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div className="min-w-0">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={event.image.src}
                alt={text(event.image.alt, locale)}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <LocalizedText
              as="p"
              value={event.description}
              locale={locale}
              className="mt-8 max-w-prose text-lg"
            />
          </div>

          <aside
            aria-labelledby="event-details-heading"
            className="min-w-0 rounded-[5px] border bg-white p-6 shadow-sm"
          >
            <LocalizedText
              as="h2"
              id="event-details-heading"
              value={EVENT_LABELS.details}
              locale={locale}
              className="text-heading mb-5 font-serif text-2xl"
            />
            {unconfirmed && (
              <p className="bg-primary text-primary-foreground mb-5 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-wider uppercase">
                <CalendarDays aria-hidden="true" className="size-4" />
                <LocalizedText value={EVENT_STATUS.dateToBeConfirmed} locale={locale} />
              </p>
            )}
            <dl className="space-y-4">
              <Detail label={EVENT_LABELS.when} locale={locale}>
                <LocalizedText as="p" value={event.frequency} locale={locale} />
                {unconfirmed && (
                  <LocalizedText
                    as="p"
                    value={EVENT_STATUS.dateNote}
                    locale={locale}
                    className="text-foreground text-base"
                  />
                )}
              </Detail>
              <Detail label={EVENT_LABELS.time} locale={locale}>
                <LocalizedText as="p" value={event.time} locale={locale} />
                {unconfirmed && (
                  <LocalizedText
                    as="p"
                    value={EVENT_STATUS.timeNote}
                    locale={locale}
                    className="text-foreground text-base"
                  />
                )}
              </Detail>
              <Detail label={EVENT_LABELS.place} locale={locale}>
                <LocalizedText as="p" value={event.venue} locale={locale} />
                <LocalizedText
                  as="p"
                  value={EVENT_STATUS.venueNote}
                  locale={locale}
                  className="text-foreground text-base"
                />
              </Detail>
            </dl>
            <ButtonLink href={ROUTES.contact} locale={locale} className="mt-6 w-full">
              <UiText k="footer.contactUs" locale={locale} />
            </ButtonLink>
          </aside>
        </div>
      </Section>
    </>
  );
}
