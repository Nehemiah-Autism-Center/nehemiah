import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import type { UiKey } from '@/shared/i18n/ui';
import { ui } from '@/shared/i18n/ui';
import { Section } from '@/shared/components/common/Section';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { SocialLinks } from '@/shared/components/common/SocialLinks';
import {
  AddressText,
  EmailLink,
  HoursList,
  PhoneLinks,
} from '@/shared/components/common/ContactDetails';
import { CONTACT_COPY } from '@/features/contact/data';
import { ContactFormWithTopic } from './ContactFormWithTopic';
import { LocationSection } from './LocationSection';

function InfoCard({
  icon: Icon,
  label,
  locale,
  children,
}: {
  icon: LucideIcon;
  label: UiKey;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <li className="flex min-w-0 gap-4 rounded-xl border bg-white p-5 shadow-sm">
      <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full">
        <Icon aria-hidden="true" className="size-6" />
      </div>
      <div className="min-w-0">
        <UiText
          as="h3"
          k={label}
          locale={locale}
          className="text-heading font-serif text-lg font-semibold"
        />
        <div className="mt-1 text-base">{children}</div>
      </div>
    </li>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['nav.contact']}
        trail={[{ label: ui['nav.contact'] }]}
      />

      <Section labelledBy="contact-details-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="min-w-0">
            <SectionHeading
              locale={locale}
              id="contact-details-heading"
              title={ui['common.contactDetails']}
              className="mb-6"
            />
            <LocalizedText
              as="p"
              value={CONTACT_COPY.intro}
              locale={locale}
              className="mb-6 text-lg"
            />
            <ul className="space-y-4">
              <InfoCard icon={Mail} label="contact.email" locale={locale}>
                <EmailLink />
              </InfoCard>
              <InfoCard icon={Phone} label="contact.phone" locale={locale}>
                <PhoneLinks className="space-y-1" />
              </InfoCard>
              <InfoCard icon={MapPin} label="contact.address" locale={locale}>
                <AddressText locale={locale} />
              </InfoCard>
              <InfoCard icon={Clock} label="contact.hours" locale={locale}>
                <HoursList locale={locale} />
              </InfoCard>
            </ul>

            <div id="social" className="mt-8 scroll-mt-6">
              <UiText
                as="h3"
                k="footer.social"
                locale={locale}
                className="text-heading font-serif text-lg font-semibold"
              />
              <SocialLinks locale={locale} tone="onLight" className="mt-1 -ml-3" />
            </div>
          </div>

          <div className="min-w-0 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
            <LocalizedText
              as="h2"
              value={CONTACT_COPY.formHeading}
              locale={locale}
              className="text-heading mb-5 font-serif text-2xl"
            />
            <ContactFormWithTopic />
          </div>
        </div>
      </Section>

      <LocationSection locale={locale} id="location" tone="muted" showDetails={false} />
    </>
  );
}
