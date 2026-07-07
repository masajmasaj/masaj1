import { Link } from "@tanstack/react-router";
import { BRAND, FOOTER_NAV } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-stone-900 text-stone-200 py-24 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <div>
            <h3 className="text-2xl serif-display text-stone-50 mb-6">{BRAND.fullName}</h3>
            <p className="text-sm text-stone-300 leading-relaxed max-w-[36ch]">
              Bringing clinical wellness and holistic restoration to London&apos;s finest homes, hotels
              and offices. Licensed, insured, exceptional.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 text-sm">
              <h4 className="text-stone-50 font-medium mb-1">Platform</h4>
              {FOOTER_NAV.platform.map((l) => (
                <Link key={l.to} to={l.to} className="text-stone-300 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <h4 className="text-stone-50 font-medium mb-1">Company</h4>
              {FOOTER_NAV.company.map((l) => (
                <Link key={l.to} to={l.to} className="text-stone-300 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-stone-50 font-medium mb-6">Wellness Journal</h4>
            <p className="text-sm text-stone-300 mb-6 leading-relaxed">
              Seasonal rituals, therapist notes and quiet insights. Delivered monthly.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center ring-1 ring-stone-700 rounded-full p-1"
            >
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent px-4 py-2 text-sm outline-none flex-1 min-w-0 text-stone-50 placeholder:text-stone-500"
              />
              <button
                type="submit"
                className="bg-stone-50 text-stone-900 px-5 py-2 rounded-full text-xs font-medium hover:bg-gold hover:text-stone-50 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="pt-10 border-t border-stone-700/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-stone-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {BRAND.fullName} Ltd. London, United Kingdom.
          </p>
          <div className="flex gap-8 text-[11px] text-stone-500 uppercase tracking-widest">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
