import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SiteConfig } from '../types';
import { RoboClawLogo } from './RoboClawLogo';

export type PageId = 'home' | 'members' | 'contact' | 'timeline' | 'survey' | 'project' | 'elements' | 'about' | 'roadmap';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, subTab?: string) => void;
  siteConfig: SiteConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  siteConfig,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectDropdown, setProjectDropdown] = useState(false);
  const [elementsDropdown, setElementsDropdown] = useState(false);

  const navItems: { id: PageId; label: string; hasDropdown?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'members', label: 'Members' },
    { id: 'contact', label: 'Contact' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'survey', label: 'Survey' },
    { id: 'project', label: 'Project', hasDropdown: true },
    { id: 'elements', label: 'Elements', hasDropdown: true },
    { id: 'about', label: 'About Us' },
    { id: 'roadmap', label: 'Future Roadmap' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setProjectDropdown(false);
    setElementsDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#030704]/90 border-b border-emerald-500/25 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        {/* Brand / Logo - ROBOVAULT (50% Bigger, Simple & Elegant, Green/Black Theme) */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl p-1.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        >
          {/* Simple, Elegant, 50% Bigger Robotic Claw Vector Logo */}
          <RoboClawLogo size="md" />

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-tech text-2xl sm:text-3xl font-black tracking-[0.2em] text-white group-hover:text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.55)] transition-colors">
                ROBOVAULT
              </span>
              <span className="hidden sm:inline-flex text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                Autonomous
              </span>
            </div>
            <span className="text-xs text-emerald-400/90 font-mono tracking-tight line-clamp-1">
              {siteConfig.shortTagline || 'Smart garbage collection and sorting robot'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => {
                    if (item.id === 'project') setProjectDropdown(true);
                    if (item.id === 'elements') setElementsDropdown(true);
                  }}
                  className={`relative px-3.5 py-2 text-xs xl:text-sm font-medium tracking-wide transition-all duration-300 rounded-lg flex items-center gap-1.5 cursor-pointer
                    ${
                      isActive
                        ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                        : 'text-slate-300 hover:text-white hover:bg-emerald-950/30 hover:border-emerald-500/30 border border-transparent hover:shadow-[0_0_14px_rgba(16,185,129,0.25)]'
                    }`}
                >
                  <span className="font-tech tracking-wide">{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80 group-hover:rotate-180 transition-transform duration-200" />
                  )}

                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-400 rounded-full shadow-[0_0_10px_#00ff88]" />
                  )}
                </button>

                {/* Dropdown for Project */}
                {item.id === 'project' && projectDropdown && (
                  <div
                    onMouseEnter={() => setProjectDropdown(true)}
                    onMouseLeave={() => setProjectDropdown(false)}
                    className="absolute top-full left-0 w-60 py-2 mt-1 rounded-xl bg-[#030a05]/95 border border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50"
                  >
                    {[
                      { sub: 'overview', title: 'Project Overview' },
                      { sub: 'literature', title: 'Literature Review' },
                      { sub: 'paper', title: 'Project Paper Draft' },
                      { sub: 'equipments', title: 'Equipments Used' },
                    ].map((subItem) => (
                      <button
                        key={subItem.sub}
                        onClick={() => {
                          onNavigate('project', subItem.sub);
                          setProjectDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{subItem.title}</span>
                        <span className="text-[10px] text-emerald-500/60 font-mono">»</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Dropdown for Elements */}
                {item.id === 'elements' && elementsDropdown && (
                  <div
                    onMouseEnter={() => setElementsDropdown(true)}
                    onMouseLeave={() => setElementsDropdown(false)}
                    className="absolute top-full left-0 w-64 py-2 mt-1 rounded-xl bg-[#030a05]/95 border border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50"
                  >
                    {[
                      { sub: 'software', title: 'Software Architecture' },
                      { sub: 'hardware', title: 'Hardware Schematics' },
                      { sub: 'video', title: 'Demonstration Video' },
                      { sub: 'system-design', title: 'System Design & Pinouts' },
                      { sub: 'ieee-draft', title: 'IEEE Paper Draft' },
                      { sub: 'contribution', title: 'Member Contribution Matrix' },
                    ].map((subItem) => (
                      <button
                        key={subItem.sub}
                        onClick={() => {
                          onNavigate('elements', subItem.sub);
                          setElementsDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{subItem.title}</span>
                        <span className="text-[10px] text-emerald-500/60 font-mono">»</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-950/60 border border-emerald-500/30 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#030704]/98 border-b border-emerald-500/30 backdrop-blur-2xl space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-tech text-base tracking-wide flex items-center justify-between cursor-pointer ${
                currentPage === item.id
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-slate-300 hover:bg-emerald-950/30 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-emerald-500/80 font-mono text-xs">→</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
