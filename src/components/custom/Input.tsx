"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-[10px] font-bold uppercase tracking-wider text-carbon/60 ml-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-md border border-borde bg-white px-4 py-2 text-sm text-carbon ring-offset-crema file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gris-calido/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado/20 focus-visible:border-dorado transition-all disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] text-red-500 font-medium ml-1 mt-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-[10px] font-bold uppercase tracking-wider text-carbon/60 ml-1">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-md border border-borde bg-white px-4 py-3 text-sm text-carbon ring-offset-crema placeholder:text-gris-calido/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado/20 focus-visible:border-dorado transition-all disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] text-red-500 font-medium ml-1 mt-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Input, Textarea }
