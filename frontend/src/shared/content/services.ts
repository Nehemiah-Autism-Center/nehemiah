import { loc, type Localized } from '@/shared/i18n/localized';

export type ServiceId = 'aba' | 'speech' | 'food';

export interface Service {
  id: ServiceId;
  name: Localized<string>;
  description: Localized<string>;
}

/**
 * The center's three principal therapy services (confirmed organisational decision):
 * Applied Behavior Analysis, Speech and Language Therapy, Food Therapy.
 * Every page that names the services must read from this list so they cannot drift apart.
 * Descriptions are taken from the "Services overview" of the About page in the content document.
 */
export const SERVICES: readonly Service[] = [
  {
    id: 'aba',
    name: loc('Applied Behavior Analysis (ABA)', 'የተግባር ትንተና ቴራፒ'),
    description: loc(
      'Individualized ABA-based programs that improve communication, behavior, and essential life skills for each child on the spectrum.',
      'በኦቲዝም ስፔክትረም ላይ ላሉ እያንዳንዱ ልጆች ፍላጎትና አቅም መሠረት የተዘጋጁ የABA ፕሮግራሞች፣ የመግባባት ችሎታን፣ ባህሪን እና አስፈላጊ የዕለት ተዕለት ኑሮ ክህሎቶችን ለማሻሻል ይረዳሉ።',
    ),
  },
  {
    id: 'speech',
    name: loc('Speech and Language Therapy', 'የንግግርና የቋንቋ ቴራፒ'),
    description: loc(
      "Structured support for language development, communication skills, and social interaction tailored to each child's needs.",
      'እያንዳንዱ ልጅ ባለው ፍላጎት መሠረት የቋንቋ እድገትን፣ የመግባባት ችሎታን እና ከሌሎች ጋር የመግባባትና የመስተጋብር ክህሎትን ለማዳበር የተዋቀረ ድጋፍ።',
    ),
  },
  {
    id: 'food',
    name: loc('Food Therapy', 'የምግብ አመጋገብ ቴራፒ'),
    description: loc(
      'Specialized programs to address feeding challenges, improve nutrition, and build tolerance for a wider range of foods.',
      'የአመጋገብ ችግሮችን ለመቅረፍ፣ የተመጣጠነ አመጋገብን ለማሻሻል እና ልጆች የተለያዩ ዓይነት ምግቦችን በተሻለ ሁኔታ እንዲቀበሉ ለማገዝ የተዘጋጁ ልዩ ፕሮግራሞች።',
    ),
  },
];

export const SERVICE_NAMES_EN = SERVICES.map((s) => s.name.en);
