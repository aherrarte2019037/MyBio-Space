CREATE TYPE "public"."connected_account_provider" AS ENUM('youtube');--> statement-breakpoint
CREATE TABLE "analytics_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"platform_id" text NOT NULL,
	"stats" jsonb,
	"history" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "analytics_snapshots" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "connected_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"provider" "connected_account_provider" NOT NULL,
	"account_id" text NOT NULL,
	"access_token" text NOT NULL,
	"refresh_token" text,
	"expires_at" timestamp,
	"scope" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "connected_accounts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "analytics_snapshots" ADD CONSTRAINT "analytics_snapshots_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connected_accounts" ADD CONSTRAINT "connected_accounts_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "Users can view own snapshots" ON "analytics_snapshots" AS PERMISSIVE FOR SELECT TO public USING (auth.uid() = "analytics_snapshots"."user_id");--> statement-breakpoint
CREATE POLICY "Users can view own connected accounts" ON "connected_accounts" AS PERMISSIVE FOR SELECT TO public USING (auth.uid() = "connected_accounts"."user_id");--> statement-breakpoint
CREATE POLICY "Users can update own connected accounts" ON "connected_accounts" AS PERMISSIVE FOR UPDATE TO public USING (auth.uid() = "connected_accounts"."user_id");--> statement-breakpoint
CREATE POLICY "Users can insert own connected accounts" ON "connected_accounts" AS PERMISSIVE FOR INSERT TO public WITH CHECK (auth.uid() = "connected_accounts"."user_id");