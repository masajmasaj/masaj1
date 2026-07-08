export type Review = {
  id: string;
  therapistSlug: string;
  clientName: string;
  clientArea: string;
  rating: number;
  treatment: string;
  date: string; // ISO
  verified: boolean;
  body: string;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    therapistSlug: "amara-okafor",
    clientName: "Elena R.",
    clientArea: "Mayfair",
    rating: 5,
    treatment: "Deep Tissue Massage",
    date: "2026-06-04",
    verified: true,
    body: "Amara found the exact area of tension I've been ignoring for months and worked through it with real care. Rebooking already.",
  },
  {
    id: "r2",
    therapistSlug: "amara-okafor",
    clientName: "James H.",
    clientArea: "Marylebone",
    rating: 5,
    treatment: "Sports Massage",
    date: "2026-05-19",
    verified: true,
    body: "Genuinely clinical work — better than my physio. Turned up promptly and set up in minutes.",
  },
  {
    id: "r3",
    therapistSlug: "hana-yamamoto",
    clientName: "Sofia M.",
    clientArea: "The Connaught",
    rating: 5,
    treatment: "Sanctuary Aromatherapy",
    date: "2026-06-20",
    verified: true,
    body: "The most calming hour I've had in London. Hana's presence alone made a difference before she began.",
  },
  {
    id: "r4",
    therapistSlug: "sofia-alvarez",
    clientName: "Priya K.",
    clientArea: "Chelsea",
    rating: 5,
    treatment: "Pregnancy Massage",
    date: "2026-05-30",
    verified: true,
    body: "Third trimester and completely transformed my sleep. Sofia was thoughtful, safe and warm throughout.",
  },
  {
    id: "r5",
    therapistSlug: "james-mackenzie",
    clientName: "Marcus T.",
    clientArea: "Canary Wharf",
    rating: 5,
    treatment: "Post-Event Massage",
    date: "2026-05-12",
    verified: true,
    body: "Recovered from a marathon in half the usual time. James understood exactly what my legs needed.",
  },
  {
    id: "r6",
    therapistSlug: "priya-sharma",
    clientName: "Amelia D.",
    clientArea: "Hampstead",
    rating: 5,
    treatment: "Reflexology",
    date: "2026-06-11",
    verified: true,
    body: "Skilled, calm, deeply intuitive. My monthly ritual now.",
  },
];

export function reviewsForTherapist(slug: string) {
  return REVIEWS.filter((r) => r.therapistSlug === slug);
}
