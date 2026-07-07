export function SafetyNotice({ tone = "light" }: { tone?: "light" | "warm" }) {
  const bg = tone === "warm" ? "bg-stone-100" : "bg-stone-50";
  return (
    <aside
      className={`${bg} border border-stone-200 rounded-2xl px-6 py-6 md:px-8 md:py-7 flex gap-5 items-start`}
      role="note"
      aria-label="Wellbeing note"
    >
      <div className="size-9 rounded-full bg-forest/10 ring-1 ring-forest/20 flex items-center justify-center shrink-0">
        <svg
          className="size-4 text-forest"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
          <circle cx="12" cy="12" r="9.5" />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="eyebrow text-forest mb-2">A gentle note on wellbeing</p>
        <p className="text-sm text-stone-700 leading-relaxed text-pretty">
          Massage therapy can support relaxation, comfort and general wellbeing. It is not a
          substitute for medical diagnosis or treatment. If you have a medical condition, injury,
          pregnancy-related concern or recent surgery, please consult your GP or healthcare
          professional before booking.
        </p>
      </div>
    </aside>
  );
}
