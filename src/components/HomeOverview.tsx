import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, Calendar, Layers, Truck, Factory, ArrowRight, 
  CheckCircle2, Users, Landmark, FileCheck, Shield, ChevronRight, Box 
} from 'lucide-react';

export default function HomeOverview() {
  const certifications = [
    { name: "FSSAI Registration", desc: "Primary food security licensing and hygiene clearance for mass food processing." },
    { name: "ISO Certification", desc: "Adherence to standardized processing systems and international protocols." },
    { name: "GST Registration", desc: "Registered in July 2017. 100% tax compliant billing for state & national corporate clients." },
    { name: "Trademark Certificate", desc: "Officially registered Gopalji brand protecting high-grade name and enterprise values." },
    { name: "MSME Certification", desc: "SUDARSHAN/MSME registered B2B food enterprise supported by government frameworks." }
  ];

  const highlights = [
    {
      icon: ShieldCheck,
      title: "Food Grade Processing",
      desc: "Untouched, hygienically monitored processing units maintaining strict safety and sanitary protocols."
    },
    {
      icon: Layers,
      title: "Consistent Quality",
      desc: "Precision moisture checking and custom fat percentages across every physical batch size."
    },
    {
      icon: Factory,
      title: "High-Tonnage Supply",
      desc: "Robust manufacturing lines capable of carrying massive, uninterrupted monthly business contracts."
    },
    {
      icon: Truck,
      title: "Pan India Delivery",
      desc: "Highly connected logistics channels from our Indore hub delivering directly to factories."
    }
  ];

  const previewProducts = [
    {
      title: "Coconut Powder",
      desc: "Ultra-fine pulverized premium grade coconut meat. Highly soluble with uniform powder grain.",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1780224946/coco_powder_pre_mlysdv.jpg"
    },
    {
      title: "Coconut Flakes",
      desc: "Exquisite long-cut snow-white flakes dried carefully to preserve rich aroma and texture.",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1780224601/coco_flakes_ejjrjb.jpg"
    },
    {
      title: "Coconut Oil",
      desc: "100% pure cold-pressed coconut oil possessing intense flavor aroma and high fat profile.",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1780224353/coconut_oil_pre_i4p9cx.jpg"
    },
    {
      title: "Desiccated Coconut",
      desc: "Finely shredded, moisture-optimized dehydrated meat delivering luxurious rich taste.",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1780225046/dessicated_pre_puwjli.png"
    }
  ];

  return (
    <section id="home-overview" className="bg-[#FAF7F2] py-16 lg:py-24 overflow-hidden text-[#4A2E1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* 1. OFFICIAL CREDENTIALS / CERTIFICATIONS & RECOGNITION */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-2 block italic">Official Credentials</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#4A2E1F] font-black">Certifications & Recognition</h3>
            <p className="text-xs sm:text-sm text-[#4A2E1F]/60 mt-1 font-semibold">Verified credentials ensuring full tax and safety compliance inside India.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {certifications.map((certs, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[#D8B26A]/15 p-5 rounded-xl shadow-sm text-center flex flex-col justify-between"
              >
                <div className="w-8 h-8 bg-[#E5D5BC]/20 rounded-full flex items-center justify-center text-[#8C6239] mx-auto mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#4A2E1F] mb-1 leading-tight">{certs.name}</h4>
                <p className="text-[9px] text-[#4A2E1F]/70 font-semibold leading-normal">{certs.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. SHORT COMPANY INTRODUCTION */}
        <div className="max-w-4xl mx-auto text-center mb-20 pt-8 border-t border-[#8C6239]/10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5D5BC]/40 rounded-full text-[9px] xs:text-[10px] uppercase font-bold tracking-[0.2em] text-[#6B4A2E] mb-6"
          >
            <span>B2B Trust & Legacy</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl xs:text-4xl md:text-5xl font-serif text-[#4A2E1F] font-black leading-tight tracking-tight mb-6"
          >
            Sustaining the Success of India’s <br />
            <span className="text-[#8C6239] italic font-light italic-display">Leading Food Brands</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#3D2B1F]/90 font-semibold leading-relaxed max-w-2xl mx-auto"
          >
            Established in 2017, Gopalji Khopra Udyog is a premium B2B Coconut Ingredient Manufacturer and Wholesaler in Indore. We supply highly consistent, food-grade ingredients to bakeries, confectioneries, food manufacturers, and wholesalers nationwide.
          </motion.p>
        </div>

        {/* 3. PRODUCT CATEGORIES PREVIEW */}
        <div className="my-20 pt-12 border-t border-[#8C6239]/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-3 block italic">Product Showcase Preview</span>
            <h3 className="text-2xl xs:text-3xl font-serif text-[#4A2E1F] font-black leading-tight">
              Our Core Product Range
            </h3>
            <p className="text-xs sm:text-sm text-[#4A2E1F]/60 mt-2 font-semibold">
              Premium grade coconut ingredients processed hygienicly for commercial and industrial use.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewProducts.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[#D8B26A]/20 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={p.image} 
                    alt={`${p.title} category preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="200"
                    height="200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-[10px] uppercase font-bold tracking-widest">Pure Food Grade</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-[#4A2E1F] font-extrabold">{p.title}</h4>
                    <p className="text-xs text-[#4A2E1F]/70 font-semibold leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#8C6239]/10">
                    <Link 
                      to="/products-services"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#E5D5BC]/60 hover:bg-[#6B4A2E] hover:text-white text-[#6B4A2E] py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300"
                    >
                      <span>View Specifications</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12 bg-[#E5D5BC]/25 border border-[#8C6239]/15 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm">
            <p className="text-xs sm:text-sm text-[#4A2E1F] mb-4 font-bold flex items-center justify-center gap-1.5 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Showing 4 core ingredient previews. Access our full wholesale catalog of 14+ premium products.
            </p>
            <Link 
              to="/products-services"
              className="inline-flex items-center justify-center gap-3 bg-[#6B4A2E] hover:bg-[#8C6239] text-white px-8 sm:px-10 py-45 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
            >
              <Box size={16} />
              <span>Explore Complete 14+ Product Catalog</span>
              <ArrowRight size={16} />
            </Link>
            <p className="text-[9px] sm:text-[10px] text-[#4A2E1F]/50 uppercase tracking-[0.15em] mt-3 font-extrabold">
              Complete catalog with HSN codes, custom weights, & bulk quoting features
            </p>
          </div>
        </div>

        {/* 4. WHY CHOOSE US (maximum 4 cards) */}
        <div className="my-20 pt-12 border-t border-[#8C6239]/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-3 block italic">Why Partner With Us</span>
            <h3 className="text-2xl xs:text-3xl font-serif text-[#4A2E1F] font-black leading-tight">
              Why Choose Gopalji
            </h3>
            <p className="text-xs sm:text-sm text-[#4A2E1F]/60 mt-2 font-semibold">
              Supporting your business continuity with high purity standards and robust bulk delivery operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#EFE6D5]/40 border border-[#D8B26A]/20 p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-white rounded-xl border border-[#D8B26A]/20 flex items-center justify-center text-[#8C6239] mb-4">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-base text-[#4A2E1F] font-bold mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#4A2E1F]/70 leading-relaxed font-semibold">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 5. CERTIFICATIONS PREVIEW & FINAL CTA */}
        <div className="bg-[#E5D5BC]/30 border border-[#8C6239]/10 rounded-3xl p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 mt-20">
          <div className="max-w-xl text-center lg:text-left">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8C6239] mb-3">Compliance Guarantee</h4>
            <h3 className="font-serif text-2xl xs:text-3xl text-[#4A2E1F] font-bold mb-4">Certified Safe Food Standards</h3>
            <p className="text-xs xs:text-sm text-[#4A2E1F]/80 leading-relaxed font-semibold">
              We operate strictly under full B2B certifications including FSSAI, MSME, and standard audited food safety regulations. Quality is meticulously checked before shipment dispatches.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
              <span className="flex items-center gap-1 bg-white/60 border border-[#D8B26A]/20 text-[#6B4A2E] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase">
                <CheckCircle2 size={10} className="text-[#25D366]" /> FSSAI Certified
              </span>
              <span className="flex items-center gap-1 bg-white/60 border border-[#D8B26A]/20 text-[#6B4A2E] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase">
                <CheckCircle2 size={10} className="text-[#25D366]" /> ISO Compliant
              </span>
              <span className="flex items-center gap-1 bg-white/60 border border-[#D8B26A]/20 text-[#6B4A2E] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase">
                <CheckCircle2 size={10} className="text-[#25D366]" /> MSME Registered
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-center">
            <Link 
              to="/products-services"
              className="bg-[#6B4A2E] hover:bg-[#5C3F27] text-white px-8 py-4 rounded-xl text-xs font-serif font-bold uppercase tracking-wider shadow-md hover:shadow-lg text-center transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>Explore Products</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/contact-us"
              className="border border-[#6B4A2E]/40 bg-white/40 hover:bg-white/60 text-[#4A2E1F] px-8 py-4 rounded-xl text-xs font-serif font-bold uppercase tracking-wider text-center transition-all whitespace-nowrap"
            >
              Inquire Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
