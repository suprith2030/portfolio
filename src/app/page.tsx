"use client";

import Hero from "@/components/Hero";
import TechArsenal from "@/components/TechArsenal";
import Blueprints from "@/components/Blueprints";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <div className="section-divider" />
      <TechArsenal />
      <div className="section-divider" />
      <Blueprints />
      <div className="section-divider" />
      <Footer />
    </main>
  );
}
