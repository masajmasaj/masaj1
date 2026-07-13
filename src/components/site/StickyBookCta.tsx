import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * Sticky mobile-only "Book" bar. Appears after the hero has scrolled past.
 * Desktop: hidden. Hidden on /booking to avoid duplication.
 */
export function StickyBookCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/booking")) return;
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-3 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        background:
          "linear-gradient(to top, rgba(250,249,246,0.98) 60%, rgba(250,249,246,0))",
      }}
    >
      <Link
        to="/booking"
        className="flex items-center justify-center w-full bg-stone-900 text-stone-50 rounded-full py-4 text-sm font-medium tracking-wide shadow-[0_16px_40px_-20px_rgba(20,20,15,0.6)] hover:bg-forest transition"
      >
        Book a Treatment
      </Link>
    </div>
  );
}
