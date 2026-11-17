import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { AboutPage } from '@/features/about';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.about,
    title: ui['nav.about'],
    description: ORGANIZATION.footerSentence,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <AboutPage locale={await resolveLocale(params)} />;
}
