import { useState } from "react";
import { BikeModel } from "../types";
import { Zap, Gauge, Weight, Wind, Eye, CheckCircle2 } from "lucide-react";

interface SpecsSectionProps {
  activeModel: BikeModel;
}

export default function SpecsSection({ activeModel }: SpecsSectionProps) {
  const [hudSimulationSpeed, setHudSimulationSpeed] = useState(45); // simulated speed control slider

  // Spec indicators matching telemetry layouts
  const indicators = [
    {
      title: "Top Velocity",
      value: activeModel.specifications.topSpeed,
      icon: Gauge,
      color: "text-blue-400 group-hover:text-blue-300",
      progress: 85,
      detail: "Optimized gear vector synchronization provides high-speed efficiency.",
    },
    {
      title: "Active Range",
      value: activeModel.specifications.range,
      icon: Zap,
      color: "text-amber-400 group-hover:text-amber-300",
      progress: 92,
      detail: "Using active continuous regenerative kinetic flywheels on braking.",
    },
    {
      title: "Aerodynamic Drag",
      value: activeModel.specifications.aeroDrag,
      icon: Wind,
      color: "text-cyan-400 group-hover:text-cyan-300",
      progress: 95,
      detail: "Advanced wind tunnel testing profiles yields high aero-slippery metrics.",
    },
    {
      title: "Chassis Weight",
      value: activeModel.specifications.weight,
      icon: Weight,
      color: "text-emerald-400 group-hover:text-emerald-300",
      progress: 88,
      detail: "Engineered with monocoque nanotechnology and hollow core struts.",
    },
  ];

  return (
    <section id="specifications-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header telemetry blocks */}
        <div className="mb-14 text-center">
          <span className="font-mono text-[9px] text-blue-400 tracking-[0.3em] uppercase block">
            TECHNICAL DISCOVERY
          </span>
          <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white mt-1.5 tracking-tight">
            High Precision Aerospace Engineering
          </h2>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xl mx-auto font-light">
            Each FTR chassis uses materials selected for extreme torsion resilience, thermal balance, and high speed stability.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Main Telemetry Indicators (ColSpan 2) */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {indicators.map((ind) => (
              <div 
                key={ind.title} 
                className="glass-panel rounded-2xl p-5 hover:border-white/10 group transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-gray-500 tracking-wider uppercase">
                      {ind.title}
                    </span>
                    <h4 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                      {ind.value}
                    </h4>
                  </div>
                  <span className={`p-2 rounded-xl bg-white/2 border border-white/5 transition-all ${ind.color}`}>
                    <ind.icon className="w-5 h-5 stroke-[1.5]" />
                  </span>
                </div>

                {/* Simulated premium metric health bar */}
                <div className="mt-6">
                  <div className="flex justify-between font-mono text-[9px] text-gray-500 mb-1.5">
                    <span>SECTOR INTEGRITY</span>
                    <span className="text-gray-400">98.2% READY</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div 
                      className="h-full bg-sky-400 transition-all duration-1000"
                      style={{ 
                        width: `${ind.progress}%`,
                        backgroundColor: activeModel.accentColor 
                      }}
                    />
                  </div>
                  <p className="font-sans text-[10px] text-gray-400 mt-3 leading-relaxed font-light">
                    {ind.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Card 2: Interactive Cockpit Simulator HUD (ColSpan 1) */}
          <div className="glass-panel rounded-2xl p-6 hover:border-white/10 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-sky-400/80 tracking-widest uppercase block mb-1">
                COCKPIT TELEMETRY
              </span>
              <h4 className="font-display text-md font-bold text-white tracking-wide">
                Live Drag Co-efficiency HUD
              </h4>
              <p className="text-gray-400 text-xs mt-2.5 leading-relaxed font-light font-sans">
                Manually simulate velocities below to see dynamic computational fluid dynamics optimization of the {activeModel.name}.
              </p>
            </div>

            {/* Simulated Live Round Chart View */}
            <div className="relative my-6 aspect-video flex flex-col items-center justify-center rounded-xl bg-black/40 border border-white/5 p-4 overflow-hidden">
              <span className="absolute top-2 left-2 font-mono text-[7px] text-gray-600">IMAGING DEV STATUS: SIMULATION</span>
              <span className="absolute top-2 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[7px] text-emerald-400 uppercase font-bold">ONLINE</span>
              </span>

              {/* Glowing animated visualizer graph */}
              <div className="w-full flex justify-between items-end gap-1 px-4 mt-2">
                {[40, 55, 30, 65, 80, 50, 95, 70, 85, 60, 45, 75, 40].map((bar, idx) => {
                  const factor = hudSimulationSpeed / 100;
                  const finalHeight = Math.max(10, Math.min(100, bar * factor));
                  return (
                    <div 
                      key={idx} 
                      className="w-2 rounded-t-sm transition-all duration-300"
                      style={{ 
                        height: `${finalHeight * 0.7}px`,
                        backgroundColor: idx % 2 === 0 ? activeModel.accentColor : '#ffffff',
                        opacity: idx % 3 === 0 ? 0.35 : 0.85
                      }}
                    />
                  );
                })}
              </div>

              {/* Dynamic parameters */}
              <div className="grid grid-cols-2 gap-4 mt-4 w-full border-t border-white/5 pt-3 text-center">
                <div>
                  <p className="font-mono text-[8px] text-gray-500 uppercase">Calculated Drag</p>
                  <p className="font-display text-sm font-semibold text-white mt-0.5">
                    {(parseFloat(activeModel.specifications.aeroDrag) * (1 - (hudSimulationSpeed / 300))).toFixed(3)} Cd
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[8px] text-gray-500 uppercase">Acoustic Decibels</p>
                  <p className="font-display text-sm font-semibold text-white mt-0.5">
                    {(24 + (hudSimulationSpeed * 0.45)).toFixed(1)} dB
                  </p>
                </div>
              </div>
            </div>

            {/* Slider controls */}
            <div className="flex flex-col gap-1.5 pt-4 border-t border-white/5">
              <div className="flex justify-between font-mono text-[10px] text-gray-400">
                <span>SIMULATED SPEED</span>
                <span className="text-white font-bold">{hudSimulationSpeed} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hudSimulationSpeed}
                onChange={(e) => setHudSimulationSpeed(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-ew-resize accent-sky-400"
              />
            </div>
          </div>

        </div>

        {/* Structured Spec Comparison Sheet */}
        <div className="mt-8 glass-panel rounded-2xl p-6 md:p-8 hover:border-white/10 duration-300 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6">
            <h4 className="font-display font-semibold text-white text-md tracking-wider uppercase mb-2 sm:mb-0">
              Structural Assembly List
            </h4>
            <span className="font-mono text-[9px] text-sky-400/80 tracking-widest bg-white/5 px-2.5 py-1 rounded">
              STANDARD ON ALL CONFIGURATIONS
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm">
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Epoxy embedded aerospace fibers</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Integrated internal routing system</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Waterproof Solid-State pack housing</span>
              </li>
            </ul>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Regenerative smart drive software</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Intelligent torque vector stabilizer</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Integrated dual beam matrix lasers</span>
              </li>
            </ul>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Bluetooth 6.1 OTA telemetry updates</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Mobile companion app localization</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Biometric finger-ignition start</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
