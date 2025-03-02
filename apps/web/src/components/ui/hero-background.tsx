"use client";

import { useState, useRef, useEffect } from "react";

export function HeroBackground() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set up video playback when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Remove the timeupdate event listener since we don't need the fade effect
      // video.addEventListener("timeupdate", handleTimeUpdate);
      
      // Attempt to play the video
      const playPromise = video.play();
      
      // Handle potential play() promise rejection (e.g., autoplay policy)
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // On autoplay failure, set error state to show fallback
          setVideoError(true);
        });
      }

      // Clean up no longer needed
      return () => {
        // video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  // Simplified function - no longer applying fade effects
  const handleTimeUpdate = () => {
    // Fade effects removed
  };

  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-teal-50 to-slate-100">
      {/* Dark overlay with cool tint to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-teal-900/60 z-10" />
      
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-background.jpg" // Fallback image while video loads
          onError={() => setVideoError(true)}
        >
          <source src="/videos/coverr-meditating-on-the-couch-3122-1080p.mp4" type="video/mp4" />
          {/* Your browser does not support the video tag. */}
        </video>
      )}
    </div>
  );
} 