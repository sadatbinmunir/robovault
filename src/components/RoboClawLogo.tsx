import React from 'react';

interface RoboClawLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  glow?: boolean;
}

/**
 * ROBOVAULT Brand Logo
 * Clean, simple, minimalist cybernetic claw emblem.
 * Black & Green theme with sleek, bold geometric calipers.
 */
export const RoboClawLogo: React.FC<RoboClawLogoProps> = ({
  className = '',
  size = 'md',
  glow = true,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-32 h-32',
    hero: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_14px_rgba(16,185,129,0.5)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="emeraldSimpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <filter id="neonSimpleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Clean Circular Dark Badge */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="#020804"
          stroke="url(#emeraldSimpleGrad)"
          strokeWidth="2.5"
        />

        {/* Left Caliper Claw - Simple & Sleek */}
        <path
          d="M 47 68 C 36 64 26 50 26 36 C 26 22 36 16 45 16 C 39 23 33 30 33 38 C 33 48 40 58 47 64 Z"
          fill="#0a1f13"
          stroke="url(#emeraldSimpleGrad)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Right Caliper Claw - Simple & Sleek */}
        <path
          d="M 53 68 C 64 64 74 50 74 36 C 74 22 64 16 55 16 C 61 23 67 30 67 38 C 67 48 60 58 53 64 Z"
          fill="#0a1f13"
          stroke="url(#emeraldSimpleGrad)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Claw Base Pivot */}
        <path
          d="M 44 67 L 56 67 L 53 77 L 47 77 Z"
          fill="#031006"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Central Core Glowing Sensor Node */}
        <circle
          cx="50"
          cy="42"
          r="4"
          fill="#00ff88"
          filter={glow ? 'url(#neonSimpleGlow)' : undefined}
        />
        <circle cx="50" cy="42" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
};
