import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Building2, ChevronRight } from "lucide-react";
import { HBarList, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, EmptyRow } from "@/components/mi/kit";
import { Select, TabBar } from "@/components/mi/controls";
import { destinations } from "@/data/marhaba";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — CallVibe" },
      {
        name: "description",
        content:
          "Demand intelligence per destination: qualified enquiries, high-intent travellers, itineraries sent, objections, departure cities and competitor pressure.",
      },
      { property: "og:title", content: "Destinations — CallVibe" },
      { property: "og:description", content: "Destination-level demand, objections and competitor pressure across the portfolio." },
    ],
  }),
  component: DestinationsPage,
});

const TABS = ["Overview", "Demand", "Objections", "Competitors"];

function DestinationsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("Most Conversations");

  const rows = useMemo(() => {
    const list = destinations.filter((p) => type === "All Types" || p.type === type);
    return [...list].sort((a, b) =>
      sort === "Highest Intent"
        ? b.highIntentRate - a.highIntentRate
        : sort === "Most Itineraries Sent"
          ? b.itinerariesSent - a.itinerariesSent
          : sort === "Highest Qualified Rate"
            ? b.qualifiedRate - a.qualifiedRate
            : b.conversations - a.conversations,
    );
  }, [type, sort]);

  const totals = destinations.reduce(
    (acc, p) => ({
      conv: acc.conv + p.conversations,
      visits: acc.visits + p.itinerariesSent,
      booking: acc.booking + p.bookingIntent,
    }),
    { conv: 0, visits: 0, booking: 0 },
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Live Destinations" value={String(destinations.length)} sub="Outbound & domestic portfolio" />
        <MetricTile label="Total Conversations" value={totals.conv.toLocaleString()} sub="Across all destinations" />
        <MetricTile label="Itineraries Sent" value={String(totals.visits)} sub="Portfolio total" />
        <MetricTile label="Booking Intent" value={String(totals.booking)} sub="Signals detected" />
        <MetricTile label="Top Demand" value={destinations[0]!.short} sub="Highest qualified volume" />
        <MetricTile label="Most Pressure" value="Creek" sub="Highest competitor mentions" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={setTab} />
        <div className="flex items-center gap-2">
          <Select
            label="All Types"
            value={type}
            onChange={setType}
            options={["All Types", ...Array.from(new Set(destinations.map((p) => p.type)))]}
            className="w-[190px]"
          />
          <Select
            label="Most Conversations"
            value={sort}
            onChange={setSort}
            options={["Most Conversations", "Highest Intent", "Most Itineraries Sent", "Highest Qualified Rate"]}
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
                  subtitle={`${p.region} · ${p.type}`}
                  icon={<Building2 className="h-3.5 w-3.5" />}
                  right={<Pill tone="primary">{p.from}</Pill>}
                />
                <div className="grid grid-cols-2 gap-2.5 px-4 py-3.5">
                  {[
                    ["Conversations", p.conversations.toLocaleString()],
                    ["Qualified Rate", `${p.qualifiedRate}%`],
                    ["High Intent", `${p.highIntentRate}%`],
                    ["Itineraries Sent", String(p.itinerariesSent)],
                    ["Median Budget", p.medianBudget],
                    ["Top Config", p.topParty],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-lg border border-border bg-muted/30 px-2.5 py-2">
                      <p className="text-[10.5px] text-muted-foreground">{l}</p>
                      <p className="mt-0.5 text-[12.5px] font-semibold tabular-nums">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border px-4 py-2.5">
                  <Pill tone="info">{p.dominantTripType}</Pill>
                  <Link
                    to="/destinations/$id"
                    params={{ id: p.id }}
                    className="flex items-center gap-1 text-[11.5px] font-medium text-primary hover:underline"
                  >
                    Destination intelligence
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </Panel>
            ))}
          </div>

          <Panel>
            <PanelHead title="Destination Comparison" subtitle="Conversation performance side by side" />
            <TableWrap>
              <table className="w-full min-w-[1040px] border-collapse">
                <thead>
                  <tr>
                    <Th>Destination</Th>
                    <Th>Location</Th>
                    <Th>Type</Th>
                    <Th>Conversations</Th>
                    <Th>Qualified</Th>
                    <Th>High Intent</Th>
                    <Th>Itineraries Sent</Th>
                    <Th>Booking Intent</Th>
                    <Th>Median Budget</Th>
                    <Th>Best Season</Th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/40">
                      <Td className="font-medium">
                        <Link to="/destinations/$id" params={{ id: p.id }} className="hover:text-primary hover:underline">
                          {p.name}
                        </Link>
                      </Td>
                      <Td className="text-muted-foreground">{p.region}</Td>
                      <Td className="text-muted-foreground">{p.type}</Td>
                      <Td className="tabular-nums">{p.conversations.toLocaleString()}</Td>
                      <Td className="tabular-nums">{p.qualifiedRate}%</Td>
                      <Td>
                        <Pill tone={p.highIntentRate >= 25 ? "success" : p.highIntentRate >= 18 ? "warning" : "neutral"}>
                          {p.highIntentRate}%
                        </Pill>
                      </Td>
                      <Td className="tabular-nums">{p.itinerariesSent}</Td>
                      <Td className="tabular-nums">{p.bookingIntent}</Td>
                      <Td className="tabular-nums">{p.medianBudget}</Td>
                      <Td className="text-muted-foreground">{p.bestWindow}</Td>
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
              <PanelHead title={p.short} subtitle="Conversation drivers" right={<Pill tone="primary">{p.topParty}</Pill>} />
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
              <PanelHead title={p.short} subtitle="Objections raised by travellers" />
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
              <PanelHead title={p.short} subtitle="Operators travellers compare against" />
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
