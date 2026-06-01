// src/components/ProductCard.tsx
// Drop-in product card with image slider, specs, and CTA

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Package, ArrowRight } from 'lucide-react'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  onEnquire?: (product: Product) => void
  key?: any
}

export default function ProductCard({ product, onEnquire }: ProductCardProps) {
  const [activeImage, setActiveImage] = useState(0)

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? product.images.length - 1 : i - 1))

  const nextImage = () =>
    setActiveImage((i) => (i === product.images.length - 1 ? 0 : i + 1))

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E3D3BE]/60 flex flex-col">

      {/* ── Image Slider ── */}
      <div className="relative w-full aspect-[4/3] bg-[#F5EDE0] overflow-hidden">

        {/* Images */}
        {product.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${product.name} - image ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 select-none ${
              i === activeImage ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            draggable={false}
            width="400"
            height="300"
          />
        ))}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#6B4A2E] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}

        {/* Slider Controls — only if multiple images */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={14} className="text-[#4A2E1F]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={14} className="text-[#4A2E1F]" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === activeImage
                      ? 'bg-[#6B4A2E] w-3'
                      : 'bg-[#6B4A2E]/30'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 space-y-3">

        {/* Category tag */}
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8C6239]">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-base font-serif font-bold text-[#4A2E1F] leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#3D2B1F]/70 leading-relaxed line-clamp-3">
          {product.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-2 border-t border-[#E3D3BE]">
          {product.specs.slice(0, 4).map((spec) => (
            <div key={spec.label}>
              <div className="text-[9px] uppercase tracking-wider text-[#4A2E1F]/50 font-semibold">
                {spec.label}
              </div>
              <div className="text-xs font-bold text-[#4A2E1F]">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Price + MOQ */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="text-lg font-bold text-[#6B4A2E] font-serif">
              {product.price}
              <span className="text-xs font-normal text-[#6B4A2E]/70">{product.priceUnit}</span>
            </div>
            <div className="text-[9px] text-[#4A2E1F]/50 uppercase tracking-wider">
              MOQ: {product.moq}
            </div>
          </div>

          {/* Certifications */}
          {product.certifications && (
            <div className="flex gap-1">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="text-[8px] font-bold uppercase bg-[#E3D3BE] text-[#6B4A2E] px-1.5 py-0.5 rounded"
                >
                  {cert}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => onEnquire?.(product)}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#6B4A2E] hover:bg-[#8C6239] text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Package size={12} />
          Get Bulk Quote
          <ArrowRight size={12} />
        </button>

      </div>
    </div>
  )
}
