import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  schemas?: object[];
}

export default function SEO({ title, description, canonicalUrl, keywords, schemas }: SEOProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Update Title
    document.title = title;

    // Helper to get or create a meta tag
    const setMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to get or create a link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Core Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Canonical URL
    setLinkTag('canonical', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Gopalji Khopra Udyog');
    setMetaTag('property', 'og:image', 'https://5.imimg.com/data5/SELLER/Default/2025/6/518886167/EM/JZ/MS/147692506/whatsapp-image-2025-06-14-at-3-29-38-pm-1-500x500.jpeg');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', 'https://5.imimg.com/data5/SELLER/Default/2025/6/518886167/EM/JZ/MS/147692506/whatsapp-image-2025-06-14-at-3-29-38-pm-1-500x500.jpeg');

    // 6. Geographic / Local SEO Meta Tags
    setMetaTag('name', 'geo.region', 'IN-MP');
    setMetaTag('name', 'geo.platename', 'Indore');
    setMetaTag('name', 'geo.position', '22.7196;75.8577');
    setMetaTag('name', 'ICBM', '22.7196, 75.8577');

    // 7. Dynamic JSON-LD Schema Script Elements
    const existingScripts = document.querySelectorAll('script[data-seo-schema="true"]');
    existingScripts.forEach((script) => script.remove());

    if (schemas && schemas.length > 0) {
      schemas.forEach((schemaObj) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-schema', 'true');
        script.innerHTML = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }

    // Cleanup function
    return () => {
      // We don't necessarily need to wipe common meta tags but can remove dynamic schemas
      const scripts = document.querySelectorAll('script[data-seo-schema="true"]');
      scripts.forEach((script) => script.remove());
    };
  }, [title, description, canonicalUrl, keywords, schemas]);

  return null;
}
