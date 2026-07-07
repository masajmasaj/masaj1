import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { LOCATION_PAGES } from "@/lib/locations";

const TITLE = "Mobile Massage Locations Across London | Lythe";
const DESCRIPTION =
  "Discover where Lythe delivers premium mobile massage — home, hotel, office, corporate and sports massage across London, with wider UK coverage coming soon.";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/locations" },
    ],
    links: [{ rel: "canonical", href: "/locations" }],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Coverage"
        title="Where we come to you."
        intro="Launching in London with rigorous care, and expanding across the United Kingdom in 2026."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATION_PAGES.map((l) => (
            <Link
              key={l.slug}
              to="/locations/$slug"
              params={{ slug: l.slug }}
              className="group border border-stone-200 rounded-2xl p-8 bg-stone-50 hover:border-forest/40 transition-colors"
            >
              <p className="eyebrow text-gold mb-3">London</p>
              <h2 className="text-2xl font-serif font-medium text-stone-900 mb-3">
                {l.name}
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed mb-4 text-pretty">
                {l.description}
              </p>
              <span className="text-xs font-medium tracking-wider text-forest group-hover:underline underline-offset-4">
                Explore area →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
