import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TherapistCard } from "@/components/site/TherapistCard";
import { AIPlaceholder } from "@/components/site/AIPlaceholder";
import { THERAPISTS, ALL_LANGUAGES, ALL_COVERAGE } from "@/lib/therapists";
import { TREATMENT_CATEGORIES } from "@/lib/treatments";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  area: fallback(z.string(), "").default(""),
  gender: fallback(z.string(), "").default(""),
  language: fallback(z.string(), "").default(""),
  visit: fallback(z.string(), "").default(""),
  speciality: fallback(z.string(), "").default(""),
  minRating: fallback(z.number(), 0).default(0),
  maxPrice: fallback(z.number(), 200).default(200),
  minExp: fallback(z.number(), 0).default(0),
});

export const Route = createFileRoute("/therapists")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Our Therapists — Lythe Wellness" },
      {
        name: "description",
        content:
          "Browse London's most meticulously vetted mobile massage therapists. Filter by location, treatment, language, availability and more.",
      },
      { property: "og:title", content: "Our Therapists — Lythe Wellness" },
      { property: "og:url", content: "/therapists" },
    ],
    links: [{ rel: "canonical", href: "/therapists" }],
  }),
  component: TherapistsPage,
});

function TherapistsPage() {
  const search = Route.useSearch();
  const [local, setLocal] = useState(search);

  const filtered = useMemo(() => {
    return THERAPISTS.filter((t) => {
      if (local.q && !`${t.name} ${t.headline} ${t.specialities.join(" ")}`.toLowerCase().includes(local.q.toLowerCase())) return false;
      if (local.area && !t.coverage.includes(local.area)) return false;
      if (local.gender && t.gender !== local.gender) return false;
      if (local.language && !t.languages.includes(local.language)) return false;
      if (local.visit && !t.visitTypes.includes(local.visit as never)) return false;
      if (local.speciality && !t.specialities.map((s) => s.toLowerCase()).includes(local.speciality.toLowerCase())) return false;
      if (local.minRating && t.rating < local.minRating) return false;
      if (local.maxPrice && t.priceFrom > local.maxPrice) return false;
      if (local.minExp && t.yearsExperience < local.minExp) return false;
      return true;
    });
  }, [local]);

  function update<K extends keyof typeof local>(key: K, value: (typeof local)[K]) {
    setLocal((s) => ({ ...s, [key]: value }));
  }

  const specialities = Array.from(new Set(THERAPISTS.flatMap((t) => t.specialities))).sort();

  return (
    <SiteLayout>
      <section className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <p className="eyebrow text-gold mb-3">The Collective</p>
          <h1 className="text-4xl md:text-5xl serif-display text-stone-900 mb-4">
            Meet London&apos;s most trusted therapists.
          </h1>
          <p className="text-stone-700 max-w-2xl leading-relaxed">
            Every practitioner has been personally vetted, clinically assessed and background-checked.
            Browse profiles, read verified reviews and book directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Filters */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg text-stone-900">Filters</h2>
                <button
                  onClick={() =>
                    setLocal({
                      q: "",
                      area: "",
                      gender: "",
                      language: "",
                      visit: "",
                      speciality: "",
                      minRating: 0,
                      maxPrice: 200,
                      minExp: 0,
                    })
                  }
                  className="text-xs text-stone-500 hover:text-forest"
                >
                  Reset
                </button>
              </div>

              <FilterInput label="Search">
                <input
                  type="text"
                  value={local.q}
                  onChange={(e) => update("q", e.target.value)}
                  placeholder="Name or speciality"
                  className="w-full bg-stone-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-forest"
                />
              </FilterInput>

              <FilterSelect
                label="Location"
                value={local.area}
                onChange={(v) => update("area", v)}
                options={ALL_COVERAGE}
                allLabel="All London"
              />

              <FilterSelect
                label="Treatment"
                value={local.speciality}
                onChange={(v) => update("speciality", v)}
                options={specialities}
                allLabel="Any treatment"
              />

              <FilterSelect
                label="Gender preference"
                value={local.gender}
                onChange={(v) => update("gender", v)}
                options={["female", "male", "non-binary"]}
                allLabel="No preference"
              />

              <FilterSelect
                label="Language"
                value={local.language}
                onChange={(v) => update("language", v)}
                options={ALL_LANGUAGES}
                allLabel="Any language"
              />

              <FilterSelect
                label="Visit type"
                value={local.visit}
                onChange={(v) => update("visit", v)}
                options={["home", "hotel", "office", "corporate", "event"]}
                allLabel="Any setting"
              />

              <FilterRange
                label="Max price"
                min={40}
                max={200}
                step={5}
                value={local.maxPrice}
                unit="£"
                onChange={(v) => update("maxPrice", v)}
              />

              <FilterRange
                label="Min rating"
                min={0}
                max={5}
                step={0.5}
                value={local.minRating}
                unit="★"
                onChange={(v) => update("minRating", v)}
              />

              <FilterRange
                label="Min experience"
                min={0}
                max={15}
                step={1}
                value={local.minExp}
                unit=" yrs"
                onChange={(v) => update("minExp", v)}
              />
            </div>

            <div className="mt-6">
              <AIPlaceholder
                title="AI Therapist Match"
                description="Describe your body and goals — our assistant will suggest the ideal therapist. Arriving soon."
              />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-stone-700">
                <span className="font-semibold text-stone-900">{filtered.length}</span> therapist{filtered.length === 1 ? "" : "s"} available
              </p>
              <p className="text-xs text-stone-500">Sorted by relevance</p>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 py-16 text-center">
                <p className="font-serif text-xl text-stone-900 mb-2">No matches — yet.</p>
                <p className="text-sm text-stone-700 max-w-md mx-auto">
                  Widen a filter or reach out to our concierge and we&apos;ll hand-match a therapist.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((t) => (
                  <TherapistCard key={t.slug} therapist={t} />
                ))}
              </div>
            )}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {TREATMENT_CATEGORIES.slice(0, 2).map((c) => (
                <div key={c.slug} className="border border-stone-200 rounded-2xl p-6 bg-stone-100">
                  <p className="eyebrow text-gold mb-2">{c.eyebrow}</p>
                  <h3 className="font-serif text-lg text-stone-900 mb-2">{c.label}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{c.intro}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function FilterInput({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-500 block mb-2">{label}</span>
      {children}
    </label>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}) {
  return (
    <FilterInput label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-stone-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-forest capitalize"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o} className="capitalize">
            {o}
          </option>
        ))}
      </select>
    </FilterInput>
  );
}

function FilterRange({
  label,
  min,
  max,
  step,
  value,
  unit,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between eyebrow text-stone-500 mb-2">
        <span>{label}</span>
        <span className="text-stone-900 font-semibold">
          {unit === "£" ? unit : ""}
          {value}
          {unit !== "£" ? unit : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-forest"
      />
    </div>
  );
}
