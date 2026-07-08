export function StarRating({ value, size = 14 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const active = i < full || (i === full && half);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            className={active ? "text-gold" : "text-stone-300"}
            aria-hidden
          >
            <path
              strokeLinejoin="round"
              d="M12 2.5l2.9 6.35 6.9.65-5.2 4.7 1.5 6.8L12 17.6 5.9 21l1.5-6.8L2.2 9.5l6.9-.65L12 2.5z"
            />
          </svg>
        );
      })}
    </div>
  );
}
