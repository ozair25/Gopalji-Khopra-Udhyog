import { motion } from 'motion/react';
import { Package, Truck, Layers } from 'lucide-react';

export default function QualityControl() {
  return (
    <section id="quality" className="bg-cream-light/30">
      {/* Specifications Sub-section */}
      <div id="specifications" className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block italic">Technical Data</span>
          <h2 className="text-3xl md:text-5xl font-serif text-coconut-brown mb-4">Standard <span className="italic-display font-light">Specifications</span></h2>
          <p className="text-coconut-brown/50 text-sm max-w-xl mx-auto">International food-grade benchmarks maintained across every manufacturing batch.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gold-accent/10 bg-warm-white shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-coconut-brown text-warm-white uppercase text-[10px] tracking-[0.2em] font-bold italic">
                <th className="py-6 px-10">Characteristic</th>
                <th className="py-6 px-10 border-l border-warm-white/10">Requirement</th>
                <th className="py-6 px-10 border-l border-warm-white/10 hidden md:table-cell">Standard Method</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-coconut-brown/80">
              {[
                { key: "Texture", val: "Fine, Medium, Long-cut Flakes", method: "Visual Grading" },
                { key: "Moisture Content", val: "Maximum 3.0%", method: "Vaccum Oven" },
                { key: "Natural Fat (Oil)", val: "65.0% - 68.0%", method: "Soxhlet Extraction" },
                { key: "Color", val: "Milky White", method: "Reflectance meter" },
                { key: "Shelf Life", val: "12-18 Months", method: "Cool/Dry Storage" },
                { key: "Food Grade Standards", val: "FSSAI & HACCP Compliant", method: "Third-party Audit" }
              ].map((row, idx) => (
                <tr key={idx} className="border-b last:border-0 border-gold-accent/5 hover:bg-gold-accent/5 transition-colors">
                  <td className="py-5 px-10 font-bold">{row.key}</td>
                  <td className="py-5 px-10 italic text-gold-accent">{row.val}</td>
                  <td className="py-5 px-10 text-coconut-brown/50 hidden md:table-cell">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Packaging Sub-section */}
      <div id="packaging" className="section-padding bg-coconut-brown text-warm-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 flex items-center justify-center -z-0">
            <Package size={800} className="stroke-[0.5]" />
         </div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block italic">Industrial Logistics</span>
                  <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Packaging <br /><span className="italic-display font-light text-gold-accent">Infrastructure</span></h2>
                  <p className="text-warm-white/70 text-base mb-10 leading-relaxed font-medium">
                    We maintain a diverse inventory of packaging solutions designed to preserve the moisture-content and aroma integrity of coconut ingredients during international transit.
                  </p>

                  <div className="space-y-6">
                    {[
                      { icon: Layers, title: "Multi-layered Protection", desc: "4-ply Kraft paper bags with inner LDPE liners for air-tight seal." },
                      { icon: Package, title: "Custom Bulk Units", desc: "Available in 10kg, 25kg, and 50kg industrial HDPE sacks." },
                      { icon: Truck, title: "Dispatch Efficiency", desc: "Standard palletized loading for fast port turnaround and unloading." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 group">
                         <div className="shrink-0 w-12 h-12 rounded-xl bg-warm-white/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-coconut-brown transition-all">
                           <item.icon size={20} />
                         </div>
                         <div>
                            <h4 className="font-serif text-lg mb-1">{item.title}</h4>
                            <p className="text-xs text-warm-white/50 leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="aspect-[4/5] rounded-3xl overflow-hidden bg-warm-white/5 border border-warm-white/10 flex flex-col justify-end p-6 group"
                  >
                    <img 
                      src="" 
                      alt="Bulk Sack" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="relative z-10 w-full bg-coconut-brown/80 backdrop-blur-sm p-4 rounded-xl border border-warm-white/10">
                       <span className="text-[10px] uppercase tracking-widest font-bold">Bulk Sacks</span>
                    </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
