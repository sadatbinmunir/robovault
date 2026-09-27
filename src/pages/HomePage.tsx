import React from 'react';
import { ArrowRight, Users, Clock, Activity, Terminal, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteConfig, TimelineWeek, TeamMember } from '../types';
import { PageId } from '../components/Navbar';
import { RoboClawLogo } from '../components/RoboClawLogo';

interface HomePageProps {
  siteConfig: SiteConfig;
  timelineWeeks: TimelineWeek[];
  teamMembers: TeamMember[];
  onNavigate: (page: PageId, subTab?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  siteConfig,
  timelineWeeks,
  teamMembers,
  onNavigate,
}) => {
  const supervisor = teamMembers.find((m) => m.themeColor === 'gold') || teamMembers[0];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-8 pt-4">
        {/* Course & Affiliation Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-emerald-300">
            {siteConfig.classCourse}
          </span>
          <span className="text-emerald-500/60">/</span>
          <span className="text-xs text-slate-300 font-mono">Independent University, Bangladesh</span>
        </div>

        {/* ROBOVAULT Hero Emblem & Main Title (Simple, Elegant, 50% Bigger, Green & Black) */}
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            {/* 50% Bigger Vector Cyber Claw Logo */}
            <RoboClawLogo size="hero" />
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-tech font-black tracking-[0.16em] text-white leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 neon-glow-text drop-shadow-[0_0_35px_rgba(16,185,129,0.6)]">
              ROBOVAULT
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-emerald-300 font-tech font-bold tracking-wide max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            {siteConfig.shortTagline || 'Autonomous Lost & Found Assistant Robot'}
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            An autonomous, deep-learning vision guided robotic platform combining active multi-axis claw grasping, real-time object classification, and intelligent litter collection for clean environments.
          </p>
        </div>

        {/* Project Abstract / Description Box */}
        <div className="relative group max-w-3xl mx-auto p-6 sm:p-7 rounded-2xl glass-panel border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/60 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Terminal className="w-4 h-4" />
              <span>ROBOVAULT // RESEARCH ABSTRACT & OPERATIONAL SCOPE</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400/80">
              IUB CCDS HCI WING
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-left">
            {siteConfig.abstract}
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('project', 'overview')}
            className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-tech font-bold text-sm tracking-wider flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>EXPLORE ROBOVAULT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onNavigate('members')}
            className="px-7 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white font-tech font-semibold text-sm tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>RESEARCH SUPERVISOR & TEAM</span>
          </button>

          <button
            onClick={() => onNavigate('timeline')}
            className="px-7 py-3.5 rounded-xl bg-transparent hover:bg-emerald-950/20 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-white font-tech text-sm tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>WEEKLY TIMELINE</span>
          </button>
        </div>

        {/* Subtle Interactive hint */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-emerald-400/80 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Interactive PCB: Click anywhere on the screen to pulse data through the nearest circuit trace!</span>
        </div>
      </section>

      {/* Quick Status Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Research Team', value: `${teamMembers.length} Members & Lead`, icon: Users },
          { label: 'Active Phase', value: 'Website Live & Awaiting Review', icon: Activity },
          { label: 'Timeline Post', value: 'Week 1 Live', icon: Clock },
          { label: 'Research Wing', value: 'IUB CCDS HCI', icon: ShieldCheck },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl glass-panel border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-sm font-tech font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Navigation Showcase Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white mt-1">
              Explore ROBOVAULT Modules
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Review the research supervision, team bios, weekly progress logs, robotic claw specifications, and software architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Members */}
          <div
            onClick={() => onNavigate('members')}
            className="group cursor-pointer p-6 rounded-2xl glass-panel border border-emerald-500/25 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:shadow-[0_0_15px_#00ff88]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-tech font-bold text-white group-hover:text-emerald-300 transition-colors">
                Team & Supervisor
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supervised by {supervisor?.name || 'Dr. Mohammad Shidujaman'} (CCDS HCI Wing), led by Sadat Bin Munir & Fariha Mirza, with core engineering specialists.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between text-xs font-tech text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>View Team Roster</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Timeline */}
          <div
            onClick={() => onNavigate('timeline')}
            className="group cursor-pointer p-6 rounded-2xl glass-panel border border-emerald-500/25 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:shadow-[0_0_15px_#00ff88]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-tech font-bold text-white group-hover:text-emerald-300 transition-colors">
                Weekly Timeline
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chronological roadmap documenting official milestone progression, starting with Week 1 website launch and team approval.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between text-xs font-tech text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Inspect Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Project Subsections */}
          <div
            onClick={() => onNavigate('project', 'overview')}
            className="group cursor-pointer p-6 rounded-2xl glass-panel border border-emerald-500/25 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:shadow-[0_0_15px_#00ff88]">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-tech font-bold text-white group-hover:text-emerald-300 transition-colors">
                Technical Specifications
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore deep dive sections for robotic claw payload benchmarks, ESP32-S3 microcontroller pinouts, and literature review.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between text-xs font-tech text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Explore Technical Specs</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
