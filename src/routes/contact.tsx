import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

const TITLE = "Contact Lythe — Mobile Massage London";
const DESCRIPTION =
  "Reach the Lythe team for bookings, corporate wellness enquiries, therapist applications and press.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <Section eyebrow="Get in touch" title="We'd love to hear from you.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5 max-w-lg"
          >
            <div>
              <label className="eyebrow text-stone-500 mb-2 block">Your name</label>
              <input className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="eyebrow text-stone-500 mb-2 block">Email</label>
              <input type="email" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="eyebrow text-stone-500 mb-2 block">Message</label>
              <textarea rows={5} className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm" />
            </div>
            <button
              type="submit"
              className="bg-forest text-stone-50 rounded-full px-7 py-3 text-sm font-medium hover:brightness-110 transition"
            >
              Send message
            </button>
          </form>
          <div className="space-y-8 text-stone-700">
            <div>
              <p className="eyebrow text-gold mb-2">Bookings</p>
              <p className="font-serif text-xl text-stone-900">hello@lythe.wellness</p>
            </div>
            <div>
              <p className="eyebrow text-gold mb-2">Corporate wellness</p>
              <p className="font-serif text-xl text-stone-900">corporate@lythe.wellness</p>
            </div>
            <div>
              <p className="eyebrow text-gold mb-2">Therapist applications</p>
              <p className="font-serif text-xl text-stone-900">therapists@lythe.wellness</p>
            </div>
            <div>
              <p className="eyebrow text-gold mb-2">Head office</p>
              <p className="text-sm leading-relaxed">London, United Kingdom</p>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
