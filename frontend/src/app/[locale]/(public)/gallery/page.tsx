import type { Metadata } from 'next';
import { loc } from '@/shared/i18n/localized';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { GalleryPage } from '@/features/gallery';

// No approved description exists for the gallery; this English line is team-written (register: CP-02).
const DESCRIPTION = loc(
  'Photographs of the children, families, volunteers and community of Nehemiah Autism Center.',
);

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.gallery,
    title: ui['nav.gallery'],
    description: DESCRIPTION,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <GalleryPage locale={await resolveLocale(params)} />;
}
