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
    setHasFormData(!!formData);
  }, []);
  
  // Handle successful sign-up
  const handleSignUpComplete = async () => {
    try {
      // If we have form data, save it to the database
      if (hasFormData) {
        await handleProfileAfterSignUp();
      }
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error("Error handling sign-up completion:", error);
      // Still redirect to dashboard even if there's an error
      router.push('/dashboard');
    }
  };

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