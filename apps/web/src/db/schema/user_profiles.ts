import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * User Profile Table - Stores attachment and meditation preferences
 * 
 * This table stores user profile data from the meditation form, including:
 * - Attachment style information
 * - Emotional tendencies
 * - Meditation preferences
 * - Personal goals
 */
export const userProfiles = pgTable("user_profiles", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id").notNull().unique(),
  attachmentStyle: varchar("attachment_style", { length: 50 }).notNull().default("unknown"),
  primaryEmotion: varchar("primary_emotion", { length: 50 }),
  secondaryEmotion: varchar("secondary_emotion", { length: 50 }),
  meditationPreference: varchar("meditation_preference", { length: 50 }),
  stressResponse: varchar("stress_response", { length: 50 }),
  personalGoal: varchar("personal_goal", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for type validation
export const insertUserProfileSchema = createInsertSchema(userProfiles);
export const selectUserProfileSchema = createSelectSchema(userProfiles);
export const userProfileSchema = selectUserProfileSchema.extend({
  // Add any additional validation or transformation if needed
});

// Types
export type UserProfile = z.infer<typeof userProfileSchema>;
export type NewUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfileWithoutId = Omit<NewUserProfile, "id">; 