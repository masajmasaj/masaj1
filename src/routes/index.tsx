import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BookingWidget } from "@/components/site/BookingWidget";
import { TrustBand } from "@/components/site/TrustBand";
import { TreatmentCard } from "@/components/site/TreatmentCard";
import { ServiceModelCard } from "@/components/site/ServiceModelCard";
import { SafetyNotice } from "@/components/site/SafetyNotice";
import { Section } from "@/components/site/Section";
import { TREATMENTS } from "@/lib/treatments";
import { SERVICE_MODELS } from "@/lib/service-models";
import { BRAND } from "@/lib/site-config";
import heroImg from "@/assets/hero-sanctuary.jpg";
import therapistImg from "@/assets/therapist-portrait.jpg";
import shopImg from "@/assets/shop-preview.jpg";

const HOMEPAGE_TITLE = "Luxury Mobile Massage & Wellness in London | Lythe";
const HOMEPAGE_DESCRIPTION =
  "Book luxury mobile massage across London — home, hotel, office and corporate wellness. Vetted UK therapists for deep tissue, sports, pregnancy, senior and relaxation massage.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOMEPAGE_TITLE },
      { name: "description", content: HOMEPAGE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "mobile massage London, home massage London, hotel massage London, office massage London, sports massage London, luxury massage London, massage therapist London, corporate wellness London",
      },
      { property: "og:title", content: HOMEPAGE_TITLE },
      { property: "og:description", content: BRAND.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: HOMEPAGE_TITLE },
      { name: "twitter:description", content: HOMEPAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://lythe.wellness/#business",
          name: "Lythe Wellness",
          description: BRAND.description,
          areaServed: "London, United Kingdom",
          serviceType: [
            "Mobile Massage",
            "Home Massage",
            "Hotel Massage",
            "Office Massage",
            "Sports Massage",
            "Pregnancy Massage",
            "Corporate Wellness",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "London",
            addressCountry: "GB",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

const AUDIENCES = [
  "Busy professionals",
  "Athletes",
  "Older adults",
  "Hotel guests",
  "Office workers",
  "Pregnant women",
  "People with muscle tension",
  "Corporate teams",
];

const WHY_US = [
  { h: "Professional therapists", p: "Qualified UK practitioners with clinical and holistic training." },
  { h: "Carefully selected", p: "A rigorous five-stage vetting process. Only the top few percent join us." },
  { h: "Luxury mobile experience", p: "Hotel-grade linen, warmed oils and a fully prepared treatment space." },
  { h: "Clean & hygienic", p: "Sanitised equipment and fresh linen for every single visit." },
  { h: "Transparent pricing", p: "Flat, honest treatment prices — no travel fees within our core zones." },
  { h: "Same-day ready", p: "Structured for future same-day booking as our therapist network grows." },
  { h: "Comfort & safety", p: "A safe, respectful and considered experience for every client." },
];

const KNOWLEDGE_TOPICS = [
  { h: "Massage Guides", p: "Choosing the right treatment for your body today." },
  { h: "Recovery Tips", p: "Between-session care for athletes and desk-bound bodies." },
  { h: "Stress Relief", p: "Small daily rituals that calm the nervous system." },
  { h: "Sports Massage", p: "Training loads, mobility and long-term performance." },
  { h: "Senior Wellness", p: "Gentle care for changing bodies and slower recovery." },
  { h: "Pregnancy & Postnatal", p: "Safe, considered massage through every stage." },
  { h: "Aftercare", p: "What to do — and avoid — in the hours after your treatment." },
];

function HomePage() {
  const featured = TREATMENTS.filter((t) => t.featured).slice(0, 8);
  const featured8 = featured.length >= 8 ? featured : TREATMENTS.slice(0, 8);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-28 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <p className="eyebrow text-gold mb-6 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-gold" />
              Home · Hotel · Office · Corporate
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl serif-display mb-8 text-stone-900 text-balance">
              Luxury Mobile Massage &amp; Wellness Across London.
            </h1>
            <p className="text-base md:text-lg text-stone-700 text-pretty max-w-[48ch] leading-relaxed mb-8">
              Qualified therapists brought to your home, hotel, office or event — with the calm,
              hospitality and care of a private spa.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="bg-forest text-stone-50 px-7 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
              >
                Book a Massage
              </Link>
              <Link
                to="/treatments"
                className="border border-stone-300 bg-stone-50 text-stone-900 px-7 py-4 rounded-full text-sm font-medium hover:bg-stone-100 transition"
              >
                Find Your Treatment
              </Link>
            </div>
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
        <div className="max-w-7xl mx-auto px-6 pb-14 relative z-10">
          <BookingWidget />
        </div>
      </section>

      <TrustBand />

      {/* SERVICE MODELS */}
      <Section
        eyebrow="Where We Come To You"
        title="One team, every setting."
        intro="Whether it's your bedroom in Notting Hill, a suite in Mayfair or a team floor in Canary Wharf — we bring the same quality of care."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_MODELS.map((m) => (
            <ServiceModelCard key={m.slug} model={m} />
          ))}
        </div>
      </Section>

      {/* FEATURED TREATMENTS */}
      <Section
        tone="warm"
        eyebrow="The Curated Menu"
        title="Featured treatments."
        intro="From clinical recovery to sensory relaxation — each session is bespoke to your body's specific needs."
        action={
          <Link
            to="/treatments"
            className="text-sm font-medium underline underline-offset-8 decoration-gold/60 hover:decoration-gold transition-all whitespace-nowrap"
          >
            View all treatments →
          </Link>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured8.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} variant="compact" />
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section eyebrow="How It Works" title="A concierge experience, in four quiet steps.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { n: "01", h: "Choose your treatment", p: "Browse our curated menu of clinical and holistic treatments." },
            { n: "02", h: "Select location & time", p: "Home, hotel, office or event — tell us when it suits your day." },
            { n: "03", h: "We match your therapist", p: "A vetted specialist matched to your needs and preferences." },
            { n: "04", h: "Relax and recover", p: "Your therapist arrives fully prepared. You simply arrive at yourself." },
          ].map((s) => (
            <div key={s.n} className="border-t border-stone-300 pt-6">
              <p className="serif-display text-4xl text-gold mb-6">{s.n}</p>
              <h3 className="text-xl font-serif font-medium mb-3 text-stone-900">{s.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO WE HELP */}
      <Section tone="warm" eyebrow="Who We Help" title="Care for every kind of London life.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {AUDIENCES.map((a) => (
            <div
              key={a}
              className="border border-stone-300 rounded-xl px-5 py-6 text-center bg-stone-50/70"
            >
              <p className="font-serif text-base md:text-lg text-stone-900">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <SafetyNotice />
        </div>
      </Section>

      {/* WHY CHOOSE US */}
      <Section eyebrow="Why Choose Lythe" title="A quieter standard of mobile wellness.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US.map((r, i) => (
            <div key={r.h} className="flex gap-4">
              <div className="size-10 rounded-full bg-stone-100 ring-1 ring-stone-200 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-forest">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="font-serif text-lg text-stone-900 mb-1.5">{r.h}</h4>
                <p className="text-sm text-stone-700 leading-relaxed text-pretty">{r.p}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* VETTING / TRUST */}
      <Section tone="warm">
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
                { h: "Clinical Excellence", p: "Level 3 or 4 sports and holistic qualifications from accredited UK institutions." },
                { h: "In-Person Assessment", p: "Practical assessments led by our senior therapists verify technique and bedside manner." },
                { h: "Enhanced DBS Check", p: "Full background clearance and £5m public liability insurance on every booking." },
                { h: "Continuous Development", p: "Ongoing training in prenatal, oncology, sports rehab and corporate wellness." },
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

      {/* FOUNDER */}
      <Section>
        <div className="max-w-3xl">
          <p className="eyebrow text-gold mb-4">Our Story</p>
          <h2 className="text-4xl md:text-5xl serif-display mb-8 text-balance text-stone-900">
            A Filipino heart for care, brought quietly to London.
          </h2>
          <div className="space-y-6 text-stone-700 leading-relaxed text-pretty">
            <p>
              Lythe was founded on a simple belief: care should feel like being welcomed home.
              Rooted in a Filipino culture of hospitality, gentleness and family-first wellness, we
              wanted to build something London hadn&apos;t quite seen — mobile massage that carried
              the warmth of a family home and the standards of a private clinic.
            </p>
            <p>
              Every therapist we work with shares that same quiet ethic: to look after each guest as
              if they were our own. It is a small idea, delivered thoughtfully. It is why our
              members return.
            </p>
          </div>
        </div>
      </Section>

      {/* WELLNESS SHOP PREVIEW */}
      <Section tone="warm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 aspect-[4/5] order-2 lg:order-1">
            <img
              src={shopImg}
              alt="Wellness shop products — massage oils and recovery tools"
              loading="lazy"
              width={1200}
              height={1500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow text-gold mb-4 flex items-center gap-3">
              Wellness Shop
              <span className="text-[10px] tracking-[0.22em] rounded-full bg-forest/10 text-forest px-3 py-1">
                Coming Soon
              </span>
            </p>
            <h2 className="text-4xl md:text-5xl serif-display mb-6 text-balance">
              The tools our therapists trust.
            </h2>
            <p className="text-stone-700 leading-relaxed mb-8 text-pretty max-w-[48ch]">
              A quiet edit of botanical massage oils, recovery tools, self-care essentials and
              gift sets — curated by our therapists and available soon.
            </p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-stone-700 mb-8">
              {["Massage oils", "Recovery tools", "Self-care", "Gift sets"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gold" /> {x}
                </li>
              ))}
            </ul>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-8 decoration-gold/60 hover:decoration-gold transition-all"
            >
              Join the waitlist →
            </Link>
          </div>
        </div>
      </Section>

      {/* KNOWLEDGE */}
      <Section
        eyebrow="Knowledge Centre"
        title="Quiet insights, gathered by our therapists."
        intro="A living library of wellbeing guides — designed to help you get the most from every treatment."
        action={
          <Link
            to="/knowledge"
            className="text-sm font-medium underline underline-offset-8 decoration-gold/60 hover:decoration-gold whitespace-nowrap"
          >
            Explore the library →
          </Link>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KNOWLEDGE_TOPICS.map((k) => (
            <article
              key={k.h}
              className="border border-stone-200 rounded-2xl p-6 bg-stone-50 hover:border-forest/40 transition"
            >
              <h3 className="font-serif text-lg text-stone-900 mb-2">{k.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{k.p}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section tone="warm" eyebrow="In Their Words">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { q: "A level of professionalism rarely seen outside of Harley Street. My flat became a private clinic.", a: "Elena R.", m: "Mayfair member" },
            { q: "Booked in the morning, restored by lunchtime. The consistency across therapists is remarkable.", a: "James H.", m: "Corporate wellness partner" },
            { q: "The prenatal care I received was intuitive, safe and deeply calming. It changed my third trimester.", a: "Sofia M.", m: "Chelsea" },
          ].map((t) => (
            <figure key={t.a} className="border-t border-stone-300 pt-8">
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
            Book in moments; arrive at stillness within the hour.
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
