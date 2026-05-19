"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type MeResponse = {
  ok: boolean;
  user?: { email: string; role: string; twoFAEnabled: boolean };
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<MeResponse | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: MeResponse) => {
        if (!d.ok) {
          router.push("/admin/login");
          return;
        }
        setMe(d);
      })
      .catch(() => router.push("/admin/login"));
  }, [router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
      <section className="glass-card p-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2 text-sm opacity-80">
          {me?.user ? `Eingeloggt als ${me.user.email} (${me.user.role})` : "Lade Benutzerdaten..."}
        </p>

        <div className="mt-4">
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </section>
    </main>
  );
}
