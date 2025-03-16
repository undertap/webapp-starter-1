"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function LoginPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace('/dashboard');
      } else {
        router.replace('/signin');
      }
    }
  }, [isLoaded, isSignedIn, router]);

  // Display a loading state while checking auth
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2efea]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#557373] border-r-transparent align-[-0.125em]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
} 