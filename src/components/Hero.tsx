import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollIndicator from './ScrollIndicator';

const bg2 = "https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto:good,w_900/v1780232972/hero_image_sy7ovp.png";

export default function Hero() {
  return (
    <section id="hero" className="relative ml-0 min-h-screen bg-[#E3D3BE] text-[#1C110A] flex flex-col justify-between overflow-hidden border-b border-[#8C6239]/15" aria-label="Gopalji Khopra Premium Hero">
      
      {/* 1. Split-Screen Hero Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 xs:px-6 sm:px-12 pt-28 pb-8 xs:pt-32 xs:pb-8 sm:pt-36 sm:pb-12 lg:pt-40 lg:pb-16 xl:pt-44 xl:pb-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center lg:items-start relative z-10">
        
        {/* Left Column: Premium Typography & CTAs (50-55% width) */}
        <div className="lg:col-span-5 flex flex-col text-left space-y-6 xs:space-y-8 max-w-xl order-1">
          <div className="flex items-center gap-2 xs:gap-3">
            <div className="h-[1px] w-8 xs:w-11 bg-[#6B4A2E]"></div>
            <span className="text-[8.5px] xs:text-[10px] font-bold uppercase tracking-[0.2em] xs:tracking-[0.35em] text-[#6B4A2E]/85">
              Est. 2017 | Premium Manufacturer
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-4xl xs:text-5xl sm:text-6xl font-serif font-black leading-[1.1] text-[#4A2E1F] drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              Premium Food-Grade <br />
              <span className="text-[#8C6239] italic font-light italic-display">Coconut Ingredients</span>
            </h1>
            <p className="text-sm xs:text-base sm:text-lg text-[#3D2B1F]/95 leading-relaxed font-semibold pt-2">
              Wholesale manufacturing for bakeries, confectioneries, and industrial food producers. Pure Central Indian quality, delivered with absolute hygiene and moisture precision across the nation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap sm:flex-nowrap gap-3 xs:gap-4 pt-2"
          >
            <Link 
              to="/contact-us"
              className="bg-[#6B4A2E] text-white px-5 xs:px-8 py-3.5 xs:py-4 text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#6B4A2E]/20 hover:bg-[#8C6239] transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2 shrink-0 rounded-lg animate-pulse"
            >
              Bulk Inquiry
              <ArrowRight size={14} />
            </Link>
            <Link 
              to="/products-services"
              className="border border-[#6B4A2E]/30 bg-[#6B4A2E]/10 backdrop-blur-sm px-5 xs:px-8 py-3.5 xs:py-4 text-xs font-bold uppercase tracking-widest text-[#4A2E1F] hover:bg-[#6B4A2E]/20 transition-all hover:translate-y-[-2px] text-center shrink-0 rounded-lg"
            >
              Explore Products
            </Link>
          </motion.div>

          {/* Core Trust Parameters */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 xs:pt-8 border-t border-[#6B4A2E]/10"
          >
            <div>
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold font-serif text-[#4A2E1F]">100%</div>
              <div className="text-[8px] xs:text-[9px] uppercase tracking-wider font-extrabold opacity-65 text-[#4A2E1F] mt-1">Pure Grade</div>
            </div>
            <div>
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold font-serif text-[#4A2E1F]">50+</div>
              <div className="text-[8px] xs:text-[9px] uppercase tracking-wider font-extrabold opacity-65 text-[#4A2E1F] mt-1">Global Partners</div>
            </div>
            <div>
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold font-serif italic text-[#8C6239] font-medium">ISO</div>
              <div className="text-[8px] xs:text-[9px] uppercase tracking-wider font-extrabold opacity-65 text-[#4A2E1F] mt-1">Certified Lab</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium Visual Showcase with bg2.png (55-60% width) */}
        <div className="lg:col-span-7 flex items-start justify-center lg:justify-end relative w-full order-2 mt-8 lg:mt-0 lg:pt-[54px]">
          {/* Subtle elegant rotating background halo as background but NOT inside a boxed frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E5D5BC]/20 to-transparent opacity-50 rounded-full blur-3xl -z-10 pointer-events-none transform scale-95 lg:translate-x-12"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center lg:justify-end bg-[#E3D3BE]"
            style={{ backgroundColor: '#E3D3BE' }}
          >
            <img 
              src={bg2} 
              alt="Gopalji Khopra Premium Product Composition" 
              className="w-full object-contain object-right-bottom select-none cursor-default origin-bottom transition-transform duration-500 scale-100 translate-y-8 sm:scale-105 sm:translate-y-4 lg:scale-[1.40] lg:-translate-y-[10%]"
              style={{ 
                backgroundColor: '#E3D3BE', 
                mixBlendMode: 'darken',
                maxHeight: '696px',
              }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="947"
              height="691"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

      </div>

      {/* Dynamic Scroll Indicator linking to the Home Overview Section */}
      <ScrollIndicator targetId="home-overview" className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex" label="Explore Gopalji" />

    </section>
  );
}
