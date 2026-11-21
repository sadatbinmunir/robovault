"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function BentoGridSection() {
  const [activeMood, setActiveMood] = useState<"focus" | "attentive" | "zen" | "playful">("focus");

  const moods = [
    { id: "focus", label: "Deep Focus", status: "Gaze locked to task", fps: "120 FPS" },
    { id: "attentive", label: "Attentive", status: "Listening to query", fps: "120 FPS" },
    { id: "zen", label: "Zen Mode", status: "Ambient desk presence", fps: "30 FPS" },
    { id: "playful", label: "Celebration", status: "Milestone achieved", fps: "60 FPS" },
  ] as const;

  return (
    <section className="relative w-full py-24 sm:py-32 bg-black text-white overflow-hidden z-20 border-t border-white/[0.06]">
      {/* Dark Cosmic Gradient Ambience & Radial Halos */}
      <div className="absolute top-1/4 -left-48 w-[650px] h-[650px] bg-violet-600/[0.09] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[650px] h-[650px] bg-blue-600/[0.09] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-purple-950/[0.12] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.07] pb-8">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Your Concentration Companion. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-purple-200 to-zinc-400">
                Always By Your Side.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
            A friendly little desk robot designed to keep you focused, motivated, and smiling. Whether studying late or crushing big goals, FocusBot gently keeps distractions away so deep work feels effortless.
          </p>
        </div>

        {/* 
          BENTO GRID CONTAINER
          Structural recreation matching the reference image layout:
          - Row 1: Card 1 (Wide ~65%) & Card 2 (Compact ~35%)
          - Bottom Section:
            - Left: Card 3 (Tall Portrait card spanning 2 rows ~33%)
            - Right: Card 4 (Wide Horizontal Banner ~67%)
                    Card 5 (Medium ~60%) & Card 6 (Two Stacked Micro-Cards ~40%)
        */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          
          {/* ================= TOP ROW ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
            
            {/* Card 1: TOP LEFT - Wide Card (~65% / 8 cols) */}
            <div className="lg:col-span-8 relative rounded-[28px] sm:rounded-[36px] overflow-hidden p-6 sm:p-10 border border-white/[0.08] hover:border-violet-500/35 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-violet-950/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-all duration-500 flex flex-col justify-between min-h-[420px] sm:min-h-[460px]">
              {/* Subtle Ambient Cosmic Glow */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-500/15 rounded-full blur-[90px] pointer-events-none group-hover:bg-violet-500/25 transition-all duration-500" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center h-full">
                
                {/* Left Side: Bold Display Typography (3 stacked lines matching reference) */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="space-y-0.5 mb-5 select-none">
                      <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[0.92]">
                        EMOTIVE
                      </span>
                      <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[0.92]">
                        NEURAL
                      </span>
                      <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-white uppercase leading-[0.92]">
                        ENGINE
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-zinc-300/90 font-light leading-relaxed max-w-sm mb-6">
                      FocusBot understands when you are in the flow and when you are fatigued. Subtle micro-gestures and glance tracking nudge you into sustained productivity.
                    </p>
                  </div>

                  {/* Mood / Expression Selector Pills */}
                  <div>
                    <div className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 mb-2">
                      Live State: <span className="text-purple-300">{moods.find(m => m.id === activeMood)?.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {moods.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setActiveMood(m.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                            activeMood === m.id
                              ? "bg-purple-500/20 text-purple-200 border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                              : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.08]"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: High-Resolution Visual of Robot Face & Digital Visor */}
                <div className="md:col-span-5 relative flex flex-col items-center justify-center">
                  <div className="relative w-full aspect-square max-w-[280px] rounded-3xl overflow-hidden border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-black/80 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group-hover:border-purple-400/40 transition-all duration-500">
                    <Image
                      src="/frames/frame_001.png"
                      alt="FocusBot Neural Expression"
                      fill
                      className="object-cover object-[26%_65%] group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Emotive Visor Holographic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-purple-500/10 pointer-events-none" />

                    {/* Telemetry HUD Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono text-zinc-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        GAZE LOCKED
                      </span>
                      <span className="text-purple-300 font-semibold">120 FPS</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: TOP RIGHT - Compact Card (~35% / 4 cols) */}
            <div className="lg:col-span-4 relative rounded-[28px] sm:rounded-[36px] overflow-hidden p-6 sm:p-8 border border-white/[0.08] hover:border-blue-500/35 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-blue-950/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-all duration-500 flex flex-col justify-between min-h-[420px] sm:min-h-[460px]">
              
              {/* Header with Circular Badge (Matching exact structural badge in reference image) */}
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Whisper-Voice Synapse
                  </h3>
                </div>

                {/* Circular Quadrant Badge matching the reference's circular 2024 badge */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md flex flex-col items-center justify-center p-2 text-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:border-blue-400/50 transition-colors">
                  <span className="text-[11px] font-mono font-black text-blue-300 leading-none">0.3s</span>
                  <span className="text-[8px] font-mono text-zinc-400 tracking-wider uppercase mt-0.5">DELAY</span>
                </div>
              </div>

              {/* Upper Visual: Acoustic Wave Beamforming Array */}
              <div className="relative my-4 py-4 flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Concentric Acoustic Rings */}
                  <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping opacity-40" />
                  <div className="absolute w-28 h-28 rounded-full border border-purple-500/30 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute w-20 h-20 rounded-full border border-white/20 bg-blue-500/10 backdrop-blur-md" />
                  
                  {/* Central Mic Array Hub */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="22"/>
                    </svg>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase mt-2">
                  Quad Beamforming • Noise Cancelling
                </span>
              </div>

              {/* Lower Console: Real-time Audio Mixer Telemetry (Matching audio console in reference) */}
              <div className="relative z-10 bg-black/60 rounded-2xl p-4 border border-white/[0.06] backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Vocal Array (4-Beam)</span>
                  <span className="text-emerald-400 font-semibold">-42dB Floor</span>
                </div>
                
                {/* Audio Level Graphic Bars */}
                <div className="flex items-end gap-1.5 h-7 pt-1">
                  {[45, 60, 85, 95, 75, 40, 65, 90, 80, 50, 70, 95, 60, 30].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-sm transition-all duration-300 ${
                        h > 80
                          ? "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          : h > 50
                          ? "bg-blue-400"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-0.5">
                  <span>Latency: 28ms</span>
                  <span>Neural Vocoder 48kHz</span>
                </div>
              </div>

            </div>

          </div>

          {/* ================= BOTTOM SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            
            {/* Card 3: BOTTOM LEFT - Tall Portrait Card (~33% / 4 cols, spanning 2 vertical rows) */}
            <div className="lg:col-span-4 relative rounded-[28px] sm:rounded-[36px] overflow-hidden p-6 sm:p-8 border border-white/[0.08] hover:border-purple-500/35 bg-gradient-to-b from-white/[0.05] via-black to-black shadow-[0_20px_50px_rgba(0,0,0,0.7)] group transition-all duration-500 flex flex-col justify-between min-h-[580px] sm:min-h-[640px]">
              
              {/* Full-Height Background Image of FocusBot Robot Companion */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/frames/frame_001.png"
                  alt="FocusBot Physical Desktop Companion"
                  fill
                  className="object-cover object-[26%_70%] group-hover:scale-105 transition-transform duration-700"
                />
                {/* Deep Cosmic Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-black" />
              </div>

              <div className="relative z-10 flex items-center justify-end">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                  GEN 2.0
                </div>
              </div>

              {/* Bottom Area: Specs & Floating Frosted Pill Button (Exact match to "Visit site" pill in reference) */}
              <div className="relative z-10 pt-48 flex flex-col items-start">
                <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-purple-300 font-semibold mb-2">
                  STYLISH COMPACT UNIBODY
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                  Stylish Plastic Body with Cute Design
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300/80 leading-relaxed font-light mb-6">
                  Crafted with lightweight durable polymers and smooth rounded curves, featuring silent dual-bearing servos and anti-vibration base dampeners.
                </p>

                {/* Floating Frosted Pill Button (Matches "↗ Visit site" in reference) */}
                <button className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-400/50 text-xs font-semibold text-white tracking-wide backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:scale-[1.02]">
                  <span>↗ Explore Hardware Specs</span>
                </button>
              </div>

            </div>

            {/* Right Container: Holds Card 4 (Top Banner) & Row with Card 5 and Card 6 (~67% / 8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5 lg:gap-6">
              
              {/* Card 4: BOTTOM RIGHT - Wide Horizontal Banner */}
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden p-6 sm:p-9 border border-violet-500/25 hover:border-violet-400/40 bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-blue-950/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Left Side: Bold Uppercase Display Headline & Sub-line (Matching reference) */}
                <div className="space-y-3 relative z-10 max-w-xl">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase leading-[1.05]">
                    AUTONOMOUS WORKSPACE INTELLIGENCE
                  </h3>

                  <div className="text-sm sm:text-base font-bold tracking-wider text-purple-200 uppercase flex flex-wrap items-center gap-2">
                    <span>SYNCED TO YOUR DAILY FLOW</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-300">ZERO NOTIFICATION OVERLOAD</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {["VS Code Sync", "Terminal Monitor", "Pomodoro Flow", "Fatigue Alert"].map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.07] text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Large Circular Button with Arrow (Exact structural match to reference) */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.14] backdrop-blur-xl flex items-center justify-center text-white text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-110 group-hover:border-purple-400 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] cursor-pointer shrink-0">
                  <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    ↗
                  </span>
                </div>

              </div>

              {/* Bottom Row inside Right Container: Card 5 (Medium) + Card 6 (Two Stacked Micro-Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 flex-1">
                
                {/* Card 5: Medium Card (~60% / 7 cols) - On-Device Privacy Enclave */}
                <div className="sm:col-span-7 relative rounded-[28px] sm:rounded-[34px] overflow-hidden p-6 sm:p-8 border border-white/[0.08] hover:border-cyan-500/35 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-cyan-950/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-all duration-500 flex flex-col justify-between min-h-[250px]">
                  
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase leading-snug mb-3">
                      MULTI-PROCESSOR &amp; MULTIMODAL ANALYSIS
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                      Combines high-speed dual-core ESP32-S3 edge vision processing with Google Gemini multimodal reasoning to evaluate study focus, head pose, and distraction patterns in real time.
                    </p>
                  </div>

                </div>

                {/* Card 6: Stacked Micro-Cards (~40% / 5 cols) */}
                <div className="sm:col-span-5 flex flex-col gap-3 sm:gap-4 justify-between">
                  
                  {/* Micro-Card 6a (Top): Developer SDK */}
                  <div className="relative rounded-[22px] sm:rounded-[26px] p-5 border border-white/[0.08] hover:border-purple-400/35 bg-gradient-to-br from-white/[0.06] to-purple-950/25 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] group transition-all duration-300 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-semibold">
                        OPEN EXTENSIBILITY
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-400/30">
                        v2.4 SDK
                      </span>
                    </div>

                    <div className="font-mono text-xs text-zinc-200 font-semibold mb-2">
                      Python & Rust Agent API
                    </div>

                    <div className="bg-black/60 rounded-xl px-3 py-1.5 border border-white/[0.06] font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                      <span className="text-zinc-300">$ pip install focusbot</span>
                      <span className="text-zinc-500">copy</span>
                    </div>
                  </div>

                  {/* Micro-Card 6b (Bottom): Open Project Gallery (Non-clickable placeholder) */}
                  <div className="relative rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between cursor-default select-none">
                    <div>
                      <div className="text-xs sm:text-sm font-bold tracking-tight text-white">
                        Open Project Gallery
                      </div>
                    </div>

                    {/* Expand icon matching the bottom right icon in reference image */}
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 3 21 3 21 9"/>
                        <polyline points="9 21 3 21 3 15"/>
                        <line x1="21" y1="3" x2="14" y2="10"/>
                        <line x1="3" y1="21" x2="10" y2="14"/>
                      </svg>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}