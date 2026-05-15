"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-white hover:brightness-110",
        premium: "bg-gradient-to-r from-[#1C7ED6] to-[#00D4FF] text-white shadow-[0_10px_30px_rgba(28,126,214,0.35)] hover:-translate-y-0.5",
        glow: "bg-gradient-to-r from-[#00D4FF] to-[#1C7ED6] text-white shadow-[0_0_28px_rgba(0,212,255,0.45)] hover:shadow-[0_0_48px_rgba(0,212,255,0.65)]",
        glass: "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15",
        outline: "border border-white/20 text-white hover:bg-white/10",
        secondary: "bg-white/15 text-white hover:bg-white/25",
        ghost: "text-white hover:bg-white/10",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-9 px-3",
        default: "h-10 px-4",
        lg: "h-11 px-6",
        xl: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

export function Button({
  className,
  variant,
  size,
  loading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
