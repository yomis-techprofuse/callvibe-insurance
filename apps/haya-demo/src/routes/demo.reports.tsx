import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelHead } from "@/components/mi/kit";
import { PageHead, DemoBadge } from "@/components/mi/ui";

export const Route = createFileRoute("/demo/reports")({
  head: () => ({
    meta: [
      { title: "Reports — TechTar Intelligence" },
      { name: "description", content: "Scheduled and on-demand intelligence reports for Hayya applicant support operations." },
      { property: "og:title", content: "Reports — TechTar Intelligence" },
      { property: "og:description", content: "Operational and executive reporting for Hayya applicant support. Simulated demo data." },
    ],
  }),
  component: () => (
    <div className="space-y-4">
      <PageHead title="Reports" subtitle="Operational and executive reporting packs." right={<DemoBadge />} />
      <Panel>
        <PanelHead title="Report Library" subtitle="In progress" />
        <p className="p-4 text-[12.5px] text-muted-foreground">Report cards and exports are being built out in this demo section.</p>
      </Panel>
    </div>
  ),
});
