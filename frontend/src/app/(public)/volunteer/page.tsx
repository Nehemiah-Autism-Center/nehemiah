import type { Metadata } from 'next';
import { VolunteerPage } from '@/features/volunteer';

export const metadata: Metadata = {
  title: 'Volunteer | Nehemiah Autism Center',
  description:
    'Apply to volunteer with Nehemiah Autism Center. Share your time, skills, and compassion to support children with autism and their families in Ethiopia.',
};

export default function Page() {
  return <VolunteerPage />;
}
