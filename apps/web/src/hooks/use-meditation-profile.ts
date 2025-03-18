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
  const { isSignedIn, isLoaded, user } = useUser();
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
        
        console.log("useMeditationProfile - Starting to fetch profile for user:", user?.id);
        
        // Fetch user profile from API
        const userProfile = await getUserProfile();
        
        console.log("useMeditationProfile - Profile fetch result:", userProfile ? "Found" : "Not found");
        
        if (userProfile) {
          console.log("useMeditationProfile - Setting profile:", userProfile);
          setProfile(userProfile);
          
          // Generate recommendation based on profile
          const meditationRecommendation = generateRecommendation(userProfile);
          console.log("useMeditationProfile - Generated recommendation:", meditationRecommendation);
          setRecommendation(meditationRecommendation);
        } else {
          console.log("useMeditationProfile - No profile found for this user");
        }
      } catch (err) {
        console.error("useMeditationProfile - Error fetching meditation profile:", err);
        setError("Failed to load your meditation profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [isLoaded, isSignedIn, user?.id]);

  return {
    profile,
    recommendation,
    isLoading,
    error,
    hasProfile: !!profile,
  };
} 