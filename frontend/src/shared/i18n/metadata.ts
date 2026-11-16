import type { Metadata } from 'next';
import { LOCALES, LOCALE_OG, type Locale } from './config';
import { text, type Localized } from './localized';
import { localizePath } from './routing';
import { ORGANIZATION } from '@/shared/content/organization';
import { MEDIA } from '@/shared/content/media';

interface PageMetadataInput {
  locale: Locale;
  /** Locale-less path of the page, e.g. "/about". */
  path: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Share image path; defaults to the brand card. */
  image?: string;
  /** Skip the "| Nehemiah Autism Center" title suffix (used where the title is the name itself). */
  absoluteTitle?: boolean;
}

/**
 * Builds localized metadata for a page: title, description, canonical URL, hreflang
 * alternates, Open Graph and Twitter cards. Relative URLs resolve against `metadataBase`
 * (set in the [locale] layout from NEXT_PUBLIC_SITE_URL).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const pageTitle = text(title, locale);
  const pageDescription = text(description, locale);
  const languages = Object.fromEntries(LOCALES.map((l) => [l, localizePath(path, l)]));
  const shareImage = image ?? MEDIA.shareCard.src;

  return {
    title: absoluteTitle ? { absolute: pageTitle } : pageTitle,
    description: pageDescription,
    alternates: {
      canonical: localizePath(path, locale),
      languages: { ...languages, 'x-default': localizePath(path, 'en') },
    },
    openGraph: {
      type: 'website',
      siteName: text(ORGANIZATION.name, locale),
      title: pageTitle,
      description: pageDescription,
      url: localizePath(path, locale),
      locale: LOCALE_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_OG[l]),
      images: [
        { url: shareImage, width: 1200, height: 630, alt: text(MEDIA.shareCard.alt, locale) },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [shareImage],
    },
  };
}
