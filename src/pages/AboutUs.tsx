import Navbar from '../components/Navbar';
import AboutUsComponent from '../components/AboutUs';
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

export default function AboutUs() {
  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema("/about-us", "About Us")
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEO 
        title="About Us & Quality Control Standards | Gopalji Khopra Udyog" 
        description="Operating in Indore since 2007, we are a leading Coconut Manufacturer in Indore, Madhya Pradesh. Read our corporate factsheet, food safety quality certifications, and MSME compliance data." 
        canonicalUrl="https://www.gopaljikhopraudhyog.com/about-us"
        keywords={SEO_KEYWORDS}
        schemas={schemas}
      />
      <Navbar />
      <div className="pt-[76px] xs:pt-[88px] sm:pt-[108px] lg:pt-[120px]">
        {/* Subtle, luxury company transition header */}
        <div className="bg-[#EFE6D5]/50 border-b border-[#D8B26A]/20 py-16 text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8C6239] mb-3 block italic">Established 2007</span>
            <h1 className="text-3xl md:text-5xl font-serif text-[#4A2E1F] font-black tracking-tight mb-4">
              Our Legacy, Infrastructure & Ethics
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#4A2E1F]/70 max-w-2xl mx-auto font-semibold">
              Trusted corporate food supplier with a high-capacity factory. Meticulous quality monitoring and strict raw material sanitation auditing.
            </p>
          </div>
        </div>
        <AboutUsComponent />
        <B2BConnectionCTA />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
