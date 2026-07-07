import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Lythe Wellness" },
      {
        name: "description",
        content:
          "The Lythe membership: priority booking, member pricing and quarterly wellness reviews for those who make restoration a practice.",
      },
      { property: "og:title", content: "Membership — Lythe Wellness" },
      { property: "og:url", content: "/membership" },
    ],
    links: [{ rel: "canonical", href: "/membership" }],
  }),
  component: MembershipPage,
});

function MembershipPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Membership"
        title="A practice, not a purchase."
        intro="Three tiers, each designed around a different rhythm of restoration. Full membership opens in 2026."
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Restore", price: "£240", cadence: "per month", perks: ["1 treatment monthly", "10% off additional bookings", "Priority scheduling"] },
            { name: "Ritual", price: "£440", cadence: "per month", perks: ["2 treatments monthly", "15% off additional bookings", "Quarterly wellness review"] },
            { name: "Sanctum", price: "£880", cadence: "per month", perks: ["4 treatments monthly", "20% off additional bookings", "Dedicated therapist pairing"] },
          ].map((tier, i) => (
            <div
              key={tier.name}
              className={`p-10 rounded-2xl border ${
                i === 1 ? "bg-forest text-stone-100 border-forest" : "bg-stone-50 border-stone-200"
              }`}
            >
              <p className={`eyebrow mb-4 ${i === 1 ? "text-gold-soft" : "text-gold"}`}>
                Tier {i + 1}
              </p>
              <h3 className="text-3xl font-serif mb-2">{tier.name}</h3>
              <p className="mb-8">
                <span className="serif-display text-4xl">{tier.price}</span>
                <span className={`text-sm ml-2 ${i === 1 ? "text-stone-300" : "text-stone-500"}`}>
                  {tier.cadence}
                </span>
              </p>
              <ul className="space-y-3 text-sm">
                {tier.perks.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className={i === 1 ? "text-gold-soft" : "text-gold"}>—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
