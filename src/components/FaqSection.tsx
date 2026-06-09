import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Plus, Minus, FileText } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 1,
      category: "BATTERY & CHARGING",
      question: "How does the Solid-State battery system recharge?",
      answer: "The FTR Graphene Solid-state packs integrate directly into standard 110V/220V home sources via our SmartCharger adapter, achieving an 80% charge in just 18 minutes. Under road operations, the active kinetic motor utilizes a state-of-the-art continuous regenerative flywheel to recharge up to 15% range back into cells when braking.",
    },
    {
      id: 2,
      category: "CONSTRUCTION FRAME",
      question: "Are FTR titanium composite frame structures customizable?",
      answer: "Yes, fully so. By utilizing our 'AI Design Studio' customizer, your specified ergonomics, height parameters, and color preferences are translated into exact aerospace-grade carbon weave layups. The final chassis is hand-layered and vacuum-sealed over a period of 4 weeks in our French laboratory.",
    },
    {
      id: 3,
      category: "MAINTENANCE DIAGNOSTIC",
      question: "What maintenance routines are required for hubless wheels?",
      answer: "Unlike standard spoke rims which loosen and wear out, the S-Series hubless wheels operate on a dust-sealed contactless magnetic induction track. This eliminates traditional mechanical friction entirely. A biological-safe lubrication sweep is recommended once a year, and the internal diagnostics applet automatically logs track efficiency weekly.",
    },
    {
      id: 4,
      category: "REGULATOR COMPLIANCE",
      question: "Is the bicycle road legal in metropolitan domains?",
      answer: "The on-board OLED cockpit includes a multi-mode performance engine limiter. Under 'City mode', speed output is limited to standard 25 km/h with sensor assistance fully conforming to European/US city standards. Under 'Apex track mode', the speed limits are deactivated, releasing full velocity for velodromes and enclosed racing rings.",
    },
  ];

  return (
    <section id="faq-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] bg-blue-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Informational Sidebar column (ColSpan 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] text-blue-400 tracking-[0.3em] uppercase block">
              SUPPORT MATRIX
            </span>
            <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white mt-1.5 tracking-tight">
              Frequently Queried Specifications
            </h2>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed font-sans font-light">
              Explore structural, diagnostic, and logistical faqs. Speak with our design team via our quick channel triggers for private configurations.
            </p>
          </div>

          <div className="hidden lg:flex glass-panel p-4 rounded-2xl flex-col gap-3 mt-6 border-l-2 border-l-blue-500">
            <span className="font-mono text-[8px] text-blue-400 font-bold uppercase">NEED DIRECT ASSISTANCE?</span>
            <p className="font-sans text-gray-400 text-[11px] leading-relaxed">
              Our engineering specialists are available via direct connection channels to guide custom layouts.
            </p>
            <a 
              href="#contact-section" 
              className="text-white text-xs font-semibold hover:text-sky-400 transition-colors inline-flex items-center gap-1 mt-1 font-display"
            >
              Direct Messaging Channel <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-sky-400" />
            </a>
          </div>
        </div>

        {/* Right Accordion column (ColSpan 8) */}
        <div className="lg:col-span-8 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openIdx === faq.id;
            return (
              <div 
                key={faq.id}
                className="glass-panel rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
              >
                {/* Accordion Trigger header button */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : faq.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-mono text-[8px] text-gray-500 tracking-wider">
                      {faq.category}
                    </span>
                    <span className="font-display text-white font-semibold text-xs md:text-sm tracking-wide mt-1.5">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Plus / Minus indicator icons */}
                  <span className={`p-1.5 rounded-lg bg-white/2 border border-white/5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-sky-400" : ""}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Animated Inner answer body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-400 text-xs md:text-sm leading-relaxed border-t border-white/[0.03] font-sans font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
