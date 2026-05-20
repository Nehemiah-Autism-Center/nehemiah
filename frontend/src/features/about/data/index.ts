import { Users, Briefcase, HandHeart, Trophy } from 'lucide-react';
import { createElement } from 'react';
import type { TimelineEvent } from '@/shared/components/common/HistoryTimeline';

export const counterItems = [
  { icon: createElement(Users, { className: 'size-10' }), label: 'Children Currently Served', value: 90 },
  { icon: createElement(Briefcase, { className: 'size-10' }), label: 'Dedicated Staff', value: 30 },
  { icon: createElement(HandHeart, { className: 'size-10' }), label: 'Families Supported', value: 500 },
  { icon: createElement(Trophy, { className: 'size-10' }), label: 'Years of Care', value: 15 },
];

export const sponsorLogos = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/logo_${i + 1}.png`,
  alt: `Sponsor ${i + 1}`,
}));

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2011',
    title: 'Nehemiah Is Born',
    description:
      'On June 16, 2011, Nehemiah Autism Center opened its doors with just six children in the Welo Sefer area of Addis Ababa. Founded by Rahel Abayneh — a mother determined to find support for her son who was placed 463rd on the only existing center\'s waiting list — the center launched with a founding team of seven dedicated staff members.',
    image: '/images/history_2010.JPG',
  },
  {
    year: '2012',
    title: 'Early Mentorship & Critical Support',
    description:
      'Six months after opening, funds were nearly exhausted and the center was at risk of losing its facility. A timely donation from Oak International covered six months of rent, ensuring continuity. Dr. Conning joined the center, providing critical technical guidance that established foundational therapy principles still shaping the center\'s approach today.',
    image: '/images/history_2012.JPG',
  },
  {
    year: '2013',
    title: 'Moving to Megenagna',
    description:
      'After nine months in Welo Sefer, the center relocated to Megenagna — a phase of significant stability and growth lasting six years. The center expanded to serve 40 children supported by 20 teachers. Parent training programs were formally launched, equipping families with practical skills to support their children at home.',
    image: '/images/history_2013.JPG',
  },
  {
    year: '2016',
    title: 'National Visibility & Media',
    description:
      'A landmark partnership with Ambo Mineral Water and a televised interview on EBS TV brought widespread national attention to autism and Nehemiah\'s work. These moments introduced autism awareness to a far broader Ethiopian audience and firmly positioned the center as a leading voice in the field.',
  },
  {
    year: '2018',
    title: 'Awareness Campaigns Expand',
    description:
      'Large-scale national awareness campaigns were launched during World Autism Awareness Month — featuring public walks, dance and fitness events, and one-day national campaigns. Outreach programs expanded to elementary schools, high schools, and universities across Addis Ababa, challenging misconceptions and reducing stigma.',
  },
  {
    year: '2019',
    title: 'Gotera Phase: Growing Capacity',
    description:
      'Nehemiah relocated to Gotera Condominium, entering a new phase of expanded services. The center grew to serve 60 children supported by 30 teachers. Through local partnerships, daily meal support for 38 children was introduced — ensuring that nutrition was never a barrier to therapy and development.',
  },
  {
    year: '2021',
    title: 'International Partnerships Formed',
    description:
      'The center formalized international partnerships with Nilo Azul Asociacion para el Desarrollo en Ethiopia, Finado Ethiopia, and the Embassy of Finland in Ethiopia. Government collaboration with the Ministry of Health, Ministry of Education, and Ministry of Women, Children and Social Affairs was also strengthened during this period.',
  },
  {
    year: '2022',
    title: 'Development Bank of Ethiopia Donation',
    description:
      'The Development Bank of Ethiopia provided a 5 million birr donation — a transformational contribution that significantly strengthened the center\'s operational capacity and enabled further expansion of programs, staff, and services for children and families.',
  },
  {
    year: '2023',
    title: 'Women of Excellence Award',
    description:
      'Founder Rahel Abayneh was honored at the Women of Excellence Awards 2023, recognizing her exceptional leadership and over a decade of dedication to autism care in Ethiopia. A collaborative recognition was also received from Compassion International Ethiopia and World Vision at the "Love Harvest" event.',
  },
  {
    year: '2024',
    title: 'Kera — Our Current Home',
    description:
      'After two years in Gotera, Nehemiah moved to Kera — the center\'s current home now entering its sixth year. Today, 90 children receive structured therapy supported by 30 dedicated staff members. Free annual medical check-ups and financial aid continue to be provided to families in need.',
  },
  {
    year: '2026',
    title: '15 Years & Looking Forward',
    description:
      'Celebrating over 15 years of uninterrupted service, Nehemiah Autism Center looks ahead with bold ambition: constructing a permanent, purpose-built therapy facility, expanding capacity to serve 250 children, and introducing vocational therapy programs — building a lifelong support system where every child can grow, learn, and thrive.',
  },
];

export const faqs = [
  {
    question: 'How can I make a donation?',
    answer:
      'You can donate directly to Nehemiah Autism Center through our accounts at Commercial Bank of Ethiopia (CBE) or through other partner channels listed on our Donate page. Every contribution — large or small — directly supports therapy, daily meals, healthcare, and essential supplies for children in need.',
  },
  {
    question: 'How are funds used?',
    answer:
      'Funds are used to cover therapy services (approximately 18,000 birr per child per month), staff salaries, facility rent, daily meals for 38 children, annual medical check-ups, parent training programs, financial aid for families, and community awareness campaigns. We are committed to full transparency and responsible stewardship of every donation.',
  },
  {
    question: 'How can I volunteer with Nehemiah?',
    answer:
      'We warmly welcome volunteers from all backgrounds. Whether you have expertise in therapy, education, or administration — or simply a heart to help — contact us through our Contact page or visit our center in Kera, Addis Ababa. Past volunteers include Yodit, Zinash, Mr. Daniel, Dr. Hadiya, Liya, Meseret Haile, Nesriya, and supporters from the Seattle community.',
  },
  {
    question: 'What services does the center provide?',
    answer:
      'We offer Applied Behavior Therapy, Speech Therapy, and Food Therapy tailored to each child\'s needs. Beyond clinical therapy, we provide Parent Training Programs, income-generating empowerment initiatives for parents, financial aid, clothing and essential supplies, holiday meal support, sponsorship programs, and free annual medical check-ups for children and their families.',
  },
  {
    question: 'What is the admission process for children?',
    answer:
      'Admission is based on the child\'s individual needs and available capacity, following an initial assessment by our staff. Due to high demand — Nehemiah is one of the very few autism centers in Ethiopia — there may be a waiting list. We encourage families to contact our office directly as early as possible to begin the assessment process.',
  },
  {
    question: 'What is Nehemiah\'s vision for the future?',
    answer:
      'Within the next five years, we aim to construct a permanent, purpose-built therapy facility on our own land, expanding capacity to serve 250 children and introducing vocational therapy programs. Our long-term vision is to become a lifelong support system — a home where every individual with autism is understood, celebrated, and empowered to reach their full potential.',
  },
  {
    question: 'How can my organization partner with Nehemiah?',
    answer:
      'We actively seek partnerships with local businesses, government bodies, international foundations, and NGOs. Current partners include the Ministry of Health, Ministry of Education, Commercial Bank of Ethiopia, Yotek Construction, Nib Insurance, Niyala Insurance, Ethiopian Medhin Company, and international organizations such as Nilo Azul Asociacion and the Embassy of Finland in Ethiopia. Please reach out to our Director to explore partnership opportunities.',
  },
];
