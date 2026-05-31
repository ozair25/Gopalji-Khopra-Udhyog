import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EFE6D5]/90 backdrop-blur-md border-b border-[#D8B26A]/20 h-20 shadow-sm transition-all duration-300" role="navigation" aria-label="Main Directory Menu">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 lg:px-12 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Brand Left Section */}
          <Link 
            to="/" 
            className="flex items-center gap-1.5 xs:gap-2.5 lg:gap-3 group cursor-pointer select-none" 
            aria-label="Gopalji Khopra Udyog home page"
          >
              <div className="transition-all group-hover:scale-105 shrink-0">
              <img src="https://res.cloudinary.com/dtrvyelcg/image/upload/v1780234875/gopalji_new_logo_ukch69.png" alt="Gopalji Khopra Udyog logo" className="h-9 xs:h-11 sm:h-14 lg:h-16 w-auto relative z-10 object-contain" width="64" height="64" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] xs:text-[14px] sm:text-lg md:text-xl lg:text-2xl font-serif font-black tracking-tight text-coconut-brown leading-none whitespace-nowrap">
                GOPALJI KHOPRA UDYOG
              </span>
              <span className="text-[6.5px] xs:text-[8.5px] sm:text-[10px] lg:text-[12px] tracking-[0.25em] xs:tracking-[0.3em] uppercase font-bold text-gold-accent mt-1 whitespace-nowrap">
                PREMIUM COCONUT INGREDIENTS
              </span>
            </div>
          </Link>

          {/* Right Section (Common & Responsive) */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 lg:gap-8">
            {/* Nav menu links for desktop */}
            <div className="hidden lg:flex items-center gap-8 mr-4" role="menubar">
              {[
                { name: 'Home', to: '/' },
                { name: 'Products & Services', to: '/products-services' },
                { name: 'About Us', to: '/about-us' },
                { name: 'Contact Us', to: '/contact-us' },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  to={item.to} 
                  className="text-[10px] uppercase tracking-widest font-bold text-coconut-brown/70 hover:text-coconut-brown transition-colors focus:ring-2 focus:ring-[#8C6239] focus:outline-none px-1 rounded"
                  role="menuitem"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Hamburger menu button */}
            <button 
              className="p-1 xs:p-2 -mr-1 text-coconut-brown hover:text-gold-accent transition-colors flex items-center justify-center shrink-0 focus:ring-2 focus:ring-[#8C6239] focus:outline-none rounded" 
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X size={20} className="sm:size-[24px] stroke-[2.5]" /> : <Menu size={20} className="sm:size-[24px] stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          id="mobile-navigation"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="lg:hidden absolute top-20 left-0 right-0 bg-[#EFE6D5] border-b border-[#D8B26A]/20 py-6 px-6 flex flex-col gap-4 shadow-xl z-40"
        >
          {[
            { name: 'Home', to: '/' },
            { name: 'Products & Services', to: '/products-services' },
            { name: 'About Us', to: '/about-us' },
            { name: 'Contact Us', to: '/contact-us' },
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.to} 
              className="text-xs uppercase tracking-widest font-bold text-coconut-brown/80 hover:text-coconut-brown py-2 border-b border-[#D8B26A]/10 last:border-0 focus:outline-none focus:text-coconut-brown"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
