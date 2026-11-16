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

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-footer-bg text-footer-text">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr]">
          {/* Brand */}
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
                className="size-16 rounded-md bg-white object-contain p-1"
              />
              <LocalizedText
                as="span"
                value={ORGANIZATION.name}
                locale={locale}
                className="font-serif text-xl font-semibold text-white"
              />
            </LocalizedLink>
            <LocalizedText
              as="p"
              value={ORGANIZATION.footerSentence}
              locale={locale}
              className="mt-4 text-base leading-relaxed"
            />
            <LocalizedText
              as="p"
              value={ORGANIZATION.tagline}
              locale={locale}
              className="mt-4 font-serif text-lg font-semibold text-white"
            />
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={`${t(group.title, locale)}`} className="min-w-0">
              <UiText
                as="h2"
                k={group.title}
                locale={locale}
                className="mb-3 font-serif text-lg font-semibold text-white"
              />
              <ul>
                {group.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <LocalizedLink
                      href={link.href}
                      locale={locale}
                      className="flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline"
                    >
                      <UiText k={link.label} locale={locale} />
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact details */}
          <div className="min-w-0">
            <UiText
              as="h2"
              k="common.contactDetails"
              locale={locale}
              className="mb-3 font-serif text-lg font-semibold text-white"
            />
            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="text-footer-accent mt-1 size-5 shrink-0" />
                <span>
                  <span className="sr-only">{t('contact.address', locale)}: </span>
                  <AddressText locale={locale} />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" className="text-footer-accent mt-1 size-5 shrink-0" />
                <EmailLink />
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="text-footer-accent mt-1 size-5 shrink-0" />
                <PhoneLinks className="space-y-1" />
              </li>
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="text-footer-accent mt-1 size-5 shrink-0" />
                <HoursList locale={locale} />
              </li>
            </ul>
            <UiText
              as="p"
              k="common.followUs"
              locale={locale}
              className="mt-5 text-sm font-semibold tracking-wider text-white uppercase"
            />
            <SocialLinks locale={locale} tone="onDark" className="-ml-3" />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="py-5 text-center text-sm">
          <p>
            &copy; {year} <LocalizedText as="span" value={ORGANIZATION.name} locale={locale} />
          </p>
        </Container>
      </div>
    </footer>
  );
}
