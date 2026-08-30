import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Apparition en fondu + léger glissement au scroll.
 * Rendu visible par défaut (SSR / sans JS) : l'animation ne s'active
 * qu'après hydratation, et est neutralisée par prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setArmed(true);

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const state = !armed ? "reveal-static" : shown ? "reveal-in" : "reveal-out";

  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${state} ${className}`}
    >
      {children}
    </Tag>
  );
}
