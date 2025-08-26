"use client";

export default function Footer() {
  return (
    <footer className="neon-grid section pt-16">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-[var(--text-muted)]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mb-6" />
        <p>© 2025 Nitin Gupta. All rights reserved.</p>
        <button
          onClick={() => {
            const c = document.body.classList;
            const enabled = c.toggle("reduce-motion");
            try {
              localStorage.setItem("reduce-motion", enabled ? "1" : "0");
            } catch {}
          }}
          className="mt-2 rounded-lg border border-[rgba(188,19,254,0.35)] px-3 py-1"
        >
          Toggle Motion
        </button>
      </div>
    </footer>
  );
}


