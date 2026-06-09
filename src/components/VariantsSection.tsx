import { BikeModel } from "../types";
import { Check, ShieldCheck, Zap, ArrowDown, ChevronRight, ShoppingCart } from "lucide-react";

interface VariantsSectionProps {
  models: BikeModel[];
  activeModel: BikeModel;
  onSelectModel: (model: BikeModel) => void;
  onAddToCart: (model: BikeModel) => void;
}

export default function VariantsSection({
  models,
  activeModel,
  onSelectModel,
  onAddToCart,
}: VariantsSectionProps) {
  
  const comparisonRows = [
    {
      title: "Recommended Style",
      key: "badge",
      type: "text",
    },
    {
      title: "Top Velocity",
      key: "topSpeed",
      type: "spec",
    },
    {
      title: "Est. Active Range",
      key: "range",
      type: "spec",
    },
    {
      title: "Chassis Weight",
      key: "weight",
      type: "spec",
    },
    {
      title: "Aerodynamic Coefficient",
      key: "aeroDrag",
      type: "spec",
    },
    {
      title: "Solid-State Battery Capacity",
      key: "battery",
      type: "spec",
    },
    {
      title: "Aerospace Resin Class",
      key: "frameMaterial",
      type: "spec",
    },
  ];

  return (
    <section id="variants-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] bg-blue-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header section */}
        <div className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[9px] text-blue-400 tracking-[0.3em] uppercase block">
              CHASSIS CONFIGURATION
            </span>
            <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white mt-1.5 tracking-tight">
              Compare FTR Models Side-By-Side
            </h2>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xl font-light font-sans">
              Choose the perfect geometry and powertrain. Select any card below to focus the layout on that prototype.
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectModel(m)}
                className={`flex gap-1 items-center px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-wide border transition-all ${
                  m.id === activeModel.id
                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Model {m.seriesLetter}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic comparison Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {models.map((model) => {
            const isActive = model.id === activeModel.id;
            return (
              <div 
                key={model.id}
                onClick={() => onSelectModel(model)}
                className={`glass-panel rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer group ${
                  isActive 
                    ? "border-sky-500/30 bg-sky-500/[0.03] shadow-2xl shadow-sky-500/5" 
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Active glow tag */}
                {isActive && (
                  <div className="absolute top-0 right-0 py-1 px-3 bg-sky-500 text-white font-mono text-[8px] font-bold tracking-wider rounded-bl-xl uppercase">
                    Focused Chassis
                  </div>
                )}

                {/* Card Title Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: model.accentColor }} 
                    />
                    <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                      SERIES {model.seriesLetter}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white tracking-wide">
                    {model.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1.5 font-sans leading-relaxed font-light min-h-[50px]">
                    {model.tagline}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="my-6 space-y-3.5 border-y border-white/5 py-4 text-xs font-sans">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Powertrain</span>
                    <span className="text-white font-semibold">{model.specifications.battery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Chassis Weight</span>
                    <span className="text-white font-semibold">{model.specifications.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Top Velocity</span>
                    <span className="text-white font-semibold">{model.specifications.topSpeed}</span>
                  </div>
                </div>

                {/* Bottom Trigger button */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-gray-500">PRE-ORDER VALUE</span>
                    <span className="font-display text-white font-bold tracking-tight text-lg">
                      ${model.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid triggering model selection select
                      onAddToCart(model);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-sky-500 hover:text-white hover:border-sky-500 text-white font-display text-[11px] font-semibold tracking-wider uppercase transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Reserve
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Spec Comparison Rows Layout */}
        <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
          <div className="p-4 bg-white/2 border-b border-white/5 font-mono text-[10px] text-gray-400 tracking-widest uppercase">
            COMPLETE COMPARATIVE TELEMETRY MATRIX
          </div>
          <div className="divide-y divide-white/5">
            {comparisonRows.map((row) => (
              <div 
                key={row.title} 
                className="grid grid-cols-1 md:grid-cols-[250px_1fr_1fr_1fr] p-4 items-center gap-4 text-xs"
              >
                <div className="font-display text-white font-medium tracking-wide">
                  {row.title}
                </div>
                {models.map((model) => {
                  const isHoveredModel = model.id === activeModel.id;
                  let displayText = "";

                  if (row.type === "text") {
                    displayText = model[row.key as keyof BikeModel] as string;
                  } else if (row.type === "spec") {
                    displayText = model.specifications[row.key as keyof typeof model.specifications] as string;
                  }

                  return (
                    <div 
                      key={model.id} 
                      className={`font-mono transition-all py-1 px-2 rounded ${
                        isHoveredModel ? "text-sky-400 font-bold bg-white/2" : "text-gray-400"
                      }`}
                    >
                      <span className="md:hidden text-[9px] text-gray-600 block mb-0.5 tracking-wider font-mono">
                        Model {model.seriesLetter}:
                      </span>
                      {displayText}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
