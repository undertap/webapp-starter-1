import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

// Initialize Supabase client using environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Use the service role key for admin privileges in API routes
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * This API route initializes a default user profile if one doesn't exist yet.
 * It's called when a user visits the dashboard for the first time after signing up.
 */
export async function POST(req: Request) {
  try {
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