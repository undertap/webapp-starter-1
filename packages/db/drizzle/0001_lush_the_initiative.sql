CREATE TABLE "user_profiles" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"attachment_style" text NOT NULL,
	"primary_emotion" text,
	"secondary_emotion" text,
	"meditation_preference" text,
	"stress_response" text,
	"personal_goal" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;