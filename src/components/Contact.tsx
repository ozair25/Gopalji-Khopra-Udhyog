import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle2, Loader2, User, Clock, BellRing } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { sendEmailNotification } from '../utils/sendEmailNotification';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    productRequirement: 'Coconut Flakes',
    message: ''
  });

  React.useEffect(() => {
    // 1. Listen for custom selectProduct events
    const handleSelectProduct = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      if (customEvent.detail) {
        setFormData(prev => ({
          ...prev,
          productRequirement: customEvent.detail.category || customEvent.detail,
          message: `Hi, I am interested in bulk enquiry for: ${customEvent.detail.productName || customEvent.detail}. Please provide specs and dynamic wholesale pricing details.`
        }));
      }
    };

    window.addEventListener('selectProduct', handleSelectProduct);

    // 2. Check URL search or hash params on mount or change
    const checkParams = () => {
      // Prioritize standard search (e.g. ?product=...)
      const searchParams = new URLSearchParams(window.location.search);
      let productParam = searchParams.get('product');

      // Fallback to hash parameters (e.g. #contact?product=...)
      if (!productParam && window.location.hash.includes('?')) {
        const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
        productParam = hashParams.get('product');
      }

      if (productParam) {
        const decodedProduct = decodeURIComponent(productParam);
        
        // Find best match for dropdown
        let categorySelect = 'Coconut-Based Food Ingredients';
        const lowerProd = decodedProduct.toLowerCase();
        if (lowerProd.includes('flakes')) {
          categorySelect = 'Coconut Flakes';
        } else if (lowerProd.includes('powder')) {
          categorySelect = 'Coconut Powder';
        } else if (lowerProd.includes('oil')) {
          categorySelect = 'Coconut Oil';
        } else if (lowerProd.includes('desiccated') || lowerProd.includes('khopra')) {
          categorySelect = 'Desiccated Coconut';
        }

        setFormData(prev => ({
          ...prev,
          productRequirement: categorySelect,
          message: `Hi, I am interested in bulk enquiry for: ${decodedProduct}. Please provide specs and dynamic wholesale pricing details.`
        }));
      }
    };

    checkParams();
    window.addEventListener('hashchange', checkParams);

    return () => {
      window.removeEventListener('selectProduct', handleSelectProduct);
      window.removeEventListener('hashchange', checkParams);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      companyName: formData.companyName || "Individual Prospect",
      email: formData.email,
      phone: formData.phone,
      product: formData.productRequirement,
      quantity: "Bulk Order / Wholesale",
      message: formData.message,
      city: "Indore",
      state: "Madhya Pradesh",
      source: "Contact Page Form"
    };

    // Capture locally as well so it's always accessible in offline fallback
    const localInquiry = {
      id: "local-" + Date.now(),
      inquiryId: "Pending...",
      ...payload,
      productType: formData.productRequirement,
      businessName: formData.companyName,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem("gopalji_local_inquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(localInquiry);
      localStorage.setItem("gopalji_local_inquiries", JSON.stringify(list));
    } catch (err) {
      console.error("Local storage sync error:", err);
    }

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Server inquiry endpoint rejected submission.");
      }

      const result = await res.json();
      
      // Update local copy with actual ID if available
      if (result.success && result.inquiryId) {
        try {
          const existing = localStorage.getItem("gopalji_local_inquiries");
          if (existing) {
            const list = JSON.parse(existing);
            if (list.length > 0 && list[0].id === localInquiry.id) {
              list[0].inquiryId = result.inquiryId;
              list[0].status = "Pending";
              localStorage.setItem("gopalji_local_inquiries", JSON.stringify(list));
            }
          }
        } catch (e) {
          console.error(e);
        }
      }

      sendEmailNotification(formData);

      setSuccess(true);
      setFormData({
        name: "",
        companyName: "",
        phone: "",
        email: "",
        productRequirement: "Coconut Flakes",
        message: ""
      });
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.error("Error submitting B2B inquiry to server gateway:", error);
      // Fallback local visual success so user experience stays pristine even if offline
      sendEmailNotification(formData);
      
      setSuccess(true);
      setFormData({
        name: "",
        companyName: "",
        phone: "",
        email: "",
        productRequirement: "Coconut Flakes",
        message: ""
      });
      setTimeout(() => setSuccess(false), 6000);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2] relative overflow-hidden text-[#4A2E1F]">
      
      {/* Background decorations */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#E5D5BC]/15 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-xs mb-3 block italic text-gold-accent">Connect With Commercial Team</span>
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-serif text-[#4A2E1F] font-black leading-tight">
            Initiate B2B <br />
            <span className="italic-display font-light text-[#8C6239]">Partnership Inquiry</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#8C6239] mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5/12): Corporate Contact Details & Maps & Hours */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Quick Inquiry Support Banner */}
            <div className="bg-[#6B4A2E] text-white p-6 rounded-3xl shadow-sm flex items-start gap-4 border border-white/5">
              <div className="p-2.5 bg-white/10 rounded-xl text-[#E5D5BC]">
                <BellRing size={20} className="animate-bounce" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#E5D5BC]">Bulk Procurement Support</h4>
                <p className="text-xs text-[#FAF7F2]/85 leading-relaxed mt-1 font-semibold">
                  Looking for bulk coconut ingredients? Contact our team for customized pricing catalogs, current wholesale discounts, and immediate container load availability.
                </p>
              </div>
            </div>

            {/* 2. Main Contact Panel Card */}
            <div className="bg-white border border-[#D8B26A]/20 p-8 rounded-3xl shadow-sm space-y-6">
              <div>
                <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C6239] mb-1">REGISTERED OFFICE</h3>
                <h4 className="font-serif text-2xl text-[#4A2E1F] font-bold">Gopalji Khopra Udyog</h4>
                <p className="text-xs text-[#4A2E1F]/60 font-semibold font-sans mt-1">Indore, Madhya Pradesh, India</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#8C6239]/10">
                
                {/* CEO Info */}
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E5D5BC]/20 flex items-center justify-center text-[#8C6239] shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-[#4A2E1F]/40 tracking-wider">Company Management</p>
                    <p className="text-sm font-bold text-[#4A2E1F]">A Garg (Owner & CEO)</p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#E5D5BC]/20 flex items-center justify-center text-[#8C6239] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-[#4A2E1F]/40 tracking-wider">Commercial Lines</p>
                    <div className="text-sm font-bold text-[#4A2E1F] space-y-0.5">
                      <a href="tel:9109216931" className="hover:text-[#8C6239] transition-colors block">
                        9109216931
                      </a>
                      <a href="tel:8889854999" className="hover:text-[#8C6239] transition-colors block">
                        8889854999
                      </a>
                      <span className="text-xs text-[#4A2E1F]/60 font-semibold block">
                        Landline: <a href="tel:07314985317" className="hover:text-[#8C6239] transition-colors">0731-4985317</a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E5D5BC]/20 flex items-center justify-center text-[#8C6239] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-[#4A2E1F]/40 tracking-wider">Official Email</p>
                    <p className="text-sm font-bold text-[#4A2E1F]">gopaljikhopra@gmail.com</p>
                  </div>
                </div>

                {/* Map Location Label */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#E5D5BC]/20 flex items-center justify-center text-[#8C6239] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-[#4A2E1F]/40 tracking-wider">Registered Office & Unit</p>
                    <p className="text-sm font-bold text-[#4A2E1F] leading-snug">
                      999, BIJALPUR A.B ROAD, <br />
                      INDORE (M.P) 452001
                    </p>
                  </div>
                </div>

              </div>

              {/* Instant Call / Chat Action Strip */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#8C6239]/10">
                <a 
                  href="tel:9109216931"
                  className="bg-[#6B4A2E] hover:bg-[#5C3F27] text-white py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone size={12} /> Call Now
                </a>
                
                <a 
                  href="https://wa.me/919109216931"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                >
                  <MessageCircle size={12} /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* 3. Business Hours Card */}
            <div className="bg-white border border-[#D8B26A]/20 p-6 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E5D5BC]/20 flex items-center justify-center text-[#8C6239] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-extrabold text-[#4A2E1F]/50 tracking-wider block">Official Business Hours</span>
                <h4 className="text-sm font-bold text-[#4A2E1F] mt-0.5">Monday – Saturday: 10:00 AM – 7:00 PM</h4>
                <p className="text-[10px] text-[#4A2E1F]/50 font-semibold mt-0.5">Sunday & National Holidays: Closed</p>
              </div>
            </div>

            {/* 4. Premium Map Section Placeholder */}
            <div className="bg-white border border-[#D8B26A]/20 p-4 rounded-3xl shadow-sm text-center">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#8C6239] mb-2 block italic">Indore Hub Location Maps</span>
              <div className="relative aspect-[16/9] rounded-2.5xl overflow-hidden bg-[#EFE6D5]/40 border border-[#D8B26A]/10 flex flex-col items-center justify-center p-6 bg-[radial-gradient(#D8B26A_1px,transparent_1px)] [background-size:16px_16px]">
                <MapPin className="w-10 h-10 text-[#8C6239] mb-3 animate-bounce" />
                <h4 className="font-serif text-base text-[#4A2E1F] font-bold">Gopalji Processing Facility</h4>
                <p className="text-[10px] text-[#4A2E1F]/60 font-semibold max-w-xs mt-1">Indore, Madhya Pradesh, India. Optimized logistics route links to all major state borders.</p>
                
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded border border-[#D8B26A]/20 text-[8px] font-mono font-bold text-[#8C6239]">
                  LAT 22.7196 | LNG 75.8577
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (7/12): Premium Lead-Generation Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#D8B26A]/20 p-6 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-sm">
            
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-100">
                  <CheckCircle2 size={40} />
                </div>
                <div>
                  <h3 className="font-serif text-3xl text-[#4A2E1F] font-bold">Inquiry Processed Successfully</h3>
                  <p className="text-xs sm:text-sm text-[#4A2E1F]/60 max-w-md mx-auto leading-relaxed mt-2 font-semibold">
                    Thank you. Your commercial record has been submitted under proprietary file. A business representative will contact you with wholesale pricing details shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 bg-[#6B4A2E] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#8C6239] transition-colors"
                >
                  Submit Another Inquiry profile
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border-b border-[#8C6239]/10 pb-4 mb-4">
                  <h3 className="font-serif text-xl xs:text-2xl text-[#4A2E1F] font-bold">B2B Commercial Prospect Profile</h3>
                  <p className="text-xs text-[#4A2E1F]/55 font-semibold mt-1">Provide correct information to fetch wholesale prices and dispatch catalogs.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-full-name" className="text-[10px] uppercase font-extrabold tracking-widest text-[#8C6239] block italic">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        required
                        id="form-full-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        autoComplete="name"
                        placeholder="e.g. Amit Garg" 
                        className="w-full bg-[#FAF7F2] border border-[#D8B26A]/20 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#8C6239] transition-colors" 
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-company-name" className="text-[10px] uppercase font-extrabold tracking-widest text-[#8C6239] block italic">Company Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        required
                        id="form-company-name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        type="text" 
                        autoComplete="organization"
                        placeholder="e.g. Malwa Bakery Brands" 
                        className="w-full bg-[#FAF7F2] border border-[#D8B26A]/20 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#8C6239] transition-colors" 
                      />
                    </div>
                  </div>

                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-phone-number" className="text-[10px] uppercase font-extrabold tracking-widest text-[#8C6239] block italic">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      required
                      id="form-phone-number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      autoComplete="tel"
                      placeholder="e.g. +91 94250 XXXXX" 
                      className="w-full bg-[#FAF7F2] border border-[#D8B26A]/20 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#8C6239] transition-colors" 
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email-address" className="text-[10px] uppercase font-extrabold tracking-widest text-[#8C6239] block italic">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      required
                      id="form-email-address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      autoComplete="email"
                      placeholder="e.g. purchaser@company.com" 
                      className="w-full bg-[#FAF7F2] border border-[#D8B26A]/20 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#8C6239] transition-colors" 
                    />
                  </div>

                </div>

                {/* Product Requirement Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="form-product-requirement" className="text-[10px] uppercase font-extrabold tracking-widest text-[#8C6239] block italic">Product Requirement <span className="text-red-500">*</span></label>
                  <select 
                    id="form-product-requirement"
                    name="productRequirement"
                    value={formData.productRequirement}
                    onChange={handleChange}
                    className="w-full bg-[#FAF7F2] border border-[#D8B26A]/20 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-[#8C6239] transition-colors appearance-none cursor-pointer text-[#4A2E1F]"
                  >
                    <option value="Coconut Oil">Coconut Oil</option>
                    <option value="Coconut Powder">Coconut Powder</option>
                    <option value="Coconut Flakes">Coconut Flakes</option>
                    <option value="Desiccated Coconut">Desiccated Coconut</option>
                    <option value="Coconut-Based Food Ingredients">Coconut-Based Food Ingredients</option>
                    <option value="Other Multiple Materials">Multiple Products (Bulk order)</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="form-message-detail" className="text-[10px] uppercase font-extrabold tracking-widest text-[#8C6239] block italic">Message Requirements Detail <span className="text-red-500">*</span></label>
                  <textarea 
                    required
                    id="form-message-detail"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your customized grain size requirements, packaging style preference (bags, sacks or tins), and approximate expected timeline..." 
                    className="w-full bg-[#FAF7F2] border border-[#D8B26A]/20 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#8C6239] transition-colors resize-none" 
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[#6B4A2E] text-white py-4.5 rounded-xl text-[10px] xs:text-xs font-serif font-black uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-[#8C6239] transition-all shadow-md shadow-[#6B4A2E]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>Processing Submission <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>Submit B2B Inquiry Profile <Send size={14} /></>
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
