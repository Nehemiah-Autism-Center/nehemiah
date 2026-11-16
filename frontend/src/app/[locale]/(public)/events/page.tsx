import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { EventsPage } from '@/features/events';
import { EVENTS } from '@/features/events/data';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.events,
    title: ui['nav.events'],
    description: EVENTS[0].description,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <EventsPage locale={await resolveLocale(params)} />;
}
