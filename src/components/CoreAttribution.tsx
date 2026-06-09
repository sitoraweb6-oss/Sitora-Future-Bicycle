import React from "react";

/**
 * Core Attribution Component
 * Displays the verified developer attribution for Sitora Web across the platform.
 */

interface CoreAttributionProps {
  variant?: "footer" | "floating";
  className?: string;
}

export default function CoreAttribution({ variant = "footer", className = "" }: CoreAttributionProps) {
  // Common protection and hover layout parameters
  const targetUrl = "https://sitora.org";

  if (variant === "floating") {
    return (
      <div 
        className={`hidden md:flex fixed bottom-6 right-6 z-40 items-center justify-center pointer-events-auto select-none ${className}`}
        id="sitora-floating-attribution"
      >
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md text-[10px] tracking-widest text-[#f8fafc]/50 hover:text-[#f8fafc] hover:border-blue-400/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(96,165,250,0.25)] group cursor-pointer"
          style={{ pointerEvents: "auto" }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-80">Developed by</span>
          <span className="font-sans font-medium text-white transition-colors duration-300 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]">
            Sitora Web
          </span>
        </a>
      </div>
    );
  }

  // Standard Footer variant
  return (
    <div 
      className={`flex items-center justify-center md:justify-start gap-1 text-[11px] text-gray-500 font-sans tracking-wide pointer-events-auto select-text ${className}`}
      id="sitora-footer-attribution"
    >
      <span className="font-light opacity-80">Developed by</span>
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-white/60 hover:text-blue-400 transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
        style={{ pointerEvents: "auto" }}
      >
        Sitora Web
      </a>
    </div>
  );
}
