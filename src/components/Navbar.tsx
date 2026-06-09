import { useState } from "react";
import { Search, ShoppingBag, Menu, X, Landmark, Cpu, Layers, HelpCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  cartCount: number;
  openCartModal: () => void;
  openCustomizer: () => void;
}

export default function Navbar({ cartCount, openCartModal, openCustomizer }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "Concept", href: "#vector-showcase" },
    { name: "Specs", href: "#specifications-section" },
    { name: "Customizer", href: "#ai-customizer-section", focus: true },
    { name: "Gallery", href: "#gallery-section" },
    { name: "Tiers", href: "#pricing-section" },
    { name: "FAQ", href: "#faq-section" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3">
        {/* Sleek Center-Floating Glassmorphic navbar frame */}
        <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-xl">
          
          {/* Logo Brand FTR (inspired by photo) */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 border-2 border-white rounded-sm flex items-center justify-center group-hover:border-blue-400 group-hover:scale-105 transition-all">
              <div className="w-4 h-1 bg-white group-hover:bg-blue-400 rotate-45 transition-colors"></div>
            </div>
            <span className="font-display text-lg font-light tracking-[0.3em] uppercase text-white group-hover:text-blue-200 transition-colors">
              FTR
            </span>
          </a>

          {/* Desktop Minimal Navigation Link rail */}
          <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] font-medium">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition-all duration-300 ${
                  item.focus 
                    ? "text-blue-400 hover:text-white border-b border-blue-400/30 pb-0.5" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Interaction widgets and triggers */}
          <div className="flex items-center gap-4">
            
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Generator CTA */}
            <button
              onClick={openCustomizer}
              className="hidden lg:flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-display text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              Configure
            </button>

            {/* Shopping Bag widget (Cart counter) */}
            <button
              onClick={openCartModal}
              className="relative p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-white text-slate-950 font-mono text-[9px] font-bold rounded-full flex items-center justify-center border border-white/10 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating search input window on demand */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -45 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4"
          >
            <div className="glass-panel rounded-xl p-3.5 shadow-2xl flex items-center gap-3">
              <Search className="w-4 h-4 text-sky-400 shrink-0" />
              <input
                type="text"
                placeholder="Search specs, accessories, variant schematics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-gray-500 text-xs focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile panel menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 w-full z-40 px-4 md:hidden overflow-hidden"
          >
            <div className="glass-panel-heavy rounded-2xl p-6 shadow-2xl border-t border-sky-500/20 flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold tracking-wider uppercase text-gray-300 hover:text-white py-1 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {item.name}
                </a>
              ))}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCustomizer();
                  }}
                  className="w-full py-2.5 rounded-xl bg-sky-500 text-white font-display text-xs font-semibold tracking-wider uppercase shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all"
                >
                  AI Customizer
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCartModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-display text-xs font-bold tracking-wider uppercase"
                >
                  View Reservation ({cartCount})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
