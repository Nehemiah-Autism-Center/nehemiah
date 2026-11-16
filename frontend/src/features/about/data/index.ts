import { loc } from '@/shared/i18n/localized';

/**
 * About page copy, verbatim from "website content.docx" (About page) except for the single
 * third-therapy correction noted below.
 *
 * Edit note (English): in the third paragraph "Occupational Therapy" became "Food Therapy".
 * Edit note (Amharic): "የሙያ ሕክምና (Occupational Therapy)" became the document's own Food Therapy
 * term "የምግብ አመጋገብ ቴራፒ (Food Therapy)". A space was inserted after "።" in paragraph 2
 * where the source ran two sentences together. Source spelling such as "ሁለተንናዊ" is left as supplied
 * (see NAC-CONTENT-APPROVAL-REGISTER.md).
 */
export const ABOUT_INTRO = loc<string[]>(
  [
    'Nehemiah Autism Center is an indigenous nonprofit organization established 15 years ago to support children and young people with autism and related developmental disorders, as well as their families, and to help protect them from the various social, psychological, and economic challenges they face. The Center was founded by parents who struggled to find schools that could provide appropriate education, training, and support for their children with autism. It operates with a vision of contributing its part to ensuring that children facing similar challenges do not experience severe health and social difficulties due to a lack of appropriate educational opportunities.',
    'Today, the Center provides comprehensive services to 90 children with autism and their parents, making a significant contribution toward easing the challenges they face. In addition, the Center works to address misconceptions about autism within the community through various awareness-raising initiatives and educational activities.',
    'Currently, the Center provides three main therapy services tailored to the individual needs and abilities of children on the autism spectrum: Applied Behavior Analysis (ABA), Speech and Language Therapy, and Food Therapy. These services help children develop their communication, behavioral, daily living, and other essential life skills. To date, the Center has successfully graduated more than 65 children, supporting them in transitioning to the next stage of their educational and life journey.',
  ],
  [
    'ነህምያ ኦቲዝም ማዕከል በኦቲዝምና ተዛማጅ ችግሮች የዐዕምሮ ዕድገት ስርዓት መዛባት የገጠማቸውን ህጻናትና ወጣቶች እንዲሁም ቤተሰቦቻቸውን ከተጋረጠባቸው ዘርፈብዙ ማህበራዊ፣ ስነልቦናዊና ኢኮኖሚያዊ ጉዳቶች ለመታደግ ከ15 ዓመታት በፊት የተቋቋመ ሃገር በቀል ምግባረሰናይ ድርጅት ነው። ይህ ማዕከል በኦቲዝም ጥላ ስር ላሉ ልጆቻቸው ስልጠና እና እገዛ የሚሰጥ ትምህርት ቤት ማግኘት ባልቻሉ ወላጆች የተቋቋመ ሲሆን በመሰል ችግር ውስጥ የሚገኙ ህጻናት በመማሪያ እጥረት ለከፋ የጤናና ማህበራዊ ቀውስ እንዳይጋለጡ የበኩሉን ድርሻ የማበርከት ራዕይ አንግቦ ይንቀሳቀሳል።',
    'ማዕከሉ በአሁኑ ወቅትም 90 በኦቲዝም ጥላ ስር ለሚገኙ ህጻናትና ለወላጆቻቸው ሁለተንናዊ አገልግሎቶችን በመስጠት የተጋረጠባቸውን ፈተና ለማቅለል ጉልህ አስተዋጽዖ እያበረከተ ነው። ከዚህ በተጨማሪም ኦቲዝምን በተመለከተ በህብረተሰቡ ውስጥ የሰፈነውን የተሳሳተ አረዳድ በልዩ ልዩ የግንዛቤ ማዳበሪያ መንገዶች ለመለወጥ ጥረት እያደረገ ይገኛል።',
    'በአሁኑ ወቅት ማዕከሉ በኦቲዝም ስፔክትረም ላይ ላሉ ህጻናት እንደየግል ፍላጎታቸውና አቅማቸው የተዘጋጁ ሦስት ዋና ዋና የቴራፒ አገልግሎቶችን—Applied Behavior Analysis (ABA)፣ የንግግርና የቋንቋ ቴራፒ (Speech Therapy) እና የምግብ አመጋገብ ቴራፒ (Food Therapy)—በመስጠት የልጆችን የመግባባት፣ የባህሪ፣ የዕለት ተዕለት ኑሮ እና ሌሎች አስፈላጊ ክህሎቶች እንዲዳብሩ ያግዛል። እስካሁንም ከ65 በላይ ህጻናትን በማስመረቅ ወደ ቀጣዩ የትምህርትና የሕይወት ጉዞአቸው እንዲሸጋገሩ ማገዝ ችሏል።',
  ],
);

/** Mission: two statements, split at the sentence boundary of the source text. */
export const ABOUT_MISSION = loc<string[]>(
  [
    'To provide early diagnosis and screening services, standard education and training, life skills and vocational skills that enable children with autism to live in the community without difficulties.',
    'To provide counseling service for families who are suffering from stressful life and discrimination as a result of being a parent of autistic child/children.',
  ],
  [
    'ኦቲዝም ላለባቸው ልጆች በማህበረሰቡ ውስጥ ያለ ከባድ ችግር ሳይገጥማቸው እንዲኖሩ የሚያስችሉ የቅድመ ምርመራና የማጣሪያ አገልግሎቶችን፣ ደረጃቸውን የጠበቁ የትምህርትና የሥልጠና አገልግሎቶችን፣ የሕይወት ክህሎትና የሙያ ክህሎት ሥልጠናዎችን መስጠት።',
    'እንዲሁም የኦቲዝም ልጅ/ልጆች ወላጅ በመሆናቸው ምክንያት ለሚያጋጥማቸው የሕይወት ጫና፣ ውጥረትና መድልዎ ለተጋለጡ ቤተሰቦች የምክርና የድጋፍ አገልግሎት መስጠት።',
  ],
);

/**
 * History: the only founding fact the document supports. The document left the English History
 * text blank, so the matching English sentence from its Introduction is used (NAC-CONTENT-APPROVAL-REGISTER.md, HI-01).
 * No dates, names, funders or milestones are stated because none were supplied.
 */
export const ABOUT_HISTORY = loc(
  'The Center was founded by parents who struggled to find schools that could provide appropriate education, training, and support for their children with autism.',
  'ይህ ማዕከል በኦቲዝም ጥላ ስር ላሉ ልጆቻቸው ስልጠና እና እገዛ የሚሰጥ ትምህርት ቤት ማግኘት ባልቻሉ ወላጆች የተቋቋመ',
);

/** Section headings. Amharic equivalents are provisional interface text. */
export const ABOUT_HEADINGS = {
  intro: { en: 'Introduction', am: 'መግቢያ', amProvisional: true },
  mission: { en: 'Our Mission', am: 'ተልዕኳችን', amProvisional: true },
  history: { en: 'Our History', am: 'ታሪካችን', amProvisional: true },
  services: loc('Services We Provide', 'የምንሰጣቸው አገልግሎቶች'),
  impact: loc('Our Impact', 'ያስመዘገብነው ውጤት'),
} as const;
