import { Link } from "@tanstack/react-router";
import { PRIMARY_NAV, BRAND } from "@/lib/site-config";

export function SiteNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-12 min-w-0">
          <Link
            to="/"
            className="text-xl font-serif font-semibold tracking-tight text-forest shrink-0"
          >
            {BRAND.name.toUpperCase()}
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-forest transition-colors"
                activeProps={{ className: "text-forest" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/dashboard" className="hidden sm:inline text-sm font-medium text-stone-700 hover:text-forest">
            Dashboard
          </Link>
          <Link
            to="/booking"
            className="bg-forest text-stone-50 text-sm font-medium py-2.5 px-5 flex items-center gap-2 rounded-full ring-1 ring-forest hover:brightness-110 transition"
          >
            <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Book Treatment
          </Link>
        </div>
      </div>
    </nav>
  );
}
