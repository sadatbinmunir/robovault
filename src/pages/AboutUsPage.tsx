import React from 'react';
import { Target, BookOpen, User, Building, GraduationCap, Mail, Shield, CheckCircle2 } from 'lucide-react';

interface AboutUsPageProps {
  siteConfig?: any;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = () => {
  const objectives = [
    {
      title: "Autonomous Litter Detection & Classification",
      desc: "Implement deep-learning computer vision models at the edge to identify municipal and laboratory recyclables (plastics, metals, paper, and non-recyclables) in dynamic indoor/outdoor environments."
    },
    {
      title: "Active Multi-Axis Claw Gripper Manipulation",
      desc: "Design and calibrate a durable robotic claw mechanism utilizing high-torque metal gear servos to achieve reliable grasping force and precision pick-and-place capabilities."
    },
    {
      title: "Intelligent Kinematics & Obstacle Avoidance",
      desc: "Integrate differential drive mobile kinematics with ultrasonic acoustic sensor arrays for real-time collision prevention and smooth corridor navigation."
    },
    {
      title: "Automated Sorting & Segregation Workflow",
      desc: "Execute deterministic sorting routines that transport collected litter directly into designated onboard recycling compartments without human intervention."
    }
  ];

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>PROJECT DOSSIER // OVERVIEW</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-tight">
          About This <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 neon-glow-text">Project</span>
        </h1>
      </div>

      {/* Main Project Information Card (Cyber dark glass panel matching site theme) */}
      <div className="p-6 sm:p-10 rounded-2xl glass-panel border border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.15)] space-y-8">
        {/* Description line */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          An autonomous, deep-learning vision guided robotic platform combining active multi-axis claw grasping, real-time recyclable object classification, and automated litter sorting for clean laboratory and municipal environments.
        </p>

        {/* 2-column info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-emerald-500/20">
          {/* COURSE NAME */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>COURSE NAME</span>
            </div>
            <p className="text-base font-tech font-bold text-white">
              Introduction to Robotics
            </p>
          </div>

          {/* COURSE CODE */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>COURSE CODE</span>
            </div>
            <p className="text-base font-tech font-bold text-white">
              CSE426
            </p>
          </div>

          {/* INSTRUCTOR */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
              <User className="w-3.5 h-3.5" />
              <span>INSTRUCTOR</span>
            </div>
            <p className="text-base font-tech font-bold text-white">
              DR Mohammad Shidujaman
            </p>
          </div>

          {/* DEPARTMENT */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>DEPARTMENT</span>
            </div>
            <p className="text-base font-tech font-bold text-white">
              Computer Science and Engineering
            </p>
          </div>

          {/* UNIVERSITY */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>UNIVERSITY</span>
            </div>
            <p className="text-base font-tech font-bold text-white">
              Independent University, Bangladesh
            </p>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>CONTACT INFORMATION</span>
            </div>
            <p className="text-base font-tech font-bold text-emerald-300">
              <a
                href="mailto:sadatbinmunir@gmail.com"
                className="hover:text-emerald-400 hover:underline transition-colors"
              >
                sadatbinmunir@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Project Objectives Section */}
        <div className="pt-6 border-t border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-tech font-bold text-white">
              Project Objectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/50 border border-emerald-500/25 hover:border-emerald-400/50 transition-all space-y-2 group"
              >
                <div className="flex items-start gap-2.5">
                  <span className="p-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs mt-0.5 shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="text-sm font-tech font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {obj.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light pl-7">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
