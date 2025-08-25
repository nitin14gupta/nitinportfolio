"use client";
// @ts-nocheck

import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let lenis: any;
    (async () => {
      const { default: Lenis } = await import("@studio-freight/lenis");
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    })();

    return () => {
      if (lenis && lenis.destroy) lenis.destroy();
    };
  }, []);
}


