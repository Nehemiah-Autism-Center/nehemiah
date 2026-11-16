import { CalendarDays, HandHeart, Mail, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { ui, type UiKey } from '@/shared/i18n/ui';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { EmailLink, PhoneLinks } from '@/shared/components/common/ContactDetails';
import { DONATION_MESSAGE } from '@/features/donation/data';

interface Way {
  icon: LucideIcon;
  title: UiKey;
  href: string;
}

// The three alternatives named in the approved donations message.
const WAYS: readonly Way[] = [
  { icon: HandHeart, title: 'nav.volunteer', href: ROUTES.volunteer },
  { icon: CalendarDays, title: 'nav.events', href: ROUTES.events },
  { icon: Mail, title: 'footer.contactUs', href: ROUTES.contact },
];

/**
 * There is no payment integration, so this page does not ask for amounts or personal details and
 * never implies a donation was made. It says online donations are not available yet and points to
 * ways of supporting the Center that work today.
 */
export function DonatePage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner locale={locale} title={ui['nav.donate']} trail={[{ label: ui['nav.donate'] }]} />

      <Section labelledBy="donate-heading">
        <div className="mx-auto max-w-3xl text-center">
          <LocalizedText
            as="h2"
            id="donate-heading"
            value={DONATION_MESSAGE.heading}
            locale={locale}
            className="text-heading font-serif text-3xl md:text-4xl"
          />
          <LocalizedText
            as="p"
            value={DONATION_MESSAGE.body}
            locale={locale}
            className="mt-4 text-lg"
          />
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
          {WAYS.map(({ icon: Icon, title, href }) => (
            <li key={title} className="flex">
              <div className="flex w-full flex-col items-center rounded-xl border bg-white p-6 text-center shadow-sm">
                <div className="bg-primary/10 text-primary mb-4 flex size-14 items-center justify-center rounded-full">
                  <Icon aria-hidden="true" className="size-7" />
                </div>
                <ButtonLink href={href} locale={locale} variant="secondary" className="w-full">
                  <UiText k={title} locale={locale} />
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-3xl text-center text-lg">
          <EmailLink />
          <PhoneLinks className="mt-1 flex flex-wrap justify-center gap-x-6" />
        </div>
      </Section>
    </>
  );
}
