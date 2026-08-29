import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { HBarList, InsightCard, MetricTile, Panel, PanelHead, Pill, ScoreBar, TableWrap, Td, Th, scoreCellTone } from "@/components/mi/kit";
import { MiniBars } from "@/components/mi/charts";
import { Select, TabBar } from "@/components/mi/controls";
import { advisors, scoringDimensions } from "@/data/marhaba";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sales-advisors")({
  head: () => ({
    meta: [
      { title: "Sales Advisors — CallVibe" },
      { name: "description", content: "Advisor performance and AI coaching: conversation volume, sales quality scores, objection handling and itinerary conversion." },
      { property: "og:title", content: "Sales Advisors — CallVibe" },
      { property: "og:description", content: "Advisor sales quality scoring and AI coaching recommendations." },
    ],
  }),
  component: AdvisorsPage,
});

const TABS = ["Performance", "Scorecards", "Coaching"];

function AdvisorsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [sort, setSort] = useState("Most Conversations");
  const [activeId, setActiveId] = useState(advisors[0]!.id);

  const rows = useMemo(
    () =>
      [...advisors].sort((a, b) =>
        sort === "Highest Quality" ? b.quality - a.quality : sort === "Highest Answer Rate" ? b.answerRate - a.answerRate : b.calls - a.calls,
      ),
    [sort],
  );
  const active = advisors.find((a) => a.id === activeId)!;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Advisors" value={String(advisors.length)} sub="Active this period" />
        <MetricTile label="Total Conversations" value={advisors.reduce((s, a) => s + a.calls, 0).toLocaleString()} sub="Calls + WhatsApp" />
        <MetricTile label="Avg Quality" value={`${Math.round(advisors.reduce((s, a) => s + a.quality, 0) / advisors.length)}%`} sub="Team average" />
        <MetricTile label="Top Performer" value={rows[0]!.name.split(" ")[0]!} sub="By volume" />
        <MetricTile label="Avg Answer Rate" value={`${Math.round(advisors.reduce((s, a) => s + a.answerRate, 0) / advisors.length)}%`} sub="Connected calls" />
        <MetricTile label="Coaching Flags" value={String(advisors.reduce((s, a) => s + a.coaching.length, 0))} sub="Open recommendations" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={setTab} />
        <Select label="Most Conversations" value={sort} onChange={setSort} options={["Most Conversations", "Highest Quality", "Highest Answer Rate"]} className="w-[200px]" />
      </div>

      {tab === "Performance" ? (
        <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <Panel>
            <PanelHead title="Advisor Performance" subtitle="Click an advisor to see their detail" icon={<Users className="h-3.5 w-3.5" />} />
            <TableWrap>
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr>
                    <Th>Advisor</Th>
                    <Th>Conversations</Th>
                    <Th>Quality</Th>
                    <Th>Avg Duration</Th>
                    <Th>Answer Rate</Th>
                    <Th>In / Out</Th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((a) => (
                    <tr key={a.id} onClick={() => setActiveId(a.id)} className={cn("cursor-pointer", a.id === activeId ? "bg-primary-soft/60" : "hover:bg-muted/40")}>
                      <Td>
                        <p className="font-medium">{a.name}</p>
                        <p className="text-[11px] text-muted-foreground">{a.role}</p>
                      </Td>
                      <Td className="tabular-nums">{a.calls}</Td>
                      <Td>
                        <span className={cn("rounded-md px-2 py-[3px] text-[11.5px] font-semibold", scoreCellTone(a.quality))}>{a.quality}%</span>
                      </Td>
                      <Td className="tabular-nums">{a.avgDuration}</Td>
                      <Td className="tabular-nums">{a.answerRate}%</Td>
                      <Td className="text-muted-foreground tabular-nums">{a.inbound} / {a.outbound}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </Panel>

          <div className="space-y-4">
            <Panel>
              <PanelHead title={active.name} subtitle={active.role} right={<Pill tone="primary">{active.quality}% quality</Pill>} />
              <div className="px-2 pt-3">
                <MiniBars data={active.activity} height={150} />
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-border px-4 py-3">
                <div className="rounded-lg border border-border bg-success-soft px-2.5 py-2">
                  <p className="text-[10.5px] text-muted-foreground">Positive</p>
                  <p className="text-[13px] font-semibold text-success tabular-nums">{active.sentiment.positive}%</p>
                </div>
                <div className="rounded-lg border border-border bg-warning-soft px-2.5 py-2">
                  <p className="text-[10.5px] text-muted-foreground">Neutral</p>
                  <p className="text-[13px] font-semibold text-warning tabular-nums">{active.sentiment.neutral}%</p>
                </div>
                <div className="rounded-lg border border-border bg-danger-soft px-2.5 py-2">
                  <p className="text-[10.5px] text-muted-foreground">Negative</p>
                  <p className="text-[13px] font-semibold text-danger tabular-nums">{active.sentiment.negative}%</p>
                </div>
              </div>
            </Panel>
            <Panel>
              <PanelHead title="Destinations Handled" />
              <div className="px-4 py-3.5">
                <HBarList items={active.topDestinations} />
              </div>
            </Panel>
          </div>
        </div>
      ) : null}

      {tab === "Scorecards" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((a) => (
            <Panel key={a.id}>
              <PanelHead title={a.name} subtitle={`${a.calls} conversations · ${a.avgDuration} avg`} right={<Pill tone={a.quality >= 82 ? "success" : a.quality >= 74 ? "info" : "warning"}>{a.quality}%</Pill>} />
              <div className="space-y-2.5 px-4 py-3.5">
                {scoringDimensions.map((d) => (
                  <ScoreBar key={d.key} label={d.label} value={a.scores[d.key]} />
                ))}
              </div>
            </Panel>
          ))}
        </div>
      ) : null}

      {tab === "Coaching" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((a) => (
            <Panel key={a.id}>
              <PanelHead title={`${a.name} — AI Coaching`} subtitle={a.role} />
              <div className="space-y-2.5 px-4 py-3.5">
                {a.coaching.map((c, i) => (
                  <InsightCard key={i} tone={c.tone} title={c.tone === "success" ? "Strength" : c.tone === "danger" ? "Critical gap" : "Improvement area"} body={c.text} meta={`${a.name} · last 30 days`} />
                ))}
              </div>
            </Panel>
          ))}
        </div>
      ) : null}
    </div>
  );
}
