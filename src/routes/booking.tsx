import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AIPlaceholder } from "@/components/site/AIPlaceholder";
import { TREATMENTS } from "@/lib/treatments";
import { THERAPISTS, getTherapist } from "@/lib/therapists";

const searchSchema = z.object({
  therapist: fallback(z.string(), "").default(""),
  treatment: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/booking")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Book a Treatment — Lythe Wellness" },
      {
        name: "description",
        content:
          "Book your mobile massage in seven quiet steps — choose your treatment, therapist, setting, date and address.",
      },
      { property: "og:title", content: "Book a Treatment — Lythe Wellness" },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingPage,
});

type VisitType = "home" | "hotel" | "office" | "corporate" | "event";
type MatchMode = "auto" | "manual";

const STEPS = [
  "Treatment",
  "Therapist",
  "Visit Type",
  "Date",
  "Time",
  "Address",
  "Summary",
] as const;

const VISIT_TYPES: { id: VisitType; name: string; desc: string }[] = [
  { id: "home", name: "Home", desc: "Your private residence." },
  { id: "hotel", name: "Hotel", desc: "In-suite treatment at your hotel." },
  { id: "office", name: "Office", desc: "Your workplace or private studio." },
  { id: "corporate", name: "Corporate", desc: "Team wellness for a company." },
  { id: "event", name: "Event", desc: "Private event or activation." },
];

function BookingPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [treatmentSlug, setTreatmentSlug] = useState(search.treatment || "");
  const [matchMode, setMatchMode] = useState<MatchMode>(search.therapist ? "manual" : "auto");
  const [therapistSlug, setTherapistSlug] = useState(search.therapist || "");
  const [visit, setVisit] = useState<VisitType | "">("");
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState({ line1: "", line2: "", city: "London", postcode: "", notes: "" });

  const treatment = useMemo(() => TREATMENTS.find((t) => t.slug === treatmentSlug), [treatmentSlug]);
  const therapist = useMemo(() => (therapistSlug ? getTherapist(therapistSlug) : null), [therapistSlug]);
  const availableTherapists = useMemo(
    () => THERAPISTS.filter((t) => !treatmentSlug || t.treatments.includes(treatmentSlug)),
    [treatmentSlug],
  );

  const canAdvance = () => {
    switch (step) {
      case 0: return !!treatmentSlug && duration != null;
      case 1: return matchMode === "auto" || !!therapistSlug;
      case 2: return !!visit;
      case 3: return !!date;
      case 4: return !!time;
      case 5: return !!address.line1 && !!address.postcode;
      default: return true;
    }
  };

  const price = treatment ? treatment.priceFrom + (duration && duration >= 90 ? 25 : 0) : 0;

  return (
    <SiteLayout>
      <section className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <p className="eyebrow text-gold mb-3">Booking</p>
          <h1 className="text-3xl md:text-5xl serif-display text-stone-900 mb-3">
            Arrange your treatment.
          </h1>
          <p className="text-stone-700 max-w-xl leading-relaxed">
            Seven quiet steps — from choosing your treatment to a therapist arriving at your door.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Progress */}
        <ol className="grid grid-cols-7 gap-1 mb-10">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-col items-center gap-2">
              <div
                className={`w-full h-1 rounded-full ${
                  i <= step ? "bg-forest" : "bg-stone-200"
                }`}
              />
              <span
                className={`hidden sm:block text-[10px] tracking-[0.15em] uppercase ${
                  i === step ? "text-forest font-semibold" : "text-stone-500"
                }`}
              >
                {String(i + 1).padStart(2, "0")} · {label}
              </span>
            </li>
          ))}
        </ol>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6 md:p-10 min-h-[420px]">
            {step === 0 && (
              <StepShell title="Choose your treatment" subtitle="Every session is bespoke to your body's needs today.">
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {TREATMENTS.slice(0, 10).map((t) => (
                    <button
                      key={t.slug}
                      onClick={() => setTreatmentSlug(t.slug)}
                      className={`text-left border rounded-xl p-4 transition ${
                        treatmentSlug === t.slug
                          ? "border-forest bg-forest/5"
                          : "border-stone-200 hover:border-forest/40"
                      }`}
                    >
                      <p className="eyebrow text-gold mb-1">{t.categoryLabel}</p>
                      <p className="font-serif text-lg text-stone-900">{t.name}</p>
                      <p className="text-xs text-stone-500 mt-1">From £{t.priceFrom}</p>
                    </button>
                  ))}
                </div>
                {treatment && (
                  <div>
                    <p className="eyebrow text-stone-500 mb-3">Duration</p>
                    <div className="flex gap-2 flex-wrap">
                      {treatment.durations.map((d) => (
                        <button
                          key={d}
                          onClick={() => setDuration(d)}
                          className={`px-5 py-2.5 rounded-full text-sm border transition ${
                            duration === d
                              ? "border-forest bg-forest text-stone-50"
                              : "border-stone-300 hover:border-forest/40"
                          }`}
                        >
                          {d} minutes
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Choose your therapist" subtitle="Let us match a therapist to your needs, or pick your own.">
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => {
                      setMatchMode("auto");
                      setTherapistSlug("");
                    }}
                    className={`text-left border rounded-xl p-5 transition ${
                      matchMode === "auto" ? "border-forest bg-forest/5" : "border-stone-200 hover:border-forest/40"
                    }`}
                  >
                    <p className="eyebrow text-gold mb-2">Recommended</p>
                    <p className="font-serif text-lg text-stone-900 mb-1">Auto Match</p>
                    <p className="text-xs text-stone-700">We match a vetted therapist to your treatment, location and time.</p>
                  </button>
                  <button
                    onClick={() => setMatchMode("manual")}
                    className={`text-left border rounded-xl p-5 transition ${
                      matchMode === "manual" ? "border-forest bg-forest/5" : "border-stone-200 hover:border-forest/40"
                    }`}
                  >
                    <p className="eyebrow text-gold mb-2">Pick Yourself</p>
                    <p className="font-serif text-lg text-stone-900 mb-1">Choose Therapist</p>
                    <p className="text-xs text-stone-700">Browse verified profiles and select your practitioner.</p>
                  </button>
                </div>

                {matchMode === "manual" && (
                  <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                    {availableTherapists.map((t) => (
                      <button
                        key={t.slug}
                        onClick={() => setTherapistSlug(t.slug)}
                        className={`text-left border rounded-xl p-4 flex gap-4 transition ${
                          therapistSlug === t.slug
                            ? "border-forest bg-forest/5"
                            : "border-stone-200 hover:border-forest/40"
                        }`}
                      >
                        <img src={t.photo} alt={t.name} className="size-14 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="font-serif text-base text-stone-900">{t.name}</p>
                          <p className="text-xs text-stone-500 truncate">{t.specialities.join(" · ")}</p>
                          <p className="text-xs text-forest mt-1">★ {t.rating.toFixed(1)} · £{t.priceFrom}+</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="Choose your visit type" subtitle="Where would you like the treatment to take place?">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VISIT_TYPES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVisit(v.id)}
                      className={`text-left border rounded-xl p-5 transition ${
                        visit === v.id ? "border-forest bg-forest/5" : "border-stone-200 hover:border-forest/40"
                      }`}
                    >
                      <p className="font-serif text-lg text-stone-900 mb-1">{v.name}</p>
                      <p className="text-xs text-stone-700">{v.desc}</p>
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title="Select date" subtitle="When suits your day?">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full max-w-xs bg-stone-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-forest"
                />
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Select time" subtitle="Choose a start time. Your therapist arrives 10 minutes early to set up.">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "20:30"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`px-3 py-3 rounded-lg text-sm border transition ${
                        time === t
                          ? "border-forest bg-forest text-stone-50"
                          : "border-stone-200 hover:border-forest/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Where should we come?" subtitle="Your therapist will confirm access details in advance.">
                <div className="grid sm:grid-cols-2 gap-3">
                  <TextField label="Address line 1" value={address.line1} onChange={(v) => setAddress((a) => ({ ...a, line1: v }))} />
                  <TextField label="Address line 2 (optional)" value={address.line2} onChange={(v) => setAddress((a) => ({ ...a, line2: v }))} />
                  <TextField label="City" value={address.city} onChange={(v) => setAddress((a) => ({ ...a, city: v }))} />
                  <TextField label="Postcode" value={address.postcode} onChange={(v) => setAddress((a) => ({ ...a, postcode: v }))} />
                  <div className="sm:col-span-2">
                    <TextField label="Access notes" value={address.notes} onChange={(v) => setAddress((a) => ({ ...a, notes: v }))} />
                  </div>
                </div>
              </StepShell>
            )}

            {step === 6 && (
              <StepShell title="Booking summary" subtitle="Everything in one place — payment arrives with our booking release.">
                <dl className="divide-y divide-stone-200">
                  <SummaryRow label="Treatment" value={treatment ? `${treatment.name} · ${duration} min` : "—"} />
                  <SummaryRow label="Therapist" value={matchMode === "auto" ? "Auto match (best fit)" : therapist?.name ?? "—"} />
                  <SummaryRow label="Visit type" value={visit ? visit[0].toUpperCase() + visit.slice(1) : "—"} />
                  <SummaryRow label="Date & time" value={`${date || "—"}${time ? " · " + time : ""}`} />
                  <SummaryRow label="Address" value={address.line1 ? `${address.line1}, ${address.city} ${address.postcode}` : "—"} />
                  <SummaryRow label="Estimated total" value={price ? `£${price}` : "—"} strong />
                </dl>
                <div className="mt-8 border border-dashed border-forest/30 rounded-xl p-5 bg-forest/5 text-sm text-stone-700">
                  <p className="eyebrow text-forest mb-2">Secure Payment · Coming Soon</p>
                  Encrypted card payment arrives with our booking release. For now, our concierge will confirm your therapist and take payment on arrival.
                </div>
              </StepShell>
            )}

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-stone-200">
              <button
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="text-sm text-stone-700 disabled:opacity-30 hover:text-forest"
              >
                ← Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  disabled={!canAdvance()}
                  onClick={() => setStep((s) => s + 1)}
                  className="bg-forest text-stone-50 px-7 py-3 rounded-full text-sm font-medium disabled:opacity-40 hover:brightness-110 transition"
                >
                  Continue
                </button>
              ) : (
                <button className="bg-gold text-stone-50 px-7 py-3 rounded-full text-sm font-medium hover:brightness-110 transition">
                  Confirm Booking
                </button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-4">
            <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6">
              <p className="eyebrow text-stone-500 mb-3">Your booking</p>
              <div className="space-y-3 text-sm">
                <MiniRow label="Treatment" value={treatment?.name} />
                <MiniRow label="Duration" value={duration ? `${duration} min` : undefined} />
                <MiniRow label="Therapist" value={matchMode === "auto" ? "Auto match" : therapist?.name} />
                <MiniRow label="Visit" value={visit || undefined} />
                <MiniRow label="Date" value={date || undefined} />
                <MiniRow label="Time" value={time || undefined} />
              </div>
              <div className="mt-5 pt-5 border-t border-stone-200 flex items-baseline justify-between">
                <span className="eyebrow text-stone-500">Est. total</span>
                <span className="serif-display text-2xl text-stone-900">£{price || "—"}</span>
              </div>
            </div>
            <AIPlaceholder
              title="AI Treatment Recommendation"
              description="Not sure what you need? Describe how you feel and we'll suggest a treatment. Arriving soon."
            />
            <p className="text-xs text-stone-500 leading-relaxed">
              Not ready?{" "}
              <Link to="/contact" className="underline underline-offset-4 text-forest">
                Speak to our concierge
              </Link>{" "}
              and we&apos;ll arrange everything by phone.
            </p>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <h2 className="serif-display text-3xl md:text-4xl text-stone-900 mb-2">{title}</h2>
      <p className="text-sm text-stone-700 mb-8 max-w-xl">{subtitle}</p>
      {children}
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-500 block mb-2">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-stone-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-forest"
      />
    </label>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-4">
      <span className="eyebrow text-stone-500">{label}</span>
      <span className={strong ? "serif-display text-2xl text-stone-900" : "text-sm font-medium text-stone-900"}>
        {value}
      </span>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs text-stone-500 shrink-0">{label}</span>
      <span className="text-sm text-stone-900 truncate">{value || "—"}</span>
    </div>
  );
}
