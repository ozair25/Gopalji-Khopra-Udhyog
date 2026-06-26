import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1C110A] text-[#E5D5BC] border-t border-[#8C6239]/20" aria-label="Gopalji Corporate Footer">
      
      {/* Primary Footer Information */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Column 1: About Company (4/12 width on LG) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-[#E9C38E]">GOPALJI</span>
            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#C29F6F]">Khopra Udyog</span>
          </div>
          <p className="text-xs text-[#E5D5BC]/70 leading-relaxed font-semibold">
            Trusted manufacturer and supplier of premium coconut-based food ingredients since 2007. Serving bakeries, confectioneries, wholesalers, and food brands across India.
          </p>
          <div className="inline-block bg-[#E5D5BC]/10 border border-[#D8B26A]/20 text-[#E9C38E] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            GST Registered Business
          </div>
        </div>

        {/* Column 2: Quick Links (2/12 width on LG) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#C29F6F]">Quick Links</h4>
          <ul className="space-y-3 text-xs font-semibold text-[#E5D5BC]/70">
            <li><Link to="/" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">Home</Link></li>
            <li><Link to="/products-services" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">Products & Services</Link></li>
            <li><Link to="/about-us" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Products (3/12 width on LG) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#C29F6F]">Our Products</h4>
          <ul className="space-y-3 text-xs font-semibold text-[#E5D5BC]/70">
            <li><Link to="/products-services" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">Coconut Powder</Link></li>
            <li><Link to="/products-services" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">Coconut Flakes</Link></li>
            <li><Link to="/products-services" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">Coconut Oil</Link></li>
            <li><Link to="/products-services" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">Desiccated Coconut</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Details (3/12 width on LG) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#C29F6F]">Contact Details</h4>
          <div className="space-y-3 text-xs font-semibold text-[#E5D5BC]/70">
            <p className="flex items-start gap-1">
              <span className="text-[#C29F6F]" aria-hidden="true">📍</span> 
              <span>999, Bijalpur A.B Road, Indore (M.P) 452001</span>
            </p>
            <p className="flex items-start gap-1">
              <span className="text-[#C29F6F]" aria-hidden="true">📞</span> 
              <span>
                <a href="tel:9109216931" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">9109216931</a> / <br />
                <a href="tel:8889854999" className="hover:text-[#E9C38E] transition-colors focus:ring-1 focus:ring-[#E9C38E] focus:outline-none rounded px-0.5">8889854999</a> <br />
                <span className="text-[10px] text-[#E5D5BC]/50 mt-1 block">Landline: <a href="tel:07314985317" className="hover:text-[#E9C38E] transition-colors">0731-4985317</a></span>
              </span>
            </p>
            <p className="flex items-center gap-1">
              <span className="text-[#C29F6F]" aria-hidden="true">✉️</span> 
              <span className="break-all">gopaljikhopra@gmail.com</span>
            </p>
            <p className="text-[10px] text-[#E5D5BC]/40 font-semibold pt-1">
              FSSAI Lic. Registered
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="h-14 bg-[#110A06] text-white flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 text-[9px] font-bold uppercase tracking-widest gap-2 py-4 md:py-0 border-t border-[#8C6239]/10">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
          <span>© 2026 GOPALJI KHOPRA UDHYOG - ALL RIGHTS RESERVED</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="text-white/50 tracking-normal font-medium normal-case">made by "Express Webcraft (7470857424)"</span>
        </div>
        <div className="flex gap-6 opacity-60">
          <Link to="/about-us" className="hover:underline focus:outline-none">Privacy Policy</Link>
          <Link to="/about-us" className="hover:underline focus:outline-none">Terms of Supply</Link>
          <Link to="/about-us" className="hover:underline focus:outline-none">Compliance Info</Link>
        </div>
      </div>
      
    </footer>
  );
}
