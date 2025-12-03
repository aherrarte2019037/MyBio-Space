"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

interface FormSelectProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  options: { label: string; value: string; disabled?: boolean }[];
  className?: string;
  disabled?: boolean;
}

export function FormSelect<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  options,
  className,
  disabled,
}: FormSelectProps<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className="w-full space-y-2">
      {(label || description) && (
        <div className="space-y-1">
          {label && <Label>{label}</Label>}
          {description && <p className="text-muted-foreground text-xs">{description}</p>}
        </div>
      )}

      <div className="space-y-1">
        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
          <SelectTrigger className={className} aria-invalid={!!fieldState.error}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldState.error && <p className="text-destructive text-xs">{fieldState.error.message}</p>}
      </div>
    </div>
  );
}
