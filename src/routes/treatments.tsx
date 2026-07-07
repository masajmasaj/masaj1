import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { TreatmentCard } from "@/components/site/TreatmentCard";
import { TREATMENTS } from "@/lib/treatments";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Lythe Wellness" },
      {
        name: "description",
        content:
          "Explore our curated menu of mobile massage and wellness treatments — from deep tissue and sports recovery to prenatal, reflexology and aromatherapy.",
      },
      { property: "og:title", content: "Treatments — Lythe Wellness" },
      { property: "og:description", content: "Curated mobile massage treatments across London." },
      { property: "og:url", content: "/treatments" },
    ],
    links: [{ rel: "canonical", href: "/treatments" }],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="The Curated Menu"
        title="Treatments, refined."
        intro="Every treatment is a bespoke conversation between therapist and body. Choose the ritual that meets you where you are today."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TREATMENTS.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/booking"
            className="inline-block bg-forest text-stone-50 px-8 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
          >
            Book a Treatment
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
