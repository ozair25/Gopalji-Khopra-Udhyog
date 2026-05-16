import { Linkedin, Instagram, Twitter, Facebook, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-warm-white py-16 px-6 lg:px-20 border-t border-gold-accent/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter text-coconut-brown">GOPALJI</span>
              <span className="text-[9px] tracking-[0.4em] uppercase font-semibold text-gold-accent">Khopra Udhyog</span>
            </div>
            <p className="text-xs text-coconut-brown/60 leading-relaxed font-medium">
              Industrial grade coconut ingredients for global food processing. Pure, consistent, reliable.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-accent mb-6">Inventory</h4>
            <ul className="space-y-3 text-xs font-semibold text-coconut-brown/70">
              <li><a href="#products" className="hover:text-gold-accent transition-colors">Coconut Flakes</a></li>
              <li><a href="#products" className="hover:text-gold-accent transition-colors">Desiccated Powder</a></li>
              <li><a href="#products" className="hover:text-gold-accent transition-colors">Bulk Copra</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-accent mb-6">Standards</h4>
             <ul className="space-y-3 text-xs font-semibold text-coconut-brown/70">
              <li><a href="#certifications" className="hover:text-gold-accent transition-colors">ISO 22000:2018</a></li>
              <li><a href="#certifications" className="hover:text-gold-accent transition-colors">HACCP Compliant</a></li>
              <li><a href="#quality" className="hover:text-gold-accent transition-colors">GMP Facility</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-accent mb-6">Global Support</h4>
            <div className="space-y-2">
               <p className="text-xs font-bold text-coconut-brown">sales@gopalji.com</p>
               <p className="text-xs font-medium text-coconut-brown/60">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12 bg-coconut-brown text-white flex items-center justify-between px-6 lg:px-20 text-[9px] font-semibold uppercase tracking-widest">
        <div>© 2024 GOPALJI KHOPRA UDHYOG - INDUSTRIAL GRADE SUPPLIERS</div>
        <div className="hidden lg:flex gap-6 opacity-60">
          <span>Privacy Policy</span>
          <span>Terms of Supply</span>
          <span>Compliance</span>
        </div>
      </div>
    </footer>
  );
}
