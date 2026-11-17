import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { DonatePage } from '@/features/donation';
import { DONATION_MESSAGE } from '@/features/donation/data';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.donate,
    title: ui['nav.donate'],
    description: DONATION_MESSAGE.body,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <DonatePage locale={await resolveLocale(params)} />;
}
