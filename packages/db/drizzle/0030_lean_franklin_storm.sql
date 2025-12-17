CREATE TABLE "media_kit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kit_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"meta" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_kit_events_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "media_kit_events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "media_kit_events" ADD CONSTRAINT "media_kit_events_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_kit_events" ADD CONSTRAINT "media_kit_events_kit_id_media_kits_id_fk" FOREIGN KEY ("kit_id") REFERENCES "public"."media_kits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "Creators can view their own analytics" ON "media_kit_events" AS PERMISSIVE FOR SELECT TO "authenticated" USING (auth.uid() = "media_kit_events"."user_id");