import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BrainCircuit, Gauge, Sparkles, Target } from "lucide-react";
import {
  HBarList,
  InsightCard,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  ScoreBar,
  TableWrap,
  Td,
  Th,
  scoreCellTone,
} from "@/components/mi/kit";
import { DonutChart, Legend, TrendLines } from "@/components/mi/charts";
import { Select, TabBar } from "@/components/mi/controls";
import {
  advisors,
  classifications,
  conversationDrivers,
  intentDistribution,
  projectNames,
  recentAiInsights,
  scoreFieldSummary,
  scoringDimensions,
  sentimentDistribution,
  volumeTrend,
} from "@/data/marhaba";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-insights")({
  head: () => ({
    meta: [
      { title: "AI Insights — Marhaba Intelligence" },
      {
        name: "description",
        content:
          "Aggregate AI analysis of buyer conversations: sales quality scoring, conversation drivers, buyer classifications and generated insights.",
      },
      { property: "og:title", content: "AI Insights — Marhaba Intelligence" },
      { property: "og:description", content: "Sales quality scoring and buyer classification across all conversations." },
    ],
  }),
  component: AiInsights,
});

const TABS = ["Scoring Fields", "Conversation Drivers", "Classifications", "Generated Insights"];

function AiInsights() {
  const [tab, setTab] = useState(TABS[0]!);
  const [project, setProject] = useState("All Projects");

  const qualityTrend = useMemo(
    () =>
      volumeTrend.slice(0, 14).map((d, i) => ({
        day: d.day,
        quality: Math.round(74 + Math.sin(i / 2.2) * 5 + i * 0.4),
        intent: Math.round(56 + Math.cos(i / 1.9) * 7 + i * 0.3),
      })),
    [],
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Conversations Analysed" value="4,286" sub="Calls + WhatsApp" />
        <MetricTile label="Avg Sales Quality" value="79%" sub="8 scored dimensions" />
        <MetricTile label="Avg Buyer Intent" value="58" sub="Portfolio average" />
        <MetricTile label="Objection Handling" value="7.4/10" sub="Weakest dimension" />
        <MetricTile label="Site Visit Pitch" value="8.1/10" sub="Team average" />
        <MetricTile label="Insights Generated" value="1,942" sub="Last 30 days" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={setTab} />
        <Select
          label="All Projects"
          value={project}
          onChange={setProject}
          options={["All Projects", ...projectNames]}
          className="w-[200px]"
        />
      </div>

      {tab === "Scoring Fields" ? (
        <>
          <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <Panel>
              <PanelHead
                title="AI Scoring Dimensions"
                subtitle="Team average per dimension, out of 10"
                icon={<Gauge className="h-3.5 w-3.5" />}
              />
              <div className="grid gap-x-6 gap-y-3 px-4 py-3.5 md:grid-cols-2">
                {scoreFieldSummary.map((s) => (
                  <ScoreBar key={s.key} label={s.label} value={s.avg} outOf={10} />
                ))}
              </div>
            </Panel>

            <Panel>
              <PanelHead title="Quality vs Intent Trend" subtitle="Last 14 days" icon={<Target className="h-3.5 w-3.5" />} />
              <div className="px-2 pt-3">
                <TrendLines
                  data={qualityTrend}
                  xKey="day"
                  series={[
                    { key: "quality", color: "var(--color-primary)" },
                    { key: "intent", color: "var(--color-success)" },
                  ]}
                  height={210}
                />
              </div>
              <div className="border-t border-border px-4 py-2.5">
                <Legend
                  items={[
                    { label: "Sales quality", color: "var(--color-primary)" },
                    { label: "Buyer intent", color: "var(--color-success)" },
                  ]}
                />
              </div>
            </Panel>
          </div>

          <Panel>
            <PanelHead title="Dimension Detail" subtitle="Best and weakest performer per scoring dimension" />
            <TableWrap>
              <table className="w-full min-w-[880px] border-collapse">
                <thead>
                  <tr>
                    <Th>Dimension</Th>
                    <Th>Team Avg</Th>
                    <Th>Strongest</Th>
                    <Th>Needs Coaching</Th>
                    <Th>Score Distribution</Th>
                  </tr>
                </thead>
                <tbody>
                  {scoreFieldSummary.map((s) => (
                    <tr key={s.key} className="hover:bg-muted/40">
                      <Td className="font-medium">{s.label}</Td>
                      <Td>
                        <span className={cn("rounded-md px-2 py-[3px] text-[11.5px] font-semibold", scoreCellTone(s.pct))}>
                          {s.avg}/10
                        </span>
                      </Td>
                      <Td>
                        {s.best.name} <span className="text-muted-foreground">({(s.best.score / 10).toFixed(1)})</span>
                      </Td>
                      <Td>
                        {s.worst.name} <span className="text-danger">({(s.worst.score / 10).toFixed(1)})</span>
                      </Td>
                      <Td>
                        <div className="flex items-center gap-1.5">
                          {s.bands.map((b) => (
                            <span key={b.label} className="rounded-md bg-muted px-1.5 py-[2px] text-[10.5px] tabular-nums">
                              {b.label}: {b.value}
                            </span>
                          ))}
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </Panel>
        </>
      ) : null}

      {tab === "Conversation Drivers" ? (
        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <Panel>
            <PanelHead title="What Buyers Talk About" subtitle="Detected topics across conversations" icon={<BrainCircuit className="h-3.5 w-3.5" />} />
            <div className="px-4 py-3.5">
              <HBarList items={conversationDrivers} />
            </div>
          </Panel>
          <div className="space-y-4">
            <Panel>
              <PanelHead title="Sentiment" subtitle="Portfolio distribution" />
              <div className="px-4 pt-2 pb-3">
                <DonutChart data={sentimentDistribution} centerValue="54%" centerLabel="Positive" height={180} />
              </div>
            </Panel>
            <Panel>
              <PanelHead title="Intent" subtitle="Portfolio distribution" />
              <div className="px-4 pt-2 pb-3">
                <DonutChart data={intentDistribution} centerValue="23%" centerLabel="High intent" height={180} />
              </div>
            </Panel>
          </div>
        </div>
      ) : null}

      {tab === "Classifications" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classifications.map((c) => (
            <Panel key={c.title}>
              <PanelHead title={c.title} subtitle="Share of analysed conversations" />
              <div className="space-y-2 px-4 py-3.5">
                {c.values.map((v) => (
                  <div key={v.label} className="flex items-center justify-between gap-2">
                    <Pill tone={v.tone}>{v.label}</Pill>
                    <span className="text-[12px] font-semibold tabular-nums">{v.value}%</span>
                  </div>
                ))}
              </div>
            </Panel>
          ))}
          <Panel>
            <PanelHead title="Advisor Quality Snapshot" subtitle="Average score across dimensions" />
            <div className="space-y-2.5 px-4 py-3.5">
              {advisors.map((a) => {
                const avg = Math.round(
                  scoringDimensions.reduce((s, d) => s + a.scores[d.key], 0) / scoringDimensions.length,
                );
                return <ScoreBar key={a.id} label={a.name} value={avg} />;
              })}
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === "Generated Insights" ? (
        <Panel>
          <PanelHead
            title="Recent AI Insights"
            subtitle="Automatically generated from buyer conversations"
            icon={<Sparkles className="h-3.5 w-3.5" />}
            right={<Pill tone="info">Live feed</Pill>}
          />
          <div className="grid gap-2.5 px-4 py-3.5 lg:grid-cols-2">
            {recentAiInsights.map((i) => (
              <InsightCard key={i.title + i.meta} tone={i.tone} title={i.title} body={i.body} meta={i.meta} />
            ))}
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
