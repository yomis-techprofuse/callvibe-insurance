import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Building2, ChevronRight } from "lucide-react";
import { HBarList, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, EmptyRow } from "@/components/mi/kit";
import { Select, TabBar } from "@/components/mi/controls";
import { projects } from "@/data/marhaba";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Marhaba Intelligence" },
      {
        name: "description",
        content:
          "Demand intelligence per Dubai residential project: qualified conversations, high-intent buyers, site visits, objections and competitor pressure.",
      },
      { property: "og:title", content: "Projects — Marhaba Intelligence" },
      { property: "og:description", content: "Project-level demand, objections and competitor pressure across the portfolio." },
    ],
  }),
  component: ProjectsPage,
});

const TABS = ["Overview", "Demand", "Objections", "Competitors"];

function ProjectsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("Most Conversations");

  const rows = useMemo(() => {
    const list = projects.filter((p) => type === "All Types" || p.type === type);
    return [...list].sort((a, b) =>
      sort === "Highest Intent"
        ? b.highIntentRate - a.highIntentRate
        : sort === "Most Site Visits"
          ? b.siteVisits - a.siteVisits
          : sort === "Highest Qualified Rate"
            ? b.qualifiedRate - a.qualifiedRate
            : b.conversations - a.conversations,
    );
  }, [type, sort]);

  const totals = projects.reduce(
    (acc, p) => ({
      conv: acc.conv + p.conversations,
      visits: acc.visits + p.siteVisits,
      booking: acc.booking + p.bookingIntent,
    }),
    { conv: 0, visits: 0, booking: 0 },
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Live Projects" value={String(projects.length)} sub="Dubai residential portfolio" />
        <MetricTile label="Total Conversations" value={totals.conv.toLocaleString()} sub="Across all projects" />
        <MetricTile label="Site Visits Requested" value={String(totals.visits)} sub="Portfolio total" />
        <MetricTile label="Booking Intent" value={String(totals.booking)} sub="Signals detected" />
        <MetricTile label="Top Demand" value={projects[0]!.short} sub="Highest qualified volume" />
        <MetricTile label="Most Pressure" value="Creek" sub="Highest competitor mentions" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={setTab} />
        <div className="flex items-center gap-2">
          <Select
            label="All Types"
            value={type}
            onChange={setType}
            options={["All Types", ...Array.from(new Set(projects.map((p) => p.type)))]}
            className="w-[190px]"
          />
          <Select
            label="Most Conversations"
            value={sort}
            onChange={setSort}
            options={["Most Conversations", "Highest Intent", "Most Site Visits", "Highest Qualified Rate"]}
            className="w-[195px]"
          />
        </div>
      </div>

      {tab === "Overview" ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rows.map((p) => (
              <Panel key={p.id} className="flex flex-col">
                <PanelHead
                  title={p.name}
                  subtitle={`${p.location} · ${p.type}`}
                  icon={<Building2 className="h-3.5 w-3.5" />}
                  right={<Pill tone="primary">{p.from}</Pill>}
                />
                <div className="grid grid-cols-2 gap-2.5 px-4 py-3.5">
                  {[
                    ["Conversations", p.conversations.toLocaleString()],
                    ["Qualified Rate", `${p.qualifiedRate}%`],
                    ["High Intent", `${p.highIntentRate}%`],
                    ["Site Visits", String(p.siteVisits)],
                    ["Median Budget", p.medianBudget],
                    ["Top Config", p.topConfig],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-lg border border-border bg-muted/30 px-2.5 py-2">
                      <p className="text-[10.5px] text-muted-foreground">{l}</p>
                      <p className="mt-0.5 text-[12.5px] font-semibold tabular-nums">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border px-4 py-2.5">
                  <Pill tone="info">{p.dominantBuyerType}</Pill>
                  <Link
                    to="/projects/$id"
                    params={{ id: p.id }}
                    className="flex items-center gap-1 text-[11.5px] font-medium text-primary hover:underline"
                  >
                    Project intelligence
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </Panel>
            ))}
          </div>

          <Panel>
            <PanelHead title="Project Comparison" subtitle="Conversation performance side by side" />
            <TableWrap>
              <table className="w-full min-w-[1040px] border-collapse">
                <thead>
                  <tr>
                    <Th>Project</Th>
                    <Th>Location</Th>
                    <Th>Type</Th>
                    <Th>Conversations</Th>
                    <Th>Qualified</Th>
                    <Th>High Intent</Th>
                    <Th>Site Visits</Th>
                    <Th>Booking Intent</Th>
                    <Th>Median Budget</Th>
                    <Th>Handover</Th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/40">
                      <Td className="font-medium">
                        <Link to="/projects/$id" params={{ id: p.id }} className="hover:text-primary hover:underline">
                          {p.name}
                        </Link>
                      </Td>
                      <Td className="text-muted-foreground">{p.location}</Td>
                      <Td className="text-muted-foreground">{p.type}</Td>
                      <Td className="tabular-nums">{p.conversations.toLocaleString()}</Td>
                      <Td className="tabular-nums">{p.qualifiedRate}%</Td>
                      <Td>
                        <Pill tone={p.highIntentRate >= 25 ? "success" : p.highIntentRate >= 18 ? "warning" : "neutral"}>
                          {p.highIntentRate}%
                        </Pill>
                      </Td>
                      <Td className="tabular-nums">{p.siteVisits}</Td>
                      <Td className="tabular-nums">{p.bookingIntent}</Td>
                      <Td className="tabular-nums">{p.medianBudget}</Td>
                      <Td className="text-muted-foreground">{p.handover}</Td>
                    </tr>
                  ))}
                  {rows.length === 0 ? <EmptyRow span={10} /> : null}
                </tbody>
              </table>
            </TableWrap>
          </Panel>
        </>
      ) : null}

      {tab === "Demand" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((p) => (
            <Panel key={p.id}>
              <PanelHead title={p.short} subtitle="Conversation drivers" right={<Pill tone="primary">{p.topConfig}</Pill>} />
              <div className="px-4 py-3.5">
                <HBarList items={p.drivers} />
              </div>
            </Panel>
          ))}
        </div>
      ) : null}

      {tab === "Objections" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((p) => (
            <Panel key={p.id}>
              <PanelHead title={p.short} subtitle="Objections raised by buyers" />
              <div className="px-4 py-3.5">
                <HBarList items={p.objections} tone="danger" />
              </div>
            </Panel>
          ))}
        </div>
      ) : null}

      {tab === "Competitors" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((p) => (
            <Panel key={p.id}>
              <PanelHead title={p.short} subtitle="Developers buyers compare against" />
              <div className="px-4 py-3.5">
                <HBarList items={p.competitors} tone="classify" />
              </div>
            </Panel>
          ))}
        </div>
      ) : null}
    </div>
  );
}
