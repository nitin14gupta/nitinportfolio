"use client";
// @ts-nocheck

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial color="#BC13FE" emissive="#7D12FF" emissiveIntensity={2} roughness={0.2} metalness={0.3} distort={0.35} speed={1.8} />
        </Sphere>
      </Float>
      <Stars radius={50} depth={20} count={1200} factor={2} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

export default function Hero() {
  return (
    <section id="home" className="section min-h-screen flex items-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center">
          <p className="text-sm text-[var(--text-muted)]">Hello, I&apos;m</p>
          <h1 className="mt-2 text-5xl md:text-6xl font-extrabold tracking-tight neon-text">NITIN GUPTA</h1>
          <p className="mt-4 text-xl md:text-2xl text-[var(--text-muted)]">React Native Developer</p>
          <div className="mt-8 flex gap-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-[var(--primary)] text-black font-semibold shadow-[var(--glow-lg)]">View My Work</a>
            <a href="#contact" className="px-6 py-3 rounded-xl border border-[rgba(188,19,254,0.45)] text-white hover:bg-[rgba(188,19,254,0.08)]">Get in Touch</a>
          </div>
        </div>
        <div className="h-[50vh] md:h-[70vh] rounded-2xl neon-ring">
          <Suspense fallback={<div className="grid h-full place-items-center text-[var(--text-muted)]">Loading 3D…</div>}>
            <Canvas camera={{ position: [0, 0, 4] }}>
              <Scene />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}


