import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BookingWidget } from "@/components/site/BookingWidget";
import { TrustBand } from "@/components/site/TrustBand";
import { TreatmentCard } from "@/components/site/TreatmentCard";
import { Section } from "@/components/site/Section";
import { TREATMENTS } from "@/lib/treatments";
import { BRAND } from "@/lib/site-config";
import heroImg from "@/assets/hero-sanctuary.jpg";
import therapistImg from "@/assets/therapist-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lythe — Premium Mobile Massage & Wellness in London" },
      {
        name: "description",
        content:
          "Elite mobile massage therapists delivered to your home, hotel or office across London. Vetted, insured, clinic-grade wellness on demand.",
      },
      { property: "og:title", content: "Lythe — Premium Mobile Massage & Wellness in London" },
      { property: "og:description", content: BRAND.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <p className="eyebrow text-gold mb-6 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-gold" />
              Now serving Central & Greater London
            </p>
            <h1 className="text-5xl md:text-7xl serif-display mb-8 text-stone-900">
              Restoration, delivered to your inner sanctum.
            </h1>
            <p className="text-lg text-stone-700 text-pretty max-w-[48ch] leading-relaxed">
              Professional mobile wellness services tailored to the rhythm of London life.
              Clinical expertise and hotel-grade luxury, brought quietly to your door.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] ring-1 ring-black/5 shadow-soft">
            <img
              src={heroImg}
              alt="A warmly lit private treatment room at dusk with linen drapes and candlelight"
              width={1200}
              height={1400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
          <BookingWidget />
        </div>
      </section>

      <TrustBand />

      {/* TREATMENTS */}
      <Section
        eyebrow="The Curated Menu"
        title={<>A treatment for every rhythm of the body.</>}
        intro="From therapeutic sports recovery to calming prenatal care, each session is bespoke to your body's specific requirements — never a one-size-fits-all ritual."
        action={
          <Link
            to="/treatments"
            className="text-sm font-medium underline underline-offset-8 decoration-gold/60 hover:decoration-gold transition-all"
          >
            View all services →
          </Link>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TREATMENTS.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section
        tone="warm"
        eyebrow="How It Works"
        title="A concierge experience, in three quiet steps."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              n: "01",
              h: "Tell us your ritual",
              p: "Share your postcode, preferred treatment and the window that suits your day.",
            },
            {
              n: "02",
              h: "Match with your therapist",
              p: "We assign a vetted specialist matched to your needs — clinical, prenatal, sports or holistic.",
            },
            {
              n: "03",
              h: "Restore, at home",
              p: "Your therapist arrives with linen, oils and equipment. You simply arrive at yourself.",
            },
          ].map((s) => (
            <div key={s.n} className="border-t border-stone-300 pt-6">
              <p className="serif-display text-4xl text-gold mb-6">{s.n}</p>
              <h3 className="text-xl font-serif font-medium mb-3 text-stone-900">{s.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* VETTING */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-2xl overflow-hidden ring-1 ring-black/5">
              <img
                src={therapistImg}
                alt="A qualified Lythe wellness practitioner"
                loading="lazy"
                width={1200}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
            <blockquote className="hidden sm:block absolute -bottom-8 -right-6 bg-stone-50 p-8 rounded-xl shadow-soft ring-1 ring-black/5 max-w-xs">
              <p className="serif-display text-lg mb-4 text-stone-900">
                &ldquo;Every practitioner undergoes a five-stage vetting process. Only the top 3%
                join the collective.&rdquo;
              </p>
              <span className="eyebrow text-stone-500">Director of Wellness</span>
            </blockquote>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow text-gold mb-4">Qualified Trust</p>
            <h2 className="text-4xl md:text-5xl serif-display mb-10 text-balance">
              London&apos;s most meticulous vetting.
            </h2>
            <ol className="space-y-8">
              {[
                {
                  h: "Clinical Excellence",
                  p: "Mandatory Level 3 or 4 sports and holistic qualifications from accredited UK institutions.",
                },
                {
                  h: "In-Person Assessment",
                  p: "Practical assessments led by our senior therapists verify technique, safety and bedside manner.",
                },
                {
                  h: "Enhanced DBS Check",
                  p: "Full background clearance and £5m public liability insurance on every booking.",
                },
                {
                  h: "Continuous Development",
                  p: "Ongoing training in specialisms — prenatal, oncology, sports rehab and corporate wellness.",
                },
              ].map((step, i) => (
                <li key={step.h} className="flex gap-4">
                  <div className="size-9 rounded-full bg-stone-100 ring-1 ring-stone-200 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-forest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-lg text-stone-900 mb-1.5">{step.h}</h4>
                    <p className="text-sm text-stone-700 leading-relaxed text-pretty">{step.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* WHERE */}
      <Section tone="warm" eyebrow="Coverage" title="Wherever London rests.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Mayfair",
            "Chelsea",
            "Notting Hill",
            "Kensington",
            "Marylebone",
            "Belgravia",
            "Shoreditch",
            "Canary Wharf",
            "Hampstead",
            "St John's Wood",
            "Fitzrovia",
            "Fulham",
          ].map((area) => (
            <div
              key={area}
              className="border border-stone-300 rounded-xl px-5 py-6 text-center bg-stone-50/60"
            >
              <p className="font-serif text-lg text-stone-900">{area}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-stone-700 mt-10">
          Expanding across the United Kingdom in 2026.
        </p>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="In Their Words">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              q: "A level of professionalism rarely seen outside of Harley Street. My therapist arrived, and my flat became a private clinic.",
              a: "Elena R.",
              m: "Mayfair member",
            },
            {
              q: "Booked in the morning, restored by lunchtime. The consistency across therapists is remarkable.",
              a: "James H.",
              m: "Corporate wellness partner",
            },
            {
              q: "The prenatal care I received was intuitive, safe and deeply calming. It changed my third trimester.",
              a: "Sofia M.",
              m: "Chelsea",
            },
          ].map((t) => (
            <figure key={t.a} className="border-t border-stone-200 pt-8">
              <blockquote className="serif-display text-2xl leading-tight text-stone-900 mb-6 text-balance">
                &ldquo;{t.q}&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <p className="font-medium text-stone-900">{t.a}</p>
                <p className="eyebrow text-stone-500 mt-1">{t.m}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="dark" className="!py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl serif-display text-stone-50 mb-8 text-balance">
            Begin your restoration.
          </h2>
          <p className="text-stone-300 mb-10 leading-relaxed">
            The first treatment is your invitation to a different rhythm of life. Book in moments;
            arrive at stillness within the hour.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="bg-gold text-stone-50 px-8 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
            >
              Book Your Treatment
            </Link>
            <Link
              to="/membership"
              className="border border-stone-300/30 text-stone-100 px-8 py-4 rounded-full text-sm font-medium hover:bg-stone-100/10 transition"
            >
              Explore Membership
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
