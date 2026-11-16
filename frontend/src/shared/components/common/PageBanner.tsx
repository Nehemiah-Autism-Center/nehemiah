import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { text, type Localized } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { t } from '@/shared/i18n/ui';
import { ROUTES } from '@/shared/i18n/routing';
import type { MediaAsset } from '@/shared/content/media';
import { Container } from './Container';
import { LocalizedLink } from './ButtonLink';

export interface Crumb {
  label: Localized<string>;
  /** Locale-less path; omit for the current page. */
  href?: string;
}

interface PageBannerProps {
  locale: Locale;
  title: Localized<string>;
  /** Trail after "Home". The last item is the current page. */
  trail?: Crumb[];
  image?: MediaAsset;
}

/** The page's <h1> with a breadcrumb trail. The photograph, when given, is decorative. */
export function PageBanner({ locale, title, trail = [], image }: PageBannerProps) {
  return (
    <section className="on-dark bg-primary-dark relative isolate overflow-hidden text-white">
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden="true" className="bg-primary-dark/85 absolute inset-0 -z-10" />
        </>
      )}
      <Container className="py-12 md:py-16">
        <nav aria-label={t('common.breadcrumb', locale)}>
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-white/90">
            <li>
              <LocalizedLink
                href={ROUTES.home}
                locale={locale}
                className="underline-offset-4 hover:underline"
              >
                <UiText k="nav.home" locale={locale} />
              </LocalizedLink>
            </li>
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={text(crumb.label, 'en')} className="flex items-center gap-1">
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-white/70 rtl:rotate-180"
                  />
                  {crumb.href && !isLast ? (
                    <LocalizedLink
                      href={crumb.href}
                      locale={locale}
                      className="underline-offset-4 hover:underline"
                    >
                      <LocalizedText value={crumb.label} locale={locale} />
                    </LocalizedLink>
                  ) : (
                    <LocalizedText
                      value={crumb.label}
                      locale={locale}
                      aria-current={isLast ? 'page' : undefined}
                      className="font-semibold"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <LocalizedText
          as="h1"
          value={title}
          locale={locale}
          className="mt-4 max-w-4xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
        />
      </Container>
    </section>
  );
}
