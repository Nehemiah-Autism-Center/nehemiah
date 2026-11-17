import Image from 'next/image';
import type { Locale } from '@/shared/i18n/config';
import { resolve, text } from '@/shared/i18n/localized';
import { LocalizedParagraphs, LocalizedText } from '@/shared/i18n/LocalizedText';
import { ui } from '@/shared/i18n/ui';
import { MEDIA } from '@/shared/content/media';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { ServiceCards } from '@/features/services/components/ServiceCards';
import { ImpactStats } from '@/features/home/components/ImpactStats';
import { ClosingCtaSection } from '@/features/home/components/ClosingCtaSection';
import { ABOUT_HEADINGS, ABOUT_HISTORY, ABOUT_INTRO, ABOUT_MISSION } from '@/features/about/data';

export function AboutPage({ locale }: { locale: Locale }) {
  const mission = resolve(ABOUT_MISSION, locale);

  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['nav.about']}
        trail={[{ label: ui['nav.about'] }]}
        image={MEDIA.aboutBanner}
      />

      {/* Introduction */}
      <Section labelledBy="about-intro-heading">
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHeading
              locale={locale}
              id="about-intro-heading"
              title={ABOUT_HEADINGS.intro}
              className="mb-6"
            />
            <div className="max-w-prose space-y-5 text-lg">
              <LocalizedParagraphs value={ABOUT_INTRO} locale={locale} />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:sticky lg:top-6">
            <Image
              src={MEDIA.aboutSide.src}
              alt={text(MEDIA.aboutSide.alt, locale)}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section labelledBy="about-mission-heading" tone="muted">
        <SectionHeading locale={locale} id="about-mission-heading" title={ABOUT_HEADINGS.mission} />
        <ol className="grid gap-6 md:grid-cols-2">
          {mission.value.map((statement, index) => (
            <li key={index} className="flex min-w-0 gap-4 rounded-xl border bg-white p-6 shadow-sm">
              <span
                aria-hidden="true"
                className="bg-primary flex size-10 shrink-0 items-center justify-center rounded-full font-serif text-lg font-bold text-white"
              >
                {index + 1}
              </span>
              <p lang={mission.isFallback ? mission.lang : undefined} className="text-lg">
                {statement}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* History */}
      <Section labelledBy="about-history-heading">
        <SectionHeading locale={locale} id="about-history-heading" title={ABOUT_HEADINGS.history} />
        <LocalizedText
          as="p"
          value={ABOUT_HISTORY}
          locale={locale}
          className="border-secondary text-heading max-w-3xl border-l-4 pl-5 font-serif text-2xl leading-snug"
        />
      </Section>

      {/* Services overview */}
      <Section labelledBy="about-services-heading" tone="muted">
        <SectionHeading
          locale={locale}
          id="about-services-heading"
          title={ABOUT_HEADINGS.services}
        />
        <ServiceCards locale={locale} />
      </Section>

      {/* Impact */}
      <Section labelledBy="about-impact-heading" tone="brand">
        <SectionHeading
          locale={locale}
          id="about-impact-heading"
          title={ABOUT_HEADINGS.impact}
          tone="onDark"
          align="center"
          className="mx-auto"
        />
        <ImpactStats locale={locale} />
      </Section>

      <ClosingCtaSection locale={locale} />
    </>
  );
}
