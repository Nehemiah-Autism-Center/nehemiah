import type { Metadata } from 'next';
import { AboutPage } from '@/features/about';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function Page() {
  return <AboutPage />;
}
