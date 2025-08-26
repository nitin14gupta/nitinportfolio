"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutHorizontal from "../components/AboutHorizontal";
import SkillsSphere from "../components/SkillsSphere";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
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
        <Testimonials />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
