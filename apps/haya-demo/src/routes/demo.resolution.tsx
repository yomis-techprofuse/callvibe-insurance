import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Panel, PanelHead, TableWrap, Td, Th } from "@/components/mi/kit";
import { BarRow, DemoBadge, InsightBanner, PageHead } from "@/components/mi/ui";
import { driverById, repeatRootCauses, resolutionRows } from "@/data/techtar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/resolution")({
  head: () => ({
    meta: [
      { title: "Resolution Intelligence — TechTar Intelligence" },
      { name: "description", content: "First contact resolution, repeat contact and escalation by contact driver, with root-cause attribution for why applicants contact Hayya again." },
      { property: "og:title", content: "Resolution Intelligence — TechTar Intelligence" },
      { property: "og:description", content: "Understand what creates repeat contact, not just how much of it there is. Simulated demo data." },
    ],
  }),
  component: ResolutionPage,
});

function ResolutionPage() {
  const [openRow, setOpenRow] = useState<string | null>("application-status");
  const selected = openRow ? driverById(openRow) : undefined;

  return (
    <div className="space-y-4">
      <PageHead
        title="Don't Just Measure Repeat Contact. Understand What Creates It."
        subtitle="Resolution outcomes by contact driver, with the root causes behind recontact behaviour."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <PanelHead title="Resolution by Contact Driver" subtitle="Select a row to reveal associated root causes" right={<DemoBadge />} />
          <TableWrap>
            <table className="w-full min-w-[620px]">
              <thead>
                <tr>
                  <Th>Contact Driver</Th>
                  <Th>FCR</Th>
                  <Th>Repeat Contact</Th>
                  <Th>Escalation</Th>
                  <Th />
                </tr>
              </thead>
              <tbody>
                {resolutionRows.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setOpenRow(r.id)}
                    className={cn("cursor-pointer transition-colors hover:bg-muted/50", openRow === r.id && "bg-primary-soft/40")}
                  >
                    <Td className="font-medium">{r.driver}</Td>
                    <Td className={cn("tabular-nums", r.fcr < 70 && "font-semibold text-danger")}>{r.fcr}%</Td>
                    <Td className={cn("tabular-nums", r.repeat >= 20 && "font-semibold text-danger")}>{r.repeat}%</Td>
                    <Td className="tabular-nums">{r.escalation}%</Td>
                    <Td>
                      <span className="text-[12px] font-semibold text-primary">Root causes</span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>

          {selected ? (
            <div className="border-t border-border p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12.5px] font-semibold">{selected.name} — root causes</p>
                <Link to="/demo/contact-drivers/$id" params={{ id: selected.id }} className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
                  Full analysis <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-2.5 space-y-2.5">
                {selected.rootCauses.map((rc) => (
                  <BarRow key={rc.label} label={rc.label} value={rc.pct} max={Math.max(...selected.rootCauses.map((x) => x.pct))} tone="classify" />
                ))}
              </div>
            </div>
          ) : null}
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelHead title="Why Applicants Contact Again" subtitle="Repeat-contact root causes across all drivers" />
            <div className="space-y-2.5 p-4">
              {repeatRootCauses.map((r) => (
                <BarRow key={r.label} label={r.label} value={r.pct} max={30} tone="danger" />
              ))}
            </div>
          </Panel>

          <div className="card-surface border border-primary/25 bg-primary-soft/50 px-4 py-5 text-center">
            <p className="text-[26px] leading-none font-semibold tracking-tight text-primary">52% of repeat contacts</p>
            <p className="mx-auto mt-2 max-w-xs text-[12.5px] leading-[1.6] text-foreground/85">
              are associated with incomplete resolution or uncertainty about the next action.
            </p>
            <span className="mt-3 inline-flex rounded-md bg-warning-soft px-1.5 py-[2px] text-[9.5px] font-semibold tracking-widest text-warning uppercase">
              Simulated demo insight
            </span>
          </div>
        </div>
      </div>

      <InsightBanner body="Resolution quality, not contact volume, is the strongest predictor of recontact in this dataset. Drivers where agents cannot confirm a definite next action for the applicant show materially higher repeat-contact rates.">
        <Link to="/demo/conversations" search={{ driver: "Application Status" }} className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
          View the conversations behind this signal <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </InsightBanner>
    </div>
  );
}
