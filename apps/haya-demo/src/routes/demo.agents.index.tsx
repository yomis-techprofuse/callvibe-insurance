import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelHead } from "@/components/mi/kit";
import { PageHead, DemoBadge } from "@/components/mi/ui";

export const Route = createFileRoute("/demo/agents/")({
  head: () => ({
    meta: [
      { title: "Agents — TechTar Intelligence" },
      { name: "description", content: "Agent performance and coaching signals derived from Hayya applicant support conversations." },
      { property: "og:title", content: "Agents — TechTar Intelligence" },
      { property: "og:description", content: "Coaching opportunities and quality signals per agent. Simulated demo data." },
    ],
  }),
  component: () => (
    <div className="space-y-4">
      <PageHead title="Agents" subtitle="Performance and coaching signals per agent." right={<DemoBadge />} />
      <Panel>
        <PanelHead title="Agent Performance" subtitle="In progress" />
        <p className="p-4 text-[12.5px] text-muted-foreground">Agent tables and coaching profiles are being built out in this demo section.</p>
      </Panel>
    </div>
  ),
});
