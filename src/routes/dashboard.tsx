import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { DashboardShell, StatTile, PanelCard, EmptyState } from "@/components/dashboard/DashboardShell";
import { AIPlaceholder } from "@/components/site/AIPlaceholder";
import { StarRating } from "@/components/site/StarRating";
import { THERAPISTS } from "@/lib/therapists";

const searchSchema = z.object({ tab: fallback(z.string(), "overview").default("overview") });

export const Route = createFileRoute("/dashboard")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "My Dashboard — Lythe Wellness" },
      { name: "description", content: "Manage your bookings, memberships, favourites and preferences." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CustomerDashboard,
});

const TABS = [
  { id: "overview", label: "Overview", group: "Bookings" },
  { id: "upcoming", label: "Upcoming Bookings", group: "Bookings" },
  { id: "past", label: "Past Bookings", group: "Bookings" },
  { id: "favourites", label: "Favourite Therapists", group: "Bookings" },
  { id: "addresses", label: "Addresses", group: "Account" },
  { id: "payments", label: "Payment Methods", group: "Account" },
  { id: "membership", label: "Membership", group: "Account" },
  { id: "gift-cards", label: "Gift Cards", group: "Account" },
  { id: "invoices", label: "Invoices", group: "Account" },
  { id: "notifications", label: "Notifications", group: "Preferences" },
  { id: "profile", label: "Profile", group: "Preferences" },
  { id: "settings", label: "Settings", group: "Preferences" },
];

function CustomerDashboard() {
  const { tab } = Route.useSearch();

  return (
    <DashboardShell
      eyebrow="My Dashboard"
      title="Welcome back."
      intro="Your treatments, memberships and preferences in one quiet place."
      tabs={TABS}
      activeTab={tab}
      routePath="/dashboard"
    >
      {tab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="Upcoming" value="2" hint="Next: Fri 10th, 18:30" />
            <StatTile label="Sessions this year" value="14" hint="+3 vs last year" />
            <StatTile label="Membership" value="Gold" hint="Renews 12 Jan" />
            <StatTile label="Credits" value="£45" hint="Wellness shop credit" />
          </div>
          <AIPlaceholder
            title="AI Booking Assistant"
            description="Ask 'book my regular deep tissue next Tuesday' — arriving with our booking release."
          />
          <PanelCard title="Your next treatment">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <img src={THERAPISTS[0].photo} alt="Therapist" className="size-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="eyebrow text-gold mb-1">Deep Tissue · 90 min</p>
                <p className="font-serif text-xl text-stone-900">with {THERAPISTS[0].name}</p>
                <p className="text-sm text-stone-700 mt-1">Fri 10 July · 18:30 · Home visit — Mayfair</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-stone-300 px-4 py-2 text-xs">Reschedule</button>
                <button className="rounded-full bg-forest text-stone-50 px-4 py-2 text-xs">View</button>
              </div>
            </div>
          </PanelCard>
        </div>
      )}

      {tab === "upcoming" && (
        <PanelCard title="Upcoming Bookings">
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <BookingRow key={i} idx={i} status="upcoming" />
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "past" && (
        <PanelCard title="Past Bookings">
          <div className="space-y-3">
            {[2, 3, 4].map((i) => (
              <BookingRow key={i} idx={i} status="past" />
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "favourites" && (
        <PanelCard title="Favourite Therapists">
          <div className="grid sm:grid-cols-2 gap-4">
            {THERAPISTS.slice(0, 4).map((t) => (
              <div key={t.slug} className="flex gap-4 border border-stone-200 rounded-xl p-4">
                <img src={t.photo} alt={t.name} className="size-16 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.specialities.join(" · ")}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating value={t.rating} />
                    <span className="text-xs text-stone-500">£{t.priceFrom}+</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "addresses" && (
        <PanelCard title="Saved Addresses" action={<button className="text-xs text-forest">+ Add address</button>}>
          <div className="space-y-3">
            {["Home · Mayfair", "Office · Canary Wharf"].map((a) => (
              <div key={a} className="flex items-center justify-between border border-stone-200 rounded-xl p-4">
                <div>
                  <p className="font-medium text-stone-900">{a}</p>
                  <p className="text-xs text-stone-500">London, United Kingdom</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <button className="text-stone-500 hover:text-forest">Edit</button>
                  <button className="text-stone-500 hover:text-destructive">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "payments" && (
        <PanelCard title="Payment Methods">
          <EmptyState
            title="Secure payments coming soon."
            description="Encrypted card payment arrives with our booking release. Until then, our concierge takes payment on arrival."
          />
        </PanelCard>
      )}

      {tab === "membership" && (
        <PanelCard title="Membership">
          <div className="rounded-2xl bg-forest text-stone-50 p-8">
            <p className="eyebrow text-gold-soft mb-2">Gold Member</p>
            <p className="serif-display text-3xl mb-2">A quieter standard of care.</p>
            <p className="text-stone-300 text-sm mb-6">Renews 12 January · Four treatments per month included</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div><p className="eyebrow text-gold-soft mb-1">Used</p><p className="text-2xl serif-display">2</p></div>
              <div><p className="eyebrow text-gold-soft mb-1">Remaining</p><p className="text-2xl serif-display">2</p></div>
              <div><p className="eyebrow text-gold-soft mb-1">Rollover</p><p className="text-2xl serif-display">0</p></div>
            </div>
          </div>
        </PanelCard>
      )}

      {tab === "gift-cards" && (
        <PanelCard title="Gift Cards">
          <EmptyState title="No gift cards yet." description="Gift cards will appear here once redeemed or purchased." />
        </PanelCard>
      )}

      {tab === "invoices" && (
        <PanelCard title="Invoices">
          <div className="divide-y divide-stone-200">
            {["INV-1042", "INV-1038", "INV-1029"].map((i, idx) => (
              <div key={i} className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium">{i}</span>
                <span className="text-stone-500">{["4 Jun", "22 May", "1 May"][idx]} · £{[120, 95, 105][idx]}</span>
                <button className="text-forest text-xs">Download PDF</button>
              </div>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "notifications" && (
        <PanelCard title="Notification Preferences">
          <div className="space-y-4">
            {["Booking confirmations", "Reminders", "Therapist messages", "Wellness tips", "Offers & memberships"].map((n) => (
              <label key={n} className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="text-sm text-stone-900">{n}</span>
                <input type="checkbox" defaultChecked className="accent-forest size-4" />
              </label>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "profile" && (
        <PanelCard title="Profile">
          <div className="grid sm:grid-cols-2 gap-4">
            {["Full name", "Email", "Phone", "Date of birth"].map((f) => (
              <label key={f} className="block">
                <span className="eyebrow text-stone-500 block mb-2">{f}</span>
                <input className="w-full bg-stone-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-forest" />
              </label>
            ))}
          </div>
        </PanelCard>
      )}

      {tab === "settings" && (
        <PanelCard title="Settings">
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3"><span>Language</span><select className="bg-stone-100 rounded px-3 py-1.5"><option>English</option></select></div>
            <div className="flex items-center justify-between border-b border-stone-200 pb-3"><span>Currency</span><select className="bg-stone-100 rounded px-3 py-1.5"><option>GBP (£)</option></select></div>
            <button className="text-destructive text-xs pt-4">Delete account</button>
          </div>
        </PanelCard>
      )}
    </DashboardShell>
  );
}

function BookingRow({ idx, status }: { idx: number; status: "upcoming" | "past" }) {
  const t = THERAPISTS[idx];
  return (
    <div className="flex items-center gap-4 border border-stone-200 rounded-xl p-4">
      <img src={t.photo} alt={t.name} className="size-14 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <p className="font-serif text-base text-stone-900">{t.specialities[0]} · with {t.name}</p>
        <p className="text-xs text-stone-500 mt-0.5">{status === "upcoming" ? "Fri 10 July · 18:30" : "12 May · 90 min"} · Home visit</p>
      </div>
      <span className={`text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-full ${status === "upcoming" ? "bg-forest/10 text-forest" : "bg-stone-100 text-stone-500"}`}>
        {status}
      </span>
    </div>
  );
}
