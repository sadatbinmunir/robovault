"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface NavbarProps {
  onOpenGenerator?: () => void;
  onToggleZenMode?: () => void;
  zenMode?: boolean;
}

export const allSelectablePages = [
  { label: "Home", href: "/" },
  { label: "Overview", href: "/overview" },
  { label: "Team & Faculty", href: "/team" },
  { label: "Literature", href: "/literature" },
  { label: "Timeline", href: "/timeline" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Architecture & Schematics", href: "/architecture" },
  { label: "Survey", href: "/survey" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onToggleZenMode, zenMode = false }: NavbarProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleWindowScroll();
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // Check scroll position to show/hide left and right chevrons
  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      
      // Horizontal mouse-wheel scrolling support
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 0.9;
        }
      };
      el.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        el.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const amount = direction === "left" ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 flex items-center justify-between gap-3 pointer-events-none transition-all duration-300 ${
      isScrolled 
        ? "py-3 bg-[#05060A]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.8)]" 
        : "pt-4 pb-2 bg-transparent"
    }`}>
      
      {/* Top Left: Focusbot.Ai Brand Logo Link */}
      <div className="pointer-events-auto shrink-0">
        <Link
          href="/"
          aria-label="Focusbot.Ai Home"
          className="inline-flex items-center text-lg sm:text-xl font-bold tracking-tight text-white hover:text-purple-200 transition-all duration-200 select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] group active:scale-95"
        >
          <span className="text-white group-hover:text-zinc-100 transition-colors">
            Focusbot
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200 group-hover:from-purple-300 group-hover:to-white transition-all">
            .Ai
          </span>
        </Link>
      </div>

      {/* Center/Right: Clean Borderless Side-Scrollable Page Selectors */}
      <div className="pointer-events-auto flex-1 max-w-[980px] ml-auto mr-0 sm:mr-2 relative flex items-center min-w-0 justify-end">
        
        {/* Horizontal Scrollable Container (Completely borderless, no container box) */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scroll-smooth flex items-center gap-4 sm:gap-6 py-1 bg-transparent [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent_0%,black_16px,black_calc(100%-16px),transparent_100%)] px-2"
        >
          {allSelectablePages.map((page) => {
            const isActive = pathname === page.href || (page.href !== "/" && pathname?.startsWith(page.href)) || (page.href === "/architecture" && pathname === "/schematics");
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-200 shrink-0 relative py-1 ${
                  isActive
                    ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400 after:rounded-full after:shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {page.label}
              </Link>
            );
          })}
        </div>

      </div>

    </header>
  );
}
