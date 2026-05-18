"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type LoginResponse = {
  ok: boolean;
  requires2FA?: boolean;
  challenge?: string;
  error?: string;
};

export function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@cargobit.v2");
  const [password, setPassword] = useState("Admin123!");
  const [otp, setOtp] = useState("");
  const [challenge, setChallenge] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Login fehlgeschlagen.");
        return;
      }

      if (data.requires2FA && data.challenge) {
        setChallenge(data.challenge);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Netzwerkfehler beim Login.");
    } finally {
      setLoading(false);
    }
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!challenge) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, code: otp }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "2FA-Verifizierung fehlgeschlagen.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      console.error("2FA error:", err);
      setError("Netzwerkfehler bei 2FA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="text-sm opacity-80">CargoBit v2 Secure Access</p>

      {!challenge ? (
        <form onSubmit={submitPassword} className="space-y-4">
          <input className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <Button type="submit" variant="glow" loading={loading} className="w-full">Einloggen</Button>
        </form>
      ) : (
        <form onSubmit={submitOtp} className="space-y-4">
          <input maxLength={6} className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <div className="flex gap-2">
            <Button type="button" variant="glass" onClick={() => setChallenge(null)} className="w-full">Zurück</Button>
            <Button type="submit" variant="premium" loading={loading} className="w-full">2FA prüfen</Button>
          </div>
        </form>
      )}
    </div>
  );
}
