import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Lythe Wellness" },
      { name: "description", content: "How Lythe collects, uses and protects your personal information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <SiteLayout>
      <Section eyebrow="Legal" title="Privacy Policy">
        <div className="max-w-3xl text-stone-700 leading-relaxed space-y-4">
          <p>This page is maintained by Lythe Wellness. Our full privacy policy is being finalised and will be published here shortly.</p>
          <p>For questions about your data, contact hello@lythe.wellness.</p>
        </div>
      </Section>
    </SiteLayout>
  ),
});
