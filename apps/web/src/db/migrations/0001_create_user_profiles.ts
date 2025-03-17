import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

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

// Using any type since this is only for migration definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: any) {
  await db.schema.createTable(userProfiles).ifNotExists().execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: any) {
  await db.schema.dropTable(userProfiles).ifExists().execute();
} 