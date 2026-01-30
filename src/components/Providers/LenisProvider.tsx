// components/LenisProvider.tsx
"use client";

import { useEffect, useRef } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // respect prefers-reduced-motion
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const mod = await import("lenis");
        const Lenis = mod?.default ?? mod;

        const lenis = new Lenis({
          duration: 1.2,
          stopInertiaOnNavigate: true, // helps SPA nav (v1.3.17+)
        });

        if (!mounted) {
          // if unmounted before init
          lenis?.destroy?.();
          return;
        }

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);
      } catch (err) {
        console.error("Lenis init failed:", err);
      }
    })();

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        lenisRef.current?.destroy?.();
      } catch (e) {
        try {
          lenisRef.current?.stop?.();
        } catch (ignored) {}
      }
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
