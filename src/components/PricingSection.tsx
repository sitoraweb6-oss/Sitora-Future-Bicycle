import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BikeModel } from "../types";
import { Check, ShieldCheck, ShoppingCart, Loader2, Sparkles, Building, ArrowRight, CheckCircle } from "lucide-react";

interface PricingSectionProps {
  activeModel: BikeModel;
  onAddToCart: (model: BikeModel, count?: number) => void;
}

interface Tier {
  name: string;
  priceDelta: number;
  badge: string;
  popular: boolean;
  features: string[];
}

export default function PricingSection({ activeModel, onAddToCart }: PricingSectionProps) {
  const [checkoutModel, setCheckoutModel] = useState<BikeModel | null>(null);
  const [tierIdx, setTierIdx] = useState(1); // active selected tier index
  
  // Checkout form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [step, setStep] = useState(0); // 0 = form, 1 = loading, 2 = success

  const tiers: Tier[] = [
    {
      name: "Cruxon Standard",
      priceDelta: 0,
      badge: "Standard allocation",
      popular: false,
      features: [
        "Base composite carbon chassis layout",
        "Standard multi-mode induction hubless wheels",
        "950 Wh Solid-state battery pack",
        "Standard companion dashboard applet access",
        "2 year limited mechanics warranty",
      ],
    },
    {
      name: "Apex Performance Upgrade",
      priceDelta: 450,
      badge: "Highly Preferred",
      popular: true,
      features: [
        "Enhanced IM8 high-compression carbon weave (+/- 110g lighter)",
        "Magneto high-torque powertrain (+40 Nm vector)",
        "Biometric fingerprint engine ignition safety locks",
        "Premium active laser scan rim glow controller",
        "5 year comprehensive parts guaranteed",
        "Priority fabrication matching (dispatched 1 week early)",
      ],
    },
    {
      name: "Founder's Aero Limited Edition",
      priceDelta: 1200,
      badge: "Premium Allocation",
      popular: false,
      features: [
        "Vacuum-pressed custom ergonomic titanium-resin frame molds",
        "Gold-flake copper paint styling detailing (numbered 1/50)",
        "Bespoke leather racer aerodynamic saddle",
        "Lifetime full white-glove courier support",
        "Private design consultation with FTR engineering directors",
      ],
    },
  ];

  const handleOpenCheckout = (model: BikeModel) => {
    setCheckoutModel(model);
    setStep(0);
    setFullName("");
    setEmail("");
    setCity("");
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsReserving(true);
    setStep(1); // loading scan

    // Simulated high-tech secure allocation slot reservation
    setTimeout(() => {
      onAddToCart(checkoutModel!, 1);
      setStep(2); // success card
      setIsReserving(false);
    }, 3200);
  };

  const activeTier = tiers[tierIdx];
  const totalPrice = activeModel.price + activeTier.priceDelta;

  return (
    <section id="pricing-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] bg-blue-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="font-mono text-[9px] text-blue-400 tracking-[0.3em] uppercase block">
            PRE-ORDER TIERS
          </span>
          <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white mt-1.5 tracking-tight">
            Secure Your Build Allocation Spot
          </h2>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xl mx-auto font-light font-sans">
            Limited slots are hand-built each quarter. Compare standard, elite, and collector editions below to secure your allocation.
          </p>
        </div>

        {/* Dynamic Interactive Tier Switcher Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left package list selection (ColSpan 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 bg-white/2 rounded-2xl border border-white/5">
              <span className="font-mono text-[9px] text-gray-500 tracking-wider block mb-3 uppercase">
                1. SELECT ALLOCATION LEVEL
              </span>
              <div className="flex flex-col gap-3">
                {tiers.map((tier, idx) => {
                  const isSelected = tierIdx === idx;
                  return (
                    <button
                      key={tier.name}
                      onClick={() => setTierIdx(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative group cursor-pointer ${
                        isSelected
                          ? "border-sky-500/40 bg-sky-500/5 shadow-lg"
                          : "border-white/5 hover:border-white/10 bg-white/1"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-white text-xs tracking-wide">
                          {tier.name}
                        </h4>
                        {tier.popular && (
                          <span className="px-1.5 py-0.5 bg-sky-500 text-white font-mono text-[7px] font-bold uppercase rounded tracking-wider">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-end mt-3 text-xs leading-none">
                        <span className="font-mono text-gray-500">Upgrade Margin</span>
                        <span className="font-mono text-white font-bold">
                          {tier.priceDelta === 0 ? "Included" : `+$${tier.priceDelta}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total value box */}
            <div className="glass-panel p-6 rounded-2xl border border-sky-500/10 flex flex-col justify-between h-full bg-sky-500/[0.01]">
              <div>
                <span className="font-mono text-[9px] text-sky-400 tracking-wider uppercase leading-none block">SELECTED ESTIMATED COST</span>
                <span className="font-mono text-xs text-gray-500 block mt-1 uppercase">For model {activeModel.seriesLetter} Class</span>
                <p className="font-display text-white font-bold text-3xl tracking-tight mt-3">
                  ${totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleOpenCheckout(activeModel)}
                  className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-display text-xs font-bold tracking-widest uppercase shadow-lg shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id={`checkout-btn-${activeModel.id}`}
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  RESERVE THIS ALLOCATION
                </button>
              </div>
            </div>
          </div>

          {/* Right features checklist details (ColSpan 8) */}
          <div className="lg:col-span-8 glass-panel rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300 relative flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="font-display font-bold text-lg text-white tracking-wide">
                  {activeTier.name} Features Array
                </h3>
                <span className="font-mono text-gray-500 text-[10px] uppercase mt-1">
                  Active Chassis: {activeModel.name}
                </span>
              </div>

              {/* Lists of feature bullet items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTier.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="p-0.5 rounded bg-sky-500/10 border border-sky-400/20 text-sky-450 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-sky-400" />
                    </span>
                    <span className="leading-relaxed font-sans font-light">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality badge row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/5 pt-6 mt-8 gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                </span>
                <div>
                  <h5 className="font-display font-medium text-white text-xs">Certified Torsion Integrity</h5>
                  <p className="text-gray-500 text-[10px] uppercase font-mono mt-0.5">Checked with ISO-920 fiber tests</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>HAND-BUILT IN NANTES LABS, FRANCE</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Secure Pre-Order checkout Modal */}
      <AnimatePresence>
        {checkoutModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#02050cc0] backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full rounded-2xl glass-panel-heavy border border-sky-500/20 p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              
              {/* Stage A: Checkout Form */}
              {step === 0 && (
                <form onSubmit={handleReserveSubmit} className="space-y-5">
                  <div className="border-b border-white/5 pb-3">
                    <span className="font-mono text-[8px] text-sky-400 tracking-[0.2em] font-bold block uppercase">
                      SECURE CHECKOUT TERMINAL
                    </span>
                    <h3 className="font-display font-bold text-white text-lg tracking-wide mt-1">
                      Reserve Custom Allocation Slot
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 font-sans">
                      Verify your design parameters first. Allocation price: <strong className="text-white">${totalPrice.toLocaleString()}</strong>. No immediate transaction occurs; this preserves slot assignment.
                    </p>
                  </div>

                  <div className="bg-white/2 p-3.5 rounded-xl border border-white/5 space-y-1 text-xs">
                    <span className="font-mono text-[8px] text-gray-550 block uppercase">CHASSIS RESERVATION DETAIL</span>
                    <div className="flex justify-between font-semibold text-white">
                      <span>{checkoutModel.name} Prototype</span>
                      <span>${checkoutModel.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>{activeTier.name} Package</span>
                      <span>+${activeTier.priceDelta.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[9px] text-gray-400 uppercase">FULL NAME</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-sky-500/30 text-white text-xs font-sans placeholder-gray-600 focus:outline-none"
                        placeholder="Marcus Sinclair"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[9px] text-gray-400 uppercase">EMAIL ADRESS</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-sky-500/30 text-white text-xs font-sans placeholder-gray-600 focus:outline-none"
                        placeholder="marcus@sinclairdesign.com"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[9px] text-gray-400 uppercase">DISPATCH DESTINATION CITY</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-sky-500/30 text-white text-xs font-sans placeholder-gray-600 focus:outline-none"
                        placeholder="Nantes, France"
                        required
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutModel(null)}
                      className="w-1/3 py-3 rounded-xl border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase hover:bg-white/5 cursor-pointer block text-center"
                    >
                      ABORT
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3 rounded-xl bg-sky-500 text-white font-display text-[11px] font-bold tracking-widest uppercase hover:bg-sky-400 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      CONFIRM RESERVATION
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Stage B: High-Tech allocation Scanning Loader */}
              {step === 1 && (
                <div className="text-center py-12 flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-sky-400 animate-spin mb-6 stroke-[1.5]" />
                  <span className="font-mono text-[9px] text-sky-400 tracking-widest block uppercase mb-1.5">
                    SECURE HUB TRANSMITTING
                  </span>
                  <h4 className="font-display font-medium text-white text-md tracking-wider">
                    Securing FTR Chassis Allocation Slot...
                  </h4>
                  <p className="text-gray-500 text-xs mt-3 leading-relaxed max-w-xs font-sans font-light">
                    Linking with Nantes laboratory mainframes. Generating on-chain custom build serial indices.
                  </p>
                </div>
              )}

              {/* Stage C: Success Result Certificate! */}
              {step === 2 && (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-5 text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-[8px] text-emerald-400 tracking-widest block uppercase mb-1">
                    SLOT ALLOCATED SUCCESS
                  </span>
                  <h3 className="font-display font-bold text-white text-lg tracking-wider">
                    Chassis Reserved Successfully
                  </h3>
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-sm font-sans font-light">
                    Welcome to the future of urban flight, <span className="text-white font-bold">{fullName}</span>. An aerospace build certificate has been dispatched to <span className="text-sky-300 font-bold">{email}</span>. Your slot is guaranteed!
                  </p>

                  <div className="bg-white/2 p-4 rounded-xl border border-white/5 w-full mt-6 text-xs text-left text-gray-400 font-mono space-y-1">
                    <div className="flex justify-between">
                      <span>CHASSIS SERIE:</span>
                      <span className="text-white">v92-{checkoutModel.seriesLetter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ALLOCATION LEVEL:</span>
                      <span className="text-sky-400 font-bold">{activeTier.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FABRICATION QUEUE:</span>
                      <span className="text-white">NANTES SLOT #058</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutModel(null)}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-sky-500 hover:border-sky-500 text-white font-mono text-[10px] tracking-wider uppercase mt-8 transition-all"
                  >
                    RETURN TO SHOWROOM
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
