import { notFound } from 'next/navigation';
import { isLocale, type Locale } from './config';

export type LocaleParams = Promise<{ locale: string }>;

/** Reads the `[locale]` route param and 404s on anything that is not a supported language. */
export async function resolveLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
