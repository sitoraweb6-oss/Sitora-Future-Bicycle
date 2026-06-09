import { Star, MessageSquareCode, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  metric: string;
  rating: number;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Lead Concept Dev, AeroCycles Ltd",
      avatar: "/images/avatar-1.svg",
      quote: "We cross-analyzed the Cruxon Model A in our wind chamber against leading carbon track configurations. The composite solid disc wheel geometry shaved nearly 18 watts off drag calculations at 45km/h. A masterpiece of structural fluid dynamics.",
      metric: "WIND CHAMBER: -18W SAVED",
      rating: 5,
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Grand Prix Velodrome Sprint Champion",
      avatar: "/images/avatar-2.svg",
      quote: "The instant acceleration from the Magneto Rear-Hub motor is astonishing. Under complete full-load sprints, there's absolutely none of the frame flex you usually feel on light carbon. Biometric ignition triggers seamlessly.",
      metric: "PROPULSION SPEED: 85 KM/H MAX",
      rating: 5,
    },
    {
      id: 3,
      name: "Devon Sinclair",
      role: "Futurist & Urban Commuter",
      avatar: "/images/avatar-3.svg",
      quote: "My FTR S-Class commuter gets comments everywhere on my morning ride. The hollow hubless rims are an absolute design triumph—and they glide seamlessly. The interactive active cyan light pulse makes night rides incredibly safe.",
      metric: "LOGGED METROPOLIS: 750+ KM",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials-section" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="font-mono text-[9px] text-blue-400 tracking-[0.3em] uppercase block">
            VERIFIABLE LOGS
          </span>
          <h2 className="font-display text-2xl md:text-3.5xl font-bold text-white mt-1.5 tracking-tight">
            Valued Endorsements
          </h2>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xl mx-auto font-light">
            Read critical telemetry evaluations and testimonials from velodrome world champions, design directors, and urban commuters.
          </p>
        </div>

        {/* Testimonials Grid bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="glass-panel rounded-2xl p-6 md:p-8 hover:border-white/10 group transition-all duration-300 flex flex-col justify-between shadow-lg relative"
            >
              {/* Giant abstract quotation decorator in backing corner */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-white/[0.02] pointer-events-none group-hover:scale-110 duration-500 transition-transform" />

              <div>
                {/* 5 Star Rating group */}
                <div className="flex gap-1 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-blue-400 text-blue-400 stroke-none" />
                  ))}
                </div>

                <p className="text-gray-300 text-xs leading-relaxed font-sans font-light italic mb-6">
                  "{test.quote}"
                </p>
              </div>

              {/* Rider bottom info row */}
              <div className="border-t border-white/5 pt-5 mt-auto">
                <div className="flex items-center gap-3">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-display font-bold text-white text-xs leading-tight">
                      {test.name}
                    </h5>
                    <p className="text-gray-500 text-[10px] uppercase font-mono mt-0.5 leading-none">
                      {test.role}
                    </p>
                  </div>
                </div>

                {/* Simulated Telemetry Metric log block */}
                <div className="mt-4 flex bg-white/2 p-2 rounded-xl border border-white/5 items-center justify-between font-mono text-[8px] text-gray-400">
                  <span>LOGGED PERFORMANCE TELEMETRY</span>
                  <span className="text-sky-400 font-bold">{test.metric}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
