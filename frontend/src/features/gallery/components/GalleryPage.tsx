import type { Locale } from '@/shared/i18n/config';
import { ui } from '@/shared/i18n/ui';
import { PAGE_BANNERS } from '@/shared/content/media';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { GalleryBrowser } from './GalleryBrowser';

export function GalleryPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['nav.gallery']}
        trail={[{ label: ui['nav.gallery'] }]}
        image={PAGE_BANNERS.gallery}
      />
      <Section>
        <GalleryBrowser />
      </Section>
    </>
  );
}
