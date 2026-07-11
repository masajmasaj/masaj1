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
          "Book your mobile massage in a few quiet steps. Choose a treatment or let us guide you.",
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
type StartMode = "browse" | "guided";

const STEPS = [
  "Treatment",
  "Therapist",
  "Visit",
  "When",
  "Where",
  "Review",
] as const;

const VISIT_TYPES: { id: VisitType; name: string; desc: string }[] = [
  { id: "home", name: "Home", desc: "Your private residence." },
  { id: "hotel", name: "Hotel", desc: "In-suite at your hotel." },
  { id: "office", name: "Office", desc: "At your workplace." },
  { id: "corporate", name: "Corporate", desc: "Team wellness." },
  { id: "event", name: "Event", desc: "Private event or activation." },
];

const NEEDS: { id: string; label: string; treatments: string[]; note: string }[] = [
  { id: "relax", label: "Relaxation", treatments: ["swedish-massage", "aromatherapy-massage", "hot-stone-massage"], note: "Slow, sensory work to quiet the nervous system." },
  { id: "stress", label: "Stress", treatments: ["stress-relief-massage", "aromatherapy-massage", "indian-head-massage"], note: "Calming rituals for an overloaded mind." },
  { id: "tension", label: "Muscle tension", treatments: ["deep-tissue-massage", "therapeutic-massage", "trigger-point-therapy"], note: "Focused pressure for chronic tightness." },
  { id: "sport", label: "Sports recovery", treatments: ["sports-massage", "muscle-recovery", "post-event-massage"], note: "Recovery for active bodies." },
  { id: "neck", label: "Neck & shoulders", treatments: ["back-neck-shoulder", "trigger-point-therapy", "indian-head-massage"], note: "Screen-fatigue and desk-strain relief." },
  { id: "pregnancy", label: "Pregnancy wellness", treatments: ["pregnancy-massage", "postnatal-massage"], note: "Specialist prenatal and postnatal care." },
  { id: "senior", label: "Gentle senior wellness", treatments: ["senior-massage", "gentle-therapeutic", "mobility-support"], note: "Low-pressure, considered care." },
  { id: "couples", label: "Couples experience", treatments: ["couples-massage"], note: "A shared moment of stillness." },
];

function BookingPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [startMode, setStartMode] = useState<StartMode | null>(search.treatment ? "browse" : null);
  const [needId, setNeedId] = useState<string>("");
  const [treatmentSlug, setTreatmentSlug] = useState(search.treatment || "");
  const [matchMode, setMatchMode] = useState<MatchMode>(search.therapist ? "manual" : "auto");
  const [therapistSlug, setTherapistSlug] = useState(search.therapist || "");
  const [visit, setVisit] = useState<VisitType | "">("");
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "London",
    postcode: "",
    hotelName: "",
    roomNumber: "",
    bookingName: "",
    receptionNotes: "",
    companyName: "",
    floor: "",
    contactName: "",
    notes: "",
  });

  const treatment = useMemo(() => TREATMENTS.find((t) => t.slug === treatmentSlug), [treatmentSlug]);
  const therapist = useMemo(() => (therapistSlug ? getTherapist(therapistSlug) : null), [therapistSlug]);
  const availableTherapists = useMemo(
    () => THERAPISTS.filter((t) => !treatmentSlug || t.treatments.includes(treatmentSlug)),
    [treatmentSlug],
  );
  const need = useMemo(() => NEEDS.find((n) => n.id === needId), [needId]);
  const recommended = useMemo(
    () => (need ? need.treatments.map((s) => TREATMENTS.find((t) => t.slug === s)).filter(Boolean) : []),
    [need],
  ) as typeof TREATMENTS;

  const treatmentBase = treatment?.priceFrom ?? 0;
  const durationSurcharge = duration && duration >= 90 ? 25 : 0;
  const therapistPremium = therapist && therapist.priceFrom > treatmentBase
    ? therapist.priceFrom - treatmentBase
    : 0;
  const total = treatmentBase + durationSurcharge + therapistPremium;

  const canAdvance = () => {
    switch (step) {
      case 0: return !!treatmentSlug && duration != null;
      case 1: return matchMode === "auto" || !!therapistSlug;
      case 2: return !!visit;
      case 3: return !!date && !!time;
      case 4: return isAddressValid(visit, address);
      default: return true;
    }
  };

  return (
    <SiteLayout>
      <section className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-16">
          <p className="eyebrow text-gold mb-3">Booking</p>
          <h1 className="text-3xl md:text-5xl serif-display text-stone-900 mb-3 text-balance">
            Arrange your treatment.
          </h1>
          <p className="text-stone-700 max-w-xl leading-relaxed text-sm md:text-base">
            A few quiet steps — choose a treatment or let us guide you.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12">
        {/* Progress */}
        <ProgressBar step={step} />

        {/* Mobile summary */}
        <MobileSummary
          open={summaryOpen}
          onToggle={() => setSummaryOpen((v) => !v)}
          treatment={treatment?.name}
          duration={duration}
          therapist={matchMode === "auto" ? "Auto match" : therapist?.name}
          visit={visit || undefined}
          date={date}
          time={time}
          total={total}
        />

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10">
          <div className="border border-stone-200 rounded-2xl bg-stone-50 p-5 md:p-10 min-h-[420px]">
            {step === 0 && (
              <StepShell title="What would help you feel your best today?" subtitle="Choose a treatment, or let us guide you.">
                {startMode === null && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <BigChoice
                      title="Choose a treatment"
                      desc="Browse our full menu."
                      onClick={() => setStartMode("browse")}
                    />
                    <BigChoice
                      title="Help me choose"
                      desc="Tell us how you feel."
                      onClick={() => setStartMode("guided")}
                      accent
                    />
                  </div>
                )}

                {startMode === "browse" && (
                  <TreatmentPicker
                    treatments={TREATMENTS}
                    selected={treatmentSlug}
                    onSelect={setTreatmentSlug}
                    duration={duration}
                    onDurationChange={setDuration}
                    treatment={treatment}
                    onSwitchMode={() => {
                      setStartMode("guided");
                      setTreatmentSlug("");
                      setDuration(null);
                    }}
                    modeLabel="Not sure? Help me choose →"
                  />
                )}

                {startMode === "guided" && (
                  <div>
                    <p className="eyebrow text-stone-500 mb-4">What feels most true today?</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {NEEDS.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => {
                            setNeedId(n.id);
                            setTreatmentSlug("");
                            setDuration(null);
                          }}
                          className={`px-5 py-2.5 rounded-full text-sm border transition ${
                            needId === n.id
                              ? "border-forest bg-forest text-stone-50"
                              : "border-stone-300 hover:border-forest/40"
                          }`}
                        >
                          {n.label}
                        </button>
                      ))}
                    </div>

                    {need && (
                      <div className="mb-6">
                        <p className="text-sm text-stone-700 mb-4 max-w-[52ch]">{need.note}</p>
                        <p className="eyebrow text-stone-500 mb-3">Suggested for you</p>
                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                          {recommended.map((t) => (
                            <TreatmentTile
                              key={t.slug}
                              treatment={t}
                              selected={treatmentSlug === t.slug}
                              onClick={() => setTreatmentSlug(t.slug)}
                            />
                          ))}
                        </div>
                        {treatment && (
                          <DurationPicker
                            durations={treatment.durations}
                            selected={duration}
                            onSelect={setDuration}
                          />
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setStartMode("browse");
                        setNeedId("");
                      }}
                      className="text-xs text-stone-500 hover:text-forest underline underline-offset-4"
                    >
                      Browse full menu instead →
                    </button>
                    <p className="text-[11px] text-stone-500 mt-6 leading-relaxed">
                      Guidance only. We don&apos;t diagnose or treat medical conditions.
                    </p>
                  </div>
                )}
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Choose your therapist" subtitle="Pick your own, or let us match the best available.">
                <TrustRow items={[
                  "Identity & qualifications checked",
                  "Professional insurance required",
                  "Reviews verified",
                ]} />
                <div className="grid sm:grid-cols-2 gap-3 mt-6 mb-6">
                  <BigChoice
                    title="Match me"
                    desc="Best available for your treatment and time."
                    onClick={() => {
                      setMatchMode("auto");
                      setTherapistSlug("");
                    }}
                    active={matchMode === "auto"}
                    accent
                  />
                  <BigChoice
                    title="Choose therapist"
                    desc="Browse verified profiles."
                    onClick={() => setMatchMode("manual")}
                    active={matchMode === "manual"}
                  />
                </div>

                {matchMode === "manual" && (
                  <div className="grid sm:grid-cols-2 gap-3 max-h-[28rem] overflow-y-auto pr-1 -mr-1">
                    {availableTherapists.map((t) => (
                      <button
                        key={t.slug}
                        onClick={() => setTherapistSlug(t.slug)}
                        className={`text-left border rounded-xl p-4 flex gap-3 transition ${
                          therapistSlug === t.slug
                            ? "border-forest bg-forest/5"
                            : "border-stone-200 hover:border-forest/40"
                        }`}
                      >
                        <img src={t.photo} alt="" className="size-16 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="font-serif text-base text-stone-900 truncate">
                              {t.name.split(" ")[0]}
                            </p>
                            {t.verified && (
                              <span className="text-[10px] text-forest" title="Verified">✓</span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 truncate">{t.specialities.slice(0, 2).join(" · ")}</p>
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">{t.languages.join(", ")}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <span className="text-xs text-forest">★ {t.rating.toFixed(1)}</span>
                            <span className="text-xs text-stone-700">£{t.priceFrom}+</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">Next: {t.nextAvailable}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {matchMode === "manual" && therapistSlug && therapist && (
                  <Link
                    to="/therapists/$slug"
                    params={{ slug: therapist.slug }}
                    className="inline-block mt-4 text-xs text-forest underline underline-offset-4"
                  >
                    View {therapist.name.split(" ")[0]}&apos;s full profile →
                  </Link>
                )}
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="Where should we come?" subtitle="Choose the setting for your treatment.">
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
              <StepShell title="Choose a date and time" subtitle="Your therapist arrives 10 minutes early to set up.">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="eyebrow text-stone-500 mb-3">Date</p>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-stone-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>
                  <div>
                    <p className="eyebrow text-stone-500 mb-3">Time</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "20:30"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={`px-2 py-3 rounded-lg text-sm border transition ${
                            time === t
                              ? "border-forest bg-forest text-stone-50"
                              : "border-stone-200 hover:border-forest/40"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Address" subtitle={addressSubtitle(visit)}>
                <TrustRow items={[
                  "Address stays private until your booking is confirmed",
                  "Shared only with your therapist",
                ]} />
                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  {(visit === "" || visit === "home") && (
                    <>
                      <TextField label="Postcode" value={address.postcode} onChange={(v) => setAddress((a) => ({ ...a, postcode: v }))} />
                      <TextField label="Address" value={address.line1} onChange={(v) => setAddress((a) => ({ ...a, line1: v }))} />
                      <div className="sm:col-span-2">
                        <TextField label="Access instructions (optional)" value={address.notes} onChange={(v) => setAddress((a) => ({ ...a, notes: v }))} />
                      </div>
                    </>
                  )}

                  {visit === "hotel" && (
                    <>
                      <TextField label="Hotel name" value={address.hotelName} onChange={(v) => setAddress((a) => ({ ...a, hotelName: v }))} />
                      <TextField label="Postcode" value={address.postcode} onChange={(v) => setAddress((a) => ({ ...a, postcode: v }))} />
                      <TextField label="Room number (optional)" value={address.roomNumber} onChange={(v) => setAddress((a) => ({ ...a, roomNumber: v }))} />
                      <TextField label="Booking name" value={address.bookingName} onChange={(v) => setAddress((a) => ({ ...a, bookingName: v }))} />
                      <div className="sm:col-span-2">
                        <TextField label="Reception instructions (optional)" value={address.receptionNotes} onChange={(v) => setAddress((a) => ({ ...a, receptionNotes: v }))} />
                      </div>
                    </>
                  )}

                  {(visit === "office" || visit === "corporate") && (
                    <>
                      <TextField label="Company name" value={address.companyName} onChange={(v) => setAddress((a) => ({ ...a, companyName: v }))} />
                      <TextField label="Workplace address" value={address.line1} onChange={(v) => setAddress((a) => ({ ...a, line1: v }))} />
                      <TextField label="Postcode" value={address.postcode} onChange={(v) => setAddress((a) => ({ ...a, postcode: v }))} />
                      <TextField label="Floor / reception" value={address.floor} onChange={(v) => setAddress((a) => ({ ...a, floor: v }))} />
                      <div className="sm:col-span-2">
                        <TextField label="On-site contact (optional)" value={address.contactName} onChange={(v) => setAddress((a) => ({ ...a, contactName: v }))} />
                      </div>
                    </>
                  )}

                  {visit === "event" && (
                    <>
                      <TextField label="Venue name" value={address.companyName} onChange={(v) => setAddress((a) => ({ ...a, companyName: v }))} />
                      <TextField label="Venue address" value={address.line1} onChange={(v) => setAddress((a) => ({ ...a, line1: v }))} />
                      <TextField label="Postcode" value={address.postcode} onChange={(v) => setAddress((a) => ({ ...a, postcode: v }))} />
                      <TextField label="On-site contact" value={address.contactName} onChange={(v) => setAddress((a) => ({ ...a, contactName: v }))} />
                      <div className="sm:col-span-2">
                        <TextField label="Access notes (optional)" value={address.notes} onChange={(v) => setAddress((a) => ({ ...a, notes: v }))} />
                      </div>
                    </>
                  )}
                </div>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Review & confirm" subtitle="You can change any choice before confirming.">
                <PriceBreakdown
                  treatmentName={treatment?.name}
                  duration={duration}
                  therapist={matchMode === "auto" ? "Auto match" : therapist?.name}
                  visit={visit || undefined}
                  base={treatmentBase}
                  durationSurcharge={durationSurcharge}
                  therapistPremium={therapistPremium}
                  total={total}
                />
                <TrustRow className="mt-6" items={[
                  "Transparent pricing — no hidden booking fees",
                  "Secure payment (coming soon)",
                ]} />
                <p className="text-xs text-stone-500 mt-4">
                  Free cancellation up to 24 hours before. See our{" "}
                  <Link to="/terms" className="underline underline-offset-4">cancellation policy</Link>.
                </p>
              </StepShell>
            )}

            <div className="flex items-center justify-between mt-8 md:mt-10 pt-6 border-t border-stone-200 gap-4">
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
                  className="bg-forest text-stone-50 px-7 py-4 md:py-3 rounded-full text-sm font-medium disabled:opacity-40 hover:brightness-110 transition"
                >
                  Continue
                </button>
              ) : (
                <button className="bg-gold text-stone-50 px-7 py-4 md:py-3 rounded-full text-sm font-medium hover:brightness-110 transition">
                  Confirm Booking
                </button>
              )}
            </div>
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-28 self-start space-y-4">
            <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6">
              <p className="eyebrow text-stone-500 mb-3">Your booking</p>
              <div className="space-y-2.5 text-sm">
                <MiniRow label="Treatment" value={treatment?.name} />
                <MiniRow label="Duration" value={duration ? `${duration} min` : undefined} />
                <MiniRow label="Therapist" value={matchMode === "auto" ? "Auto match" : therapist?.name} />
                <MiniRow label="Visit" value={visit || undefined} />
                <MiniRow label="Date" value={date || undefined} />
                <MiniRow label="Time" value={time || undefined} />
              </div>
              <div className="mt-5 pt-5 border-t border-stone-200 flex items-baseline justify-between">
                <span className="eyebrow text-stone-500">Est. total</span>
                <span className="serif-display text-2xl text-stone-900">£{total || "—"}</span>
              </div>
            </div>
            <AIPlaceholder
              title="AI Treatment Recommendation"
              description="Describe how you feel and we'll suggest a treatment. Arriving soon."
            />
            <p className="text-xs text-stone-500 leading-relaxed">
              Prefer to speak?{" "}
              <Link to="/contact" className="underline underline-offset-4 text-forest">
                Our concierge is here
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-6 md:mb-10">
      <ol className="grid grid-cols-6 gap-1 mb-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-col items-center gap-2">
            <div className={`w-full h-[3px] rounded-full ${i <= step ? "bg-forest" : "bg-stone-200"}`} />
            <span className={`hidden md:block text-[10px] tracking-[0.15em] uppercase ${i === step ? "text-forest font-semibold" : "text-stone-500"}`}>
              {label}
            </span>
          </li>
        ))}
      </ol>
      <p className="md:hidden text-[11px] uppercase tracking-[0.15em] text-stone-600 text-center">
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>
    </div>
  );
}

function MobileSummary({
  open, onToggle, treatment, duration, therapist, visit, date, time, total,
}: {
  open: boolean; onToggle: () => void;
  treatment?: string; duration: number | null; therapist?: string;
  visit?: string; date?: string; time?: string; total: number;
}) {
  return (
    <div className="lg:hidden mb-4 border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <p className="eyebrow text-stone-500">Your booking</p>
          <p className="text-sm text-stone-900 truncate">
            {treatment || "Not yet chosen"}
            {duration ? ` · ${duration} min` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="serif-display text-lg text-stone-900">£{total || "—"}</span>
          <span className="text-stone-500 text-lg">{open ? "▴" : "▾"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 space-y-2 border-t border-stone-200 text-sm">
          <MiniRow label="Therapist" value={therapist} />
          <MiniRow label="Visit" value={visit} />
          <MiniRow label="Date" value={date} />
          <MiniRow label="Time" value={time} />
        </div>
      )}
    </div>
  );
}

function BigChoice({
  title, desc, onClick, active, accent,
}: {
  title: string; desc: string; onClick: () => void; active?: boolean; accent?: boolean;
}) {
  const base = "text-left border rounded-xl p-6 transition";
  const state = active
    ? "border-forest bg-forest/5"
    : "border-stone-200 hover:border-forest/40";
  return (
    <button onClick={onClick} className={`${base} ${state}`}>
      {accent && <p className="eyebrow text-gold mb-2">Recommended</p>}
      <p className="font-serif text-xl text-stone-900 mb-1">{title}</p>
      <p className="text-sm text-stone-700">{desc}</p>
    </button>
  );
}

function TreatmentPicker({
  treatments, selected, onSelect, duration, onDurationChange, treatment,
  onSwitchMode, modeLabel,
}: {
  treatments: typeof TREATMENTS;
  selected: string;
  onSelect: (s: string) => void;
  duration: number | null;
  onDurationChange: (d: number) => void;
  treatment?: (typeof TREATMENTS)[number];
  onSwitchMode: () => void;
  modeLabel: string;
}) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-6 max-h-[28rem] overflow-y-auto pr-1 -mr-1">
        {treatments.map((t) => (
          <TreatmentTile
            key={t.slug}
            treatment={t}
            selected={selected === t.slug}
            onClick={() => onSelect(t.slug)}
          />
        ))}
      </div>
      {treatment && (
        <DurationPicker durations={treatment.durations} selected={duration} onSelect={onDurationChange} />
      )}
      <button
        onClick={onSwitchMode}
        className="text-xs text-stone-500 hover:text-forest underline underline-offset-4 mt-6"
      >
        {modeLabel}
      </button>
    </div>
  );
}

function TreatmentTile({
  treatment, selected, onClick,
}: {
  treatment: (typeof TREATMENTS)[number]; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left border rounded-xl p-4 transition ${
        selected ? "border-forest bg-forest/5" : "border-stone-200 hover:border-forest/40"
      }`}
    >
      <p className="eyebrow text-gold mb-1">{treatment.categoryLabel}</p>
      <p className="font-serif text-lg text-stone-900">{treatment.name}</p>
      <p className="text-xs text-stone-500 mt-1">From £{treatment.priceFrom}</p>
    </button>
  );
}

function DurationPicker({
  durations, selected, onSelect,
}: { durations: number[]; selected: number | null; onSelect: (d: number) => void }) {
  return (
    <div>
      <p className="eyebrow text-stone-500 mb-3">Duration</p>
      <div className="flex gap-2 flex-wrap">
        {durations.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`px-5 py-3 rounded-full text-sm border transition ${
              selected === d
                ? "border-forest bg-forest text-stone-50"
                : "border-stone-300 hover:border-forest/40"
            }`}
          >
            {d} min
          </button>
        ))}
      </div>
    </div>
  );
}

function TrustRow({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {items.map((i) => (
        <li key={i} className="flex items-center gap-2 text-[11px] text-stone-600">
          <span className="size-1.5 rounded-full bg-forest" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function PriceBreakdown({
  treatmentName, duration, therapist, visit, base, durationSurcharge, therapistPremium, total,
}: {
  treatmentName?: string; duration: number | null; therapist?: string; visit?: string;
  base: number; durationSurcharge: number; therapistPremium: number; total: number;
}) {
  return (
    <div className="border border-stone-200 rounded-xl bg-stone-100 p-5">
      <dl className="divide-y divide-stone-200/70">
        <PriceRow label={treatmentName || "Treatment"} value={base ? `£${base}` : "—"} />
        {duration && <PriceRow label={`Duration · ${duration} min`} value={durationSurcharge ? `+ £${durationSurcharge}` : "Included"} />}
        {therapist && <PriceRow label={`Therapist · ${therapist}`} value={therapistPremium ? `+ £${therapistPremium}` : "Included"} />}
        {visit && <PriceRow label={`Visit · ${visit}`} value="Included" />}
        <PriceRow label="Travel" value="Included in Central London" />
        <PriceRow label="Membership discount" value="—" />
        <div className="flex items-baseline justify-between pt-4">
          <span className="eyebrow text-stone-500">Total</span>
          <span className="serif-display text-3xl text-stone-900">£{total || "—"}</span>
        </div>
      </dl>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-2.5 gap-4">
      <span className="text-sm text-stone-700 truncate">{label}</span>
      <span className="text-sm font-medium text-stone-900 shrink-0">{value}</span>
    </div>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <h2 className="serif-display text-2xl md:text-4xl text-stone-900 mb-2 text-balance">{title}</h2>
      <p className="text-sm text-stone-700 mb-6 md:mb-8 max-w-xl">{subtitle}</p>
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

function MiniRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs text-stone-500 shrink-0">{label}</span>
      <span className="text-sm text-stone-900 truncate">{value || "—"}</span>
    </div>
  );
}

function addressSubtitle(visit: VisitType | "") {
  switch (visit) {
    case "hotel": return "In-suite treatment at your hotel.";
    case "office": return "We'll arrive discreetly at your workplace.";
    case "corporate": return "Our concierge will coordinate on the day.";
    case "event": return "Details for your venue and on-site contact.";
    default: return "Just the essentials to arrive comfortably.";
  }
}

function isAddressValid(
  visit: VisitType | "",
  a: {
    line1: string; postcode: string; hotelName: string; bookingName: string;
    companyName: string; contactName: string;
  },
) {
  if (!visit) return false;
  if (visit === "home") return !!a.line1 && !!a.postcode;
  if (visit === "hotel") return !!a.hotelName && !!a.postcode && !!a.bookingName;
  if (visit === "office" || visit === "corporate") return !!a.companyName && !!a.line1 && !!a.postcode;
  if (visit === "event") return !!a.companyName && !!a.line1 && !!a.postcode && !!a.contactName;
  return false;
}
