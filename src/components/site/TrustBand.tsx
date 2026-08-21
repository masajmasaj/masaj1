const ITEMS = [
  { label: "Verified Therapists", note: "DBS checked & qualified" },
  { label: "Professional Insurance", note: "£5m public liability" },
  { label: "Safe & Private Booking", note: "Discreet, encrypted details" },
  { label: "Transparent Pricing", note: "No hidden fees, ever" },
];

export function TrustBand() {
  return (
    <div className="bg-forest py-8 md:py-9 text-stone-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-start gap-3 min-w-0">
            <svg
              className="size-4 shrink-0 mt-0.5 text-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="min-w-0">
              <span className="block text-[11px] md:text-xs uppercase tracking-[0.18em] font-medium">
                {item.label}
              </span>
              <span className="mt-1.5 block text-[11px] md:text-xs text-stone-300/85 leading-snug">
                {item.note}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
