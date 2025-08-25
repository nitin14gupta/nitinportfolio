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
            <span className="hidden sm:block text-sm text-[var(--text-muted)]">Nitin Gupta</span>
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
            <button aria-label="Open menu" className="h-9 w-10 rounded-lg border border-[rgba(188,19,254,0.35)] bg-[rgba(26,11,31,0.6)]" />
          </div>
        </div>
      </div>
    </header>
  );
}


