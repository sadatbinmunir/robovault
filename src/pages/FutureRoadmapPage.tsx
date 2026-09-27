import React from 'react';
import { Compass, Sparkles, Lock, ArrowRight, ShieldCheck, Cpu, GitBranch, Radio, Terminal } from 'lucide-react';

export const FutureRoadmapPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>PHASE II & FUTURE HORIZONS // SECTION 08</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-tight">
          Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 neon-glow-text">Roadmap</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Next-generation research directions, advanced autonomy modules, and planned post-coursework hardware revisions.
        </p>
      </div>

      {/* Main Holographic "COMING SOON" Console Hero */}
      <div className="relative p-8 sm:p-14 rounded-3xl glass-panel border border-emerald-500/40 text-center space-y-8 overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)]">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
              STATUS: UNDER ACTIVE RESEARCH
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl font-tech font-extrabold text-white tracking-wider">
              COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 neon-glow-text">SOON</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Our engineering team is finalizing Phase I capstone benchmark evaluations. Detailed milestone schematics, neural network models, and field trial footage for Phase II will unlock here soon.
            </p>
          </div>

          {/* Holographic locked module pill bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Phase II Architecture [Locked]</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>ROS2 Humble Migration</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Swarm Mesh Protocol</span>
            </span>
          </div>
        </div>

        {/* Scanline graphic divider */}
        <div className="relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        {/* Teaser Roadmap Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-2">
          {/* Teaser 1 */}
          <div className="p-6 rounded-2xl bg-black/50 border border-emerald-500/25 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>MILESTONE 2.1</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-[10px] border border-emerald-500/30">Phase II</span>
            </div>
            <h3 className="text-lg font-tech font-bold text-white">
              Autonomous Sorting SLAM
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Integrating spatial localization and mapping (SLAM) to build dynamic room occupancy maps with tagged litter hotspots for automated corridor sweeping.
            </p>
          </div>

          {/* Teaser 2 */}
          <div className="p-6 rounded-2xl bg-black/50 border border-emerald-500/25 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>MILESTONE 2.2</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-[10px] border border-emerald-500/30">Hardware Rev 2</span>
            </div>
            <h3 className="text-lg font-tech font-bold text-white">
              Integrated Multi-Layer Controller PCB
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Replacing prototype point-to-point breadboard wiring with an impedance-matched printed circuit board integrating ESP32-S3, high-current claw servo rails, TB6612 drivers, and isolated power regulation.
            </p>
          </div>

          {/* Teaser 3 */}
          <div className="p-6 rounded-2xl bg-black/50 border border-emerald-500/25 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>MILESTONE 2.3</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-[10px] border border-emerald-500/30">Research Expansion</span>
            </div>
            <h3 className="text-lg font-tech font-bold text-white">
              Cooperative Multi-Robot Waste Fleet
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deploying multiple synchronized ROBOVAULT units communicating via mesh protocol to divide large institutional halls into parallel waste sorting zones.
            </p>
          </div>
        </div>
      </div>

      {/* Capstone Milestone Status Card */}
      <div className="p-5 rounded-2xl glass-panel border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>ROBOVAULT Phase 1 Active // Approved by all 5 student researchers, under faculty supervision at IUB.</span>
        </div>
        <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[11px]">
          Week 1 Verified
        </span>
      </div>
    </div>
  );
};
