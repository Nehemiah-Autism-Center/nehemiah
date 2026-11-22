import Image from 'next/image';
import { ArrowRight, CalendarDays } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { eventPath } from '@/shared/i18n/routing';
import { LocalizedLink } from '@/shared/components/common/ButtonLink';
import { cn } from '@/shared/lib/utils';
import { EVENT_STATUS, type SiteEvent } from '@/features/events/data';

/**
 * Event card: photograph with a green status flag, serif title, short text, "Read more".
 * `horizontal` lays the photo beside the text from tablet width, for a lone card in a wide section.
 */
export function EventCard({
  event,
  locale,
  horizontal = false,
}: {
  event: SiteEvent;
  locale: Locale;
  horizontal?: boolean;
}) {
  const href = eventPath(event.slug);
  return (
    <article
      className={cn(
        'flex h-full min-w-0 flex-col overflow-hidden rounded-[5px] border bg-white shadow-sm',
        horizontal && 'md:flex-row',
      )}
    >
      <div
        className={cn(
          'relative aspect-[3/2] w-full',
          horizontal && 'md:aspect-auto md:min-h-72 md:w-5/12 md:shrink-0',
        )}
      >
        <Image
          src={event.image.src}
          alt={text(event.image.alt, locale)}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {event.dateStatus === 'to-be-confirmed' && (
          <p className="bg-primary text-primary-foreground absolute top-4 left-0 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-wider uppercase">
            <CalendarDays aria-hidden="true" className="size-4" />
            <LocalizedText value={EVENT_STATUS.dateToBeConfirmed} locale={locale} />
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="text-heading font-serif text-[22px] leading-tight font-semibold">
          <LocalizedLink href={href} locale={locale} className="hover:text-green-ink">
            <LocalizedText value={event.title} locale={locale} />
          </LocalizedLink>
        </h3>
        <LocalizedText as="p" value={event.description} locale={locale} className="mt-4 flex-1" />
        <LocalizedLink
          href={href}
          locale={locale}
          className="text-green-ink mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-wider uppercase underline-offset-4 hover:underline"
        >
          <UiText k="common.readMore" locale={locale} />
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
          <span className="sr-only">: {text(event.title, locale)}</span>
        </LocalizedLink>
      </div>
    </article>
  );
}
