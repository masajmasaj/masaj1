import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
  y?: number;
};

/**
 * Subtle scroll-reveal wrapper. Fades and translates in when in view.
 * Respects prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delay = 0, as = "div", y = 16 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const el = ref.current;
    if (!el) return;
    if (m.matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = reduced
    ? undefined
    : {
        transition:
          "opacity 900ms cubic-bezier(0.22,0.61,0.36,1), transform 900ms cubic-bezier(0.22,0.61,0.36,1)",
        transitionDelay: `${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        willChange: "opacity, transform",
      };

  return createElement(as, { ref, className, style }, children);
}
