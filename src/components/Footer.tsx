import { Cpu, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-slate-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-xs text-gray-500 font-sans">
        
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-6.5 h-6.5 border border-white/20 rounded-xs flex items-center justify-center">
            <div className="w-3 h-0.5 bg-white rotate-45"></div>
          </div>
          <span className="font-display font-light text-white text-md tracking-[0.25em] text-[13px] uppercase">
            FTR SHOWROOM
          </span>
        </div>

        {/* Legal copyrights */}
        <div className="text-center md:text-left text-[11px] text-gray-500 font-light font-sans max-w-sm">
          <span>© {new Date().getFullYear()} Future Bicycle Showroom. All engineering patents configured under aerospace standards. Built via AI Studio.</span>
        </div>

        {/* Back to top selector trigger */}
        <button
          onClick={handleScrollTop}
          className="p-2 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/5 hover:text-white transition-all cursor-pointer flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest block text-center"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          TOP
        </button>
      </div>
    </footer>
  );
}
