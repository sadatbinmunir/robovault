import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, FileText, Cpu, Check, Download, Layers, ShieldCheck, Zap, AlertCircle, ArrowUpRight, User, BookMarked, GraduationCap, ExternalLink, Eye, X } from 'lucide-react';
import { SiteConfig, Equipment, LiteratureItem } from '../types';
import {
  sadatMunirImg,
  farihaMirzaImg,
  khalidurEftyImg,
  istiaqueAhmedImg,
  farihaAfrozImg,
} from '../assets/images';

export type ProjectSubTab = 'overview' | 'literature' | 'paper' | 'equipments';

interface ProjectPageProps {
  siteConfig: SiteConfig;
  equipments: Equipment[];
  literature: LiteratureItem[];
  initialTab?: ProjectSubTab;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  siteConfig,
  equipments,
  literature,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<ProjectSubTab>(initialTab);
  const [equipmentCategory, setEquipmentCategory] = useState<string>('All');
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const categories = ['All', 'Microcontroller', 'Sensor', 'Actuator', 'Power', 'Mechanical'];

  const filteredEquipments = equipmentCategory === 'All'
    ? equipments
    : equipments.filter(eq => eq.category === equipmentCategory);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>COURSEWORK DOSSIER // SECTION 05</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-tight">
          Robotics Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 neon-glow-text">Dossier</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Explore the academic and physical dimensions of our robotics coursework capstone. Select any sub-module below.
        </p>
      </div>

      {/* Sub-Navigation Buttons (As requested by user: project overview, literature review, Project paper, and Equipments used) */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-1.5 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl max-w-3xl mx-auto backdrop-blur-md">
        {[
          { id: 'overview', label: 'Project Overview', icon: Compass },
          { id: 'literature', label: 'Literature Review', icon: BookOpen },
          { id: 'paper', label: 'Project Paper', icon: FileText },
          { id: 'equipments', label: 'Equipments Used', icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProjectSubTab)}
              className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-tech font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* ===================== TAB 1: PROJECT OVERVIEW ===================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Overview Hero */}
          <div className="p-8 rounded-2xl glass-panel border border-emerald-500/30 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400">EXECUTIVE BRIEF</span>
                <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white mt-1">
                  Project Concept & Core Objectives
                </h2>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-xs font-mono text-emerald-400 self-start">
                Code: {siteConfig.projectCode}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {siteConfig.abstract}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">01. Problem Statement</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Manual garbage sorting in institutional and municipal environments is labour-intensive, hazardous, and frequently results in recyclable materials being lost to landfills.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">02. Proposed Innovation</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ROBOVAULT unites real-time edge computer vision with an active high-torque multi-axis robotic claw gripper and mobile kinematics for autonomous waste pickup and sorting.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">03. Expected Outcome</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Autonomous debris detection, multi-category recyclable sorting (plastics, cans, paper), safe room traversal, and comprehensive capstone defense.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Targets */}
          <div className="p-8 rounded-2xl glass-panel border border-emerald-500/30 space-y-4">
            <h3 className="text-xl font-tech font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>Target Technical Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { label: 'Claw Gripper Aperture', value: '55 mm', desc: 'High-torque metal gear' },
                { label: 'Classification Engine', value: 'Edge Vision', desc: 'Recyclable detection' },
                { label: 'Core Architecture', value: 'ESP32-S3', desc: 'Dual-core 240 MHz MCU' },
                { label: 'Power Autonomy', value: '12.8V LiFePO4', desc: 'Isolated buck regulation' },
              ].map((metric, mIdx) => (
                <div key={mIdx} className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 space-y-1 text-center">
                  <span className="text-xl sm:text-2xl font-tech font-bold text-white">{metric.value}</span>
                  <p className="text-xs font-mono text-emerald-400">{metric.label}</p>
                  <p className="text-[10px] text-slate-400">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: LITERATURE REVIEW ===================== */}
      {activeTab === 'literature' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="p-8 rounded-2xl glass-panel border border-emerald-500/30 space-y-4">
            <div className="border-b border-emerald-500/20 pb-4">
              <span className="text-xs font-mono text-emerald-400">THEORETICAL FOUNDATIONS & TEAM INVESTIGATION</span>
              <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white mt-1">
                Literature Review by Research Team
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Under the academic supervision of <strong className="text-amber-300">Dr. Mohammad Shidujaman</strong> (CCDS Human Computer Interaction Wing), each member of our 5-person research cohort has investigated foundational literature and theoretical frameworks across their designated engineering sub-domains.
            </p>
          </div>

          {/* Dedicated Section for Each of the 5 Team Members */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="text-lg sm:text-xl font-tech font-bold text-white uppercase tracking-wider">
                  Individual Team Member Literature Reviews
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
                5 Literature Reviews
              </span>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: "MD Sadat Bin Munir",
                  id: "2130417",
                  role: "Leader 1",
                  subsystem: "Project Architecture & Computational Logic",
                  avatar: "/members/sadat.png",
                  fallback: sadatMunirImg,
                  accentBorder: "border-red-500/30 hover:border-red-400/60",
                  badgeClass: "bg-red-950/80 text-red-300 border-red-500/40",
                  subsystemColor: "text-red-400",
                  pdfUrl: "/sadat_munir_literature_review.pdf",
                  pdfTitle: "Literature Review — MD Sadat Bin Munir (Leader 1, ID: 2130417)",
                  topic: "Hybrid Spatial-Semantic Modeling & Lightweight Real-Time Object Detection",
                  foundationRef: "Developments in the Built Environment (2026) & Modified YOLOv3-MobileNet V1 (59 FPS, 89.78% mAP).",
                  keyAnalysis: "Investigated hybrid 3D point cloud spatial data fusion with VLM semantic tagging for automated component recycling, and developed lightweight depthwise separable CNN architectures achieving 59 FPS real-time indoor obstacle detection.",
                  synthesis: "Formulated ROBOVAULT's dual-tier perception and architecture stack: real-time lightweight edge obstacle localization combined with spatial-semantic mapping for debris categorization and salvage planning."
                },
                {
                  name: "Fariha Mirza",
                  id: "2231538",
                  role: "Leader 2",
                  subsystem: "Hardware Performance & Standard Theory",
                  avatar: "/members/leader-2.png",
                  fallback: farihaMirzaImg,
                  accentBorder: "border-rose-500/30 hover:border-rose-400/60",
                  badgeClass: "bg-rose-950/80 text-rose-300 border-rose-500/40",
                  subsystemColor: "text-rose-400",
                  pdfUrl: "/fariha_mirza_literature_review.pdf",
                  pdfTitle: "Literature Review — Fariha Mirza (Leader 2, ID: 2231538)",
                  topic: "Open-Vocabulary Object Navigation & Dynamic Scene Graphs (10 Studies)",
                  foundationRef: "HM3D-OVON (2024), MoMa-LLM (2024), VLAI, OpenIN (2025), OneMap, VTMap (2026), Zero-Shot ObjectNav (2026), IEEE Hierarchical Knowledge, SkillTron (2024), Finder IROS (2025).",
                  keyAnalysis: "Investigated 10 foundational works in open-vocabulary ObjectNav, dynamic scene graphs, real-time semantic mapping (OneMap), and vision-language guidance to empower robots searching for arbitrary target objects in unexplored indoor spaces.",
                  synthesis: "Synthesized multi-object semantic search, viewpoint planning, and real-time carrier-relationship scene graphs for RoboVault's autonomous object recognition and navigation modules."
                },
                {
                  name: "Khalidur Rahman Efty",
                  id: "2010256",
                  role: "Member 1",
                  subsystem: "Manipulator Kinematics & Embedded Actuation",
                  avatar: "/members/member-1.png",
                  fallback: khalidurEftyImg,
                  accentBorder: "border-emerald-500/30 hover:border-emerald-400/60",
                  badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
                  subsystemColor: "text-emerald-400",
                  pdfUrl: "/khalidur_rahman_efty_literature_review.pdf",
                  pdfTitle: "Literature Review — Khalidur Rahman Efty (ID: 2010256)",
                  topic: "Automated Waste Collection & Sorting Research (7 Review Studies)",
                  foundationRef: "Goon et al. (2021), Lakhouit (2025), Fotovvatikhah et al. (2025), González et al. (2025), Lahoti et al. (2024), Ahmad et al. (2025), Lv et al. (2023).",
                  keyAnalysis: "Analyzed 7 foundational studies covering Arduino robotic arms, IoT municipal waste monitoring, PRISMA survey on AI classification models, multi-agent blockchain bins, YOLOv5 pick-and-place prototypes, ResNet deep learning, and 150 FPS 3D spatial pose estimation.",
                  synthesis: "Formulated ROBOVAULT's integrated collection and segregation architecture, coupling Arduino/ESP32 servo actuation with real-time detection while prioritizing affordable, modular deployment for resource-constrained contexts."
                },
                {
                  name: "Istiaque Ahmed",
                  id: "2230549",
                  role: "Member 2",
                  subsystem: "Logic Design, Media & Clean UI Systems",
                  avatar: "/members/member-2.png",
                  fallback: istiaqueAhmedImg,
                  accentBorder: "border-emerald-500/30 hover:border-emerald-400/60",
                  badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
                  subsystemColor: "text-emerald-400",
                  topic: "Explainable AI (XAI) State Signaling & Telemetry Interfaces in Service Robotics",
                  foundationRef: "Shidujaman, M., et al. (2023) 'Explainable AI in Autonomous Service Robotics: A Survey of Human-Robot Teaming' (ACM THRI).",
                  keyAnalysis: "Synthesized supervised research under Dr. Mohammad Shidujaman examining how illuminated status cues and low-latency telemetry representations reduce operator cognitive load and heighten trust in autonomous service robots.",
                  synthesis: "Engineered the multi-state visual indication protocol (PATROL, DETECT, ALIGN, GRASP, SORT) and the live telemetry dashboard, enabling transparent auditing of robot decision confidence during sorting runs."
                },
                {
                  name: "Fariha Afroz",
                  id: "2230563",
                  role: "Member 3",
                  subsystem: "Computer Vision & Waste Classification",
                  avatar: "/members/member-3.png",
                  fallback: farihaAfrozImg,
                  accentBorder: "border-emerald-500/30 hover:border-emerald-400/60",
                  badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
                  subsystemColor: "text-emerald-400",
                  topic: "Edge Deep Learning Object Detection for Multi-Category Recyclable Waste",
                  foundationRef: "Redmon, J., & Farhadi, A. (2022) 'Real-Time Edge Object Detection in Unstructured Cluttered Environments' & Benchmark Solid Waste Datasets.",
                  keyAnalysis: "Investigated low-bitrate quantized neural networks (YOLO architectures) optimized for edge microprocessors, evaluating classification robustness against occlusion, crumpled geometry, and ambient campus lighting shifts.",
                  synthesis: "Established the 4-category recyclable taxonomy (Plastics, Metals, Paper, General) and camera calibration routines for the OV5640 5MP optical sensor to guarantee real-time bounding box regression and sorting confidence."
                }
              ].map((member, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-2xl glass-panel border ${member.accentBorder} transition-all space-y-5`}
                >
                  {/* Member Bio & Subsystem Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/15 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-emerald-500/30 shrink-0 bg-black/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <img
                          src={member.avatar}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = member.fallback;
                          }}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${member.badgeClass}`}>
                            {member.role}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            ID: {member.id}
                          </span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-tech font-bold text-white mt-0.5">
                          {member.name}
                        </h4>
                        <p className={`text-xs font-mono ${member.subsystemColor}`}>
                          Subsystem: {member.subsystem}
                        </p>
                      </div>
                    </div>

                    {member.pdfUrl && (() => {
                      const isLeader1 = member.role.includes('Leader 1');
                      const isLeader2 = member.role.includes('Leader 2');
                      const previewBtnClass = isLeader1
                        ? "bg-red-950/80 hover:bg-red-900 border-red-500/40 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                        : isLeader2
                        ? "bg-rose-950/80 hover:bg-rose-900 border-rose-500/40 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                        : "bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
                      const openBtnClass = isLeader1
                        ? "bg-gradient-to-r from-red-700 via-rose-600 to-red-600 hover:from-red-600 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                        : isLeader2
                        ? "bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                        : "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]";
                      const iconColor = isLeader1 ? "text-red-400" : isLeader2 ? "text-rose-400" : "text-emerald-400";

                      return (
                        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                          <button
                            type="button"
                            onClick={() => setSelectedPdf({ url: member.pdfUrl!, title: (member as any).pdfTitle || `${member.name} — Literature Review` })}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border hover:text-white text-xs font-mono font-semibold transition-all hover:scale-105 cursor-pointer ${previewBtnClass}`}
                            title="Preview PDF document inline"
                          >
                            <Eye className={`w-3.5 h-3.5 ${iconColor}`} />
                            <span>Preview PDF</span>
                          </button>
                          <a
                            href={member.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wide transition-all hover:scale-105 cursor-pointer ${openBtnClass}`}
                            title="Open Literature Review PDF in new tab"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Read Literature Review (PDF)</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Research Topic & Key Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                    {/* Literature Topic & Reference */}
                    <div className="p-4 rounded-xl bg-black/50 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                        <BookMarked className="w-3.5 h-3.5" />
                        <span>LITERATURE FOCUS & FOUNDATION</span>
                      </div>
                      <p className="text-white font-tech font-semibold text-sm">
                        {member.topic}
                      </p>
                      <p className="text-slate-400 font-mono italic leading-relaxed">
                        Cited Reference: {member.foundationRef}
                      </p>
                      <p className="text-slate-300 leading-relaxed pt-1">
                        {member.keyAnalysis}
                      </p>
                    </div>

                    {/* Synthesis & ROBOVAULT Integration */}
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>SYNTHESIS FOR ROBOVAULT</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                          {member.synthesis}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-emerald-500/10 flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Applied to ROBOVAULT Architecture</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: PROJECT PAPER ===================== */}
      {activeTab === 'paper' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-8 rounded-2xl glass-panel border border-emerald-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400">CAPSTONE RESEARCH DOSSIER</span>
                <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white mt-1">
                  Project Paper Formulation
                </h2>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-xs font-mono text-emerald-300 self-start">
                STATUS // WEEK 1 APPROVED · DRAFT IN PROGRESS
              </div>
            </div>

            {/* Paper Title & Authors */}
            <div className="text-center max-w-3xl mx-auto space-y-3 py-4 border-b border-emerald-500/10">
              <h3 className="text-xl sm:text-2xl font-tech font-bold text-white leading-snug">
                ROBOVAULT: Vision-Guided Autonomous Mobile Manipulator for Recyclable Waste Identification and Sorting
              </h3>
              <p className="text-xs font-mono text-emerald-300 font-semibold">
                MD Sadat Bin Munir¹, Fariha Mirza¹, Khalidur Rahman Efty¹, Istiaque Ahmed¹, Fariha Afroz¹
              </p>
              <p className="text-xs font-mono text-amber-300">
                Supervised by: {siteConfig.supervisor.name}²
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                ¹ Department of Computer Science & Engineering, Independent University, Bangladesh (IUB)<br />
                ² Co-Director Human Computer Interaction Wing, CCDS & Assistant Professor, SETS, IUB
              </p>
            </div>

            {/* Abstract */}
            <div className="space-y-2 bg-black/40 p-6 rounded-xl border border-emerald-500/20">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
                ABSTRACT
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                Rapid municipal waste generation and inefficient manual sorting impose substantial environmental burdens on urban ecosystems. This capstone paper presents the design and realization of ROBOVAULT, an autonomous robotic manipulator platform engineered to detect, classify, collect, and sort municipal and laboratory recyclables (plastics, metals, paper, and non-recyclables). Integrating an active multi-axis robotic claw gripper with deep-learning vision models, ultrasonic obstacle avoidance, and robust differential mobile kinematics, ROBOVAULT navigates dynamic environments, autonomously identifies discarded debris, and executes precision robotic sorting routines into dedicated receptacles.
              </p>
            </div>

            {/* Key Paper Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-tech font-bold text-white">Section II: Manipulator Kinematics & Claw Grip</span>
                <p className="text-xs text-slate-300">
                  Formulates the kinematic link transforms and torque profiles for the DS3218 20kg.cm metal gear servo claw, optimizing payload retention across irregular waste geometries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-tech font-bold text-white">Section IV: Validation & Sorting Protocol</span>
                <p className="text-xs text-slate-300">
                  Establishes experimental evaluation benchmarks across waste classification accuracy, autonomous pickup cycle completion rate, and faculty defense demonstrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: EQUIPMENTS USED ===================== */}
      {activeTab === 'equipments' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-8 rounded-2xl glass-panel border border-emerald-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400">HARDWARE INVENTORY</span>
                <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white mt-1">
                  Equipments & Components Used
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-500/30 self-start">
                Total Parts: {equipments.length}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete bill of materials (BOM) deployed in our physical robot prototype, complete with operating specifications, test status, and functional integration role.
            </p>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEquipmentCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    equipmentCategory === cat
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-500/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Equipments Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipments.map((eq) => (
              <div
                key={eq.id}
                className="p-6 rounded-2xl glass-panel border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {eq.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        eq.status === 'Integrated'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-teal-950 text-teal-300 border border-teal-500/30'
                      }`}
                    >
                      {eq.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-tech font-bold text-white">
                    {eq.name}
                  </h3>

                  <div className="space-y-1 text-xs">
                    <p className="text-slate-400 font-mono">
                      <span className="text-emerald-400">Specs:</span> {eq.specs}
                    </p>
                    <p className="text-slate-400 font-mono">
                      <span className="text-emerald-400">Qty:</span> {eq.quantity} unit(s)
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-emerald-500/10">
                    {eq.purpose}
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Component Status</span>
                  {eq.datasheetUrl ? (
                    <a
                      href={eq.datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                    >
                      <span>Manufacturer Docs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-emerald-400/90 font-mono flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Hardware</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Document Preview Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[90vh] bg-[#030905] border-2 border-emerald-500/50 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-500/30 bg-emerald-950/60 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-tech font-bold text-white leading-tight">
                    {selectedPdf.title}
                  </h3>
                  <p className="text-[11px] font-mono text-emerald-400">
                    ROBOVAULT Autonomous Robotics Research · IUB CSE402
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  <span>Open in Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPdf(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: IFrame PDF Viewer */}
            <div className="flex-1 w-full bg-[#1a1f1c] overflow-hidden">
              <iframe
                src={selectedPdf.url}
                title={selectedPdf.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
