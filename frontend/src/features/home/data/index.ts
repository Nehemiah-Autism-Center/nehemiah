import { loc, locProvisional } from '@/shared/i18n/localized';
import { ORGANIZATION_FIGURES } from '@/shared/content/organization';

/**
 * Homepage copy, verbatim from "website content.docx" (Homepage).
 * The hero heading is split at its em dash so it can be set in two sizes; the words are unchanged:
 *   "Welcome to Nehemiah Autism Center—where autistic children are empowered ..."
 */
export const HERO = {
  headline: loc('Welcome to Nehemiah Autism Center', 'ወደ ነህምያ ኦቲዝም ማዕከል እንኳን በደህና መጡ'),
  /** Continuation of the heading after the em dash (shown with a capital first letter via CSS). */
  continuation: loc(
    'where autistic children are empowered through care, education, and individualized support, families are strengthened with hope and guidance, and communities grow in understanding, inclusion, and the belief that every child deserves to be safe, strong, valued, and empowered.',
    'በዚህ ኦቲዝም ጥላ ሥር ያሉ ልጆች በእንክብካቤ፣ በትምህርትና ለእያንዳንዳቸው በተዘጋጁ የድጋፍ ፕሮግራሞች የሚበረታቱበት፣ ቤተሰቦች በተስፋና በምክር የሚደገፉበት፣ ማኅበረሰቡም ግንዛቤን፣ አካታችነትንና እያንዳንዱ ልጅ ደህንነቱ የተጠበቀ፣ ጠንካራና ዋጋ ያለው መሆኑን የሚያምንበት ቦታ ነው።',
  ),
  /** The two hero paragraphs: what the Center does, then the invitation to support it. */
  intro: loc(
    'At Nehemiah Autism Center, we work to create a better future for autistic children and their families in Ethiopia. We provide individualized care, education, therapy, family support, and awareness programs that help children develop their abilities and reach their potential. Founded by families who understand these challenges firsthand, we are committed to building a more inclusive and supportive society where every autistic child is safe, strong, and valued.',
    'በነህምያ ኦቲዝም ማዕከል፣ በኢትዮጵያ የሚኖሩ በኦቲዝም ጥላ ሥር ያሉ ሕፃናትና ቤተሰቦቻቸው የተሻለ ወደፊት እንዲኖራቸው እንሠራለን። ለሕፃናቱ በግል ፍላጎታቸው መሠረት ትምህርት፣ እንክብካቤ፣ ሕክምናዊ ድጋፍ፣ ለቤተሰቦች ምክርና ድጋፍ እንዲሁም የግንዛቤ ማስፋፊያ ሥራዎችን እናቀርባለን።',
  ),
  invitation: loc(
    'Join us in making a difference—support Nehemiah Autism Center and help us continue providing hope, care, and opportunities to children living with autism across Ethiopia.',
    'እናንተም ከእኛ ጋር በመሆን ነህምያ ኦቲዝም ማዕከልን ይደግፉ፤ በኦቲዝም ጥላ ሥር ላሉ ሕፃናት ተስፋ፣ እንክብካቤና የተሻለ እድል በጋራ እንፍጠር።',
  ),
} as const;

/** Closing call to action, verbatim from the document. */
export const CLOSING_CTA = {
  heading: loc('Help Us Reach More Children', 'ብዙ ልጆች እንድንደርስ ያግዙን'),
  body: loc(
    'Our work provides free teaching, therapy, transportation, and support for children and families who need it most. Your support can help us reach more autistic children and bring hope and opportunity within their reach.',
    'ሥራችን በጣም ለሚፈልጉት ልጆችና ቤተሰቦቻቸው ነፃ ትምህርት፣ ሕክምናዊ ቴራፒ፣ የመጓጓዣ አገልግሎትና ድጋፍ ያቀርባል። የእርስዎ ድጋፍ ብዙ ኦቲዝም ያላቸው ልጆች ዘንድ እንድንደርስ እና ተስፋንና ዕድልን በቀላሉ እንዲያገኙ ለማስቻል ያግዛል።',
  ),
} as const;

/**
 * Impact figures drawn from the About text and site description. Pending organisational
 * confirmation (NAC-CONTENT-APPROVAL-REGISTER.md, ST-01..ST-03). Amharic labels are provisional.
 */
export const IMPACT_STATS = [
  {
    id: 'supported',
    value: String(ORGANIZATION_FIGURES.childrenSupported),
    label: locProvisional('Children supported today', 'አሁን የሚደገፉ ህጻናት'),
  },
  {
    id: 'graduated',
    value: `${ORGANIZATION_FIGURES.childrenGraduated}+`,
    label: locProvisional('Children graduated', 'የተመረቁ ህጻናት'),
  },
  {
    id: 'years',
    value: String(ORGANIZATION_FIGURES.yearsSinceFounding),
    label: locProvisional('Years since the Center was founded', 'ማዕከሉ ከተቋቋመ ዓመታት'),
  },
] as const;

/** Small connective labels on the homepage. English only where the document gives no Amharic. */
export const HOME_COPY = {
  aboutLink: loc('Learn more about us'),
  viewAllEvents: loc('View all events'),
  viewAllPosts: loc('View all posts'),
};
