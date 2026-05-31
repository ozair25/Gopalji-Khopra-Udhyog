import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const whatsappNumber = "+919425054999";
  const message = "Hello Gopalji Khopra Udyog, I'm interested in your premium coconut ingredients.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* 1. FLOATING WHATSAPP BUTTON (Bottom Right) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto"
        id="floating-whatsapp"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
        <span className="absolute right-full mr-4 bg-white text-[#4A2E1F] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#D8B26A]/20 pointer-events-none">
          WhatsApp Commercial
        </span>
      </motion.a>

      {/* 2. FLOATING CALL BUTTON (Bottom Left - highly requested!) */}
      <motion.a
        href="tel:9425054999"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[100] bg-[#6B4A2E] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto border border-white/10"
        id="floating-call"
      >
        <Phone size={24} className="sm:w-7 sm:h-7" />
        <span className="absolute left-full ml-4 bg-white text-[#4A2E1F] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#D8B26A]/20 pointer-events-none">
          Call Commercial Team
        </span>
      </motion.a>
    </>
  );
}
