import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/therapists")({
  head: () => ({
    meta: [
      { title: "Our Therapists — Lythe Wellness" },
      {
        name: "description",
        content:
          "Meet the vetted, insured and highly qualified massage therapists behind Lythe. Only the top 3% of London practitioners join the collective.",
      },
      { property: "og:title", content: "Our Therapists — Lythe Wellness" },
      { property: "og:url", content: "/therapists" },
    ],
    links: [{ rel: "canonical", href: "/therapists" }],
  }),
  component: TherapistsPage,
});

function TherapistsPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="The Collective"
        title="Meet the practitioners."
        intro="Every Lythe therapist has been personally vetted, clinically assessed and background-checked. Full therapist profiles arrive with our booking release."
      >
        <div className="rounded-2xl bg-stone-100 border border-stone-200 py-24 text-center">
          <p className="serif-display text-3xl text-stone-900 mb-4">Profiles arriving soon.</p>
          <p className="text-sm text-stone-700 max-w-md mx-auto">
            Full therapist directory launches alongside online booking. Join the waitlist to receive
            first access.
          </p>
        </div>
      </Section>
    </SiteLayout>
  );
}
