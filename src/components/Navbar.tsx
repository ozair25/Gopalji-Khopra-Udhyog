import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/80 backdrop-blur-md border-b border-gold-accent/10 h-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/public/gopalji logo.webp" alt="Gopalji Logo" className="h-12 lg:h-14 w-auto transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold tracking-tighter text-coconut-brown leading-none">GOPALJI</span>
              <span className="text-[8px] lg:text-[10px] tracking-[0.4em] uppercase font-semibold text-gold-accent">Khopra Udhyog</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {[
              { name: 'Products', href: '#products' },
              { name: 'Quality Control', href: '#quality' },
              { name: 'Industries', href: '#industries' },
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-[10px] uppercase tracking-widest font-bold text-coconut-brown/70 hover:text-coconut-brown transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="bg-coconut-brown text-warm-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gold-accent transition-colors shadow-lg shadow-coconut-brown/10"
            >
              Bulk Inquiry
            </a>
          </div>

          <button className="md:hidden text-coconut-brown" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-warm-white border-b border-gold-accent/10 py-6 px-6 flex flex-col gap-4 shadow-xl"
        >
          {[
            { name: 'Products', href: '#products' },
            { name: 'Quality Control', href: '#quality' },
            { name: 'Industries', href: '#industries' },
            { name: 'About', href: '#about' },
          ].map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-sm uppercase tracking-widest font-semibold text-coconut-brown/70"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="bg-coconut-brown text-warm-white px-6 py-3 rounded-full text-sm uppercase tracking-widest font-bold text-center"
            onClick={() => setIsOpen(false)}
          >
            Bulk Inquiry
          </a>
        </motion.div>
      )}
    </nav>
  );
}
