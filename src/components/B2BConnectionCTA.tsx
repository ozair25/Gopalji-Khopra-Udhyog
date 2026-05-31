import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';

export default function B2BConnectionCTA() {
  const whatsappNumber = "+917949337073";
  const message = "Hello Gopalji Khopra Udyog, I'm interested in partnering with you for premium bulk coconut ingredients.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  return (
    <section className="bg-[#6B4A2E] text-white py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-[#E5D5BC]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-[#FAF7F2]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
        
        <div className="max-w-3xl mx-auto space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[9px] xs:text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5D5BC] mb-2"
          >
            <span>Strategic Supply Partnership</span>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight"
          >
            Looking for Reliable <br />
            <span className="italic-display font-light text-[#E5D5BC]">Coconut Product Suppliers?</span>
          </motion.h3>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#FAF7F2]/80 leading-relaxed font-semibold max-w-2xl mx-auto"
          >
            Partner with Gopalji Khopra Udyog for premium quality coconut-based ingredients and dependable bulk supply. We optimize your source metrics for complete peace of mind.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <Link 
              to="/contact-us"
              className="bg-white hover:bg-[#FAF7F2] text-[#6B4A2E] px-8 py-4 rounded-xl text-xs font-serif font-bold uppercase tracking-wider shadow-md text-center transition-all flex items-center justify-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight size={14} />
            </Link>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-xl text-xs font-serif font-bold uppercase tracking-wider shadow-md text-center transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Us</span>
            </a>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
