import type { FaqCategory } from '@/features/faq/types';

export const faqIntro =
  'Find answers to some of the most common questions about Nehemiah Autism Center, our services, visiting the Center, and how we support children with autism and their families.';

export const faqCategories: FaqCategory[] = [
  {
    title: 'General',
    items: [
      {
        question: 'What is Nehemiah Autism Center?',
        answer:
          'Nehemiah Autism Center is a nonprofit organization dedicated to supporting children and young people with autism and related developmental challenges, as well as their families. The Center provides educational, therapeutic, and family support services while also raising awareness and promoting understanding of autism in the community.',
      },
      {
        question: 'Who can receive services at Nehemiah Autism Center?',
        answer:
          "Our services are designed primarily for children and young people on the autism spectrum and their families. Support is provided based on each child's individual needs and abilities.",
      },
    ],
  },
  {
    title: 'Services',
    items: [
      {
        question: 'What services does Nehemiah Autism Center provide?',
        answer:
          'The Center provides educational and training support, as well as three main therapy services: Applied Behavior Analysis (ABA), Speech and Language Therapy, and Occupational Therapy. We also provide support and counseling services for families.',
      },
      {
        question: 'What is Applied Behavior Analysis (ABA)?',
        answer:
          'ABA is an individualized approach that helps children develop important skills, including communication, positive behavior, independence, and daily living skills.',
      },
      {
        question: 'Does the Center provide Speech Therapy?',
        answer:
          'Yes. Our Speech and Language Therapy supports children in developing communication, language, and social interaction skills according to their individual needs.',
      },
    ],
  },
];
