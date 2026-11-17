import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { Locale } from '@/shared/i18n/config';
import { LocaleProvider } from '@/shared/i18n/LocaleProvider';

/** Renders a component the way the app does: inside the active locale's provider. */
export function renderIn(locale: Locale, ui: ReactElement) {
  return render(<LocaleProvider locale={locale}>{ui}</LocaleProvider>);
}
