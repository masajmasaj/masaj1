import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { SafetyNotice } from "@/components/site/SafetyNotice";
import { TrustBand } from "@/components/site/TrustBand";
import { getLocationPage, LOCATION_PAGES } from "@/lib/locations";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const page = getLocationPage(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Location — Lythe" }, { name: "robots", content: "noindex" }],
      };
    }
    const { page } = loaderData;
    return {
      meta: [
        { title: `${page.title} | Lythe Wellness` },
        { name: "description", content: page.description },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/locations/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/locations/${params.slug}` }],
    };
  },
  component: LocationDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <Section title="Location coming soon" intro="This area isn't live yet — but it will be.">
        <Link to="/locations" className="underline underline-offset-8 decoration-gold/60">
          ← Back to all locations
        </Link>
      </Section>
    </SiteLayout>
  ),
});

function LocationDetail() {
  const { page } = Route.useLoaderData();
  return (
    <SiteLayout>
      <Section eyebrow="London Coverage" title={page.title} intro={page.intro}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-14">
          {page.areas.map((area) => (
            <div
              key={area}
              className="border border-stone-300 rounded-xl px-4 py-5 text-center bg-stone-50/70"
            >
              <p className="font-serif text-base text-stone-900">{area}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/booking"
            className="bg-forest text-stone-50 px-7 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
          >
            Book in this area
          </Link>
          <Link
            to="/treatments"
            className="border border-stone-300 bg-stone-50 text-stone-900 px-7 py-4 rounded-full text-sm font-medium hover:bg-stone-100 transition"
          >
            View treatments
          </Link>
        </div>
      </Section>

      <TrustBand />

      <Section tone="warm" eyebrow="Other Areas" title="Explore nearby coverage.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LOCATION_PAGES.filter((l) => l.slug !== page.slug).map((l) => (
            <Link
              key={l.slug}
              to="/locations/$slug"
              params={{ slug: l.slug }}
              className="group border border-stone-200 rounded-2xl p-6 bg-stone-50 hover:border-forest/40 transition-colors flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-serif text-lg text-stone-900 mb-1">{l.name}</h3>
                <p className="text-sm text-stone-700 leading-relaxed">{l.description}</p>
              </div>
              <span className="text-xs text-forest whitespace-nowrap">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <SafetyNotice />
        </div>
      </Section>
    </SiteLayout>
  );
}
