import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BikeModel, WheelStyle } from "./types";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SpecsSection from "./components/SpecsSection";
import VariantsSection from "./components/VariantsSection";
import AICustomizer from "./components/AICustomizer";
import InteractiveGallery from "./components/InteractiveGallery";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import PricingSection from "./components/PricingSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CoreAttribution from "./components/CoreAttribution";
import { X, Trash2, ShoppingCart, Zap, CheckCircle } from "lucide-react";

export default function App() {
  // Pre-configured premium models inspired by Peugeot FTR future concept bicycle
  const models: BikeModel[] = [
    {
      id: "model-a",
      name: "Cruxon Model A",
      seriesLetter: "A",
      tagline: "Aerodynamic Velodrome Champion",
      description: "The definitive track configuration optimized raw velocity. Under full sprints, overlapping IM8 carbon solid-disc aerodynamic rims and specialized wind-cheating cockpits shave critical drag coefficient parameters.",
      price: 1250,
      specifications: {
        topSpeed: "85 km/h",
        range: "120 km",
        battery: "950 Wh Solid-State",
        weight: "6.8 kg",
        aeroDrag: "0.180 Cd",
        frameMaterial: "IM8 Layered Carbon Monocoque",
      },
      accentColor: "#38bdf8", // Space blue
      glowColor: "rgba(56, 189, 248, 0.45)",
      wheelStyle: WheelStyle.DISC,
      badge: "Track Optimized",
    },
    {
      id: "model-s",
      name: "Cruxon Model S",
      seriesLetter: "S",
      tagline: "Frictionless Hubless Urban Avant-Garde",
      description: "Agile, lightweight metropolis glide. Utilizing double-outer rotating hollow hubless rings on non-contact dust-sealed magnetic inductiontracks to entirely eliminate mechanical friction.",
      price: 1540,
      specifications: {
        topSpeed: "45 km/h",
        range: "140 km",
        battery: "950 Wh Solid-State",
        weight: "5.9 kg",
        aeroDrag: "0.220 Cd",
        frameMaterial: "Titanium-Resin Nano Framework",
      },
      accentColor: "#06b6d4", // Electric cyan
      glowColor: "rgba(6, 182, 212, 0.45)",
      wheelStyle: WheelStyle.HOLLOW,
      badge: "Urban Agile",
    },
    {
      id: "model-d",
      name: "Cruxon Model D",
      seriesLetter: "D",
      tagline: "Tough Tri-Spoke Endurance Athlete",
      description: "The complete multi-terrain composite tri-spoke adventure commuter. Integrated carbon elastomer micro-shock absorbers combined with low-slug gravity bracket structures yield exceptional stability.",
      price: 1780,
      specifications: {
        topSpeed: "65 km/h",
        range: "115 km",
        battery: "950 Wh Solid-State",
        weight: "7.2 kg",
        aeroDrag: "0.205 Cd",
        frameMaterial: "Tantalum Carbon-Steel Alloy",
      },
      accentColor: "#f97316", // Copper orange
      glowColor: "rgba(249, 115, 22, 0.45)",
      wheelStyle: WheelStyle.TRI_SPOKE,
      badge: "Endurance Aero",
    },
  ];

  const [activeModel, setActiveModel] = useState<BikeModel>(models[0]);
  const [cart, setCart] = useState<{ [key: string]: { model: BikeModel; count: number } }>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const handleSelectModel = (model: BikeModel) => {
    setActiveModel(model);
  };

  const handleAddToCart = (model: BikeModel, count: number = 1) => {
    setCart((prev) => {
      const existing = prev[model.id];
      const nextCount = existing ? existing.count + count : count;
      return {
        ...prev,
        [model.id]: {
          model,
          count: nextCount,
        },
      };
    });
    // Visual trigger slide open reservation drawer for feedback
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  // Trigger modal checkout payment simulator
  const handleCheckoutSubmit = () => {
    setIsPaying(true);
    setTimeout(() => {
      setPaySuccess(true);
      setIsPaying(false);
      clearCart();
    }, 2500);
  };

  const handleCloseReceipt = () => {
    setPaySuccess(false);
    setCartOpen(false);
  };

  const openCustomizerScroll = () => {
    const section = document.getElementById("ai-customizer-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculated variables
  const cartItems = Object.values(cart) as Array<{ model: BikeModel; count: number }>;
  const cartCount = cartItems.reduce((acc: number, item) => acc + item.count, 0);
  const cartTotalValue = cartItems.reduce((acc: number, item) => acc + item.model.price * item.count, 0);

  return (
    <div className="relative min-h-screen bg-[#02050c] text-white">
      {/* Floating navigation overlay */}
      <Navbar 
        cartCount={cartCount} 
        openCartModal={() => setCartOpen(true)} 
        openCustomizer={openCustomizerScroll}
      />

      {/* Main layout flow */}
      <main>
        {/* 1. Hero Presenter Section */}
        <HeroSection
          models={models}
          activeModel={activeModel}
          onSelectModel={handleSelectModel}
          onAddToCart={handleAddToCart}
        />

        {/* 2. Telemetry specifications Section */}
        <SpecsSection activeModel={activeModel} />

        {/* 3. Variants Selector and Comparative Section */}
        <VariantsSection
          models={models}
          activeModel={activeModel}
          onSelectModel={handleSelectModel}
          onAddToCart={handleAddToCart}
        />

        {/* 4. AI Study customizer powered by server Gemini API */}
        <AICustomizer 
          models={models} 
          onSelectModel={handleSelectModel} 
        />

        {/* 5. Macro Detail Gallery Section */}
        <InteractiveGallery />

        {/* 6. Pre-order Pricing package allocations */}
        <PricingSection 
          activeModel={activeModel} 
          onAddToCart={handleAddToCart} 
        />

        {/* 7. Logs & Testimonials Section */}
        <TestimonialsSection />

        {/* 8. FAQs accordian system */}
        <FaqSection />

        {/* 9. Comm triggers Laboratory coordinates */}
        <ContactSection />
      </main>

      {/* Footer copyright grids */}
      <Footer />

      {/* Reusable Core Floating Attribution */}
      <CoreAttribution variant="floating" />

      {/* Slide-out Pre-Order Reservation Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#02050cc0] backdrop-blur-md flex justify-end"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full h-full bg-[#050916] border-l border-white/5 flex flex-col justify-between shadow-2xl relative"
            >
              
              {/* Receipt / success template */}
              {paySuccess ? (
                <div className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-6 text-emerald-400 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-[8px] text-emerald-400 tracking-widest block uppercase">RESERVATION SECURED</span>
                  <h3 className="font-display font-bold text-white text-lg tracking-wide mt-1.5">
                    Pre-order Queue Assigned
                  </h3>
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed font-sans font-light">
                    Your customized FTR build queue slot holds an active digital identifier. Watch your email inbox for laboratory telemetry status reports as we begin monocoque composites assembly.
                  </p>
                  <button
                    onClick={handleCloseReceipt}
                    className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-mono text-[10px] tracking-wider uppercase mt-8 transition-colors cursor-pointer"
                  >
                    CLOSE PORTAL
                  </button>
                </div>
              ) : (
                <>
                  {/* Drawer Header */}
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[8px] text-sky-400 tracking-widest block uppercase font-bold">RESERVATION LIST</span>
                      <h3 className="font-display font-medium text-white text-sm tracking-wide mt-1">
                        Active FTR Pre-orders ({cartCount})
                      </h3>
                    </div>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                      aria-label="Close Cart"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Drawer Items stream list */}
                  <div className="flex-grow p-6 overflow-y-auto space-y-4 no-scrollbar">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-20 flex flex-col items-center justify-center">
                        <ShoppingCart className="w-10 h-10 text-gray-600 mb-4 stroke-[1.5]" />
                        <p className="font-display font-semibold text-white text-xs">No active reservations found</p>
                        <p className="text-gray-500 text-[11px] font-sans mt-1.5 max-w-[200px] leading-relaxed">
                          Add the S, A, or D class models to register your hand-built queue slot.
                        </p>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div 
                          key={item.model.id}
                          className="flex items-start justify-between bg-white/2 p-3.5 rounded-xl border border-white/5"
                        >
                          <div>
                            <span className="font-mono text-[8px] text-gray-500 uppercase leading-none block">
                              MOLD S-{item.model.seriesLetter} CLAS
                            </span>
                            <h4 className="font-display font-bold text-white text-xs mt-1.5">
                              {item.model.name}
                            </h4>
                            <p className="text-sky-400 text-[10px] font-mono mt-0.5 font-bold">
                              {item.count} Allocation Slot{item.count > 1 ? "s" : ""}
                            </p>
                            <span className="font-mono text-gray-300 text-[10px] block mt-1.5">
                              ${item.model.price.toLocaleString()} each
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemoveFromCart(item.model.id)}
                            className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Drawer Footer controls */}
                  <div className="p-6 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-baseline text-xs leading-none">
                      <span className="font-mono text-gray-500 uppercase">ESTIMATED VALUATION</span>
                      <span className="font-display text-white font-bold text-lg">
                        ${cartTotalValue.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckoutSubmit}
                      disabled={cartItems.length === 0 || isPaying}
                      className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-display text-xs font-bold tracking-widest uppercase rounded-xl shadow-lg shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isPaying ? (
                        "SECURING DISPATCH CHAIN..."
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-white" />
                          PROCEED FILE DISPATCH COMPLETE
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-center text-gray-500 font-mono">
                      SECURE CHECKOUT TERMINAL • NANTES CENTRAL v92 ENGINE
                    </p>
                  </div>
                </>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
