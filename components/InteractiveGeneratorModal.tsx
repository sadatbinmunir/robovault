"use client";

import React, { useState } from "react";
import { X, Sparkles, Wand2, Sliders, Check, Download, Layers, ArrowRight } from "lucide-react";
import Image from "next/image";

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToHero?: (imageUrl: string, modelName: string) => void;
}

const SAMPLE_PROMPTS = [
  "Cyberpunk female protagonist with sleek dark hair, glowing orange seams on jacket, violet rim lights, 8k hdr octane",
  "Surreal iridescent chrome monolith in a misty lavender desert, cinematic volumetric light, 8k realism",
  "Hyper-detailed android face with delicate rose-gold circuits, porcelain finish, macro studio portrait",
  "Neo-noir Tokyo street with holographic advertisements reflecting in neon puddles, rain atmosphere",
];

const MODELS = [
  { id: "flux", name: "FLUX.1 Ultra", badge: "8K HDR", time: "0.4s" },
  { id: "mj", name: "Midjourney v6.1", badge: "Editorial", time: "0.6s" },
  { id: "df", name: "DreamFrame Neural v3", badge: "Ultra Real", time: "0.3s" },
  { id: "sdxl", name: "SDXL Turbo RAW", badge: "Fast", time: "0.2s" },
];

export default function InteractiveGeneratorModal({ isOpen, onClose, onApplyToHero }: GeneratorModalProps) {
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0]);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [aspectRatio, setAspectRatio] = useState("3:4");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedResult(null);

    setTimeout(() => {
      setIsGenerating(false);
      // Pick a result based on model or random
      const images = [
        "/hero-portrait-hd.jpg",
        "/model-surreal.jpg",
        "/model-android.jpg",
        "/model-cybercity.jpg",
      ];
      const randomImg = images[Math.floor(Math.random() * images.length)];
      setGeneratedResult(randomImg);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0f0d1b] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(139,92,246,0.3)] overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF5E0E] to-[#8B5CF6] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0d0b17] rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FFA057]" />
              </div>
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold tracking-tight">DreamFrame Studio</h3>
              <p className="text-zinc-400 text-[11px]">Generate high-fidelity AI artwork in real-time</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300 flex items-center justify-between">
              <span>Prompt Description</span>
              <span className="text-[11px] text-zinc-500">Natural language AI synthesis</span>
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="Describe your vision with style, lighting, and details..."
                className="w-full rounded-2xl bg-black/50 border border-white/10 p-3.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FF5E0E]/60 focus:ring-1 focus:ring-[#FF5E0E]/40 transition-all resize-none"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-zinc-500 py-0.5">Quick Prompts:</span>
              {SAMPLE_PROMPTS.slice(0, 3).map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(p)}
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-zinc-400 hover:text-zinc-200 border border-white/5 truncate max-w-[200px] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300">Model Engine</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedModel === m.id
                      ? "bg-[#FF5E0E]/10 border-[#FF5E0E]/50 text-white shadow-[0_0_15px_rgba(255,94,14,0.15)]"
                      : "bg-white/[0.03] border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="text-xs font-semibold truncate">{m.name}</div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-500">
                    <span>{m.badge}</span>
                    <span>{m.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-zinc-300">Aspect Ratio</span>
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
              {["3:4 Portrait", "1:1 Square", "16:9 Landscape"].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    aspectRatio === ratio
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Result Preview (if generated) */}
          {generatedResult && (
            <div className="p-3 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-4 animate-in fade-in zoom-in-95">
              <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                <Image src={generatedResult} alt="Generated result" fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Render Complete (8K HDR)
                </div>
                <div className="text-[11px] text-zinc-400 truncate mt-0.5">{prompt}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      onApplyToHero?.(generatedResult, MODELS.find((m) => m.id === selectedModel)?.name || "FLUX.1 Ultra");
                      onClose();
                    }}
                    className="text-[11px] px-3 py-1 rounded-lg bg-[#FF5E0E] text-white font-medium hover:bg-[#FF4500] transition-colors flex items-center gap-1"
                  >
                    Set as Hero <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Button */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-between">
          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Ready • Cloud GPU Active</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF5E0E] to-[#FF3E00] text-white font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,94,14,0.45)] hover:shadow-[0_0_35px_rgba(255,94,14,0.6)] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Artwork</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
