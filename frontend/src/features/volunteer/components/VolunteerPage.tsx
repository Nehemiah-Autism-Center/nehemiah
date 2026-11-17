import type { Locale } from '@/shared/i18n/config';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { MEDIA } from '@/shared/content/media';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { EmailLink, PhoneLinks } from '@/shared/components/common/ContactDetails';
import { VOLUNTEER_HOW_TO, VOLUNTEER_INTRO, VOLUNTEER_ROLES } from '@/features/volunteer/data';

export function VolunteerPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['cta.volunteerWithUs']}
        trail={[{ label: ui['nav.volunteer'] }]}
        image={MEDIA.volunteerBanner}
      />

      <Section labelledBy="volunteer-intro-heading">
        <div className="max-w-3xl">
          <SectionHeading
            locale={locale}
            id="volunteer-intro-heading"
            title={ui['nav.volunteer']}
            className="mb-6"
          />
          <LocalizedText as="p" value={VOLUNTEER_INTRO} locale={locale} className="text-lg" />
        </div>
      </Section>

      <Section labelledBy="volunteer-roles-heading" tone="muted">
        <SectionHeading
          locale={locale}
          id="volunteer-roles-heading"
          title={{ en: 'Volunteer roles', am: 'የበጎ ፈቃደኞች ሚናዎች', amProvisional: true }}
        />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VOLUNTEER_ROLES.map((role, index) => (
            <li key={role.id} className="flex">
              <article className="flex w-full min-w-0 flex-col rounded-xl border bg-white p-6 shadow-sm">
                <span
                  aria-hidden="true"
                  className="bg-primary mb-4 flex size-10 items-center justify-center rounded-full font-serif text-lg font-bold text-white"
                >
                  {index + 1}
                </span>
                <LocalizedText
                  as="h3"
                  value={role.title}
                  locale={locale}
                  className="text-heading font-serif text-xl font-semibold"
                />
                <LocalizedText as="p" value={role.description} locale={locale} className="mt-3" />
              </article>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="volunteer-how-heading">
        <div className="bg-primary on-dark mx-auto max-w-3xl rounded-2xl p-8 text-center text-white sm:p-10">
          <LocalizedText
            as="h2"
            id="volunteer-how-heading"
            value={VOLUNTEER_HOW_TO.heading}
            locale={locale}
            className="font-serif text-3xl text-white"
          />
          <LocalizedText
            as="p"
            value={VOLUNTEER_HOW_TO.body}
            locale={locale}
            className="mt-4 text-lg text-white/95"
          />
          <ButtonLink
            href={`${ROUTES.contact}?topic=volunteer`}
            locale={locale}
            variant="light"
            className="mt-6"
          >
            <UiText k="cta.volunteerWithUs" locale={locale} />
          </ButtonLink>
          <div className="mt-6 flex flex-col items-center gap-1 text-base">
            <EmailLink />
            <PhoneLinks className="flex flex-wrap justify-center gap-x-4" />
          </div>
        </div>
      </Section>
    </>
  );
}
