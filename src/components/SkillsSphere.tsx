"use client";
// @ts-nocheck

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text, Center, Points, PointMaterial, AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";

const skills = [
  "React Native",
  "TypeScript",
  "Node.js",
  "Three.js",
  "Next.js",
  "React",
  "Tailwind",
  "GSAP",
  "Firebase",
  "PostgreSQL",
  "Express.js",
  "MongoDB",
  "Redux",
  "Zustand",
  "Prisma",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
];

function Particles() {
  const positions = useMemo(() => new Float32Array(1000 * 3).map(() => (Math.random() - 0.5) * 8), []);
  return (
    <Points positions={positions} frustumCulled>
      <PointMaterial color="#00ffff" size={0.02} sizeAttenuation transparent opacity={0.6} depthWrite={false} />
    </Points>
  );
}

// Fibonacci sphere globe positions
function spherePositions(n: number, radius = 2.4) {
  const out: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    out.push([x * radius, y * radius, z * radius]);
  }
  return out;
}

function Words({ onSelect }: { onSelect: (label: string) => void }) {
  const positions = useMemo(() => spherePositions(skills.length), []);
  return (
    <>
      {skills.map((s, i) => (
        <Float key={s} speed={1.2} rotationIntensity={0.6} floatIntensity={0.6}>
          <Center position={positions[i]}>
            <Text
              fontSize={0.28}
              color="#BC13FE"
              outlineWidth={0.004}
              outlineColor="#7D12FF"
              onClick={() => onSelect(s)}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => (document.body.style.cursor = "default")}
            >
              {s}
            </Text>
          </Center>
        </Float>
      ))}
    </>
  );
}

export default function SkillsSphere() {
  const [, setSelected] = useState<string | null>(null);
  return (
    <section id="skills" className="section nav-offset">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl md:text-4xl font-bold neon-text">Skills Playground</h2>
          <div className="hidden md:flex items-center gap-3 text-sm text-[var(--text-muted)]" />
        </div>
        <div className="mt-6 grid grid-cols-1">
          <div className="h-[600px] w-full rounded-2xl neon-ring grid place-items-center">
          <Suspense fallback={<div className="flex justify-center items-center text-[var(--text-muted)]">Loading 3D…</div>}>
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.8]} frameloop="always">
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={1.2} />
              <Particles />
              <Words onSelect={(s) => setSelected(s)} />
              <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom />
              <PerformanceMonitor onDecline={() => null} />
              <AdaptiveDpr pixelated />
            </Canvas>
          </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}


