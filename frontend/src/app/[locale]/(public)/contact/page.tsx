import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { ContactPage } from '@/features/contact';
import { LOCATION } from '@/features/contact/data';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.contact,
    title: ui['nav.contact'],
    description: LOCATION.body,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <ContactPage locale={await resolveLocale(params)} />;
}
