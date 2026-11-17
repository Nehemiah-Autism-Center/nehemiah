import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { ui } from '@/shared/i18n/ui';
import { PAGE_BANNERS } from '@/shared/content/media';
import { cn } from '@/shared/lib/utils';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import { BLOG_COPY, BLOG_POSTS } from '@/features/blog/data';
import { BlogCard } from './BlogCard';

export function BlogPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['nav.blog']}
        trail={[{ label: ui['nav.blog'] }]}
        image={PAGE_BANNERS.blog}
      />
      <Section>
        {BLOG_POSTS.length === 0 ? (
          <LocalizedText
            as="p"
            value={BLOG_COPY.empty}
            locale={locale}
            className="text-center text-lg"
          />
        ) : (
          <ul
            className={cn('grid gap-8', BLOG_POSTS.length > 1 && 'md:grid-cols-2 lg:grid-cols-3')}
          >
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <BlogCard
                  post={post}
                  locale={locale}
                  headingLevel="h2"
                  horizontal={BLOG_POSTS.length === 1}
                />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
