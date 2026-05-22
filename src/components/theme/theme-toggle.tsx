"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/80 px-3 py-2 text-xs font-medium text-foreground transition hover:border-primary/70 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
      aria-label="Theme wechseln"
      title={isDark ? "Auf helles Theme wechseln" : "Auf dunkles Theme wechseln"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">{isDark ? "Hell aktivieren" : "Dunkel aktivieren"}</span>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}