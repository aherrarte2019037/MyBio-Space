"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { KitBlock } from "@repo/db";
import { Button, FormInput, FormSelect } from "@repo/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Case, Default, Switch } from "react-if";
import {
  ChartSchema,
  ContactSchema,
  CustomSchema,
  ProfileSchema,
  SeparatorSchema,
  StatsSchema,
} from "../lib/schemas/editor-blocks";

interface Props {
  block: KitBlock;
  onSave: (data: KitBlock["data"]) => void;
  onCancel: () => void;
}

export function BlockConfig({ block, onSave, onCancel }: Props) {
  const schema = {
    separator: SeparatorSchema,
    stats: StatsSchema,
    chart: ChartSchema,
    custom: CustomSchema,
    contact: ContactSchema,
    profile: ProfileSchema,
  }[block.type];

  const form = useForm<KitBlock["data"]>({
    resolver: zodResolver(schema),
    defaultValues: block.data,
  });

  useEffect(() => {
    form.reset(block.data);
  }, [block.data, form]);

  const onSubmit = (data: KitBlock["data"]) => {
    onSave(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Switch>
        <Case condition={block.type === "separator"}>
          <FormInput
            control={form.control}
            name="title"
            label="Section Title"
            placeholder="e.g. My Stats"
          />
        </Case>

        <Case condition={block.type === "stats" || block.type === "chart"}>
          <div className="space-y-4">
            <FormSelect
              control={form.control}
              name="provider"
              label="Platform"
              placeholder="Select platform"
              options={[
                { label: "YouTube", value: "youtube" },
                { label: "Instagram (Coming Soon)", value: "instagram", disabled: true },
                { label: "TikTok (Coming Soon)", value: "tiktok", disabled: true },
              ]}
            />

            <FormSelect
              control={form.control}
              name="metric"
              label="Metric"
              placeholder="Select metric"
              options={[
                { label: "All Stats (Grid)", value: "all" },
                { label: "Subscribers Only", value: "subscribers" },
                { label: "Views Only", value: "views" },
                ...(block.type === "chart" ? [{ label: "Watch Time", value: "watchTime" }] : []),
              ]}
            />

            {block.type === "chart" && (
              <FormInput
                control={form.control}
                name="days"
                label="Time Range (Days)"
                type="number"
                min={7}
                max={365}
                onChange={(e) => form.setValue("days", Number(e.target.value))}
              />
            )}
          </div>
        </Case>

        <Case condition={block.type === "custom"}>
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="title"
              label="Card Heading"
              placeholder="e.g. My Newsletter"
            />
            <FormInput
              control={form.control}
              name="description"
              label="Description"
              placeholder="e.g. Join 10k readers..."
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name="backgroundColor"
                  label="Background"
                  type="color"
                  className="h-10 w-full p-1 cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  control={form.control}
                  name="textColor"
                  label="Text Color"
                  type="color"
                  className="h-10 w-full p-1 cursor-pointer"
                />
              </div>
            </div>
            <FormInput
              control={form.control}
              name="link"
              label="Link URL (Optional)"
              placeholder="https://..."
            />
          </div>
        </Case>

        <Case condition={block.type === "contact"}>
          <FormInput control={form.control} name="buttonText" label="Button Text" />
        </Case>

        <Case condition={block.type === "profile"}>
          <FormInput
            control={form.control}
            name="displayName"
            label="Display Name Override"
            placeholder="Leave empty to use username"
          />
        </Case>

        <Default>
          <p className="text-sm text-muted-foreground">No settings available for this block.</p>
        </Default>
      </Switch>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
