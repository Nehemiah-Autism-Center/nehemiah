import Image from 'next/image';
import type { Locale } from '@/shared/i18n/config';
import { resolve } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { ORGANIZATION } from '@/shared/content/organization';
import { MEDIA } from '@/shared/content/media';
import { Container } from '@/shared/components/common/Container';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { HERO } from '@/features/home/data';

/** Splits `full` around the first occurrence of `needle`; null when it does not occur. */
function splitAround(full: string, needle: string): [string, string, string] | null {
  const index = needle ? full.indexOf(needle) : -1;
  if (index < 0) return null;
  return [full.slice(0, index), needle, full.slice(index + needle.length)];
}

/**
 * Full-width photographic hero: dark overlay, left-aligned oversized heading with the
 * organisation's name picked out in green, one short supporting paragraph and two rectangular
 * buttons. Static by design: no slider, auto-play, parallax or flashing.
 *
 * The heading is the approved homepage heading, unchanged; the green highlight is found by
 * locating the organisation name inside it, so it works in both languages. The rest of the
 * approved hero text continues in the introduction section directly below.
 */
export function HeroSection({ locale }: { locale: Locale }) {
  const heading = resolve(HERO.headline, locale);
  const name = resolve(ORGANIZATION.name, heading.isFallback ? 'en' : locale);
  const parts = splitAround(heading.value, name.value);

  return (
    <section
      aria-labelledby="hero-heading"
      className="on-dark bg-charcoal-dark relative isolate overflow-hidden text-white"
    >
      <Image
        src={MEDIA.heroPrimary.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />

      <Container className="min-h-[520px] pt-12 pb-16 sm:min-h-[600px] md:pt-16 lg:min-h-[640px] lg:pt-20">
        <h1
          id="hero-heading"
          lang={heading.isFallback ? heading.lang : undefined}
          className="max-w-4xl font-sans text-[clamp(2.125rem,1.4rem+3.2vw,3.75rem)] leading-[1.1] font-extrabold tracking-normal text-white uppercase [:lang(am)_&]:leading-[1.4]"
        >
          {parts ? (
            <>
              {parts[0]}
              <span className="text-primary">{parts[1]}</span>
              {parts[2]}
            </>
          ) : (
            heading.value
          )}
        </h1>

        <LocalizedText
          as="p"
          value={HERO.invitation}
          locale={locale}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white sm:text-xl md:text-2xl"
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={ROUTES.donate} locale={locale} className="sm:min-w-52">
            <UiText k="cta.support" locale={locale} />
          </ButtonLink>
          <ButtonLink href={ROUTES.about} locale={locale} variant="light" className="sm:min-w-52">
            <UiText k="cta.learnMore" locale={locale} />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
