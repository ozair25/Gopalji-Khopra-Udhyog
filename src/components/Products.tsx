import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, ChevronRight, Phone, Send, ClipboardCheck, Package, ArrowRight } from 'lucide-react';
import { categories } from '../data/products';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const visibleProducts =
    activeCategory === 'all'
      ? categories.flatMap((c) => c.products)
      : categories.find((c) => c.id === activeCategory)?.products ?? [];

  const handleEnquire = (product: Product) => {
    // Navigate to the contact-us route page with the product name as a query parameter
    navigate(`/contact-us?product=${encodeURIComponent(product.name)}`);
    
    // Also fire a matching custom event to preselect product categories
    let categorySelect = 'Coconut-Based Food Ingredients';
    if (product.categoryId === 'coconut-flakes') {
      categorySelect = 'Coconut Flakes';
    } else if (product.categoryId === 'coconut-powder') {
      categorySelect = 'Coconut Powder';
    } else if (product.categoryId === 'desiccated-coconut') {
      categorySelect = 'Desiccated Coconut';
    } else if (product.categoryId === 'cold-pressed-coconut-oil') {
      categorySelect = 'Coconut Oil';
    }
    
    const event = new CustomEvent('selectProduct', {
      detail: {
        productName: product.name,
        category: categorySelect
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden text-[#4A2E1F]">
      
      {/* Background decoration */}
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-[#E5D5BC]/25 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Products Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-[#8C6239]/10 pb-8">
          <div className="max-w-2xl">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-xs mb-3 block italic text-gold-accent">Our Product Range</span>
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-serif text-[#4A2E1F] font-black leading-tight">
              Premium Coconut <br />
              <span className="italic-display font-light text-[#8C6239]">Ingredients Catalog</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[#3D2B1F]/70 text-xs sm:text-sm leading-relaxed font-semibold">
              Gopalji Khopra Udyog is India's premier B2B manufacturer. All products are FSSAI & ISO certified, designed specifically for bakeries, sweet shops, and confectionery pipelines.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap justify-center sm:justify-start gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-[#6B4A2E] text-white shadow-md shadow-[#6B4A2E]/20'
                : 'bg-white text-[#6B4A2E] border border-[#6B4A2E]/20 hover:bg-[#E3D3BE]/40'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#6B4A2E] text-white shadow-md shadow-[#6B4A2E]/20'
                  : 'bg-white text-[#6B4A2E] border border-[#6B4A2E]/20 hover:bg-[#E3D3BE]/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEnquire={handleEnquire}
            />
          ))}
        </div>

        {/* B2B CTA SECTION 1: After Products Section */}
        <div className="my-16 bg-white border border-[#D8B26A]/20 rounded-[2.5rem] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden">
          <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-[#E5D5BC]/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-[10px] block italic">Procurement Service Channels</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#4A2E1F] font-black leading-tight">
              Need Bulk Coconut Ingredients?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A2E1F]/70 leading-relaxed max-w-2xl mx-auto font-semibold">
              Connect with our commercial sales division for specialized pricing, continuous wholesale supply schedules, and custom formulations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a 
                href="tel:9425054999"
                className="bg-[#6B4A2E] hover:bg-[#5C3F27] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Phone size={14} /> Call Now
              </a>
              <Link 
                to="/contact-us"
                className="border border-[#6B4A2E]/40 hover:bg-[#6B4A2E]/5 text-[#4A2E1F] px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Inquiry
              </Link>
            </div>
          </div>
        </div>

        {/* HSN CODE TABLE SECTION */}
        <div className="pt-8 border-t border-[#8C6239]/10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[#8C6239] font-bold uppercase tracking-[0.3em] text-xs mb-2 block italic">Tax & Logistical Compliance</span>
            <h3 className="text-2xl font-serif text-[#4A2E1F] font-bold">Standardized HSN Classification</h3>
            <p className="text-xs text-[#4A2E1F]/60 mt-2 font-semibold">Official B2B codes for proper tax calculation and logistical clearing.</p>
          </div>

          <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-[#D8B26A]/20 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#6B4A2E] text-white uppercase text-[10px] tracking-[0.15em] font-bold">
                  <th className="py-4 px-6 sm:px-8">HSN Code</th>
                  <th className="py-4 px-6 sm:px-8 border-l border-white/10">Applicable Products</th>
                  <th className="py-4 px-6 sm:px-8 border-l border-white/10 text-right">Standard Rate GST</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-[#4A2E1F]/80">
                <tr className="border-b border-[#D8B26A]/10 hover:bg-[#FAF7F2] transition-colors font-medium">
                  <td className="py-4 px-6 sm:px-8 font-mono text-[#8C6239] font-bold">08011100</td>
                  <td className="py-4 px-6 sm:px-8 font-semibold text-[#4A2E1F]">Desiccated Coconuts & Shredded Flakes</td>
                  <td className="py-4 px-6 sm:px-8 text-right font-medium text-[#4A2E1F]/70">Product Compliant</td>
                </tr>
                <tr className="hover:bg-[#FAF7F2] transition-colors font-medium">
                  <td className="py-4 px-6 sm:px-8 font-mono text-[#8C6239] font-bold">15131900</td>
                  <td className="py-4 px-6 sm:px-8 font-semibold text-[#4A2E1F]">Coconut Oil & Extractions</td>
                  <td className="py-4 px-6 sm:px-8 text-right font-medium text-[#4A2E1F]/70">Product Compliant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
