import { createElement, type ElementType, type HTMLAttributes } from 'react';
import type { Locale } from './config';
import { resolve, type Localized } from './localized';
import { tr, type UiKey } from './ui';

type TextProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'lang'> & {
  locale: Locale;
  as?: ElementType;
};

/**
 * Renders a localized string. When the visitor's language has no usable value and English is
 * substituted, the element is tagged `lang="en"` so screen readers pronounce it correctly and
 * the fallback is visible to automated checks.
 */
export function LocalizedText({
  value,
  locale,
  as = 'span',
  ...rest
}: TextProps & { value: Localized<string> }) {
  const resolved = resolve(value, locale);
  return createElement(
    as,
    { ...rest, lang: resolved.isFallback ? resolved.lang : undefined },
    resolved.value,
  );
}

/** Same as LocalizedText, for the shared interface dictionary. */
export function UiText({ k, locale, as = 'span', ...rest }: TextProps & { k: UiKey }) {
  const resolved = tr(k, locale);
  return createElement(
    as,
    { ...rest, lang: resolved.isFallback ? resolved.lang : undefined },
    resolved.value,
  );
}

/** A list of paragraphs, each rendered as its own <p>. */
export function LocalizedParagraphs({
  value,
  locale,
  className,
}: {
  value: Localized<string[]>;
  locale: Locale;
  className?: string;
}) {
  const resolved = resolve(value, locale);
  return (
    <>
      {resolved.value.map((paragraph, index) => (
        <p key={index} className={className} lang={resolved.isFallback ? resolved.lang : undefined}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
