import Image from 'next/image';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { blogPostPath } from '@/shared/i18n/routing';
import { MEDIA } from '@/shared/content/media';
import { LocalizedLink } from '@/shared/components/common/ButtonLink';
import { BLOG_COPY, type BlogPost } from '@/features/blog/data';

/** Brand-colour stand-in used until the organisation supplies the post's cover photograph. */
export function CoverPlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-secondary-bg flex items-center justify-center ${className ?? ''}`}
    >
      <Image
        src={MEDIA.logo.src}
        alt=""
        width={120}
        height={120}
        className="size-24 object-contain opacity-90"
      />
    </div>
  );
}

export function BlogCard({
  post,
  locale,
  headingLevel: Heading = 'h3',
}: {
  post: BlogPost;
  locale: Locale;
  /** h2 on the blog page (directly under the page title), h3 where a section heading comes first. */
  headingLevel?: 'h2' | 'h3';
}) {
  const href = blogPostPath(post.slug);
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      <CoverPlaceholder className="aspect-[3/2] w-full" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-text-medium mb-3 text-sm">
          {post.publishedOn ? (
            <time dateTime={post.publishedOn}>{post.publishedOn}</time>
          ) : (
            <LocalizedText value={BLOG_COPY.notDated} locale={locale} />
          )}
        </p>
        <Heading className="text-heading font-serif text-xl font-semibold">
          <LocalizedLink href={href} locale={locale} className="hover:text-primary">
            <LocalizedText value={post.title} locale={locale} />
          </LocalizedLink>
        </Heading>
        <LocalizedText as="p" value={post.summary} locale={locale} className="mt-3 flex-1" />
        <LocalizedLink
          href={href}
          locale={locale}
          className="text-primary mt-5 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
        >
          <UiText k="common.readMore" locale={locale} />
          <span className="sr-only">: {text(post.title, locale)}</span>
        </LocalizedLink>
      </div>
    </article>
  );
}
