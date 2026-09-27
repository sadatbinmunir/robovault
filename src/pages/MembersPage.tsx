import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  Phone,
  Shield,
  Award,
  Sparkles,
  Crown,
  UserCheck,
  Cpu,
  GraduationCap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { TeamMember } from '../types';
import {
  drShidujamanImg,
  sadatMunirImg,
  farihaMirzaImg,
  khalidurEftyImg,
  istiaqueAhmedImg,
  farihaAfrozImg,
} from '../assets/images';

interface MembersPageProps {
  members: TeamMember[];
}

/* ── Collapsible Literature Review block ── */
const ReviewedPapersSection: React.FC<{
  papers: NonNullable<TeamMember['reviewedPapers']>;
  pdfUrl?: string;
  accentClass?: string;
  borderClass?: string;
}> = ({ papers, pdfUrl, accentClass = 'text-emerald-400', borderClass = 'border-emerald-500/25' }) => {
  const [open, setOpen] = useState(false);
  const isRose = accentClass.includes('rose');
  const isRed = accentClass.includes('red');
  const btnClass = isRose
    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.35)]'
    : isRed
    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.35)]'
    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.35)]';

  return (
    <div className={`w-full mt-4 rounded-xl border ${borderClass} overflow-hidden`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-black/30 hover:bg-black/50 transition-all cursor-pointer"
      >
        <span className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${accentClass}`}>
          <BookOpen className="w-3.5 h-3.5" />
          Literature Reviewed ({papers.length})
        </span>
        {open
          ? <ChevronUp className={`w-4 h-4 ${accentClass}`} />
          : <ChevronDown className={`w-4 h-4 ${accentClass}`} />}
      </button>
      {open && (
        <div className="space-y-2 pb-2">
          {pdfUrl && (
            <div className="p-3 bg-black/40 border-b border-white/5">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${btnClass} text-xs font-mono font-bold tracking-wide transition-all hover:scale-[1.02] cursor-pointer`}
              >
                <FileText className="w-4 h-4" />
                <span>Open Full Literature Review (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
          <ul className="divide-y divide-white/5">
            {papers.map((p, i) => (
              <li key={i} className="px-4 py-3 space-y-0.5">
                <p className="text-xs font-semibold text-white leading-snug">
                  {p.url
                    ? <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${accentClass} hover:underline inline-flex items-center gap-1`}>{p.title}<ExternalLink className="w-2.5 h-2.5 inline shrink-0" /></a>
                    : p.title}
                </p>
                {p.authors && <p className="text-[11px] text-slate-400 font-mono">{p.authors}{p.year ? ` (${p.year})` : ''}</p>}
                {p.source && <p className={`text-[10px] font-mono italic ${accentClass} opacity-70`}>{p.source}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const MembersPage: React.FC<MembersPageProps> = ({ members }) => {
  // Identify the roles from data
  const supervisor = members.find((m) => m.themeColor === 'gold') || members[0];
  const leader1 = members.find((m) => m.themeColor === 'red-primary') || members[1];
  const leader2 = members.find((m) => m.themeColor === 'red-secondary') || members[2];
  const coreMembers = members.filter(
    (m) => m.id !== supervisor?.id && m.id !== leader1?.id && m.id !== leader2?.id
  );

  const getFallbackImage = (id: string) => {
    switch (id) {
      case 'supervisor':
        return drShidujamanImg;
      case 'leader-1':
        return sadatMunirImg;
      case 'leader-2':
        return farihaMirzaImg;
      case 'member-1':
        return khalidurEftyImg;
      case 'member-2':
        return istiaqueAhmedImg;
      case 'member-3':
        return farihaAfrozImg;
      default:
        return drShidujamanImg;
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-xs font-mono text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>ROBOVAULT // RESEARCH & ENGINEERING TEAM</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-tight">
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 neon-glow-text">Leadership & Team</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Faculty research direction and undergraduate engineering team developing ROBOVAULT: Smart Garbage Collection & Sorting Robot.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 1. TEACHER / RESEARCH SUPERVISOR CARD (BLACK & GOLDEN GLOW THEME)         */}
      {/* ========================================================================= */}
      {supervisor && (
        <section className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-amber-400/90 uppercase">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Faculty Research Direction</span>
          </div>

          <div className="glitch-card-hover relative rounded-3xl bg-[#070602]/95 border-2 border-amber-500/40 hover:border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.25)] hover:shadow-[0_0_55px_rgba(245,158,11,0.45)] transition-all duration-500 overflow-hidden">
            {/* Golden cyber gradient header stripe */}
            <div className="h-2 w-full bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />

            <div className="p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              {/* Avatar with golden glowing cyber aura */}
              <div className="relative shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-800 shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all">
                  <img
                    src={supervisor.avatarUrl || drShidujamanImg}
                    alt={supervisor.name}
                    className="w-full h-full object-cover rounded-xl filter contrast-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = drShidujamanImg;
                    }}
                  />
                </div>
                {/* Tech node indicator */}
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#0a0802] border-2 border-amber-400 text-[10px] font-mono font-bold text-amber-300 flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>FACULTY</span>
                </span>
              </div>

              {/* Information */}
              <div className="space-y-4 flex-1">
                {/* Supervisor Label Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/60 text-xs font-mono font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{supervisor.label || 'Research supervisor'}</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-tech font-extrabold text-white tracking-wide">
                    {supervisor.name}
                  </h2>
                  <p className="text-sm font-tech font-semibold text-amber-300">
                    Co-Director Human Computer Interaction Wing, CCDS
                  </p>
                  <p className="text-xs text-amber-200/80 font-mono">
                    Assistant Professor, SETS · Department of Computer Science & Engineering
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    Independent University, Bangladesh (IUB)
                  </p>
                </div>

                {/* Research Area Highlight */}
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/25 space-y-1 text-left">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    <span>Research Area:</span>
                  </div>
                  <p className="text-xs text-amber-100 font-mono">
                    {supervisor.researchArea || 'Explainable AI and Robotics, HCI, HRI'}
                  </p>
                </div>

                {/* Direct Email & Academic Contact */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  {supervisor.links.email && (
                    <a
                      href={`mailto:${supervisor.links.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-tech font-bold tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{supervisor.links.email}</span>
                    </a>
                  )}
                  {supervisor.links.portfolio && (
                    <a
                      href={supervisor.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-300 text-xs font-mono transition-all"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>CCDS HCI Wing</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {supervisor.reviewedPapers && supervisor.reviewedPapers.length > 0 && (
              <div className="px-6 sm:px-10 pb-6">
                <ReviewedPapersSection
                  papers={supervisor.reviewedPapers}
                  pdfUrl={supervisor.pdfUrl}
                  accentClass="text-amber-400"
                  borderClass="border-amber-500/25"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. LEADER 1 CARD (SADAT BIN MUNIR - RED & BLACK GLOWY THEME)             */}
      {/* ========================================================================= */}
      {leader1 && (
        <section className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-red-400 uppercase">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span>Project Leadership · Primary</span>
          </div>

          <div className="glitch-card-hover relative rounded-3xl bg-[#090303]/95 border-2 border-red-500/50 hover:border-red-400 shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.55)] transition-all duration-500 overflow-hidden">
            {/* Vivid red cyber gradient header stripe */}
            <div className="h-2 w-full bg-gradient-to-r from-red-700 via-rose-500 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.7)]" />

            <div className="p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              {/* Avatar with vivid red glowing cyber ring */}
              <div className="relative shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-red-600 via-rose-400 to-red-950 shadow-[0_0_35px_rgba(239,68,68,0.6)] transition-all">
                  <img
                    src={leader1.avatarUrl || sadatMunirImg}
                    alt={leader1.name}
                    className="w-full h-full object-cover rounded-xl filter contrast-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = sadatMunirImg;
                    }}
                  />
                </div>
                {/* Tech node indicator */}
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#0a0202] border-2 border-red-500 text-[10px] font-mono font-bold text-red-300 flex items-center gap-1 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>ACTIVE LEAD</span>
                </span>
              </div>

              {/* Information */}
              <div className="space-y-4 flex-1">
                {/* Leader 1 Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/90 border border-red-500/80 text-xs font-mono font-bold text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  <UserCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>Leader 1</span>
                  <span className="text-red-500/80">|</span>
                  <span className="text-white">ID: {leader1.studentId}</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-tech font-extrabold text-white tracking-wide">
                    {leader1.name}
                  </h2>
                  <p className="text-sm font-tech text-red-400 font-semibold tracking-wide">
                    {leader1.role}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {leader1.department} · {leader1.university}
                  </p>
                </div>

                {/* Quote / Bio in Red Cyber Box */}
                <div className="p-4 rounded-xl bg-red-950/25 border border-red-500/25 text-left">
                  <p className="text-xs sm:text-sm text-red-100/90 italic leading-relaxed">
                    "{leader1.bio}"
                  </p>
                </div>

                {/* Follow On & Social Media Links */}
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <span className="px-3 py-1 rounded bg-red-600 text-white text-xs font-tech font-bold tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                      FOLLOW ON
                    </span>

                    {leader1.links.email && (
                      <a
                        href={`mailto:${leader1.links.email}`}
                        title={`Email: ${leader1.links.email}`}
                        className="px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/40 hover:border-red-400 text-red-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all hover:scale-105"
                      >
                        <Mail className="w-3.5 h-3.5 text-red-400" />
                        <span>{leader1.links.email}</span>
                      </a>
                    )}

                    {leader1.links.github && (
                      <a
                        href={leader1.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Profile"
                        className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-500/40 hover:border-red-400 text-slate-200 hover:text-red-400 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {leader1.links.linkedin && (
                      <a
                        href={leader1.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-500/40 hover:border-red-400 text-slate-200 hover:text-red-400 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}

                    {leader1.links.researchgate && (
                      <a
                        href={leader1.links.researchgate}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="ResearchGate Profile"
                        className="h-9 px-2.5 rounded-lg bg-red-950/80 border border-red-500/40 hover:border-red-400 text-red-300 font-mono font-bold text-xs flex items-center justify-center gap-1 transition-all hover:scale-105 shadow-sm"
                      >
                        <span>R<sup className="text-[9px]">G</sup></span>
                        <ExternalLink className="w-3 h-3 text-red-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {leader1.pdfUrl && (
              <div className="px-6 sm:px-10 pt-2 pb-2">
                <a
                  href={leader1.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-rose-600 to-red-600 hover:from-red-600 hover:to-rose-500 text-white text-xs font-mono font-bold tracking-wide shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Read Literature Review (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
            {leader1.reviewedPapers && leader1.reviewedPapers.length > 0 && (
              <div className="px-6 sm:px-10 pb-6">
                <ReviewedPapersSection
                  papers={leader1.reviewedPapers}
                  pdfUrl={leader1.pdfUrl}
                  accentClass="text-red-400"
                  borderClass="border-red-500/25"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. LEADER 2 CARD (FARIHA MIRZA - SLIGHTLY DIFFERENT RED, LESS GLOWY)      */}
      {/* ========================================================================= */}
      {leader2 && (
        <section className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-rose-400/90 uppercase">
            <Shield className="w-3.5 h-3.5 text-rose-500" />
            <span>Project Leadership · Secondary</span>
          </div>

          <div className="glitch-card-hover relative rounded-3xl bg-[#090405]/95 border-2 border-rose-700/40 hover:border-rose-500/70 shadow-[0_0_20px_rgba(225,29,72,0.18)] hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-all duration-500 overflow-hidden">
            {/* Sophisticated Wine/Crimson Red header stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-900 via-rose-600/70 to-zinc-900" />

            <div className="p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              {/* Avatar with subtle rose-wine ring */}
              <div className="relative shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-rose-800 via-rose-600/80 to-zinc-900 shadow-[0_0_20px_rgba(225,29,72,0.25)] transition-all">
                  <img
                    src={leader2.avatarUrl || farihaMirzaImg}
                    alt={leader2.name}
                    className="w-full h-full object-cover rounded-xl filter contrast-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = farihaMirzaImg;
                    }}
                  />
                </div>
                {/* Tech node indicator */}
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#0d0305] border border-rose-600/60 text-[10px] font-mono text-rose-300 flex items-center gap-1 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>LEAD 2</span>
                </span>
              </div>

              {/* Information */}
              <div className="space-y-4 flex-1">
                {/* Leader 2 Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-600/40 text-xs font-mono font-bold text-rose-300">
                  <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>Leader 2</span>
                  <span className="text-rose-600/70">|</span>
                  <span className="text-white">ID: {leader2.studentId}</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-tech font-extrabold text-white tracking-wide">
                    {leader2.name}
                  </h2>
                  <p className="text-sm font-tech text-rose-300/90 font-medium tracking-wide">
                    {leader2.role}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {leader2.department} · {leader2.university}
                  </p>
                </div>

                {/* Quote / Bio in Rose Cyber Box */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-700/20 text-left">
                  <p className="text-xs sm:text-sm text-rose-100/85 italic leading-relaxed">
                    "{leader2.bio}"
                  </p>
                </div>

                {/* Follow On & Social Media Links */}
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <span className="px-3 py-1 rounded bg-rose-700 hover:bg-rose-600 text-white text-xs font-tech font-bold tracking-wider transition-all">
                      FOLLOW ON
                    </span>

                    {leader2.links.email && (
                      <a
                        href={`mailto:${leader2.links.email}`}
                        title={`Email: ${leader2.links.email}`}
                        className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-600/30 hover:border-rose-400 text-rose-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all hover:scale-105"
                      >
                        <Mail className="w-3.5 h-3.5 text-rose-400" />
                        <span>{leader2.links.email}</span>
                      </a>
                    )}

                    {leader2.links.github && (
                      <a
                        href={leader2.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Profile"
                        className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-600/30 hover:border-rose-400 text-slate-300 hover:text-rose-300 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {leader2.links.linkedin && (
                      <a
                        href={leader2.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-600/30 hover:border-rose-400 text-slate-300 hover:text-rose-300 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {leader2.pdfUrl && (
              <div className="px-6 sm:px-10 pt-2 pb-2">
                <a
                  href={leader2.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-500 text-white text-xs font-mono font-bold tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.35)] transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Read Literature Review (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
            {leader2.reviewedPapers && leader2.reviewedPapers.length > 0 && (
              <div className="px-6 sm:px-10 pb-6">
                <ReviewedPapersSection
                  papers={leader2.reviewedPapers}
                  pdfUrl={leader2.pdfUrl}
                  accentClass="text-rose-400"
                  borderClass="border-rose-600/25"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. CORE MEMBERS 1, 2, 3 (SIDE-BY-SIDE IN 3-COLUMN GREEN THEME)           */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>Core Engineering & Perception Members · Side-by-Side</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreMembers.map((member) => (
            <div
              key={member.id}
              className="glitch-card-hover group relative rounded-2xl glass-panel border border-emerald-500/25 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top decorative cyber border header */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-950 via-emerald-500/60 to-emerald-950 group-hover:from-emerald-500 group-hover:to-teal-400 transition-all duration-500" />

              <div className="p-6 space-y-5 flex-1 flex flex-col items-center text-center">
                {/* Member Label Badge (Member 1, Member 2, Member 3) */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <span>{member.label || 'Member'}</span>
                </div>

                {/* Avatar with green cyber scanner ring */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all">
                    <img
                      src={member.avatarUrl || getFallbackImage(member.id)}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full filter contrast-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = getFallbackImage(member.id);
                      }}
                    />
                  </div>
                  {/* Tech node dot */}
                  <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-[#030704] border-2 border-emerald-400 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </span>
                </div>

                {/* Name, ID, Major */}
                <div className="space-y-1.5 w-full">
                  <h3 className="text-xl font-tech font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {member.name}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                      <span>ID:</span>
                      <span className="font-bold text-white">{member.studentId}</span>
                    </div>

                    {member.major && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                        <span>Major:</span>
                        <span className="font-bold text-white">{member.major}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs font-tech text-emerald-300/90 font-medium tracking-wide pt-1">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {member.department}
                  </p>
                </div>

                {/* Bio / Quote */}
                <div className="w-full flex-1">
                  <p className="text-xs text-slate-300 leading-relaxed text-justify line-clamp-4 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/10">
                    "{member.bio}"
                  </p>
                </div>

                {/* Direct Phone / Contact Badge if available */}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-white text-xs font-mono transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{member.phone}</span>
                  </a>
                )}

                {/* Skills Tags */}
                <div className="flex flex-wrap justify-center gap-1.5 w-full">
                  {member.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/20 text-[10px] font-mono text-emerald-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* "Follow On" Section */}
                <div className="w-full pt-4 border-t border-emerald-500/20 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-tech font-bold tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                    <span>FOLLOW ON</span>
                  </div>

                  {/* Social & Academic Icons */}
                  <div className="flex items-center justify-center gap-2.5 pt-1">
                    {/* GitHub */}
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Profile"
                        className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {/* LinkedIn */}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}

                    {/* ResearchGate */}
                    {member.links.researchgate && (
                      <a
                        href={member.links.researchgate}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="ResearchGate Profile"
                        className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center transition-all hover:scale-110"
                      >
                        <span>R<sup className="text-[9px]">G</sup></span>
                      </a>
                    )}

                    {/* Email */}
                    {member.links.email && (
                      <a
                        href={`mailto:${member.links.email}`}
                        title={`Email: ${member.links.email}`}
                        className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Literature Reviewed */}
                {member.reviewedPapers && member.reviewedPapers.length > 0 && (
                  <div className="w-full">
                    <ReviewedPapersSection
                      papers={member.reviewedPapers}
                      pdfUrl={member.pdfUrl}
                      accentClass="text-emerald-400"
                      borderClass="border-emerald-500/25"
                    />
                    {member.pdfUrl && (
                      <a
                        href={member.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-2.5 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black text-xs font-mono font-bold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Open Literature Review (PDF)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
