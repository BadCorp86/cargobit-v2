"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@cargobit.v2");
  const [password, setPassword] = useState("Admin123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error || "Login fehlgeschlagen.");
        return;
      }

      // 2FA-ready hook point:
      // if (data.user.twoFAEnabled) { ... challenge flow ... }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Netzwerkfehler beim Login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass-card mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="text-sm opacity-80">CargoBit v2 Secure Admin Access</p>

      <div className="space-y-2">
        <label className="text-sm">Email</label>
        <input
          className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-cyan-300/70"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm">Passwort</label>
        <input
          className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-cyan-300/70"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" variant="glow" loading={loading} className="w-full">
        Einloggen
      </Button>
    </form>
  );
}
