import therapistPortrait from "@/assets/therapist-portrait.jpg";

export type Therapist = {
  slug: string;
  name: string;
  photo: string;
  headline: string;
  bio: string;
  gender: "female" | "male" | "non-binary";
  languages: string[];
  qualifications: string[];
  yearsExperience: number;
  specialities: string[];
  treatments: string[]; // treatment slugs
  coverage: string[]; // areas
  visitTypes: Array<"home" | "hotel" | "office" | "corporate" | "event">;
  rating: number;
  reviewsCount: number;
  responseTimeMinutes: number;
  verified: boolean;
  priceFrom: number;
  nextAvailable: string;
};

export const THERAPISTS: Therapist[] = [
  {
    slug: "amara-okafor",
    name: "Amara Okafor",
    photo: therapistPortrait,
    headline: "Deep tissue & clinical rehabilitation specialist",
    bio: "With over a decade in clinical practice, Amara blends deep-tissue technique with rehabilitation science. She works with runners, cyclists and post-surgical clients across Central London.",
    gender: "female",
    languages: ["English", "French", "Yoruba"],
    qualifications: ["BSc Sports Therapy", "Level 4 Clinical Massage", "MTI Registered"],
    yearsExperience: 11,
    specialities: ["Deep Tissue", "Rehabilitation", "Sports Recovery"],
    treatments: ["deep-tissue-massage", "sports-massage", "remedial-massage", "trigger-point-therapy"],
    coverage: ["Mayfair", "Marylebone", "Chelsea", "Kensington", "Belgravia"],
    visitTypes: ["home", "hotel", "office", "corporate"],
    rating: 4.9,
    reviewsCount: 148,
    responseTimeMinutes: 12,
    verified: true,
    priceFrom: 95,
    nextAvailable: "Today, 6:30pm",
  },
  {
    slug: "hana-yamamoto",
    name: "Hana Yamamoto",
    photo: therapistPortrait,
    headline: "Aromatherapy & luxury ritual practitioner",
    bio: "Trained in Japan and London, Hana designs multi-sensory rituals for stress recovery, sleep and emotional balance — favoured by hotel guests and long-standing private members.",
    gender: "female",
    languages: ["English", "Japanese", "Mandarin"],
    qualifications: ["ITEC Level 3 Aromatherapy", "Reiki Master", "CIBTAC Anatomy"],
    yearsExperience: 9,
    specialities: ["Aromatherapy", "Relaxation", "Sleep & Stress"],
    treatments: ["aromatherapy-massage", "swedish-massage", "hot-stone-massage", "relaxation-massage"],
    coverage: ["Mayfair", "Knightsbridge", "Covent Garden", "Soho", "Fitzrovia"],
    visitTypes: ["home", "hotel", "event"],
    rating: 5.0,
    reviewsCount: 96,
    responseTimeMinutes: 18,
    verified: true,
    priceFrom: 105,
    nextAvailable: "Tomorrow, 10:00am",
  },
  {
    slug: "sofia-alvarez",
    name: "Sofia Álvarez",
    photo: therapistPortrait,
    headline: "Prenatal & postnatal wellness specialist",
    bio: "A registered prenatal specialist trusted by London's leading midwifery networks. Sofia delivers safe, considered massage through every trimester and postpartum stage.",
    gender: "female",
    languages: ["English", "Spanish", "Portuguese"],
    qualifications: ["Level 4 Prenatal Massage", "Postnatal Recovery Cert.", "First Aid (Paediatric)"],
    yearsExperience: 8,
    specialities: ["Pregnancy", "Postnatal", "Women's Wellness"],
    treatments: ["pregnancy-massage", "postnatal-massage", "stress-relief-massage"],
    coverage: ["Chelsea", "Fulham", "Notting Hill", "Hampstead", "St John's Wood"],
    visitTypes: ["home", "hotel"],
    rating: 4.9,
    reviewsCount: 74,
    responseTimeMinutes: 22,
    verified: true,
    priceFrom: 110,
    nextAvailable: "Today, 4:00pm",
  },
  {
    slug: "james-mackenzie",
    name: "James MacKenzie",
    photo: therapistPortrait,
    headline: "Sports & performance recovery therapist",
    bio: "Former lead therapist for a Premiership rugby squad. James works with athletes, executives and desk-bound professionals to restore mobility and prevent long-term injury.",
    gender: "male",
    languages: ["English"],
    qualifications: ["BSc Sports Science", "Level 5 Sports Massage", "Kinesio Taping Cert."],
    yearsExperience: 14,
    specialities: ["Sports", "Deep Tissue", "Executive Recovery"],
    treatments: ["sports-massage", "pre-event-massage", "post-event-massage", "deep-tissue-massage"],
    coverage: ["Canary Wharf", "The City", "Shoreditch", "Islington", "King's Cross"],
    visitTypes: ["home", "office", "corporate", "event"],
    rating: 4.8,
    reviewsCount: 212,
    responseTimeMinutes: 9,
    verified: true,
    priceFrom: 100,
    nextAvailable: "Today, 7:15pm",
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    photo: therapistPortrait,
    headline: "Reflexology & holistic wellness",
    bio: "Trained in traditional Indian and Chinese pressure-point therapy. Priya works with clients navigating hormonal, digestive and sleep imbalances alongside chronic stress.",
    gender: "female",
    languages: ["English", "Hindi", "Punjabi"],
    qualifications: ["ITEC Reflexology", "Indian Head Massage Dip.", "Level 3 Holistic Therapy"],
    yearsExperience: 12,
    specialities: ["Reflexology", "Indian Head", "Hormonal Balance"],
    treatments: ["reflexology", "indian-head-massage", "foot-massage", "stress-relief-massage"],
    coverage: ["Marylebone", "Fitzrovia", "Hampstead", "Camden", "Islington"],
    visitTypes: ["home", "hotel", "office"],
    rating: 4.9,
    reviewsCount: 131,
    responseTimeMinutes: 15,
    verified: true,
    priceFrom: 90,
    nextAvailable: "Tomorrow, 9:30am",
  },
  {
    slug: "elena-rossi",
    name: "Elena Rossi",
    photo: therapistPortrait,
    headline: "Senior wellness & mobility care",
    bio: "Elena specialises in gentle, low-pressure therapy for older adults and those with limited mobility, working closely with families and private carers.",
    gender: "female",
    languages: ["English", "Italian"],
    qualifications: ["Level 3 Holistic Massage", "Geriatric Care Cert.", "Enhanced DBS"],
    yearsExperience: 15,
    specialities: ["Senior Care", "Mobility", "Gentle Therapeutic"],
    treatments: ["senior-massage", "gentle-therapeutic", "mobility-support", "relaxation-older-adults"],
    coverage: ["Kensington", "Chelsea", "Belgravia", "Wimbledon", "Richmond"],
    visitTypes: ["home"],
    rating: 5.0,
    reviewsCount: 63,
    responseTimeMinutes: 28,
    verified: true,
    priceFrom: 90,
    nextAvailable: "Tomorrow, 11:00am",
  },
  {
    slug: "david-chen",
    name: "David Chen",
    photo: therapistPortrait,
    headline: "Corporate & seated massage lead",
    bio: "David leads on-site wellness programmes for finance, legal and tech teams across the City and Canary Wharf, with a specialism in postural and screen-fatigue recovery.",
    gender: "male",
    languages: ["English", "Mandarin", "Cantonese"],
    qualifications: ["Level 4 Sports Massage", "Chair Massage Practitioner", "Ergonomics Cert."],
    yearsExperience: 10,
    specialities: ["Corporate", "Chair Massage", "Postural"],
    treatments: ["chair-massage", "corporate-seated-massage", "back-neck-shoulder", "trigger-point-therapy"],
    coverage: ["The City", "Canary Wharf", "Shoreditch", "Paddington", "Victoria"],
    visitTypes: ["office", "corporate", "event"],
    rating: 4.8,
    reviewsCount: 189,
    responseTimeMinutes: 11,
    verified: true,
    priceFrom: 60,
    nextAvailable: "Today, 5:00pm",
  },
  {
    slug: "olivia-fournier",
    name: "Olivia Fournier",
    photo: therapistPortrait,
    headline: "Myofascial & remedial specialist",
    bio: "Olivia combines slow, sustained myofascial release with clinical assessment — trusted by physios and osteopaths for handover care in West London.",
    gender: "female",
    languages: ["English", "French"],
    qualifications: ["Level 5 Remedial Massage", "Myofascial Release Cert.", "MTI Registered"],
    yearsExperience: 13,
    specialities: ["Myofascial", "Remedial", "Chronic Pain"],
    treatments: ["myofascial-release", "remedial-massage", "therapeutic-massage", "deep-tissue-massage"],
    coverage: ["Notting Hill", "Kensington", "Hammersmith", "Chiswick", "Fulham"],
    visitTypes: ["home", "hotel", "office"],
    rating: 4.9,
    reviewsCount: 108,
    responseTimeMinutes: 16,
    verified: true,
    priceFrom: 105,
    nextAvailable: "Tomorrow, 2:00pm",
  },
];

export function getTherapist(slug: string) {
  return THERAPISTS.find((t) => t.slug === slug);
}

export const ALL_LANGUAGES = Array.from(
  new Set(THERAPISTS.flatMap((t) => t.languages)),
).sort();

export const ALL_COVERAGE = Array.from(
  new Set(THERAPISTS.flatMap((t) => t.coverage)),
).sort();
