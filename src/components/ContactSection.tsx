import React, { useState } from "react";
import { Send, Mail, MapPin, Calendar, Clock, Globe } from "lucide-react";

export default function ContactSection() {
  const [newsEmail, setNewsEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [subbing, setSubbing] = useState(false);

  // Message Form States
  const [contactMessage, setContactMessage] = useState("");
  const [sentMsg, setSentMsg] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubbing(true);
    setTimeout(() => {
      setSubbed(true);
      setSubbing(false);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage) return;
    setTimeout(() => {
      setSentMsg(true);
    }, 1200);
  };

  const officeLocation = {
    city: "Nantes, France",
    coords: "47.2184° N, 1.5536° W",
    hours: "09:00 - 18:00 CEST",
  };

  return (
    <section id="contact-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-blue-500/[0.015] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] bg-blue-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Column: Coordinates & lab locations (ColSpan 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
          <div>
            <span className="font-mono text-[9px] text-blue-400 tracking-[0.3em] uppercase block">
              COURIER HUB
            </span>
            <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white mt-1.5 tracking-tight">
              Contact Design Laboratories
            </h2>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed font-sans font-light">
              We operate exclusively through physical reservation allocations and private consultation hubs. Get in touch to schedule private velodrome sprint testing in France.
            </p>
          </div>

          <div className="space-y-4">
            {/* Location block */}
            <div className="flex bg-white/2 p-4 rounded-xl border border-white/5 gap-3.5 items-start">
              <span className="p-2.5 bg-white/3 rounded-xl text-sky-400">
                <MapPin className="w-5 h-5 stroke-[1.5]" />
              </span>
              <div className="text-xs">
                <p className="font-mono text-[8px] text-gray-500 uppercase leading-none">Nantes Manufacturing Center</p>
                <p className="font-display font-semibold text-white mt-1.5">{officeLocation.city}</p>
                <p className="font-mono text-gray-400 text-[10px] mt-0.5">{officeLocation.coords}</p>
              </div>
            </div>

            {/* Time office block */}
            <div className="flex bg-white/2 p-4 rounded-xl border border-white/5 gap-3.5 items-start">
              <span className="p-2.5 bg-white/3 rounded-xl text-sky-400">
                <Clock className="w-5 h-5 stroke-[1.5]" />
              </span>
              <div className="text-xs">
                <p className="font-mono text-[8px] text-gray-500 uppercase leading-none">Available consultation slots</p>
                <p className="font-display font-semibold text-white mt-1.5">{officeLocation.hours}</p>
                <p className="font-mono text-gray-400 text-[10px] mt-0.5">Monday through Friday, CEST</p>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span>DISPATCH CHANNELS SERVICED INTERNATIONALLY</span>
          </div>
        </div>

        {/* Right Column: Pre-sales message / Newsletter bento (ColSpan 7) */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-6">
          
          {/* Bento Sub-Card A: Newsletter neon block */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 hover:border-white/10 duration-300 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-sky-400/80 tracking-widest uppercase block mb-1">
                NEWSLETTER REGISTRATION
              </span>
              <h4 className="font-display text-md font-bold text-white tracking-wide">
                Get Laboratory Dispatch Updates
              </h4>
              <p className="text-gray-400 text-xs mt-2.5 leading-relaxed font-sans font-light">
                Secure priority alerts on wind testing results, future physical stock releases, and new active rim diagnostic upgrades.
              </p>
            </div>

            {/* Form */}
            <div className="mt-6">
              {!subbed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 bg-black/40 border border-white/5 rounded-xl p-1.5">
                  <input
                    type="email"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter email for telemetry updates"
                    className="w-full bg-transparent border-none text-white placeholder-gray-600 text-xs px-2.5 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subbing}
                    className="px-6 py-2 bg-white hover:bg-blue-50 disabled:opacity-50 text-slate-950 font-mono text-[9px] font-bold rounded-lg tracking-wider uppercase transition-all shrink-0 cursor-pointer"
                  >
                    {subbing ? "TRANSMITTING..." : "SUBSCRIBE"}
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-450 rounded-xl text-xs flex justify-between items-center text-emerald-400 font-medium">
                  <span>Connection secured. Welcome to FTR updates list.</span>
                  <span className="font-mono text-[9px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded">ONLINE</span>
                </div>
              )}
            </div>
          </div>

          {/* Bento Sub-Card B: Pre-sales Messaging block */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 hover:border-white/10 duration-300 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase block mb-1">
                SECURE TELEMETRY FEED
              </span>
              <h4 className="font-display text-md font-bold text-white tracking-wide font-medium">
                Submit private fabrication query
              </h4>
            </div>

            <div className="mt-4">
              {!sentMsg ? (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-sky-500/30 text-white text-xs font-sans placeholder-gray-650 focus:outline-none transition-all resize-none"
                    placeholder="Describe custom size configurations or specify direct velodrome questions..."
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-sky-500 hover:border-sky-500 hover:text-white text-white font-mono text-[10px] font-bold rounded-xl tracking-wider uppercase transition-all flex items-center gap-1.5 mt-2 cursor-pointer ml-auto"
                  >
                    <Send className="w-3 h-3 text-white" />
                    SEND MESSAGE
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl text-xs font-medium text-center">
                  Message uploaded to secure Nantes servers. A design director will contact you shortly.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
