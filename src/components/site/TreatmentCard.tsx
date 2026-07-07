import type { Treatment } from "@/lib/treatments";

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6 ring-1 ring-black/5 bg-stone-100">
        <img
          src={treatment.image}
          alt={treatment.name}
          loading="lazy"
          width={800}
          height={1066}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <p className="eyebrow text-gold mb-2">{treatment.category}</p>
      <h3 className="text-xl font-serif font-medium mb-2 text-stone-900">{treatment.name}</h3>
      <p className="text-sm text-stone-700 leading-relaxed mb-4 text-pretty">
        {treatment.description}
      </p>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold tracking-wider text-forest">FROM £{treatment.priceFrom}</span>
        <span className="text-stone-500">{treatment.duration} min</span>
      </div>
    </article>
  );
}
