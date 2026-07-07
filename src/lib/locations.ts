export type LocationPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  areas: string[];
};

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "london",
    name: "London",
    title: "Mobile Massage in London",
    description:
      "Premium mobile massage across Greater London — home, hotel, office and corporate visits by vetted UK therapists.",
    intro:
      "Our therapists cover Central London and every major postcode in Zones 1–3, with expanding coverage across Greater London.",
    areas: [
      "Mayfair",
      "Chelsea",
      "Notting Hill",
      "Kensington",
      "Marylebone",
      "Belgravia",
      "Shoreditch",
      "Canary Wharf",
      "Hampstead",
      "St John's Wood",
      "Fitzrovia",
      "Fulham",
    ],
  },
  {
    slug: "home-massage-central-london",
    name: "Home Massage — Central London",
    title: "Home Massage in Central London",
    description:
      "In-home massage for residents of Central London. Vetted therapists, hotel-grade linen and clinical care to your door.",
    intro:
      "For homes, apartments and private residences in Central London — from Mayfair to Marylebone, Chelsea to Fitzrovia.",
    areas: ["Mayfair", "Marylebone", "Chelsea", "Belgravia", "Kensington", "Fitzrovia"],
  },
  {
    slug: "hotel-massage-london",
    name: "Hotel Massage — London",
    title: "Hotel Massage in London",
    description:
      "In-suite mobile massage for guests staying in London's finest hotels, serviced apartments and private residences.",
    intro:
      "Discreet in-room treatments arranged directly or through your concierge, seven days a week.",
    areas: ["Mayfair", "Knightsbridge", "Covent Garden", "Soho", "Westminster", "The City"],
  },
  {
    slug: "corporate-massage-london",
    name: "Corporate Massage — London",
    title: "Corporate Massage & Wellness in London",
    description:
      "On-site chair and table massage for teams across London. Recurring programmes, event activations and executive care.",
    intro:
      "From wellness days to weekly team recovery — a scalable programme designed around your office rhythm.",
    areas: ["The City", "Canary Wharf", "Shoreditch", "Soho", "King's Cross", "Paddington"],
  },
  {
    slug: "sports-massage-london",
    name: "Sports Massage — London",
    title: "Sports Massage in London",
    description:
      "Clinical sports massage delivered to your home or gym across London. Pre-event, post-event and recovery work.",
    intro:
      "For runners, cyclists, lifters and desk-bound athletes — restore mobility without leaving your postcode.",
    areas: ["Chelsea", "Fulham", "Notting Hill", "Hampstead", "Shoreditch", "Canary Wharf"],
  },
];

export function getLocationPage(slug: string) {
  return LOCATION_PAGES.find((l) => l.slug === slug);
}
