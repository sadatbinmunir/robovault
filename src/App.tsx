import React, { useState } from 'react';
import { CircuitCanvas } from './components/CircuitCanvas';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import { ContactPage } from './pages/ContactPage';
import { TimelinePage } from './pages/TimelinePage';
import { ProjectPage, ProjectSubTab } from './pages/ProjectPage';
import { ElementsPage, ElementSubTab } from './pages/ElementsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FutureRoadmapPage } from './pages/FutureRoadmapPage';
import { SurveyPage } from './pages/SurveyPage';

import {
  initialSiteConfig,
  initialTeamMembers,
  initialTimelineWeeks,
  initialEquipments,
  initialLiterature,
  initialContributions,
} from './data/siteConfig';

import { SiteConfig, TeamMember, TimelineWeek } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [projectSubTab, setProjectSubTab] = useState<ProjectSubTab>('overview');
  const [elementsSubTab, setElementsSubTab] = useState<ElementSubTab>('software');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Clean data state driven by siteConfig.ts
  const [siteConfig] = useState<SiteConfig>(initialSiteConfig);
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [timelineWeeks, setTimelineWeeks] = useState<TimelineWeek[]>(initialTimelineWeeks);

  // Track viewport scroll progress
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeightPx > 0) {
        const scrolled = (scrollPx / winHeightPx) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentPage]);

  const handleNavigate = (page: PageId, subTab?: string) => {
    setCurrentPage(page);
    if (page === 'project' && subTab) {
      setProjectSubTab(subTab as ProjectSubTab);
    }
    if (page === 'elements' && subTab) {
      setElementsSubTab(subTab as ElementSubTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddWeek = (newWeek: TimelineWeek) => {
    setTimelineWeeks(prev => [...prev, newWeek]);
  };

  const handleUpdateWeek = (updatedWeek: TimelineWeek) => {
    setTimelineWeeks(prev =>
      prev.map(w => (w.id === updatedWeek.id ? updatedWeek : w))
    );
  };

  return (
    <div className="relative min-h-screen bg-[#020503] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Viewport Neon-Green Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/60 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-400 shadow-[0_0_14px_#00ff88,0_0_24px_rgba(16,185,129,0.9)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* High-density Interactive Circuit Canvas Background */}
      <CircuitCanvas />

      {/* Futuristic Ambient Green Radial Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        siteConfig={siteConfig}
      />

      {/* Main Content Router */}
      <main className="flex-1 relative z-10">
        {currentPage === 'home' && (
          <HomePage
            siteConfig={siteConfig}
            timelineWeeks={timelineWeeks}
            teamMembers={teamMembers}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'members' && (
          <MembersPage members={teamMembers} />
        )}

        {currentPage === 'contact' && (
          <ContactPage contactInfo={siteConfig.contact} />
        )}

        {currentPage === 'timeline' && (
          <TimelinePage
            weeks={timelineWeeks}
            onAddWeek={handleAddWeek}
            onUpdateWeek={handleUpdateWeek}
          />
        )}

        {currentPage === 'survey' && (
          <SurveyPage />
        )}

        {currentPage === 'project' && (
          <ProjectPage
            siteConfig={siteConfig}
            equipments={initialEquipments}
            literature={initialLiterature}
            initialTab={projectSubTab}
          />
        )}

        {currentPage === 'elements' && (
          <ElementsPage
            siteConfig={siteConfig}
            teamMembers={teamMembers}
            contributions={initialContributions}
            initialTab={elementsSubTab}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage siteConfig={siteConfig} />
        )}

        {currentPage === 'roadmap' && (
          <FutureRoadmapPage />
        )}
      </main>

      {/* Footer */}
      <Footer siteConfig={siteConfig} onNavigate={handleNavigate} />
    </div>
  );
}
