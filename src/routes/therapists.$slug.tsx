import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section } from "@/components/site/Section";
import { StarRating } from "@/components/site/StarRating";
import { ReviewCard } from "@/components/site/ReviewCard";
import { AIPlaceholder } from "@/components/site/AIPlaceholder";
import { getTherapist, THERAPISTS } from "@/lib/therapists";
import { reviewsForTherapist } from "@/lib/reviews";
import { TREATMENTS } from "@/lib/treatments";

export const Route = createFileRoute("/therapists/$slug")({
  loader: ({ params }) => {
    const therapist = getTherapist(params.slug);
    if (!therapist) throw notFound();
    return { therapist };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Therapist not found — Lythe" }, { name: "robots", content: "noindex" }] };
    }
    const t = loaderData.therapist;
    const title = `${t.name} — ${t.specialities[0]} · Lythe Wellness`;
    return {
      meta: [
        { title },
        { name: "description", content: t.headline },
        { property: "og:title", content: title },
        { property: "og:description", content: t.headline },
        { property: "og:url", content: `/therapists/${t.slug}` },
      ],
      links: [{ rel: "canonical", href: `/therapists/${t.slug}` }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <Section
        eyebrow="Not Found"
        title="This therapist is unavailable."
        intro="They may have updated their profile — browse the wider collective to find another match."
      >
        <Link to="/therapists" className="text-forest underline underline-offset-8">
          Back to directory →
        </Link>
      </Section>
    </SiteLayout>
  ),
  component: TherapistProfilePage,
});

function TherapistProfilePage() {
  const { therapist: t } = Route.useLoaderData();
  const reviews = reviewsForTherapist(t.slug);
  const treatments = TREATMENTS.filter((tr) => t.treatments.includes(tr.slug));
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const slots = ["9:00", "10:30", "12:00", "14:00", "16:00", "18:00"];

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-14">
          <div className="rounded-2xl overflow-hidden aspect-[4/5] ring-1 ring-black/5">
            <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {t.verified && (
                <span className="inline-flex items-center gap-1.5 bg-forest text-stone-50 text-[10px] tracking-[0.18em] uppercase font-semibold rounded-full px-3 py-1.5">
                  Verified
                </span>
              )}
              <span className="eyebrow text-gold">{t.specialities[0]}</span>
            </div>
            <h1 className="text-4xl md:text-5xl serif-display text-stone-900 mb-3">{t.name}</h1>
            <p className="text-lg text-stone-700 leading-relaxed max-w-2xl mb-6">{t.headline}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-700 mb-8">
              <span className="inline-flex items-center gap-2">
                <StarRating value={t.rating} size={16} />
                <span className="font-semibold text-stone-900">{t.rating.toFixed(1)}</span>
                <span className="text-stone-500">({t.reviewsCount} reviews)</span>
              </span>
              <span>·</span>
              <span>{t.yearsExperience} yrs experience</span>
              <span>·</span>
              <span>Responds in ~{t.responseTimeMinutes} min</span>
              <span>·</span>
              <span className="text-forest font-medium">Next: {t.nextAvailable}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                search={{ therapist: t.slug }}
                className="bg-forest text-stone-50 px-7 py-4 rounded-full text-sm font-medium hover:brightness-110 transition"
              >
                Book {t.name.split(" ")[0]}
              </Link>
              <button className="border border-stone-300 bg-stone-50 text-stone-900 px-7 py-4 rounded-full text-sm font-medium hover:bg-stone-100 transition">
                Save to favourites
              </button>
              <button className="border border-stone-300 bg-stone-50 text-stone-900 px-7 py-4 rounded-full text-sm font-medium hover:bg-stone-100 transition">
                Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-[1fr_360px] gap-12">
        <div className="space-y-14">
          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">About</h2>
            <p className="text-stone-700 leading-relaxed text-pretty">{t.bio}</p>
          </section>

          <section className="grid sm:grid-cols-2 gap-8">
            <DetailBlock title="Qualifications" items={t.qualifications} />
            <DetailBlock title="Languages" items={t.languages} />
            <DetailBlock title="Specialities" items={t.specialities} />
            <DetailBlock
              title="Mobile coverage"
              items={t.coverage}
            />
            <DetailBlock
              title="Visit types"
              items={t.visitTypes.map((v) => v[0].toUpperCase() + v.slice(1))}
            />
            <DetailBlock
              title="Experience"
              items={[`${t.yearsExperience} years in practice`, `${t.reviewsCount} verified reviews`]}
            />
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-5">Treatments offered</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {treatments.map((tr) => (
                <div key={tr.slug} className="border border-stone-200 rounded-2xl p-5 bg-stone-50">
                  <p className="eyebrow text-gold mb-1">{tr.categoryLabel}</p>
                  <h3 className="font-serif text-lg text-stone-900 mb-1">{tr.name}</h3>
                  <p className="text-xs text-stone-700 mb-3 line-clamp-2">{tr.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">{tr.durations.join(" / ")} min</span>
                    <span className="font-semibold text-forest">FROM £{tr.priceFrom}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-serif text-2xl text-stone-900">Availability</h2>
              <span className="text-xs text-stone-500">Next 7 days · placeholder</span>
            </div>
            <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6 overflow-x-auto">
              <div className="grid grid-cols-7 gap-2 min-w-[560px]">
                {days.map((d, i) => (
                  <div key={d} className="text-center">
                    <p className="eyebrow text-stone-500 mb-1">{d}</p>
                    <p className="font-serif text-lg text-stone-900 mb-3">{8 + i}</p>
                    <div className="space-y-1.5">
                      {slots.map((s, si) => {
                        const available = (i + si) % 3 !== 0;
                        return (
                          <button
                            key={s}
                            disabled={!available}
                            className={`w-full text-xs px-2 py-2 rounded-lg border transition ${
                              available
                                ? "border-stone-200 bg-stone-50 hover:border-forest hover:bg-forest/5 text-stone-700"
                                : "border-transparent bg-stone-100 text-stone-300 line-through cursor-not-allowed"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-serif text-2xl text-stone-900">
                Reviews <span className="text-stone-500 text-base font-sans">({t.reviewsCount})</span>
              </h2>
              <StarRating value={t.rating} size={18} />
            </div>
            {reviews.length ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-700">Verified reviews arrive with our booking release.</p>
            )}
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6">
          <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6">
            <p className="eyebrow text-stone-500 mb-2">From</p>
            <p className="serif-display text-4xl text-stone-900 mb-4">£{t.priceFrom}</p>
            <p className="text-xs text-stone-500 mb-5">Per treatment · travel included in core zones</p>
            <Link
              to="/booking"
              search={{ therapist: t.slug }}
              className="block w-full text-center bg-forest text-stone-50 px-4 py-3 rounded-full text-sm font-medium hover:brightness-110 transition mb-3"
            >
              Book This Therapist
            </Link>
            <button className="block w-full text-center border border-stone-300 bg-stone-50 text-stone-900 px-4 py-3 rounded-full text-sm font-medium hover:bg-stone-100 transition">
              Request Callback
            </button>
          </div>

          <AIPlaceholder
            title="AI Booking Assistant"
            description="Not sure this is the right therapist? Our AI concierge will help match your body's needs."
          />

          <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6">
            <p className="eyebrow text-gold mb-3">Explore more</p>
            <div className="space-y-2 text-sm">
              {THERAPISTS.filter((o) => o.slug !== t.slug).slice(0, 4).map((o) => (
                <Link
                  key={o.slug}
                  to="/therapists/$slug"
                  params={{ slug: o.slug }}
                  className="flex items-center justify-between py-2 border-b border-stone-200 last:border-0 hover:text-forest"
                >
                  <span className="font-medium text-stone-900">{o.name}</span>
                  <span className="text-xs text-stone-500">£{o.priceFrom}+</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow text-gold mb-3">{title}</p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-stone-700">
            <span className="mt-2 size-1 rounded-full bg-gold shrink-0" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
