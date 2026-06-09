import { motion } from "motion/react";
import { BikeModel } from "../types";
import BicycleRenderer from "./BicycleRenderer";
import { ShoppingCart, Compass, Fuel, Shield, Disc, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  models: BikeModel[];
  activeModel: BikeModel;
  onSelectModel: (model: BikeModel) => void;
  onAddToCart: (model: BikeModel) => void;
}

export default function HeroSection({
  models,
  activeModel,
  onSelectModel,
  onAddToCart,
}: HeroSectionProps) {

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden px-4 md:px-12 bg-slate-950">
      
      {/* Background Ambient Radial Glow (Clean Minimalism) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)]" />
      </div>

      {/* Cyber vertical scanning telemetry lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent absolute laser-scanner" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr_60px] gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Floating Side Product Selector Rail (matching the picture) */}
        <div className="order-2 lg:order-1 flex flex-col gap-4">
          <div className="glass-panel rounded-2xl p-4 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible no-scrollbar shadow-2xl">
            <div className="hidden lg:block pb-2 border-b border-white/5">
              <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">CHASSIS SERIE</span>
              <p className="font-display font-medium text-white text-xs mt-0.5">SELECT VARIANT</p>
            </div>
            
            {models.map((model) => {
              const isActive = model.id === activeModel.id;
              return (
                <button
                  key={model.id}
                  onClick={() => onSelectModel(model)}
                  className={`relative flex items-center justify-between text-left p-3.5 rounded-xl border transition-all duration-300 group ${
                    isActive
                      ? "border-blue-400/40 bg-white/5 shadow-lg shadow-blue-500/5"
                      : "border-white/5 hover:border-white/10 bg-white/2 hover:bg-white/[0.04]"
                  }`}
                  id={`variant-btn-${model.seriesLetter}`}
                >
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-white text-xs tracking-wider">
                        Cruxon model {model.seriesLetter}
                      </span>
                      {isActive && (
                        <span 
                          className="w-2 h-2 rounded-full shadow" 
                          style={{ backgroundColor: model.accentColor }} 
                        />
                      )}
                    </div>

                    {/* Highly stylized miniature vector mockup of the tire styling */}
                    <div className="relative w-full h-12 rounded-lg bg-slate-900 border border-white/5 overflow-hidden flex items-center justify-center group-hover:border-white/10 transition-colors">
                      {/* Left tiny tire */}
                      <div 
                        className={`w-7 h-7 rounded-full border-1.5 flex items-center justify-center transition-all ${isActive ? "border-blue-400" : "border-gray-700"}`}
                        style={isActive ? { borderColor: model.accentColor } : {}}
                      >
                        <div className={`w-3 h-3 rounded-full ${isActive ? "bg-blue-400" : "bg-gray-700"}`} style={isActive ? { backgroundColor: model.accentColor } : {}} />
                      </div>
                      {/* Connecting miniature bar */}
                      <div className="w-10 h-0.5 bg-gray-700 mx-1" />
                      {/* Right tiny tire */}
                      <div 
                        className={`w-7 h-7 rounded-full border-1.5 flex items-center justify-center transition-all ${isActive ? "border-blue-400" : "border-gray-700"}`}
                        style={isActive ? { borderColor: model.accentColor } : {}}
                      >
                        <div className={`w-3 h-3 rounded-full ${isActive ? "bg-blue-400" : "bg-gray-700"}`} style={isActive ? { backgroundColor: model.accentColor } : {}} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-white/50 mt-1">
                      <span className="font-mono tracking-wider">{model.specifications.weight}</span>
                      <span className="font-mono text-white tracking-widest">${model.price.toLocaleString()}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Specs Overview panel under variants */}
          <div className="hidden lg:flex glass-panel rounded-2xl p-4 flex-col gap-2.5">
            <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">Live Telemetry</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-gray-400 bg-white/2 p-2 rounded-lg border border-white/5">
                <Compass className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.5} />
                <div>
                  <p className="text-[9px] text-white/40 uppercase leading-none font-mono">Velocity</p>
                  <p className="font-display font-semibold text-white mt-0.5">{activeModel.specifications.topSpeed}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 bg-white/2 p-2 rounded-lg border border-white/5">
                <Fuel className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                <div>
                  <p className="text-[9px] text-white/40 uppercase leading-none font-mono">Aerodynamics</p>
                  <p className="font-display font-semibold text-white mt-0.5">{activeModel.specifications.aeroDrag}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Hero Product Presentation Showcase */}
        <div className="order-1 lg:order-2 flex flex-col md:px-6 relative min-h-[500px] justify-between">
          
          {/* Top minimal header within showcase */}
          <div className="mb-4">
            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">
              Next Generation Prototype
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mt-2 gap-2">
              <h1 className="font-display text-5xl lg:text-7xl font-light tracking-tighter leading-none text-white whitespace-pre-wrap">
                Peugeot <span className="font-medium">Future Bicycle</span>
              </h1>
              <span className="font-mono text-blue-400 uppercase tracking-[0.3em] border border-blue-500/10 px-2.5 py-0.5 rounded text-[10px] bg-blue-500/5 mt-2 md:mt-0">
                {activeModel.seriesLetter}-CLASS Allocation
              </span>
            </div>
            <p className="text-white/50 text-xs md:text-sm mt-4 leading-relaxed max-w-xl font-light">
              {activeModel.description}
            </p>
          </div>

          {/* Large dynamic visualizer */}
          <div className="my-auto py-4 relative">
            <BicycleRenderer activeModel={activeModel} />
            
            {/* FLOATING PRICING AREA - inspired by picture */}
            <div 
              className="absolute bottom-20 md:bottom-24 right-[15%] select-none z-10 glass-pill px-4 py-2 border rounded-full shadow-lg flex items-center gap-2.5 hover:border-white/10 transition-all cursor-pointer"
              style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-ping bg-blue-400" />
              <span className="font-mono text-white/50 text-[10px]">PRE-ORDER</span>
              <span className="font-display text-white text-xs font-bold leading-none tracking-widest">
                — ${activeModel.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-4 border-t border-white/5 pt-6">
            <button
              onClick={() => onAddToCart(activeModel)}
              className="px-8 py-3.5 bg-white text-slate-950 font-display text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl cursor-pointer hover:bg-blue-50 transition-colors shadow-lg shadow-white/5 flex items-center gap-2"
              id="add-to-cart-hero"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              Purchase Now
            </button>
            
            <a
              href="#specifications-section"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white font-display text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Specifications
              <ArrowRight className="w-3.5 h-3.5 text-white/55" />
            </a>

            <div className="ml-auto flex items-center gap-6 text-[10px] font-mono text-gray-500 tracking-wider">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.5} />
                <span>5 Year Graphene Guarantee</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.5} />
                <span>Aerodynamic Hubless Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimal Vertical Social Media Share Anchor Rail (inspired by photo) */}
        <div className="order-3 lg:order-3 flex lg:flex-col items-center justify-between lg:h-[450px] py-4 lg:py-0 border-t lg:border-t-0 lg:border-l border-white/5 text-gray-500 font-mono text-[9px] tracking-[0.25em] uppercase">
          <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
          
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors py-2 rotate-0 lg:-rotate-90 origin-center whitespace-nowrap">
            TWITTER
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors py-2 rotate-0 lg:-rotate-90 origin-center whitespace-nowrap">
            INSTAGRAM
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors py-2 rotate-0 lg:-rotate-90 origin-center whitespace-nowrap">
            FACEBOOK
          </a>

          <div className="hidden lg:block w-px h-16 bg-gradient-to-t from-transparent to-white/10" />
        </div>

      </div>
    </section>
  );
}
