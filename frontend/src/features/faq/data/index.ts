import { loc, type Localized } from '@/shared/i18n/localized';
import { SERVICES_SUMMARY } from '@/features/services/data';

export interface FaqItem {
  id: string;
  question: Localized<string>;
  answer: Localized<string>;
}

export interface FaqCategory {
  id: string;
  title: Localized<string>;
  items: readonly FaqItem[];
}

/** Intro sentence, verbatim from "website content.docx" (Frequently asked questions). */
export const FAQ_INTRO = loc(
  'Find answers to some of the most common questions about Nehemiah Autism Center, our services, visiting the Center, and how we support children with autism and their families.',
  'ስለ ነህምያ ኦቲዝም ማዕከል፣ ስለ አገልግሎቶቻችን፣ ስለ ማዕከሉ ጉብኝት እና የኦቲዝም ችግር ላለባቸው ልጆች እና ቤተሰቦቻቸው እንዴት እንደምናግዝ ለሚነሱ በጣም የተለመዱ ጥያቄዎች መልሶችን ያግኙ።',
);

/**
 * The five questions and answers supplied in the document, grouped by the English categories
 * it gives (General, Services). The Amharic list in the document has no category headings.
 *
 * Question 3 reads its answer from SERVICES_SUMMARY so the three services cannot drift apart
 * (Occupational Therapy was replaced by Food Therapy).
 * Source spelling of the organisation's name in the Amharic questions ("የኔህምያ የኦቲዝም ማዕከል",
 * versus "ነህምያ ኦቲዝም ማዕከል" elsewhere) is kept as supplied (NAC-CONTENT-APPROVAL-REGISTER.md, AM-04).
 */
export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: 'general',
    title: { en: 'General', am: 'ጠቅላላ', amProvisional: true },
    items: [
      {
        id: 'what-is-nac',
        question: loc('What is Nehemiah Autism Center?', 'የኔህምያ የኦቲዝም ማዕከል ምንድን ነው?'),
        answer: loc(
          'Nehemiah Autism Center is a nonprofit organization dedicated to supporting children and young people with autism and related developmental challenges, as well as their families. The Center provides educational, therapeutic, and family support services while also raising awareness and promoting understanding of autism in the community.',
          'የኔህምያ የኦቲዝም ማዕከል የኦቲዝም ችግር ያለባቸውን ልጆችና ወጣቶች እንዲሁም ቤተሰቦቻቸውን ለመደገፍ የተቋቋመ ለትርፍ ያልተቋቋመ ድርጅት ነው። ማዕከሉ የትምህርት፣ የሕክምና እና የቤተሰብ ድጋፍ አገልግሎቶችን ይሰጣል፣ እንዲሁም በማህበረሰቡ ውስጥ ስለ ኦቲዝም ግንዛቤን ያሳድጋል።',
        ),
      },
      {
        id: 'who-can-receive-services',
        question: loc(
          'Who can receive services at Nehemiah Autism Center?',
          'በኔህምያ የኦቲዝም ማዕከል አገልግሎት ማግኘት የሚችለው ማነው?',
        ),
        answer: loc(
          "Our services are designed primarily for children and young people on the autism spectrum and their families. Support is provided based on each child's individual needs and abilities.",
          'አገልግሎቶቻችን በዋናነት የተነደፉት በኦቲዝም ስፔክትረም ላይ ላሉ ልጆችና ወጣቶች እና ቤተሰቦቻቸው ነው። ድጋፉ የሚሰጠው በእያንዳንዱ ልጅ የግል ፍላጎቶች እና ችሎታዎች ላይ በመመስረት ነው።',
        ),
      },
    ],
  },
  {
    id: 'services',
    title: { en: 'Services', am: 'አገልግሎቶች', amProvisional: true },
    items: [
      {
        id: 'what-services',
        question: loc(
          'What services does Nehemiah Autism Center provide?',
          'የኔህምያ የኦቲዝም ማዕከል ምን አይነት አገልግሎቶችን ይሰጣል?',
        ),
        answer: SERVICES_SUMMARY,
      },
      {
        id: 'what-is-aba',
        question: loc('What is Applied Behavior Analysis (ABA)?', 'የተግባራዊ ባህሪ ትንተና (ABA) ምንድን ነው?'),
        answer: loc(
          'ABA is an individualized approach that helps children develop important skills, including communication, positive behavior, independence, and daily living skills.',
          'ABA ልጆች ግንኙነትን፣ አዎንታዊ ባህሪን፣ ነፃነትን እና የዕለት ተዕለት የኑሮ ክህሎቶችን ጨምሮ አስፈላጊ ክህሎቶችን እንዲያዳብሩ የሚረዳ የግል አቀራረብ ነው።',
        ),
      },
      {
        id: 'speech-therapy',
        question: loc('Does the Center provide Speech Therapy?', 'ማዕከሉ የንግግር ቴራፒ ይሰጣል?'),
        answer: loc(
          'Yes. Our Speech and Language Therapy supports children in developing communication, language, and social interaction skills according to their individual needs.',
          'አዎ። የንግግር እና የቋንቋ ቴራፒያችን ልጆች እንደየግል ፍላጎታቸው የመግባቢያ፣ የቋንቋ እና የማህበራዊ መስተጋብር ክህሎቶችን እንዲያዳብሩ ይረዳቸዋል።',
        ),
      },
    ],
  },
];

export const FAQ_ITEM_COUNT = FAQ_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
