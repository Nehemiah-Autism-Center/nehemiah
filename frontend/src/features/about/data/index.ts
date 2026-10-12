import { CalendarHeart, GraduationCap, HeartHandshake, Users } from 'lucide-react';
import { createElement } from 'react';

export const aboutIntro = [
  'Nehemiah Autism Center is an indigenous nonprofit organization established 15 years ago to support children and young people with autism and related developmental disorders, as well as their families, and to help protect them from the various social, psychological, and economic challenges they face.',
  'The Center was founded by parents who struggled to find schools that could provide appropriate education, training, and support for their children with autism. It operates with a vision of contributing its part to ensuring that children facing similar challenges do not experience severe health and social difficulties due to a lack of appropriate educational opportunities.',
  'Today, the Center provides comprehensive services to 90 children with autism and their parents, making a significant contribution toward easing the challenges they face. In addition, the Center works to address misconceptions about autism within the community through various awareness-raising initiatives and educational activities.',
];

export const aboutServicesSummary =
  'Currently, the Center provides three main therapy services tailored to the individual needs and abilities of children on the autism spectrum: Applied Behavior Analysis (ABA), Speech and Language Therapy, and Occupational Therapy. These services help children develop their communication, behavioral, daily living, and other essential life skills. To date, the Center has successfully graduated more than 65 children, supporting them in transitioning to the next stage of their educational and life journey.';

export const mission = [
  'To provide early diagnosis and screening services, standard education and training, life skills and vocational skills that enable children with autism to live in the community without difficulties.',
  'To provide counseling service for families who are suffering from stressful life and discrimination as a result of being a parent of autistic child/children.',
];

// Figures from the About text of the content document.
export const impactStats = [
  {
    icon: createElement(CalendarHeart, { className: 'size-10' }),
    label: 'Years serving families',
    value: 15,
  },
  {
    icon: createElement(Users, { className: 'size-10' }),
    label: 'Children supported today',
    value: 90,
  },
  {
    icon: createElement(GraduationCap, { className: 'size-10' }),
    label: 'Children graduated',
    value: 65,
    suffix: '+',
  },
  {
    icon: createElement(HeartHandshake, { className: 'size-10' }),
    label: 'Core therapy services',
    value: 3,
  },
];
