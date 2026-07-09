import aromatherapy from "@/assets/treatment-aromatherapy.jpg";
import deepTissue from "@/assets/treatment-deep-tissue.jpg";
import reflexology from "@/assets/treatment-reflexology.jpg";
import hotStone from "@/assets/treatment-hot-stone.jpg";
import sports from "@/assets/treatment-sports.jpg";
import pregnancy from "@/assets/treatment-pregnancy.jpg";
import hero from "@/assets/hero-cinematic.jpg";

export type JournalCategorySlug =
  | "massage-guides"
  | "sports-recovery"
  | "stress-sleep"
  | "senior-wellness"
  | "pregnancy-wellness"
  | "corporate-wellness"
  | "home-wellness"
  | "aftercare-advice"
  | "product-guides";

export const JOURNAL_CATEGORIES: {
  slug: JournalCategorySlug;
  label: string;
  intro: string;
}[] = [
  { slug: "massage-guides", label: "Massage Guides", intro: "Understand every treatment on our menu — and how to choose." },
  { slug: "sports-recovery", label: "Sports Recovery", intro: "Training loads, mobility and long-term performance." },
  { slug: "stress-sleep", label: "Stress & Sleep", intro: "Nervous-system rituals to help you rest, deeply." },
  { slug: "senior-wellness", label: "Senior Wellness", intro: "Considered care for changing bodies and slower recovery." },
  { slug: "pregnancy-wellness", label: "Pregnancy Wellness", intro: "Safe, expert massage through every trimester." },
  { slug: "corporate-wellness", label: "Corporate Wellness", intro: "In-office massage programmes for modern teams." },
  { slug: "home-wellness", label: "Home Wellness", intro: "Elevating the everyday ritual inside your home." },
  { slug: "aftercare-advice", label: "Aftercare Advice", intro: "What to do — and avoid — after your treatment." },
  { slug: "product-guides", label: "Product Guides", intro: "Recovery tools, oils and objects we trust." },
];

export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategorySlug;
  categoryLabel: string;
  author: string;
  authorRole: string;
  readingMinutes: number;
  publishedOn: string; // ISO
  image: string;
  featured?: boolean;
  relatedTreatments?: string[]; // treatment slugs
  disclaimer?: boolean;
  toc: { id: string; label: string }[];
  body: { id: string; heading: string; paragraphs: string[] }[];
};

const label = (slug: JournalCategorySlug) =>
  JOURNAL_CATEGORIES.find((c) => c.slug === slug)!.label;

function article(
  a: Omit<JournalArticle, "categoryLabel">,
): JournalArticle {
  return { ...a, categoryLabel: label(a.category) };
}

const standardToc = [
  { id: "overview", label: "Overview" },
  { id: "what-to-expect", label: "What to expect" },
  { id: "who-it-suits", label: "Who it suits" },
  { id: "aftercare", label: "Aftercare" },
];

const standardBody = (topic: string) => [
  {
    id: "overview",
    heading: "Overview",
    paragraphs: [
      `${topic} is one of the most requested treatments across our London practice. In this guide, our senior therapists walk you through the principles, the sensation and the outcomes you can reasonably expect.`,
      `Every therapist on the Lythe platform is qualified, insured and clinically trained. What follows is our shared standard of care — the same one we bring into every home, hotel and boardroom we visit.`,
    ],
  },
  {
    id: "what-to-expect",
    heading: "What to expect",
    paragraphs: [
      "A treatment begins with a short, considered consultation. Your therapist asks about your goals, recent injuries and how your body feels today. Only then does the work begin — always at a pressure and pace that suits you.",
      "The room is prepared with quiet music, warm towels and clean, unscented linen. You remain draped throughout, with only the area being worked exposed.",
    ],
  },
  {
    id: "who-it-suits",
    heading: "Who it suits",
    paragraphs: [
      "Most healthy adults are excellent candidates. If you are pregnant, recovering from surgery, managing a chronic condition or taking blood thinners, please tell us in advance — we will match you with a therapist trained for your situation.",
    ],
  },
  {
    id: "aftercare",
    heading: "Aftercare",
    paragraphs: [
      "Hydrate generously in the hours that follow. Avoid strenuous training for 24 hours. A warm bath with Epsom salts can extend the release, and an early night compounds the benefit.",
    ],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  article({
    slug: "what-is-deep-tissue-massage",
    title: "What Is Deep Tissue Massage?",
    excerpt: "A clinical look at the technique, its benefits, and when it belongs in your recovery plan.",
    category: "massage-guides",
    author: "Elena Marchetti",
    authorRole: "Senior Clinical Therapist",
    readingMinutes: 7,
    publishedOn: "2026-05-14",
    image: deepTissue,
    featured: true,
    relatedTreatments: ["deep-tissue-massage", "therapeutic-massage", "sports-massage"],
    disclaimer: true,
    toc: standardToc,
    body: standardBody("Deep tissue massage"),
  }),
  article({
    slug: "swedish-vs-deep-tissue",
    title: "Swedish Massage vs Deep Tissue Massage",
    excerpt: "Two of the world's most requested treatments — and how to choose the one your body needs today.",
    category: "massage-guides",
    author: "Marcus Whitfield",
    authorRole: "Head of Clinical Practice",
    readingMinutes: 6,
    publishedOn: "2026-05-08",
    image: aromatherapy,
    relatedTreatments: ["swedish-massage", "deep-tissue-massage"],
    toc: standardToc,
    body: standardBody("Swedish and deep tissue massage"),
  }),
  article({
    slug: "sports-massage-after-running",
    title: "Sports Massage After Running",
    excerpt: "How post-run bodywork accelerates recovery, protects mileage and keeps injuries at bay.",
    category: "sports-recovery",
    author: "James Okafor",
    authorRole: "Sports Therapist",
    readingMinutes: 8,
    publishedOn: "2026-04-30",
    image: sports,
    featured: true,
    relatedTreatments: ["sports-massage", "post-event-massage", "muscle-recovery"],
    toc: standardToc,
    body: standardBody("Post-run sports massage"),
  }),
  article({
    slug: "massage-for-office-workers",
    title: "Massage for Office Workers",
    excerpt: "The desk-body pattern our therapists see every day — and the treatments that reverse it.",
    category: "corporate-wellness",
    author: "Priya Chandra",
    authorRole: "Corporate Wellness Lead",
    readingMinutes: 5,
    publishedOn: "2026-04-22",
    image: deepTissue,
    relatedTreatments: ["back-neck-shoulder", "chair-massage", "corporate-seated-massage"],
    toc: standardToc,
    body: standardBody("Massage for desk-based work"),
  }),
  article({
    slug: "massage-for-better-sleep",
    title: "How Massage Can Support Better Sleep",
    excerpt: "The science of the parasympathetic switch — and the rituals that help you fall asleep faster.",
    category: "stress-sleep",
    author: "Dr. Amelia Rowe",
    authorRole: "Wellness Advisor",
    readingMinutes: 6,
    publishedOn: "2026-04-15",
    image: aromatherapy,
    featured: true,
    relatedTreatments: ["aromatherapy-massage", "stress-relief-massage", "relaxation-massage"],
    disclaimer: true,
    toc: standardToc,
    body: standardBody("Massage for sleep"),
  }),
  article({
    slug: "pregnancy-massage-safety-guide",
    title: "Pregnancy Massage Safety Guide",
    excerpt: "Every question we're asked about trimesters, positioning, essential oils and contraindications.",
    category: "pregnancy-wellness",
    author: "Sophie Delacroix",
    authorRole: "Prenatal Specialist",
    readingMinutes: 9,
    publishedOn: "2026-04-08",
    image: pregnancy,
    relatedTreatments: ["pregnancy-massage", "postnatal-massage"],
    disclaimer: true,
    toc: standardToc,
    body: standardBody("Pregnancy massage"),
  }),
  article({
    slug: "senior-wellness-massage-guide",
    title: "Senior Wellness Massage Guide",
    excerpt: "Gentle, respectful treatments designed for changing bodies and slower recovery.",
    category: "senior-wellness",
    author: "Elena Marchetti",
    authorRole: "Senior Clinical Therapist",
    readingMinutes: 7,
    publishedOn: "2026-03-30",
    image: reflexology,
    relatedTreatments: ["senior-massage", "gentle-therapeutic", "mobility-support"],
    disclaimer: true,
    toc: standardToc,
    body: standardBody("Senior wellness massage"),
  }),
  article({
    slug: "hotel-massage-london-what-to-expect",
    title: "Hotel Massage in London: What to Expect",
    excerpt: "From concierge coordination to therapist arrival — the anatomy of an in-suite treatment.",
    category: "home-wellness",
    author: "Marcus Whitfield",
    authorRole: "Head of Clinical Practice",
    readingMinutes: 5,
    publishedOn: "2026-03-22",
    image: hotStone,
    relatedTreatments: ["swedish-massage", "aromatherapy-massage", "couples-massage"],
    toc: standardToc,
    body: standardBody("Hotel massage in London"),
  }),
  article({
    slug: "home-massage-aftercare-tips",
    title: "Home Massage Aftercare Tips",
    excerpt: "Nine small rituals in the 24 hours after treatment that make the release last twice as long.",
    category: "aftercare-advice",
    author: "Priya Chandra",
    authorRole: "Corporate Wellness Lead",
    readingMinutes: 4,
    publishedOn: "2026-03-14",
    image: aromatherapy,
    relatedTreatments: ["swedish-massage", "deep-tissue-massage"],
    toc: standardToc,
    body: standardBody("Home massage aftercare"),
  }),
  article({
    slug: "best-massage-for-neck-shoulder-tension",
    title: "Best Massage for Neck and Shoulder Tension",
    excerpt: "The three treatments our clinical team recommends for chronic upper-body tightness.",
    category: "massage-guides",
    author: "James Okafor",
    authorRole: "Sports Therapist",
    readingMinutes: 6,
    publishedOn: "2026-03-06",
    image: deepTissue,
    relatedTreatments: ["back-neck-shoulder", "trigger-point-therapy", "deep-tissue-massage"],
    toc: standardToc,
    body: standardBody("Neck and shoulder massage"),
  }),
  article({
    slug: "corporate-wellness-massage-teams",
    title: "Corporate Wellness Massage for Teams",
    excerpt: "How London's most demanding companies use on-site massage to protect focus and retention.",
    category: "corporate-wellness",
    author: "Priya Chandra",
    authorRole: "Corporate Wellness Lead",
    readingMinutes: 6,
    publishedOn: "2026-02-27",
    image: deepTissue,
    relatedTreatments: ["chair-massage", "corporate-seated-massage"],
    toc: standardToc,
    body: standardBody("Corporate massage programmes"),
  }),
  article({
    slug: "reflexology-beginner-guide",
    title: "Reflexology Beginner Guide",
    excerpt: "The maps beneath your feet — a considered introduction to ancient pressure-point therapy.",
    category: "massage-guides",
    author: "Sophie Delacroix",
    authorRole: "Prenatal Specialist",
    readingMinutes: 7,
    publishedOn: "2026-02-19",
    image: reflexology,
    relatedTreatments: ["reflexology", "foot-massage"],
    toc: standardToc,
    body: standardBody("Reflexology"),
  }),
  article({
    slug: "aromatherapy-massage-guide",
    title: "Aromatherapy Massage Guide",
    excerpt: "How bespoke botanical blends turn a full-body treatment into a nervous-system reset.",
    category: "massage-guides",
    author: "Elena Marchetti",
    authorRole: "Senior Clinical Therapist",
    readingMinutes: 6,
    publishedOn: "2026-02-11",
    image: aromatherapy,
    relatedTreatments: ["aromatherapy-massage", "relaxation-massage"],
    toc: standardToc,
    body: standardBody("Aromatherapy massage"),
  }),
  article({
    slug: "massage-gift-cards-guide",
    title: "Massage Gift Cards Guide",
    excerpt: "Choosing the right treatment, therapist and moment — a considered gift for anyone who works too hard.",
    category: "product-guides",
    author: "Marcus Whitfield",
    authorRole: "Head of Clinical Practice",
    readingMinutes: 4,
    publishedOn: "2026-02-04",
    image: hero,
    relatedTreatments: ["swedish-massage", "aromatherapy-massage"],
    toc: standardToc,
    body: standardBody("Massage gift cards"),
  }),
  article({
    slug: "how-to-choose-a-massage-therapist",
    title: "How to Choose a Massage Therapist",
    excerpt: "Credentials, chemistry and specialism — the four questions worth asking before you book.",
    category: "massage-guides",
    author: "Marcus Whitfield",
    authorRole: "Head of Clinical Practice",
    readingMinutes: 5,
    publishedOn: "2026-01-27",
    image: aromatherapy,
    relatedTreatments: ["swedish-massage", "deep-tissue-massage", "sports-massage"],
    toc: standardToc,
    body: standardBody("Choosing a massage therapist"),
  }),
  article({
    slug: "massage-for-stress-relief",
    title: "Massage for Stress Relief",
    excerpt: "The therapies our clients return to when a demanding week has pushed the nervous system past its edge.",
    category: "stress-sleep",
    author: "Dr. Amelia Rowe",
    authorRole: "Wellness Advisor",
    readingMinutes: 6,
    publishedOn: "2026-01-19",
    image: aromatherapy,
    relatedTreatments: ["stress-relief-massage", "aromatherapy-massage", "indian-head-massage"],
    disclaimer: true,
    toc: standardToc,
    body: standardBody("Massage for stress relief"),
  }),
  article({
    slug: "recovery-tools-for-home",
    title: "Recovery Tools for Home",
    excerpt: "The foam rollers, percussion guns and mobility objects our therapists actually use themselves.",
    category: "product-guides",
    author: "James Okafor",
    authorRole: "Sports Therapist",
    readingMinutes: 5,
    publishedOn: "2026-01-11",
    image: sports,
    relatedTreatments: ["sports-massage", "muscle-recovery", "stretching-mobility"],
    toc: standardToc,
    body: standardBody("Home recovery tools"),
  }),
  article({
    slug: "what-to-wear-for-a-home-massage",
    title: "What to Wear for a Home Massage",
    excerpt: "A short primer on comfort, modesty and the small choices that let you fully arrive.",
    category: "home-wellness",
    author: "Elena Marchetti",
    authorRole: "Senior Clinical Therapist",
    readingMinutes: 3,
    publishedOn: "2026-01-04",
    image: aromatherapy,
    relatedTreatments: ["swedish-massage", "relaxation-massage"],
    toc: standardToc,
    body: standardBody("What to wear for a home massage"),
  }),
];

export const FEATURED_ARTICLES = JOURNAL_ARTICLES.filter((a) => a.featured);

export function articleBySlug(slug: string) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}

export function articlesByCategory(slug: JournalCategorySlug) {
  return JOURNAL_ARTICLES.filter((a) => a.category === slug);
}

export function relatedArticles(current: JournalArticle, count = 3) {
  return JOURNAL_ARTICLES.filter(
    (a) => a.slug !== current.slug && a.category === current.category,
  )
    .concat(JOURNAL_ARTICLES.filter((a) => a.slug !== current.slug))
    .filter((a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i)
    .slice(0, count);
}
