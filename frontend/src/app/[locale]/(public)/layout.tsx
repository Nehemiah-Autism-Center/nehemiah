import { notFound } from 'next/navigation';
import { isLocale } from '@/shared/i18n/config';
import { t } from '@/shared/i18n/ui';
import { SiteHeader } from '@/shared/components/layout/SiteHeader';
import { SiteFooter } from '@/shared/components/layout/SiteFooter';
import BackToTop from '@/shared/components/common/BackToTop';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <a
        href="#main-content"
        className="focus:text-green-ink sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:shadow-lg"
      >
        {t('common.skipToContent', locale)}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter locale={locale} />
      <BackToTop />
    </>
  );
}
