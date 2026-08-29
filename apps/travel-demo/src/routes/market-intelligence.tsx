import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Globe2, TrendingUp } from "lucide-react";
import { HBarList, InsightCard, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th } from "@/components/mi/kit";
import { Legend, TrendLines } from "@/components/mi/charts";
import { TabBar } from "@/components/mi/controls";
import { comparisonReasons, competitorMentions, competitorTrend, emergingTrends, leadSources, marketInsights } from "@/data/marhaba";

export const Route = createFileRoute("/market-intelligence")({
  head: () => ({
    meta: [
      { title: "Market Intelligence — CallVibe" },
      { name: "description", content: "Competitor mentions, comparison reasons, emerging traveller trends and lead-source quality derived from Dubai traveller conversations." },
      { property: "og:title", content: "Market Intelligence — CallVibe" },
      { property: "og:description", content: "Competitor pressure and lead-source quality from traveller conversations." },
    ],
  }),
  component: MarketIntelligence,
});

const TABS = ["Competitors", "Traveller Trends", "Lead Sources"];

function MarketIntelligence() {
  const [tab, setTab] = useState(TABS[0]!);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Competitor Mentions" value={competitorMentions.reduce((s, c) => s + c.mentions, 0).toLocaleString()} sub="Last 30 days" />
        <MetricTile label="Most Mentioned" value="Emaar" sub="+27% vs prev period" />
        <MetricTile label="Top Comparison" value="Brand" sub="24% of comparisons" />
        <MetricTile label="Fastest Rising" value="Short-term rental" sub="+34% mentions" />
        <MetricTile label="Best Lead Source" value="Walk-in" sub="47% qualified rate" />
        <MetricTile label="Highest Intent Source" value="Broker" sub="29% high intent" />
      </div>

      <TabBar tabs={TABS} value={tab} onChange={setTab} />

      {tab === "Competitors" ? (
        <>
          <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
            <Panel>
              <PanelHead title="Competitor Mention Trend" subtitle="Weekly mentions across traveller conversations" icon={<TrendingUp className="h-3.5 w-3.5" />} />
              <div className="px-2 pt-3">
                <TrendLines
                  data={competitorTrend}
                  xKey="week"
                  series={[
                    { key: "Emaar", color: "var(--color-primary)" },
                    { key: "DAMAC", color: "var(--color-chart-3)" },
                    { key: "Nakheel", color: "var(--color-success)" },
                    { key: "Binghatti", color: "var(--color-warning)" },
                  ]}
                />
              </div>
              <div className="border-t border-border px-4 py-2.5">
                <Legend
                  items={[
                    { label: "Emaar", color: "var(--color-primary)" },
                    { label: "DAMAC", color: "var(--color-chart-3)" },
                    { label: "Nakheel", color: "var(--color-success)" },
                    { label: "Binghatti", color: "var(--color-warning)" },
                  ]}
                />
              </div>
            </Panel>
            <Panel>
              <PanelHead title="Why Travellers Compare" subtitle="Share of comparison conversations" />
              <div className="px-4 py-3.5">
                <HBarList items={comparisonReasons} suffix="%" tone="classify" max={30} />
              </div>
            </Panel>
          </div>

          <Panel>
            <PanelHead title="Competitor Detail" subtitle="Mentions, movement and comparison drivers" icon={<Globe2 className="h-3.5 w-3.5" />} />
            <TableWrap>
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr>
                    <Th>Competitor</Th>
                    <Th>Mentions</Th>
                    <Th>Change</Th>
                    <Th>Comparison Drivers</Th>
                  </tr>
                </thead>
                <tbody>
                  {competitorMentions.map((c) => (
                    <tr key={c.name} className="hover:bg-muted/40">
                      <Td className="font-medium">{c.name}</Td>
                      <Td className="tabular-nums">{c.mentions}</Td>
                      <Td>
                        <Pill tone={c.change > 0 ? "danger" : "success"}>
                          {c.change > 0 ? "+" : ""}{c.change}%
                        </Pill>
                      </Td>
                      <Td>
                        <div className="flex flex-wrap gap-1.5">
                          {c.reasons.map((r) => (
                            <Pill key={r} tone="neutral">{r}</Pill>
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

      {tab === "Traveller Trends" ? (
        <div className="grid gap-4 xl:grid-cols-[1fr_1.3fr]">
          <Panel>
            <PanelHead title="Emerging Traveller Trends" subtitle="Change in mention volume vs previous period" />
            <div className="px-4 py-3.5">
              <HBarList items={emergingTrends.map((t) => ({ label: t.label, value: t.value }))} suffix="%" tone="info" max={40} />
            </div>
          </Panel>
          <Panel>
            <PanelHead title="Market Insights" subtitle="Generated by Marhaba AI" />
            <div className="grid gap-2.5 px-4 py-3.5">
              {marketInsights.map((m) => (
                <InsightCard key={m.title} tone={m.tone} title={m.title} body={m.body} meta={m.meta} />
              ))}
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === "Lead Sources" ? (
        <Panel>
          <PanelHead title="Lead Source Quality" subtitle="Volume vs conversation quality by channel" />
          <TableWrap>
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr>
                  <Th>Source</Th>
                  <Th>Leads</Th>
                  <Th>Qualified Rate</Th>
                  <Th>High-Intent Rate</Th>
                  <Th>Avg Budget</Th>
                </tr>
              </thead>
              <tbody>
                {leadSources.map((s) => (
                  <tr key={s.source} className="hover:bg-muted/40">
                    <Td className="font-medium">{s.source}</Td>
                    <Td className="tabular-nums">{s.leads.toLocaleString()}</Td>
                    <Td>
                      <Pill tone={s.qualifiedRate >= 40 ? "success" : s.qualifiedRate >= 30 ? "info" : "warning"}>{s.qualifiedRate}%</Pill>
                    </Td>
                    <Td>
                      <Pill tone={s.highIntentRate >= 26 ? "success" : s.highIntentRate >= 18 ? "info" : "warning"}>{s.highIntentRate}%</Pill>
                    </Td>
                    <Td className="tabular-nums">{s.avgBudget}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>
      ) : null}
    </div>
  );
}
