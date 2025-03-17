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
  
  // Check if there's saved form data
  useEffect(() => {
    const formData = loadFormData();
    console.log("SignUpWithProfile - Checked for form data:", formData ? "Found" : "Not found");
    setHasFormData(!!formData);
  }, []);
  
  // Set up an effect to run after successful sign-up
  // This uses the redirect from Clerk's afterSignUpUrl to trigger our logic
  useEffect(() => {
    // Check if this is after a successful sign-up (URL will have redirected from clerk)
    const isAfterSignUp = window.location.href.includes('/dashboard');
    
    if (isAfterSignUp && hasFormData) {
      console.log("SignUpWithProfile - Detected after sign-up state");
      
      // Handle profile creation after sign-up
      (async () => {
        try {
          console.log("SignUpWithProfile - Attempting to handle profile after sign-up");
          await handleProfileAfterSignUp();
          console.log("SignUpWithProfile - Successfully handled profile");
        } catch (error) {
          console.error("SignUpWithProfile - Error handling profile after sign-up:", error);
        }
      })();
    }
  }, [hasFormData, router]);

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
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
        signInUrl="/signin"
      />
    </div>
  );
} 