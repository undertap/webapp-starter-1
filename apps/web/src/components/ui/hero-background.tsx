"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function HeroBackground({ className, children }: HeroBackgroundProps) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set up video playback when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Attempt to play the video
      const playPromise = video.play();
      
      // Handle potential play() promise rejection (e.g., autoplay policy)
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // On autoplay failure, set error state to show fallback
          setVideoError(true);
        });
      }
    }
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#f2efea]", className)}>
      {/* Content container - full width on mobile/tablet, half width on desktop */}
      <div className="relative z-20 w-full lg:w-1/2 h-full flex items-center">
        {/* Force white text color on mobile/tablet */}
        <div className="relative z-30 [&_h1]:text-white [&_p]:text-white [&_span]:text-white lg:[&_h1]:text-[#3d5351] lg:[&_p]:text-[#557373]">
          {children}
        </div>
      </div>
      
      {/* Video container - full width on mobile/tablet, half width on desktop */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 overflow-hidden">
        {/* Light overlay for mobile/tablet - reduced for better video visibility */}
        <div className="absolute inset-0 bg-[#f2efea]/10 lg:bg-transparent backdrop-blur-[1px] lg:backdrop-blur-none z-10" />
        
        {/* Dark overlay - only on mobile/tablet, completely removed on desktop */}
        <div className="absolute inset-0 bg-black/30 lg:bg-transparent z-10" />
        
        {/* Gradient fade for desktop view only */}
        <div className="absolute inset-y-0 left-0 w-0 lg:w-24 bg-gradient-to-r from-[#f2efea] to-transparent z-10" />
        
        {!videoError ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover lg:brightness-125"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-background.jpg"
            onError={() => setVideoError(true)}
          >
            <source src="/videos/coverr-meditating-on-the-couch-3122-1080p.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[#557373]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#dfe5f3] to-[#557373]/30" />
          </div>
        )}
        
        {/* Bottom fade to match background - desktop only */}
        <div className="absolute bottom-0 left-0 right-0 h-24 hidden lg:block bg-gradient-to-t from-[#f2efea] to-transparent z-20"></div>
      </div>
      
      {/* Bottom extension to prevent the dark patch */}
      <div className="absolute -bottom-2 left-0 right-0 h-12 bg-[#f2efea] z-30"></div>
    </div>
  );
} 