"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#040406] text-white border-t border-white/[0.08] overflow-hidden z-20">
      {/* Ambient background glow accents */}
      <div 
        className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-12 relative z-10">
        
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Research Mission (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-8">
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-bold tracking-tight text-white mb-4 group"
            >
              <span>Focusbot</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200">
                .Ai
              </span>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md font-light">
              An embodied AI desk companion combining low-latency edge computer vision 
              and Google Gemini multimodal reasoning to eliminate distraction loops and sustain deep focus.
            </p>
          </div>

          {/* Col 2: System & Build (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-purple-300 font-semibold mb-4">
              System &amp; Build
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/overview" className="text-zinc-400 hover:text-white transition-colors">
                  Project Overview
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="text-zinc-400 hover:text-white transition-colors">
                  Architecture &amp; Schematics
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-zinc-400 hover:text-white transition-colors">
                  System Roadmap
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-zinc-400 hover:text-white transition-colors">
                  Development Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & People (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-purple-300 font-semibold mb-4">
              Research &amp; Team
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/team" className="text-zinc-400 hover:text-white transition-colors">
                  Faculty &amp; Engineering Team
                </Link>
              </li>
              <li>
                <Link href="/literature" className="text-zinc-400 hover:text-white transition-colors">
                  Literature Reviews &amp; Paper
                </Link>
              </li>
              <li>
                <Link href="/survey" className="text-zinc-400 hover:text-white transition-colors">
                  HRI User Study Survey
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  About FocusBot
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                  Contact Research Team
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Return to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <p className="text-center sm:text-left">
            &copy; 2026 FocusBot Embodied Robotics. Center for Computational &amp; Data-Sciences (CCDS). All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Return to top of page"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-400/30 text-zinc-400 hover:text-white transition-all text-xs font-mono group"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-purple-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
