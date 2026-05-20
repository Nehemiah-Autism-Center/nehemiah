import { Users, Briefcase, HandHeart, Trophy } from 'lucide-react';
import { createElement } from 'react';

export const slides = [
  {
    image: '/images/home_1_slider_1.jpg',
    title:
      'EMPOWERING <span class="text-primary">CHILDREN</span><br/>WITH <span class="text-primary">AUTISM</span>',
    subtitle:
      "Since June 2011, we provide holistic therapy, education, and family empowerment to children with Autism Spectrum Disorder (ASD) in Ethiopia.",
    primaryButton: { label: 'Learn More', href: '/about' },
    secondaryButton: { label: 'Donate Now', href: '/donate' },
  },
  {
    image: '/images/home_1_slider_2.jpg',
    title: 'TOGETHER WE CAN<br/>MAKE A <span class="text-primary">DIFFERENCE</span>',
    subtitle:
      'Join our community of volunteers, donors, and advocates working to reduce stigma and create a more inclusive Ethiopia for children with autism.',
    primaryButton: { label: 'Get Involved', href: '/volunteer' },
    secondaryButton: { label: 'Donate Now', href: '/donate' },
  },
];

export const counterItems = [
  { icon: createElement(Users, { className: 'size-10' }), label: 'Children Currently Served', value: 90 },
  { icon: createElement(Briefcase, { className: 'size-10' }), label: 'Dedicated Staff', value: 30 },
  { icon: createElement(HandHeart, { className: 'size-10' }), label: 'Families Supported', value: 500 },
  { icon: createElement(Trophy, { className: 'size-10' }), label: 'Years of Care', value: 15 },
];

export const events = [
  {
    image: '/images/event_1.jpg',
    title: 'World Autism Awareness Day',
    description:
      'Join us in raising awareness and promoting a better understanding of autism across communities in Ethiopia.',
    date: 'April 2, 2026',
    slug: 'world-autism-awareness-day',
  },
  {
    image: '/images/event_2.jpg',
    title: 'Autism Awareness Walk',
    description:
      'A community walk to gather support, raise awareness, and celebrate the potential of every child on the spectrum.',
    date: 'May 10, 2026',
    slug: 'autism-awareness-walk',
  },
  {
    image: '/images/event_3.jpg',
    title: 'Parent Training Workshop',
    description:
      'Practical skills and tools for parents to support their children at home ensuring therapy continues beyond the center.',
    date: 'June 15, 2026',
    slug: 'parent-training-workshop',
  },
];

export const teamMembers = [
  {
    image: '/images/team_6.jpg',
    name: 'Rahel Abayneh',
    role: 'Founder & Director',
    slug: 'rahel-abayneh',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    image: '/images/team_7.jpg',
    name: 'Tewdros Getye',
    role: 'Head of Therapy',
    slug: 'tewdros-getye',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    image: '/images/team_8.jpg',
    name: 'Dr. Firdawek',
    role: 'Senior Therapist',
    slug: 'dr-firdawek',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    image: '/images/team_9.jpg',
    name: 'Meseret',
    role: 'Lead Educator',
    slug: 'meseret-educator',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
];

export const testimonials = [
  {
    text: 'When I learned my son was placed 463rd on a waiting list at the only existing center, I felt completely alone. Nehemiah Autism Center opened its doors and gave our family real hope. The therapy, the parent training, the compassion — it has been life-changing.',
    name: 'Tigist',
    role: 'Parent & Founding Family Member',
  },
  {
    text: 'Working here is more than a job — it is a calling. Seeing children communicate, connect, and grow every single day is the greatest reward. Nehemiah proves that with the right support, every child can thrive.',
    name: 'Tewdros Getye',
    role: 'Head of Therapy',
  },
  {
    text: 'As a father, finding a place that treats my child with dignity, offers evidence-based therapy, and also trains me to be a better support for him at home — right here in Addis Ababa — has been a true blessing.',
    name: 'Eyob',
    role: 'Parent',
  },
];

export const blogPosts = [
  {
    image: '/images/blog_1.jpg',
    title: 'Autism in Ethiopia: A Growing Recognition',
    excerpt:
      'With an estimated 600,000 children potentially affected by ASD nationwide, addressing the lack of rehabilitation facilities is our top priority.',
    date: 'Apr 20, 2026',
    author: 'Admin',
    slug: 'understanding-autism-ethiopia',
  },
  {
    image: '/images/blog_2.jpg',
    title: 'The Story of a Founder: "I Won\'t Stay Silent"',
    excerpt:
      'How Rahel Abayneh transformed a personal struggle into a national mission, founding Nehemiah Autism Center to give every child a chance.',
    date: 'Mar 15, 2026',
    author: 'Admin',
    slug: 'mothers-to-founders',
  },
  {
    image: '/images/blog_3.jpg',
    title: 'Breaking the Stigma in Addis',
    excerpt:
      'Challenging societal norms and working towards true inclusion for children on the spectrum in our local communities.',
    date: 'Feb 10, 2026',
    author: 'Admin',
    slug: 'breaking-stigma-addis',
  },
];

export const sponsorLogos = [
  { src: '/images/logo_1.png', alt: 'Commercial Bank of Ethiopia' },
  { src: '/images/logo_2.png', alt: 'Yotek Construction' },
  { src: '/images/logo_3.png', alt: 'Ethiopian Medhin Company' },
  { src: '/images/logo_4.png', alt: 'Nib Insurance' },
  { src: '/images/logo_5.png', alt: 'Niyala Insurance' },
  { src: '/images/logo_6.png', alt: 'Embassy of Finland in Ethiopia' },
  { src: '/images/logo_7.png', alt: 'Finado Ethiopia' },
  { src: '/images/logo_8.png', alt: 'Development Bank of Ethiopia' },
];

export const galleryImages = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/gallery_${i + 1}.jpg`,
  alt: `Gallery image ${i + 1}`,
}));
