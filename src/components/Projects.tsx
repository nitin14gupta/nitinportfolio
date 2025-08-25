"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  { title: "VBook Teaching Platform", tags: ["React", "Node", "Postgres"], demo: "#", git: "#" },
  { title: "Portfolio Website", tags: ["Next.js", "Three.js"], demo: "#", git: "#" },
  { title: "Medication App", tags: ["React Native", "TS"], demo: "#", git: "#" },
  { title: "Project 4", tags: ["GSAP"], demo: "#", git: "#" },
  { title: "Project 5", tags: ["Firebase"], demo: "#", git: "#" },
  { title: "Project 6", tags: ["Tailwind"], demo: "#", git: "#" },
];

const filters = ["All", "Web", "Mobile", "3D"] as const;

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((p) => filter === "All" || p.tags.includes(filter));
  return (
    <section id="projects" className="section nav-offset">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold neon-text">Featured Projects</h2>
        <div className="mt-4 flex gap-3 text-sm">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 border ${filter===f?"bg-[var(--primary)] text-black border-transparent":"border-[rgba(188,19,254,0.35)]"}`}>{f}</button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl glass border border-[rgba(188,19,254,0.25)] will-change-transform"
              whileHover={{ rotateX: -6, rotateY: 6, scale: 1.02 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs rounded-full bg-[rgba(188,19,254,0.15)] border border-[rgba(188,19,254,0.35)]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-4 text-sm">
                  <a href={p.demo} className="text-[var(--accent-cyan)] hover:underline">Demo</a>
                  <a href={p.git} className="text-[var(--accent-cyan)] hover:underline">GitHub</a>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none transition-transform duration-500 group-hover:scale-110" style={{ boxShadow: "inset 0 0 80px rgba(188,19,254,0.18)" }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


