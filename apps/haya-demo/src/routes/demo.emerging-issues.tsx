import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelHead } from "@/components/mi/kit";
import { PageHead, DemoBadge } from "@/components/mi/ui";

export const Route = createFileRoute("/demo/emerging-issues")({
  head: () => ({
    meta: [
      { title: "Emerging Issues — TechTar Intelligence" },
      { name: "description", content: "Early detection of new and accelerating applicant contact patterns across Hayya support conversations." },
      { property: "og:title", content: "Emerging Issues — TechTar Intelligence" },
      { property: "og:description", content: "Trend detection across simulated Hayya applicant support conversations." },
    ],
  }),
  component: () => (
    <div className="space-y-4">
      <PageHead title="Emerging Issues" subtitle="New and accelerating contact patterns detected across conversations." right={<DemoBadge />} />
      <Panel>
        <PanelHead title="Detected Patterns" subtitle="In progress" />
        <p className="p-4 text-[12.5px] text-muted-foreground">Trend cards and detection alerts are being built out in this demo section.</p>
      </Panel>
    </div>
  ),
});
