import type { Metadata } from 'next';
import { VolunteerPage } from '@/features/volunteer';

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Volunteer at Nehemiah Autism Center: support autistic children and their families through learning, care, events, media and technology.',
};

export default function Page() {
  return <VolunteerPage />;
}
