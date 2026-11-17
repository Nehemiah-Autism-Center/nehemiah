'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_LOCALE, type Locale } from './config';

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** Makes the active locale available to client components (server components get it via props). */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
