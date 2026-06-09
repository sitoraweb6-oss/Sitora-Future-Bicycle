import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, ShieldCheck, ChevronLeft, ChevronRight, Box } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  details: string;
  telemetry: string;
}

export default function InteractiveGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  // High-contrast, dark cycling detail photos from Unsplash
  const items: GalleryItem[] = [
    {
      id: 1,
      title: "Carbon Fiber Rim Torsion",
      category: "CHASSIS CORE",
      image: "/images/gallery-chassis.svg",
      details: "Multi-directional layered IM8 carbon fabric weaving offering high-rigidity structural safety under 2200 Nm twisting loads.",
      telemetry: "FIBER ROTATION: 45° CROSSWEAVE",
    },
    {
      id: 2,
      title: "Monocoque Handlebar Stem",
      category: "COCKPIT CONTROL",
      image: "/images/gallery-cockpit.svg",
      details: "Fully integrated cockpit stem concealing all hydraulic fluid cables, OLED core microprocessors, and battery link lines.",
      telemetry: "DRAG RESISTANCE: 0.04 Cd AREA",
    },
    {
      id: 3,
      title: "Graphene Battery Compartment",
      category: "ENERGY CELL",
      image: "/images/gallery-battery.svg",
      details: "Solid-state electrolyte formulation encased in high-modulus shell, guaranteeing zero chemical dissipation under extreme climates.",
      telemetry: "THERMAL THRESHOLD: -30C TO 70C",
    },
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const activeItem = items[activeIdx];

  return (
    <section id="gallery-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[140px] bg-blue-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Gallery Header */}
        <div className="mb-14 text-center md:text-left">
          <span className="font-mono text-[9px] text-blue-400 tracking-[0.3em] uppercase block">
            VISUAL WORKBENCH
          </span>
          <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white mt-1.5 tracking-tight">
            Closeups & Macro Architecture
          </h2>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xl font-light font-sans font-extralight">
            Explore FTR macro-structure blueprints. Hover to read engineering telemetry overlays or click zoom to enter high-resolution viewport mode.
          </p>
        </div>

        {/* Big Interactive Grid Slide Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/2 border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          
          {/* Cyber lines decor */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-sky-500/10 pointer-events-none" />

          {/* Left interactive slideshow column (ColSpan 7) */}
          <div className="lg:col-span-7 relative group flex items-center justify-center">
            {/* Sliding Image Containment Frame */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/5 shadow-inner">
              <img 
                src={activeItem.image} 
                alt={activeItem.title} 
                className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-all filter brightness-75 contrasts-125"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Telemetry watermark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-between p-4 md:p-6">
                <div>
                  <span className="font-mono text-[8px] text-gray-500 tracking-[0.2em] font-bold">FTR CORE BLUEPRINT MODEL: v9.2</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[9px] text-sky-400 tracking-wider font-semibold bg-sky-500/15 border border-sky-400/20 px-2 py-0.5 rounded">
                      {activeItem.category}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-white mt-2 leading-none">
                      {activeItem.title}
                    </h3>
                  </div>
                  
                  {/* Zoom indicator trigger */}
                  <button
                    onClick={() => setZoomOpen(true)}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 transition-all cursor-pointer flex items-center gap-1.5 font-display text-[10px] tracking-wider uppercase font-semibold block"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Zoom Detail
                  </button>
                </div>
              </div>
            </div>

            {/* Left Prev / Right Next Buttons */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-black/75 hover:bg-sky-500 border border-white/10 text-white transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-black/75 hover:bg-sky-500 border border-white/10 text-white transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Details column (ColSpan 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 px-2">
            <div>
              <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">
                SPECIFICATION CORNER
              </span>
              <h4 className="font-display text-md font-bold text-white tracking-wide mt-1">
                Engineering Mechanical Breakdown
              </h4>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed font-sans font-light">
                {activeItem.details}
              </p>
            </div>

            {/* Simulated Live telemetry readout cards */}
            <div className="space-y-3.5 border-t border-white/5 pt-5">
              <div className="flex bg-white/2 p-3 rounded-xl border border-white/5 justify-between">
                <div>
                  <p className="font-mono text-[8px] text-gray-500">TELEMETRY READING</p>
                  <p className="font-mono font-bold text-white text-[11px] leading-tight mt-0.5">
                    {activeItem.telemetry}
                  </p>
                </div>
                <span className="p-2 bg-white/3 rounded-lg text-sky-400">
                  <Box className="w-4 h-4 stroke-[1.5]" />
                </span>
              </div>

              <div className="flex bg-white/2 p-3 rounded-xl border border-white/5 justify-between">
                <div>
                  <p className="font-mono text-[8px] text-gray-500">QUALITY STANDARD</p>
                  <p className="font-sans text-emerald-400 text-[11px] font-semibold mt-0.5 leading-none">
                    ISO-2849 aerospace compliance
                  </p>
                </div>
                <span className="p-2 bg-white/3 rounded-lg text-emerald-400">
                  <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>

            {/* Pagination index visual */}
            <div className="flex gap-2.5 items-center">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIdx ? "w-8 bg-sky-500" : "w-2 bg-white/10"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* High resolution lightbox overlay */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden glass-panel-heavy p-2 shadow-2xl border border-white/10"
            >
              <img 
                src={activeItem.image} 
                alt={activeItem.title} 
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-mono text-[9px] text-blue-400">{activeItem.category}</span>
                  <h3 className="font-display font-bold text-white text-md mt-0.5">{activeItem.title}</h3>
                </div>
                <button
                  onClick={() => setZoomOpen(false)}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl font-mono text-[10px]"
                >
                  Close Blueprint View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
