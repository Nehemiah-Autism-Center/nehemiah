import { HandCoins, Handshake, Users } from 'lucide-react';
import type { GetInvolvedItem } from '@/features/home/types';

export const slides = [
  {
    image: '/images/nehemiah/hero-awareness-day.jpg',
    imageAlt:
      'Families and supporters gathered under the event tent at the Nehemiah Autism Center Autism Awareness Day',
    title: 'Welcome to <span class="text-primary">Nehemiah</span> Autism Center',
    subtitle:
      'Where autistic children are empowered through care, education, and individualized support, families are strengthened with hope and guidance, and communities grow in understanding, inclusion, and the belief that every child deserves to be safe, strong, valued, and empowered.',
    primaryButton: { label: 'Support Nehemiah', href: '/donate' },
    secondaryButton: { label: 'Learn More', href: '/about' },
  },
  {
    image: '/images/nehemiah/hero-children-activities.jpg',
    imageAlt: 'Children and volunteers playing a parachute game on the lawn at the center',
    title:
      'Together, let’s lighten the burden faced by <span class="text-primary">autistic children</span> and their parents!',
    subtitle:
      'We provide individualized care, education, therapy, family support, and awareness programs that help children develop their abilities and reach their potential.',
    primaryButton: { label: 'What We Do', href: '/services' },
    secondaryButton: { label: 'Volunteer With Us', href: '/volunteer' },
  },
];

export const introParagraph =
  'At Nehemiah Autism Center, we work to create a better future for autistic children and their families in Ethiopia. We provide individualized care, education, therapy, family support, and awareness programs that help children develop their abilities and reach their potential. Founded by families who understand these challenges firsthand, we are committed to building a more inclusive and supportive society where every autistic child is safe, strong, and valued. Join us in making a difference—support Nehemiah Autism Center and help us continue providing hope, care, and opportunities to children living with autism across Ethiopia.';

// The "main buttons" from the content document that are not already in the hero.
export const getInvolved: GetInvolvedItem[] = [
  {
    title: 'Volunteer With Us',
    description:
      'Volunteers contribute their time and skills while gaining a deeper understanding of autism and making a positive difference in the lives of the children we serve.',
    href: '/volunteer',
    icon: Users,
  },
  {
    title: 'Support Nehemiah',
    description:
      'Your support can help us reach more autistic children and bring hope and opportunity within their reach.',
    href: '/donate',
    icon: HandCoins,
  },
  {
    title: 'Partner With Us',
    description:
      'We work alongside organizations, professionals, and communities to strengthen our services, share knowledge, and create greater opportunities for our children.',
    href: '/contact',
    icon: Handshake,
  },
];

export const testimonials = [
  {
    text: 'Before coming here, I honestly didn’t know much about autism. But after spending time with the children, I realized how much they have to teach us. Volunteering here has changed the way I see people.',
    name: 'A Nehemiah Volunteer',
  },
  {
    text: 'The first time I saw my child make progress, I became emotional. It may seem like a small step to others, but for us, it meant everything. Nehemiah gave us hope when we really needed it.',
    name: 'A Grateful Parent',
  },
  {
    text: 'I came here thinking I was going to help the children, but in many ways, they changed me more than I changed them. Every smile, every small achievement, and every moment of connection stays with me.',
    name: 'Volunteer',
  },
  {
    text: 'There were times when I felt alone and worried about my child’s future. Here, I met people who understand what we are going through. For the first time, I felt that we were not alone.',
    name: 'Parent of a Child at the Center',
  },
  {
    text: 'Volunteering at Nehemiah is more than giving your time. You build relationships, you learn patience, and you begin to understand that even a small act of kindness can mean so much to someone.',
    name: 'Former Volunteer',
  },
  {
    text: 'Seeing my child grow in confidence and learn new things gives me hope for the future. I am grateful for every teacher, therapist, volunteer, and person who has been part of our journey.',
    name: 'A Grateful Parent',
  },
];
