import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { ui } from '@/shared/i18n/ui';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { BLOG_COPY, BLOG_POSTS } from '@/features/blog/data';
import { BlogCard } from './BlogCard';

export function BlogPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner locale={locale} title={ui['nav.blog']} trail={[{ label: ui['nav.blog'] }]} />
      <Section>
        {BLOG_POSTS.length === 0 ? (
          <LocalizedText
            as="p"
            value={BLOG_COPY.empty}
            locale={locale}
            className="text-center text-lg"
          />
        ) : (
          <ul className="grid max-w-3xl gap-6">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} locale={locale} headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
