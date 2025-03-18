import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

// Determine if we're running in static build phase (only at build time)
// NEXT_PHASE is only set during the build process, not at runtime
const isStaticBuild = process.env.NEXT_PHASE === 'phase-production-build';

// Define mock data for static builds
const mockProfile = {
  id: "mock-profile-id",
  user_id: "mock-user-id",
  attachment_style: "unknown",
  primary_emotion: "neutral",
  secondary_emotion: null,
  meditation_preference: "guided",
  stress_response: "moderate",
  personal_goal: "relaxation",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Only initialize Supabase if not in a static build
let supabase: SupabaseClient | null = null;

if (!isStaticBuild) {
  // Initialize Supabase client using environment variables
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Check for required environment variables
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("INIT - Missing Supabase environment variables:", {
      url: !SUPABASE_URL ? "missing" : "present", 
      serviceKey: !SUPABASE_SERVICE_KEY ? "missing" : "present"
    });
  }

  // Create client only if environment variables are available
  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    console.log("INIT - Supabase initialized with URL:", SUPABASE_URL);
  } else {
    console.warn("INIT - Supabase client not initialized due to missing environment variables");
  }
}

/**
 * This API route initializes a default user profile if one doesn't exist yet.
 * It's called when a user visits the dashboard for the first time after signing up.
 */
export async function POST(req: Request) {
  // Log current environment info
  console.log("INIT - Environment:", {
    isStaticBuild,
    phase: process.env.NEXT_PHASE,
    vercelEnv: process.env.VERCEL_ENV,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
  });
  
  // During static build, return mock data to allow build to complete
  if (isStaticBuild) {
    console.log("INIT - Static build detected, returning mock data");
    return NextResponse.json({
      message: "Default profile created",
      profileId: "mock-profile-id",
      created: true,
      profile: mockProfile
    });
  }
  
  try {
    // Return an error if Supabase client isn't initialized
    if (!supabase) {
      console.error("INIT - Request failed: Supabase client not initialized");
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }
    
    // Get the authenticated user
    const user = await currentUser();
    const userId = user?.id;
    
    console.log("INIT - Current user:", userId || "Not authenticated");
    
    if (!userId) {
      console.error("INIT - Unauthorized request, no user ID");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if user already has a profile
    console.log("INIT - Checking if user already has a profile:", userId);
    const { data: existingProfile, error: fetchError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("user_id", userId)
      .single();
    
    // If there's an error that's not "no rows found", it's an actual error
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("INIT - Error checking user profile:", fetchError);
      return NextResponse.json(
        { error: `Failed to check user profile: ${fetchError.message}` },
        { status: 500 }
      );
    }
    
    // If user already has a profile, return it
    if (existingProfile) {
      console.log("INIT - User already has a profile:", existingProfile.id);
      return NextResponse.json({ 
        message: "User already has a profile",
        profileId: existingProfile.id,
        created: false
      });
    }
    
    // Create a default profile for the user
    console.log("INIT - Creating default profile for user:", userId);
    const profileId = uuidv4();
    console.log("INIT - Generated profile ID:", profileId);
    
    const { data, error } = await supabase
      .from("user_profiles")
      .insert({
        id: profileId,
        user_id: userId,
        attachment_style: "unknown", // Default value
        primary_emotion: "neutral",  // Default value
        secondary_emotion: null,
        meditation_preference: "guided",  // Default value
        stress_response: "moderate",  // Default value
        personal_goal: "relaxation",  // Default value
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select();
    
    if (error) {
      console.error("INIT - Error creating default user profile:", error);
      return NextResponse.json(
        { error: `Failed to create default user profile: ${error.message}` },
        { status: 500 }
      );
    }
    
    console.log("INIT - Default profile created successfully:", profileId);
    return NextResponse.json({
      message: "Default profile created",
      profileId: profileId,
      created: true,
      profile: data[0]
    });
    
  } catch (error) {
    console.error("INIT - Error in init profile request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 