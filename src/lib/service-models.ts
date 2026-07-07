export type ServiceModel = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  audience: string;
};

export const SERVICE_MODELS: ServiceModel[] = [
  {
    slug: "home-massage",
    name: "Home Massage",
    tagline: "Your sanctuary, quietly restored.",
    description:
      "Your therapist arrives with linen, oils and a treatment couch. You simply arrive at yourself.",
    audience: "Homes & private residences",
  },
  {
    slug: "hotel-massage",
    name: "Hotel Massage",
    tagline: "In-suite wellness, on your schedule.",
    description:
      "Discreet in-room treatments for guests of London's finest hotels, apartments and residences.",
    audience: "Hotel guests & visitors",
  },
  {
    slug: "office-massage",
    name: "Office Massage",
    tagline: "Recovery between the meetings.",
    description:
      "Chair, table or private-room treatments delivered to your workplace with zero downtime.",
    audience: "Professionals & executive teams",
  },
  {
    slug: "corporate-wellness",
    name: "Corporate Wellness",
    tagline: "A quieter, healthier team.",
    description:
      "Recurring wellness days, event activations and ongoing programmes for teams of any size.",
    audience: "Companies & HR partners",
  },
  {
    slug: "sports-recovery",
    name: "Sports Recovery",
    tagline: "Train harder, recover deeper.",
    description:
      "Pre-event, post-event and rehabilitation work delivered before or after training.",
    audience: "Athletes & active professionals",
  },
  {
    slug: "senior-wellness",
    name: "Senior Wellness",
    tagline: "Gentle care, delivered with grace.",
    description:
      "Considered treatments adapted for older adults, focused on comfort, mobility and rest.",
    audience: "Older adults & families",
  },
  {
    slug: "luxury-relaxation",
    name: "Luxury Relaxation",
    tagline: "A private spa, called in.",
    description:
      "Aromatherapy, hot stone and couples rituals for anniversaries, birthdays and quiet weekends.",
    audience: "Special occasions & at-home retreats",
  },
];
