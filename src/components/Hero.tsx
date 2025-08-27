"use client";
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";

function useWobblePhysics() {
  const amplitudeRef = useRef(0);
  const velocityRef = useRef(0);
  const lastImpulseAtRef = useRef(0);

  const impulse = (strength = 0.6) => {
    velocityRef.current += strength;
    lastImpulseAtRef.current = performance.now();
  };

  useFrame((_, dt) => {
    const damping = 2.2; // higher -> faster settle
    const stiffness = 18; // spring strength
    // basic critically damped spring towards 0
    const displacement = amplitudeRef.current;
    const acceleration = -stiffness * displacement - damping * velocityRef.current;
    velocityRef.current += acceleration * dt;
    amplitudeRef.current += velocityRef.current * dt;
    // clamp
    amplitudeRef.current = Math.max(-1.2, Math.min(1.2, amplitudeRef.current));
    velocityRef.current = Math.max(-5, Math.min(5, velocityRef.current));
  });

  return {
    amplitudeRef,
    impulse,
    lastImpulseAtRef,
  } as const;
}

function Scene({ onWobble }: { onWobble: () => void }) {
  const materialRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const groupRef = useRef<any>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const { amplitudeRef, impulse, lastImpulseAtRef } = useWobblePhysics();

  // Drive jelly distort + subtle scale from spring amplitude
  useFrame((_, dt) => {
    const a = Math.abs(amplitudeRef.current);
    if (materialRef.current) {
      materialRef.current.distort = 0.25 + a * 0.45; // 0.25..0.7
      materialRef.current.speed = 1.4 + a * 2.2; // pulse speed
    }
    // inertial float when released
    if (!isDragging && groupRef.current) {
      const friction = 0.92;
      const pos = groupRef.current.position;
      pos.x += velocityRef.current.x * dt * 60;
      pos.y += velocityRef.current.y * dt * 60;
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;
      // bounds and bounce inside box
      const bound = 1.8;
      if (pos.x > bound) { pos.x = bound; velocityRef.current.x *= -0.7; }
      if (pos.x < -bound) { pos.x = -bound; velocityRef.current.x *= -0.7; }
      if (pos.y > bound) { pos.y = bound; velocityRef.current.y *= -0.7; }
      if (pos.y < -bound) { pos.y = -bound; velocityRef.current.y *= -0.7; }
    }
  });

  const registerWobble = () => {
    const now = performance.now();
    // Debounce multiple impulses during same frame into one visible wobble tick
    if (now - lastImpulseAtRef.current > 120) {
      onWobble();
    }
    impulse(0.9);
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <Float speed={1.2} rotationIntensity={1.0} floatIntensity={1.0}>
        <group ref={groupRef}>
        <Sphere
          args={[1.2, 64, 64]}
          position={[0, 0, 0]}
          onPointerDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
            registerWobble();
          }}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          onPointerMove={(e) => {
            if (isDragging) {
              const mx = (e.nativeEvent as PointerEvent).movementX || 0;
              const my = (e.nativeEvent as PointerEvent).movementY || 0;
              const scale = 0.02; // drag sensitivity
              if (groupRef.current) {
                groupRef.current.position.x += mx * scale;
                groupRef.current.position.y -= my * scale;
                // clamp inside bounds
                const bound = 1.8;
                groupRef.current.position.x = Math.max(-bound, Math.min(bound, groupRef.current.position.x));
                groupRef.current.position.y = Math.max(-bound, Math.min(bound, groupRef.current.position.y));
              }
              velocityRef.current.x = mx * 0.02;
              velocityRef.current.y = -my * 0.02;
              const vel = Math.sqrt(mx * mx + my * my);
              impulse(Math.min(1.2, 0.012 * vel + 0.25));
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            registerWobble();
          }}
        >
          <MeshDistortMaterial
            ref={materialRef}
            color="#BC13FE"
            emissive="#7D12FF"
            emissiveIntensity={2}
            roughness={0.2}
            metalness={0.3}
            distort={0.35}
            speed={1.6}
          />
        </Sphere>
        </group>
      </Float>
      <Stars radius={50} depth={20} count={1200} factor={2} saturation={0} fade speed={1} />
      <OrbitControls enabled={!isDragging} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

export default function Hero() {
  const [wobbles, setWobbles] = useState(0);
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
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)] shadow-[var(--glow-sm)]" />
            <span>Jelly wobbles: </span>
            <span className="font-semibold text-white">{wobbles}</span>
          </div>
        </div>
        <div className="h-[50vh] md:h-[70vh] rounded-2xl neon-ring">
          <Suspense fallback={<div className="grid h-full place-items-center text-[var(--text-muted)]">Loading 3D…</div>}>
            <Canvas camera={{ position: [0, 0, 4] }}>
              <Scene onWobble={() => setWobbles((n) => n + 1)} />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}