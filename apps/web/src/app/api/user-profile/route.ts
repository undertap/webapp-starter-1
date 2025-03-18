import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

// Determine if we're running in static build phase (only at build time)
// NEXT_PHASE is only set during the build process, not at runtime
const isStaticBuild = process.env.NEXT_PHASE === 'phase-production-build';

// Define the UserProfile interface
interface UserProfile {
  id: string;
  user_id: string;
  attachment_style: string;
  primary_emotion?: string;
  secondary_emotion?: string;
  meditation_preference?: string;
  stress_response?: string;
  personal_goal?: string;
  created_at: string;
  updated_at: string;
}

// Mock data for static build
const mockProfile: UserProfile = {
  id: "mock-id",
  user_id: "mock-user-id",
  attachment_style: "secure",
  primary_emotion: "calm",
  secondary_emotion: "content",
  meditation_preference: "guided",
  stress_response: "low",
  personal_goal: "mindfulness",
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
    console.error("Missing Supabase environment variables:", {
      url: !SUPABASE_URL ? "missing" : "present", 
      serviceKey: !SUPABASE_SERVICE_KEY ? "missing" : "present"
    });
  }

  // Create client only if environment variables are available
  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    console.log("API - Supabase initialized with URL:", SUPABASE_URL);
  } else {
    console.warn("API - Supabase client not initialized due to missing environment variables");
  }

  // Add a function to check if the table exists
  async function checkTableExists() {
    try {
      console.log("API - Checking if user_profiles table exists");
      if (!supabase) {
        console.error("API - Cannot check table: Supabase client not initialized");
        return false;
      }
      
      // List all tables to check if user_profiles exists
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error("Error checking table: ", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Exception checking table:", error);
      return false;
    }
  }

  // Call the function on initialization if supabase is available
  if (supabase) {
    checkTableExists().then(exists => {
      console.log("user_profiles table exists:", exists);
    });
  }
}

export async function GET(req: Request) {
  // During static build, return mock data to allow build to complete
  if (isStaticBuild) {
    return NextResponse.json({ profile: mockProfile });
  }
  
  try {
    // Return an error if Supabase client isn't initialized
    if (!supabase) {
      console.error("GET request failed: Supabase client not initialized");
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }
    
    // Get the authenticated user
    const user = await currentUser();
    const userId = user?.id;
    
    console.log("GET request - currentUser:", userId ? "Authenticated" : "Not authenticated");
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if table exists first
    const tableExists = await checkTableExists();
    if (!tableExists) {
      console.error("user_profiles table does not exist");
      return NextResponse.json(
        { error: "Database table not found" },
        { status: 500 }
      );
    }
    
    // Fetch user profile from Supabase
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    // Handle the specific case of no rows found - this is expected for new users
    if (error && error.code === "PGRST116") {
      console.log("No profile found for user:", userId);
      return NextResponse.json(
        { message: "No profile found" },
        { status: 404 }
      );
    }
    
    // Handle other errors
    if (error) {
      console.error("Error fetching user profile:", error);
      return NextResponse.json(
        { error: `Failed to fetch user profile: ${error.message}` },
        { status: 500 }
      );
    }
    
    console.log("Profile found for user:", userId);
    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // Log current environment info
  console.log("POST - Environment:", {
    isStaticBuild,
    phase: process.env.NEXT_PHASE,
    vercelEnv: process.env.VERCEL_ENV,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
  });
  
  // During static build, return mock data to allow build to complete
  if (isStaticBuild) {
    console.log("POST - Static build detected, returning mock data");
    return NextResponse.json({
      message: "Profile created",
      profile: mockProfile
    });
  }
  
  try {
    // Return an error if Supabase client isn't initialized
    if (!supabase) {
      console.error("POST request failed: Supabase client not initialized");
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }
    
    // Get the authenticated user
    const user = await currentUser();
    const userId = user?.id;
    
    console.log("POST request - currentUser:", userId ? "Authenticated" : "Not authenticated");
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if table exists first
    const tableExists = await checkTableExists();
    if (!tableExists) {
      console.error("user_profiles table does not exist");
      return NextResponse.json(
        { error: "Database table not found" },
        { status: 500 }
      );
    }
    
    // Parse the request body
    const body = await req.json();
    const { 
      attachmentStyle, 
      primaryEmotion, 
      secondaryEmotion, 
      meditationPreference, 
      stressResponse, 
      personalGoal 
    } = body;
    
    console.log("Request body:", { 
      attachmentStyle, 
      primaryEmotion, 
      secondaryEmotion, 
      meditationPreference, 
      stressResponse, 
      personalGoal 
    });
    
    // Check if user profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("user_id", userId)
      .single();
      
    // It's normal to not find an existing profile for a new user
    let profileExists = false;
    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        // No profile found - this is expected for new users
        console.log("No existing profile found for user:", userId);
      } else {
        // This is an actual error
        console.error("Error checking user profile:", fetchError);
        return NextResponse.json(
          { error: `Failed to check user profile: ${fetchError.message}` },
          { status: 500 }
        );
      }
    } else if (existingProfile) {
      profileExists = true;
    }
    
    console.log("Existing profile check:", profileExists ? "Found" : "Not found");
    
    let result;
    
    if (profileExists && existingProfile) {
      // Update existing profile
      console.log("Updating profile with ID:", existingProfile.id);
      const { data, error } = await supabase
        .from("user_profiles")
        .update({
          attachment_style: attachmentStyle,
          primary_emotion: primaryEmotion,
          secondary_emotion: secondaryEmotion,
          meditation_preference: meditationPreference,
          stress_response: stressResponse,
          personal_goal: personalGoal,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingProfile.id)
        .select();
        
      if (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
          { error: `Failed to update user profile: ${error.message}` },
          { status: 500 }
        );
      }
      
      result = data[0];
    } else {
      // Create new profile
      console.log("Creating new profile for user:", userId);
      const profileId = uuidv4();
      console.log("Generated profile ID:", profileId);
      
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          id: profileId,
          user_id: userId,
          attachment_style: attachmentStyle,
          primary_emotion: primaryEmotion,
          secondary_emotion: secondaryEmotion,
          meditation_preference: meditationPreference,
          stress_response: stressResponse,
          personal_goal: personalGoal,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select();
        
      if (error) {
        console.error("Error creating user profile:", error);
        return NextResponse.json(
          { error: `Failed to create user profile: ${error.message}` },
          { status: 500 }
        );
      }
      
      result = data[0];
    }
    
    console.log("Operation successful, returning result");
    return NextResponse.json({
      message: profileExists ? "Profile updated" : "Profile created",
      profile: result,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to check if the table exists (for runtime use only)
async function checkTableExists() {
  try {
    if (!supabase) {
      console.error("Cannot check table: Supabase client not initialized");
      return false;
    }
    
    // List all tables to check if user_profiles exists
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error("Error checking table: ", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception checking table:", error);
    return false;
  }
} 