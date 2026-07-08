import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export type DashboardTab = {
  id: string;
  label: string;
  group?: string;
};

export function DashboardShell({
  eyebrow,
  title,
  intro,
  tabs,
  activeTab,
  onTabChange,
  routePath,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tabs: DashboardTab[];
  activeTab: string;
  onTabChange?: (id: string) => void;
  routePath: "/dashboard" | "/therapist-portal";
  actions?: ReactNode;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const grouped = tabs.reduce<Record<string, DashboardTab[]>>((acc, t) => {
    const g = t.group ?? "Main";
    (acc[g] ??= []).push(t);
    return acc;
  }, {});

  function handleClick(id: string) {
    if (onTabChange) return onTabChange(id);
    navigate({ to: routePath, search: { tab: id } });
  }

  return (
    <SiteLayout>
      <section className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold mb-3">{eyebrow}</p>
            <h1 className="text-4xl md:text-5xl serif-display text-stone-900 mb-3">{title}</h1>
            {intro && <p className="text-stone-700 leading-relaxed text-pretty">{intro}</p>}
          </div>
          {actions}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="lg:sticky lg:top-28 self-start">
            {/* Mobile: horizontal scroll */}
            <div className="lg:hidden -mx-6 px-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleClick(t.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition ${
                      activeTab === t.id
                        ? "bg-forest text-stone-50 border-forest"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:border-forest/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Desktop: grouped sidebar */}
            <nav className="hidden lg:flex flex-col gap-6">
              {Object.entries(grouped).map(([group, groupTabs]) => (
                <div key={group}>
                  <p className="eyebrow text-stone-500 mb-3 px-3">{group}</p>
                  <ul className="space-y-1">
                    {groupTabs.map((t) => (
                      <li key={t.id}>
                        <button
                          onClick={() => handleClick(t.id)}
                          className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                            activeTab === t.id
                              ? "bg-forest/10 text-forest font-medium"
                              : "text-stone-700 hover:bg-stone-100"
                          }`}
                        >
                          {t.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                to="/"
                className="text-xs text-stone-500 hover:text-forest px-3 mt-4"
              >
                ← Back to site
              </Link>
            </nav>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </SiteLayout>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="border border-stone-200 rounded-2xl bg-stone-50 p-6">
      <p className="eyebrow text-stone-500 mb-3">{label}</p>
      <p className="serif-display text-3xl md:text-4xl text-stone-900 mb-2">{value}</p>
      {hint && <p className="text-xs text-stone-500">{hint}</p>}
    </div>
  );
}

export function PanelCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border border-stone-200 rounded-2xl bg-stone-50 p-6 md:p-8">
      <header className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl text-stone-900">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 py-14 px-6 text-center">
      <p className="font-serif text-xl text-stone-900 mb-2">{title}</p>
      <p className="text-sm text-stone-700 max-w-md mx-auto mb-5">{description}</p>
      {action}
    </div>
  );
}
