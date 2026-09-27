import React from 'react';
import { ArrowUp, Mail, MapPin, Phone, Github, Linkedin, Globe } from 'lucide-react';
import { SiteConfig } from '../types';
import { PageId } from './Navbar';
import { RoboClawLogo } from './RoboClawLogo';

interface FooterProps {
  siteConfig: SiteConfig;
  onNavigate: (page: PageId, subTab?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ siteConfig, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-emerald-500/25 bg-[#020503]/95 backdrop-blur-md pt-12 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Project */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <RoboClawLogo size="md" />
              <div>
                <span className="font-tech text-xl font-black text-white tracking-[0.2em] block drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  ROBOVAULT
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block -mt-0.5 tracking-wide">
                  Smart Sorting Robot
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Smart garbage collection and sorting robotic platform with vision-guided claw manipulation.
            </p>

            <div className="text-[11px] font-mono text-emerald-400/90 space-y-0.5">
              <p>Department of Computer Science & Engineering</p>
              <p className="text-slate-400">Independent University, Bangladesh (IUB)</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Site Navigation
            </span>
            <ul className="space-y-2 text-xs font-tech text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  01. Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('members')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  02. Research Supervisor & Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  03. Contact & Direct Email
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('timeline')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  04. Weekly Timeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('survey')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  05. Survey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('project', 'overview')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  05. Project Dossier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('elements', 'software')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  06. System Elements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  07. About Us & IUB
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  08. Future Roadmap
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Project Elements Shortcuts */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              ROBOVAULT Elements
            </span>
            <ul className="space-y-2 text-xs font-tech text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('elements', 'software')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • C++ Firmware & Claw Trajectory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('elements', 'hardware')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • ESP32-S3 & Servo Circuit Pinouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('elements', 'demonstration')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • Demonstration Video Player
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('elements', 'system-design')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • System Architecture & Diagrams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('elements', 'ieee-draft')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • IEEE Conference Paper Draft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('elements', 'contribution')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • Team Contribution Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Direct Contact
            </span>
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-emerald-300 break-all">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-emerald-300">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Bashundhara Residential Area, Dhaka</span>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {siteConfig.contact.github && (
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="w-8 h-8 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {siteConfig.contact.linkedin && (
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-8 h-8 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {siteConfig.contact.portfolio && (
                <a
                  href={siteConfig.contact.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ResearchGate"
                  className="w-8 h-8 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:scale-110 transition-transform font-mono font-bold text-xs"
                >
                  <span>R<sup className="text-[8px]">G</sup></span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-500/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>
            © {new Date().getFullYear()} ROBOVAULT · Autonomous Smart Garbage Collection & Sorting Robot · IUB CCDS HCI Wing.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-900 transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
