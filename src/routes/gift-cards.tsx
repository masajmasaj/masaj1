import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

const TITLE = "Gift Cards — Luxury Mobile Massage Gifts in London | Lythe";
const DESCRIPTION =
  "Give the gift of restoration. Digital gift cards for premium mobile massage across London — launching soon.";

export const Route = createFileRoute("/gift-cards")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/gift-cards" },
    ],
    links: [{ rel: "canonical", href: "/gift-cards" }],
  }),
  component: GiftCardsPage,
});

function GiftCardsPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Gift Cards"
        title="Give the gift of stillness."
        intro="Beautifully designed digital gift cards for the people who deserve a slower Sunday. Launching soon."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { v: 95, l: "Signature 60-minute" },
            { v: 145, l: "Extended 90-minute" },
            { v: 250, l: "Couples ritual" },
          ].map((g) => (
            <article
              key={g.v}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-10 text-center"
            >
              <p className="eyebrow text-gold mb-4">Coming soon</p>
              <p className="serif-display text-5xl text-stone-900 mb-2">£{g.v}</p>
              <p className="text-sm text-stone-700">{g.l}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="underline underline-offset-8 decoration-gold/60">
            Notify me when gift cards launch →
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
