CREATE VIEW "public"."media_kit_metrics" WITH (security_invoker = true) AS (
  SELECT 
    "media_kit_events"."kit_id" as kit_id,
    COUNT(*) FILTER (WHERE "media_kit_events"."event_type" = 'view') :: integer as views,
    COUNT(*) FILTER (WHERE "media_kit_events"."event_type" = 'share') :: integer as shares,
    COUNT(*) FILTER (WHERE "media_kit_events"."event_type" = 'contact_click') :: integer as contacts
  FROM "media_kit_events"
  GROUP BY "media_kit_events"."kit_id"
);