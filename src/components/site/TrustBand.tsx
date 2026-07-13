const ITEMS = [
  "Verified Therapists",
  "Professional Insurance",
  "Safe & Private Booking",
  "Transparent Pricing",
];

export function TrustBand() {
  return (
    <div className="bg-forest py-6 text-stone-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {ITEMS.map((label) => (
          <div key={label} className="flex items-center gap-2 min-w-0">
            <svg className="size-4 shrink-0 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[11px] md:text-xs uppercase tracking-[0.18em] font-medium truncate">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
