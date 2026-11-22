'use client';

import { Container } from '@/shared/components/common/Container';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { loc } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';

// No approved Amharic for this sentence yet: Amharic visitors see it in English, tagged lang="en".
const MESSAGE = loc('The page you are looking for does not exist or may have moved.');

export default function NotFound() {
  const locale = useLocale();
  return (
    <Container className="flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
      <p
        aria-hidden="true"
        className="text-green-display font-serif text-8xl leading-none font-bold"
      >
        404
      </p>
      <UiText
        as="h1"
        k="notFound.title"
        locale={locale}
        className="text-heading mt-4 font-serif text-3xl"
      />
      <LocalizedText as="p" value={MESSAGE} locale={locale} className="mt-3 max-w-md text-lg" />
      <ButtonLink href={ROUTES.home} locale={locale} className="mt-8">
        <UiText k="notFound.back" locale={locale} />
      </ButtonLink>
    </Container>
  );
}
