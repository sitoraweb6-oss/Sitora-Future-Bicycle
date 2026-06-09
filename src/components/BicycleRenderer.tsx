import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BikeModel, WheelStyle } from "../types";
import { Info, HelpCircle, Activity, ShieldAlert } from "lucide-react";

interface BicycleRendererProps {
  activeModel: BikeModel;
}

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function BicycleRenderer({ activeModel }: BicycleRendererProps) {
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);

  // Specifications hotspots overlaying exact geometric coordinates on the SVG frame
  const hotspots: Hotspot[] = [
    {
      id: "cockpit",
      x: 580,
      y: 110,
      title: "Bio-Neural OLED Cockpit",
      description: "Direct HUD projecting speed telemetry, wind drag co-efficiency, and neural drive interface.",
      icon: Info,
    },
    {
      id: "frame",
      x: 390,
      y: 195,
      title: "IM8 Carbon Monocoque",
      description: "Ultra-high modulus aerospace carbon resin layout. Weighs just 920 grams with integrated internal cable ducts.",
      icon: Activity,
    },
    {
      id: "power",
      x: 340,
      y: 290,
      title: "Graphene Solid-State core",
      description: "950 Wh solid-electrolyte pack providing up to 140km range under smart regenerative power flow.",
      icon: ShieldAlert,
    },
    {
      id: "motor",
      x: 180,
      y: 350,
      title: "Magneto Electro-Hub",
      description: "Direct-drive brushless rear-hub motor offering immediate torque vectoring of up to 110 Nm.",
      icon: HelpCircle,
    },
  ];

  const getGlowShadow = (col: string) => {
    return {
      filter: `drop-shadow(0 0 12px ${col})`,
    };
  };

  return (
    <div id="vector-showcase" className="relative w-full max-w-4xl mx-auto flex items-center justify-center p-4">
      {/* Dynamic Background Glow representing deep studio soft lighting */}
      <div 
        className="absolute w-72 h-72 rounded-full blur-[100px] opacity-45 transition-all duration-1000 -z-10"
        style={{
          backgroundColor: activeModel.glowColor,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main Detailed SVG Display */}
      <svg 
        viewBox="0 0 800 450" 
        className="w-full h-auto select-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={activeModel.accentColor} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <filter id="glow-panel">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 1. Ground shadow with pulse */}
        <ellipse 
          cx="400" 
          cy="400" 
          rx="250" 
          ry="15" 
          fill="url(#frameGrad)" 
          opacity="0.6" 
        />
        <motion.ellipse 
          cx="400" 
          cy="400" 
          rx="180" 
          ry="10" 
          fill={activeModel.accentColor}
          opacity="0.18"
          animate={{
            rx: [160, 200, 160],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 2. REAR WHEEL (LEFT) */}
        <g transform="translate(180, 290)">
          {/* Wheel spin motion wrapper */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Outer Rim Tire (Static across styles for realism) */}
            <circle cx="0" cy="0" r="105" fill="none" stroke="#111827" strokeWidth="8" />
            <circle cx="0" cy="0" r="101" fill="none" stroke="#374151" strokeWidth="1" />
            {/* Active outer glow strip */}
            <circle 
              cx="0" 
              cy="0" 
              r="98" 
              fill="none" 
              stroke={activeModel.accentColor} 
              strokeWidth="2.5" 
              style={getGlowShadow(activeModel.accentColor)}
              opacity="0.85"
            />

            {/* Inner Wheel Geometry based on custom Variant */}
            {activeModel.wheelStyle === WheelStyle.DISC && (
              <g>
                {/* Solid aero carbon disk */}
                <circle cx="0" cy="0" r="95" fill="rgba(15, 23, 42, 0.93)" stroke="#1f2937" strokeWidth="1" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                {/* Tech HUD markings */}
                <path d="M -80 0 L 80 0 M 0 -80 L 0 80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,15" />
                <circle cx="0" cy="0" r="80" fill="none" stroke={activeModel.accentColor} strokeWidth="1" strokeDasharray="3,30" opacity="0.6"/>
                <text x="35" y="-50" fill="#9ca3af" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="1">IM8 MONOCOQUE</text>
                <text x="-45" y="55" fill="#4b5563" fontSize="5" fontFamily="var(--font-display)">AERO RACING</text>
              </g>
            )}

            {activeModel.wheelStyle === WheelStyle.HOLLOW && (
              <g>
                {/* Fully hollow magnetic hubless circle design */}
                <circle cx="0" cy="0" r="95" fill="none" stroke="#111827" strokeWidth="12" />
                <circle cx="0" cy="0" r="83" fill="none" stroke={activeModel.accentColor} strokeWidth="4" opacity="0.7"/>
                {/* Interactive lights in center recess */}
                <circle cx="0" cy="-89" r="3" fill="#ffffff" style={getGlowShadow("#ffffff")} />
                <circle cx="77" cy="45" r="3" fill="#ffffff" style={getGlowShadow("#ffffff")} />
                <circle cx="-77" cy="45" r="3" fill="#ffffff" style={getGlowShadow("#ffffff")} />
                {/* Sweeping sensor lines */}
                <line x1="-80" y1="0" x2="-40" y2="0" stroke={activeModel.accentColor} strokeWidth="1.5" />
                <line x1="40" y1="0" x2="80" y2="0" stroke={activeModel.accentColor} strokeWidth="1.5" />
              </g>
            )}

            {activeModel.wheelStyle === WheelStyle.TRI_SPOKE && (
              <g>
                {/* Aerodynamic 3-spoke carbon blades */}
                <circle cx="0" cy="0" r="95" fill="rgba(255, 255, 255, 0.01)" />
                {/* Blade 1 */}
                <path d="M 0 -12 Q -15 -60 -25 -90 L 25 -90 Q 15 -60 0 -12 Z" fill="#111827" stroke="#374151" strokeWidth="1" />
                <path d="M -15 -60 L 15 -60" stroke={activeModel.accentColor} strokeWidth="2" opacity="0.8"/>
                {/* Blade 2 */}
                <g transform="rotate(120)">
                  <path d="M 0 -12 Q -15 -60 -25 -90 L 25 -90 Q 15 -60 0 -12 Z" fill="#111827" stroke="#374151" strokeWidth="1" />
                  <path d="M -15 -60 L 15 -60" stroke={activeModel.accentColor} strokeWidth="2" opacity="0.8"/>
                </g>
                {/* Blade 3 */}
                <g transform="rotate(240)">
                  <path d="M 0 -12 Q -15 -60 -25 -90 L 25 -90 Q 15 -60 0 -12 Z" fill="#111827" stroke="#374151" strokeWidth="1" />
                  <path d="M -15 -60 L 15 -60" stroke={activeModel.accentColor} strokeWidth="2" opacity="0.8"/>
                </g>
                <circle cx="0" cy="0" r="28" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                <circle cx="0" cy="0" r="10" fill={activeModel.accentColor} opacity="0.9" />
              </g>
            )}

            {/* Central hub axle */}
            {activeModel.wheelStyle !== WheelStyle.HOLLOW && (
              <circle cx="0" cy="0" r="16" fill="#090d16" stroke="#4b5563" strokeWidth="2" />
            )}
          </motion.g>
        </g>

        {/* 3. FRONT WHEEL (RIGHT) */}
        <g transform="translate(620, 290)">
          {/* Wheel spin motion wrapper */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Outer Rim Tire */}
            <circle cx="0" cy="0" r="105" fill="none" stroke="#111827" strokeWidth="8" />
            <circle cx="0" cy="0" r="101" fill="none" stroke="#374151" strokeWidth="1" />
            {/* Active outer glow strip */}
            <circle 
              cx="0" 
              cy="0" 
              r="98" 
              fill="none" 
              stroke={activeModel.accentColor} 
              strokeWidth="2.5" 
              style={getGlowShadow(activeModel.accentColor)}
              opacity="0.85"
            />

            {/* Inner Wheel Geometry based on custom Variant */}
            {activeModel.wheelStyle === WheelStyle.DISC && (
              <g>
                <circle cx="0" cy="0" r="95" fill="rgba(15, 23, 42, 0.93)" stroke="#1f2937" strokeWidth="1" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                <path d="M -80 0 L 80 0 M 0 -80 L 0 80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,15" />
                <circle cx="0" cy="0" r="80" fill="none" stroke={activeModel.accentColor} strokeWidth="1" strokeDasharray="3,30" opacity="0.6"/>
                <text x="35" y="-50" fill="#9ca3af" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="1">IM8 MONOCOQUE</text>
                <text x="-45" y="55" fill="#4b5563" fontSize="5" fontFamily="var(--font-display)">AERO RACING</text>
              </g>
            )}

            {activeModel.wheelStyle === WheelStyle.HOLLOW && (
              <g>
                <circle cx="0" cy="0" r="95" fill="none" stroke="#111827" strokeWidth="12" />
                <circle cx="0" cy="0" r="83" fill="none" stroke={activeModel.accentColor} strokeWidth="4" opacity="0.7"/>
                <circle cx="0" cy="-89" r="3" fill="#ffffff" style={getGlowShadow("#ffffff")} />
                <circle cx="77" cy="45" r="3" fill="#ffffff" style={getGlowShadow("#ffffff")} />
                <circle cx="-77" cy="45" r="3" fill="#ffffff" style={getGlowShadow("#ffffff")} />
                <line x1="-80" y1="0" x2="-40" y2="0" stroke={activeModel.accentColor} strokeWidth="1.5" />
                <line x1="40" y1="0" x2="80" y2="0" stroke={activeModel.accentColor} strokeWidth="1.5" />
              </g>
            )}

            {activeModel.wheelStyle === WheelStyle.TRI_SPOKE && (
              <g>
                <circle cx="0" cy="0" r="95" fill="rgba(255, 255, 255, 0.01)" />
                {/* 3 spoke carbon blades */}
                <path d="M 0 -12 Q -15 -60 -25 -90 L 25 -90 Q 15 -60 0 -12 Z" fill="#111827" stroke="#374151" strokeWidth="1" />
                <path d="M -15 -60 L 15 -60" stroke={activeModel.accentColor} strokeWidth="2" opacity="0.8"/>
                <g transform="rotate(120)">
                  <path d="M 0 -12 Q -15 -60 -25 -90 L 25 -90 Q 15 -60 0 -12 Z" fill="#111827" stroke="#374151" strokeWidth="1" />
                  <path d="M -15 -60 L 15 -60" stroke={activeModel.accentColor} strokeWidth="2" opacity="0.8"/>
                </g>
                <g transform="rotate(240)">
                  <path d="M 0 -12 Q -15 -60 -25 -90 L 25 -90 Q 15 -60 0 -12 Z" fill="#111827" stroke="#374151" strokeWidth="1" />
                  <path d="M -15 -60 L 15 -60" stroke={activeModel.accentColor} strokeWidth="2" opacity="0.8"/>
                </g>
                <circle cx="0" cy="0" r="28" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                <circle cx="0" cy="0" r="10" fill={activeModel.accentColor} opacity="0.9" />
              </g>
            )}

            {/* Central hub axle */}
            {activeModel.wheelStyle !== WheelStyle.HOLLOW && (
              <circle cx="0" cy="0" r="16" fill="#090d16" stroke="#4b5563" strokeWidth="2" />
            )}
          </motion.g>
        </g>

        {/* 4. THE COUPLING FRAME (MONOCOQUE TUBE ASSEMBLY) */}
        <g id="frame-geometry">
          {/* Main frame geometry paths styled luxuriously */}
          {/* Seatstay (Back Axle to Seat Post Joint) */}
          <line x1="180" y1="290" x2="330" y2="150" stroke="#1f2937" strokeWidth="12" strokeLinecap="round" />
          <line x1="180" y1="290" x2="330" y2="150" stroke="#374151" strokeWidth="4" strokeLinecap="round" />

          {/* Chainstay (Back Axle to Bottom Bracket) */}
          <line x1="180" y1="290" x2="350" y2="330" stroke="#1f2937" strokeWidth="16" />
          <line x1="180" y1="290" x2="350" y2="330" stroke="#111827" strokeWidth="8" />

          {/* Seat tube structure */}
          <path d="M 350 330 L 330 140" stroke="#0f172a" strokeWidth="20" strokeLinecap="round" />
          <path d="M 350 330 L 330 140" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

          {/* Downtube carbon hull (Bottom Bracket to Cockpit Head tube) */}
          <path d="M 350 330 Q 420 320 580 140" stroke="#000" strokeWidth="28" strokeLinecap="round" />
          <path d="M 350 330 Q 420 320 580 140" stroke="url(#frameGrad)" strokeWidth="22" strokeLinecap="round" />
          {/* Neon wire-channeling accent in down tube */}
          <path 
            d="M 358 320 Q 422 312 576 142" 
            stroke={activeModel.accentColor} 
            strokeWidth="3.5" 
            fill="none"
            style={getGlowShadow(activeModel.accentColor)}
          />

          {/* Top Tube (Cockpit Joint to Seat Joint) */}
          <path d="M 330 150 Q 440 145 580 140" stroke="#000" strokeWidth="24" strokeLinecap="round" fill="none" />
          <path d="M 330 150 Q 440 145 580 140" stroke="url(#frameGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
          {/* Linear Brand Highlight Panel with Copper/Steel Core */}
          <path d="M 390 145 L 480 143" stroke={activeModel.accentColor} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <text x="408" y="148" fill="#ffffff" fontSize="7" fontFamily="var(--font-display)" fontWeight="bold" letterSpacing="1.5">FTR AERO</text>

          {/* Front Fork (Cockpit Head tube to Front Axle) */}
          <line x1="580" y1="140" x2="620" y2="290" stroke="#111827" strokeWidth="18" strokeLinecap="round" />
          <line x1="580" y1="140" x2="620" y2="290" stroke="url(#frameGrad)" strokeWidth="12" strokeLinecap="round" />
          <line 
            x1="584" y1="150" x2="622" y2="285" 
            stroke={activeModel.accentColor} 
            strokeWidth="2.5" 
            style={getGlowShadow(activeModel.accentColor)}
            opacity="0.8"
          />

          {/* Graphene Core Battery Housing in Center Triangle */}
          <polygon 
            points="356,310 342,180 430,220" 
            fill="#090d16" 
            stroke="#1f2937" 
            strokeWidth="3" 
          />
          <polygon 
            points="360,300 348,190 418,225" 
            fill="rgba(255,255,255,0.02)" 
            stroke={activeModel.accentColor} 
            strokeWidth="1.5" 
            style={getGlowShadow(activeModel.accentColor)}
            opacity="0.5"
          />
          {/* Pulse light dot in internal battery pack core */}
          <motion.circle 
            cx="374" 
            cy="240" 
            r="4" 
            fill={activeModel.accentColor}
            style={getGlowShadow(activeModel.accentColor)}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <line x1="365" y1="240" x2="390" y2="240" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,3" />

          {/* Chain/Belt Ring assembly */}
          <circle cx="350" cy="330" r="28" fill="#111827" stroke="#374151" strokeWidth="2.5" />
          <circle cx="350" cy="330" r="20" fill="none" stroke={activeModel.accentColor} strokeWidth="1.5" strokeDasharray="4,8" />
          <line x1="180" y1="290" x2="350" y2="310" stroke="#4b5563" strokeWidth="2" />
          <line x1="180" y1="290" x2="350" y2="350" stroke="#4b5563" strokeWidth="2" />

          {/* Aerodynamic Carbon saddle seat */}
          <path d="M 314 136 Q 320 126 348 136 L 290 142 Z" fill="#090d16" stroke="#1f2937" strokeWidth="2" />
          {/* Seat clamp tube */}
          <line x1="330" y1="150" x2="318" y2="138" stroke="#1f2937" strokeWidth="12" />

          {/* Futuristic horizontal handlebars (Cockpit HUD) */}
          <path d="M 580 140 L 565 110 L 515 106" stroke="#000000" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 580 140 L 565 110 L 515 106" stroke="url(#frameGrad)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Neon brake lever outline / speed display bar */}
          <path 
            d="M 558 108 L 518 108" 
            stroke={activeModel.accentColor} 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            style={getGlowShadow(activeModel.accentColor)}
          />
        </g>

        {/* 5. SPECIFICATION HOTSPOTS GRAPHICS LAYER */}
        <g id="spec-hotspots">
          {hotspots.map((spot) => {
            const isHovered = hoveredHotspot?.id === spot.id;
            return (
              <g 
                key={spot.id} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredHotspot(spot)}
                onMouseLeave={() => setHoveredHotspot(null)}
              >
                {/* Outermost pulsing ring */}
                <motion.circle 
                  cx={spot.x} 
                  cy={spot.y} 
                  r="16" 
                  fill="none" 
                  stroke={activeModel.accentColor} 
                  strokeWidth="1"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Secondary ring */}
                <circle 
                  cx={spot.x} 
                  cy={spot.y} 
                  r="10" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="1.5" 
                  opacity={isHovered ? 0.9 : 0.4}
                />

                {/* Core interactive solid dot */}
                <circle 
                  cx={spot.x} 
                  cy={spot.y} 
                  r="5" 
                  fill={isHovered ? "#ffffff" : activeModel.accentColor} 
                  style={getGlowShadow(activeModel.accentColor)}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Specs Hotspot Tooltip Overlay with AnimatePresence */}
      <AnimatePresence>
        {hoveredHotspot && (
          <motion.div
            key={hoveredHotspot.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-20 glass-panel p-4 rounded-xl max-w-xs shadow-2xl pointer-events-none"
            style={{
              left: `${(hoveredHotspot.x / 800) * 100}%`,
              top: `${(hoveredHotspot.y / 450) * 100 - 15}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            {/* Header with small cybernetic line tag */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded bg-white/5 border border-white/10 text-sky-400">
                <hoveredHotspot.icon className="w-3.5 h-3.5" />
              </span>
              <h5 className="font-display font-medium text-white text-xs tracking-wider uppercase">
                {hoveredHotspot.title}
              </h5>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              {hoveredHotspot.description}
            </p>
            <div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b" 
              style={{
                backgroundColor: "rgba(10, 15, 30, 0.85)",
                borderColor: "rgba(255, 255, 255, 0.04)"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
