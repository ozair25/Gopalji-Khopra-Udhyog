import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import B2BConnectionCTA from '../components/B2BConnectionCTA';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import { 
  getOrganizationSchema, 
  getLocalBusinessSchema, 
  getBreadcrumbSchema,
  SEO_KEYWORDS
} from '../lib/seoData';

export default function ContactUs() {
  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema("/contact-us", "Contact Us")
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEO 
        title="Contact Commercial Sales Office | Gopalji Khopra Udyog" 
        description="Connect with our sales office in Indore, MP. Fill out our commercial lead intake form to request price lists, custom moisture parameters, bulk delivery quotes, or sample shipments." 
        canonicalUrl="https://gopaljikhopra.com/contact-us"
        keywords={SEO_KEYWORDS}
        schemas={schemas}
      />
      <Navbar />
      <div className="pt-[76px] xs:pt-[88px] sm:pt-[108px] lg:pt-[120px]">
        {/* Subtle, luxury contact transition header */}
        <div className="bg-[#EFE6D5]/50 border-b border-[#D8B26A]/20 py-16 text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8C6239] mb-3 block italic">Commercial Division Indore</span>
            <h1 className="text-3xl md:text-5xl font-serif text-[#4A2E1F] font-black tracking-tight mb-4">
              Connect With Our Corporate Sales Team
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#4A2E1F]/70 max-w-2xl mx-auto font-semibold">
              Inquire about current bulk pricing matrices, contract capacities, packing variants, and custom logistic routes.
            </p>
          </div>
        </div>
        <Contact />
        <B2BConnectionCTA />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
