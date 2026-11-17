'use client';

import { useEffect } from 'react';
import { Container } from '@/shared/components/common/Container';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { loc } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';

// No approved Amharic for these sentences yet: Amharic visitors see English, tagged lang="en".
const TITLE = loc('Something went wrong');
const MESSAGE = loc('Please try again. If the problem continues, contact the Center.');
const RETRY = loc('Try again');

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
      <LocalizedText
        as="h1"
        value={TITLE}
        locale={locale}
        className="text-heading font-serif text-3xl"
      />
      <LocalizedText as="p" value={MESSAGE} locale={locale} className="mt-3 max-w-md text-lg" />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-primary hover:bg-primary-hover inline-flex min-h-11 items-center justify-center rounded-md px-6 py-2.5 text-base font-semibold text-white"
        >
          <LocalizedText value={RETRY} locale={locale} />
        </button>
        <ButtonLink href={ROUTES.home} locale={locale} variant="secondary">
          <UiText k="notFound.back" locale={locale} />
        </ButtonLink>
      </div>
    </Container>
  );
}
