ALTER TABLE "media_kit_events" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP POLICY "Creators can view their own analytics" ON "media_kit_events" CASCADE;