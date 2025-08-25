"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Website Development",
    bullets: ["Responsive", "SEO Optimized", "Performance"],
  },
  {
    title: "Mobile App Development",
    bullets: ["Cross-platform", "Native UI/UX", "Offline Mode"],
  },
  {
    title: "Micro Apps",
    bullets: ["Quick Dev", "Integration", "Cost-effective"],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  return (
    <section id="services" className="section nav-offset">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold neon-text">What I Offer</h2>
        <div ref={ref} className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              style={{ y: i === 0 ? y1 : i === 1 ? y2 : y1, rotateX: tiltX, rotateY: tiltY }}
              onMouseMove={(e) => {
                const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const dx = (e.clientX - r.left) / r.width - 0.5;
                const dy = (e.clientY - r.top) / r.height - 0.5;
                tiltX.set(dy * -6);
                tiltY.set(dx * 6);
              }}
              onMouseLeave={() => { tiltX.set(0); tiltY.set(0); }}
              className="rounded-2xl glass neon-ring p-6 will-change-transform"
            >
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <ul className="mt-4 space-y-2 text-[var(--text-muted)]">
                {s.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-block rounded-xl bg-[var(--primary)] px-4 py-2 text-black font-semibold shadow-[var(--glow-lg)]">Get Quote</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


