import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Panel, PanelHead, TableWrap, Td, Th } from "@/components/mi/kit";
import { BarRow, InsightBanner, PageHead } from "@/components/mi/ui";
import { drivers } from "@/data/techtar";

export const Route = createFileRoute("/demo/contact-drivers/")({
  head: () => ({
    meta: [
      { title: "Contact Drivers — TechTar Intelligence" },
      { name: "description", content: "Why applicants are contacting Hayya: contact-driver share, FCR, repeat contact and escalation across the applicant support queue." },
      { property: "og:title", content: "Contact Drivers — TechTar Intelligence" },
      { property: "og:description", content: "Contact-driver analysis with root causes for Hayya applicant support. Simulated demo data." },
    ],
  }),
  component: ContactDrivers,
});

function ContactDrivers() {
  return (
    <div className="space-y-4">
      <PageHead
        title="Why Applicants Are Contacting Hayya"
        subtitle="Contact drivers ranked by share of conversations. Select any driver to open root-cause analysis, sub-drivers and the underlying conversations."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <PanelHead title="Contact Driver Mix" subtitle="Share of conversations — click to drill down" />
          <div className="space-y-2 p-4">
            {drivers.map((d) => (
              <BarRow
                key={d.id}
                label={d.name}
                value={d.share}
                max={30}
                to="/demo/contact-drivers/$id"
                params={{ id: d.id }}
                tone={d.repeat >= 25 ? "danger" : d.repeat >= 18 ? "warning" : "primary"}
                right={`${d.share}%`}
              />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Where Resolution Is Breaking" subtitle="Lowest first contact resolution" />
          <div className="space-y-2 p-4">
            {[...drivers]
              .sort((a, b) => a.fcr - b.fcr)
              .slice(0, 5)
              .map((d) => (
                <BarRow key={d.id} label={d.name} value={d.fcr} tone="danger" to="/demo/contact-drivers/$id" params={{ id: d.id }} right={`FCR ${d.fcr}%`} />
              ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Driver Performance" subtitle="Volume, resolution and recontact behaviour by driver" />
        <TableWrap>
          <table className="w-full min-w-[860px]">
            <thead>
              <tr>
                <Th>Contact Driver</Th>
                <Th>Share</Th>
                <Th>Conversations</Th>
                <Th>FCR</Th>
                <Th>Repeat Contact</Th>
                <Th>AHT</Th>
                <Th>Escalation</Th>
                <Th>Movement</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="transition-colors hover:bg-muted/50">
                  <Td className="font-medium">{d.name}</Td>
                  <Td className="tabular-nums">{d.share}%</Td>
                  <Td className="tabular-nums">{d.conversations.toLocaleString()}</Td>
                  <Td className="tabular-nums">{d.fcr}%</Td>
                  <Td className={d.repeat >= 25 ? "font-semibold text-danger tabular-nums" : "tabular-nums"}>{d.repeat}%</Td>
                  <Td className="tabular-nums">{d.aht}</Td>
                  <Td className="tabular-nums">{d.escalation}%</Td>
                  <Td className="text-[11.5px] text-muted-foreground">{d.trend}</Td>
                  <Td>
                    <Link to="/demo/contact-drivers/$id" params={{ id: d.id }} className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
                      Analyse <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <InsightBanner body="Two drivers — Application Status and Application Rejection / Resubmission — account for a disproportionate share of repeat contacts and escalations relative to their conversation volume." />
    </div>
  );
}
