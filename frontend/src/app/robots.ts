import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/i18n/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Placeholder scaffold pages without backend integration.
      disallow: ['/login', '/register', '/dashboard'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
