import type { Metadata } from 'next';
import { FaqPage } from '@/features/faq';

export const metadata: Metadata = {
  title: 'FAQ',
};

export default function Page() {
  return <FaqPage />;
}
