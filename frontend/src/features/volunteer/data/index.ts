import { loc, type Localized } from '@/shared/i18n/localized';

export interface VolunteerRole {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
}

/** Introduction, verbatim from "website content.docx" (Volunteer page). */
export const VOLUNTEER_INTRO = loc(
  'Volunteering at Nehemiah Autism Center is an opportunity to support children with autism and their families through meaningful activities, learning, care, and community engagement. Volunteers contribute their time and skills while gaining a deeper understanding of autism and making a positive difference in the lives of the children we serve.',
  'በነህምያ ኦቲዝም ማዕከል በጎ ፈቃደኝነት ማለት ኦቲዝም ላለባቸው ልጆችና ለቤተሰቦቻቸው በትምህርት፣ በእንክብካቤ፣ በተለያዩ ተግባራትና በማህበራዊ ተሳትፎ ድጋፍ ለማድረግ ጊዜና ክህሎትን በፈቃደኝነት ማበርከት ነው። በጎ ፈቃደኞች ለልጆች ሕይወት አዎንታዊ ለውጥ ከማምጣት በተጨማሪ ስለ ኦቲዝም የበለጠ ግንዛቤና ተሞክሮ ያገኛሉ።',
);

/** The five volunteer role categories, verbatim from the document. */
export const VOLUNTEER_ROLES: readonly VolunteerRole[] = [
  {
    id: 'classroom',
    title: loc('Classroom & Learning Support', 'የክፍልና የትምህርት ድጋፍ'),
    description: loc(
      'Assist teachers and therapists during learning activities, help children participate, and provide one-on-one support when needed.',
      'በትምህርት እንቅስቃሴዎች ወቅት መምህራንንና ቴራፒስቶችን መርዳት፣ ልጆች በእንቅስቃሴዎቹ በንቃት እንዲሳተፉ ማገዝ እና በሚያስፈልግ ጊዜ ለአንድ ልጅ በተናጠል ድጋፍ መስጠት።',
    ),
  },
  {
    id: 'child-care',
    title: loc('Child Support & Care', 'የልጆች ድጋፍና እንክብካቤ'),
    description: loc(
      'Provide supportive assistance during daily routines, transitions, and activities while following the guidance of the Center’s professional staff.',
      'በዕለት ተዕለት ሥርዓቶች፣ ከአንድ እንቅስቃሴ ወደ ሌላ በሚሸጋገሩበት ጊዜ እና በተለያዩ እንቅስቃሴዎች ወቅት የድጋፍ እርዳታ መስጠት፤ ይህንንም በማዕከሉ ባለሙያዎች መመሪያ መሠረት ማከናወን።',
    ),
  },
  {
    id: 'events-outreach',
    title: loc(
      'Event, Fundraising & Community Outreach Support',
      'የዝግጅት፣ የገንዘብ ማሰባሰብና የማህበረሰብ ተሳትፎ ድጋፍ',
    ),
    description: loc(
      'Help with awareness campaigns, fundraising activities, community events, and programs that promote understanding and acceptance of autism.',
      'የግንዛቤ ማስጨበጫ ዘመቻዎችን፣ የገንዘብ ማሰባሰብ ሥራዎችን፣ የማህበረሰብ ዝግጅቶችንና ኦቲዝምን በትክክል እንዲረዱና እንዲቀበሉ የሚያበረታቱ ፕሮግራሞችን ማገዝ።',
    ),
  },
  {
    id: 'media-admin',
    title: loc('Media & Administrative Support', 'የሚዲያና የአስተዳደር ድጋፍ'),
    description: loc(
      'Assist with photography, video, social media content, documentation, data entry, or other administrative tasks that help the Center operate effectively.',
      'ፎቶግራፍና ቪዲዮ በመቅረጽ፣ የማህበራዊ ሚዲያ ይዘቶችን በማዘጋጀት፣ ሰነዶችን በማደራጀት፣ መረጃዎችን በማስገባት እና ማዕከሉ በተቀላጠፈ ሁኔታ እንዲሠራ በሚያግዙ ሌሎች የአስተዳደር ሥራዎች መሳተፍ።',
    ),
  },
  {
    id: 'technology',
    title: loc('Technology & Digital Support', 'የቴክኖሎጂና የዲጂታል ድጋፍ'),
    description: loc(
      'Help with basic computer tasks, digital documents, presentations, website content, social media, or other technology-related activities.',
      'በመሠረታዊ የኮምፒውተር ሥራዎች፣ ዲጂታል ሰነዶችንና ማቅረቢያዎችን በማዘጋጀት፣ የድረ-ገጽ ይዘቶችንና የማህበራዊ ሚዲያ ይዘቶችን በማስተዳደር እንዲሁም ከቴክኖሎጂ ጋር በተያያዙ ሌሎች ሥራዎች ላይ ድጋፍ መስጠት።',
    ),
  },
];

/**
 * There is no online volunteer application: the previous form never reached a server. Until a
 * backend exists, interested people are sent to the Center. English only (no approved Amharic).
 */
export const VOLUNTEER_HOW_TO = {
  heading: loc('How to get involved'),
  body: loc(
    'There is no online volunteer application yet. To volunteer, write to the Center, call us, or visit during opening hours and we will explain how you can help.',
  ),
} as const;
