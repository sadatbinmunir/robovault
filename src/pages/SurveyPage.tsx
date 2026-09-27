import React from 'react';
import { ClipboardList, Sparkles, Terminal } from 'lucide-react';

export const SurveyPage: React.FC = () => {
  return (
    <div className="relative z-10 min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-black">
      {/* Ambient background micro-glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 p-8 sm:p-14 rounded-3xl bg-black border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
        {/* Module Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
          <ClipboardList className="w-3.5 h-3.5 text-emerald-400" />
          <span>CAPSTONE SURVEY // MODULE 04</span>
        </div>

        {/* Big Coming Soon Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-tech font-black tracking-widest text-white leading-none">
            COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 neon-glow-text drop-shadow-[0_0_35px_rgba(16,185,129,0.5)]">SOON</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto font-mono leading-relaxed">
            The ROBOVAULT community feedback and robotics testing survey will be activated here following upcoming demonstration phases.
          </p>
        </div>

        {/* Minimal Terminal Status Bar */}
        <div className="pt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#040905] border border-emerald-500/20 text-xs font-mono text-emerald-300">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>STATUS: SURVEY PIPELINE UNDER STAGING // PHASE 1</span>
        </div>
      </div>
    </div>
  );
};
