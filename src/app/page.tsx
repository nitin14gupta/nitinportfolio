"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutHorizontal from "../components/AboutHorizontal";
import SkillsSphere from "../components/SkillsSphere";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Contact from "../components/Contact";
import { useLenis } from "../hooks/useLenis";

function SmoothScroll() {
  useLenis();
  return null;
}

export default function Home() {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <SmoothScroll />
        <Hero />
        <AboutHorizontal />
        <SkillsSphere />
        <Projects />
        <Services />
        <Contact />

        <footer className="section pt-16">
          <div className="mx-auto max-w-7xl px-6 text-center text-sm text-[var(--text-muted)]">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mb-6" />
            <p>© 2025 Nitin Gupta. All rights reserved.</p>
            <p className="mt-1">Made with 💜 using Three.js, GSAP & Next.js</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
