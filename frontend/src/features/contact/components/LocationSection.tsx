import { Clock, ExternalLink, MapPin } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { t } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { AddressText, HoursList } from '@/shared/components/common/ContactDetails';
import { LOCATION } from '@/features/contact/data';

interface LocationSectionProps {
  locale: Locale;
  /** Anchor id: "location" on the contact page (footer "Visit the Center"), "visit" on the homepage. */
  id: string;
  tone?: 'default' | 'muted';
  /** Show the address and opening hours next to the map (omit where they are listed nearby already). */
  showDetails?: boolean;
}

export function LocationSection({
  locale,
  id,
  tone = 'default',
  showDetails = true,
}: LocationSectionProps) {
  const headingId = `${id}-heading`;
  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHeading
            locale={locale}
            id={headingId}
            title={LOCATION.heading}
            className="mb-6"
          />
          <LocalizedText
            as="p"
            value={LOCATION.body}
            locale={locale}
            className="max-w-prose text-lg"
          />

          {showDetails && (
            <ul className="mt-6 space-y-4 text-base">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="text-green-display mt-1 size-5 shrink-0" />
                <span>
                  <span className="sr-only">{t('contact.address', locale)}: </span>
                  <AddressText locale={locale} />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="text-green-display mt-1 size-5 shrink-0" />
                <div>
                  <p className="sr-only">{t('contact.hours', locale)}</p>
                  <HoursList locale={locale} />
                </div>
              </li>
            </ul>
          )}

          <ButtonLink
            href={ORGANIZATION.mapsUrl}
            locale={locale}
            variant="secondary"
            className="mt-6"
          >
            <ExternalLink aria-hidden="true" className="size-5" />
            <UiText k="common.openInMaps" locale={locale} />
            <span className="sr-only">{t('common.opensInNewTab', locale)}</span>
          </ButtonLink>
        </div>

        <div className="overflow-hidden rounded-[5px] border bg-white shadow-sm">
          <iframe
            title={text(ORGANIZATION.mapTitle, locale)}
            src={ORGANIZATION.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="aspect-[4/3] w-full border-0 lg:aspect-square"
          />
        </div>
      </div>
    </Section>
  );
}
