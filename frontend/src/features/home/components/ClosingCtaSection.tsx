import type { Locale } from '@/shared/i18n/config';
import { UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { PAGE_BANNERS } from '@/shared/content/media';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { PhotoSection } from '@/shared/components/common/PhotoSection';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { CLOSING_CTA } from '@/features/home/data';

/**
 * "Help Us Reach More Children": dark photographic band with one primary action (green) and two
 * secondary ways to get involved (outlined white).
 */
export function ClosingCtaSection({ locale }: { locale: Locale }) {
  return (
    <PhotoSection labelledBy="closing-cta-heading" image={PAGE_BANNERS.closing}>
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          locale={locale}
          id="closing-cta-heading"
          title={CLOSING_CTA.heading}
          subtitle={CLOSING_CTA.body}
          tone="onDark"
          align="center"
          className="mb-8"
        />
        <ButtonLink href={ROUTES.donate} locale={locale}>
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
    </PhotoSection>
  );
}
