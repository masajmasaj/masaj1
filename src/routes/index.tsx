import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BookingWidget } from "@/components/site/BookingWidget";
import { TrustBand } from "@/components/site/TrustBand";
import { TreatmentCard } from "@/components/site/TreatmentCard";
import { ServiceModelCard } from "@/components/site/ServiceModelCard";
import { SafetyNotice } from "@/components/site/SafetyNotice";
import { Section } from "@/components/site/Section";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
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
          "massage London, home massage London, hotel massage London, office massage London, corporate massage London, sports massage London, luxury massage London, massage therapist London, wellness London",
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

const STATS = [
  { value: 10000, suffix: "+", label: "Treatments Delivered" },
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 0, label: "Qualified Therapists", customValue: "Professional" },
  { value: 7, label: "Days Availability", customValue: "7 Days" },
];

const SERVICES_GRID = [
  { name: "Home Massage", desc: "Your private treatment, delivered to your door.", to: "/booking" },
  { name: "Hotel Massage", desc: "Discreet in-suite wellness across London hotels.", to: "/booking" },
  { name: "Office Massage", desc: "Chair and table treatments at your workplace.", to: "/booking" },
  { name: "Corporate Wellness", desc: "Programmes and wellness days for teams.", to: "/corporate" },
  { name: "Sports Recovery", desc: "Pre and post-event work for active bodies.", to: "/treatments" },
  { name: "Deep Tissue", desc: "Focused release for chronic tension.", to: "/treatments" },
  { name: "Swedish Massage", desc: "Classic long strokes for complete relaxation.", to: "/treatments" },
  { name: "Pregnancy Massage", desc: "Specialist side-lying prenatal care.", to: "/treatments" },
  { name: "Senior Wellness", desc: "Gentle therapy adapted for older adults.", to: "/treatments" },
  { name: "Luxury Spa Experience", desc: "Aromatherapy, hot stone and full rituals.", to: "/treatments" },
  { name: "Couples Massage", desc: "Two therapists, one shared moment.", to: "/treatments" },
  { name: "Event Massage", desc: "On-site wellness for weddings and pop-ups.", to: "/corporate" },
];

const AUDIENCES = [
  { h: "Busy Professionals", p: "Recovery between the meetings." },
  { h: "Athletes", p: "Performance and long-term mobility." },
  { h: "Corporate Teams", p: "Wellness days and ongoing programmes." },
  { h: "Hotel Guests", p: "In-suite calm for London visitors." },
  { h: "Older Adults", p: "Gentle, respectful home visits." },
  { h: "Pregnant Women", p: "Specialist prenatal and postnatal care." },
  { h: "Tourists", p: "A restorative pause between plans." },
  { h: "Remote Workers", p: "Undo the desk. Reset the week." },
];

const WHY_US = [
  { h: "Qualified Therapists", p: "Level 3 and 4 accredited UK practitioners." },
  { h: "Carefully Vetted", p: "A five-stage vetting process. Only the top few percent join us." },
  { h: "Luxury Experience", p: "Hotel-grade linen, warmed oils and considered detail." },
  { h: "Hygiene Standards", p: "Sanitised equipment and fresh linen every visit." },
  { h: "Professional Equipment", p: "Purpose-built couches, bolsters and heated pads." },
  { h: "Home Comfort", p: "A calm treatment space set up around you." },
  { h: "Secure Payments", p: "Encrypted card payments coming with our booking launch." },
  { h: "Transparent Pricing", p: "Flat, honest treatment prices — no hidden fees." },
];

const KNOWLEDGE_ARTICLES = [
  { h: "Benefits of Deep Tissue Massage", p: "Why sustained pressure unlocks long-held tension.", tag: "Guides" },
  { h: "How Sports Massage Helps Recovery", p: "Training loads, mobility and long-term performance.", tag: "Performance" },
  { h: "Best Massage After Running", p: "Choosing the right treatment for tired legs.", tag: "Recovery" },
  { h: "Relaxation Techniques", p: "Small daily rituals that calm the nervous system.", tag: "Wellbeing" },
  { h: "Massage During Pregnancy", p: "Safe, considered treatment through every trimester.", tag: "Prenatal" },
  { h: "Senior Wellness Tips", p: "Movement, comfort and rest in later years.", tag: "Senior Care" },
];

const SHOP_PRODUCTS = [
  "Massage Oils",
  "Massage Guns",
  "Recovery Tools",
  "Foam Rollers",
  "Essential Oils",
  "Spa Accessories",
  "Gift Boxes",
];

const MEMBERSHIPS = [
  {
    tier: "Bronze",
    tagline: "An easy way to begin.",
    perks: ["One treatment per month", "Priority weekend booking", "5% wellness shop credit"],
  },
  {
    tier: "Silver",
    tagline: "For the regular ritual.",
    perks: ["Two treatments per month", "Guaranteed therapist match", "10% wellness shop credit"],
  },
  {
    tier: "Gold",
    tagline: "A quieter standard of care.",
    perks: ["Four treatments per month", "Same-day priority booking", "Complimentary aromatherapy upgrade"],
    featured: true,
  },
  {
    tier: "VIP",
    tagline: "A private wellness concierge.",
    perks: ["Unlimited treatments", "Dedicated therapist team", "Bespoke annual wellness plan"],
  },
];

const GIFT_OCCASIONS = [
  { h: "Birthdays", p: "A restorative gift, quietly given." },
  { h: "Christmas", p: "The season's most considered present." },
  { h: "Anniversaries", p: "Time shared, side by side." },
  { h: "Corporate Gifts", p: "Recognition your team will remember." },
];

const CORPORATE_HIGHLIGHTS = [
  { h: "Team Wellness Days", p: "On-site chair and table massage to reset your team." },
  { h: "Recurring Programmes", p: "Weekly or monthly on-site care for hybrid workplaces." },
  { h: "Event Activations", p: "Wellness lounges for conferences, launches and away-days." },
  { h: "Executive Care", p: "Private, in-office treatments for leadership teams." },
];

const TESTIMONIALS = [
  { q: "A level of professionalism rarely seen outside Harley Street. My flat became a private clinic.", a: "Elena R.", m: "Mayfair member" },
  { q: "Booked in the morning, restored by lunchtime. The consistency across therapists is remarkable.", a: "James H.", m: "Corporate wellness partner" },
  { q: "The prenatal care I received was intuitive, safe and deeply calming. It changed my third trimester.", a: "Sofia M.", m: "Chelsea" },
  { q: "Our team wellness days have transformed how the office feels on a Monday.", a: "Priya K.", m: "Head of People, Canary Wharf" },
];

function HomePage() {
  const featured = TREATMENTS.filter((t) => t.featured).slice(0, 8);
  const featured8 = featured.length >= 8 ? featured : TREATMENTS.slice(0, 8);

  return (
    <SiteLayout>
      {/* 1. HERO */}
      <section className="relative bg-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-28 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl animate-fade-in">
            <p className="eyebrow text-gold mb-6 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-gold" />
              Home · Hotel · Office · Corporate
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl serif-display mb-8 text-stone-900 text-balance">
              Luxury Mobile Massage &amp; Wellness Across London.
            </h1>
            <p className="text-base md:text-lg text-stone-700 text-pretty max-w-[48ch] leading-relaxed mb-8">
              Professional massage therapists delivering exceptional wellness experiences to your
              home, hotel, office or workplace.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="bg-forest text-stone-50 px-7 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
              >
                Book Now
              </Link>
              <Link
                to="/treatments"
                className="border border-stone-300 bg-stone-50 text-stone-900 px-7 py-4 rounded-full text-sm font-medium hover:bg-stone-100 transition"
              >
                Explore Treatments
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] ring-1 ring-black/5 shadow-soft animate-scale-in">
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

      {/* 2. TRUST STATISTICS */}
      <Section eyebrow="By The Numbers" title="Quietly trusted across London.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border border-stone-200 rounded-2xl p-8 bg-stone-50 text-center"
            >
              <p className="serif-display text-5xl md:text-6xl text-stone-900 mb-3">
                {s.customValue ? (
                  s.customValue
                ) : (
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="eyebrow text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. OUR SERVICES */}
      <Section
        tone="warm"
        eyebrow="Our Services"
        title="A full menu of mobile wellness."
        intro="From bedside relaxation to corporate wellness floors — one collective, every setting."
        action={
          <Link
            to="/treatments"
            className="text-sm font-medium underline underline-offset-8 decoration-gold/60 hover:decoration-gold whitespace-nowrap"
          >
            View all treatments →
          </Link>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES_GRID.map((s) => (
            <Link
              key={s.name}
              to={s.to}
              className="group bg-stone-50 border border-stone-200 rounded-2xl p-6 hover:border-forest/40 hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <h3 className="font-serif text-xl text-stone-900 mb-2">{s.name}</h3>
              <p className="text-sm text-stone-700 leading-relaxed flex-1">{s.desc}</p>
              <span className="mt-5 text-xs font-medium tracking-[0.18em] uppercase text-forest inline-flex items-center gap-2">
                Discover
                <span className="size-1 rounded-full bg-gold transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

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

      {/* 4. HOW BOOKING WORKS */}
      <Section tone="warm" eyebrow="How Booking Works" title="A concierge experience, in four quiet steps.">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          {[
            { n: "01", h: "Choose Treatment", p: "Browse our curated clinical and holistic menu." },
            { n: "02", h: "Select Time", p: "Pick a slot that fits your day, evening or weekend." },
            { n: "03", h: "Choose Location", p: "Home, hotel, office or event — you decide the setting." },
            { n: "04", h: "Relax At Home", p: "Your therapist arrives fully prepared. You simply arrive at yourself." },
          ].map((s) => (
            <div key={s.n} className="relative flex flex-col items-start">
              <div className="size-20 rounded-full bg-stone-50 ring-1 ring-stone-200 flex items-center justify-center mb-6 relative z-10">
                <span className="serif-display text-2xl text-gold">{s.n}</span>
              </div>
              <h3 className="text-xl font-serif font-medium mb-3 text-stone-900">{s.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. WHO WE HELP */}
      <Section eyebrow="Who We Help" title="Care for every kind of London life.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AUDIENCES.map((a) => (
            <div
              key={a.h}
              className="border border-stone-200 rounded-2xl p-6 bg-stone-50 hover:border-forest/40 transition"
            >
              <h4 className="font-serif text-lg text-stone-900 mb-2">{a.h}</h4>
              <p className="text-xs text-stone-700 leading-relaxed">{a.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <SafetyNotice />
        </div>
      </Section>

      {/* 6. WHY CHOOSE US */}
      <Section tone="warm" eyebrow="Why Choose Lythe" title="A quieter standard of mobile wellness.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((r, i) => (
            <div key={r.h} className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
              <div className="size-10 rounded-full bg-stone-100 ring-1 ring-stone-200 flex items-center justify-center mb-5">
                <span className="text-xs font-medium text-forest">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="font-serif text-lg text-stone-900 mb-2">{r.h}</h4>
              <p className="text-sm text-stone-700 leading-relaxed">{r.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. TREATMENTS PREVIEW (slider) */}
      <Section
        eyebrow="The Curated Menu"
        title="Featured treatments."
        intro="From clinical recovery to sensory relaxation — each session is bespoke to your body's needs today."
        action={
          <Link
            to="/treatments"
            className="text-sm font-medium underline underline-offset-8 decoration-gold/60 hover:decoration-gold whitespace-nowrap"
          >
            View all treatments →
          </Link>
        }
      >
        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {featured8.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} variant="compact" />
          ))}
        </div>
        {/* Mobile horizontal slider */}
        <div className="lg:hidden -mx-6 px-6 overflow-x-auto">
          <div className="flex gap-5 snap-x snap-mandatory pb-4">
            {featured8.map((t) => (
              <div
                key={t.slug}
                className="snap-start shrink-0 w-[75%] sm:w-[45%]"
              >
                <TreatmentCard treatment={t} variant="compact" />
              </div>
            ))}
          </div>
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

      {/* 8. KNOWLEDGE CENTRE PREVIEW */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KNOWLEDGE_ARTICLES.map((k) => (
            <article
              key={k.h}
              className="group border border-stone-200 rounded-2xl overflow-hidden bg-stone-50 hover:border-forest/40 transition flex flex-col"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-stone-100 via-stone-200 to-stone-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="serif-display text-3xl text-stone-500/60">{k.tag}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="eyebrow text-gold mb-3">{k.tag}</p>
                <h3 className="font-serif text-lg text-stone-900 mb-2">{k.h}</h3>
                <p className="text-sm text-stone-700 leading-relaxed flex-1">{k.p}</p>
                <span className="mt-5 text-xs font-medium tracking-[0.18em] uppercase text-forest">
                  Read guide →
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 9. WELLNESS SHOP PREVIEW */}
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
              curated gift sets — chosen by our therapists and available soon.
            </p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-stone-700 mb-8">
              {SHOP_PRODUCTS.map((x) => (
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

      {/* 10. MEMBERSHIP PREVIEW */}
      <Section
        eyebrow="Membership"
        title="Wellness, made a rhythm."
        intro="Membership brings priority booking, guaranteed therapist matching and a quieter monthly cadence to your care."
        action={
          <Link
            to="/membership"
            className="text-sm font-medium underline underline-offset-8 decoration-gold/60 hover:decoration-gold whitespace-nowrap"
          >
            Explore memberships →
          </Link>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIPS.map((m) => (
            <div
              key={m.tier}
              className={`rounded-2xl p-8 flex flex-col border transition ${
                m.featured
                  ? "bg-forest text-stone-100 border-forest shadow-soft"
                  : "bg-stone-50 border-stone-200 hover:border-forest/40"
              }`}
            >
              <p
                className={`eyebrow mb-3 ${m.featured ? "text-gold-soft" : "text-gold"}`}
              >
                {m.tier}
              </p>
              <p
                className={`serif-display text-2xl mb-6 ${
                  m.featured ? "text-stone-50" : "text-stone-900"
                }`}
              >
                {m.tagline}
              </p>
              <ul className="space-y-3 text-sm leading-relaxed flex-1">
                {m.perks.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span
                      className={`mt-2 size-1.5 rounded-full shrink-0 ${
                        m.featured ? "bg-gold-soft" : "bg-gold"
                      }`}
                    />
                    <span className={m.featured ? "text-stone-300" : "text-stone-700"}>{p}</span>
                  </li>
                ))}
              </ul>
              <span
                className={`mt-8 text-xs uppercase tracking-[0.2em] ${
                  m.featured ? "text-gold-soft" : "text-forest"
                }`}
              >
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* 11. GIFT CARDS */}
      <Section tone="warm">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-center">
          <div>
            <p className="eyebrow text-gold mb-4">Gift Cards</p>
            <h2 className="text-4xl md:text-5xl serif-display mb-6 text-balance">
              The gift of a quieter hour.
            </h2>
            <p className="text-stone-700 leading-relaxed mb-8 text-pretty max-w-[48ch]">
              A beautifully packaged Lythe gift card — for the moments that matter most, and the
              people who make them.
            </p>
            <Link
              to="/gift-cards"
              className="inline-block bg-forest text-stone-50 px-7 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
            >
              Explore Gift Cards
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {GIFT_OCCASIONS.map((g) => (
              <div
                key={g.h}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-black/5 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50 p-6 flex flex-col justify-end"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <p className="eyebrow text-gold mb-2">Occasion</p>
                <h4 className="font-serif text-xl text-stone-900 mb-1">{g.h}</h4>
                <p className="text-xs text-stone-700 leading-relaxed">{g.p}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 12. CORPORATE WELLNESS */}
      <Section
        tone="dark"
        eyebrow="Corporate Wellness"
        title="A quieter, healthier workplace."
        intro="From weekly on-site chair massage to full wellness activations for teams — programmes designed around your people, your floors and your calendar."
        action={
          <Link
            to="/corporate"
            className="text-sm font-medium text-gold-soft underline underline-offset-8 decoration-gold/40 hover:decoration-gold whitespace-nowrap"
          >
            View corporate programmes →
          </Link>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORPORATE_HIGHLIGHTS.map((c) => (
            <div
              key={c.h}
              className="border border-stone-100/15 rounded-2xl p-7 bg-stone-100/[0.03] backdrop-blur-sm"
            >
              <h4 className="font-serif text-xl text-stone-50 mb-2">{c.h}</h4>
              <p className="text-sm text-stone-300 leading-relaxed">{c.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 13. FOUNDER STORY */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl serif-display mb-8 text-balance text-stone-900">
              A Filipino heart for care, brought quietly to London.
            </h2>
            <div className="space-y-6 text-stone-700 leading-relaxed text-pretty">
              <p>
                Lythe was founded on a simple belief: care should feel like being welcomed home.
                Rooted in a Filipino tradition of hospitality, gentleness and family-first
                wellbeing, we wanted to build something London hadn&apos;t quite seen — mobile
                massage that carried the warmth of a family home and the standards of a private
                clinic.
              </p>
              <p>
                Every therapist we work with shares that same quiet ethic: to look after each guest
                as if they were our own. It is a small idea, delivered thoughtfully — and it is why
                our members return.
              </p>
              <p className="serif-display text-xl text-stone-900">
                &ldquo;Care, given properly, is the quietest kind of luxury.&rdquo;
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-black/5">
              <img
                src={therapistImg}
                alt="Lythe founder portrait"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-soft max-w-[220px]">
              <p className="eyebrow text-gold mb-1">Founder</p>
              <p className="font-serif text-lg text-stone-900 leading-tight">
                A quiet standard of hospitality.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 14. TESTIMONIALS */}
      <Section tone="warm" eyebrow="In Their Words" title="Members, in their own words.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.a}
              className="bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col"
            >
              <span className="serif-display text-5xl text-gold leading-none mb-4">&ldquo;</span>
              <blockquote className="serif-display text-2xl leading-tight text-stone-900 mb-6 text-balance">
                {t.q}
              </blockquote>
              <figcaption className="mt-auto text-sm">
                <p className="font-medium text-stone-900">{t.a}</p>
                <p className="eyebrow text-stone-500 mt-1">{t.m}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* 15. INSTAGRAM PREVIEW */}
      <Section
        eyebrow="@lythe.wellness"
        title="Quiet moments, gathered."
        intro="A living gallery of the Lythe world — coming soon to Instagram."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-black/5 bg-gradient-to-br from-stone-100 via-stone-200 to-stone-100 group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="serif-display text-2xl text-stone-500/60">Lythe</span>
              </div>
              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-stone-500">
          Follow us — feed launching alongside our booking platform.
        </p>
      </Section>

      {/* 16. FINAL CTA */}
      <Section tone="dark" className="!py-32">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow text-gold-soft mb-6">Begin</p>
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
