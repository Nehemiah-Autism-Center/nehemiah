import type { Locale } from '@/shared/i18n/config';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { Section } from '@/shared/components/common/Section';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { CLOSING_CTA } from '@/features/home/data';

/** "Help Us Reach More Children": one primary action, two secondary ways to get involved. */
export function ClosingCtaSection({ locale }: { locale: Locale }) {
  return (
    <Section labelledBy="closing-cta-heading" tone="brand">
      <div className="mx-auto max-w-3xl text-center">
        <LocalizedText
          as="h2"
          id="closing-cta-heading"
          value={CLOSING_CTA.heading}
          locale={locale}
          className="font-serif text-3xl text-white md:text-4xl"
        />
        <LocalizedText
          as="p"
          value={CLOSING_CTA.body}
          locale={locale}
          className="mt-4 text-lg text-white/95"
        />
        <ButtonLink href={ROUTES.donate} locale={locale} variant="light" className="mt-8">
          <UiText k="cta.supportMission" locale={locale} />
        </ButtonLink>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={ROUTES.volunteer} locale={locale} variant="outlineLight">
            <UiText k="cta.volunteerWithUs" locale={locale} />
          </ButtonLink>
          {/* No partnership page content was supplied: this opens the contact form with the subject filled in. */}
          <ButtonLink
            href={`${ROUTES.contact}?topic=partnership`}
            locale={locale}
            variant="outlineLight"
          >
            <UiText k="cta.partnerWithUs" locale={locale} />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
