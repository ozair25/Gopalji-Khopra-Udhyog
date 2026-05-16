import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const products = [
  {
    title: "Coconut Flakes",
    desc: "Long-cut, snow-white flakes with rich natural aroma. Perfect for bakery topping and confectionery.",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/6/518895920/YP/XM/PH/147692506/whatsapp-image-2025-06-14-at-3-31-19-pm-500x500.jpeg",
    specs: "Moisture < 3%, Oil > 65%",
    packing: "10kg / 25kg Kraft Bags"
  },
  {
    title: "Desiccated Coconut",
    desc: "Finely grated, dried coconut meat. High-fat and medium-fat varieties available for diverse food processing roles.",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/6/518886167/EM/JZ/MS/147692506/whatsapp-image-2025-06-14-at-3-29-38-pm-1-500x500.jpeg",
    specs: "Fine/Medium Grade",
    packing: "25kg / 50kg HDPE Sacks"
  },
  {
    title: "Coconut Powder",
    desc: "Ultra-fine pulverized coconut. Dissolves instantly, ideal for curries, instant mixes, and beverage bases.",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/6/518892156/TP/DM/ZB/147692506/15-kg-gopalji-manbhavan-coconut-flakes-500x500.jpeg",
    specs: "Fat Content 65%+",
    packing: "Vacuum Packing Available"
  },
  {
    title: "Bulk Copra / Ingredients",
    desc: "Direct-from-source bulk ingredients for large-scale oil extraction and food manufacturing needs.",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/6/518901930/RP/GV/HX/147692506/1-kg-tiger-coconut-flakes-500x500.png",
    specs: "Premium Dried",
    packing: "Custom Bulk Logistics"
  }
];

export default function Products() {
  return (
    <section id="products" className="section-padding bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block italic">Our Inventory</span>
            <h2 className="text-4xl md:text-5xl font-serif text-coconut-brown">Premium <span className="italic-display font-light">Ingredients</span> for Industry Leaders</h2>
          </div>
          <p className="text-coconut-brown/50 text-sm max-w-sm mb-2">
            Providing consistent, high-yield coconut components tailored to your specific food-grade requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-2xl bg-cream-light border border-gold-accent/5">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coconut-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <a 
                    href="#specifications"
                    className="w-full bg-warm-white text-coconut-brown py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                   >
                     Specifications <ChevronRight size={14} />
                   </a>
                </div>
              </div>
              
              <h3 className="font-serif text-xl text-coconut-brown mb-2">{product.title}</h3>
              <p className="text-sm text-coconut-brown/60 mb-4 line-clamp-2 leading-relaxed">
                {product.desc}
              </p>
              
              <div className="pt-4 border-t border-gold-accent/10 space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                   <span className="text-gold-accent italic">Format</span>
                   <span className="text-coconut-brown/70">{product.specs}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                   <span className="text-gold-accent italic">Bulk Size</span>
                   <span className="text-coconut-brown/70">{product.packing}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
