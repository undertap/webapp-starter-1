"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

/**
 * A hook that initializes a user's profile when they visit the dashboard
 * This ensures every authenticated user has at least a basic profile in Supabase
 */
export function useInitializeUser() {
  const { isSignedIn, isLoaded } = useUser();
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeUser() {
      if (!isLoaded || !isSignedIn) return;
      
      // Only try to initialize once
      if (isInitialized || isInitializing) return;
      
      try {
        setIsInitializing(true);
        setError(null);
        
        // Call the API to initialize the user profile if it doesn't exist
        const response = await fetch('/api/user-profile/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to initialize user profile:", errorData);
          setError("Failed to initialize user profile");
          return;
        }
        
        const data = await response.json();
        console.log("User profile initialization result:", data);
        
        setIsInitialized(true);
      } catch (err) {
        console.error("Error initializing user profile:", err);
        setError("Failed to initialize user profile");
      } finally {
        setIsInitializing(false);
      }
    }
    
    initializeUser();
  }, [isLoaded, isSignedIn, isInitialized, isInitializing]);
  
  return {
    isInitializing,
    isInitialized,
    error,
  };
} 