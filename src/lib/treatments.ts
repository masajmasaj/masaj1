import deepTissue from "@/assets/treatment-deep-tissue.jpg";
import aromatherapy from "@/assets/treatment-aromatherapy.jpg";
import reflexology from "@/assets/treatment-reflexology.jpg";

export type Treatment = {
  slug: string;
  name: string;
  category: string;
  description: string;
  priceFrom: number;
  duration: number;
  image: string;
};

export const TREATMENTS: Treatment[] = [
  {
    slug: "deep-tissue",
    name: "Deep Tissue Mastery",
    category: "Clinical Recovery",
    description:
      "Targeted relief for chronic tension and muscular recovery. Designed for demanding lifestyles and athletic bodies.",
    priceFrom: 95,
    duration: 60,
    image: deepTissue,
  },
  {
    slug: "aromatherapy",
    name: "Sanctuary Aromatherapy",
    category: "Restoration",
    description:
      "A sensory ritual using bespoke botanical oils to calm the nervous system and restore deep, natural sleep.",
    priceFrom: 105,
    duration: 60,
    image: aromatherapy,
  },
  {
    slug: "reflexology",
    name: "Precision Reflexology",
    category: "Holistic Balance",
    description:
      "Ancient pressure-point therapy applied with clinical precision to activate the body's own healing pathways.",
    priceFrom: 85,
    duration: 60,
    image: reflexology,
  },
];
