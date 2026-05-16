import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    productType: 'Coconut Flakes',
    quantity: '',
    city: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({
        name: '',
        businessName: '',
        productType: 'Coconut Flakes',
        quantity: '',
        city: '',
        phone: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <section id="contact" className="section-padding bg-cream-light/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block italic">Get a Quote</span>
            <h2 className="text-4xl md:text-5xl font-serif text-coconut-brown mb-8 leading-tight">Secure Your <br /><span className="italic-display font-light text-gold-accent">Supply Chain</span></h2>
            <p className="text-base text-coconut-brown/60 leading-relaxed font-medium mb-10 max-w-sm">
              Inquiry for bulk pricing, customized packaging, or sample requests. Our commercial team responds to all B2B inquiries within 12 business hours.
            </p>

            <div className="space-y-6">
              <div className="flex gap-6 group cursor-default">
                 <div className="shrink-0 w-12 h-12 rounded-full border border-gold-accent/20 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-warm-white transition-all">
                    <Phone size={18} />
                 </div>
                 <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-accent mb-1 italic">Direct Line</h4>
                    <p className="text-lg font-serif text-coconut-brown">+91 98765 43210</p>
                 </div>
              </div>
              <div className="flex gap-6 group cursor-default">
                 <div className="shrink-0 w-12 h-12 rounded-full border border-gold-accent/20 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-warm-white transition-all">
                    <Mail size={18} />
                 </div>
                 <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-accent mb-1 italic">Commercial Email</h4>
                    <p className="text-lg font-serif text-coconut-brown">sales@gopalji.com</p>
                 </div>
              </div>
              <div className="flex gap-6 group cursor-default">
                 <div className="shrink-0 w-12 h-12 rounded-full border border-gold-accent/20 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-warm-white transition-all">
                    <MapPin size={18} />
                 </div>
                 <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-accent mb-1 italic">Manufacturing Unit</h4>
                    <p className="text-lg font-serif text-coconut-brown leading-tight">Plot 45, Industrial Zone <br />Mangalore, KA, India</p>
                 </div>
              </div>
            </div>

            <div className="mt-12">
               <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
               >
                  <MessageCircle size={18} />
                  Inquiry via WhatsApp
               </a>
            </div>
          </div>

          <div className="lg:col-span-3 bg-warm-white p-8 lg:p-12 rounded-[2rem] shadow-2xl shadow-gold-accent/5 border border-gold-accent/10">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-20 h-20 bg-gold-accent/10 rounded-full flex items-center justify-center text-gold-accent mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="font-serif text-3xl text-coconut-brown mb-4">Inquiry Received</h3>
                <p className="text-coconut-brown/60 text-sm max-w-xs mx-auto leading-relaxed">
                  Thank you for your interest. Our B2B commercial team will contact you within the next 12 hours.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-8 text-xs uppercase font-bold tracking-widest text-gold-accent border-b border-gold-accent"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">Full Name</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">Business Name</label>
                  <input 
                    required
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Company Name" 
                    className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">Product Type</label>
                  <select 
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors appearance-none"
                  >
                    <option>Coconut Flakes</option>
                    <option>Desiccated Coconut</option>
                    <option>Coconut Powder</option>
                    <option>Bulk Copra</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">Expected Quantity</label>
                  <input 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. 500 KG or 2 MT" 
                    className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">City/Region</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Operational Location" 
                    className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">Phone Number</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel" 
                    placeholder="+91 XXXX XXX XXX" 
                    className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors" 
                  />
                </div>
                <div className="sm:col-span-2 space-y-2 pt-4">
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-coconut-brown text-warm-white py-5 rounded-xl text-[10px] uppercase font-black tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gold-accent transition-all shadow-xl shadow-coconut-brown/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>Processing <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>Submit Bulk Request <Send size={14} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
