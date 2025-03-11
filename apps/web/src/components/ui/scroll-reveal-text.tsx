"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  text: string;
  emphasisWords: string[];
  emphasisColor?: string;
  className?: string;
  onComplete?: () => void;
}

export function ScrollRevealText({
  text,
  emphasisWords,
  emphasisColor = "#557373",
  className,
  onComplete,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedWords, setRevealedWords] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isCompleteRef = useRef(false);
  const words = text.split(" ");
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Throttle function to prevent excessive scroll event handling
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only process scroll if it's a significant change
      if (!ticking && Math.abs(currentScrollY - lastScrollY) > 5) {
        lastScrollY = currentScrollY;
        
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          
          const containerTop = containerRef.current.getBoundingClientRect().top;
          const containerHeight = containerRef.current.getBoundingClientRect().height;
          const windowHeight = window.innerHeight;
          
          // Start revealing when the container is 40% in view
          const startReveal = windowHeight * 0.6;
          
          // Calculate how far we've scrolled through the section
          const progress = (startReveal - containerTop) / (containerHeight * 0.8);
          const clampedProgress = Math.max(0, Math.min(1, progress));
          setScrollProgress(clampedProgress);
          
          // Calculate how many words should be revealed based on scroll progress
          const wordsToReveal = Math.floor(clampedProgress * words.length);
          
          // Update state with number of words to reveal (clamped between 0 and total words)
          setRevealedWords(Math.max(0, Math.min(words.length, wordsToReveal)));
          
          // Call onComplete when all words are revealed, but only once
          if (wordsToReveal >= words.length && onComplete && !isCompleteRef.current) {
            isCompleteRef.current = true;
            // Defer the onComplete callback to allow current scroll to complete
            setTimeout(onComplete, 300);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [words.length, onComplete]);
  
  // Calculate background opacity based on scroll progress
  const backgroundOpacity = Math.max(0.1, 1 - scrollProgress * 0.6);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "py-32 md:py-40 lg:py-48 transition-all duration-500 relative overflow-hidden", 
        className
      )}
      style={{
        background: `linear-gradient(to bottom, rgba(255,255,255,${backgroundOpacity}), rgba(249,250,251,${backgroundOpacity}))`
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5 bg-pattern-grid"
        style={{ opacity: Math.max(0.02, 0.1 - scrollProgress * 0.1) }}
      />
      
      <div className="container px-4 md:px-8 max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight md:leading-tight lg:leading-tight tracking-tight">
          {words.map((word, index) => {
            const isEmphasis = emphasisWords.includes(word);
            const isRevealed = index < revealedWords;
            
            return (
              <span 
                key={index}
                className={cn(
                  "transition-colors duration-700 inline-block mx-1",
                  isRevealed 
                    ? isEmphasis 
                      ? "text-[#557373]" 
                      : "text-[#272401]" 
                    : "text-gray-300"
                )}
                style={isRevealed && isEmphasis ? { color: emphasisColor } : {}}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </div>
  );
} 