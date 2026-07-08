import { Link } from "@tanstack/react-router";

export type LocationCardData = {
  slug?: string;
  name: string;
  region: string;
  therapistsCount?: number;
  status?: "live" | "coming-soon";
};

export function LocationCard({ location }: { location: LocationCardData }) {
  const live = location.status !== "coming-soon";
  const inner = (
    <div
      className={`h-full bg-stone-50 border rounded-2xl p-6 flex flex-col transition ${
        live ? "border-stone-200 hover:border-forest/40" : "border-dashed border-stone-300"
      }`}
    >
      <p className="eyebrow text-gold mb-2">{location.region}</p>
      <h3 className="font-serif text-xl text-stone-900 mb-2">{location.name}</h3>
      <div className="mt-auto flex items-center justify-between pt-5 border-t border-stone-200 text-xs">
        {live ? (
          <>
            <span className="text-stone-700">
              {location.therapistsCount ?? "—"} therapists available
            </span>
            <span className="inline-flex items-center gap-1.5 text-forest font-medium">
              Explore
              <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </>
        ) : (
          <>
            <span className="text-stone-500">Launching soon</span>
            <span className="inline-flex items-center gap-1.5 text-stone-500 font-medium">
              Waitlist
            </span>
          </>
        )}
      </div>
    </div>
  );

  if (live && location.slug) {
    return (
      <Link to="/locations/$slug" params={{ slug: location.slug }} className="block h-full">
        {inner}
      </Link>
    );
  }
  return <div className="h-full">{inner}</div>;
}
