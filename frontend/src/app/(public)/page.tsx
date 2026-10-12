import type { Metadata } from 'next';
import { HomePage } from '@/features/home';
import { SITE_CONFIG } from '@/shared/lib/constants';

export const metadata: Metadata = {
  title: { absolute: SITE_CONFIG.name },
  description: SITE_CONFIG.description,
};

export default function Page() {
  return <HomePage />;
}
