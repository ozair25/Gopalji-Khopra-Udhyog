/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeOverview from './components/HomeOverview';
import Products from './components/Products';
import Industries from './components/Industries';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import B2BConnectionCTA from './components/B2BConnectionCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingInquiryPanel from './components/FloatingInquiryPanel';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// SEO & Performance Components
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import { 
  getOrganizationSchema, 
  getLocalBusinessSchema, 
  getProductsSchema, 
  getFAQSchema, 
  getBreadcrumbSchema,
  SEO_KEYWORDS
} from './lib/seoData';

// 1. Home Page View
function MainSite() {
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
        description="Established in 2017, Gopalji Khopra Udyog is India's premium B2B Coconut Powder Manufacturer, Wholesale Coconut Flakes Supplier, and Cold-Pressed Coconut Oil Supplier in Indore, Madhya Pradesh. FSSAI certified, food-grade bulk supplies." 
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

// 2. Products & Services Dedicated View
function ProductsServicesSite() {
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
      <div className="pt-20">
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

// 3. About Us Dedicated View
function AboutUsSite() {
  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema("/about-us", "About Us")
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEO 
        title="About Us & Quality Control Standards | Gopalji Khopra Udyog" 
        description="Operating in Indore since 2017, we are a leading Coconut Manufacturer in Indore, Madhya Pradesh. Read our corporate factsheet, food safety quality certifications, and MSME compliance data." 
        canonicalUrl="https://gopaljikhopra.com/about-us"
        keywords={SEO_KEYWORDS}
        schemas={schemas}
      />
      <Navbar />
      <div className="pt-20">
        {/* Subtle, luxury company transition header */}
        <div className="bg-[#EFE6D5]/50 border-b border-[#D8B26A]/20 py-16 text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8C6239] mb-3 block italic">Established 2017</span>
            <h1 className="text-3xl md:text-5xl font-serif text-[#4A2E1F] font-black tracking-tight mb-4">
              Our Legacy, Infrastructure & Ethics
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#4A2E1F]/70 max-w-2xl mx-auto font-semibold">
              Trusted corporate food supplier with a high-capacity mill. Meticulous quality monitoring and strict raw material sanitation auditing.
            </p>
          </div>
        </div>
        <AboutUs />
        <B2BConnectionCTA />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// 4. Contact Us Dedicated View
function ContactUsSite() {
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
      <div className="pt-20">
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/products-services" element={<ProductsServicesSite />} />
        <Route path="/about-us" element={<AboutUsSite />} />
        <Route path="/contact-us" element={<ContactUsSite />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <FloatingInquiryPanel />
    </Router>
  );
}
