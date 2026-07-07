import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { TreatmentCard } from "@/components/site/TreatmentCard";
import { SafetyNotice } from "@/components/site/SafetyNotice";
import {
  TREATMENT_CATEGORIES,
  treatmentsByCategory,
} from "@/lib/treatments";

const TITLE = "Massage Treatments in London | Deep Tissue, Sports, Pregnancy & More | Lythe";
const DESCRIPTION =
  "Explore our full menu of mobile massage treatments across London — deep tissue, sports, pregnancy, hot stone, reflexology, corporate seated massage and more.";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "mobile massage London, deep tissue massage London, sports massage London, pregnancy massage London, hot stone massage London, reflexology London, corporate massage London",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/treatments" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/treatments" }],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <SiteLayout>
      {/* Intro */}
      <Section
        eyebrow="The Curated Menu"
        title="Treatments, refined."
        intro="Every treatment is a bespoke conversation between therapist and body. Choose the ritual that meets you where you are today."
      >
        {/* Category anchor nav */}
        <nav aria-label="Treatment categories" className="flex flex-wrap gap-2 mb-4">
          {TREATMENT_CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="text-xs font-medium uppercase tracking-[0.14em] text-stone-700 border border-stone-300 rounded-full px-4 py-2 hover:border-forest hover:text-forest transition-colors"
            >
              {c.label}
            </a>
          ))}
        </nav>
      </Section>

      {/* Categories */}
      {TREATMENT_CATEGORIES.map((cat, idx) => {
        const list = treatmentsByCategory(cat.slug);
        return (
          <Section
            key={cat.slug}
            tone={idx % 2 === 0 ? "warm" : "light"}
            eyebrow={cat.eyebrow}
            title={cat.label}
            intro={cat.intro}
            className={`scroll-mt-24`}
          >
            <div id={cat.slug} className="-mt-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {list.map((t) => (
                <TreatmentCard key={t.slug} treatment={t} />
              ))}
            </div>
          </Section>
        );
      })}

      {/* Safety */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <SafetyNotice />
        </div>
        <div className="mt-12 text-center">
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
