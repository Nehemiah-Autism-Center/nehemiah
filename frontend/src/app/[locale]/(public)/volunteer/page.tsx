import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { VolunteerPage } from '@/features/volunteer';
import { VOLUNTEER_INTRO } from '@/features/volunteer/data';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.volunteer,
    title: ui['cta.volunteerWithUs'],
    description: VOLUNTEER_INTRO,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <VolunteerPage locale={await resolveLocale(params)} />;
}
