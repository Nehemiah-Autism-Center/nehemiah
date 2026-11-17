import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { LocalizedParagraphs, LocalizedText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { PAGE_BANNERS } from '@/shared/content/media';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { LocalizedLink } from '@/shared/components/common/ButtonLink';
import { BLOG_COPY, type BlogPost } from '@/features/blog/data';
import { CoverPlaceholder } from './BlogCard';

export function BlogPostPage({ post, locale }: { post: BlogPost; locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={post.title}
        trail={[{ label: ui['nav.blog'], href: ROUTES.blog }, { label: post.title }]}
        image={PAGE_BANNERS.blog}
      />
      <Section>
        <article className="mx-auto max-w-3xl">
          <CoverPlaceholder className="mb-8 aspect-[16/9] w-full rounded-[5px]" />
          <p className="text-text-medium mb-6 text-base">
            {post.publishedOn ? (
              <time dateTime={post.publishedOn}>{post.publishedOn}</time>
            ) : (
              <LocalizedText value={BLOG_COPY.notDated} locale={locale} />
            )}
          </p>
          <div className="space-y-5 text-lg leading-relaxed">
            <LocalizedParagraphs value={post.body} locale={locale} />
          </div>
          <LocalizedLink
            href={ROUTES.blog}
            locale={locale}
            className="text-green-ink mt-10 inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="size-5" />
            <LocalizedText value={BLOG_COPY.backToBlog} locale={locale} />
          </LocalizedLink>
        </article>
      </Section>
    </>
  );
}
