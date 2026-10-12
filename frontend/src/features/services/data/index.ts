import { Hand, MessageCircle, Puzzle } from 'lucide-react';
import type { Service } from '@/features/services/types';

export const servicesHeading = 'Services We Provide';

export const servicesIntro =
  'The Center provides three main therapy services tailored to the individual needs and abilities of children on the autism spectrum. These services help children develop their communication, behavioral, daily living, and other essential life skills. We also provide support and counseling services for families.';

export const services: Service[] = [
  {
    slug: 'applied-behavior-analysis',
    title: 'Applied Behavior Analysis',
    description:
      'Individualized ABA-based programs that improve communication, behavior, and essential life skills for each child on the spectrum.',
    icon: Puzzle,
  },
  {
    slug: 'speech-therapy',
    title: 'Speech Therapy',
    description:
      "Structured support for language development, communication skills, and social interaction tailored to each child's needs.",
    icon: MessageCircle,
  },
  {
    slug: 'occupational-therapy',
    title: 'Occupational Therapy',
    description:
      'Individualized support helping autistic children develop daily living, sensory, motor, self-care, play, and independence skills for meaningful participation at home, school, and community.',
    icon: Hand,
  },
];
