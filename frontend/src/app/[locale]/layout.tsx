import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { RootShell } from '@/shared/components/layout/RootShell';
import { LOCALES, LOCALE_HTML_LANG, SITE_URL, isLocale } from '@/shared/i18n/config';
import { LocaleProvider } from '@/shared/i18n/LocaleProvider';
import { text } from '@/shared/i18n/localized';
import { ORGANIZATION } from '@/shared/content/organization';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Only the declared locales exist; anything else is a 404 (src/middleware.ts adds the prefix).
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const name = text(ORGANIZATION.name, locale);
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: name,
    title: { default: name, template: `%s | ${name}` },
    description: text(ORGANIZATION.description, locale),
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <RootShell lang={LOCALE_HTML_LANG[locale]}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </RootShell>
  );
}
