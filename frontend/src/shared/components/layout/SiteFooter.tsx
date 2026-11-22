import type { ReactNode } from 'react';
import Image from 'next/image';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { t } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { MEDIA } from '@/shared/content/media';
import { FOOTER_GROUPS } from '@/shared/content/navigation';
import { Container } from '@/shared/components/common/Container';
import { LocalizedLink } from '@/shared/components/common/ButtonLink';
import {
  AddressText,
  EmailLink,
  HoursList,
  PhoneLinks,
} from '@/shared/components/common/ContactDetails';
import { SocialLinks } from '@/shared/components/common/SocialLinks';

/** Footer column heading: serif, white, with the template's short green divider underneath. */
function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <>
      <h2 className="font-serif text-xl font-semibold text-white">{children}</h2>
      <div aria-hidden="true" className="bg-primary mt-3 mb-5 h-[3px] w-10" />
    </>
  );
}

/**
 * Near-black footer: brand and mission, the document's link groups, contact details and social
 * profiles, then a separate copyright bar. Green is used for icons, links and the dividers.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const [support, discover, connect] = FOOTER_GROUPS;

  const renderGroup = (group: (typeof FOOTER_GROUPS)[number]) => (
    <nav key={group.title} aria-label={t(group.title, locale)} className="min-w-0">
      <ColumnHeading>
        <UiText k={group.title} locale={locale} />
      </ColumnHeading>
      <ul>
        {group.links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <LocalizedLink
              href={link.href}
              locale={locale}
              className="hover:text-primary flex min-h-11 items-center underline-offset-4 transition-colors hover:underline"
            >
              <UiText k={link.label} locale={locale} />
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <footer className="on-dark bg-footer-bg text-footer-text">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.3fr]">
          {/* Column 1: brand and mission */}
          <div className="min-w-0">
            <LocalizedLink
              href={ROUTES.home}
              locale={locale}
              className="inline-flex items-center gap-3"
            >
              <Image
                src={MEDIA.logo.src}
                alt=""
                width={64}
                height={64}
                className="size-16 rounded-[3px] bg-white object-contain p-1"
              />
              <LocalizedText
                as="span"
                value={ORGANIZATION.name}
                locale={locale}
                className="font-serif text-xl leading-tight font-semibold text-white"
              />
            </LocalizedLink>
            <LocalizedText
              as="p"
              value={ORGANIZATION.footerSentence}
              locale={locale}
              className="mt-5 text-[15px] leading-relaxed"
            />
            <LocalizedText
              as="p"
              value={ORGANIZATION.tagline}
              locale={locale}
              className="mt-5 font-serif text-lg font-semibold text-white"
            />
            <UiText
              as="p"
              k="common.followUs"
              locale={locale}
              className="mt-6 mb-2 text-sm font-semibold tracking-wider text-white uppercase"
            />
            <SocialLinks locale={locale} tone="onDark" />
          </div>

          {/* Column 2: Discover */}
          <div className="min-w-0">{renderGroup(discover)}</div>

          {/* Column 3: Support, then Connect */}
          <div className="min-w-0 space-y-8">
            {renderGroup(support)}
            {renderGroup(connect)}
          </div>

          {/* Column 4: contact details */}
          <div className="min-w-0">
            <ColumnHeading>
              <UiText k="common.contactDetails" locale={locale} />
            </ColumnHeading>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="text-primary mt-1 size-5 shrink-0" />
                <span>
                  <span className="sr-only">{t('contact.address', locale)}: </span>
                  <AddressText locale={locale} />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" className="text-primary mt-3 size-5 shrink-0" />
                <EmailLink />
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="text-primary mt-3 size-5 shrink-0" />
                <PhoneLinks />
              </li>
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="text-primary mt-1 size-5 shrink-0" />
                <HoursList locale={locale} />
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Separate copyright bar */}
      <div className="bg-black/30">
        <Container className="py-5 text-center text-sm">
          <p>
            &copy; {year} <LocalizedText as="span" value={ORGANIZATION.name} locale={locale} />
          </p>
        </Container>
      </div>
    </footer>
  );
}
