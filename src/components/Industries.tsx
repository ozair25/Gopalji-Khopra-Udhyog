import React from 'react';
import { motion } from 'motion/react';
import { Cookie, Candy, Factory, Briefcase, Sparkles, Utensils, CheckCircle2 } from 'lucide-react';

const specializationsAndIndustries = [
  {
    title: "Bakeries",
    icon: Cookie,
    desc: "Aroma-rich coconut flakes and powders that optimize taste and texture in artisanal cookies, biscuits, and cakes."
  },
  {
    title: "Confectioneries",
    icon: Candy,
    desc: "Consistent high-fat grinds preferred for manufacturing chocolate candy fillings, truffles, and traditional premium sweets."
  },
  {
    title: "Food Manufacturers",
    icon: Factory,
    desc: "Bulk-tonnage ingredients sorted hygenically under FSSAI licenses to fit high-speed packaged food lines."
  },
  {
    title: "Wholesale Traders",
    icon: Briefcase,
    desc: "Uninterrupted national logistics, fully documented billing, and year-round stable supply support for stockists."
  },
  {
    title: "Snack Processors",
    icon: Sparkles,
    desc: "Dehydrated, clean, moisture-optimized flakes serving nutrition bars, roasted mixtures, and premium granola blends."
  },
  {
    title: "Hospitality & Catering",
    icon: Utensils,
    desc: "High-yield premium desiccated coconut and copra for hotel groups, catering networks, and restaurant chains."
  }
];

export default function Industries() {
  return (
    <section id="industries" className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#8C6239]/10 text-[#4A2E1F]">
      
      {/* Background accents */}
      <div className="absolute right-0 top-1/2 w-[300px] h-[300px] bg-[#E5D5BC]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-2 block italic">Enterprise Client Sectors</span>
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-serif text-[#4A2E1F] font-black leading-tight">
            Specializations & <span className="italic-display font-light text-[#8C6239]">Industries We Serve</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#8C6239] mx-auto mt-3 mb-4" />
          <p className="text-[#4A2E1F]/70 text-xs sm:text-sm max-w-xl mx-auto font-semibold">
            Supplying standardized, food-grade coconut ingredients to diverse business scales and industrial kitchens nationwide.
          </p>
        </div>

        {/* Concise Grid Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializationsAndIndustries.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[#D8B26A]/25 hover:border-[#8C6239]/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#EFE6D5]/40 flex items-center justify-center text-[#8C6239] mb-4 group-hover:bg-[#6B4A2E] group-hover:text-white transition-colors duration-400">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  
                  <h3 className="font-serif text-lg text-[#4A2E1F] font-bold mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-[#4A2E1F]/70 leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[#8C6239]/5 mt-4 flex items-center gap-1.5 text-[9px] text-[#8C6239] font-bold tracking-wider uppercase">
                  <CheckCircle2 size={10} className="text-[#25D366]" /> Approved Food-Grade Standard
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
