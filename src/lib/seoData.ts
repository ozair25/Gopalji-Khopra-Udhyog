/**
 * Centralized SEO & JSON-LD Structured Data Schema Configurations
 * For Gopalji Khopra Udyog (B2B Coconut Ingredients Supplier & Manufacturer, Indore, MP, India)
 */

export const BASE_URL = "https://gopaljikhopra.com"; // Production canonical base

export const SEO_KEYWORDS = [
  "Coconut Powder Manufacturer",
  "Coconut Flakes Supplier",
  "Coconut Oil Manufacturer",
  "Coconut Product Supplier",
  "Bulk Coconut Supplier",
  "Coconut Ingredient Manufacturer",
  "Food Grade Coconut Products",
  "Coconut Products Wholesaler",
  "Coconut Supplier in India",
  "Coconut Manufacturer in Indore",
  "Coconut Products Supplier in Madhya Pradesh",
  "Desiccated Coconut Supplier",
  "Coconut Food Ingredients Manufacturer"
];

// 1. Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Gopalji Khopra Udyog",
    "alternateName": ["Gopalji", "Gopalji Coconut Products"],
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo-b2b.webp`,
    "description": "Established in 2017 in Indore, Gopalji Khopra Udyog is a prestigious B2B Manufacturer and Wholesaler of high-grade Coconut Powder, Coconut Flakes, pure Coconut Oil, and Desiccated Coconut ingredients across India.",
    "foundingDate": "2017",
    "founder": {
      "@type": "Person",
      "name": "A Garg"
    },
    "knowsAbout": [
      "Coconut Food Ingredients Manufacturer",
      "Bulk Coconut Supplier",
      "Food Grade Coconut Products",
      "Industrial Coconut Powder Milling"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7949337073",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["Hindi", "English"]
    }
  };
}

// 2. Local Business Schema (Indore, Madhya Pradesh Targeting)
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gopalji Khopra Udyog",
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/6/518886167/EM/JZ/MS/147692506/whatsapp-image-2025-06-14-at-3-29-38-pm-1-500x500.jpeg",
    "@id": `${BASE_URL}/#local-business`,
    "url": BASE_URL,
    "telephone": "+91-7949337073",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Malwa Region Logistics Hub, Indore",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.7196",
      "longitude": "75.8577"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://gopaljikhopra.com",
      "https://www.indiamart.com/gopalji-khopra-udhyog/"
    ]
  };
}

// 3. Products Schema Index
export function getProductsSchema() {
  const productItems = [
    {
      name: "Premium Coconut Powder",
      desc: "Ultra-fine pulverized premium grade coconut meat. Zero chemical whitening, FSSAI compliant, high yield.",
      image: "https://5.imimg.com/data5/SELLER/Default/2025/6/518892156/TP/DM/ZB/147692506/15-kg-gopalji-manbhavan-coconut-flakes-500x500.jpeg",
      hsn: "08011100"
    },
    {
      name: "Long-Cut Coconut Flakes",
      desc: "Slick and pristine sweet white long flakes, perfect for high-end bakeries, roasted snack mixes, and chocolate coatings.",
      image: "https://5.imimg.com/data5/SELLER/Default/2025/6/518895920/YP/XM/PH/147692506/whatsapp-image-2025-06-14-at-3-31-19-pm-500x500.jpeg",
      hsn: "08011100"
    },
    {
      name: "Pure Cold-Pressed Coconut Oil",
      desc: "100% pure cold pressed. Rich flavor aroma, solvent residue free, high density fat profile.",
      image: "https://res.cloudinary.com/dtrvyelcg/image/upload/v1780224353/coconut_oil_pre_i4p9cx.jpg",
      hsn: "15131900"
    },
    {
      name: "Dehydrated Desiccated Coconut",
      desc: "Uniformly shredded fine/medium dehydrated coconut kernels with 65%+ rich natural fats and complete moisture extraction.",
      image: "https://5.imimg.com/data5/SELLER/Default/2025/6/518886167/EM/JZ/MS/147692506/whatsapp-image-2025-06-14-at-3-29-38-pm-1-500x500.jpeg",
      hsn: "08011100"
    }
  ];

  return productItems.map((prod, index) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": prod.name,
    "image": prod.image,
    "description": prod.desc,
    "mpn": prod.hsn,
    "brand": {
      "@type": "Brand",
      "name": "Gopalji"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "150",
      "highPrice": "340",
      "offerCount": "100",
      "priceRange": "Wholesale pricing quotes available on requirement"
    }
  }));
}

// 4. FAQ Schema
export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Gopalji Khopra Udyog's facility registered and compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are 100% compliant with standard registrations like GST (registered since July 2017), FSSAI food-safety protocols, MSME classification, and verified ICICI banking channels."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum quantity order (MOQ) for bulk shipments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As a pure-play Coconut Wholesaler and Manufacturer, we primarily cater to shipments starting from 500 KG to bulk Truckloads/Metric Tons for food processing hubs, sweet brands, and wholesale distribution channels."
        }
      },
      {
        "@type": "Question",
        "name": "How does Gopalji keep products fresh during transportation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All our products are packed in moisture-protected, heavy-duty multi-wall bags, vacuum sealed. This protects the dry texture, high-percentage coconut oils, and snow-white color from outdoor humidity."
        }
      },
      {
        "@type": "Question",
        "name": "Where is the manufacturing and logistics hub located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our corporate headquarters and hygienic processing infrastructure are strategically located in Indore, Madhya Pradesh, creating the fastest pan-India road logistics to reach any major manufacturing destination."
        }
      }
    ]
  };
}

// 5. Breadcrumb Schema
export function getBreadcrumbSchema(currPath: string, pageName: string) {
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    }
  ];

  if (currPath !== "/" && currPath !== "") {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageName,
      "item": `${BASE_URL}${currPath}`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
}
