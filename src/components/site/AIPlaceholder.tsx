import type { ReactNode } from "react";

export function AIPlaceholder({
  eyebrow = "AI · Coming Soon",
  title,
  description,
  icon,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-forest/30 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 p-6">
      <div className="absolute -top-24 -right-24 size-56 rounded-full bg-gold/10 blur-3xl" aria-hidden />
      <div className="relative flex items-start gap-4">
        <div className="size-10 rounded-full bg-forest text-stone-50 flex items-center justify-center shrink-0">
          {icon ?? (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          )}
        </div>
        <div className="min-w-0">
          <p className="eyebrow text-gold mb-1">{eyebrow}</p>
          <h4 className="font-serif text-lg text-stone-900 mb-1">{title}</h4>
          <p className="text-sm text-stone-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
