"use client";

import { useEffect, useRef } from "react";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

export function ScrollRevealSection() {
  const hasScrolledRef = useRef(false);

  // Use a separate useEffect to handle auto-scrolling instead of the onComplete callback
  // This prevents interference with normal scrolling events
  const handleComplete = () => {
    // Only scroll once to avoid getting stuck in scroll loops
    if (!hasScrolledRef.current) {
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        const targetSection = document.getElementById('categories-section');
        if (targetSection) {
          // Use a smooth scroll with a specific duration
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          hasScrolledRef.current = true;
        }
      });
    }
  };

  return (
    <section className="w-full bg-white">
      <ScrollRevealText
        text="Your mind deserves the same personalized care as your body. Our AI transforms everyday meditation into a powerful journey tailored specifically for your unique needs."
        emphasisWords={["transforms", "powerful", "journey", "unique"]}
        emphasisColor="#557373"
        onComplete={handleComplete}
      />
    </section>
  );
} 