import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

const TITLE = "Knowledge Centre — Massage & Wellness Guides | Lythe";
const DESCRIPTION =
  "Massage guides, recovery tips and wellbeing insights from our London therapists — stress relief, sports massage, senior wellness, pregnancy care and aftercare.";

const TOPICS = [
  { h: "Massage Guides", p: "Choosing the right treatment for your body today." },
  { h: "Recovery Tips", p: "Between-session care for athletes and desk-bound bodies." },
  { h: "Stress Relief", p: "Small daily rituals that calm the nervous system." },
  { h: "Sports Massage", p: "Training loads, mobility and long-term performance." },
  { h: "Senior Wellness", p: "Gentle care for changing bodies and slower recovery." },
  { h: "Pregnancy Massage", p: "Safe, considered work through every trimester." },
  { h: "Aftercare Advice", p: "What to do — and avoid — after your treatment." },
];

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/knowledge" },
    ],
    links: [{ rel: "canonical", href: "/knowledge" }],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Knowledge Centre"
        title="A quiet library of wellbeing."
        intro="Written by our therapists to help you get the most from every treatment. Full guides are coming soon."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((k) => (
            <article
              key={k.h}
              className="border border-stone-200 rounded-2xl p-8 bg-stone-50 hover:border-forest/40 transition h-full"
            >
              <p className="eyebrow text-gold mb-3">Coming soon</p>
              <h2 className="font-serif text-xl text-stone-900 mb-3">{k.h}</h2>
              <p className="text-sm text-stone-700 leading-relaxed">{k.p}</p>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
