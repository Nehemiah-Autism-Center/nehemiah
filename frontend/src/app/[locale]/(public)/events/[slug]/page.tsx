import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale } from '@/shared/i18n/params';
import { eventPath } from '@/shared/i18n/routing';
import { EventDetailPage } from '@/features/events';
import { EVENTS, getEvent } from '@/features/events/data';

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return buildMetadata({
    locale,
    path: eventPath(event.slug),
    title: event.title,
    description: event.description,
    image: event.image.src,
  });
}

export default async function Page({ params }: { params: Params }) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  return <EventDetailPage event={event} locale={locale} />;
}
