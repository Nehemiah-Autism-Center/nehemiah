import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { FaqPage } from '@/features/faq';
import { FAQ_INTRO } from '@/features/faq/data';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({ locale, path: ROUTES.faq, title: ui['nav.faq'], description: FAQ_INTRO });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <FaqPage locale={await resolveLocale(params)} />;
}
