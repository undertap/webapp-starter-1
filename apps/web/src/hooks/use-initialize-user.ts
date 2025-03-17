"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { handleProfileAfterSignUp } from "@/lib/meditation-profile";

/**
 * A hook that initializes a user's profile when they visit the dashboard
 * This ensures every authenticated user has at least a basic profile in Supabase
 */
export function useInitializeUser() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    async function initializeUser() {
      if (!isLoaded || !isSignedIn) return;
      
      // Only try to initialize once
      if (isInitialized || isInitializing) return;
      
      try {
        setIsInitializing(true);
        setError(null);
        
        console.log("useInitializeUser - Starting user profile initialization for user:", user?.id);
        
        // First check if we have form data that didn't get saved
        // This is a fallback mechanism for users who completed the meditation form
        // but whose profile wasn't successfully created during signup
        try {
          console.log("useInitializeUser - Checking for unsaved profile data");
          await handleProfileAfterSignUp();
          console.log("useInitializeUser - Profile data check complete");
        } catch (profileError) {
          console.error("useInitializeUser - Error handling profile after sign-up:", profileError);
          // Continue with normal initialization even if this fails
        }
        
        // Call the API to initialize the user profile if it doesn't exist
        console.log("useInitializeUser - Calling /api/user-profile/init endpoint");
        const response = await fetch('/api/user-profile/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log("useInitializeUser - Init API response status:", response.status);
        
        // Handle different types of errors
        if (response.status === 503) {
          // Database connection issue - not critical, app can still function
          console.warn("useInitializeUser - Database service unavailable, will retry later");
          setError("Database temporarily unavailable");
          
          // Set up a retry if this is a temporary service issue
          if (retryCount < 3) { 
            setRetryCount(prev => prev + 1);
            setTimeout(() => {
              setIsInitializing(false); // Allow another initialization attempt
            }, 3000 * (retryCount + 1)); // Exponential backoff
          } else {
            // After 3 retries, just assume initialization succeeded to prevent endless retries
            console.log("useInitializeUser - Maximum retries reached, continuing without profile initialization");
            setIsInitialized(true);
          }
          return;
        }
        
        if (!response.ok) {
          const responseText = await response.text();
          let errorData;
          try {
            errorData = JSON.parse(responseText);
          } catch (e) {
            console.error("useInitializeUser - Failed to parse error response:", e);
            errorData = { error: responseText };
          }
          
          console.error("useInitializeUser - Failed to initialize user profile:", errorData);
          
          // Only show a toast for server errors, not for expected conditions
          if (response.status >= 500) {
            toast.error("Failed to connect to profile service");
          }
          
          setError("Failed to initialize user profile");
          
          // Mark as initialized even on error to prevent endless retries
          // User can still use the app, just without personalization
          setIsInitialized(true);
          return;
        }
        
        const responseText = await response.text();
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.error("useInitializeUser - Failed to parse success response:", e);
          data = { message: responseText };
        }
        
        console.log("useInitializeUser - User profile initialization result:", data);
        
        if (data.created) {
          // Only notify on profile creation, not profile existence check
          toast.success("Profile created successfully");
        }
        
        setIsInitialized(true);
      } catch (err) {
        console.error("useInitializeUser - Error initializing user profile:", err);
        setError("Failed to initialize user profile");
        
        // Mark as initialized even on error to prevent endless retries
        // The user can still use the app
        setIsInitialized(true);
      } finally {
        setIsInitializing(false);
      }
    }
    
    initializeUser();
  }, [isLoaded, isSignedIn, isInitialized, isInitializing, retryCount, user?.id]);
  
  return {
    isInitializing,
    isInitialized,
    error,
  };
} 