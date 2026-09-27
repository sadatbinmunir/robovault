import React, { useState, useEffect } from 'react';
import {
  Layers,
  Terminal,
  Cpu,
  Video,
  GitBranch,
  FileCode,
  Users,
  Lock,
  Sparkles,
  ShieldCheck,
  Clock,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { SiteConfig, MemberContribution, TeamMember } from '../types';

export type ElementSubTab = 'software' | 'hardware' | 'demonstration' | 'system-design' | 'ieee-draft' | 'contribution';

interface ElementsPageProps {
  siteConfig: SiteConfig;
  teamMembers: TeamMember[];
  contributions: MemberContribution[];
  initialTab?: ElementSubTab;
}

interface ElementInfo {
  title: string;
  tagline: string;
  phase: string;
  description: string;
  upcomingModules: { label: string; detail: string }[];
}

const elementDetails: Record<ElementSubTab, ElementInfo> = {
  software: {
    title: "Software Stack & Control Algorithms",
    tagline: "FreeRTOS Dual-Core Firmware & Kinematic Logic",
    phase: "PHASE 1 // EMBEDDED CODE IN TESTING",
    description: "The complete firmware source code, FreeRTOS task partition, DS3218 metal gear servo PWM trajectory generators, and edge vision serial communication protocols are undergoing laboratory bench calibration.",
    upcomingModules: [
      { label: "Core 0 Kinematic Loop", detail: "100Hz deterministic FreeRTOS task for claw servo aperture mapping" },
      { label: "Core 1 Vision Pipeline", detail: "Edge object detection serial packet parsing & bounding box coordinates" },
      { label: "Ultrasonic Watchdog", detail: "Microsecond acoustic echo interrupt handler with collision avoidance" }
    ]
  },
  hardware: {
    title: "Hardware Architecture & Schematics",
    tagline: "Component Pinout, Power Regulation & Actuator Interfacing",
    phase: "PHASE 1 // SCHEMATICS COMPILING",
    description: "Full circuit schematics, optocoupled motor driver interfacing maps, dual LM2596 buck converter voltage step-down topologies, and ESP32-S3 pin allocations will unlock following printed circuit board routing.",
    upcomingModules: [
      { label: "ESP32-S3 Interfacing Map", detail: "Full GPIO routing for servos, camera DVP bus, motors, and sonar" },
      { label: "Power Isolation Topology", detail: "12.8V LiFePO4 battery pack with independent logic and motor rails" },
      { label: "Claw Actuator Wiring", detail: "Optocoupled high-current servo harness and PWM driver conditioning" }
    ]
  },
  demonstration: {
    title: "Demonstration Videos & Field Trial Logs",
    tagline: "Bench Tests, Pick-and-Place Footage & Autonomous Runs",
    phase: "PHASE 1 // FIELD FILMING IN PREPARATION",
    description: "Official video logs capturing mechanical claw grasp force retention, real-time recyclable object detection, and autonomous sorting runs will be documented here as physical trials proceed.",
    upcomingModules: [
      { label: "Bench Claw Grasping Trial", detail: "Testing jaw retention across plastic bottles and crushed aluminum cans" },
      { label: "Edge Vision Accuracy Test", detail: "Real-time bounding box regression and classification confidence demo" },
      { label: "Autonomous Sorting Run", detail: "End-to-end corridor patrol, pick-and-place, and bin deposit trial" }
    ]
  },
  'system-design': {
    title: "System Design & Finite State Machine",
    tagline: "System Architecture Blueprints & State Transition Diagrams",
    phase: "PHASE 1 // ARCHITECTURE SPECIFICATION",
    description: "End-to-end system block diagrams, subsystem interconnections, and the complete 4-state autonomous garbage collection state machine (Patrol, Detect, Align/Grasp, Deposit) are being finalized for defense.",
    upcomingModules: [
      { label: "End-to-End Block Diagram", detail: "Interconnections between sensors, processing, actuation, and sorting bins" },
      { label: "FSM Execution Pipeline", detail: "STATE_PATROL, STATE_DETECT, STATE_ALIGN_GRASP, and STATE_SORT_DEPOSIT" },
      { label: "Fault Detection & Recovery", detail: "Proximity breach fallbacks, grip slip detection, and watchdog timeout" }
    ]
  },
  'ieee-draft': {
    title: "IEEE Capstone Conference Manuscript",
    tagline: "2-Column Academic Research Paper Formulation",
    phase: "PHASE 1 // MANUSCRIPT IN PREPARATION",
    description: "The formal IEEE 2-column capstone paper authored by the 5 student researchers under supervisor Dr. Mohammad Shidujaman is being drafted in LaTeX. The full draft PDF and experimental dataset will unlock upon review.",
    upcomingModules: [
      { label: "Section I & II Formulation", detail: "Introduction to automated solid waste sorting & claw kinematic models" },
      { label: "Section III Edge Inference", detail: "Vision classifier accuracy benchmarks and dataset curation methodology" },
      { label: "Section IV Empirical Results", detail: "Bench test validation logs, sorting precision, and capstone defense slides" }
    ]
  },
  contribution: {
    title: "Member Contributions & Work Breakdown",
    tagline: "20% Equal Allocation Across 5 Research Team Members",
    phase: "PHASE 1 // ACTIVE REPOSITORY",
    description: "Detailed work breakdown structure (WBS), subsystem allocations, and weekly technical commits for all 5 team members are being tracked and will be published alongside milestone defense reviews.",
    upcomingModules: [
      { label: "5-Member Responsibility Matrix", detail: "20% equal allocation across architecture, theory, actuation, telemetry, and vision" },
      { label: "Milestone Deliverables Log", detail: "Completed laboratory deliverables and code repositories by student ID" },
      { label: "Peer Collaboration Review", detail: "Faculty advisor review scores and capstone progress milestone sign-offs" }
    ]
  }
};

export const ElementsPage: React.FC<ElementsPageProps> = ({
  siteConfig,
  teamMembers,
  contributions,
  initialTab = 'software',
}) => {
  const [activeTab, setActiveTab] = useState<ElementSubTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const currentInfo = elementDetails[activeTab];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>TECHNICAL SPECIFICATIONS // SECTION 06</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-tight">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 neon-glow-text">Elements</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Comprehensive technical architecture breakdown across software, hardware, demonstration footage, system blueprints, IEEE manuscript, and team workload allocation.
        </p>
      </div>

      {/* 6 Clickable Sub-navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl backdrop-blur-md">
        {[
          { id: 'software', label: 'Software', icon: Terminal },
          { id: 'hardware', label: 'Hardware', icon: Cpu },
          { id: 'demonstration', label: 'Demonstration Video', icon: Video },
          { id: 'system-design', label: 'System Design', icon: GitBranch },
          { id: 'ieee-draft', label: 'IEEE Draft', icon: FileCode },
          { id: 'contribution', label: 'Contribution', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ElementSubTab)}
              className={`py-3 px-3 rounded-xl font-tech font-bold text-xs tracking-wider flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{tab.label.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Unified Pure-Black Futuristic "COMING SOON" Element Display */}
      <div className="relative p-8 sm:p-14 rounded-3xl glass-panel border border-emerald-500/40 text-center space-y-8 overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)] animate-fadeIn">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
              {currentInfo.phase}
            </span>
          </div>

          {/* Large Hero Text */}
          <div className="space-y-3">
            <h2 className="text-5xl sm:text-7xl font-tech font-black text-white tracking-widest leading-none">
              COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 neon-glow-text">SOON</span>
            </h2>
            <h3 className="text-xl sm:text-2xl font-tech font-bold text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              {currentInfo.title}
            </h3>
            <p className="text-xs font-mono text-emerald-400/90 uppercase tracking-wider">
              {currentInfo.tagline}
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-xl mx-auto pt-2">
              {currentInfo.description}
            </p>
          </div>

          {/* Locked Status Indicators */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Module Status: In Progress</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Phase 1 Milestone</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Awaiting Lab Clearance</span>
            </span>
          </div>
        </div>

        {/* Scanline graphic divider */}
        <div className="relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        {/* Upcoming Specifications Preview Cards */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-3 text-left">
          <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider block text-center sm:text-left">
            Upcoming Module Deliverables:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentInfo.upcomingModules.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-black/60 border border-emerald-500/25 space-y-2 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>DELIVERABLE 0{idx + 1}</span>
                  <Lock className="w-3.5 h-3.5 text-emerald-400/80" />
                </div>
                <h4 className="text-sm font-tech font-bold text-white">
                  {item.label}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
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
