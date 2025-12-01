CREATE TYPE "public"."metric_type" AS ENUM('views', 'subscribers', 'watchTime');--> statement-breakpoint
ALTER TYPE "public"."connected_account_provider" ADD VALUE 'instagram';--> statement-breakpoint
ALTER TYPE "public"."connected_account_provider" ADD VALUE 'tiktok';--> statement-breakpoint
ALTER TABLE "analytics_snapshots" ALTER COLUMN "stats" SET DEFAULT '{"subscriberCount":0,"videoCount":0,"viewCount":0,"followerCount":0,"mediaCount":0}'::jsonb;--> statement-breakpoint
ALTER TABLE "analytics_snapshots" ADD COLUMN "provider" "connected_account_provider" NOT NULL;--> statement-breakpoint
ALTER TABLE "media_kits" ADD COLUMN "blocks" jsonb DEFAULT '[]'::jsonb NOT NULL;