import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Lythe Wellness" },
      { name: "description", content: "How Lythe Wellness uses cookies and similar technologies." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <SiteLayout>
      <Section eyebrow="Legal" title="Cookie Policy">
        <div className="max-w-3xl text-stone-700 leading-relaxed space-y-4">
          <p>This page is maintained by Lythe Wellness. Our full cookie policy is being finalised and will be published here shortly.</p>
        </div>
      </Section>
    </SiteLayout>
  ),
});
