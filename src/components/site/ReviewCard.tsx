import type { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";

export function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <StarRating value={review.rating} size={16} />
        {review.verified && (
          <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold text-forest bg-forest/5 rounded-full px-2.5 py-1">
            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            Verified Client
          </span>
        )}
      </div>
      <p className="serif-display text-lg text-stone-900 leading-snug mb-4">
        &ldquo;{review.body}&rdquo;
      </p>
      <div className="mt-auto text-xs text-stone-500 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-medium text-stone-900">{review.clientName}</span>
        <span>·</span>
        <span>{review.clientArea}</span>
        <span>·</span>
        <span>{review.treatment}</span>
        <span>·</span>
        <span>{date}</span>
      </div>
    </article>
  );
}
