"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

import { Input } from "../input";
import { Label } from "../label";

interface FormInputProps<T extends FieldValues = FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
}

export function FormInput<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  className,
  ...props
}: FormInputProps<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className="w-full space-y-2">
      {(label || description) && (
        <div className="space-y-1">
          {label && <Label htmlFor={field.name}>{label}</Label>}
          {description && <p className="text-muted-foreground text-xs">{description}</p>}
        </div>
      )}

      <div className="space-y-1">
        <Input
          {...props}
          aria-invalid={!!fieldState.error}
          id={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          value={field.value || ""}
          className={className}
        />
        {fieldState.error && <p className="text-destructive text-xs">{fieldState.error.message}</p>}
      </div>
    </div>
  );
}
