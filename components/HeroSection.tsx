"use client";

import React from "react";

interface HeroSectionProps {
  progress?: number;
}

export default function HeroSection({ progress = 0 }: HeroSectionProps) {
  // Smooth subtle opacity transition for storytelling as user scrubs through frames
  const headlineOpacity = Math.max(0.15, 1 - progress * 1.5);
  // Quick fade out for the scroll prompt as soon as the user starts scrolling
  const scrollIndicatorOpacity = Math.max(0, 1 - progress * 8);

  return (
    <main className="relative w-full h-full bg-transparent text-white overflow-hidden flex flex-col justify-start pt-20 sm:pt-24 pb-4 select-none">
      {/* Main Content Area - Moved up to clear the companion robot */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-start pt-4 sm:pt-8 lg:pt-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 w-full">
          
          {/* Left Column: Headline & Subtitle */}
          <div 
            style={{ opacity: headlineOpacity, transition: "opacity 0.2s ease-out" }}
            className="flex flex-col items-start space-y-2 sm:space-y-3 text-left"
          >
            {/* FocusBot & Subtitle */}
            <div className="relative max-w-2xl space-y-2 sm:space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none">
                <span className="text-white">Focus</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-white">
                  Bot
                </span>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-indigo-100 to-zinc-300 tracking-normal">
                An Ai powered Desk companion
              </p>
            </div>
          </div>

          {/* Right Side: Small Scroll Down Indicator */}
          <div
            style={{
              opacity: scrollIndicatorOpacity,
              transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)] pointer-events-none mt-1 sm:mt-3 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-300">
              Scroll down
            </span>
            <svg
              className="w-3.5 h-3.5 text-purple-300 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </div>

        </div>
      </div>
    </main>
  );
}
