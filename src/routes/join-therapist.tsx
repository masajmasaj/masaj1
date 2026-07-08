import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/join-therapist")({
  head: () => ({
    meta: [
      { title: "Join Lythe — Massage Therapist Careers in London" },
      {
        name: "description",
        content:
          "Join the Lythe collective. Premium mobile massage work across London for qualified, insured UK therapists. Flexible hours, transparent earnings, professional support.",
      },
      { property: "og:title", content: "Join Lythe — Therapist Careers" },
      { property: "og:url", content: "/join-therapist" },
    ],
    links: [{ rel: "canonical", href: "/join-therapist" }],
  }),
  component: JoinTherapistPage,
});

const BENEFITS = [
  { h: "Premium Clientele", p: "Vetted, respectful clients in London's most desirable postcodes." },
  { h: "Fair Earnings", p: "Transparent pay structure with no hidden platform fees." },
  { h: "Flexible Schedule", p: "You choose your working hours, coverage area and visit types." },
  { h: "Professional Support", p: "Dedicated concierge, insurance-backed bookings, ongoing training." },
  { h: "Marketing Done For You", p: "SEO, brand and demand generation handled — you focus on your craft." },
  { h: "Career Development", p: "Continuous learning across prenatal, sports rehab and corporate wellness." },
];

const CHECKLIST = [
  "Level 3 or 4 accredited massage qualification",
  "Minimum 2 years of hands-on practice",
  "Public liability insurance (£5m+)",
  "Enhanced DBS check (or willingness to complete)",
  "Own treatment couch and equipment",
  "Right to work in the UK",
];

const ONBOARDING = [
  { n: "01", h: "Apply Online", p: "Complete the short application below and upload your credentials." },
  { n: "02", h: "Portfolio Review", p: "Our clinical lead reviews your qualifications and experience." },
  { n: "03", h: "Interview & Assessment", p: "A conversation with our team and a practical technique review." },
  { n: "04", h: "Compliance Check", p: "DBS verification, insurance sign-off and reference checks." },
  { n: "05", h: "Onboarding", p: "Brand training, platform walkthrough and welcome pack." },
  { n: "06", h: "Go Live", p: "Your profile goes live and bookings begin arriving." },
];

function JoinTherapistPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    experience: "",
    qualifications: "",
    speciality: "",
    availability: "",
    about: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-forest text-stone-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-soft mb-4">Careers · Therapists</p>
            <h1 className="text-4xl md:text-6xl serif-display text-stone-50 mb-6 text-balance">
              Join London&apos;s most considered wellness collective.
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-xl">
              We&apos;re building a home for the UK&apos;s finest mobile massage therapists — with
              premium clients, fair earnings and the professional support you deserve.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#apply"
                className="bg-gold text-stone-50 px-7 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
              >
                Apply Now
              </a>
              <a
                href="#onboarding"
                className="border border-stone-100/30 text-stone-100 px-7 py-4 rounded-full text-sm font-medium hover:bg-stone-100/10 transition"
              >
                How It Works
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "£45–95", l: "Per hour, average" },
              { v: "500+", l: "Clients on the platform" },
              { v: "Top 3%", l: "Applicant acceptance" },
              { v: "You", l: "Choose your hours" },
            ].map((s) => (
              <div key={s.l} className="border border-stone-100/15 rounded-2xl p-6 bg-stone-100/[0.04]">
                <p className="serif-display text-3xl text-stone-50 mb-2">{s.v}</p>
                <p className="eyebrow text-stone-300">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <Section eyebrow="Why Lythe" title="Everything you need to grow your practice.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <div key={b.h} className="border border-stone-200 bg-stone-50 rounded-2xl p-6">
              <div className="size-10 rounded-full bg-stone-100 ring-1 ring-stone-200 flex items-center justify-center mb-4">
                <span className="text-xs font-medium text-forest">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-serif text-lg text-stone-900 mb-2">{b.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{b.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CHECKLIST */}
      <Section tone="warm" eyebrow="Qualification Checklist" title="Who we&#39;re looking for.">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <ul className="space-y-3">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-start gap-3 border-b border-stone-200 pb-3">
                <span className="mt-1.5 size-4 rounded-full bg-forest text-stone-50 inline-flex items-center justify-center shrink-0">
                  <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5 9-11" />
                  </svg>
                </span>
                <span className="text-sm text-stone-900">{c}</span>
              </li>
            ))}
          </ul>
          <div className="border border-stone-200 rounded-2xl p-8 bg-stone-50">
            <p className="eyebrow text-gold mb-3">A quieter standard</p>
            <p className="serif-display text-2xl text-stone-900 mb-4">
              &ldquo;We accept fewer than 3% of applicants — because our clients trust us to.&rdquo;
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              Our vetting is rigorous, but it&apos;s the reason our clients return and our therapists
              stay. If you take pride in your craft, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </Section>

      {/* ONBOARDING TIMELINE */}
      <Section id="onboarding" eyebrow="Onboarding" title="From application to live in six steps.">
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ONBOARDING.map((s) => (
            <li key={s.n} className="border border-stone-200 rounded-2xl bg-stone-50 p-6">
              <p className="serif-display text-4xl text-gold mb-4">{s.n}</p>
              <h3 className="font-serif text-lg text-stone-900 mb-2">{s.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{s.p}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* APPLICATION FORM */}
      <section id="apply" className="bg-stone-100 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="eyebrow text-gold mb-3">Apply</p>
          <h2 className="text-4xl serif-display text-stone-900 mb-4">Begin your application.</h2>
          <p className="text-stone-700 mb-10 max-w-xl leading-relaxed">
            Tell us about you — we&apos;ll be in touch within 3 working days.
          </p>

          {submitted ? (
            <div className="border border-forest/30 bg-stone-50 rounded-2xl p-10 text-center">
              <p className="serif-display text-3xl text-stone-900 mb-3">Thank you.</p>
              <p className="text-stone-700 max-w-md mx-auto mb-6">
                Your application has been received. Our team will review your profile and respond within
                three working days.
              </p>
              <Link to="/" className="text-sm text-forest underline underline-offset-8">
                Back to home →
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="border border-stone-200 rounded-2xl bg-stone-50 p-8 grid sm:grid-cols-2 gap-5"
            >
              <ApplyField label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <ApplyField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <ApplyField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <ApplyField label="Home postcode" value={form.postcode} onChange={(v) => setForm({ ...form, postcode: v })} />
              <ApplyField label="Years of experience" value={form.experience} onChange={(v) => setForm({ ...form, experience: v })} />
              <ApplyField label="Primary speciality" value={form.speciality} onChange={(v) => setForm({ ...form, speciality: v })} />
              <div className="sm:col-span-2">
                <ApplyField label="Qualifications (comma-separated)" value={form.qualifications} onChange={(v) => setForm({ ...form, qualifications: v })} />
              </div>
              <div className="sm:col-span-2">
                <ApplyField label="Availability (days & hours)" value={form.availability} onChange={(v) => setForm({ ...form, availability: v })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block">
                  <span className="eyebrow text-stone-500 block mb-2">About you</span>
                  <textarea
                    rows={4}
                    value={form.about}
                    onChange={(e) => setForm({ ...form, about: e.target.value })}
                    className="w-full bg-stone-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-forest resize-none"
                    placeholder="Your approach, philosophy and what draws you to Lythe."
                  />
                </label>
              </div>
              <div className="sm:col-span-2 flex items-center justify-between mt-4">
                <p className="text-xs text-stone-500 max-w-xs">
                  By submitting, you agree to our{" "}
                  <Link to="/privacy" className="underline underline-offset-4">privacy policy</Link>.
                </p>
                <button
                  type="submit"
                  className="bg-forest text-stone-50 px-8 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function ApplyField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-500 block mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full bg-stone-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-forest"
      />
    </label>
  );
}
