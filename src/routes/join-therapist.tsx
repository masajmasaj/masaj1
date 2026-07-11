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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  specialities: string;
  experience: string;
  qualification: string;
  contactMethod: "email" | "phone" | "";
  consent: boolean;
};

const STEPS = ["You", "Practice", "Contact"] as const;

const APPLY_REASSURE = [
  "Applying is free, with no obligation.",
  "Only the essentials now — around two minutes.",
  "Insurance, DBS and references are collected securely during onboarding.",
  "Your details are private and never shared.",
];

const AFTER_APPLY = [
  { n: "01", h: "We review", p: "Our clinical lead reads every application personally, within three working days." },
  { n: "02", h: "A short conversation", p: "A relaxed call and a brief practical to meet the team." },
  { n: "03", h: "Secure verification", p: "DBS, insurance and references, uploaded through our encrypted portal." },
  { n: "04", h: "Welcome & go live", p: "Brand onboarding and your first bookings begin arriving." },
];

function JoinTherapistPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postcode: "",
    specialities: "",
    experience: "",
    qualification: "",
    contactMethod: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const canAdvance =
    (step === 0 && form.firstName.trim() && form.lastName.trim() && form.postcode.trim()) ||
    (step === 1 && form.specialities.trim() && form.experience.trim() && form.qualification.trim()) ||
    (step === 2 && form.email.trim() && form.phone.trim() && form.contactMethod && form.consent);

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
      <section id="apply" className="bg-stone-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
          {/* Reassurance panel */}
          <aside className="lg:sticky lg:top-28">
            <p className="eyebrow text-gold mb-4">Apply</p>
            <h2 className="serif-display text-4xl md:text-5xl text-stone-900 mb-5 text-balance">
              Begin your application.
            </h2>
            <p className="text-stone-700 mb-8 max-w-[40ch] leading-relaxed">
              Applying takes around two minutes. There&apos;s no obligation, and we&apos;ll respond within three working days.
            </p>
            <ul className="space-y-3 mb-8">
              {APPLY_REASSURE.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-stone-800">
                  <span className="mt-1.5 size-1.5 rounded-full bg-forest shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="border-t border-stone-200 pt-6">
              <p className="eyebrow text-stone-500 mb-4">What happens after I apply?</p>
              <ol className="space-y-4">
                {AFTER_APPLY.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="serif-display text-gold text-sm shrink-0">{s.n}</span>
                    <div>
                      <p className="font-serif text-base text-stone-900">{s.h}</p>
                      <p className="text-xs text-stone-600 leading-relaxed">{s.p}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div>
            {submitted ? (
              <div className="bg-stone-50 p-10 md:p-14 text-center">
                <p className="serif-display text-4xl text-stone-900 mb-4">Thank you.</p>
                <p className="text-stone-700 max-w-md mx-auto mb-8 leading-relaxed">
                  Your application has been received. Our team will be in touch within three working days.
                </p>
                <Link
                  to="/"
                  className="text-sm font-medium text-forest border-b border-forest/40 pb-1 hover:border-gold hover:text-gold transition"
                >
                  Back to home →
                </Link>
              </div>
            ) : (
              <div className="bg-stone-50 p-6 md:p-10">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-[3px] flex-1 rounded-full transition-colors ${
                          i <= step ? "bg-forest" : "bg-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-stone-500">
                      Step {step + 1} of {STEPS.length} · {STEPS[step]}
                    </p>
                    <button
                      type="button"
                      disabled
                      title="Save & return — coming soon"
                      className="text-[11px] uppercase tracking-[0.15em] text-stone-400"
                    >
                      Save & return
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (step < STEPS.length - 1) {
                      if (canAdvance) setStep(step + 1);
                    } else if (canAdvance) {
                      setSubmitted(true);
                    }
                  }}
                  className="space-y-6"
                >
                  {step === 0 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <ApplyField
                        label="First name"
                        value={form.firstName}
                        onChange={(v) => setForm({ ...form, firstName: v })}
                        required
                      />
                      <ApplyField
                        label="Last name"
                        value={form.lastName}
                        onChange={(v) => setForm({ ...form, lastName: v })}
                        required
                      />
                      <div className="sm:col-span-2">
                        <ApplyField
                          label="London area or postcode"
                          value={form.postcode}
                          onChange={(v) => setForm({ ...form, postcode: v })}
                          placeholder="e.g. Chelsea or SW3"
                          required
                        />
                      </div>
                    </div>
                  )}
                  {step === 1 && (
                    <>
                      <ApplyField
                        label="Main treatment specialities"
                        value={form.specialities}
                        onChange={(v) => setForm({ ...form, specialities: v })}
                        placeholder="e.g. Deep tissue, Sports, Prenatal"
                        required
                      />
                      <ApplyField
                        label="Experience level"
                        value={form.experience}
                        onChange={(v) => setForm({ ...form, experience: v })}
                        placeholder="e.g. 5 years"
                        required
                      />
                      <ApplyField
                        label="Current professional qualification"
                        value={form.qualification}
                        onChange={(v) => setForm({ ...form, qualification: v })}
                        placeholder="e.g. Level 4 Sports Massage"
                        required
                      />
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Insurance certificates, DBS and references are collected securely later — not now.
                      </p>
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
                      <div>
                        <span className="eyebrow text-stone-500 block mb-3">Preferred contact method</span>
                        <div className="flex gap-2">
                          {(["email", "phone"] as const).map((m) => (
                            <button
                              type="button"
                              key={m}
                              onClick={() => setForm({ ...form, contactMethod: m })}
                              className={`px-5 py-2.5 rounded-full text-sm border transition capitalize ${
                                form.contactMethod === m
                                  ? "border-forest bg-forest text-stone-50"
                                  : "border-stone-300 hover:border-forest/40"
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                      <label className="flex items-start gap-3 text-sm text-stone-700">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                          className="mt-1 accent-forest"
                        />
                        <span>
                          I agree to Lythe contacting me about this application. My details stay
                          private — see our{" "}
                          <Link to="/privacy" className="underline underline-offset-4">
                            privacy policy
                          </Link>
                          .
                        </span>
                      </label>
                    </>
                  )}

                  <div className="flex items-center justify-between pt-6 gap-4">
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
                </form>
              </div>
            )}
          </div>
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
