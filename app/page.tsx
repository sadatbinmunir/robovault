"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollCanvasSequence from "@/components/ScrollCanvasSequence";
import LogoCarouselSection from "@/components/LogoCarouselSection";
import BentoGridSection from "@/components/BentoGridSection";
import ModelCreatorSection from "@/components/ModelCreatorSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [zenMode, setZenMode] = useState(false);

  return (
    <div className={`relative min-h-screen bg-black text-white selection:bg-[#FF5E0E] selection:text-white ${zenMode ? "zen-mode" : ""}`}>
      {/* Top Floating Editorial Navbar */}
      <Navbar 
        onToggleZenMode={() => setZenMode(!zenMode)}
        zenMode={zenMode}
      />

      {/* 
        Cinematic Scroll-Linked Image Sequence:
        - Stays 100% PINNED while scrolling through all 150 frames.
        - Unobstructed view of the 3D robotics workstation sequence.
      */}
      <ScrollCanvasSequence>
        {({ progress }) => <HeroSection progress={progress} />}
      </ScrollCanvasSequence>

      {/* SECTION 1: Infinite Logo Carousel (Right->Left and Left->Right Marquees) */}
      <LogoCarouselSection />

      {/* SECTION 2: Bento Grid (Exact structural match to reference image) */}
      <BentoGridSection />

      {/* SECTION 3: 3D Model Creator Section (Exact studio layout, clean light-gray background) */}
      <ModelCreatorSection />

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}
