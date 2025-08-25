export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-7xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold neon-text">{title}</h2>
      {subtitle ? <p className="mt-2 text-[var(--text-muted)]">{subtitle}</p> : null}
    </div>
  );
}

export function Placeholder({ id, height = 400 }: { id: string; height?: number }) {
  return (
    <section id={id} className="section nav-offset">
      <div className="mx-auto max-w-7xl px-6">
        <div className="neon-ring glass rounded-2xl p-10" style={{ minHeight: height }}>
          <p className="text-[var(--text-muted)]">{id} section scaffolding. Content will be added.</p>
        </div>
      </div>
    </section>
  );
}


