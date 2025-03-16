"use client";

import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  const { theme } = useTheme();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  
  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp 
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
        redirectUrl="/dashboard" 
      />
    </div>
  );
}
