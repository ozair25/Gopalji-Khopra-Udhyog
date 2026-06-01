// src/data/products.ts
// Gopalji Khopra Udyog — Product Catalogue
// 6 Categories | 14 Products | SEO Optimized

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  seoTitle: string
  seoDescription: string
  price: string
  priceUnit: string
  moq: string
  images: string[]
  category: string
  categoryId: string
  badge?: string
  description: string
  specs: ProductSpec[]
  applications?: string
  packagingOptions?: string
  certifications?: string[]
  hsn?: string
  itemCode?: string
  shelfLife?: string
}

export interface Category {
  id: string
  name: string
  seoTitle: string
  description: string
  products: Product[]
}

export const categories: Category[] = [

  // ─────────────────────────────────────────
  // CATEGORY A — COCONUT FLAKES
  // ─────────────────────────────────────────
  {
    id: 'coconut-flakes',
    name: 'Coconut Flakes',
    seoTitle: 'Wholesale Coconut Flakes Manufacturer India | Gopalji Khopra Udyog',
    description: 'Premium desiccated coconut flakes for bakeries, confectioneries, and food manufacturers. ISO & FSSAI certified. Available in 1kg retail and 15kg bulk PP bags.',
    products: [

      {
        id: 'manbhavan-coconut-flakes-15kg',
        name: '15 Kg Manbhavan Coconut Flakes',
        seoTitle: 'Manbhavan Coconut Flakes 15kg Bulk | ISO FSSAI Certified | Gopalji',
        seoDescription: 'Buy Manbhavan Coconut Flakes in 15kg PP bags. High-fat desiccated coconut for bakeries, confectioneries & catering. ISO & FSSAI certified. MOQ 60kg.',
        price: '₹225',
        priceUnit: '/Kg',
        moq: '60 Kg',
        badge: 'Bulk Pack',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780169974/15-kg-gopalji-manbhavan-coconut-flakes-500x500_m9amvf.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146947/1--manbhawab_coco_mtqoyf.webp',
        ],
        category: 'Coconut Flakes',
        categoryId: 'coconut-flakes',
        description: 'Manbhavan Coconut Flakes are made from high-grade desiccated coconuts, delivering natural flavor and ideal texture. Bulk-packed in 15kg PP bags for food manufacturers, catering services, and large-scale commercial kitchens. FSSAI certified with a 6-month shelf life.',
        specs: [
          { label: 'Coconut Type', value: 'Desiccated' },
          { label: 'Fat Content', value: 'High Fat' },
          { label: 'Sweetness', value: 'Sweetened' },
          { label: 'Pack Size', value: '15 Kg' },
          { label: 'Pack Type', value: 'PP Bag' },
          { label: 'Shelf Life', value: '6 Months' },
        ],
        applications: 'Snacks, Bakery, Breakfast Cereal, Ice Cream, Catering, Confectionery',
        certifications: ['ISO', 'FSSAI'],
        itemCode: '301951560',
      },

      {
        id: 'manbhavan-coconut-flakes-1kg',
        name: '1 Kg Manbhavan Coconut Flakes',
        seoTitle: 'Manbhavan Coconut Flakes 1kg Retail Pouch | FSSAI Certified | Gopalji',
        seoDescription: 'Manbhavan 1kg coconut flakes in sealed pouch. Fresh, lightly sweetened, high-fat desiccated coconut for bakeries and home kitchens. ISO & FSSAI certified.',
        price: '₹300',
        priceUnit: '/Kg',
        moq: '15 Kg',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780236349/1kg_manbhavn_acwbwd.jpg',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146946/2--backside_dhsebn.webp',
        ],
        category: 'Coconut Flakes',
        categoryId: 'coconut-flakes',
        description: 'Manbhavan 1kg Coconut Flakes are crafted from fresh handpicked coconuts — rich in taste, natural aroma, and perfect texture. Sealed in a 1kg pouch for freshness. Ideal for home kitchens, bakeries, and sweet preparations. FSSAI certified for hygiene and food safety.',
        specs: [
          { label: 'Coconut Type', value: 'Desiccated' },
          { label: 'Cut Size', value: 'Flakes' },
          { label: 'Fat Content', value: 'High Fat' },
          { label: 'Pack Size', value: '1 Kg' },
          { label: 'Pack Type', value: 'Pouch' },
          { label: 'Sweetness', value: 'Lightly Sweetened' },
        ],
        applications: 'Breakfast Cereal, Ice Cream, Catering, Bakery, Snacks, Confectionery',
        certifications: ['ISO', 'FSSAI'],
        itemCode: '301951559',
      },

      {
        id: 'samrat-coconut-flakes-1kg',
        name: '1 Kg Samrat Coconut Flakes',
        seoTitle: 'Samrat Coconut Flakes 1kg | Desiccated Coconut Supplier India | Gopalji',
        seoDescription: 'Samrat 1kg coconut flakes — FSSAI certified, lightly sweetened, high-fat desiccated coconut for bakeries, snacks, and confectionery. MOQ 15kg.',
        price: '₹200',
        priceUnit: '/Kg',
        moq: '15 Kg',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146946/3__samrat_cocoflakes_eu7vb4.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146945/3__raw_ldi7dq.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146944/3__back_lfkjj4.webp',
        ],
        category: 'Coconut Flakes',
        categoryId: 'coconut-flakes',
        description: 'Samrat Coconut Flakes are crafted from premium-quality coconuts — delivering authentic flavor and crisp texture for cooking, baking, and garnishing. Sealed in a 1kg pouch. FSSAI certified with consistent quality across every batch.',
        specs: [
          { label: 'Coconut Type', value: 'Desiccated' },
          { label: 'Cut Size', value: 'Flakes' },
          { label: 'Fat Content', value: 'High Fat' },
          { label: 'Pack Size', value: '1 Kg' },
          { label: 'Pack Type', value: 'Pouch' },
          { label: 'Sweetness', value: 'Lightly Sweetened' },
        ],
        applications: 'Ice Cream, Bakery, Snacks, Breakfast Cereal, Confectionery, Catering',
        certifications: ['FSSAI', 'ISO'],
        itemCode: '301952793',
      },

      {
        id: 'samrat-khopra-flakes-15kg',
        name: '15 Kg Samrat Khopra Flakes',
        seoTitle: 'Samrat Khopra Flakes 15kg Bulk PP Bag | Coconut Flakes Wholesale India',
        seoDescription: 'Samrat 15kg Khopra Flakes in PP bag. Lightly sweetened, high-fat desiccated coconut for bakeries, sweet shops & food processors. ISO & FSSAI certified.',
        price: '₹200',
        priceUnit: '/Kg',
        moq: '15 Kg',
        badge: 'Bulk Pack',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146944/4__15kg_samrat_dpahdc.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146943/4__top_mhpevp.webp',
        ],
        category: 'Coconut Flakes',
        categoryId: 'coconut-flakes',
        description: 'Samrat Khopra Flakes in 15kg PP bags — made from fresh, high-quality coconuts with rich texture and authentic flavor. Ideal for commercial use in bakeries, sweet shops, and food processing units. FSSAI certified with a 6-month shelf life.',
        specs: [
          { label: 'Coconut Type', value: 'Desiccated' },
          { label: 'Cut Size', value: 'Flakes' },
          { label: 'Fat Content', value: 'High Fat' },
          { label: 'Pack Size', value: '15 Kg' },
          { label: 'Pack Type', value: 'PP Bag' },
          { label: 'Shelf Life', value: '6 Months' },
          { label: 'Sweetness', value: 'Lightly Sweetened' },
        ],
        applications: 'Confectionery, Ice Cream, Bakery, Catering, Snacks, Breakfast Cereal',
        certifications: ['ISO', 'FSSAI'],
      },

      {
        id: 'tiger-dry-coconut-flakes-1kg',
        name: '1 Kg Tiger Dry Coconut Flakes',
        seoTitle: 'Tiger Roasted Coconut Flakes 1kg | Low Fat Coconut Flakes | Gopalji',
        seoDescription: 'Tiger 1kg roasted coconut flakes — low fat, lightly sweetened, FSSAI certified. Ideal for snacks, bakery, and catering. 6-month shelf life. MOQ 30kg.',
        price: '₹210',
        priceUnit: '/Kg',
        moq: '30 Kg',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146943/5__tiger_o0jzuh.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146942/5__tiger_raw_on6zmv.webp',
        ],
        category: 'Coconut Flakes',
        categoryId: 'coconut-flakes',
        description: 'Tiger Dry Coconut Flakes are made from carefully selected roasted coconuts — offering a fresh, natural taste and ideal texture for cooking, baking, and garnishing. FSSAI approved. Comes in a 1kg packet with a 6-month shelf life.',
        specs: [
          { label: 'Coconut Type', value: 'Roasted' },
          { label: 'Cut Size', value: 'Flakes' },
          { label: 'Fat Content', value: 'Low Fat' },
          { label: 'Pack Size', value: '1 Kg' },
          { label: 'Pack Type', value: 'Pouch' },
          { label: 'Shelf Life', value: '6 Months' },
          { label: 'Sweetness', value: 'Lightly Sweetened' },
        ],
        applications: 'Snacks, Confectionery, Bakery, Catering',
        certifications: ['FSSAI', 'ISO'],
      },

    ],
  },

  // ─────────────────────────────────────────
  // CATEGORY B — COLD PRESSED COCONUT OIL
  // ─────────────────────────────────────────
  {
    id: 'cold-pressed-coconut-oil',
    name: 'Cold Pressed Coconut Oil',
    seoTitle: 'Cold Pressed Coconut Oil Wholesale Supplier India | Gopalji Khopra Udyog',
    description: 'Pure cold-pressed coconut oil by Gopalji Trading. Available in 500ml, 5L, and 15L packaging. FSSAI & ISO certified. Suitable for cooking, hair care, and skin care.',
    products: [

      {
        id: 'samrat-coconut-oil-15l',
        name: '15 L Samrat Cold Pressed Coconut Oil',
        seoTitle: 'Samrat Cold Pressed Coconut Oil 15L Tin | Bulk Cooking Oil | Gopalji',
        seoDescription: 'Samrat 15L cold pressed coconut oil in tin container. Nutrient-rich, ISO & FSSAI certified. Ideal for commercial kitchens and food processors. MOQ 1L.',
        price: '₹300',
        priceUnit: '/Litre',
        moq: '1 Litre',
        badge: 'Bulk Pack',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780236514/samrat_coco_x2gnhv.jpg',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146940/B1__UP_u5lyvi.webp',
        ],
        category: 'Cold Pressed Coconut Oil',
        categoryId: 'cold-pressed-coconut-oil',
        description: 'Samrat Cold Pressed Coconut Oil (15L tin) — extracted using cold-press method to preserve natural nutrients, aroma, and purity. Perfect for commercial kitchens, food processors, and high-volume users. ISO & FSSAI certified with 6-month shelf life.',
        specs: [
          { label: 'Processing', value: 'Cold Pressed' },
          { label: 'Pack Size', value: '15 Litre' },
          { label: 'Pack Type', value: 'Tin Container' },
          { label: 'Shelf Life', value: '6 Months' },
          { label: 'Origin', value: 'Made in India' },
        ],
        applications: 'Cooking Oil, Commercial Kitchen, Food Processing',
        certifications: ['ISO', 'FSSAI'],
        itemCode: '301953450',
      },

      {
        id: 'samrat-coconut-oil-5l-plastic',
        name: '5 L Samrat Cold Pressed Coconut Oil',
        seoTitle: 'Samrat Cold Pressed Coconut Oil 5L | Edible Hair Skin Care | Gopalji',
        seoDescription: 'Samrat 5L cold pressed coconut oil in plastic container. Pure, FSSAI certified. For edible, hair care & skin care use. 8-month shelf life.',
        price: '₹300',
        priceUnit: '/Litre',
        moq: '1 Litre',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146939/B2__FRONT_bgmdrl.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146939/B2__UP_xhuvlc.webp',
        ],
        category: 'Cold Pressed Coconut Oil',
        categoryId: 'cold-pressed-coconut-oil',
        description: 'Samrat 5L Cold Pressed Coconut Oil — extracted to retain maximum nutrients, aroma, and natural goodness. FSSAI certified. Sturdy plastic container with 8-month shelf life. Suitable for cooking, hair care, and skin care.',
        specs: [
          { label: 'Processing', value: 'Cold Pressed' },
          { label: 'Pack Size', value: '5 Litre' },
          { label: 'Pack Type', value: 'Plastic Container' },
          { label: 'Shelf Life', value: '8 Months' },
        ],
        applications: 'Edible, Hair Care, Skin Care',
        certifications: ['FSSAI', 'ISO'],
        itemCode: '301953337',
      },

      {
        id: 'samrat-coconut-oil-5l-jar',
        name: '5 L Samrat Cold Pressed Coconut Oil (Jar)',
        seoTitle: 'Samrat Cold Pressed Coconut Oil 5L Jar | Pure Coconut Oil India',
        seoDescription: 'Samrat 5L cold pressed coconut oil in jar. Pure, nutrient-rich, FSSAI & ISO certified. For cooking, hair care and skin care. Manufactured by Gopalji Trading.',
        price: '₹300',
        priceUnit: '/Litre',
        moq: '1 Litre',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780173276/WhatsApp_Image_2026-05-30_at_6.32.08_PM_dr4kc2.jpg',
        ],
        category: 'Cold Pressed Coconut Oil',
        categoryId: 'cold-pressed-coconut-oil',
        description: 'Samrat Cold Pressed Coconut Oil in a 5L jar — same pure cold-press extraction, preserving natural flavor and essential nutrients. FSSAI certified. Ideal for regular household or light commercial use.',
        specs: [
          { label: 'Processing', value: 'Cold Pressed' },
          { label: 'Pack Size', value: '5 Litre' },
          { label: 'Pack Type', value: 'Jar' },
          { label: 'Shelf Life', value: '8 Months' },
        ],
        applications: 'Edible, Hair Care, Skin Care',
        certifications: ['FSSAI', 'ISO'],
        itemCode: '301953337',
      },

      {
        id: 'samrat-coconut-oil-500ml',
        name: '500 ml Samrat Cold Pressed Coconut Oil',
        seoTitle: 'Samrat Organic Virgin Coconut Oil 500ml | Cold Pressed | Gopalji',
        seoDescription: 'Samrat 500ml organic virgin cold pressed coconut oil. FSSAI & ISO certified. For cooking, cosmetic, hair and skin care. Compact plastic bottle.',
        price: '₹330',
        priceUnit: '/Litre',
        moq: '1 Piece',
        badge: 'Organic Virgin',
        images: [
          // Note: Upload your 500ml image to Cloudinary and replace this URL
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780224353/coconut_oil_pre_i4p9cx.jpg',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780235913/samrat_oil_1l_pzrz64.jpg',
        ],
        category: 'Cold Pressed Coconut Oil',
        categoryId: 'cold-pressed-coconut-oil',
        description: 'Samrat 500ml Cold Pressed Coconut Oil — made using cold-press technique to preserve natural flavor, aroma, and essential nutrients. Easy-to-use plastic bottle for everyday household needs. Organic virgin grade. FSSAI & ISO certified.',
        specs: [
          { label: 'Processing', value: 'Cold Pressed' },
          { label: 'Grade', value: 'Organic Virgin' },
          { label: 'Pack Size', value: '500 ml' },
          { label: 'Pack Type', value: 'Plastic Bottle' },
          { label: 'Shelf Life', value: '6 Months' },
        ],
        applications: 'Cosmetic, Edible, Hair Care, Skin Care',
        certifications: ['FSSAI', 'ISO'],
        itemCode: '301954792',
      },

    ],
  },

  // ─────────────────────────────────────────
  // CATEGORY C — COCONUT POWDER
  // ─────────────────────────────────────────
  {
    id: 'coconut-powder',
    name: 'Coconut Powder',
    seoTitle: 'Coconut Powder Manufacturer India | Bulk Supplier | Gopalji Khopra Udyog',
    description: 'Fine-ground coconut powder for sweets, bakery, and food manufacturing. Available in 15kg bulk PP bags. FSSAI certified. 6-month shelf life.',
    products: [

      {
        id: 'gopalji-coconut-powder-15kg',
        name: '15 Kg Gopalji Coconut Powder',
        seoTitle: 'Gopalji Coconut Powder 15kg Bulk | FSSAI Certified | Wholesale India',
        seoDescription: 'Gopalji coconut powder in 15kg PP bag. Finely ground, natural, FSSAI certified. For sweets, bakery, curries & food manufacturing. 6-month shelf life.',
        price: '₹200',
        priceUnit: '/Kg',
        moq: '15 Kg',
        badge: 'Bulk Pack',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146939/C1_djoxeq.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146938/D__DESSICATED_COCO_tkix4l.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146938/C2_BACK_mv45v0.webp',
        ],
        category: 'Coconut Powder',
        categoryId: 'coconut-powder',
        description: 'Gopalji Coconut Powder is made from selected coconuts, finely ground for authentic taste and texture. Packed in 15kg PP bags — ideal for commercial kitchens, food manufacturers, and bulk buyers. FSSAI certified with 6-month shelf life.',
        specs: [
          { label: 'Type', value: 'Coconut Powder' },
          { label: 'Brand', value: 'Gopalji' },
          { label: 'Pack Size', value: '15 Kg' },
          { label: 'Pack Type', value: 'PP Bag' },
          { label: 'Shelf Life', value: '6 Months' },
        ],
        applications: 'Sweets, Bakery Items, Curries, Instant Mixes, Food Manufacturing',
        certifications: ['FSSAI'],
        itemCode: '301951216',
      },

    ],
  },

  // ─────────────────────────────────────────
  // CATEGORY D — DESICCATED COCONUT
  // ─────────────────────────────────────────
  {
    id: 'desiccated-coconut',
    name: 'Desiccated Coconut',
    seoTitle: 'Desiccated Coconut Powder Supplier India | Fine Grade | Gopalji Khopra',
    description: 'Fine-grade high-fat desiccated coconut powder with moisture below 3%. For catering, food processing, snacks, sweets, and bakery. Available in 1kg pouches.',
    products: [

      {
        id: 'desiccated-coconut-powder',
        name: 'Desiccated Coconut Powder',
        seoTitle: 'Fine Desiccated Coconut Powder | High Fat Below 3% Moisture | Gopalji',
        seoDescription: 'High-fat fine desiccated coconut powder with moisture below 3%. For bakery, sweets, ice cream & food processing. Available in 1kg pouches. MOQ 15kg.',
        price: '₹200',
        priceUnit: '/Kg',
        moq: '15 Kg',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146938/C2_mrdblj.webp',
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146938/D__DESSICATED_COCO_tkix4l.webp',
        ],
        category: 'Desiccated Coconut',
        categoryId: 'desiccated-coconut',
        description: 'Fine-grade desiccated coconut powder with high fat content and moisture below 3%. Ideal for food processing, bakery, sweets, and catering. Available in 1kg pouches with 6-month shelf life.',
        specs: [
          { label: 'Form', value: 'Fine Desiccated' },
          { label: 'Fat Content', value: 'High Fat' },
          { label: 'Coconut Type', value: 'Desiccated' },
          { label: 'Moisture', value: 'Below 3%' },
          { label: 'Pack Size', value: '1 Kg' },
          { label: 'Pack Type', value: 'Pouch' },
          { label: 'Shelf Life', value: '6 Months' },
        ],
        applications: 'Catering, Food Processing, Snacks, Sweets, Ice Cream, Bakery',
        itemCode: '309319586',
      },

    ],
  },

  // ─────────────────────────────────────────
  // CATEGORY E — DRIED KHOPRA
  // ─────────────────────────────────────────
  {
    id: 'dried-khopra',
    name: 'Dried Khopra',
    seoTitle: 'Dried Khopra Supplier India | Edible Grade Copra | Gopalji Khopra Udyog',
    description: 'Sun-dried edible grade piece copra with oil content above 65%. Available in 25kg PP bags. MOQ 25kg.',
    products: [

      {
        id: 'khopra-chitak',
        name: 'Khopra Chitak',
        seoTitle: 'Khopra Chitak Edible Grade Copra | Sun Dried 25kg | Gopalji',
        seoDescription: 'Sun-dried edible grade Khopra Chitak with oil content above 65%. 25kg PP bag. MOQ 25kg. Wholesale copra supplier Central India — Gopalji Khopra Udyog.',
        price: '₹320',
        priceUnit: '/Kg',
        moq: '25 Kg',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146938/E__DRIED_KJOPRA_wbokaw.webp',
        ],
        category: 'Dried Khopra',
        categoryId: 'dried-khopra',
        description: 'Khopra Chitak is sun-dried edible grade piece copra with oil content above 65%. Packed in 25kg PP bags. Ideal for oil extraction, food processing, and wholesale distribution.',
        specs: [
          { label: 'Form', value: 'Piece Copra' },
          { label: 'Grade', value: 'Edible Grade' },
          { label: 'Oil Content', value: 'Above 65%' },
          { label: 'Drying Method', value: 'Sun Dried' },
          { label: 'Pack Size', value: '25 Kg' },
          { label: 'Pack Type', value: 'PP Bag' },
        ],
        itemCode: '320719055',
      },

    ],
  },

  // ─────────────────────────────────────────
  // CATEGORY F — COCONUT RINGS
  // ─────────────────────────────────────────
  {
    id: 'coconut-rings',
    name: 'Coconut Rings',
    seoTitle: 'Coconut Rings Wholesale Supplier India | Gopalji Khopra Udyog',
    description: 'Wholesale coconut rings available in bulk. MOQ 25 pieces.',
    products: [

      {
        id: 'coconut-rings',
        name: 'Coconut Rings',
        seoTitle: 'Coconut Rings Bulk | Wholesale Coconut Products | Gopalji Khopra Udyog',
        seoDescription: 'Coconut rings wholesale from Gopalji Khopra Udyog. MOQ 25 pieces. Bulk coconut product supplier in Central India.',
        price: '₹300',
        priceUnit: '/Piece',
        moq: '25 Pieces',
        images: [
          'https://res.cloudinary.com/dtrvyelcg/image/upload/v1780146938/F_RINGS_t3nuxp.webp',
        ],
        category: 'Coconut Rings',
        categoryId: 'coconut-rings',
        description: 'Wholesale coconut rings from Gopalji Khopra Udyog. Available in bulk quantities. Contact us for custom requirements and pricing.',
        specs: [
          { label: 'Pack Size', value: '1 Piece' },
          { label: 'MOQ', value: '25 Pieces' },
        ],
        itemCode: '320698902',
      },

    ],
  },

]

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

// Auto-optimize all Cloudinary image URLs on load to use f_auto,q_auto,w_600
const optimizeCloudinaryUrl = (url: string): string => {
  if (url && url.includes('res.cloudinary.com')) {
    if (url.includes('/upload/f_auto,q_auto') && !url.includes('w_600')) {
      return url.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto,w_600');
    }
    if (!url.includes('/upload/f_auto,q_auto')) {
      return url.replace('/upload', '/upload/f_auto,q_auto,w_600');
    }
  }
  return url;
};

categories.forEach((cat) => {
  cat.products.forEach((prod) => {
    prod.images = prod.images.map(optimizeCloudinaryUrl);
  });
});

// Get all products flat
export const getAllProducts = (): Product[] =>
  categories.flatMap((cat) => cat.products)

// Get products by category id
export const getProductsByCategory = (categoryId: string): Product[] =>
  categories.find((cat) => cat.id === categoryId)?.products ?? []

// Get single product by id
export const getProductById = (id: string): Product | undefined =>
  getAllProducts().find((p) => p.id === id)

// Get category by id
export const getCategoryById = (id: string): Category | undefined =>
  categories.find((cat) => cat.id === id)
