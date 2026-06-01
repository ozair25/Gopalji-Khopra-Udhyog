import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, CheckCircle2, Target, Truck, Sparkles, Scale, Clock, Heart, Star, Eye, X, FileText, ExternalLink } from 'lucide-react';

export default function AboutUs() {
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; image: string; desc: string } | null>(null);

  const whyChooseUs = [
    {
      title: "Consistent Product Quality",
      desc: "Facility operates under strict standardization protocols to ensure identical fat, moisture, and particle size distribution in every single batch.",
      icon: Target
    },
    {
      title: "Reliable Bulk Logistics",
      desc: "Continuous high-tonnage contract fulfillment directly from our logistics hub in Indore across India.",
      icon: Truck
    },
    {
      title: "Untouched Hygienic Processing",
      desc: "Advanced modern mill designed primarily to eliminate human contamination and guarantee food-grade safety.",
      icon: Sparkles
    },
    {
      title: "Competitive Pricing",
      desc: "Optimized operational overheads allow us to offer pure coconut ingredients at competitive wholesale rates.",
      icon: Scale
    }
  ];

  const documents = [
    {
      title: "FSSAI Registration",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto,w_600/v1780225882/fssi_cert_t4zxtc.webp",
      desc: "Primary food security registration and hygiene clearance for bulk food processing."
    },
    {
      title: "ISO Certification",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto,w_600/v1780225883/iso_cert_gopji_nvhsyh.webp",
      desc: "Adherence to international standardized processing systems and quality management protocols."
    },
    {
      title: "GST Tax Registration",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto,w_600/v1780225882/gst_gopalji_fmhonz.webp",
      desc: "Active GSTIN registered July 2017. 100% tax compliant billing for state & national clients."
    },
    {
      title: "MSME UDYAM Certificate",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto,w_600/v1780225882/recog_qqtuew.webp",
      desc: "SUDARSHAN/MSME registered B2B food enterprise supported by government frameworks."
    },
    {
      title: "Official Affiliation",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto,w_600/v1780225882/affiliation_jci8ka.webp",
      desc: "Official registration certificate confirming standardized parameters & trusted enterprise values."
    },
    {
      title: "Trade Association Membership",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto,w_600/v1780225883/trade_membership_mdcbjm.webp",
      desc: "Verified chamber of commerce and trade bodies membership securing local compliance."
    }
  ];

  const factsheet = [
    { label: "Nature of Business", value: "Manufacturer, Wholesaler & Supplier" },
    { label: "Additional Services", value: "Custom Formulations & Milling Solutions" },
    { label: "Company CEO / Owner", value: "A Garg (Proprietor)" },
    { label: "Legal Status of Firm", value: "Sole Proprietorship" },
    { label: "Year of Establishment", value: "2017" },
    { label: "Active Employees", value: "11 to 25 Skilled Persons" },
    { label: "Annual Turnover", value: "INR 1.5 - 5 Crore" },
    { label: "Principal Location", value: "999, Bijalpur A.B Road, Indore (M.P) 452001" }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#EFE6D5]/30 relative overflow-hidden text-[#4A2E1F]">
      
      {/* Decorative background element */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#E5D5BC]/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* RECOMMENDED SECTION 1: COMPANY OVERVIEW */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: Images */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] sm:aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#8C6239]/20 shadow-lg bg-white">
              <img 
                src="https://res.cloudinary.com/dtrvyelcg/image/upload/f_auto,q_auto,w_600/v1780226284/about_us_ha5qpb.png" 
                alt="Indore Coconut Processing and Dehydrated Desiccated Powder Sorting Factory - Gopalji" 
                className="w-full h-full object-cover select-none"
                loading="lazy"
                width="400"
                height="500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#6B4A2E] text-white p-6 rounded-2xl shadow-xl max-w-xs border border-white/10 hidden sm:block">
              <div className="text-2xl font-serif font-black">Since 2017</div>
              <div className="text-[9px] uppercase font-bold tracking-[0.15em] text-[#E5D5BC] mt-1">
                A Preferred Central India Food Ingredient Partner
              </div>
            </div>
          </div>

          {/* Right: Company Intro Text */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-xs block italic progress-accent">Company Overview</span>
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-serif text-[#4A2E1F] font-black leading-tight">
              Purity Sourced. <br />
              <span className="italic-display font-light text-[#8C6239]">Professionally Delivered.</span>
            </h2>
            
            <div className="space-y-4 text-xs xs:text-sm sm:text-base text-[#3D2B1F]/90 leading-relaxed font-semibold">
              <p>
                Established in 2017 in Indore, Madhya Pradesh, **Gopalji Khopra Udyog** is a highly recognized Sole Proprietorship enterprise producing premium food-grade coconut ingredients. We cater strictly to major confectioneries, industrial bakeries, and wholesale hubs across India.
              </p>
              <p>
                Our core manufacturing lines yield high-fat desiccated coconut powder, sweet snow-white coconut flakes, and pure cold-pressed coconut oil. Every batch undergoes physical sorting and moisture-calibrations to preserve rich natural taste, aroma, and absolute hygiene.
              </p>
              <blockquote className="border-l-2 border-[#8C6239] pl-4 text-[#6B4A2E] italic font-serif text-sm">
                “Leveraging clean processing infrastructure and solid wholesale channels to deliver reliable raw material safety.”
              </blockquote>
            </div>
          </div>
        </div>

        {/* RECOMMENDED SECTION 2: WHY CHOOSE US */}
        <div className="my-20 pt-12 border-t border-[#8C6239]/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-[10px] mb-2.5 block italic">Strategic Capabilities</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#4A2E1F] font-black">Why Choose Gopalji</h3>
            <p className="text-xs sm:text-sm text-[#4A2E1F]/60 mt-2 font-semibold">
              Building long-term business-to-business trust through transparency and strict quality auditing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const StrengthIcon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-[#D8B26A]/20 p-6 rounded-2xl shadow-[0_2px_8px_rgba(74,46,31,0.02)] flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E5D5BC]/30 flex items-center justify-center text-[#8C6239]">
                      <StrengthIcon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-base text-[#4A2E1F] font-bold">{item.title}</h4>
                    <p className="text-xs text-[#4A2E1F]/70 leading-relaxed font-semibold">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECOMMENDED SECTION 3: QUALITY & MANUFACTURING (INFRASTRUCTURE & WAREHOUSE COMPACTED) */}
        <div className="my-20 pt-12 border-t border-[#8C6239]/10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-[10px] block italic">Controlled Ecosystem</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#4A2E1F] font-black">Quality & Manufacturing Setup</h3>
              <p className="text-xs sm:text-sm text-[#4A2E1F]/70 leading-relaxed font-semibold">
                Our facilities combine premium shredding machinery with climate-regulated cold-storage, ensuring year-round inventory protection against moisture absorption, color alteration, and rancidity.
              </p>
              
              <ul className="space-y-3 mt-4 text-xs sm:text-sm font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#25D366]" /> Modern mills equipped with integrated temperature-sensitive drying beds.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#25D366]" /> Strict FIFO inventory rotation logs ensuring optimal freshness batches.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#25D366]" /> Moisture-barrier vacuum linings in heavy 15kg/25kg multi-wall bags.
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-[#D8B26A]/20 p-6 sm:p-8 rounded-[2rem] shadow-sm grid grid-cols-2 gap-4">
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D8B26A]/10">
                <h5 className="font-serif font-bold text-[#4A2E1F] text-xs">Milling Station</h5>
                <p className="text-[10px] leading-relaxed text-[#4A2E1F]/70 mt-1 font-semibold">High-grade computerized pulverizing for consistent granular size control.</p>
              </div>
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D8B26A]/10">
                <h5 className="font-serif font-bold text-[#4A2E1F] text-xs">Hygienic Drying</h5>
                <p className="text-[10px] leading-relaxed text-[#4A2E1F]/70 mt-1 font-semibold">Dehydrators operating inside sealed stainless enclosures under safe parameters.</p>
              </div>
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D8B26A]/10">
                <div className="font-serif font-bold text-[#4A2E1F] text-xs">Humidity Controlled</div>
                <p className="text-[10px] leading-relaxed text-[#4A2E1F]/70 mt-1 font-semibold">Dehumidified warehouses blocking out outdoor moisture thoroughly.</p>
              </div>
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D8B26A]/10">
                <div className="font-serif font-bold text-[#4A2E1F] text-xs">Sanitary Storage</div>
                <p className="text-[10px] leading-relaxed text-[#4A2E1F]/70 mt-1 font-semibold">Gated warehouses with pest tracking structures for standard safety.</p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPLIANCE & CERTIFICATIONS SECTION */}
        <div id="compliance-documents" className="my-20 pt-12 border-t border-[#8C6239]/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-[10px] mb-2.5 block italic">Official Registrations</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#4A2E1F] font-black">Corporate Verification & Certifications</h3>
            <p className="text-xs sm:text-sm text-[#4A2E1F]/60 mt-2 font-semibold">
              Verified credentials, licenses, and official registrations affirming our enterprise compliance and quality standards. Click any certificate to inspect full resolution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group cursor-pointer flex flex-col h-full bg-white border border-[#D8B26A]/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setSelectedDoc(doc)}
              >
                {/* Certificate Frame */}
                <div className="aspect-[3/4] relative bg-[#FAF7F2] overflow-hidden border-b border-[#8C6239]/10 flex items-center justify-center p-4">
                  <div className="w-full h-full relative border border-gray-200 shadow-sm rounded bg-white overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src={doc.image} 
                      alt={doc.title}
                      className="w-full h-full object-contain select-none"
                      loading="lazy"
                      width="350"
                      height="466"
                    />
                  </div>
                  
                  {/* Verified Ribbon/Overlay */}
                  <div className="absolute top-6 right-6 bg-[#25D366] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                    Verified
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#4A2E1F]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-2 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye size={20} />
                    </div>
                    <span className="text-[10px] text-white font-black uppercase tracking-wider">Inspect Document</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-serif text-base text-[#4A2E1F] font-bold group-hover:text-[#8C6239] transition-colors mb-2">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-[#4A2E1F]/70 leading-relaxed font-semibold">
                      {doc.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#8C6239]/5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-extrabold text-[#8C6239] group-hover:text-[#6B4A2E] transition-colors">
                    <FileText size={12} />
                    <span>View Registration Certificate</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LIGHTBOX ZOOM MODAL */}
        <AnimatePresence>
          {selectedDoc && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] backdrop-blur-md bg-black/80 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedDoc(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#8C6239]/10 flex items-center justify-between bg-[#FAF7F2]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-[#25D366] w-5 h-5" />
                    <h3 className="font-serif text-lg font-bold text-[#4A2E1F]">{selectedDoc.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="p-1.5 rounded-full hover:bg-[#8C6239]/15 text-[#4A2E1F]/70 hover:text-[#4A2E1F] transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content Frame */}
                <div className="flex-1 bg-neutral-900 overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-0">
                  <img 
                    src={selectedDoc.image} 
                    alt={selectedDoc.title}
                    className="max-h-[65vh] max-w-full object-contain rounded shadow-lg border border-white/10"
                    loading="lazy"
                    width="600"
                    height="800"
                  />
                </div>

                {/* Footer description */}
                <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#8C6239]/10 text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-[#4A2E1F] font-semibold leading-relaxed">
                    {selectedDoc.desc}
                  </p>
                  <p className="text-[10px] text-[#4A2E1F]/50 mt-1 uppercase tracking-widest font-black flex items-center gap-1 justify-center sm:justify-start">
                    <span>Gopalji Khopra Udyog — Compliance Clearance Standard File</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RECOMMENDED SECTION 5: COMPANY FACTSHEET (COMPACT MODERN GRID) */}
        <div id="factsheet" className="my-20 pt-12 border-t border-[#8C6239]/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block italic">B2B Profile Details</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#4A2E1F] font-black">Company Factsheet</h3>
            <p className="text-xs sm:text-sm text-[#4A2E1F]/60 mt-1 font-semibold">Corporate financial, tax, and legal parameters at a single glance.</p>
          </div>

          <div className="bg-white border border-[#D8B26A]/20 rounded-2xl overflow-hidden shadow-sm max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2">
              {factsheet.map((fact, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 flex items-center justify-between border-b border-[#D8B26A]/15 sm:even:border-l ${idx >= factsheet.length - 2 ? 'sm:border-b-0' : ''}`}
                >
                  <span className="text-[10px] uppercase font-extrabold text-[#4A2E1F]/50 tracking-wider pr-4 font-mono">
                    {fact.label}
                  </span>
                  <span className="text-xs font-bold text-[#4A2E1F] text-right font-sans">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
