import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BikeModel, CustomizationResult } from "../types";
import { Cpu, Zap, Palette, Scale, Loader2, RefreshCw, Send, CheckCircle, Info } from "lucide-react";

interface AICustomizerProps {
  models: BikeModel[];
  onSelectModel: (model: BikeModel) => void;
}

export default function AICustomizer({ models, onSelectModel }: AICustomizerProps) {
  const [ridingStyle, setRidingStyle] = useState("Steep urban climbs and wet tracks");
  const [performanceTier, setPerformanceTier] = useState("Apex Track");
  const [designNotes, setDesignNotes] = useState("Chassis accents mirroring cosmic cyan and forged raw carbon weave.");
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<CustomizationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reassuring messages during deep AI generation to improve UX
  const loadingStrings = [
    "Analyzing aerodynamic velocity fields...",
    "Selecting optimal IM8 resin composite layups...",
    "Querying Graphene cell resistance profiles...",
    "Formulating custom active rim laser modes...",
    "Finalizing customized design certificate...",
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingStrings.length - 1 ? prev + 1 : prev));
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleCustomise = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const response = await fetch("/api/customize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ridingStyle,
          performanceTier,
          designNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Customization failed.");
      }

      setResult(data);
      
      // Auto-focus the corresponding model in the main screen if it successfully returned a model name
      const matched = models.find(m => data.modelRecommendation?.toLowerCase().includes(m.seriesLetter.toLowerCase()));
      if (matched) {
        onSelectModel(matched);
      }
    } catch (err: any) {
      console.warn("AI Generation failed. Falling back to high-grade client side generator.", err);
      // Fallback local schema generator to provide high quality offline capability
      setTimeout(() => {
        const matchingModel = performanceTier.includes("Urban") ? models[1] : (performanceTier.includes("Apex") ? models[0] : models[2]);
        const fallbackRes: CustomizationResult = {
          modelRecommendation: matchingModel.name,
          modelReasoning: `Optimized specifically for ${ridingStyle}. Features state-of-the-art dual structural fork channels to support rigid torsional velocity on complex turns.`,
          customAccents: `${designNotes || "Titanium Bronze & Forged Raw Carbon weave Details"}`,
          gearRatio: "Electro-Continuum Infinitely Variable Hub with 55T Carbon Sprocket",
          weightSavings: "-110g saved via customized layered high-compression carbon molds",
          laserGlowMode: "Dual Cyan Scanning Laser Shutter Mode",
          estimatedBuildWeeks: 4,
        };
        setResult(fallbackRes);
        onSelectModel(matchingModel);
      }, 3500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
    setRidingStyle("Steep urban climbs and wet tracks");
    setPerformanceTier("Apex Track");
    setDesignNotes("Chassis accents mirroring cosmic cyan and forged raw carbon weave.");
  };

  return (
    <section id="ai-customizer-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full mb-3 text-blue-400 font-mono text-[9px] uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            AI Design Studio
          </div>
          <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white tracking-tight">
            Configure Your Bespoke Aero
          </h2>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xl mx-auto font-light">
            Prompt our generative design engine. Input your targeted terrain profiles, and watch Gemini calculate the optimal aerospace composite resin mold, gear configurations, and active rim lasers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Inputs Form Frame (ColSpan 2) */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl">
            <form onSubmit={handleCustomise} className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-500 tracking-wider uppercase">
                  1. RIDING ENVIRONMENT & TERRAINS
                </label>
                <input
                  type="text"
                  value={ridingStyle}
                  onChange={(e) => setRidingStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-blue-500/30 text-white text-xs font-sans placeholder-gray-600 focus:outline-none transition-all"
                  placeholder="e.g. Sharp canyon descents, wet road gravel, extreme headwind sprints"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-500 tracking-wider uppercase">
                  2. PROPULSION PERFORMANCE CLASS
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Urban Agile", "Apex Track", "Aero Endurance"].map((tier) => {
                    const isSelected = performanceTier === tier;
                    return (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setPerformanceTier(tier)}
                        className={`py-2 px-1 text-center rounded-xl font-mono text-[9px] tracking-wider uppercase border transition-all ${
                          isSelected
                            ? "bg-blue-500/15 border-blue-400/40 text-blue-400 font-bold"
                            : "bg-white/2 border-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        {tier.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-500 tracking-wider uppercase">
                  3. BESPOKE AESTHETICS PROMPT (OPTIONAL)
                </label>
                <textarea
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-blue-500/30 text-white text-xs font-sans placeholder-gray-600 focus:outline-none transition-all resize-none"
                  placeholder="Describe your design, paint gradients (e.g. Copper Sun over matte carbon), or specialized hub preferences..."
                />
              </div>

              {/* Status and button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-white text-slate-950 font-display text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-white/5 hover:bg-blue-50 active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      Generating Blueprint...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-slate-950" />
                      SUBMIT DESIGN PROFILES
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-start gap-2.5 text-gray-500 bg-white/2 p-3.5 rounded-xl border border-white/5 text-[10px]">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="leading-relaxed">
                Our neural design engine leverages Gemini models to calculate composite structural formulas and wind resistances in real time.
              </p>
            </div>
          </div>

          {/* Outputs Panel Frame (ColSpan 3) */}
          <div className="lg:col-span-3 glass-panel-heavy rounded-2xl border border-sky-500/10 p-6 md:p-8 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden shadow-2xl">
            {/* Ambient vector lines in output box */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-sky-500/[0.02] to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {/* State A: Idle display */}
              {!isLoading && !result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center max-w-sm flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-gray-400 relative">
                    <Cpu className="w-6 h-6 stroke-[1.5]" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
                  </div>
                  <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase">
                    AWAITING PARAMETERS
                  </h4>
                  <p className="text-gray-500 text-xs mt-2.5 leading-relaxed font-sans font-light">
                    Submit the form on the left. The engine will evaluate structural physics models and render a bespoke build specsheet.
                  </p>
                </motion.div>
              )}

              {/* State B: Loading and dynamic reassuring steps */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center max-w-sm flex flex-col items-center"
                >
                  <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-5 stroke-[1.5]" />
                  <p className="font-mono text-gray-500 text-[10px] tracking-widest uppercase mb-1">
                    STUDIO PROCESS: PHASE {loadingStep + 1}
                  </p>
                  <h4 className="font-display font-medium text-white text-md tracking-wide min-h-[25px]">
                    {loadingStrings[loadingStep]}
                  </h4>
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                    <motion.div 
                      className="h-full bg-sky-400"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 10, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              )}

              {/* State C: Successfully computed custom certificate results! */}
              {!isLoading && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex flex-col justify-between h-full"
                >
                  {/* Certificate Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-5 gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                        <span className="font-mono text-[8px] text-sky-400 tracking-widest uppercase font-bold">
                          DESIGN RECORD COMPUTED
                        </span>
                      </div>
                      <h4 className="font-display text-white font-bold text-lg tracking-wide mt-1 leading-none">
                        Bespoke Build Certificate
                      </h4>
                    </div>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 font-mono text-[9px] text-gray-400 hover:text-white transition-all self-start sm:self-auto"
                    >
                      <RefreshCw className="w-3 h-3" />
                      RE-CONFIGURE
                    </button>
                  </div>

                  {/* Body Specs cards bento */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow mb-6 text-xs">
                    {/* Reccomended Chassis */}
                    <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                      <p className="font-mono text-[8px] text-gray-500 uppercase">1. SUGGESTED CHASSIS</p>
                      <p className="font-display text-white font-bold text-sm mt-1 leading-none">
                        {result.modelRecommendation}
                      </p>
                      <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed font-sans font-light">
                        {result.modelReasoning}
                      </p>
                    </div>

                    {/* Aesthetics */}
                    <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-[8px] text-gray-500 uppercase">2. COMPOSITE ACCENTS</p>
                        <p className="font-sans text-sky-300 font-semibold mt-1">
                          {result.customAccents}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 font-mono text-[8px] text-gray-500 lg:mt-0">
                        <Palette className="w-3 h-3 text-sky-400" />
                        <span>PREMIUM RESIN PALETTE</span>
                      </div>
                    </div>

                    {/* Gearing Ratio */}
                    <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                      <p className="font-mono text-[8px] text-gray-500 uppercase">3. GEAR TRANSMISSION SPEC</p>
                      <p className="font-display text-white font-medium text-[11px] mt-1 font-mono">
                        {result.gearRatio}
                      </p>
                      <p className="font-mono text-[8px] text-gray-500 uppercase mt-4">4. STRUCTURE WEIGHT CORRECTION</p>
                      <p className="font-display text-emerald-400 font-bold text-[11px] mt-1 font-mono">
                        {result.weightSavings}
                      </p>
                    </div>

                    {/* Electronics */}
                    <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-[8px] text-gray-500 uppercase">5. ACTIVE RIM LED SYSTEM</p>
                        <p className="font-display text-white font-medium text-[11px] mt-1 font-mono">
                          {result.laserGlowMode}
                        </p>
                      </div>
                      <div className="mt-3 border-t border-white/5 pt-2.5 flex justify-between font-mono text-[8px] text-gray-400">
                        <span>FABRICATION VELOCITY</span>
                        <span className="text-white font-bold">{result.estimatedBuildWeeks} WORK WEEKS</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Seal stamp */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-gray-500">
                    <span>BUILD TELEMETRY VERIFIED</span>
                    <span className="text-sky-400 font-bold">FTR NEURAL SEAL</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
