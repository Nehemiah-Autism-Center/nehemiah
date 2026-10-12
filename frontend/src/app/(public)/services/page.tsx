import type { Metadata } from 'next';
import { ServicesPage } from '@/features/services';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Applied Behavior Analysis, Speech Therapy and Occupational Therapy for autistic children, with support and counseling for their families.',
};

export default function Page() {
  return <ServicesPage />;
}
