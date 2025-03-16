"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { 
  AttachmentProfile, 
  MeditationRecommendation, 
  getUserProfile, 
  generateRecommendation 
} from "@/lib/meditation-profile";

export function useMeditationProfile() {
  const { isSignedIn, isLoaded } = useUser();
  const [profile, setProfile] = useState<AttachmentProfile | null>(null);
  const [recommendation, setRecommendation] = useState<MeditationRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!isLoaded || !isSignedIn) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch user profile from API
        const userProfile = await getUserProfile();
        
        if (userProfile) {
          setProfile(userProfile);
          
          // Generate recommendation based on profile
          const meditationRecommendation = generateRecommendation(userProfile);
          setRecommendation(meditationRecommendation);
        }
      } catch (err) {
        console.error("Error fetching meditation profile:", err);
        setError("Failed to load your meditation profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [isLoaded, isSignedIn]);

  return {
    profile,
    recommendation,
    isLoading,
    error,
    hasProfile: !!profile,
  };
} 