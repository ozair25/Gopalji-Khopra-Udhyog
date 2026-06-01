import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Industries from '../components/Industries';
import B2BConnectionCTA from '../components/B2BConnectionCTA';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import { 
  getOrganizationSchema, 
  getProductsSchema, 
  getBreadcrumbSchema,
  SEO_KEYWORDS
} from '../lib/seoData';

export default function ProductsServices() {
  const schemas = [
    getOrganizationSchema(),
    ...getProductsSchema(),
    getBreadcrumbSchema("/products-services", "Products & Services")
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEO 
        title="Bulk Coconut Ingredients Supplier India | Gopalji Khopra Udyog" 
        description="Browse premium food-grade desiccated coconut powder, sweet long-cut coconut flakes, and pure cold-pressed coconut oil. High-volume contract rates for bakery and confectionery brands." 
        canonicalUrl="https://gopaljikhopra.com/products-services"
        keywords={SEO_KEYWORDS}
        schemas={schemas}
      />
      <Navbar />
      <div className="pt-[76px] xs:pt-[88px] sm:pt-[108px] lg:pt-[120px]">
        {/* Subtle, luxury catalog transition header */}
        <div className="bg-[#EFE6D5]/50 border-b border-[#D8B26A]/20 py-16 text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8C6239] mb-3 block italic animate-pulse">Industrial Grade Products</span>
            <h1 className="text-3xl md:text-5xl font-serif text-[#4A2E1F] font-black tracking-tight mb-4">
              Our Products & Industrial Services
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#4A2E1F]/70 max-w-2xl mx-auto font-semibold">
              Sourcing top-tier raw materials, milled under precise physical standards. High-tonnage capacity and FSSAI approved specifications on demand.
            </p>
          </div>
        </div>
        <Products />
        <Industries />
        <B2BConnectionCTA />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
