"use client";

import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { AdminDataTable } from "@/components/admin/data-table";

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[260px_1fr]">
      <Sidebar />
      <section className="space-y-6">
        <div className="glass-card p-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="mt-2 text-sm opacity-80">Premium UI + DataTable + Toast Engine.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="premium">Premium</Button>
            <Button variant="glow" onClick={() => toast.success("CargoBit v2 notification works!")}>Toast Test</Button>
            <Button variant="glass">Glass</Button>
          </div>
        </div>
        <AdminDataTable />
      </section>
    </main>
  );
}
