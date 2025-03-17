import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

// Determine if we're running in production or during static build
const isStaticBuild = process.env.NEXT_PHASE === 'phase-production-build';

// Initialize Supabase client using environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check for required environment variables (only log in non-static build)
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

// Log initialization status (only in non-static build)
if (!isStaticBuild) {
  if (supabase) {
    console.log("Supabase initialized with URL:", SUPABASE_URL);
  } else {
    console.warn("Supabase client not initialized due to missing environment variables");
  }
}

// Add a function to check if the table exists
async function checkTableExists() {
  try {
    if (!supabase) {
      if (!isStaticBuild) {
        console.error("Cannot check table: Supabase client not initialized");
      }
      return false;
    }
    
    // List all tables to check if user_profiles exists
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      if (!isStaticBuild) {
        console.error("Error checking table: ", error);
      }
      return false;
    }
    
    return true;
  } catch (error) {
    if (!isStaticBuild) {
      console.error("Exception checking table:", error);
    }
    return false;
  }
}

// Call the function on initialization if supabase is available and not in static build
if (supabase && !isStaticBuild) {
  checkTableExists().then(exists => {
    console.log("user_profiles table exists:", exists);
  });
}

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

export async function GET(req: Request) {
  try {
    // During static build, return mock data to allow build to complete
    if (isStaticBuild) {
      return NextResponse.json({ profile: mockProfile });
    }
    
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
  try {
    // During static build, return mock data to allow build to complete
    if (isStaticBuild) {
      return NextResponse.json({
        message: "Profile created",
        profile: mockProfile
      });
    }
    
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