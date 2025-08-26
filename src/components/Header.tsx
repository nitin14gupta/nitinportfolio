"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [baseAngle, setBaseAngle] = useState(0); // radians

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 80 && y > lastY);
      setLastY(y);
      // active link detection
      const ids = sections.map((s) => s.id);
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="glass mx-4 mt-4 rounded-2xl px-4 py-3 md:mx-6 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="#home" className="group inline-flex items-center gap-2">
            {/* <span className="inline-grid place-items-center h-9 w-9 rounded-full bg-[rgba(188,19,254,0.15)] border border-[rgba(188,19,254,0.35)] text-white font-semibold tracking-widest neon-text">NG</span> */}
            <span className="text-sm text-[var(--text-muted)]">Nitin Gupta</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`relative transition-colors ${active===s.id?"text-white":"text-[var(--text-muted)]"}`}>
                {s.label}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-[var(--primary)] shadow-[var(--glow-lg)] transition-all ${active===s.id?"w-full":"w-0"}`} />
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            {/* Neon pulse dot toggles a radial menu */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              onPointerDown={(e) => {
                // rotate the wheel by dragging
                const start = { x: e.clientX, y: e.clientY };
                const origin = (e.target as HTMLElement).getBoundingClientRect();
                const cx = origin.left + origin.width / 2;
                const cy = origin.top + origin.height / 2;
                const startAngle = Math.atan2(start.y - cy, start.x - cx);
                const currentBase = baseAngle;
                const move = (ev: PointerEvent) => {
                  const ang = Math.atan2(ev.clientY - cy, ev.clientX - cx);
                  setBaseAngle(currentBase + (ang - startAngle));
                };
                const up = () => {
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", up);
                };
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", up);
              }}
              className={`relative h-10 w-10 rounded-full border border-[rgba(188,19,254,0.45)] bg-[rgba(26,11,31,0.6)] shadow-[var(--glow-lg)] ${open?"scale-95":""}`}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[rgba(188,19,254,0.25)]" />
              {/* icon */}
              <span className="relative z-10 grid h-full w-full place-items-center">
                <span className="grid gap-0.5">
                  <span className="h-0.5 w-4 rounded bg-[var(--primary)]" />
                  <span className="h-0.5 w-4 rounded bg-[var(--primary)]" />
                  <span className="h-0.5 w-4 rounded bg-[var(--primary)]" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Radial mobile menu */}
      {open && (
        <div className="md:hidden fixed right-6 top-20 z-40">
          <div className="relative h-40 w-40" style={{ transform: `rotate(${baseAngle}rad)` }}>
            {sections.map((s, i) => {
              const angle = baseAngle + (i / sections.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * 60 + 40;
              const y = Math.sin(angle) * 60 + 40;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[rgba(188,19,254,0.35)] bg-[rgba(26,11,31,0.8)] px-3 py-1 text-sm"
                  style={{ left: x, top: y }}
                >
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}


