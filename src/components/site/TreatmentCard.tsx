import { Link } from "@tanstack/react-router";
import type { Treatment } from "@/lib/treatments";

export function TreatmentCard({
  treatment,
  variant = "detailed",
}: {
  treatment: Treatment;
  variant?: "detailed" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <article className="group flex flex-col h-full">
      <div className={`relative overflow-hidden rounded-xl mb-6 ring-1 ring-black/5 bg-stone-100 ${compact ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
        <img
          src={treatment.image}
          alt={treatment.name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <p className="eyebrow text-gold mb-2">{treatment.categoryLabel}</p>
      <h3 className="text-xl font-serif font-medium mb-2 text-stone-900">{treatment.name}</h3>
      <p className="text-sm text-stone-700 leading-relaxed mb-4 text-pretty">
        {treatment.description}
      </p>

      {!compact && (
        <dl className="text-xs text-stone-700 grid grid-cols-2 gap-y-2 gap-x-4 mb-5">
          <div>
            <dt className="eyebrow text-stone-500 mb-1">Best for</dt>
            <dd className="leading-snug">{treatment.bestFor}</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-500 mb-1">Duration</dt>
            <dd>{treatment.durations.join(" / ")} min</dd>
          </div>
        </dl>
      )}

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-200">
        <span className="text-xs font-semibold tracking-wider text-forest">
          FROM £{treatment.priceFrom}
        </span>
        <div className="flex gap-3 text-xs font-medium">
          <Link
            to="/booking"
            className="rounded-full bg-forest text-stone-50 px-4 py-2 hover:brightness-110 transition"
          >
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}
