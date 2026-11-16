import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { ServicesPage } from '@/features/services';
import { SERVICES_SUMMARY } from '@/features/services/data';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.services,
    title: ui['nav.services'],
    description: SERVICES_SUMMARY,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <ServicesPage locale={await resolveLocale(params)} />;
}
