import { ShieldCheck, Lock, Activity } from "lucide-react";
import { AdminLoginForm } from "@/components/auth/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(0,212,255,0.18),transparent)]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass-card p-7 md:p-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            CargoBit v2 • Secure Control Plane
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Willkommen im <span className="text-cyan-300">Admin-Bereich</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm opacity-80 md:text-base">
            Sichere Anmeldung mit JWT + optionalem 2FA-Flow. Optimiert für schnelle, zuverlässige
            Administration von Matching, Risk, Wallet und Disputes.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <Lock className="mb-2 h-4 w-4 text-cyan-300" />
              <p className="text-sm font-medium">Session Security</p>
              <p className="mt-1 text-xs opacity-70">HttpOnly Cookie & Role Guard</p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <ShieldCheck className="mb-2 h-4 w-4 text-cyan-300" />
              <p className="text-sm font-medium">2FA Ready</p>
              <p className="mt-1 text-xs opacity-70">Challenge-basierter OTP-Step</p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <Activity className="mb-2 h-4 w-4 text-cyan-300" />
              <p className="text-sm font-medium">Realtime Ops</p>
              <p className="mt-1 text-xs opacity-70">Stabil für tägliche Admin-Workflows</p>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <AdminLoginForm />
        </section>
      </div>
    </main>
  );
}
