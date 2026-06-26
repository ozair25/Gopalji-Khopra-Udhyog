import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HomeOverview from '../components/HomeOverview';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import { 
  getOrganizationSchema, 
  getLocalBusinessSchema, 
  getFAQSchema, 
  getBreadcrumbSchema,
  getProductsSchema,
  SEO_KEYWORDS
} from '../lib/seoData';

export default function MainSite() {
  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getFAQSchema(),
    getBreadcrumbSchema("/", "Home")
  ];
  const prodSchemas = getProductsSchema();
  const allSchemas = [...schemas, ...prodSchemas];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Coconut Powder & Flakes Manufacturer in Indore | Gopalji Khopra" 
        description="Established in 2007, Gopalji Khopra Udyog is India's premium B2B Coconut Powder Manufacturer, Wholesale Coconut Flakes Supplier, and Cold-Pressed Coconut Oil Supplier in Indore, Madhya Pradesh. FSSAI certified, food-grade bulk supplies." 
        canonicalUrl="https://gopaljikhopra.com"
        keywords={SEO_KEYWORDS}
        schemas={allSchemas}
      />
      <Navbar />
      <main>
        <Hero />
        <HomeOverview />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
