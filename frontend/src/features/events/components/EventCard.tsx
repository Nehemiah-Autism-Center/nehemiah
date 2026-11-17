import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { eventPath } from '@/shared/i18n/routing';
import { LocalizedLink } from '@/shared/components/common/ButtonLink';
import { EVENT_STATUS, type SiteEvent } from '@/features/events/data';

export function EventCard({ event, locale }: { event: SiteEvent; locale: Locale }) {
  const href = eventPath(event.slug);
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={event.image.src}
          alt={text(event.image.alt, locale)}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {event.dateStatus === 'to-be-confirmed' && (
          <p className="bg-secondary text-secondary-foreground mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold">
            <CalendarDays aria-hidden="true" className="size-4" />
            <LocalizedText value={EVENT_STATUS.dateToBeConfirmed} locale={locale} />
          </p>
        )}
        <h3 className="text-heading font-serif text-xl font-semibold">
          <LocalizedLink href={href} locale={locale} className="hover:text-primary">
            <LocalizedText value={event.title} locale={locale} />
          </LocalizedLink>
        </h3>
        <LocalizedText as="p" value={event.description} locale={locale} className="mt-3 flex-1" />
        <LocalizedLink
          href={href}
          locale={locale}
          className="text-primary mt-5 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
        >
          <UiText k="common.readMore" locale={locale} />
          <span className="sr-only">: {text(event.title, locale)}</span>
        </LocalizedLink>
      </div>
    </article>
  );
}
