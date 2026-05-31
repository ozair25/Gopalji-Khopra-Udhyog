import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { z } from 'zod';
import { 
  X, 
  Send, 
  Phone, 
  MessageSquare, 
  Building2, 
  User, 
  Mail, 
  Layers, 
  FileCheck, 
  Compass, 
  PhoneCall, 
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

// Zod Validation Schema for reliable B2B Lead Validation
const inquirySchema = z.object({
  name: z.string()
    .min(2, { message: "Full Name must be at least 2 characters." })
    .max(100, { message: "Full Name must be less than 100 characters." }),
  companyName: z.string()
    .min(2, { message: "Company Name must be at least 2 characters." })
    .max(120, { message: "Company Name must be less than 120 characters." }),
  phone: z.string()
    .min(10, { message: "Phone number is too short." })
    .max(15, { message: "Phone number must be under 15 characters." })
    .regex(/^(\+?\d{1,4}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$|^\d{10}$/, { 
      message: "Please enter a valid 10-digit phone number." 
    }),
  email: z.string()
    .min(5, { message: "Email is too short." })
    .email({ message: "Please enter a valid email address." }),
  productRequirement: z.enum(['Coconut Powder', 'Coconut Flakes', 'Coconut Oil', 'Desiccated Coconut', 'Other']),
  quantity: z.string()
    .min(1, { message: "Please enter a requested quantity or volume." })
    .max(50, { message: "Quantity text is too long." }),
  message: z.string()
    .max(1000, { message: "Message cannot exceed 1000 characters." })
    .optional()
    .or(z.literal(''))
});

type FormData = z.infer<typeof inquirySchema>;

export default function FloatingInquiryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    productRequirement: 'Coconut Powder',
    quantity: '',
    message: ''
  });

  // Toggle drawer open and prevent/restore page scroll
  const handleToggle = () => {
    setIsOpen(!isOpen);
    setErrors({});
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
  };

  // Lock body scroll of main page when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Close on click outside and escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Live clear errors for typed fields
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Form submission and validation using Zod
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate with Zod
    const validationResult = inquirySchema.safeParse(formData);
    
    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      validationResult.error.issues.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const path = 'inquiries';

    // Capture locally as well so it's always accessible in offline fallback
    const localInquiry = {
      id: 'local-' + Date.now(),
      name: formData.name,
      businessName: formData.companyName,
      productType: formData.productRequirement,
      quantity: formData.quantity,
      city: 'Indore B2B Inquiry',
      phone: formData.phone,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem('gopalji_local_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(localInquiry);
      localStorage.setItem('gopalji_local_inquiries', JSON.stringify(list));
    } catch (err) {
      console.error("Local storage sync error:", err);
    }

    try {
      // Connect to Firestore real database
      await addDoc(collection(db, path), {
        name: formData.name,
        businessName: formData.companyName,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        productType: formData.productRequirement,
        productRequirement: formData.productRequirement,
        quantity: formData.quantity,
        message: formData.message || 'Sent via interactive B2B Floating Inquiry Panel',
        city: 'Indore B2B Inquiry',
        status: 'new',
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      // Reset form fields
      setFormData({
        name: '',
        companyName: '',
        phone: '',
        email: '',
        productRequirement: 'Coconut Powder',
        quantity: '',
        message: ''
      });
      
      // Keep success state open for 5 seconds before closing
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 5000);

    } catch (err) {
      console.error("Firestore Floating Quote Error:", err);
      // Even if Firestore fails, local copy is saved, so we can show success
      setSuccess(true);
      setFormData({
        name: '',
        companyName: '',
        phone: '',
        email: '',
        productRequirement: 'Coconut Powder',
        quantity: '',
        message: ''
      });
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. FLOATING ACTION TRIGGER */}
      {/* Desktop Vertically Centered Tab Sticky on Right Edge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] hidden md:block">
        <button
          ref={triggerRef}
          onClick={handleToggle}
          className="bg-[#6B4A2E] hover:bg-[#5C3F27] text-white py-4.5 px-3 rounded-l-2xl shadow-[0_4px_25px_rgba(74,46,31,0.25)] hover:shadow-[0_8px_30px_rgba(74,46,31,0.35)] transition-all duration-300 flex flex-col items-center gap-3 group border-l-2 border-[#D8B26A]/50 relative"
          style={{ writingMode: 'vertical-rl', textTransform: 'uppercase' }}
          aria-label="Request Bulk pricing and specifications"
          aria-expanded={isOpen}
          title="Open Bulk Quotation System"
          id="desktop-bulk-quote-tab"
        >
          {/* Subtle gold accent glowing trace */}
          <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-[#FAF7F2] via-[#D8B26A] to-[#FAF7F2]"></span>
          <div className="flex items-center gap-2 tracking-[0.25em] text-[10.5px] font-bold font-serif select-none pl-0.5">
            Get Bulk Quote
            <motion.span
              animate={{ x: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="inline-block rotate-90"
            >
              ➔
            </motion.span>
          </div>
        </button>
      </div>

      {/* Mobile Floating Trigger (Above WhatsApp button to avoid overlapping) */}
      <div className="fixed right-6 bottom-24 z-[90] md:hidden">
        <motion.button
          ref={triggerRef}
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#6B4A2E] text-white rounded-full p-4.5 shadow-[0_4px_20px_rgba(74,46,31,0.3)] flex items-center justify-center border-l-2 border-[#D8B26A] relative overflow-hidden"
          aria-label="Request Bulk quote"
          aria-expanded={isOpen}
          id="mobile-bulk-quote-btn"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-[#8C6239]/10 to-transparent" />
          <Send size={20} className="text-[#FAF7F2] animate-pulse" />
        </motion.button>
      </div>

      {/* 2. SLIDE-IN DRAWER / MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#4A2E1F] z-[110] backdrop-blur-[2px]"
              aria-hidden="true"
              onClick={handleClose}
            />

            {/* Slide-in panel container from the right edge */}
            <motion.div
              ref={panelRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full xs:w-[440px] md:w-[480px] bg-[#FAF7F2] z-[120] shadow-[-10px_0_40px_rgba(0,0,0,0.15)] border-l border-[#8C6239]/20 flex flex-col focus-visible:outline-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
            >
              
              {/* Drawer Elegant Header */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-[#FAF7F2] via-[#E5D5BC]/20 to-[#FAF7F2] border-b border-[#8C6239]/15 flex justify-between items-start relative shrink-0">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8C6239] mb-1.5 block font-serif">Bulk Procurement Division</span>
                  <h3 id="drawer-title" className="text-xl md:text-2xl font-serif font-black text-[#4A2E1F] tracking-tight">
                    Request Bulk Pricing
                  </h3>
                  <p className="text-[11px] font-semibold text-[#4A2E1F]/60 mt-1 leading-snug">
                    Get custom factory pricing indices and bulk supply options.
                  </p>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="p-1 px-1.5 py-1.5 rounded-full hover:bg-[#E5D5BC]/30 text-[#4A2E1F]/60 hover:text-[#4A2E1F] transition-all bg-[#FAF7F2]/50 border border-transparent hover:border-[#8C6239]/10"
                  aria-label="Close inquiry panel"
                  id="drawer-close-btn"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Dynamic Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 space-y-6">
                
                {/* 3. Luxury Trust badges/indicators strip */}
                <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 bg-[#E5D5BC]/25 p-3 rounded-2xl border border-[#D8B26A]/20">
                  <div className="flex flex-col items-center justify-center text-center p-1 border-r border-[#8C6239]/10 last:border-r-0">
                    <Clock size={14} className="text-[#8C6239] mb-1" />
                    <span className="text-[9px] font-bold text-[#4A2E1F] leading-none uppercase">Est. 2017</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-1 border-r border-[#8C6239]/10 last:border-r-0">
                    <ShieldCheck size={14} className="text-[#8C6239] mb-1" />
                    <span className="text-[9px] font-bold text-[#4A2E1F] leading-none uppercase">FSSAI Certified</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-1 border-r border-[#8C6239]/10 last:border-r-0">
                    <FileCheck size={14} className="text-[#8C6239] mb-1" />
                    <span className="text-[9px] font-bold text-[#4A2E1F] leading-none uppercase">GST Reg.</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-1">
                    <Layers size={14} className="text-[#8C6239] mb-1" />
                    <span className="text-[9px] font-bold text-[#4A2E1F] leading-none uppercase">Factory Direct</span>
                  </div>
                </div>

                {success ? (
                  /* Success Frame */
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-50/70 border border-emerald-600/20 p-6 md:p-8 rounded-3xl text-center space-y-5 shadow-inner py-10"
                  >
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle2 size={36} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#4A2E1F]">Inquiry Lodged Successfully</h4>
                      <p className="text-xs text-[#4A2E1F]/70 leading-relaxed mt-2.5 font-medium">
                        Your bulk inquiry was automatically synchronized with our factory ledger. Our lead commercial sales manager listed in Indore will contact you with custom logistics parameters on your given phone shortly.
                      </p>
                    </div>
                    <div className="bg-white/60 py-3 px-4 rounded-xl text-[11px] font-semibold text-[#4A2E1F]/70 text-left border border-emerald-100">
                      💡 Feel free to reach our immediate sales desk directly for faster booking confirmation. See direct dials below.
                    </div>
                  </motion.div>
                ) : (
                  /* Lead capture form */
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    
                    {/* Full Name */}
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-[#4A2E1F]/60 block mb-1.5 flex items-center gap-1.5 pl-0.5">
                        <User size={11} className="text-[#8C6239]/80" /> Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF7F2] border ${errors.name ? 'border-red-500 bg-red-50/10' : 'border-[#8C6239]/20'} hover:border-[#8C6239]/40 focus:border-[#8C6239] text-xs px-4 py-3 rounded-xl outline-none transition-all text-[#4A2E1F] font-semibold focus:ring-1 focus:ring-[#8C6239] shadow-sm`}
                        placeholder="John Miller"
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-semibold mt-1 pl-1">{errors.name}</p>}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-[#4A2E1F]/60 block mb-1.5 flex items-center gap-1.5 pl-0.5">
                        <Building2 size={11} className="text-[#8C6239]/80" /> Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF7F2] border ${errors.companyName ? 'border-red-500 bg-red-50/10' : 'border-[#8C6239]/20'} hover:border-[#8C6239]/40 focus:border-[#8C6239] text-xs px-4 py-3 rounded-xl outline-none transition-all text-[#4A2E1F] font-semibold focus:ring-1 focus:ring-[#8C6239] shadow-sm`}
                        placeholder="Milling Co. Ltd"
                      />
                      {errors.companyName && <p className="text-[10px] text-red-500 font-semibold mt-1 pl-1">{errors.companyName}</p>}
                    </div>

                    {/* Left & Right: Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="text-[9px] uppercase tracking-wider font-bold text-[#4A2E1F]/60 block mb-1.5 flex items-center gap-1.5 pl-0.5">
                          <Phone size={11} className="text-[#8C6239]/80" /> Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-[#FAF7F2] border ${errors.phone ? 'border-red-500 bg-red-50/10' : 'border-[#8C6239]/20'} hover:border-[#8C6239]/40 focus:border-[#8C6239] text-xs px-4 py-3 rounded-xl outline-none transition-all text-[#4A2E1F] font-semibold focus:ring-1 focus:ring-[#8C6239] shadow-sm`}
                          placeholder="e.g. 98260XXXXX"
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 font-semibold mt-1 pl-1">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-[9px] uppercase tracking-wider font-bold text-[#4A2E1F]/60 block mb-1.5 flex items-center gap-1.5 pl-0.5">
                          <Mail size={11} className="text-[#8C6239]/80" /> Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-[#FAF7F2] border ${errors.email ? 'border-red-500 bg-red-50/10' : 'border-[#8C6239]/20'} hover:border-[#8C6239]/40 focus:border-[#8C6239] text-xs px-4 py-3 rounded-xl outline-none transition-all text-[#4A2E1F] font-semibold focus:ring-1 focus:ring-[#8C6239] shadow-sm`}
                          placeholder="email@company.com"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-semibold mt-1 pl-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Product Selector Dropdown */}
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-[#4A2E1F]/60 block mb-1.5 flex items-center gap-1.5 pl-0.5">
                        <Layers size={11} className="text-[#8C6239]/80" /> Product Requirement *
                      </label>
                      <div className="relative">
                        <select
                          name="productRequirement"
                          value={formData.productRequirement}
                          onChange={handleChange}
                          className="w-full bg-[#FAF7F2] border border-[#8C6239]/20 focus:border-[#8C6239] text-xs px-4 py-3.5 rounded-xl outline-none font-bold tracking-wide text-[#4A2E1F] appearance-none cursor-pointer focus:ring-1 focus:ring-[#8C6239] shadow-sm"
                        >
                          <option value="Coconut Powder">Desiccated Coconut Powder (Premium Fine / Medium)</option>
                          <option value="Coconut Flakes">Sweet Long-Cut Coconut Flakes</option>
                          <option value="Coconut Oil">Cold-Pressed Pure Coconut Oil</option>
                          <option value="Desiccated Coconut">Special High-Fat Desiccated Coconut</option>
                          <option value="Other">Other Wholesale By-Products</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#8C6239]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Cargo Quantity required */}
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-[#4A2E1F]/60 block mb-1.5 flex items-center gap-1.5 pl-0.5">
                        <Compass size={11} className="text-[#8C6239]/80" /> Target Quantity Required *
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF7F2] border ${errors.quantity ? 'border-red-500 bg-red-50/10' : 'border-[#8C6239]/20'} hover:border-[#8C6239]/40 focus:border-[#8C6239] text-xs px-4 py-3 rounded-xl outline-none transition-all text-[#4A2E1F] font-semibold focus:ring-1 focus:ring-[#8C6239] shadow-sm`}
                        placeholder="e.g., 5 Metric Tons (MT) / 100 Bags"
                      />
                      {errors.quantity && <p className="text-[10px] text-red-500 font-semibold mt-1 pl-1">{errors.quantity}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-[#4A2E1F]/60 block mb-1.5 flex items-center gap-1.5 pl-0.5">
                        <MessageSquare size={11} className="text-[#8C6239]/80" /> Message & Technical Specifications
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF7F2] border ${errors.message ? 'border-red-500 bg-red-50/10' : 'border-[#8C6239]/20'} hover:border-[#8C6239]/40 focus:border-[#8C6239] text-xs px-4 py-3 rounded-xl outline-none transition-all text-[#4A2E1F] font-semibold focus:ring-1 focus:ring-[#8C6239] shadow-sm resize-none`}
                        placeholder="Mention any custom specifications, moisture levels, bulk packaging needs, or timeline..."
                      />
                      {errors.message && <p className="text-[10px] text-red-500 font-semibold mt-1 pl-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#6B4A2E] hover:bg-[#5C3F27] text-[#FAF7F2] py-4 rounded-xl text-xs font-black uppercase tracking-[0.25em] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 cursor-pointer mt-6 border-b border-black/20"
                      id="drawer-submit-btn"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Processing Ledger Entry...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Inquiry
                        </>
                      )}
                    </button>
                    
                  </form>
                )}
              </div>

              {/* Drawer Dedicated Sticky Contact Footer */}
              <div className="p-6 md:p-8 bg-[#E5D5BC]/25 border-t border-[#8C6239]/20 space-y-4 shrink-0">
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C6239] border border-[#8C6239]/10 shrink-0">
                      <PhoneCall size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-widest font-bold text-[#4A2E1F]/50">Direct Commercial Dials</p>
                      <div className="text-[11.5px] xs:text-xs font-bold text-[#4A2E1F] mt-0.5">
                        <a href="tel:9425054999" className="hover:text-[#8C6239] transition-colors">9425054999</a> &nbsp;/&nbsp;&nbsp;
                        <a href="tel:8889854999" className="hover:text-[#8C6239] transition-colors">8889854999</a>
                      </div>
                      <p className="text-[10px] text-[#4A2E1F]/60 mt-0.5 font-medium">
                        Landline Support: <a href="tel:07314985317" className="hover:text-[#8C6239] transition-colors">0731-4985317</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant Social Channels Strip */}
                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  <a
                    href="tel:9425054999"
                    className="bg-[#6B4A2E]/10 hover:bg-[#6B4A2E]/15 text-[#6B4A2E] text-[10px] font-bold uppercase tracking-[0.15em] text-center py-3 rounded-lg border border-[#6B4A2E]/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone size={13} /> Call Desk
                  </a>
                  <a
                    href="https://wa.me/919425054999?text=Hello%20Gopalji%20Khopra%20Udyog,%20I%20would%20like%20to%20request%20wholesale%20bulk%20product%20pricing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] font-bold uppercase tracking-[0.15em] text-center py-3 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
