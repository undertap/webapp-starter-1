"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimateInView } from "@/components/ui/animate-in-view";

interface Testimonial {
  id: number;
  name: string;
  username: string;
  avatar: string;
  quote: string;
  stars: number;
}

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Evan Nicolini",
      username: "",
      avatar: "/avatars/avatar-1.jpg",
      quote: "This is like having a professional therapist 24/7, it's unbelievable! I recently started using MeditateAI and, honestly, it's been a transformative experience.",
      stars: 5,
    },
    {
      id: 2,
      name: "Coda888",
      username: "",
      avatar: "/avatars/avatar-2.jpg",
      quote: "Game Changer. Honestly love this app! Therapy was always too expensive for me although I always wanted to do it for my mental health.",
      stars: 5,
    },
    {
      id: 3,
      name: "Kingcorey50",
      username: "",
      avatar: "/avatars/avatar-3.jpg",
      quote: "Exceptionally supportive and revolutionary! I've been using this for a month now and it is simply incredible for my anxiety.",
      stars: 5,
    },
    {
      id: 4,
      name: "Sarah Chen",
      username: "",
      avatar: "/avatars/avatar-4.jpg",
      quote: "The personalized meditations have completely transformed my sleep patterns. I'm sleeping better than I have in years!",
      stars: 5,
    },
    {
      id: 5,
      name: "Marco T.",
      username: "",
      avatar: "/avatars/avatar-5.jpg",
      quote: "As someone dealing with chronic stress, these AI meditations feel tailored exactly to what I need each day. Remarkable technology.",
      stars: 5,
    },
  ];

  const numTestimonials = testimonials.length;
  const itemsToShow = Math.min(3, numTestimonials);

  // Add scroll event handling to control slider
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate visibility of the section
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        
        // Only process if section is in view
        if (sectionTop < viewportHeight && sectionTop > -sectionHeight) {
          // Normalize the scroll position to a value between 0 and 1
          // 0 when section just enters viewport, 1 when it just exits viewport
          const scrollPosition = (viewportHeight - sectionTop) / (viewportHeight + sectionHeight);
          const clampedScrollPosition = Math.max(0, Math.min(1, scrollPosition));
          
          // This gives us a range from 0 to (numTestimonials - itemsToShow)
          const maxScrollIndex = numTestimonials - itemsToShow;
          const scrollIndexFloat = clampedScrollPosition * maxScrollIndex;
          
          // Update the scroll progress
          setScrollProgress(scrollIndexFloat);
          
          // Also update the current index for the dots navigation
          const newIndex = Math.min(Math.floor(scrollIndexFloat), numTestimonials - 1);
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
          }
        }
      }
    };
    
    // Throttle scroll events for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", scrollListener);
  }, [currentIndex, numTestimonials, itemsToShow]);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = Math.min(currentIndex + 1, numTestimonials - 1);
    setCurrentIndex(nextIndex);
    setScrollProgress(nextIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
    setScrollProgress(prevIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (slideIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(slideIndex);
    setScrollProgress(slideIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Pause auto play on hover
  const pauseAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Resume auto play on mouse leave
  const resumeAutoPlay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % numTestimonials);
      }, 5000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 md:py-24 bg-white overflow-hidden"
      id="testimonials"
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <AnimateInView className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#272401] mb-3">
            Ready To Unlock Your Best?
          </h2>
          <h3 className="text-3xl font-bold text-[#557373] mb-6">
            Customer Reviews
          </h3>
          <p className="text-lg text-[#557373]/90 max-w-3xl mx-auto">
            Hear from users who've found comfort and a new beginning with MeditateAI and you can too! Read 100's recent five-star reviews from people like you.
          </p>
        </AnimateInView>

        <div 
          className="relative mt-16"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div 
            className="overflow-hidden"
            ref={sliderRef}
          >
            <div 
              className={cn(
                "flex transition-transform duration-500 ease-out gap-6", 
                isAnimating ? "pointer-events-none" : ""
              )}
              style={{ 
                transform: `translateX(calc(-${scrollProgress * (100 / itemsToShow)}%))`,
                width: `${(numTestimonials / itemsToShow) * 100}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0 w-full md:w-1/3 px-3"
                >
                  <div className="bg-[#f2efea] rounded-xl p-8 h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex-1 mb-6">
                      <h4 className="text-xl font-bold text-[#272401] mb-4">
                        {testimonial.quote.split(' ').slice(0, 7).join(' ')}
                        {testimonial.quote.split(' ').length > 7 ? '...' : ''}
                      </h4>
                      <p className="text-[#557373]">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#dfe5f3]">
                        {testimonial.avatar ? (
                          <Image 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#557373] font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-[#272401]">{testimonial.name}</div>
                        <div className="flex mt-1">
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <Star key={i} className="size-4 fill-[#f59e0b] text-[#f59e0b]" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prev}
            className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all text-[#557373] hover:text-[#272401] focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button 
            onClick={next}
            className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all text-[#557373] hover:text-[#272401] focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={cn(
                  "h-3 w-3 rounded-full transition-all focus:outline-none",
                  currentIndex === idx 
                    ? "bg-[#557373] w-8" 
                    : "bg-[#557373]/30 hover:bg-[#557373]/50"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 