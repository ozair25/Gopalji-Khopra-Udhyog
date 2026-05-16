import { motion } from 'motion/react';
import { Award, ShieldCheck, Globe, History } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="section-padding bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-gold-accent/20">
                <img 
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Coconut Processing" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-gold-accent p-10 rounded-2xl shadow-2xl text-warm-white max-w-xs border border-white/20">
                <div className="text-4xl font-serif mb-2">25+</div>
                <div className="text-[10px] uppercase font-bold tracking-[0.2em]">Years of Wholesale <br />Excellence in India</div>
             </div>
          </div>

          <div>
             <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block italic">Our Legacy</span>
             <h2 className="text-4xl md:text-5xl font-serif text-coconut-brown mb-8 leading-tight">Reliable Global Manufacturer <br /><span className="italic-display font-light text-gold-accent">& Export Partner</span></h2>
             
             <div className="space-y-8 mb-12">
                <p className="text-base text-coconut-brown/60 leading-relaxed font-medium">
                  Established with a vision to streamline the coconut ingredient supply chain, Gopalji Khopra Udhyog has grown from a regional producer into a preferred manufacturing partner for international food conglomerates.
                </p>
                <p className="text-base text-coconut-brown/60 leading-relaxed font-medium">
                  We specialize in high-purity desiccated coconut and flakes, leveraging proximity to India's finest coconut belts to ensure a year-round, consistent supply unaffected by seasonal fluctuations.
                </p>
             </div>

             <div className="grid grid-cols-2 gap-8 border-t border-gold-accent/10 pt-10">
                <div className="flex gap-4">
                   <div className="text-gold-accent"><History size={24} /></div>
                   <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-coconut-brown mb-1">Standardized</h4>
                      <p className="text-[10px] text-coconut-brown/50">Unified process protocols</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="text-gold-accent"><Globe size={24} /></div>
                   <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-coconut-brown mb-1">Export Grade</h4>
                      <p className="text-[10px] text-coconut-brown/50">Shipping to 20+ markets</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Certifications Sub-section */}
        <div id="certifications" className="mt-32 pt-20 border-t border-gold-accent/10">
           <div className="text-center mb-16">
              <span className="text-gold-accent/50 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block italic">Regulatory Compliance</span>
              <h3 className="text-2xl font-serif text-coconut-brown opacity-60">Accredited Food-Safety Standards</h3>
           </div>
           
           <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
              {[
                { icon: ShieldCheck, label: "FSSAI Certified" },
                { icon: Award, label: "HACCP Gold Standard" },
                { icon: ShieldCheck, label: "GMP Compliant" },
                { icon: Award, label: "ISO 22000" }
              ].map((cert, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4 group">
                   <div className="w-16 h-16 rounded-full border-2 border-coconut-brown/20 flex items-center justify-center text-coconut-brown">
                      <cert.icon size={32} strokeWidth={1} />
                   </div>
                   <span className="text-[10px] uppercase font-bold tracking-widest">{cert.label}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
