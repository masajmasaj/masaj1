import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

const TITLE = "About Lythe — Premium Mobile Massage in London";
const DESCRIPTION =
  "Lythe is a London-based mobile massage and wellness platform, rooted in a Filipino culture of care and built to scale across the UK.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <Section eyebrow="Our Story" title="Care, quietly delivered.">
        <div className="prose max-w-3xl text-stone-700 leading-relaxed space-y-6">
          <p>
            Lythe was founded on a simple belief: care should feel like being welcomed home. Rooted
            in a Filipino culture of hospitality, gentleness and family-first wellness, we wanted
            to build something London hadn&apos;t quite seen — mobile massage with the warmth of a
            family home and the standards of a private clinic.
          </p>
          <p>
            We launch in London and will grow, thoughtfully, across the United Kingdom. Every
            therapist joins after a rigorous five-stage vetting process. Every treatment is
            considered. Every visit is quiet, prepared and safe.
          </p>
          <p>
            This is a long build, and a careful one. We would rather grow slowly and correctly
            than quickly and forget the people we set out to serve.
          </p>
        </div>
      </Section>
    </SiteLayout>
  );
}
