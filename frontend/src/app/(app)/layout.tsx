import type { Metadata } from 'next';
import '@/app/globals.css';
import { RootShell } from '@/shared/components/layout/RootShell';

// Root layout for the scaffold pages that live outside the localized public site
// (/login, /register, /dashboard). They are placeholders without backend integration, so they
// are kept out of search results.
export const metadata: Metadata = {
  title: 'Nehemiah Autism Center',
  robots: { index: false, follow: false },
};

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
