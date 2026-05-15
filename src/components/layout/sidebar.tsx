"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/styleguide", label: "Styleguide" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-card w-64 p-4">
      <h3 className="mb-4 text-lg font-semibold">CargoBit v2</h3>
      <nav className="space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-gradient-to-r from-[#1C7ED6] to-[#00D4FF] text-white shadow-[0_0_24px_rgba(0,212,255,0.45)]"
                  : "text-white/80 hover:bg-white/10"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
