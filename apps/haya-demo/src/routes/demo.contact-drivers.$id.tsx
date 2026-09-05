import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Panel, PanelHead, TableWrap, Td, Th } from "@/components/mi/kit";
import { BarRow, DemoBadge, InsightBanner, PageHead } from "@/components/mi/ui";
import { conversations, driverById } from "@/data/techtar";

export const Route = createFileRoute("/demo/contact-drivers/$id")({
  loader: ({ params }) => {
    const driver = driverById(params.id);
    if (!driver) throw notFound();
    return { driver };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Driver unavailable — TechTar Intelligence" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.driver.name} — Root Cause Analysis | TechTar Intelligence`;
    const description = `Root-cause analysis, sub-drivers, resolution and repeat-contact behaviour for ${loaderData.driver.name} conversations.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DriverDetail,
});

function DriverDetail() {
  const { driver } = Route.useLoaderData();
  const related = conversations.filter((c) => c.driverId === driver.id);

  return (
    <div className="space-y-4">
      <Link to="/demo/contact-drivers" className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All contact drivers
      </Link>

      <PageHead
        title={`${driver.name} — Root Cause Analysis`}
        subtitle={`${driver.share}% of applicant conversations · ${driver.conversations.toLocaleString()} conversations in the selected period`}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Panel className="px-4 py-3">
          <p className="text-[11.5px] text-muted-foreground">First Contact Resolution</p>
          <p className="mt-1.5 text-[20px] leading-none font-semibold tabular-nums">{driver.fcr}%</p>
        </Panel>
        <Panel className="px-4 py-3">
          <p className="text-[11.5px] text-muted-foreground">Repeat Contact</p>
          <p className="mt-1.5 text-[20px] leading-none font-semibold text-danger tabular-nums">{driver.repeat}%</p>
        </Panel>
        <Panel className="px-4 py-3">
          <p className="text-[11.5px] text-muted-foreground">Average Handle Time</p>
          <p className="mt-1.5 text-[20px] leading-none font-semibold tabular-nums">{driver.aht}</p>
        </Panel>
        <Panel className="px-4 py-3">
          <p className="text-[11.5px] text-muted-foreground">Escalation Rate</p>
          <p className="mt-1.5 text-[20px] leading-none font-semibold tabular-nums">{driver.escalation}%</p>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <PanelHead title="Root Causes" subtitle="What is actually behind these conversations" right={<DemoBadge />} />
          <div className="space-y-2.5 p-4">
            {driver.rootCauses.map((r) => (
              <BarRow key={r.label} label={r.label} value={r.pct} max={Math.max(...driver.rootCauses.map((x) => x.pct))} tone="classify" />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Sub-Drivers" subtitle="Conversation share within this driver" />
          <div className="space-y-2.5 p-4">
            {driver.subDrivers.map((s) => (
              <BarRow
                key={s.label}
                label={s.label}
                value={s.pct}
                max={Math.max(...driver.subDrivers.map((x) => x.pct))}
                to="/demo/conversations"
                search={{ driver: driver.name }}
              />
            ))}
          </div>
        </Panel>
      </div>

      <InsightBanner body={driver.insight}>
        <Link
          to="/demo/conversations"
          search={{ driver: driver.name }}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline"
        >
          View Related Conversations <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </InsightBanner>

      {driver.emerging || driver.phrases ? (
        <Panel>
          <PanelHead
            title={driver.emerging ? "Emerging Pattern" : "What Applicants Are Saying"}
            subtitle={driver.emerging ?? "Representative applicant language from simulated conversations"}
            right={<DemoBadge label="Illustrative" />}
          />
          <div className="grid gap-3 p-4 md:grid-cols-3">
            {(driver.phrases ?? []).map((p) => (
              <div key={p} className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <Quote className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="mt-1.5 text-[12.5px] leading-[1.5] italic">&ldquo;{p}&rdquo;</p>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      <Panel>
        <PanelHead
          title="Related Conversations"
          subtitle={`${related.length} conversations in this demo dataset`}
          right={
            <Link to="/demo/conversations" search={{ driver: driver.name }} className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
              Open in Conversations <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <TableWrap>
          <table className="w-full min-w-[760px]">
            <thead>
              <tr>
                <Th>Conversation</Th>
                <Th>Language</Th>
                <Th>Sub-Driver</Th>
                <Th>Resolution</Th>
                <Th>Repeat</Th>
                <Th>QA</Th>
                <Th>Agent</Th>
              </tr>
            </thead>
            <tbody>
              {related.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-muted/50">
                  <Td>
                    <Link to="/demo/conversations/$id" params={{ id: c.id }} className="font-medium text-primary hover:underline">
                      {c.id}
                    </Link>
                  </Td>
                  <Td>{c.language}</Td>
                  <Td>{c.subDriver}</Td>
                  <Td>{c.resolution}</Td>
                  <Td>{c.repeat ? "Yes" : "No"}</Td>
                  <Td className="tabular-nums">{c.qa}</Td>
                  <Td>{c.agent}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </div>
  );
}
