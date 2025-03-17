import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

// Determine if we're running in production or during static build
const isStaticBuild = process.env.NEXT_PHASE === 'phase-production-build';

// Initialize Supabase client using environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check for required environment variables (only if not in static build)
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  if (!isStaticBuild) {
    console.error("Missing Supabase environment variables:", {
      url: !SUPABASE_URL ? "missing" : "present", 
      serviceKey: !SUPABASE_SERVICE_KEY ? "missing" : "present"
    });
  }
}

// Create client only if environment variables are available
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

/**
 * This API route initializes a default user profile if one doesn't exist yet.
 * It's called when a user visits the dashboard for the first time after signing up.
 */
export async function POST(req: Request) {
  try {
    // During static build, return mock data to allow build to complete
    if (isStaticBuild) {
      return NextResponse.json({
        message: "Default profile created",
        profileId: "mock-profile-id",
        created: true,
        profile: {
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
        }
      });
    }
    
    // Return an error if Supabase client isn't initialized
    if (!supabase) {
      console.error("INIT request failed: Supabase client not initialized");
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }
    
    // Get the authenticated user
    const user = await currentUser();
    const userId = user?.id;
    
    console.log("INIT request - currentUser:", userId ? "Authenticated" : "Not authenticated");
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if user already has a profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("user_id", userId)
      .single();
    
    // If there's an error that's not "no rows found", it's an actual error
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking user profile:", fetchError);
      return NextResponse.json(
        { error: `Failed to check user profile: ${fetchError.message}` },
        { status: 500 }
      );
    }
    
    // If user already has a profile, return it
    if (existingProfile) {
      console.log("User already has a profile:", existingProfile.id);
      return NextResponse.json({ 
        message: "User already has a profile",
        profileId: existingProfile.id,
        created: false
      });
    }
    
    // Create a default profile for the user
    console.log("Creating default profile for user:", userId);
    const profileId = uuidv4();
    
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
      console.error("Error creating default user profile:", error);
      return NextResponse.json(
        { error: `Failed to create default user profile: ${error.message}` },
        { status: 500 }
      );
    }
    
    console.log("Default profile created successfully:", profileId);
    return NextResponse.json({
      message: "Default profile created",
      profileId: profileId,
      created: true,
      profile: data[0]
    });
    
  } catch (error) {
    console.error("Error in init profile request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 