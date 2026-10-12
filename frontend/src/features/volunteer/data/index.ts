import { BookOpen, Camera, HandHeart, Laptop, Megaphone } from 'lucide-react';
import type { VolunteerRole } from '@/features/volunteer/types';

export const volunteerIntro =
  'Volunteering at Nehemiah Autism Center is an opportunity to support children with autism and their families through meaningful activities, learning, care, and community engagement. Volunteers contribute their time and skills while gaining a deeper understanding of autism and making a positive difference in the lives of the children we serve.';

export const volunteerRoles: VolunteerRole[] = [
  {
    title: 'Classroom & Learning Support',
    description:
      'Assist teachers and therapists during learning activities, help children participate, and provide one-on-one support when needed.',
    icon: BookOpen,
  },
  {
    title: 'Child Support & Care',
    description:
      'Provide supportive assistance during daily routines, transitions, and activities while following the guidance of the Center’s professional staff.',
    icon: HandHeart,
  },
  {
    title: 'Event, Fundraising & Community Outreach Support',
    description:
      'Help with awareness campaigns, fundraising activities, community events, and programs that promote understanding and acceptance of autism.',
    icon: Megaphone,
  },
  {
    title: 'Media & Administrative Support',
    description:
      'Assist with photography, video, social media content, documentation, data entry, or other administrative tasks that help the Center operate effectively.',
    icon: Camera,
  },
  {
    title: 'Technology & Digital Support',
    description:
      'Help with basic computer tasks, digital documents, presentations, website content, social media, or other technology-related activities.',
    icon: Laptop,
  },
];
