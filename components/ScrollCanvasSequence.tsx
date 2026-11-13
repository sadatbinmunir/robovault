"use client";

import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 150;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames/frame_${padded}.png`;
}

interface ScrollCanvasSequenceProps {
  children?: React.ReactNode | ((props: { progress: number; currentFrame: number }) => React.ReactNode);
}

export default function ScrollCanvasSequence({ children }: ScrollCanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedImagesRef = useRef<{ [key: number]: HTMLImageElement }>({});
  const lastDrawnFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // Pinning state: "pinned" while scrubbing (0% to 100%), "after" when finished to scroll down page
  const [pinState, setPinState] = useState<"pinned" | "after">("pinned");
  const [progress, setProgress] = useState(0);

  // Draw frame on canvas with retina DPR scaling and cover fit
  const drawFrame = (frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Retrieve requested image or find nearest loaded frame
    let img = loadedImagesRef.current[frameNum];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = frameNum - offset;
        const next = frameNum + offset;
        if (prev >= 1 && loadedImagesRef.current[prev]?.complete && loadedImagesRef.current[prev].naturalWidth > 0) {
          img = loadedImagesRef.current[prev];
          break;
        }
        if (next <= TOTAL_FRAMES && loadedImagesRef.current[next]?.complete && loadedImagesRef.current[next].naturalWidth > 0) {
          img = loadedImagesRef.current[next];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const ratio = Math.max(cw / iw, ch / ih);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, iw, ih, cx, cy, nw, nh);
  };

  // Resize handler
  const updateCanvasDimensions = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetW = Math.round(displayWidth * dpr);
    const targetH = Math.round(displayHeight * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    if (lastDrawnFrameRef.current) {
      drawFrame(lastDrawnFrameRef.current);
    }
  };

  // Scroll handler that pins the viewport and maps progress directly to frames
  const handleScroll = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const scrollableDistance = rect.height - windowH;

    if (scrollableDistance <= 0) {
      targetFrameRef.current = 1;
      setProgress(0);
      setPinState("pinned");
      return;
    }

    // When the container bottom reaches the viewport bottom, all 150 frames have finished!
    // After that, the container unpins and the page scrolls down naturally.
    if (rect.bottom <= windowH) {
      setPinState("after");
      targetFrameRef.current = TOTAL_FRAMES;
      setProgress(1);
    } else {
      // While scrolling inside the 400vh track: 100% PINNED!
      setPinState("pinned");
      const scrolled = Math.max(0, -rect.top);
      const currentProg = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      // Map 0% scroll -> frame 1, 100% scroll -> frame 150
      targetFrameRef.current = 1 + currentProg * (TOTAL_FRAMES - 1);
      setProgress(currentProg);
    }
  };

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Initial canvas setup
    updateCanvasDimensions();
    handleScroll();

    window.addEventListener("resize", updateCanvasDimensions);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Step A: Load frame 1 immediately with top priority
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      loadedImagesRef.current[1] = firstImg;
      drawFrame(1);
    };

    // Step B: Rapid parallel preloading of all remaining 149 frames
    // On localhost, all 149 frames load in ~300ms!
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedImagesRef.current[i] = img;
        // If current frame is close, redraw
        if (Math.abs(currentFrameRef.current - i) <= 1) {
          drawFrame(Math.round(currentFrameRef.current));
        }
      };
    }

    // Step C: Persistent animation loop with smooth momentum lerping
    let animationId: number;

    const animateLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (prefersReducedMotionRef.current) {
        currentFrameRef.current = target;
      } else {
        // Apple-level smooth lerp easing
        const diff = target - current;
        if (Math.abs(diff) > 0.005) {
          currentFrameRef.current += diff * 0.1;
        } else {
          currentFrameRef.current = target;
        }
      }

      const frameToDraw = Math.min(
        Math.max(Math.round(currentFrameRef.current), 1),
        TOTAL_FRAMES
      );

      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
        lastDrawnFrameRef.current = frameToDraw;
      }

      animationId = requestAnimationFrame(animateLoop);
    };

    animationId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateCanvasDimensions);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* 
        Indestructible Pinning Viewport:
        - When "pinned": uses position: fixed; inset: 0; to guarantee it CANNOT scroll down while playing.
        - When "after": anchors at bottom: 0 of the 400vh container so scrolling down seamlessly moves down the page.
      */}
      <div
        style={{
          position: pinState === "pinned" ? "fixed" : "absolute",
          top: pinState === "after" ? "auto" : 0,
          bottom: pinState === "after" ? 0 : "auto",
          left: 0,
          width: "100%",
          height: "100vh",
        }}
        className="overflow-hidden z-0"
      >
        {/* Layer 1: Pinned HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Layer 2: Deep Gold / Dark Luxury Ambient Tone & Seamless Edge Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `
              radial-gradient(circle at 65% 35%, rgba(212, 160, 23, 0.08) 0%, rgba(22, 16, 6, 0.45) 50%, rgba(0, 0, 0, 0.94) 100%),
              linear-gradient(to top, #000000 0%, rgba(0,0,0,0.5) 18%, transparent 40%, transparent 65%, rgba(0,0,0,0.6) 85%, #000000 100%),
              linear-gradient(to right, #000000 0%, rgba(0,0,0,0.5) 12%, transparent 28%, transparent 72%, rgba(0,0,0,0.5) 88%, #000000 100%)
            `,
          }}
        />

        {/* Subtle Dark Luxury Warm Tone Overlay */}
        <div className="absolute inset-0 pointer-events-none z-[2] bg-[#120d04]/30 mix-blend-multiply" />

        {/* Layer 3: Pinned Hero UI Content */}
        <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between">
          {typeof children === "function" 
            ? children({ progress, currentFrame: Math.round(currentFrameRef.current) }) 
            : children}
        </div>
      </div>
    </div>
  );
}
