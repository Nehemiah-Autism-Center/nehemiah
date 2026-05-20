import type { Metadata } from 'next';
import { SuccessStoriesPage } from '@/features/success-stories';

export const metadata: Metadata = {
  title: 'Success Stories | Nehemiah',
};

export default function Page() {
  return <SuccessStoriesPage />;
}
