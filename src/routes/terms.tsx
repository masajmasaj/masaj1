import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Lythe Wellness" },
      { name: "description", content: "The terms under which Lythe Wellness provides its mobile massage services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <SiteLayout>
      <Section eyebrow="Legal" title="Terms of Service">
        <div className="max-w-3xl text-stone-700 leading-relaxed space-y-4">
          <p>This page is maintained by Lythe Wellness. Our full terms of service are being finalised and will be published here shortly.</p>
        </div>
      </Section>
    </SiteLayout>
  ),
});
