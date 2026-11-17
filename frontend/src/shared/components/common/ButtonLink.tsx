import type { ComponentProps } from 'react';
import Link from 'next/link';
import type { Locale } from '@/shared/i18n/config';
import { localizePath } from '@/shared/i18n/routing';
import { cn } from '@/shared/lib/utils';

const EXTERNAL = /^(https?:|mailto:|tel:)/i;

type AnchorProps = Omit<ComponentProps<'a'>, 'href'>;

interface LocalizedLinkProps extends AnchorProps {
  /** Locale-less internal path (may include ?query and #hash) or an external URL. */
  href: string;
  locale: Locale;
}

/**
 * Link that keeps the visitor's language: internal paths gain the locale prefix, while http(s),
 * mailto: and tel: targets are rendered as plain anchors (web links open in a new tab).
 */
export function LocalizedLink({ href, locale, children, ...rest }: LocalizedLinkProps) {
  if (EXTERNAL.test(href)) {
    const isWeb = /^https?:/i.test(href);
    return (
      <a href={href} {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={localizePath(href, locale)} {...rest}>
      {children}
    </Link>
  );
}

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outlineLight';

// Rectangular, 5px corners, uppercase English labels (Ethiopic has no case, so Amharic is unaffected).
const BASE =
  'inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-[5px] px-7 py-2.5 text-center text-sm font-semibold uppercase leading-snug tracking-wide transition-colors';

const VARIANTS: Record<ButtonVariant, string> = {
  // Bright template green with near-black text (7.1:1). White on this green would be 2.4:1.
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  secondary: 'border-2 border-charcoal bg-white text-charcoal hover:bg-charcoal hover:text-white',
  light: 'bg-white text-charcoal hover:bg-secondary-bg',
  outlineLight:
    'border-2 border-white bg-transparent text-white hover:bg-white hover:text-charcoal',
};

interface ButtonLinkProps extends LocalizedLinkProps {
  variant?: ButtonVariant;
}

/** A link that looks like a button (min 44px tall, visible focus ring from globals.css). */
export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <LocalizedLink className={cn(BASE, VARIANTS[variant], className)} {...props} />;
}
