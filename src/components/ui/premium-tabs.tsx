"use client";

import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const PremiumTabs = Tabs.Root;

export function PremiumTabsList({ className, ...props }: React.ComponentProps<typeof Tabs.List>) {
  return <Tabs.List className={cn("inline-flex rounded-xl border border-white/15 bg-white/10 p-1", className)} {...props} />;
}

export function PremiumTabsTrigger({ className, ...props }: React.ComponentProps<typeof Tabs.Trigger>) {
  return (
    <Tabs.Trigger
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm transition data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1C7ED6] data-[state=active]:to-[#00D4FF] data-[state=active]:text-white data-[state=active]:shadow-[0_0_24px_rgba(0,212,255,0.45)]",
        className
      )}
      {...props}
    />
  );
}

export function PremiumTabsContent({ className, ...props }: React.ComponentProps<typeof Tabs.Content>) {
  return <Tabs.Content className={cn("mt-4", className)} {...props} />;
}
