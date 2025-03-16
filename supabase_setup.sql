-- Create the user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  attachment_style VARCHAR(50) NOT NULL DEFAULT 'unknown',
  primary_emotion VARCHAR(50),
  secondary_emotion VARCHAR(50),
  meditation_preference VARCHAR(50),
  stress_response VARCHAR(50),
  personal_goal VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Set up Row Level Security (RLS) to restrict access to user profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies to allow users to only see and modify their own profiles
CREATE POLICY "Users can view their own profiles"
  ON user_profiles
  FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own profiles"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own profiles"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Service role can access all profiles (for admin operations)
CREATE POLICY "Service role can do anything"
  ON user_profiles
  USING (true)
  WITH CHECK (true);

-- Add a comment to the table
COMMENT ON TABLE user_profiles IS 'Stores user meditation profiles with attachment styles and preferences'; 