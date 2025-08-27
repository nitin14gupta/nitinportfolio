"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHorizontal() {
  return (
    <section id="about" className="section nav-offset">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Bio card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="glass neon-ring rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start gap-5">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl neon-ring">
                <Image
                  alt="Nitin Gupta"
                  src= "/images/hero.png"
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold neon-text">Nitin Gupta</h2>
                <p className="mt-1 text-[var(--accent-cyan)]">React Native Developer • Frontend Engineer</p>
                <p className="mt-3 text-[var(--text-muted)]">
                  I design and build production‑ready web and mobile apps. I use React Native, Next.js and TypeScript to ship
                  fast, reliable experiences with clean UI, smooth motion, and measurable performance.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="#projects" className="rounded-xl bg-[var(--primary)] px-4 py-2 text-black font-semibold shadow-[var(--glow-lg)]">See projects</a>
                  <a href="#contact" className="rounded-xl border border-[rgba(188,19,254,0.35)] px-4 py-2">DM me / email me</a>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["React Native","TypeScript","Three.js","GSAP","Next.js","Tailwind","Firebase","PostgreSQL"].map((t)=> (
                <span key={t} className="rounded-full border border-[rgba(188,19,254,0.35)] bg-[rgba(188,19,254,0.12)] px-3 py-1">{t}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { k: "Years", v: "2+" },
                { k: "Apps", v: "20+" },
                { k: "Clients", v: "22+" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.25)] p-4 text-center">
                  <div className="text-2xl font-bold text-[var(--accent-cyan)]">{s.v}</div>
                  <div className="text-[var(--text-muted)]">{s.k}</div>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Right: Timeline */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass neon-ring rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold">Experience</h3>
            <div className="mt-4 space-y-5">
              {[
                {
                  year: "2023–Present",
                  role: "React Native Developer (Freelance)",
                  body:
                    "I help founders go from idea to launch: cross‑platform apps, performance tuning, and rich UI motion.",
                },
                {
                  year: "2022–2023",
                  role: "Designer → Frontend Engineer",
                  body:
                    "I moved from brand design into UI engineering to build the polished interactions I wanted to design.",
                },
              ].map((t) => (
                <div key={t.year} className="relative rounded-xl border border-[rgba(188,19,254,0.25)] p-4">
                  <div className="text-xs tracking-widest text-[var(--accent-cyan)]">{t.year}</div>
                  <div className="mt-1 text-base font-semibold">{t.role}</div>
                  <p className="mt-2 text-[var(--text-muted)]">{t.body}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-7 text-xl font-semibold">Education & Certs</h3>
            <div className="mt-3 space-y-3 text-sm text-[var(--text-muted)]">
              <div>• B.Tech — Computer Science</div>
              <div>• Google Firebase, AWS basics, UI Motion workshops</div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
