import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ORGANIZATION } from '@/shared/content/organization';
import { HomePage } from '@/features/home';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.home,
    title: ORGANIZATION.name,
    description: ORGANIZATION.description,
    absoluteTitle: true,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <HomePage locale={await resolveLocale(params)} />;
}
