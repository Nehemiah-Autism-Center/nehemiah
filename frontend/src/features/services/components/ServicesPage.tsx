import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { ui } from '@/shared/i18n/ui';
import { PAGE_BANNERS } from '@/shared/content/media';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { ClosingCtaSection } from '@/features/home/components/ClosingCtaSection';
import { SERVICES_HEADING, SERVICES_SUMMARY } from '@/features/services/data';
import { ServiceCards } from './ServiceCards';

export function ServicesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['nav.services']}
        trail={[{ label: ui['nav.services'] }]}
        image={PAGE_BANNERS.services}
      />

      <Section labelledBy="services-page-heading">
        <SectionHeading locale={locale} id="services-page-heading" title={SERVICES_HEADING} />
        <ServiceCards locale={locale} />
        <LocalizedText
          as="p"
          value={SERVICES_SUMMARY}
          locale={locale}
          className="border-primary mt-10 max-w-3xl border-l-4 pl-5 text-lg"
        />
      </Section>

      <ClosingCtaSection locale={locale} />
    </>
  );
}
