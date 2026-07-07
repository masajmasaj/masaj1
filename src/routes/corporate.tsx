import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Wellness — Lythe" },
      {
        name: "description",
        content:
          "On-site chair massage, event wellness and bespoke workplace programmes for London's most demanding teams. Trusted by City and Canary Wharf employers.",
      },
      { property: "og:title", content: "Corporate Wellness — Lythe" },
      { property: "og:url", content: "/corporate" },
    ],
    links: [{ rel: "canonical", href: "/corporate" }],
  }),
  component: CorporatePage,
});

function CorporatePage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Corporate Wellness"
        title="Performance, in every posture."
        intro="On-site chair massage, event wellness suites and continuous programmes designed around the modern workplace."
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { h: "Office Days", p: "Weekly or monthly chair massage rotations for teams of 20 to 500." },
            { h: "Event Suites", p: "Wellness lounges for conferences, launches and hospitality." },
            { h: "Executive Care", p: "Private in-office treatment for leadership teams and boards." },
          ].map((c) => (
            <div key={c.h} className="p-8 rounded-2xl bg-stone-100 border border-stone-200">
              <h3 className="text-2xl font-serif text-stone-900 mb-3">{c.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{c.p}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
