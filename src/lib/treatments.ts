import deepTissue from "@/assets/treatment-deep-tissue.jpg";
import aromatherapy from "@/assets/treatment-aromatherapy.jpg";
import reflexology from "@/assets/treatment-reflexology.jpg";
import hotStone from "@/assets/treatment-hot-stone.jpg";
import sports from "@/assets/treatment-sports.jpg";
import pregnancy from "@/assets/treatment-pregnancy.jpg";

export type TreatmentCategorySlug =
  | "luxury-relaxation"
  | "pain-relief"
  | "sports-recovery"
  | "senior-wellness"
  | "womens-wellness"
  | "specialist";

export type Treatment = {
  slug: string;
  name: string;
  category: TreatmentCategorySlug;
  categoryLabel: string;
  description: string;
  bestFor: string;
  durations: number[]; // minutes
  priceFrom: number; // GBP
  image: string;
  featured?: boolean;
};

export const TREATMENT_CATEGORIES: {
  slug: TreatmentCategorySlug;
  label: string;
  eyebrow: string;
  intro: string;
}[] = [
  {
    slug: "luxury-relaxation",
    label: "Luxury & Relaxation",
    eyebrow: "Restoration",
    intro:
      "Slow, sensory rituals designed to quiet the nervous system and return the body to stillness.",
  },
  {
    slug: "pain-relief",
    label: "Pain Relief & Therapeutic",
    eyebrow: "Clinical Relief",
    intro:
      "Targeted therapeutic work for chronic tension, postural strain and everyday muscular pain.",
  },
  {
    slug: "sports-recovery",
    label: "Sports & Recovery",
    eyebrow: "Performance",
    intro:
      "Pre-event, post-event and rehabilitation work for athletes and active professionals.",
  },
  {
    slug: "senior-wellness",
    label: "Senior & Gentle Wellness",
    eyebrow: "Gentle Care",
    intro:
      "Considered, low-pressure therapy focused on mobility, comfort and quality of life.",
  },
  {
    slug: "womens-wellness",
    label: "Women's Wellness",
    eyebrow: "Care Through Every Stage",
    intro:
      "Specialist massage for pregnancy, postnatal recovery and everyday stress relief.",
  },
  {
    slug: "specialist",
    label: "Specialist Wellness",
    eyebrow: "Focused Therapies",
    intro:
      "Traditional and contemporary specialist treatments for the office, the home and everywhere between.",
  },
];

export const TREATMENTS: Treatment[] = [
  // A. Luxury & Relaxation
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    category: "luxury-relaxation",
    categoryLabel: "Luxury & Relaxation",
    description:
      "Classic long, flowing strokes to ease tension, improve circulation and settle the mind.",
    bestFor: "First-time clients & overall relaxation",
    durations: [60, 90],
    priceFrom: 85,
    image: aromatherapy,
    featured: true,
  },
  {
    slug: "aromatherapy-massage",
    name: "Sanctuary Aromatherapy",
    category: "luxury-relaxation",
    categoryLabel: "Luxury & Relaxation",
    description:
      "A sensory ritual using bespoke botanical oils to calm the nervous system and restore sleep.",
    bestFor: "Stress, sleep and emotional balance",
    durations: [60, 90],
    priceFrom: 105,
    image: aromatherapy,
    featured: true,
  },
  {
    slug: "hot-stone-massage",
    name: "Hot Stone Massage",
    category: "luxury-relaxation",
    categoryLabel: "Luxury & Relaxation",
    description:
      "Warmed basalt stones melt deep muscular tension while gentle strokes lull you into stillness.",
    bestFor: "Cold weather, deep muscle warmth",
    durations: [75, 90],
    priceFrom: 115,
    image: hotStone,
    featured: true,
  },
  {
    slug: "relaxation-massage",
    name: "Relaxation Massage",
    category: "luxury-relaxation",
    categoryLabel: "Luxury & Relaxation",
    description:
      "A lighter, indulgent full-body treatment focused entirely on comfort and unwinding.",
    bestFor: "Escaping a demanding week",
    durations: [60, 90],
    priceFrom: 85,
    image: aromatherapy,
  },
  {
    slug: "couples-massage",
    name: "Couples Massage",
    category: "luxury-relaxation",
    categoryLabel: "Luxury & Relaxation",
    description:
      "Two therapists, one shared moment of stillness — at home, in your suite or on a special occasion.",
    bestFor: "Anniversaries, birthdays, retreats",
    durations: [60, 90],
    priceFrom: 190,
    image: hotStone,
  },

  // B. Pain Relief & Therapeutic
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    category: "pain-relief",
    categoryLabel: "Pain Relief & Therapeutic",
    description:
      "Firm, focused pressure to release chronic tension in the back, shoulders and hips.",
    bestFor: "Chronic tightness & desk-bound bodies",
    durations: [60, 90],
    priceFrom: 95,
    image: deepTissue,
    featured: true,
  },
  {
    slug: "therapeutic-massage",
    name: "Therapeutic Massage",
    category: "pain-relief",
    categoryLabel: "Pain Relief & Therapeutic",
    description:
      "A blended clinical approach tailored to your body's current pattern of tension and pain.",
    bestFor: "Recurring aches & restricted movement",
    durations: [60, 90],
    priceFrom: 95,
    image: deepTissue,
  },
  {
    slug: "remedial-massage",
    name: "Remedial Massage",
    category: "pain-relief",
    categoryLabel: "Pain Relief & Therapeutic",
    description:
      "Assessment-led treatment to address specific soft-tissue injuries and postural imbalance.",
    bestFor: "Injury recovery & rehabilitation",
    durations: [60, 90],
    priceFrom: 105,
    image: sports,
  },
  {
    slug: "trigger-point-therapy",
    name: "Trigger Point Therapy",
    category: "pain-relief",
    categoryLabel: "Pain Relief & Therapeutic",
    description:
      "Precise sustained pressure on knotted points to release referred pain patterns.",
    bestFor: "Headaches, jaw tension, tight traps",
    durations: [45, 60],
    priceFrom: 90,
    image: deepTissue,
  },
  {
    slug: "myofascial-release",
    name: "Myofascial Release",
    category: "pain-relief",
    categoryLabel: "Pain Relief & Therapeutic",
    description:
      "Slow, sustained stretching of the connective tissue to restore glide and range of motion.",
    bestFor: "Postural restriction & scar tissue",
    durations: [60, 90],
    priceFrom: 95,
    image: sports,
  },
  {
    slug: "back-neck-shoulder",
    name: "Back, Neck & Shoulder",
    category: "pain-relief",
    categoryLabel: "Pain Relief & Therapeutic",
    description:
      "A focused express treatment targeting the areas most affected by screens and stress.",
    bestFor: "Quick relief between meetings",
    durations: [30, 45],
    priceFrom: 65,
    image: deepTissue,
    featured: true,
  },

  // C. Sports & Recovery
  {
    slug: "sports-massage",
    name: "Sports Massage",
    category: "sports-recovery",
    categoryLabel: "Sports & Recovery",
    description:
      "Vigorous, technique-led work to support training loads, mobility and long-term performance.",
    bestFor: "Regular athletes & gym-goers",
    durations: [60, 90],
    priceFrom: 100,
    image: sports,
    featured: true,
  },
  {
    slug: "pre-event-massage",
    name: "Pre-Event Massage",
    category: "sports-recovery",
    categoryLabel: "Sports & Recovery",
    description:
      "Fast, stimulating strokes to prime muscles and mental focus before a race or match.",
    bestFor: "Race day & competition warm-up",
    durations: [30, 45],
    priceFrom: 70,
    image: sports,
  },
  {
    slug: "post-event-massage",
    name: "Post-Event Massage",
    category: "sports-recovery",
    categoryLabel: "Sports & Recovery",
    description:
      "Recovery-focused flushing work to reduce soreness, swelling and post-exertion fatigue.",
    bestFor: "After a marathon, match or long ride",
    durations: [45, 60],
    priceFrom: 85,
    image: sports,
  },
  {
    slug: "muscle-recovery",
    name: "Muscle Recovery Massage",
    category: "sports-recovery",
    categoryLabel: "Sports & Recovery",
    description:
      "A deep flush treatment combining compression, kneading and gentle stretch for full recovery.",
    bestFor: "Between heavy training blocks",
    durations: [60, 90],
    priceFrom: 95,
    image: sports,
  },
  {
    slug: "stretching-mobility",
    name: "Stretching & Mobility",
    category: "sports-recovery",
    categoryLabel: "Sports & Recovery",
    description:
      "Assisted stretching and mobility work to restore range of motion and prevent injury.",
    bestFor: "Desk workers & athletes alike",
    durations: [45, 60],
    priceFrom: 80,
    image: sports,
  },

  // D. Senior & Gentle
  {
    slug: "senior-massage",
    name: "Senior Massage",
    category: "senior-wellness",
    categoryLabel: "Senior & Gentle Wellness",
    description:
      "A gentle, respectful full-body treatment adapted to older bodies and slower recovery.",
    bestFor: "Adults 65+ & carers",
    durations: [45, 60],
    priceFrom: 85,
    image: aromatherapy,
  },
  {
    slug: "gentle-therapeutic",
    name: "Gentle Therapeutic",
    category: "senior-wellness",
    categoryLabel: "Senior & Gentle Wellness",
    description:
      "Light-pressure clinical work to ease stiffness in the back, hips, hands and shoulders.",
    bestFor: "Arthritis & chronic stiffness",
    durations: [45, 60],
    priceFrom: 85,
    image: reflexology,
  },
  {
    slug: "mobility-support",
    name: "Mobility Support",
    category: "senior-wellness",
    categoryLabel: "Senior & Gentle Wellness",
    description:
      "Gentle joint mobilisation and soft-tissue work to keep everyday movement comfortable.",
    bestFor: "Maintaining independence",
    durations: [45, 60],
    priceFrom: 85,
    image: reflexology,
  },
  {
    slug: "relaxation-older-adults",
    name: "Relaxation for Older Adults",
    category: "senior-wellness",
    categoryLabel: "Senior & Gentle Wellness",
    description:
      "A calming, unhurried ritual focused entirely on comfort, warmth and rest.",
    bestFor: "Quiet at-home care",
    durations: [45, 60],
    priceFrom: 85,
    image: aromatherapy,
  },

  // E. Women's Wellness
  {
    slug: "pregnancy-massage",
    name: "Pregnancy Massage",
    category: "womens-wellness",
    categoryLabel: "Women's Wellness",
    description:
      "Specialist side-lying massage to ease pregnancy tension in the back, hips and legs.",
    bestFor: "Second & third trimester",
    durations: [60, 75],
    priceFrom: 105,
    image: pregnancy,
    featured: true,
  },
  {
    slug: "postnatal-massage",
    name: "Postnatal Massage",
    category: "womens-wellness",
    categoryLabel: "Women's Wellness",
    description:
      "Gentle recovery work to support the body in the weeks and months after birth.",
    bestFor: "New mothers (6+ weeks postpartum)",
    durations: [60, 75],
    priceFrom: 105,
    image: pregnancy,
  },
  {
    slug: "stress-relief-massage",
    name: "Stress Relief Massage",
    category: "womens-wellness",
    categoryLabel: "Women's Wellness",
    description:
      "A calming full-body ritual to reset an overloaded nervous system and quiet the mind.",
    bestFor: "Burnout, anxiety & poor sleep",
    durations: [60, 90],
    priceFrom: 95,
    image: aromatherapy,
  },

  // F. Specialist
  {
    slug: "reflexology",
    name: "Precision Reflexology",
    category: "specialist",
    categoryLabel: "Specialist Wellness",
    description:
      "Ancient pressure-point therapy applied with clinical precision on hands and feet.",
    bestFor: "Digestive, hormonal & sleep balance",
    durations: [45, 60],
    priceFrom: 85,
    image: reflexology,
    featured: true,
  },
  {
    slug: "indian-head-massage",
    name: "Indian Head Massage",
    category: "specialist",
    categoryLabel: "Specialist Wellness",
    description:
      "Traditional scalp, neck and shoulder work to release mental fatigue and eye strain.",
    bestFor: "Screen fatigue & headaches",
    durations: [30, 45],
    priceFrom: 65,
    image: reflexology,
  },
  {
    slug: "foot-massage",
    name: "Foot Massage",
    category: "specialist",
    categoryLabel: "Specialist Wellness",
    description:
      "A grounding treatment focused entirely on tired feet, calves and ankles.",
    bestFor: "After long days on your feet",
    durations: [30, 45],
    priceFrom: 55,
    image: reflexology,
  },
  {
    slug: "chair-massage",
    name: "Chair Massage",
    category: "specialist",
    categoryLabel: "Specialist Wellness",
    description:
      "Fully-clothed seated massage on our ergonomic chair — no oils, no downtime.",
    bestFor: "Offices, events & pop-ups",
    durations: [15, 30],
    priceFrom: 40,
    image: deepTissue,
  },
  {
    slug: "corporate-seated-massage",
    name: "Corporate Seated Massage",
    category: "specialist",
    categoryLabel: "Specialist Wellness",
    description:
      "On-site seated massage packages for teams, wellness days and executive floors.",
    bestFor: "Team wellness programmes",
    durations: [15, 20, 30],
    priceFrom: 45,
    image: deepTissue,
  },
];

export const FEATURED_TREATMENTS = TREATMENTS.filter((t) => t.featured);

export function treatmentsByCategory(slug: TreatmentCategorySlug) {
  return TREATMENTS.filter((t) => t.category === slug);
}
