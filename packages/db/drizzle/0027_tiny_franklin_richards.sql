ALTER TABLE "media_kits" DROP CONSTRAINT "media_kits_slug_unique";--> statement-breakpoint
ALTER TABLE "media_kits" ADD CONSTRAINT "user_kit_slug_unique" UNIQUE("user_id","slug");