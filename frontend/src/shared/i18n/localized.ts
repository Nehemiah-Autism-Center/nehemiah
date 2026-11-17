import type { Locale } from './config';

/**
 * A piece of bilingual content.
 *
 * - `en` is always present.
 * - `am` is present only when an Amharic version exists. Verbatim text from the organisation's
 *   content document carries no flag; anything written by the development team (interface
 *   labels such as menu items) is flagged with `amProvisional` so it can be reviewed, listed
 *   in the localization report, and switched off without code changes.
 */
export interface Localized<T = string> {
  en: T;
  am?: T;
  /** The Amharic value is a development-team proposal awaiting review by a native speaker. */
  amProvisional?: boolean;
}

export interface Resolved<T> {
  value: T;
  /** Language the returned value is actually written in. */
  lang: Locale;
  /** True when the visitor's language had no usable value and English was substituted. */
  isFallback: boolean;
}

/**
 * Set NEXT_PUBLIC_HIDE_PROVISIONAL_AMHARIC=true to show English instead of any Amharic
 * that has not been approved by the organisation yet.
 */
export const SHOW_PROVISIONAL_AMHARIC = process.env.NEXT_PUBLIC_HIDE_PROVISIONAL_AMHARIC !== 'true';

export function resolve<T>(field: Localized<T>, locale: Locale): Resolved<T> {
  if (
    locale === 'am' &&
    field.am !== undefined &&
    (!field.amProvisional || SHOW_PROVISIONAL_AMHARIC)
  ) {
    return { value: field.am, lang: 'am', isFallback: false };
  }
  return { value: field.en, lang: 'en', isFallback: locale !== 'en' };
}

/** Plain string for attributes (alt, aria-label, title) where a `lang` attribute cannot be set. */
export function text(field: Localized<string>, locale: Locale): string {
  return resolve(field, locale).value;
}

/** Convenience constructor for approved bilingual content. */
export function loc<T = string>(en: T, am?: T): Localized<T> {
  return am === undefined ? { en } : { en, am };
}

/** Convenience constructor for interface text whose Amharic is a development-team proposal. */
export function locProvisional(en: string, am: string): Localized {
  return { en, am, amProvisional: true };
}
