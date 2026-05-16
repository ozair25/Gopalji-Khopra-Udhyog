import { motion } from 'motion/react';

const industries = [
  {
    title: "Bakeries",
    label: "Artisan & Industrial",
    desc: "Consistency in flake size and moisture for high-volume bread and pastry production.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Confectioneries",
    label: "Sweets & Chocolate",
    desc: "Premium fat content for rich mouthfeel in coconut-based fillings and coatings.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Hotels & Catering",
    label: "Hospitality Groups",
    desc: "Daily fresh supplies for premium buffet setups and signature fine-dining desserts.",
    image: "https://images.unsplash.com/photo-1616734755909-bb016ce64930?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjBhbmQlMjBjYXRlcmluZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title: "Food Distributors",
    label: "Regional Partnerships",
    desc: "Reliable white-labeling and bulk supply chain support for ingredient resellers.",
    image: "https://images.unsplash.com/photo-1617194191528-9a50cf609304?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGRpc3RyaWJ1dG9yfGVufDB8fDB8fHww"
  }
];

export default function Industries() {
  return (
    <section id="industries" className="section-padding bg-cream-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block italic">Global Reach</span>
          <h2 className="text-4xl md:text-5xl font-serif text-coconut-brown mb-6">Industries <span className="italic-display font-light">We Serve</span></h2>
          <div className="w-20 h-[1px] bg-gold-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group h-[450px] overflow-hidden rounded-3xl cursor-default"
            >
              <img 
                src={industry.image} 
                alt={industry.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coconut-brown/90 via-coconut-brown/20 to-transparent flex flex-col justify-end p-8 text-warm-white">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold-accent mb-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  {industry.label}
                </span>
                <h3 className="font-serif text-2xl mb-3">{industry.title}</h3>
                <p className="text-xs font-medium text-warm-white/70 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                  {industry.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
