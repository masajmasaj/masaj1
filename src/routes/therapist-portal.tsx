import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { DashboardShell, StatTile, PanelCard } from "@/components/dashboard/DashboardShell";
import { AIPlaceholder } from "@/components/site/AIPlaceholder";
import { ReviewCard } from "@/components/site/ReviewCard";
import { REVIEWS } from "@/lib/reviews";
import { TREATMENTS } from "@/lib/treatments";

const searchSchema = z.object({ tab: fallback(z.string(), "calendar").default("calendar") });

export const Route = createFileRoute("/therapist-portal")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Therapist Portal — Lythe" },
      { name: "description", content: "Manage appointments, availability, coverage, earnings and documents." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TherapistPortal,
});

const TABS = [
  { id: "calendar", label: "Calendar", group: "Work" },
  { id: "appointments", label: "Appointments", group: "Work" },
  { id: "availability", label: "Availability", group: "Work" },
  { id: "hours", label: "Working Hours", group: "Work" },
  { id: "coverage", label: "Coverage Areas", group: "Work" },
  { id: "treatments", label: "Treatments & Prices", group: "Practice" },
  { id: "earnings", label: "Earnings", group: "Practice" },
  { id: "documents", label: "Documents", group: "Compliance" },
  { id: "insurance", label: "Insurance", group: "Compliance" },
  { id: "qualifications", label: "Qualifications", group: "Compliance" },
  { id: "messages", label: "Messages", group: "Clients" },
  { id: "reviews", label: "Reviews", group: "Clients" },
  { id: "settings", label: "Settings", group: "Clients" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

function TherapistPortal() {
  const { tab } = Route.useSearch();

  return (
    <DashboardShell
      eyebrow="Therapist Portal"
      title="Your practice, in one place."
      intro="Calendar, clients, earnings and compliance — all managed here."
      tabs={TABS}
      activeTab={tab}
      routePath="/therapist-portal"
    >
      {tab === "calendar" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="This week" value="12" hint="Appointments" />
            <StatTile label="This month" value="£4,320" hint="Gross earnings" />
            <StatTile label="Rating" value="4.9" hint="148 reviews" />
            <StatTile label="Response" value="12m" hint="Average" />
          </div>
          <PanelCard title="Week at a glance">
            <div className="grid grid-cols-7 gap-2 min-w-[560px] overflow-x-auto">
              {DAYS.map((d, di) => (
                <div key={d} className="text-center">
                  <p className="eyebrow text-stone-500 mb-1">{d}</p>
                  <p className="font-serif text-lg text-stone-900 mb-3">{8 + di}</p>
                  <div className="space-y-1.5">
                    {SLOTS.map((s, si) => {
                      const booked = (di + si) % 4 === 1;
                      return (
                        <div
                          key={s}
                          className={`text-xs px-2 py-2 rounded-lg border ${
                            booked
                              ? "border-forest bg-forest/10 text-forest font-medium"
                              : "border-stone-200 bg-stone-50 text-stone-500"
                          }`}
                        >
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </PanelCard>
          <AIPlaceholder
            title="AI FAQ"
            description="Answer common client questions automatically. Arriving with our client-messaging release."
          />
        </div>
      )}

      {tab === "appointments" && (
        <PanelCard title="Upcoming Appointments">
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between border border-stone-200 rounded-xl p-4">
                <div>
                  <p className="font-serif text-lg text-stone-900">Deep Tissue · 90 min</p>
                  <p className="text-xs text-stone-500">Client · Mayfair · Fri {10 + i} July · 18:30</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <button className="rounded-full border border-stone-300 px-3 py-1.5">Details</button>
                  <button className="rounded-full bg-forest text-stone-50 px-3 py-1.5">Confirm</button>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "availability" && (
        <PanelCard title="Availability">
          <p className="text-sm text-stone-700 mb-4">Tap a slot to toggle availability.</p>
          <div className="grid grid-cols-7 gap-2 min-w-[560px] overflow-x-auto">
            {DAYS.map((d) => (
              <div key={d} className="text-center">
                <p className="eyebrow text-stone-500 mb-3">{d}</p>
                <div className="space-y-1.5">
                  {SLOTS.map((s) => (
                    <button key={s} className="w-full text-xs px-2 py-2 rounded-lg border border-stone-200 hover:border-forest">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "hours" && (
        <PanelCard title="Working Hours">
          <div className="space-y-2">
            {DAYS.map((d) => (
              <div key={d} className="flex items-center justify-between border-b border-stone-200 py-3 text-sm">
                <span className="font-medium w-16">{d}</span>
                <div className="flex items-center gap-2">
                  <input className="bg-stone-100 rounded px-2 py-1 w-20" defaultValue="09:00" />
                  <span className="text-stone-500">–</span>
                  <input className="bg-stone-100 rounded px-2 py-1 w-20" defaultValue="20:00" />
                </div>
                <label className="flex items-center gap-2 text-xs"><input type="checkbox" defaultChecked className="accent-forest" /> Available</label>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "coverage" && (
        <PanelCard title="Coverage Areas">
          <div className="flex flex-wrap gap-2">
            {["Mayfair", "Marylebone", "Chelsea", "Kensington", "Belgravia", "Notting Hill", "Fitzrovia"].map((a) => (
              <span key={a} className="text-xs px-3 py-1.5 rounded-full bg-forest/5 border border-forest/20 text-forest">
                {a}
              </span>
            ))}
            <button className="text-xs px-3 py-1.5 rounded-full border border-dashed border-stone-300 text-stone-500">+ Add area</button>
          </div>
        </PanelCard>
      )}

      {tab === "treatments" && (
        <PanelCard title="Treatments & Prices">
          <div className="divide-y divide-stone-200">
            {TREATMENTS.slice(0, 6).map((t) => (
              <div key={t.slug} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.durations.join(" / ")} min</p>
                </div>
                <span className="font-semibold text-forest">£{t.priceFrom}+</span>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "earnings" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="This month" value="£4,320" />
            <StatTile label="Last month" value="£3,895" />
            <StatTile label="Year to date" value="£28,140" />
            <StatTile label="Pending" value="£620" />
          </div>
          <PanelCard title="Payouts (placeholder)">
            <p className="text-sm text-stone-700">Weekly payouts arrive with our billing release. This dashboard will show every transaction and downloadable statement.</p>
          </PanelCard>
        </div>
      )}

      {tab === "documents" && (
        <PanelCard title="Documents">
          <div className="space-y-3">
            {["Photo ID", "Enhanced DBS Certificate", "Insurance Policy", "Qualification Certificates"].map((d) => (
              <div key={d} className="flex items-center justify-between border border-stone-200 rounded-xl p-4 text-sm">
                <span className="font-medium">{d}</span>
                <span className="text-xs text-forest">Uploaded · Verified</span>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "insurance" && (
        <PanelCard title="Insurance">
          <p className="text-sm text-stone-700">£5m public liability · Expires 22 October 2026</p>
        </PanelCard>
      )}

      {tab === "qualifications" && (
        <PanelCard title="Qualifications">
          <ul className="space-y-2 text-sm">
            {["BSc Sports Therapy", "Level 4 Clinical Massage", "MTI Registered"].map((q) => (
              <li key={q} className="flex items-center justify-between border-b border-stone-200 py-2">
                <span>{q}</span>
                <span className="text-xs text-forest">Verified</span>
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      {tab === "messages" && (
        <PanelCard title="Messages">
          <p className="text-sm text-stone-700">Client messaging launches alongside online booking.</p>
        </PanelCard>
      )}

      {tab === "reviews" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {REVIEWS.slice(0, 4).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      {tab === "settings" && (
        <PanelCard title="Settings">
          <p className="text-sm text-stone-700">Profile, banking and notification settings.</p>
        </PanelCard>
      )}
    </DashboardShell>
  );
}
