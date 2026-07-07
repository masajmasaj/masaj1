import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <SiteNav />
      <main className="pt-20 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
