"use client";

// Types for the Short Form data
export type ShortFormData = {
  attachmentTendencies: string;
  emotionalCheckIn: string;
  meditationPreference: string;
  stressResponse: string;
  personalGoal: string;
};

// Types for the meditation recommendation
export type MeditationRecommendation = {
  type: string;
  focus: string;
  duration: number;
  hasMusic: boolean;
  description: string;
};

// Types for the user's attachment profile
export type AttachmentProfile = {
  style: "secure" | "anxious" | "avoidant" | "fearful-avoidant" | "unknown";
  primaryEmotion: string;
  secondaryEmotion?: string;
  meditationPreference: string;
  stressResponse: string;
  personalGoal: string;
  analysisDate: string;
};

// Save form data to localStorage
export const saveFormData = (data: ShortFormData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("meditationFormData", JSON.stringify(data));
  }
};

// Load form data from localStorage
export const loadFormData = (): ShortFormData | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("meditationFormData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved form data:", e);
      }
    }
  }
  return null;
};

// Clear form data from localStorage
export const clearFormData = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("meditationFormData");
  }
};

// Analyze form data to generate a user profile
export const analyzeFormData = (data: ShortFormData): AttachmentProfile => {
  // Default to unknown style
  let attachmentStyle: AttachmentProfile["style"] = "unknown";
  
  // Determine attachment style based on form responses
  if (data.attachmentTendencies === "frequently") {
    attachmentStyle = "anxious";
  } else if (data.attachmentTendencies === "rarely") {
    attachmentStyle = "avoidant";
  } else if (data.attachmentTendencies === "sometimes") {
    // This is somewhat simplified, but in a real app would involve more complex logic
    attachmentStyle = "secure";
  }

  // For a basic implementation, map the emotional check-in directly
  const primaryEmotion = data.emotionalCheckIn || "unknown";

  // Return the attachment profile
  return {
    style: attachmentStyle,
    primaryEmotion: primaryEmotion,
    meditationPreference: data.meditationPreference,
    stressResponse: data.stressResponse,
    personalGoal: data.personalGoal,
    analysisDate: new Date().toISOString(),
  };
};

// Generate a meditation recommendation based on the user's profile
export const generateRecommendation = (profile: AttachmentProfile): MeditationRecommendation => {
  // Default recommendation
  const recommendation: MeditationRecommendation = {
    type: "Grounding & Acceptance",
    focus: "mindfulness",
    duration: 10,
    hasMusic: true,
    description: "A calming meditation to help center your mind and body.",
  };

  // Customize focus based on personal goal
  switch (profile.personalGoal) {
    case "reduceAnxiety":
      recommendation.focus = "calming anxiety and finding inner peace";
      break;
    case "betterSleep":
      recommendation.focus = "releasing tension and preparing for restful sleep";
      recommendation.type = "Sleep Preparation";
      break;
    case "emotionalHealing":
      recommendation.focus = "gentle emotional processing and healing";
      recommendation.type = "Emotional Healing";
      break;
    case "selfAcceptance":
      recommendation.focus = "self-compassion and inner acceptance";
      recommendation.type = "Self-Compassion";
      break;
    case "focus":
      recommendation.focus = "enhancing mental clarity and focus";
      recommendation.type = "Mental Clarity";
      break;
  }

  // Adjust recommendation based on attachment style
  if (profile.style === "anxious") {
    recommendation.description += " Focuses on building security and self-trust.";
  } else if (profile.style === "avoidant") {
    recommendation.description += " Encourages gentle connection with emotions.";
  }

  // Adjust for meditation preference
  if (profile.meditationPreference === "visualImagery") {
    recommendation.description += " Includes peaceful visual imagery.";
  } else if (profile.meditationPreference === "breathwork") {
    recommendation.description += " Centered around rhythmic breathing techniques.";
  }

  return recommendation;
};

// Save profile to database when user signs up/in
export const saveProfileToDatabase = async (
  profile: AttachmentProfile
): Promise<boolean> => {
  try {
    console.log("saveProfileToDatabase - Starting with profile:", profile);
    
    // Format data for API
    const profileData = {
      attachmentStyle: profile.style,
      primaryEmotion: profile.primaryEmotion,
      secondaryEmotion: profile.secondaryEmotion || null,
      meditationPreference: profile.meditationPreference,
      stressResponse: profile.stressResponse,
      personalGoal: profile.personalGoal,
    };
    
    console.log("saveProfileToDatabase - Formatted data:", profileData);
    
    // Send data to API endpoint
    console.log("saveProfileToDatabase - Sending request to /api/user-profile");
    const response = await fetch('/api/user-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    
    const responseText = await response.text();
    console.log("saveProfileToDatabase - Response status:", response.status);
    console.log("saveProfileToDatabase - Response body:", responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("saveProfileToDatabase - Failed to parse response as JSON:", e);
    }
    
    if (!response.ok) {
      console.error('saveProfileToDatabase - Error saving profile, status:', response.status);
      console.error('saveProfileToDatabase - Error details:', responseData || responseText);
      return false;
    }
    
    console.log("saveProfileToDatabase - Successfully saved profile:", responseData);
    
    return true;
  } catch (error) {
    console.error("saveProfileToDatabase - Error saving profile to database:", error);
    return false;
  }
};

// Get user profile from database
export const getUserProfile = async (): Promise<AttachmentProfile | null> => {
  try {
    console.log("getUserProfile - Starting to fetch profile");
    
    // Get profile from API endpoint
    const response = await fetch('/api/user-profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("getUserProfile - Response status:", response.status);
    
    if (response.status === 404) {
      // No profile found - not an error
      console.log("getUserProfile - No profile found (404)");
      return null;
    }
    
    const responseText = await response.text();
    console.log("getUserProfile - Response body:", responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("getUserProfile - Failed to parse response as JSON:", e);
      console.error("getUserProfile - Response text was:", responseText);
      return null;
    }
    
    if (!response.ok) {
      console.error('getUserProfile - Error fetching profile, status:', response.status);
      console.error('getUserProfile - Error details:', data || responseText);
      return null;
    }
    
    console.log("getUserProfile - Successfully fetched profile:", data);
    
    if (!data.profile) {
      console.log("getUserProfile - Profile data not found in response");
      return null;
    }
    
    // Map from API response to AttachmentProfile
    const profile = {
      style: data.profile.attachment_style,
      primaryEmotion: data.profile.primary_emotion,
      secondaryEmotion: data.profile.secondary_emotion,
      meditationPreference: data.profile.meditation_preference,
      stressResponse: data.profile.stress_response,
      personalGoal: data.profile.personal_goal,
      analysisDate: data.profile.updated_at,
    };
    
    console.log("getUserProfile - Mapped to profile:", profile);
    return profile;
  } catch (error) {
    console.error("getUserProfile - Error getting user profile:", error);
    return null;
  }
};

// Handle profile creation or update after sign-up
export const handleProfileAfterSignUp = async (): Promise<void> => {
  try {
    console.log("Starting handleProfileAfterSignUp");
    
    // Check for locally saved form data
    const formData = loadFormData();
    console.log("Loaded form data:", formData ? "Found" : "Not found");
    
    if (!formData) {
      console.log("No form data found, aborting profile creation");
      return;
    }
    
    // Analyze form data
    console.log("Analyzing form data:", formData);
    const profile = analyzeFormData(formData);
    console.log("Analyzed profile:", profile);
    
    // Save to database
    console.log("Attempting to save profile to database");
    const saved = await saveProfileToDatabase(profile);
    console.log("Profile save result:", saved ? "Success" : "Failed");
    
    // Clear form data after successful save
    if (saved) {
      console.log("Clearing form data after successful save");
      clearFormData();
    } else {
      console.error("Profile was not saved successfully, not clearing form data");
    }
  } catch (error) {
    console.error("Error handling profile after sign-up:", error);
  }
}; 