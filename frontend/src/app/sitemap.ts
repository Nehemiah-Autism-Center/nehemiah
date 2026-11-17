import type { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/shared/i18n/config';
import { ROUTE_PATHS, blogPostPath, eventPath, localizePath } from '@/shared/i18n/routing';
import { BLOG_POSTS } from '@/features/blog/data';
import { EVENTS } from '@/features/events/data';

/**
 * Every public page in every language, with hreflang alternates. `lastModified` is left out on
 * purpose: no publication or update dates have been confirmed, and none is invented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...ROUTE_PATHS,
    ...BLOG_POSTS.map((post) => blogPostPath(post.slug)),
    ...EVENTS.map((event) => eventPath(event.slug)),
  ];
  const absolute = (path: string, locale: (typeof LOCALES)[number]) =>
    `${SITE_URL}${localizePath(path, locale)}`;

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absolute(path, locale),
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, absolute(path, l)])),
      },
    })),
  );
}
