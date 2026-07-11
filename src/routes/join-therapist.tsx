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
  { h: "Flexible Working", p: "Set your own hours, coverage and visit types." },
  { h: "More Clients", p: "Vetted, respectful clients in London's finest postcodes." },
  { h: "Professional Support", p: "Dedicated concierge, insurance-backed bookings, ongoing training." },
  { h: "Luxury Brand", p: "A quiet, considered brand your work deserves." },
  { h: "Career Growth", p: "Continuous learning across prenatal, sports and corporate wellness." },
  { h: "Fair Earnings", p: "Transparent pay. No hidden platform fees." },
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
  { n: "01", h: "Apply", p: "Two minutes. Only the essentials." },
  { n: "02", h: "Review", p: "Our clinical lead reviews your profile." },
  { n: "03", h: "Meet", p: "A conversation and a short practical." },
  { n: "04", h: "Verify", p: "DBS, insurance and reference checks." },
  { n: "05", h: "Onboard", p: "Brand training and welcome pack." },
  { n: "06", h: "Go Live", p: "Bookings begin arriving." },
];

type Form = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  experience: string;
  qualification: string;
};

const STEPS = ["You", "Practice", "Contact"] as const;

function JoinTherapistPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    experience: "",
    qualification: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const canAdvance =
    (step === 0 && form.name.trim() && form.postcode.trim()) ||
    (step === 1 && form.experience.trim() && form.qualification.trim()) ||
    step === 2;

  return (
    <SiteLayout>
      {/* HERO — quieter */}
      <section className="bg-forest text-stone-100">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <p className="eyebrow text-gold-soft mb-5">Careers · Therapists</p>
          <h1 className="serif-display text-4xl md:text-6xl lg:text-7xl text-stone-50 mb-8 max-w-[20ch] text-balance">
            Join London&apos;s most considered wellness collective.
          </h1>
          <p className="text-stone-300 text-lg leading-relaxed max-w-[46ch] mb-10">
            Premium clients. Fair earnings. Real support. Apply in under two minutes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#apply"
              className="bg-stone-50 text-stone-900 px-8 py-4 rounded-full text-sm font-medium hover:bg-gold hover:text-stone-50 transition"
            >
              Apply Now
            </a>
            <a
              href="#onboarding"
              className="text-sm font-medium text-stone-100 border-b border-stone-100/50 pb-1 hover:border-gold hover:text-gold-soft transition self-center"
            >
              How it works →
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS — softer */}
      <Section eyebrow="Why Lythe" title="A better place to practise.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {BENEFITS.map((b, i) => (
            <div key={b.h}>
              <p className="serif-display text-gold text-xl mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="serif-display text-2xl text-stone-900 mb-3">{b.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed max-w-[32ch]">{b.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CHECKLIST */}
      <Section tone="warm" eyebrow="Who We Look For" title="Our standard, quietly held.">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ul className="space-y-4">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-start gap-4 border-b border-stone-200 pb-4">
                <span className="mt-1.5 size-1.5 rounded-full bg-gold shrink-0" />
                <span className="text-base text-stone-900">{c}</span>
              </li>
            ))}
          </ul>
          <div className="lg:pl-8">
            <p className="eyebrow text-gold mb-4">A quieter standard</p>
            <p className="serif-display text-3xl text-stone-900 leading-tight mb-6">
              &ldquo;We accept fewer than 3% of applicants — because our clients trust us to.&rdquo;
            </p>
            <p className="text-stone-700 leading-relaxed max-w-[42ch]">
              Our vetting is rigorous. It&apos;s the reason our clients return and our therapists
              stay.
            </p>
          </div>
        </div>
      </Section>

      {/* ONBOARDING TIMELINE — softer */}
      <div id="onboarding" />
      <Section eyebrow="Onboarding" title="From application to live, in six quiet steps.">
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {ONBOARDING.map((s) => (
            <li key={s.n}>
              <p className="serif-display text-gold text-xl mb-4">{s.n}</p>
              <h3 className="serif-display text-2xl text-stone-900 mb-3">{s.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed max-w-[28ch]">{s.p}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* MULTI-STEP APPLICATION */}
      <section id="apply" className="bg-stone-100 py-28 md:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <p className="eyebrow text-gold mb-4">Apply</p>
          <h2 className="serif-display text-4xl md:text-5xl text-stone-900 mb-4 text-balance">
            Begin your application.
          </h2>
          <p className="text-stone-700 mb-12 max-w-[42ch] leading-relaxed">
            Under two minutes. We&apos;ll respond within three working days.
          </p>

          {submitted ? (
            <div className="bg-stone-50 p-12 md:p-16 text-center">
              <p className="serif-display text-4xl text-stone-900 mb-4">Thank you.</p>
              <p className="text-stone-700 max-w-md mx-auto mb-8 leading-relaxed">
                Your application has been received. Our team will be in touch within three working
                days.
              </p>
              <Link
                to="/"
                className="text-sm font-medium text-forest border-b border-forest/40 pb-1 hover:border-gold hover:text-gold transition"
              >
                Back to home →
              </Link>
            </div>
          ) : (
            <div className="bg-stone-50 p-8 md:p-12">
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-[2px] flex-1 transition-colors ${
                        i <= step ? "bg-forest" : "bg-stone-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-stone-500">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <p className="eyebrow text-forest">{STEPS[step]}</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step < STEPS.length - 1) {
                    if (canAdvance) setStep(step + 1);
                  } else {
                    setSubmitted(true);
                  }
                }}
                className="space-y-6"
              >
                {step === 0 && (
                  <>
                    <ApplyField
                      label="Full name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                    />
                    <ApplyField
                      label="Home postcode"
                      value={form.postcode}
                      onChange={(v) => setForm({ ...form, postcode: v })}
                      placeholder="e.g. SW1A"
                      required
                    />
                  </>
                )}
                {step === 1 && (
                  <>
                    <ApplyField
                      label="Years of experience"
                      value={form.experience}
                      onChange={(v) => setForm({ ...form, experience: v })}
                      placeholder="e.g. 5"
                      required
                    />
                    <ApplyField
                      label="Primary qualification"
                      value={form.qualification}
                      onChange={(v) => setForm({ ...form, qualification: v })}
                      placeholder="e.g. Level 4 Sports Massage"
                      required
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <ApplyField
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                    <ApplyField
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      required
                    />
                  </>
                )}

                <div className="flex items-center justify-between pt-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="text-sm font-medium text-stone-600 hover:text-forest transition"
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    disabled={!canAdvance}
                    className="bg-forest text-stone-50 px-8 py-4 rounded-full text-sm font-medium hover:bg-gold transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {step < STEPS.length - 1 ? "Continue" : "Submit Application"}
                  </button>
                </div>

                {step === STEPS.length - 1 && (
                  <p className="text-xs text-stone-500 pt-4">
                    By submitting, you agree to our{" "}
                    <Link to="/privacy" className="underline underline-offset-4">
                      privacy policy
                    </Link>
                    .
                  </p>
                )}
              </form>
            </div>
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
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-500 block mb-3">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-stone-300 pb-3 text-lg outline-none focus:border-forest transition placeholder:text-stone-300"
      />
    </label>
  );
}
