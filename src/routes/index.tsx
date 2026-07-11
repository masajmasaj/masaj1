import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BookingWidget } from "@/components/site/BookingWidget";
import { TrustBand } from "@/components/site/TrustBand";
import { BRAND } from "@/lib/site-config";
import { TREATMENTS } from "@/lib/treatments";
import heroImg from "@/assets/hero-cinematic.jpg";
import heroSanctuary from "@/assets/hero-sanctuary.jpg";
import serviceHotel from "@/assets/service-hotel.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceSports from "@/assets/service-sports.jpg";
import therapistImg from "@/assets/therapist-portrait.jpg";
import shopImg from "@/assets/shop-preview.jpg";

const HOMEPAGE_TITLE = "Luxury Mobile Massage & Wellness in London | Lythe";
const HOMEPAGE_DESCRIPTION =
  "Professional mobile massage and wellness delivered across London — home, hotel, office and corporate. Vetted UK therapists. Aman-level care, brought to you.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOMEPAGE_TITLE },
      { name: "description", content: HOMEPAGE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "luxury massage London, mobile massage London, home massage London, hotel massage London, corporate wellness London, sports massage London",
      },
      { property: "og:title", content: HOMEPAGE_TITLE },
      { property: "og:description", content: BRAND.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: HOMEPAGE_TITLE },
      { name: "twitter:description", content: HOMEPAGE_DESCRIPTION },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Lythe Wellness",
          description: BRAND.description,
          areaServed: "London, United Kingdom",
          address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        }),
      },
    ],
  }),
  component: HomePage,
});

const SIGNATURE_SLUGS = [
  "deep-tissue-massage",
  "swedish-massage",
  "sports-massage",
  "pregnancy-massage",
  "senior-massage",
  "couples-massage",
];

const SERVICE_BLOCKS = [
  {
    eyebrow: "01 — At Home",
    title: "Home Massage",
    body: "A private treatment room, set up quietly in your own space. Warmed oils, fresh linen, and a therapist chosen for the way you like to be worked on.",
    image: heroSanctuary,
    to: "/booking",
    cta: "Book a home visit",
  },
  {
    eyebrow: "02 — In Suite",
    title: "Hotel Massage",
    body: "Discreet, in-suite wellness for guests of London's finest hotels. From arrival to après-dinner rituals — booked in minutes, delivered without a footprint.",
    image: serviceHotel,
    to: "/booking",
    cta: "Book to your suite",
  },
  {
    eyebrow: "03 — For Teams",
    title: "Corporate Wellness",
    body: "On-site chair, table and event programmes for teams that take care seriously. Executive floors, wellness days, launches, away-days.",
    image: serviceCorporate,
    to: "/corporate",
    cta: "Design a programme",
  },
  {
    eyebrow: "04 — For Athletes",
    title: "Sports & Recovery",
    body: "Clinical-grade pre-event, post-event and rehabilitation work for athletes and active professionals. Trained hands, measurable outcomes.",
    image: serviceSports,
    to: "/treatments",
    cta: "Explore recovery",
  },
];

const STEPS = [
  { n: "01", h: "Choose", p: "Tell us your body, your setting, your time." },
  { n: "02", h: "Match", p: "We pair you with the right therapist for the work." },
  { n: "03", h: "Book", p: "Confirm in a moment. Reschedule with ease." },
  { n: "04", h: "Relax", p: "Your therapist arrives fully prepared. You arrive at yourself." },
];

const JOURNAL = [
  { tag: "The Journal", h: "The quiet return of the ritual of touch", p: "Why the city's most considered residents are choosing home over spa." },
  { tag: "Recovery", h: "Deep tissue, and the case for slowness", p: "A therapist's field note on pressure, patience and the nervous system." },
  { tag: "Prenatal", h: "A body remade, held with care", p: "Notes from our pregnancy specialists on trimester-safe work." },
];

const ECOSYSTEM = [
  {
    tag: "Membership",
    h: "A ritual, kept.",
    p: "Monthly treatments, priority booking, and a quieter standard of care — from £190.",
    to: "/membership",
  },
  {
    tag: "Gift Cards",
    h: "The most considered gift in London.",
    p: "Elegant physical and digital cards for birthdays, thanks, and the season.",
    to: "/gift-cards",
  },
  {
    tag: "Wellness Shop",
    h: "The therapist's cabinet.",
    p: "Oils, tools and small rituals curated by our practitioners for use between visits.",
    to: "/shop",
  },
];

function HomePage() {
  const signature = SIGNATURE_SLUGS
    .map((slug) => TREATMENTS.find((t) => t.slug === slug))
    .filter((t): t is (typeof TREATMENTS)[number] => Boolean(t));

  return (
    <SiteLayout>
      {/* 1. CINEMATIC HERO */}
      <section className="relative -mt-20 h-[100svh] min-h-[720px] max-h-[960px] w-full overflow-hidden text-stone-50">
        <img
          src={heroImg}
          alt="A private London treatment room at golden hour, dressed with fresh linen and a single candle"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/20 to-stone-900/85" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20 md:pb-28">
          <p className="eyebrow text-gold-soft mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold-soft" />
            Lythe · London
          </p>
          <h1 className="serif-display text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-[18ch] text-balance">
            Luxury Mobile Massage &amp; Wellness Across London.
          </h1>
          <p className="mt-8 max-w-[46ch] text-base md:text-lg text-stone-200/90 leading-relaxed">
            Considered care, brought to your home, hotel or office by vetted London therapists.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/booking"
              className="bg-stone-50 text-stone-900 px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-gold hover:text-stone-50 transition"
            >
              Book Now
            </Link>
            <Link
              to="/treatments"
              className="text-sm font-medium text-stone-50 border-b border-stone-50/60 pb-1 hover:border-gold hover:text-gold-soft transition"
            >
              Explore Treatments →
            </Link>
          </div>
        </div>
      </section>

      {/* Elegant booking widget — floating on stone */}
      <section className="bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 -mt-14 md:-mt-16 relative z-20">
          <div className="rounded-2xl bg-stone-50 shadow-[0_30px_80px_-40px_rgba(20,20,15,0.35)] ring-1 ring-stone-200/60 overflow-hidden">
            <BookingWidget />
          </div>
        </div>
      </section>



      <div className="bg-stone-50 pt-16 md:pt-20">
        <TrustBand />
      </div>

      {/* 3. EDITORIAL SERVICE BLOCKS — alternating full-bleed */}
      <section className="bg-stone-50 py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-28 max-w-[52ch]">
          <p className="eyebrow text-gold mb-5">The Service</p>
          <h2 className="serif-display text-4xl md:text-6xl text-stone-900 text-balance">
            One collective, every setting.
          </h2>
          <p className="mt-6 text-stone-700 leading-relaxed">
            Wherever the room is, the standard is the same. Trained hands, hotel-grade linen and the
            unhurried care of a serious wellness practice — brought to you.
          </p>
        </div>

        <div className="space-y-28 md:space-y-40">
          {SERVICE_BLOCKS.map((block, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={block.title}
                className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                <div
                  className={`lg:col-span-7 relative overflow-hidden rounded-sm aspect-[4/3] lg:aspect-[5/4] ${reverse ? "lg:order-2" : ""}`}
                >
                  <img
                    src={block.image}
                    alt={block.title}
                    loading="lazy"
                    width={1400}
                    height={1600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
                  <p className="eyebrow text-gold mb-5">{block.eyebrow}</p>
                  <h3 className="serif-display text-4xl md:text-5xl text-stone-900 mb-6 text-balance">
                    {block.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed text-lg max-w-[42ch]">{block.body}</p>
                  <Link
                    to={block.to}
                    className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-forest border-b border-forest/40 pb-1 hover:border-gold hover:text-gold transition"
                  >
                    {block.cta}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SIGNATURE TREATMENTS — editorial 3-up */}
      <section className="bg-stone-100 py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div className="max-w-[48ch]">
              <p className="eyebrow text-gold mb-5">Signature Treatments</p>
              <h2 className="serif-display text-4xl md:text-6xl text-stone-900 text-balance">
                Fewer treatments. Better performed.
              </h2>
            </div>
            <Link
              to="/treatments"
              className="text-sm font-medium text-stone-900 border-b border-stone-900/40 pb-1 hover:border-gold hover:text-gold transition whitespace-nowrap"
            >
              The full menu →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20">
            {signature.map((t) => (
              <Link
                key={t.slug}
                to="/treatments"
                className="group block"
              >
                <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-stone-200">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow text-gold mb-2">{t.categoryLabel}</p>
                <h3 className="serif-display text-2xl md:text-3xl text-stone-900 mb-3">{t.name}</h3>
                <p className="text-sm text-stone-700 leading-relaxed max-w-[38ch]">{t.description}</p>
                <p className="mt-5 text-xs tracking-[0.2em] uppercase text-stone-500">
                  From £{t.priceFrom} · {t.durations[0]}–{t.durations[t.durations.length - 1]} min
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS — minimal editorial */}
      <section className="bg-stone-50 py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-[42ch] mb-16 md:mb-20">
            <p className="eyebrow text-gold mb-5">The Journey</p>
            <h2 className="serif-display text-4xl md:text-6xl text-stone-900 text-balance">
              Choose. Match. Book. Relax.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-10 border-t border-stone-200">
            {STEPS.map((s) => (
              <div key={s.n} className="pt-10 lg:pr-8 lg:border-r last:border-r-0 border-stone-200/60">
                <p className="serif-display text-gold text-2xl mb-6">{s.n}</p>
                <h3 className="serif-display text-2xl md:text-3xl text-stone-900 mb-3">{s.h}</h3>
                <p className="text-sm text-stone-700 leading-relaxed max-w-[28ch]">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER STORY */}
      <section className="bg-stone-100 py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={therapistImg}
              alt="A portrait of Lythe's founding therapist"
              loading="lazy"
              width={1000}
              height={1250}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <p className="eyebrow text-gold mb-5">Our Story</p>
            <h2 className="serif-display text-4xl md:text-5xl text-stone-900 mb-8 text-balance">
              Inspired by Filipino hospitality. Designed for modern London wellness.
            </h2>
            <p className="text-lg text-stone-700 leading-relaxed max-w-[52ch]">
              Lythe was founded on a simple belief — that care, when offered with real warmth and
              real skill, is one of the last great luxuries. We built a collective of London
              therapists to bring that quiet standard into the home, the suite and the office.
            </p>
            <p className="mt-6 text-stone-700 leading-relaxed max-w-[52ch]">
              No spa lobby. No hurry. Only the treatment, exactly as it should be.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-forest border-b border-forest/40 pb-1 hover:border-gold hover:text-gold transition"
            >
              Read the full story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. THE JOURNAL — magazine style */}
      <section className="bg-stone-50 py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div className="max-w-[46ch]">
              <p className="eyebrow text-gold mb-5">The Journal</p>
              <h2 className="serif-display text-4xl md:text-6xl text-stone-900 text-balance">
                Field notes from our practice.
              </h2>
            </div>
            <Link
              to="/knowledge"
              className="text-sm font-medium text-stone-900 border-b border-stone-900/40 pb-1 hover:border-gold hover:text-gold transition whitespace-nowrap"
            >
              Read the journal →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Lead article */}
            <Link to="/knowledge" className="group lg:col-span-7 block">
              <div className="relative aspect-[16/10] overflow-hidden mb-8 bg-stone-200">
                <img
                  src={heroSanctuary}
                  alt="Journal lead"
                  loading="lazy"
                  width={1400}
                  height={900}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow text-gold mb-3">{JOURNAL[0].tag}</p>
              <h3 className="serif-display text-3xl md:text-5xl text-stone-900 mb-4 text-balance max-w-[24ch]">
                {JOURNAL[0].h}
              </h3>
              <p className="text-stone-700 leading-relaxed max-w-[52ch]">{JOURNAL[0].p}</p>
            </Link>

            <div className="lg:col-span-5 flex flex-col divide-y divide-stone-200">
              {JOURNAL.slice(1).map((a) => (
                <Link
                  key={a.h}
                  to="/knowledge"
                  className="group py-8 first:pt-0 last:pb-0 block"
                >
                  <p className="eyebrow text-gold mb-3">{a.tag}</p>
                  <h4 className="serif-display text-2xl md:text-3xl text-stone-900 mb-3 group-hover:text-forest transition-colors">
                    {a.h}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed">{a.p}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ECOSYSTEM — Membership / Gift / Shop */}
      <section className="bg-stone-100 py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-[46ch] mb-16 md:mb-20">
            <p className="eyebrow text-gold mb-5">The Ecosystem</p>
            <h2 className="serif-display text-4xl md:text-6xl text-stone-900 text-balance">
              Beyond the single treatment.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {ECOSYSTEM.map((item, i) => (
              <Link
                key={item.tag}
                to={item.to}
                className="group relative flex flex-col justify-between p-10 md:p-12 aspect-[3/4] bg-stone-50 hover:bg-stone-50 transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-transparent to-stone-100" />
                <div className="relative">
                  <p className="serif-display text-gold text-2xl mb-8">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="eyebrow text-stone-500 mb-4">{item.tag}</p>
                  <h3 className="serif-display text-3xl md:text-4xl text-stone-900 mb-5 text-balance">
                    {item.h}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed max-w-[32ch]">{item.p}</p>
                </div>
                <span className="relative text-xs tracking-[0.2em] uppercase text-forest inline-flex items-center gap-3 mt-10">
                  Discover
                  <span className="h-px w-8 bg-gold transition-all group-hover:w-12" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Shop teaser strip */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 aspect-[5/4] overflow-hidden rounded-sm">
            <img
              src={shopImg}
              alt="A curated selection of therapist-chosen wellness oils and tools"
              loading="lazy"
              width={1200}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="eyebrow text-gold mb-5">Coming soon</p>
            <h2 className="serif-display text-3xl md:text-5xl text-stone-900 mb-6 text-balance">
              A small, considered wellness shop.
            </h2>
            <p className="text-stone-700 leading-relaxed max-w-[46ch]">
              Oils, tools and quiet rituals — chosen by our therapists, made by makers we respect,
              designed to extend the treatment between visits.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA — dark editorial */}
      <section className="bg-forest text-stone-100">
        <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 text-center">
          <p className="eyebrow text-gold-soft mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold-soft" />
            Book Today
            <span className="h-px w-8 bg-gold-soft" />
          </p>
          <h2 className="serif-display text-5xl md:text-7xl lg:text-8xl text-stone-50 max-w-[16ch] mx-auto text-balance">
            The treatment, brought to you.
          </h2>
          <p className="mt-10 max-w-[48ch] mx-auto text-stone-300 leading-relaxed text-lg">
            London's most considered mobile wellness collective is a single tap away.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="bg-stone-50 text-stone-900 px-10 py-5 rounded-full text-sm font-medium hover:bg-gold hover:text-stone-50 transition"
            >
              Book a Treatment
            </Link>
            <Link
              to="/membership"
              className="text-sm font-medium text-stone-50 border-b border-stone-50/60 pb-1 hover:border-gold hover:text-gold-soft transition self-center"
            >
              Explore membership →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
