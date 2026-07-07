import type { ServiceModel } from "@/lib/service-models";

export function ServiceModelCard({ model }: { model: ServiceModel }) {
  return (
    <article className="group bg-stone-50 border border-stone-200 rounded-2xl p-8 hover:border-forest/40 transition-colors h-full flex flex-col">
      <p className="eyebrow text-gold mb-3">{model.audience}</p>
      <h3 className="text-2xl font-serif font-medium text-stone-900 mb-2">{model.name}</h3>
      <p className="serif-display text-lg text-stone-700 mb-5 leading-snug">{model.tagline}</p>
      <p className="text-sm text-stone-700 leading-relaxed mb-6 text-pretty flex-1">
        {model.description}
      </p>
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-forest inline-flex items-center gap-2">
        Available now
        <span className="size-1.5 rounded-full bg-gold" />
      </span>
    </article>
  );
}
