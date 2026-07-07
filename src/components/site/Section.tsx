import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  intro,
  action,
  children,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
  action?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "warm" | "dark";
  className?: string;
}) {
  const bg =
    tone === "warm" ? "bg-stone-100" : tone === "dark" ? "bg-forest text-stone-100" : "bg-stone-50";
  return (
    <section className={`${bg} py-24 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {(eyebrow || title || intro || action) && (
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-[46ch]">
              {eyebrow && (
                <p className={`eyebrow mb-4 ${tone === "dark" ? "text-gold-soft" : "text-gold"}`}>
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="text-4xl md:text-5xl serif-display text-balance">{title}</h2>
              )}
              {intro && (
                <p
                  className={`mt-4 text-pretty leading-relaxed ${
                    tone === "dark" ? "text-stone-300" : "text-stone-700"
                  }`}
                >
                  {intro}
                </p>
              )}
            </div>
            {action}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
