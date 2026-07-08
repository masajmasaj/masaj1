import { Link } from "@tanstack/react-router";
import type { Therapist } from "@/lib/therapists";
import { StarRating } from "./StarRating";

export function TherapistCard({ therapist }: { therapist: Therapist }) {
  const t = therapist;
  return (
    <article className="group bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden hover:border-forest/40 transition-colors flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img
          src={t.photo}
          alt={t.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {t.verified && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-stone-50/95 backdrop-blur-sm text-forest text-[10px] tracking-[0.18em] uppercase font-semibold rounded-full px-3 py-1.5 ring-1 ring-stone-200">
            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
            </svg>
            Verified
          </span>
        )}
        <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-900 bg-stone-50/95 backdrop-blur-sm rounded-full px-3 py-1.5 ring-1 ring-stone-200">
          <span className="inline-flex items-center gap-1.5">
            <StarRating value={t.rating} />
            <span className="font-medium">{t.rating.toFixed(1)}</span>
            <span className="text-stone-500">({t.reviewsCount})</span>
          </span>
          <span className="text-stone-500">~{t.responseTimeMinutes}m reply</span>
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="eyebrow text-gold mb-2">{t.specialities[0]}</p>
        <h3 className="font-serif text-xl text-stone-900 mb-1">{t.name}</h3>
        <p className="text-sm text-stone-700 leading-snug mb-4 line-clamp-2">{t.headline}</p>

        <dl className="text-xs text-stone-700 grid grid-cols-2 gap-y-2 gap-x-4 mb-5">
          <div>
            <dt className="eyebrow text-stone-500 mb-1">Experience</dt>
            <dd>{t.yearsExperience} yrs</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-500 mb-1">Languages</dt>
            <dd className="truncate">{t.languages.slice(0, 2).join(", ")}</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-500 mb-1">Covers</dt>
            <dd className="truncate">{t.coverage.slice(0, 2).join(", ")}</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-500 mb-1">Next slot</dt>
            <dd>{t.nextAvailable}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-200">
          <span className="text-xs font-semibold tracking-wider text-forest">
            FROM £{t.priceFrom}
          </span>
          <div className="flex gap-2 text-xs font-medium">
            <Link
              to="/therapists/$slug"
              params={{ slug: t.slug }}
              className="rounded-full border border-stone-300 px-3 py-2 hover:bg-stone-100 transition"
            >
              Profile
            </Link>
            <Link
              to="/booking"
              search={{ therapist: t.slug }}
              className="rounded-full bg-forest text-stone-50 px-4 py-2 hover:brightness-110 transition"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
