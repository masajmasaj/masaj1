export const BRAND = {
  name: "Lythe",
  tagline: "Lythe Wellness",
  fullName: "Lythe Wellness",
  description:
    "Premium mobile massage and wellness for London. Clinic-grade therapists delivered to your home, hotel, office or event.",
};

export const PRIMARY_NAV = [
  { to: "/treatments", label: "Treatments" },
  { to: "/therapists", label: "Therapists" },
  { to: "/areas", label: "Areas" },
  { to: "/corporate", label: "Corporate" },
  { to: "/membership", label: "Membership" },
  { to: "/join-therapist", label: "Join as Therapist" },
] as const;

export const FOOTER_NAV = {
  platform: [
    { to: "/booking", label: "Book Now" },
    { to: "/therapists", label: "Therapists" },
    { to: "/membership", label: "Membership" },
    { to: "/gift-cards", label: "Gift Cards" },
    { to: "/shop", label: "Wellness Shop" },
  ],
  company: [
    { to: "/corporate", label: "Corporate" },
    { to: "/knowledge", label: "Knowledge Centre" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ],
} as const;
