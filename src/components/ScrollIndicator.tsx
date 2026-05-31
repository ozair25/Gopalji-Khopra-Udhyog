import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
  label?: string;
}

export default function ScrollIndicator({
  targetId,
  className = "absolute bottom-4 xs:bottom-6 left-1/2 z-20 -translate-x-1/2",
  label = "Explore Products"
}: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        
        // Hide the indicator if the target section has scrolled into view (e.g., top is within 150px of viewport top)
        // Or if the physical position of this indicator itself is close to leaving the viewport at the top
        if (rect.top < 180) {
          setVisible(false);
        } else {
          // Check if this indicator itself is still visible in the viewport to avoid ghost indicators
          if (indicatorRef.current) {
            const indRect = indicatorRef.current.getBoundingClientRect();
            if (indRect.top < 80) {
              setVisible(false);
            } else {
              setVisible(true);
            }
          } else {
            setVisible(true);
          }
        }
      } else {
        // Fallback simple scroll threshold if no targetId provided
        if (window.scrollY > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount / initial layout
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetId]);

  const handleScrollClick = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    let targetElement = null;
    if (targetId) {
      targetElement = document.getElementById(targetId);
    } else {
      const homeSection = document.getElementById('home');
      targetElement = homeSection?.nextElementSibling ?? null;
    }
    
    if (targetElement) {
      // Calculate navbar height offset for standard header clearance
      const navbarOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback scroll down by viewport height
      window.scrollTo({
        top: window.innerHeight - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={indicatorRef}
          initial={{ opacity: 0, y: 12, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={className}
        >
          <button
            onClick={handleScrollClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleScrollClick(e);
              }
            }}
            aria-label={`Scroll down to ${label}`}
            title={`Scroll to ${label}`}
            className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8C6239] focus:ring-offset-2 rounded-full px-4 py-2 transition-all text-center relative"
          >
            {/* Soft backdrop glow to maintain high contrast over form or split background colors */}
            <div className="absolute inset-0 bg-[#FAF7F2]/95 backdrop-blur-[3px] border border-[#D8B26A]/30 shadow-[0_4px_16px_rgba(74,46,31,0.08)] rounded-full -z-10 group-hover:scale-105 transition-all duration-300" />

            {/* Subtle premium uppercase label */}
            <span className="text-[8.5px] xs:text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#6B4A2E] leading-none select-none font-serif flex items-center gap-1">
              {label}
            </span>

            {/* Elegant luxury minimal scroll capsule */}
            <div className="relative w-4.5 h-7 border border-[#8C6239]/60 rounded-full flex justify-center items-start pt-[4px] group-hover:border-[#8C6239] transition-colors duration-300">
              {/* Polished interactive sliding dot animation */}
              <motion.div
                animate={{
                  y: [0, 6, 0],
                  opacity: [1, 0.4, 1]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 h-1.5 bg-[#8C6239] rounded-full"
              />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
