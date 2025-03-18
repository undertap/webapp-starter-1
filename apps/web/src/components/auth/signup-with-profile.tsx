"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { handleProfileAfterSignUp, loadFormData } from "@/lib/meditation-profile";

export default function SignUpWithProfile() {
  const { theme } = useTheme();
  const router = useRouter();
  const [hasFormData, setHasFormData] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/dashboard");
  
  // Check if there's saved form data and a custom redirect URL
  useEffect(() => {
    const formData = loadFormData();
    console.log("SignUpWithProfile - Checked for form data:", formData ? "Found" : "Not found");
    setHasFormData(!!formData);
    
    // Check for custom redirect URL
    if (typeof window !== 'undefined') {
      const customRedirect = localStorage.getItem("redirectAfterSignup");
      if (customRedirect) {
        console.log("SignUpWithProfile - Found custom redirect URL:", customRedirect);
        setRedirectUrl(customRedirect);
      }
    }
  }, []);
  
  // Log when component first renders, including the current URL
  useEffect(() => {
    console.log("SignUpWithProfile - Component mounted, current URL:", window.location.href);
  }, []);
  
  // Set up an effect to run after successful sign-up
  // This triggers when the user is redirected to the dashboard after signup
  useEffect(() => {
    // Check if this is after a successful sign-up (URL will have redirected from clerk)
    const isAfterSignUp = window.location.href.includes('/dashboard');
    console.log("SignUpWithProfile - Checking for after sign-up state:", { 
      currentUrl: window.location.href,
      isAfterSignUp,
      hasFormData
    });
    
    if (isAfterSignUp && hasFormData) {
      console.log("SignUpWithProfile - Detected after sign-up state");
      
      // Handle profile creation after sign-up
      (async () => {
        try {
          console.log("SignUpWithProfile - Attempting to handle profile after sign-up");
          await handleProfileAfterSignUp();
          console.log("SignUpWithProfile - Successfully handled profile");
          
          // Clear the custom redirect URL after successful processing
          if (typeof window !== 'undefined') {
            localStorage.removeItem("redirectAfterSignup");
          }
        } catch (error) {
          console.error("SignUpWithProfile - Error handling profile after sign-up:", error);
        }
      })();
    }
  }, [hasFormData, router]);

  // Add a manual redirection when component mounts if user is authenticated
  useEffect(() => {
    // Check URL parameters for any signs of successful auth
    const urlParams = new URLSearchParams(window.location.search);
    const hasCreatedSessionId = urlParams.has('createdSessionId');
    
    console.log("SignUpWithProfile - Checking URL parameters for redirect:", {
      params: Object.fromEntries(urlParams.entries()),
      hasCreatedSessionId,
      redirectUrl
    });
    
    if (hasCreatedSessionId) {
      console.log("SignUpWithProfile - Detected createdSessionId parameter, redirecting to:", redirectUrl);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 500); // Small delay to ensure any Clerk operations complete
    }
  }, [redirectUrl, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {hasFormData && (
        <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg max-w-md text-center">
          <h2 className="text-lg font-semibold text-violet-800 mb-2">
            Your Meditation Profile is Ready!
          </h2>
          <p className="text-gray-700">
            Complete your sign-up to save your personalized meditation profile and access your custom meditation.
          </p>
        </div>
      )}
      
      <SignUp 
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
        fallbackRedirectUrl={redirectUrl}
        redirectUrl={redirectUrl}
        signInUrl="/signin"
        path="/signup"
        routing="path"
      />
    </div>
  );
} 