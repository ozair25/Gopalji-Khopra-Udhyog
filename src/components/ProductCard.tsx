// src/components/ProductCard.tsx
// Drop-in product card with image slider, specs, and CTA
// Supports multiple packing sizes / variants dynamically

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Package, ArrowRight } from 'lucide-react'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  onEnquire?: (product: Product) => void
  key?: any
}

export default function ProductCard({ product, onEnquire }: ProductCardProps) {
  // Use state to track selected variant if the product has multiple variants (e.g. 1 Kg vs 15 Kg)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  )

  const [activeImage, setActiveImage] = useState(0)

  // Sync selected variant if the product itself changes
  useEffect(() => {
    setSelectedVariant(
      product.variants && product.variants.length > 0 ? product.variants[0] : null
    )
    setActiveImage(0)
  }, [product])

  // Get dynamic display values based on selected variant or fallback to main product details
  const displayName = selectedVariant ? selectedVariant.name : product.name
  const displayMoq = selectedVariant ? selectedVariant.moq : product.moq
  const displayImages = selectedVariant ? selectedVariant.images : product.images
  const displaySpecs = selectedVariant ? selectedVariant.specs : product.specs
  const displayDescription = selectedVariant ? selectedVariant.description : product.description

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? displayImages.length - 1 : i - 1))

  const nextImage = () =>
    setActiveImage((i) => (i === displayImages.length - 1 ? 0 : i + 1))

  const handleEnquireClick = () => {
    if (onEnquire) {
      if (selectedVariant) {
        onEnquire({
          ...product,
          id: selectedVariant.id,
          name: selectedVariant.name,
          moq: selectedVariant.moq,
          images: selectedVariant.images,
          description: selectedVariant.description,
          specs: selectedVariant.specs,
          itemCode: selectedVariant.itemCode || product.itemCode,
        })
      } else {
        onEnquire(product)
      }
    }
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E3D3BE]/60 flex flex-col">

      {/* ── Image Slider ── */}
      <div className="relative w-full aspect-[4/3] bg-[#F5EDE0] overflow-hidden">

        {/* Images */}
        {displayImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${displayName} - image ${i + 1}`}
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
        {displayImages.length > 1 && (
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
              {displayImages.map((_, i) => (
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
          {displayName}
        </h3>

        {/* Pack Size / Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-[9px] uppercase tracking-wider text-[#4A2E1F]/50 font-bold">
              Available Packaging:
            </span>
            <div className="flex gap-1.5">
              {product.variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariant(v)
                      setActiveImage(0)
                    }}
                    className={`flex-1 text-center py-1 px-2.5 rounded-lg text-[10px] font-bold border transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#6B4A2E] border-[#6B4A2E] text-white shadow-sm'
                        : 'border-[#E3D3BE] text-[#6B4A2E] hover:bg-[#F5EDE0]'
                    }`}
                  >
                    {v.packSize}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-[#3D2B1F]/70 leading-relaxed line-clamp-3">
          {displayDescription}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-2 border-t border-[#E3D3BE]">
          {displaySpecs.slice(0, 4).map((spec) => (
            <div key={spec.label}>
              <div className="text-[9px] uppercase tracking-wider text-[#4A2E1F]/50 font-semibold">
                {spec.label}
              </div>
              <div className="text-xs font-bold text-[#4A2E1F]">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* MOQ + Certifications */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="text-[10px] text-[#4A2E1F]/50 uppercase tracking-wider font-bold">
              MOQ: {displayMoq}
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
          onClick={handleEnquireClick}
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
