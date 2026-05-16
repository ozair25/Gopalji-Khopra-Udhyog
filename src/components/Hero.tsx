import { motion } from 'motion/react';
import { ArrowRight, Send, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section: 60% Content */}
        <div className="w-full lg:w-[60%] bg-[#E5D5BC] p-8 lg:p-20 flex flex-col justify-center relative min-h-[600px]">
          <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#6B4A2E" strokeWidth="0.5" fill="none"/>
              <path d="M50 5 L50 95 M5 50 L95 50" stroke="#6B4A2E" strokeWidth="0.2"/>
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-coconut-brown"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-coconut-brown/60">
                Est. 1984 | Premier Manufacturer
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] text-coconut-brown">
              Premium Food-Grade <br />
              <i className="font-light italic-display">Coconut Ingredients</i>
            </h1>

            <p className="text-lg text-coconut-brown/80 max-w-lg leading-relaxed font-medium">
              Wholesale manufacturing for bakeries, confectioneries, and industrial food producers. Pure Indian quality, exported globally.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#contact"
                className="bg-coconut-brown text-warm-white px-10 py-5 text-xs font-bold uppercase tracking-widest shadow-2xl shadow-coconut-brown/20 hover:bg-gold-accent transition-colors flex items-center gap-2"
              >
                Bulk Inquiry
                <ArrowRight size={14} />
              </a>
              <a 
                href="#specifications"
                className="border border-coconut-brown/30 px-10 py-5 text-xs font-bold uppercase tracking-widest text-coconut-brown hover:bg-warm-white/30 transition-colors"
              >
                Product Specs
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-coconut-brown/10">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold font-serif">100%</div>
                <div className="text-[9px] uppercase tracking-wider font-bold opacity-40">Pure Grade</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold font-serif">50+</div>
                <div className="text-[9px] uppercase tracking-wider font-bold opacity-40">Global Partners</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold font-serif italic text-gold-accent">ISO</div>
                <div className="text-[9px] uppercase tracking-wider font-bold opacity-40">Certified Lab</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Section: 40% Lead Gen Form */}
        <div className="w-full lg:w-[40%] bg-warm-white p-8 lg:p-16 flex flex-col justify-between border-l border-gold-accent/10 shadow-[-20px_0_40px_rgba(0,0,0,0.02)] min-h-[600px]">
          <div className="space-y-10">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold-accent mb-3">Lead Generation</h3>
              <h2 className="text-3xl font-serif text-coconut-brown">Strategic B2B Inquiry</h2>
              <p className="text-xs text-coconut-brown/50 mt-3 font-medium">Request current market pricing and bulk shipping details.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-coconut-brown/40 block">Business Name</label>
                  <input type="text" className="w-full border-b border-gold-accent/20 py-3 text-sm focus:border-gold-accent outline-none bg-transparent transition-colors" placeholder="Global Foods Ltd" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-coconut-brown/40 block">Contact Person</label>
                  <input type="text" className="w-full border-b border-gold-accent/20 py-3 text-sm focus:border-gold-accent outline-none bg-transparent transition-colors" placeholder="Commercial Lead" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-coconut-brown/40 block">Product Type</label>
                  <select className="w-full border-b border-gold-accent/20 py-3 text-sm focus:border-gold-accent outline-none bg-transparent transition-colors appearance-none">
                    <option>Coconut Flakes</option>
                    <option>Coconut Powder</option>
                    <option>Desiccated Coconut</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-coconut-brown/40 block">Monthly Qty (MT)</label>
                  <input type="number" className="w-full border-b border-gold-accent/20 py-3 text-sm focus:border-gold-accent outline-none bg-transparent transition-colors" placeholder="50" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-coconut-brown text-warm-white text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-gold-accent transition-all flex items-center justify-center gap-3"
              >
                Submit Inquiry Profile <Send size={14} />
              </button>
              
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-gold-accent/10"></div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-gold-accent/40">Or</span>
                <div className="h-[1px] flex-1 bg-gold-accent/10"></div>
              </div>

              <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                Instant WhatsApp Chat <MessageCircle size={14} />
              </a>
            </form>
          </div>

          <div className="pt-10 border-t border-gold-accent/10 mt-12">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-cream-light rounded-xl text-gold-accent">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase text-coconut-brown/40 tracking-widest">Direct Commercial WhatsApp</p>
                <p className="text-base font-bold text-coconut-brown tracking-tight">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
