import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const whatsappNumber = "+919876543210";
  const message = "Hello Gopalji Khopra Udhyog, I'm interested in your premium coconut ingredients.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-4 bg-white text-coconut-brown px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gold-accent/10">
        Connect on WhatsApp
      </span>
    </motion.a>
  );
}
