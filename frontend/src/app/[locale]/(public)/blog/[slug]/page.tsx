import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/shared/i18n/metadata';
import { resolveLocale } from '@/shared/i18n/params';
import { blogPostPath } from '@/shared/i18n/routing';
import { BlogPostPage } from '@/features/blog';
import { BLOG_POSTS, getBlogPost } from '@/features/blog/data';

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: blogPostPath(post.slug),
    title: post.title,
    description: post.summary,
  });
}

export default async function Page({ params }: { params: Params }) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostPage post={post} locale={locale} />;
}
