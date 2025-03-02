"use client";

import { useState, useRef, useEffect } from "react";

export function HeroBackground() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set up video playback when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Add event listener for the "timeupdate" event to handle fading
      video.addEventListener("timeupdate", handleTimeUpdate);
      
      // Attempt to play the video
      const playPromise = video.play();
      
      // Handle potential play() promise rejection (e.g., autoplay policy)
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // On autoplay failure, set error state to show fallback
          setVideoError(true);
        });
      }

      // Clean up event listener
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  // Handle fade effect near the end of the video
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration;
    const currentTime = video.currentTime;
    
    // Start fading 1.5 seconds before the end of the video
    const fadeStartTime = duration - 1.5;
    
    if (currentTime >= fadeStartTime) {
      // Calculate opacity based on remaining time
      // Will go from 1 to 0 over the last 1.5 seconds
      const fadeProgress = (duration - currentTime) / 1.5;
      const opacity = Math.max(0, fadeProgress);
      
      // Apply the fade out effect
      if (video.style) {
        video.style.opacity = opacity.toString();
      }
    } else if (currentTime < 0.5) {
      // Fade in during the first 0.5 seconds of playback
      const fadeInProgress = currentTime / 0.5;
      const opacity = Math.min(1, fadeInProgress);
      
      if (video.style) {
        video.style.opacity = opacity.toString();
      }
    } else {
      // Ensure full opacity during the main part of the video
      if (video.style && video.style.opacity !== '1') {
        video.style.opacity = '1';
      }
    }
  };

  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-teal-50 to-slate-100">
      {/* Dark overlay with cool tint to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-teal-900/60 z-10" />
      
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity"
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