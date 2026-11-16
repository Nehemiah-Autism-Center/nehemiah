import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/params';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { BlogPage } from '@/features/blog';
import { BLOG_POSTS } from '@/features/blog/data';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMetadata({
    locale,
    path: ROUTES.blog,
    title: ui['nav.blog'],
    description: BLOG_POSTS[0].summary,
  });
}

export default async function Page({ params }: { params: LocaleParams }) {
  return <BlogPage locale={await resolveLocale(params)} />;
}
