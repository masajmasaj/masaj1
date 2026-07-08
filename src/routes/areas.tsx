import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATION_PAGES } from "@/lib/locations";
import { THERAPISTS } from "@/lib/therapists";

export const Route = createFileRoute("/areas")({
  head: () => ({
    meta: [
      { title: "Areas We Cover — London & the UK | Lythe Wellness" },
      {
        name: "description",
        content:
          "See where Lythe delivers premium mobile massage — every major London borough, with UK city expansion coming next.",
      },
      { property: "og:title", content: "Areas We Cover — Lythe" },
      { property: "og:url", content: "/areas" },
    ],
    links: [{ rel: "canonical", href: "/areas" }],
  }),
  component: AreasPage,
});

const LONDON_BOROUGHS = [
  "Mayfair", "Marylebone", "Chelsea", "Kensington", "Belgravia",
  "Notting Hill", "Fitzrovia", "Soho", "Covent Garden", "Westminster",
  "Knightsbridge", "St John's Wood", "Hampstead", "Camden", "Islington",
  "Shoreditch", "The City", "Canary Wharf", "Fulham", "Hammersmith",
  "Chiswick", "Wimbledon", "Richmond", "Clapham", "Battersea",
  "King's Cross", "Paddington", "Victoria",
];

const FUTURE_CITIES = [
  "Manchester", "Edinburgh", "Birmingham", "Bristol", "Leeds", "Brighton",
  "Cambridge", "Oxford", "Glasgow", "Liverpool",
];

function AreasPage() {
  const therapistCount = (area: string) =>
    THERAPISTS.filter((t) => t.coverage.includes(area)).length;

  return (
    <SiteLayout>
      <section className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <p className="eyebrow text-gold mb-3">Areas We Cover</p>
          <h1 className="text-4xl md:text-5xl serif-display text-stone-900 mb-4">
            London today. The UK next.
          </h1>
          <p className="text-stone-700 max-w-2xl leading-relaxed">
            We currently serve every major London borough, with therapists in Zones 1–3 and expanding
            coverage across Greater London. UK city expansion arrives next.
          </p>
        </div>
      </section>

      <Section eyebrow="London Coverage" title="Every borough, one collective." intro="Featured London coverage areas — each with a dedicated concierge team and vetted local therapists.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {LOCATION_PAGES.map((l) => (
            <LocationCard
              key={l.slug}
              location={{
                slug: l.slug,
                name: l.name,
                region: "London",
                therapistsCount: THERAPISTS.length,
                status: "live",
              }}
            />
          ))}
        </div>

        <div className="border border-stone-200 rounded-2xl bg-stone-100 p-8">
          <p className="eyebrow text-gold mb-3">All London Boroughs</p>
          <div className="flex flex-wrap gap-2">
            {LONDON_BOROUGHS.map((b) => (
              <span
                key={b}
                className="text-xs px-3 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-stone-700"
              >
                {b}
                <span className="ml-1.5 text-stone-500">· {therapistCount(b) || "—"}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="warm" eyebrow="UK Expansion" title="Cities arriving next." intro="Register your postcode and we'll notify you the moment Lythe launches in your city.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {FUTURE_CITIES.map((c) => (
            <LocationCard
              key={c}
              location={{
                name: c,
                region: "United Kingdom",
                status: "coming-soon",
              }}
            />
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
