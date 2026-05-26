import * as React from "react";

import { cn } from "@/lib/utils";

type FieldOrientation = "vertical" | "horizontal";

function FieldGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: FieldOrientation;
}) {
  return (
    <div
      data-slot="field"
      data-orientation={orientation}
      className={cn(
        "flex flex-col gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=horizontal]:gap-3",
        className,
      )}
      {...props}
    />
  );
}

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="field-label"
    className={cn(
      "text-xs font-bold uppercase tracking-widest text-gris-calido",
      className,
    )}
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-description"
    className={cn("text-xs text-gris-calido/60", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

function FieldSet({
  className,
  ...props
}: React.HTMLAttributes<HTMLFieldSetElement>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

type FieldLegendProps = React.HTMLAttributes<HTMLLegendElement> & {
  variant?: "label" | "title";
};

const FieldLegend = React.forwardRef<HTMLLegendElement, FieldLegendProps>(
  ({ className, variant = "label", ...props }, ref) => (
    <legend
      ref={ref}
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "text-xs font-bold uppercase tracking-widest text-gris-calido",
        className,
      )}
      {...props}
    />
  ),
);
FieldLegend.displayName = "FieldLegend";

export {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldSet,
  FieldLegend,
};
