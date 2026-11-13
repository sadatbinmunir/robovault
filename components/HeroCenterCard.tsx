"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Maximize2, RefreshCw } from "lucide-react";

export interface AIModelPreset {
  id: string;
  name: string;
  tag: string;
  image: string;
  prompt: string;
  renderTime: string;
  badge: string;
}

export const AI_PRESETS: AIModelPreset[] = [
  {
    id: "flux-ultra",
    name: "Model: FLUX.1 Ultra • 8K HDR",
    tag: "FLUX.1 Ultra",
    image: "/hero-portrait-hd.jpg",
    prompt: "Cyberpunk female portrait, slick dark hair, tailored high-collar cyber jacket with glowing orange fiber optics and neon purple rim light, editorial studio lighting, ultra-realistic skin texture, 8k hdr octanerender",
    renderTime: "0.42s",
    badge: "AI Render",
  },
  {
    id: "surreal-vision",
    name: "Model: Midjourney v6.1 • RAW 8K",
    tag: "Midjourney v6.1",
    image: "/model-surreal.jpg",
    prompt: "Surreal ethereal digital art, iridescent liquid metallic chrome waves, futuristic bioluminescent aesthetic, volumetric lighting, photorealistic octane render",
    renderTime: "0.58s",
    badge: "Surreal 8K",
  },
  {
    id: "android-prime",
    name: "Model: DreamFrame Neural v3 • HDR",
    tag: "Neural v3",
    image: "/model-android.jpg",
    prompt: "Futuristic android visage, translucent ceramic synthetic skin, micro-circuits glowing violet, hyper-detailed cyberpunk aesthetic, cinematic lighting",
    renderTime: "0.36s",
    badge: "Photoreal",
  },
  {
    id: "cybercity-neon",
    name: "Model: FLUX.1 Pro • Cinematic",
    tag: "FLUX.1 Pro",
    image: "/model-cybercity.jpg",
    prompt: "Neo-Tokyo dystopian cyber metropolis, rain reflections, high-density neon holographic signage, atmospheric fog, photorealistic 8k unreal engine 5",
    renderTime: "0.49s",
    badge: "Cinematic",
  },
];

interface HeroCenterCardProps {
  onSelectPrompt?: (prompt: string) => void;
  onOpenModal?: () => void;
}

export default function HeroCenterCard({ onSelectPrompt, onOpenModal }: HeroCenterCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const currentPreset = AI_PRESETS[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
    setCurrentIndex((prev) => (prev + 1) % AI_PRESETS.length);
    setTimeout(() => setIsRotating(false), 300);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
    setCurrentIndex((prev) => (prev - 1 + AI_PRESETS.length) % AI_PRESETS.length);
    setTimeout(() => setIsRotating(false), 300);
  };

  // Subtle 3D perspective mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const multiplier = 0.035;
    setTilt({ x: -y * multiplier, y: x * multiplier });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative group/card select-none flex justify-center items-center">
      {/* Ambient background glow behind the card */}
      <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-purple-700/25 via-violet-600/20 to-orange-500/15 rounded-[40px] blur-2xl opacity-75 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Portrait Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onOpenModal}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative z-20 w-[290px] xs:w-[320px] sm:w-[340px] md:w-[350px] lg:w-[360px] h-[400px] xs:h-[430px] sm:h-[460px] md:h-[480px] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#0a0814] border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(139,92,246,0.25)] cursor-pointer"
      >
        {/* Subtle Specular Sheen on Hover */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/card:opacity-100"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 94, 14, 0.05) 100%)",
          }}
        />

        {/* The AI Artwork Image */}
        <div className={`relative w-full h-full transition-transform duration-500 ${isRotating ? "scale-95 opacity-80" : "scale-100 opacity-100"}`}>
          <Image
            src={currentPreset.image}
            alt="AI Image Generator Masterpiece"
            fill
            priority
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 350px, 360px"
            className="object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
          />

          {/* Vignette Shadow Gradients inside card */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090712] via-transparent to-black/20 pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[28px] sm:rounded-[32px] pointer-events-none" />
        </div>

        {/* Hover Quick-Switch Arrows (Discrete editorial controls) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePrev}
            title="Previous AI style"
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            title="Next AI style"
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Frosted Pill Information Bar */}
        <div className="absolute bottom-3 left-2.5 right-2.5 sm:left-3 sm:right-3 z-20">
          <div className="rounded-2xl bg-[#0f0d1c]/90 hover:bg-[#151228]/95 border border-white/[0.08] backdrop-blur-xl px-2.5 sm:px-3 py-2 sm:py-2.5 flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-colors duration-300">
            {/* Left: Purple Dot + Model Name */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1.5">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-medium text-zinc-200 truncate tracking-tight">
                {currentPreset.name}
              </span>
            </div>

            {/* Right: Purple AI Render Pill Badge */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#3b1d6e]/70 border border-purple-500/35 text-purple-300 text-[10px] sm:text-[10.5px] font-semibold tracking-wider flex items-center gap-1 shadow-sm">
                {currentPreset.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
