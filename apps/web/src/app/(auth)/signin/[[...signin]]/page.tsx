"use client";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function SignInPage() {
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
      <SignIn 
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
        fallbackRedirectUrl="/dashboard" 
      />
    </div>
  );
}
