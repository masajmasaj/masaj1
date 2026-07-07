import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { BookingWidget } from "@/components/site/BookingWidget";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Treatment — Lythe Wellness" },
      {
        name: "description",
        content:
          "Book a professional mobile massage in London. Enter your postcode, choose your treatment and we'll match you with a vetted therapist.",
      },
      { property: "og:title", content: "Book a Treatment — Lythe Wellness" },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingPage,
});

function BookingPage() {
  return (
    <SiteLayout>
      <Section
        eyebrow="Booking"
        title="Arrange your treatment."
        intro="Enter a few details below. A concierge will confirm your therapist and time within the hour."
      >
        <BookingWidget />
        <p className="text-sm text-stone-500 mt-6 text-center">
          Full online booking arrives in early 2026. In the meantime, our concierge team will
          respond personally.
        </p>
      </Section>
    </SiteLayout>
  );
}
