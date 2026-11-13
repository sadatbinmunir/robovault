"use client";

import React from "react";

interface FeatureBlock {
  name: string;
  role: string;
  badge?: string;
  icon: React.ReactNode;
}

const row1Features: FeatureBlock[] = [
  {
    name: "Google Gemini",
    role: "Multimodal On-Desk Reasoning",
    badge: "LLM CORE",
    icon: (
      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
      </svg>
    ),
  },
  {
    name: "ESP32",
    role: "Real-Time Sensor & Actuator MCU",
    badge: "HARDWARE",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="14" y1="20" x2="14" y2="23" />
      </svg>
    ),
  },
  {
    name: "Touch Screen",
    role: "Capacitive Interactive Visor",
    badge: "DISPLAY",
    icon: (
      <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    ),
  },
  {
    name: "Raspberry Pi",
    role: "Dedicated Edge Linux Compute",
    badge: "SBC",
    icon: (
      <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="9" cy="8" r="3" />
        <circle cx="15" cy="8" r="3" />
        <circle cx="7" cy="14" r="3" />
        <circle cx="17" cy="14" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M12 3v3m-2-1l2 2 2-2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "AI Desk Bot",
    role: "Embodied Physical Desk Companion",
    badge: "ROBOTICS",
    icon: (
      <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="8" width="18" height="12" rx="4" />
        <circle cx="9" cy="14" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" />
        <line x1="12" y1="3" x2="12" y2="8" />
        <circle cx="12" cy="2.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "AI Companion",
    role: "Proactive Workflow Partner",
    badge: "ASSISTANT",
    icon: (
      <svg className="w-5 h-5 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Self-Hosted",
    role: "100% Private Local Inference",
    badge: "OFFLINE",
    icon: (
      <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="7" rx="2" />
        <rect x="2" y="14" width="20" height="7" rx="2" />
        <line x1="6" y1="6.5" x2="6.01" y2="6.5" strokeWidth="3" strokeLinecap="round" />
        <line x1="6" y1="17.5" x2="6.01" y2="17.5" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Samsung Ring Integration",
    role: "Continuous Biometric Wearable Sync",
    badge: "WEARABLE",
    icon: (
      <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="5" strokeDasharray="3 3" />
        <circle cx="12" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Google Health Integration",
    role: "Unified Wellness Telemetry",
    badge: "HEALTH",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Facial Recognition",
    role: "Gaze Lock & User Identification",
    badge: "VISION",
    icon: (
      <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
        <circle cx="15" cy="10" r="1.5" fill="currentColor" />
        <path d="M9.5 15c.8.7 1.7 1 2.5 1s1.7-.3 2.5-1" />
      </svg>
    ),
  },
];

const row2Features: FeatureBlock[] = [
  {
    name: "Stress Level Detection",
    role: "Heart Rate Variability & Tension",
    badge: "BIOMETRIC",
    icon: (
      <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Attention Detection",
    role: "Neural Gaze & Focus Tracking",
    badge: "NEURAL GAZE",
    icon: (
      <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Attention Monitoring",
    role: "Continuous Flow State Logging",
    badge: "TELEMETRY",
    icon: (
      <svg className="w-5 h-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    name: "Comfort Level Detection",
    role: "Posture & Ergonomic Wellness",
    badge: "ERGONOMICS",
    icon: (
      <svg className="w-5 h-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
        <path d="M8 15a4 4 0 0 0 8 0v-2H8v2z" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: "Environment Detection",
    role: "Ambient Desk Lighting & Air Index",
    badge: "SENSORS",
    icon: (
      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2a10 10 0 0 1 10 10" />
        <path d="M12 6a6 6 0 0 1 6 6" />
      </svg>
    ),
  },
  {
    name: "Environment Temperature Detection",
    role: "Precision Thermal Monitoring",
    badge: "THERMAL",
    icon: (
      <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Environment Sound Levels",
    role: "Noise Floor & Distraction dB Meter",
    badge: "ACOUSTIC",
    icon: (
      <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="10" x2="3" y2="14" />
        <line x1="7" y1="6" x2="7" y2="18" />
        <line x1="11" y1="3" x2="11" y2="21" />
        <line x1="15" y1="7" x2="15" y2="17" />
        <line x1="19" y1="9" x2="19" y2="15" />
      </svg>
    ),
  },
  {
    name: "Gamification of Attention Span",
    role: "Focus Streaks, XP & Milestones",
    badge: "FLOW REWARDS",
    icon: (
      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
        <path d="M6 4h12v6a6 6 0 0 1-12 0V4z" />
      </svg>
    ),
  },
  {
    name: "Monthly Attention Reports",
    role: "Deep Productivity Analytics & Trends",
    badge: "INSIGHTS",
    icon: (
      <svg className="w-5 h-5 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function LogoCarouselSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-black overflow-hidden z-20 border-t border-white/[0.06]">
      {/* Dark Cosmic Gradient Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[520px] h-[520px] bg-violet-600/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[520px] h-[520px] bg-blue-600/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-950/[0.12] rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white/95 max-w-2xl mx-auto leading-tight">
          FocusBot AI Features and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-white">
            What&apos;s to Come
          </span>
        </h2>
      </div>

      {/* Marquee Row 1: Right to Left */}
      <div className="marquee-mask w-full overflow-hidden mb-4 sm:mb-6 select-none">
        <div className="animate-marquee-left flex gap-4 sm:gap-6 py-2">
          {/* Double repetition ensures mathematical seamlessness on all screen sizes up to 4K */}
          {[...row1Features, ...row1Features, ...row1Features, ...row1Features].map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center space-x-3.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:from-white/[0.09] hover:to-white/[0.03] border border-white/[0.08] hover:border-violet-500/35 transition-all duration-300 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(139,92,246,0.18)] group shrink-0 cursor-default"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-medium tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 group-hover:text-zinc-200 border border-white/[0.05] whitespace-nowrap">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-zinc-400 group-hover:text-zinc-300 tracking-normal transition-colors font-light whitespace-nowrap">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Left to Right */}
      <div className="marquee-mask w-full overflow-hidden select-none">
        <div className="animate-marquee-right flex gap-4 sm:gap-6 py-2">
          {/* Staggered items moving in opposite direction */}
          {[...row2Features, ...row2Features, ...row2Features, ...row2Features].map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center space-x-3.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:from-white/[0.09] hover:to-white/[0.03] border border-white/[0.08] hover:border-blue-500/35 transition-all duration-300 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(59,130,246,0.18)] group shrink-0 cursor-default"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-medium tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 group-hover:text-zinc-200 border border-white/[0.05] whitespace-nowrap">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-zinc-400 group-hover:text-zinc-300 tracking-normal transition-colors font-light whitespace-nowrap">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}