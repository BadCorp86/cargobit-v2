"use client";

import { Button } from "@/components/ui/button";
import { Section, SectionDescription, SectionTitle } from "@/components/ui/section";
import { PremiumTabs, PremiumTabsContent, PremiumTabsList, PremiumTabsTrigger } from "@/components/ui/premium-tabs";
import { PremiumModal } from "@/components/ui/premium-modal";

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
      <Section>
        <SectionTitle>CargoBit v2 Styleguide</SectionTitle>
        <SectionDescription>Phase 3: Premium Modal, Tabs, Section + polished interactions.</SectionDescription>
      </Section>

      <Section>
        <SectionTitle>Buttons</SectionTitle>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="premium">Premium</Button>
          <Button variant="glow">Glow</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Danger</Button>
          <Button loading>Loading</Button>
        </div>
      </Section>

      <Section>
        <SectionTitle>Tabs</SectionTitle>
        <PremiumTabs defaultValue="overview" className="mt-4">
          <PremiumTabsList>
            <PremiumTabsTrigger value="overview">Overview</PremiumTabsTrigger>
            <PremiumTabsTrigger value="risk">Risk</PremiumTabsTrigger>
            <PremiumTabsTrigger value="wallet">Wallet</PremiumTabsTrigger>
          </PremiumTabsList>
          <PremiumTabsContent value="overview">Overview content.</PremiumTabsContent>
          <PremiumTabsContent value="risk">Risk content.</PremiumTabsContent>
          <PremiumTabsContent value="wallet">Wallet content.</PremiumTabsContent>
        </PremiumTabs>
      </Section>

      <Section>
        <SectionTitle>Modal</SectionTitle>
        <div className="mt-4">
          <PremiumModal title="Premium Confirmation" description="This is a polished modal for critical actions.">
            <p className="text-sm opacity-80">CargoBit v2 UX component library in progress.</p>
          </PremiumModal>
        </div>
      </Section>
    </main>
  );
}
