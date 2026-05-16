import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Truck, Factory, Package, Recycle } from 'lucide-react';

const reasons = [
  {
    icon: Factory,
    title: "Hygienic Manufacturing",
    desc: "State-of-the-art facility ensuring 100% untouched-by-hand processing standards."
  },
  {
    icon: ShieldCheck,
    title: "Consistent Quality",
    desc: "Rigorous laboratory testing for moisture, fat content, and shelf-life stability."
  },
  {
    icon: Truck,
    title: "Reliable Bulk Supply",
    desc: "Seamless logistics network ensuring timely delivery for high-volume orders."
  },
  {
    icon: Package,
    title: "Flexible Packaging",
    desc: "Customizable packing formats from 10kg kraft bags to 1MT industrial liners."
  },
  {
    icon: Recycle,
    title: "Sustainable Sourcing",
    desc: "Direct-from-farm partnerships focused on ethical and sustainable coconut collection."
  },
  {
    icon: CheckCircle2,
    title: "Industry Experience",
    desc: "Decades of expertise in coconut processing for global food and supply markets."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-warm-white relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute -right-20 top-0 w-96 h-96 bg-gold-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block italic">The Difference</span>
            <h2 className="text-4xl md:text-5xl font-serif text-coconut-brown mb-8">Why Food Brands <br /><span className="italic-display font-light">Trust</span> Gopalji</h2>
            <p className="text-coconut-brown/60 text-sm leading-relaxed mb-10 max-w-sm font-medium">
              We don't just supply ingredients; we build supply chain reliability for businesses that cannot compromise on quality.
            </p>
            <div className="bg-cream-light/50 p-8 rounded-3xl border border-gold-accent/10">
               <div className="text-3xl font-serif text-coconut-brown mb-2">99.8%</div>
               <div className="text-[10px] uppercase font-bold tracking-widest text-gold-accent italic">Quality Maintenance Rate</div>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8 gap-y-12">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-5 p-6 hover:bg-cream-light/30 rounded-3xl transition-colors"
              >
                <div className="w-14 h-14 bg-warm-white shadow-lg border border-gold-accent/10 rounded-2xl flex items-center justify-center text-gold-accent">
                  <reason.icon size={26} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-coconut-brown mb-3">{reason.title}</h3>
                  <p className="text-sm text-coconut-brown/50 leading-relaxed font-medium">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
