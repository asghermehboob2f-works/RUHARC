"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroBackground } from "@/components/HeroBackground";
import { AnnouncementBadge } from "@/components/AnnouncementBadge";
import { MainHeading } from "@/components/MainHeading";
import { HeroDescription } from "@/components/HeroDescription";
import { CTAButtons } from "@/components/CTAButtons";
import { TrustRow } from "@/components/TrustRow";
import { InteractiveWorkspace } from "@/components/InteractiveWorkspace";
import { SpotlightCursor } from "@/components/SpotlightCursor";
import { TrustSection } from "@/components/TrustSection";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { HowItWorksSection } from "@/components/how-it-works/HowItWorksSection";

export default function Home() {
  // Mouse position normalized (-1 to 1) for parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll animations per specification
  const { scrollY } = useScroll();

  const heroScale = useTransform(scrollY, [0, 600], [1, 0.99]);
  const headingY = useTransform(scrollY, [0, 400], [0, -40]);
  const headingOpacity = useTransform(scrollY, [0, 400], [1, 0.92]);
  const workspaceRotate = useTransform(scrollY, [0, 600], [0, 1]);

  const scrollToWorkspace = () => {
    const workspaceElement = document.getElementById("demo-workspace");
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-sky-500/30 overflow-x-hidden">
      {/* Custom Spotlight Cursor */}
      <SpotlightCursor />

      {/* Sleek Fixed Command Center Glass Navbar */}
      <Navbar />

      {/* 01.1 HERO SECTION WRAPPER */}
      <motion.section
        style={{ scale: heroScale }}
        className="relative pt-[120px] pb-[100px] px-6 sm:px-12 lg:px-[120px] max-w-[1600px] mx-auto min-h-screen flex flex-col justify-between"
      >
        <HeroBackground mouseX={mousePos.x} mouseY={mousePos.y} />

        <div className="relative z-10 w-full pt-8">
          <motion.div
            style={{ y: headingY, opacity: headingOpacity }}
            className="flex flex-col items-center text-center mb-16"
          >
            <AnnouncementBadge />
            <MainHeading />
            <HeroDescription />
            <CTAButtons
              onWatchDemo={scrollToWorkspace}
              onStartDesigning={scrollToWorkspace}
            />
            <TrustRow />
          </motion.div>

          <motion.div
            id="demo-workspace"
            style={{ rotate: workspaceRotate }}
            className="w-full pt-4"
          >
            <InteractiveWorkspace />
          </motion.div>
        </div>
      </motion.section>

      {/* 01.3 TRUST SECTION */}
      <TrustSection />

      {/* 01.4 FEATURES SECTION (Parts 1, 2, & 3 — 30 Features) */}
      <FeatureGrid />

      {/* HOW IT WORKS SECTION (Parts 01 & 02 — Steps 01 to 15 + Final CTA) */}
      <HowItWorksSection />
    </main>
  );
}
